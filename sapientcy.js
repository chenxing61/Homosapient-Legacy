G.AddData({
	name: 'Sapientcy',
	author: 'CX61',
	desc: 'And what do you know, mod has to evolve.Required to play Homosapient legacy 0.4 and later versions.',
	engineVersion: 1,
	manifest: '0',
	sheets: { 'H1sheet': 'https://file.garden/ZGd4-WLYvB6VkIdj/img/H1sheet.png' },
	func: function () {

		G.parse = function (what) {
			var str = '<div class="par">' + ((what
				.replaceAll(']s', ',*PLURAL*]'))
				.replace(/\[(.*?)\]/gi, G.parseFunc))
				.replaceAll('http(s?)://', 'http$1:#SLASH#SLASH#')
				.replaceAll('//', '</div><div class="par">')
				.replaceAll('#SLASH#SLASH#', '//')
				.replaceAll('@', '</div><div class="par bulleted">')
				.replaceAll('<>', '</div><div class="divider"></div><div class="par">') + '</div>';
			return str;
		}
	}
})
G.fullApplyUnitEffects = function (me, type, amountParam) {
	//run through every effect in a unit and apply them
	//"type" lets us run specific effects only : 0 means all effects that happen every tick, 1 means all effects that happen on unit purchase (or sale, or death, if the amount is negative), 2 means all effects that affect the effective unit amount, 3 means all effects that happen when unit is made unidle (or idle, if the amount is negative)
	//"amountParam" depends on the type : if type is 0, it represents the effective unit amount; if type is 1, it is the new amount of the unit we just purchased; if type is 3, it is the amount that was just made unidle

	var len = me.unit.effects.length;
	var visible = false;
	//if (me.l && G.tab.id=='unit') visible=true;
	var out = 0;//return value; only used by type 2 effects
	if (type == 2) out = me.amount - me.idle;

	for (var i = 0; i < len; i++) {
		var effect = me.unit.effects[i];
		if (!effect.req || G.checkReq(effect.req)) {
			if ((!effect.mode || me.mode.id == effect.mode) && (!effect.notMode || me.mode.id != effect.notMode)) {
				if (type == 0)//effects that happen every tick
				{
					if (!effect.every || G.tick % effect.every == 0)//.every : effect only triggers every X days
					{
						var repeat = 1;
						if (effect.repeat) repeat = effect.repeat;//.repeat : effect triggers X times every day
						for (var repI = 0; repI < repeat; repI++) {
							var myAmount = amountParam;
							if (effect.type == 'gather')//gather : extract either specific resources, or anything from a context, or both, using the available resources in owned tiles
							//if .max is specified, each single unit can only gather that amount at most, forcing the player to create enough units to match the resources available in owned tiles
							//by default, units try to gather a random amount between 50% and 100% of the specified amount; add .exact=true to get the precise amount instead
							//the amount gathered is soft-capped by the natural resource
							{
								if (!effect.chance || Math.random() < effect.chance) {
									var resWeight = 0.95;
									var unitWeight = 1 - resWeight;
									var res = [];
									var specific = false;
									if (effect.what)//gathering something in particular
									{ res = effect.what; specific = true; }
									else//harvest by context only
									{ res = G.currentMap.computedPlayerRes[effect.context]; }
									for (var ii in res) {
										var amount = 0;
										if (specific) {
											var toGather = myAmount * res[ii];
											var resAmount = toGather;//if no context is defined, ignore terrain goods - just harvest from thin air
											if (effect.context && G.currentMap.computedPlayerRes[effect.context]) resAmount = G.currentMap.computedPlayerRes[effect.context][ii] || 0;
											var max = effect.max || 0;
										}
										else {
											var toGather = myAmount * (effect.amount || 1);
											var resAmount = res[ii];
											var max = effect.max || 0;
										}

										amount = Math.min(resAmount, toGather) * resWeight + unitWeight * (toGather);
										if (!effect.exact) amount *= (0.5 + 0.5 * Math.random());
										if (max) amount = Math.min(max * myAmount, amount);
										amount = randomFloor(amount);

										if (amount > 0) {
											if (G.getRes(ii).whenGathered) G.getRes(ii).whenGathered(G.getRes(ii), amount, me, effect);
											else G.gain(ii, amount, me.unit.displayName);
											if (visible) me.popups.push(G.dict[ii].icon);
										}
									}
								}
							}
							else if (effect.type == 'convert')//convert : convert resources into other resources as long as we have enough materials
							{
								if (!effect.chance || Math.random() < effect.chance) {
									//establish how many we can make from the current resources
									//i hope i didn't mess up somewhere in there
									var amountToMake = myAmount;
									for (var ii in effect.from) {
										amountToMake = Math.min(amountToMake, G.getRes(ii).Amount / (effect.from[ii] * myAmount));
									}

									amountToMake = randomFloor(Math.min(1, amountToMake) * myAmount);

									if (amountToMake > 0) {
										for (var ii in effect.from) {
											G.lose(ii, effect.from[ii] * amountToMake, me.unit.displayName);
										}
										for (var ii in effect.into) {
											if (G.getRes(ii).whenGathered) G.getRes(ii).whenGathered(G.getRes(ii), effect.into[ii] * amountToMake, me, effect);
											else G.gain(ii, effect.into[ii] * amountToMake, me.unit.displayName);
											if (visible && effect.into[ii] * amountToMake > 0) me.popups.push(G.dict[ii].icon);
										}
									}
								}
							}
							else if (effect.type == 'waste')//waste : a random percent of the unit dies off every tick
							{
								var toDie = randomFloor(effect.chance * me.amount);
								if (toDie > 0) {
									if (effect.desired) {
										//if(me.unit.name.indexOf('grave')!=-1 || me.unit.name.indexOf('cemetary')!=-1)G.gain('corpse',-toDie*G.unitByName[''].effects[0].what['burial spot'],'decay');
										me.targetAmount -= toDie;
									}
									G.wasteUnit(me, toDie);
								}
							}
							else if (effect.type == 'explore') {
								var limit = 500;
								limit += ((G.has("landmarks and signs") ? 3000 : 0) + (G.has("scouting") ? 1000 : 0));
								if (G.getRes("land").amount < limit && G.isMap == 0) {
									if (effect.explored) G.exploreOwnedTiles += Math.random() * effect.explored * myAmount;
									if (effect.unexplored) G.exploreNewTiles += Math.random() * effect.unexplored * myAmount;
									G.getDict('wanderer').effects[G.unitByName['wanderer'].effects.length - 1].chance = 0.01;
									G.getDict('scout').effects[G.unitByName['scout'].effects.length - 1].chance = 0.01;
								}
								else {
									G.getDict('wanderer').effects[G.unitByName['wanderer'].effects.length - 1].chance = 1e-300;
									G.getDict('scout').effects[G.unitByName['scout'].effects.length - 1].chance = 1e-300;
								}

							}
							else if (effect.type == 'exploreOcean')//exploreOcean : discover new tiles or explore owned ocean
							{
								var limit = 500;
								if (G.modsByName["Default dataset"]) {
									limit += (G.has("advanced mapping") ? Infinity : (G.has("basic mapping") ? 6500 : 0) + (G.has("map details") ? 14500 : 0) + (G.has("focused scouting") ? 20000 : 0) + (G.has("scouting") ? 1000 : 0));
									if (G.getRes("wtr").amount + G.getRes("land").amount < limit && !G.isMap) {

										G.getDict('boat').effects[2].chance = 1 / 117.5;
										G.getDict('boat').effects[3].chance = 1 / 150;
										if (effect.explored) G.exploreOwnedOceanTiles += Math.random() * effect.explored * myAmount;
										if (effect.unexplored) G.exploreNewOceanTiles += Math.random() * effect.unexplored * myAmount;
									} else {

										G.getDict('boat').effects[2].chance = 1e-300;
										G.getDict('boat').effects[3].chance = 1e-300;
									}
								} else {
									//limit+=(G.has("advanced mapping") ? Infinity : (G.has("basic mapping") ? 6000 : 0)+(G.has("map details") ? 14000 : 0));
									limit += (G.has("map details") ? Infinity : (G.has("basic mapping") ? 6500 : 0)) + (G.has("scouting") ? 1000 : 0); //for now since advanced mapping isn't available for C2 yet
									if (G.getRes("wtr").amount + G.getRes("land").amount < limit) {
										if (effect.explored) G.exploreOwnedOceanTiles += Math.random() * effect.explored * myAmount;
										if (effect.unexplored) G.exploreNewOceanTiles += Math.random() * effect.unexplored * myAmount;
										G.getDict('wanderer').effects[G.unitByName['wanderer'].effects.length - 1].chance = 0.02;
										G.getDict('druidish travellers team').effects[G.unitByName['druidish travellers team'].effects.length - 1].chance = 1 / 230;
										G.getDict('scout').effects[G.unitByName['scout'].effects.length - 1].chance = 1 / 90;
									} else {
										G.getDict('wanderer').effects[G.unitByName['wanderer'].effects.length - 1].chance = 1e-300;
										G.getDict('druidish travellers team').effects[G.unitByName['druidish travellers team'].effects.length - 1].chance = 1e-300;
										G.getDict('scout').effects[G.unitByName['scout'].effects.length - 1].chance = 1e-300;
									}
								}
							}
							else if (effect.type == 'function')//function : any arbitrary function (or list of functions)
							{
								if (!effect.chance || Math.random() < effect.chance) {
									if (effect.funcs) {
										for (var ii in effect.funcs) { effect.funcs[ii](me); }
									}
									else effect.func(me);
								}
							}
						}
					}
				}
				else if (type == 1)//effects that happen when the unit is bought or killed
				{
				}
				else if (type == 3)//effects that happen when the unit is made unidle or idle
				{
					if (effect.type == 'provide')//provide : when the unit is bought, give a flat amount of a resource; remove that same amount when the unit is deleted
					{
						if (effect.what) {
							for (var ii in effect.what) {
								var amount = effect.what[ii] * amountParam;
								if (amountParam > 0 || !effect.noTakeBack) {
									if (G.getRes(ii).whenGathered) G.getRes(ii).whenGathered(G.getRes(ii), amount, me, effect);
									else G.gain(ii, amount, me.unit.displayName);
									if (visible && amount > 0) me.popups.push(G.dict[ii].icon);
								}
							}
						}
					}
				}
				else if (type == 2)//effects that modify the effective unit amount
				{
					if (effect.what) {
						if (effect.type == 'add')//add the amount of these resources to the amount
						{
							for (var ii in effect.what) {
								var res = G.getRes(ii);
								out += res.amount * effect.what[ii];
							}
						}
						else if (effect.type == 'addFree')//add the free portion of these resources to the amount
						{
							for (var ii in effect.what) {
								var res = G.getRes(ii);
								out += Math.max(0, res.amount - res.used) * effect.what[ii];
							}
						}
						else if (effect.type == 'mult')//multiply the amount by the amount of these resources
						{
							for (var ii in effect.what) {
								var res = G.getRes(ii);
								out += res.amount * effect.what[ii];
							}
						}
						else if (effect.type == 'multFree')//multiply the amount by the free portion of these resources
						{
							for (var ii in effect.what) {
								var res = G.getRes(ii);
								out *= Math.max(0, res.amount - res.used) * effect.what[ii];
							}
						}
					}
					else//flat values
					{
						if (effect.type == 'add')//add the value to the amount
						{
							out += effect.value;
						}
						else if (effect.type == 'mult')//multiply the amount by the value
						{
							out *= effect.value;
						}
					}
				}
			}
		}
	}
	return out;
}

/*=====================================================================================
LANGUAGE
	A system for translation into pseudo-languages.
	This system takes in a language object, composed of word starts, middles, jointers and ends, and an input text, and outputs that text "translated" into the language.
	The translation should always return the same output for the same word.
=======================================================================================*/
//http://symbolcodes.tlt.psu.edu/web/codehtml.html
G.languages = {
	'primitive': {
		name: 'Primitive',
		starts: ['g', 'gr', 'gn', 'm', 'r', 'b', 'br', 'k', 'kr', 'z', 'h', 'd', 'th', 'thr', 'ob', 'ok', 'ork', 'ak', 'ark'],
		mids: ['a', 'a', 'a', 'a', 'a', 'a', 'o', 'o', 'o', 'o', 'o', 'o', 'i', 'i', 'e', 'e', 'u', 'u', 'y',/**/'oo', 'oh', 'aa', 'ah', '&uuml;', '&uuml;&uuml;', '&ouml;', '&ouml;&ouml;'],
		joints: ['nk', 'z', 'r', 'rb', 'rh', 'd', 'm', 'b', 'h', 'n', 'nd', 'mb', 'k', 'kt', 'lk', 'st', 'k\'t', 'g\'h'],
		ends: ['k', 'k', 'k', 'k', 'g', 'g', 'g', 'r', 'r', 'r', 'ko', 'nko', 'nka', 'mbo', 'mba', 'rk', 'nk', 'do', 'dia', 'kko', 'tta', 'tto', 'tia', 't', 'th', 'b', 'l', 'll', 'n', 'm', 'x', 'rx', 'rg'],
	},
	'english': {
		name: 'Brittanoid',
		starts: [/*common*/'d', 'm', 'n', 'b', 'g', 'l', 'p', 'f', 'v', 'w', 'd', 'm', 'n', 'b', 'g', 'l', 'p', 'f', 'v', 'w', 'd', 'm', 'n', 'b', 'g', 'l', 'p', 'f', 'v', 'w',/**/'th', 'tr', 'thr', 'gr', 'cr', 'cl', 'br', 'bl', 'fl', 'fr', 'ar', 'or', 'wr', 'h', 'sc', 'sh', 'ch', 'wh', 'wh', 'wh', 'dr', 'st', 'str', 'squ', 'pl', 'pr', 'y'],
		mids: [/*common*/'a', 'a', 'a', 'a', 'a', 'o', 'o', 'o', 'o', 'i', 'i', 'i', 'i', 'e', 'e', 'e', 'e', 'e',/**/'oo', 'ee', 'ea', 'io', 'ie', 'ei', 'iou', 'u', 'au', 'ai', 'ou', 'y'],
		joints: ['l', 't', 'cr', 'ct', 'rm', 'tr', 's', 'r', 'rs', 'pt', 'g', 'gg', 'b', 'h', 'll', 'ls', 'th', 'gn', 'nc', 'ns', 'nd', 'rst', 'v', 'lv', 'ght', 'ghb', 'rb', 'bd', 'ncl', 'bg', 'lt', 'st', 'qu', 'rt', 'lb', 'gl', 'ff', 'fr', 'fl', 'mb', 'x'],
		ends: ['k', 'ck', 's', 'ss', 'sk', 'm', 'n', 'nt', 'nk', 'nks', 'ng', 'ng', 'ng', 'ngs', 'le', 'ne', 'me', 'de', 't', 'tt', 'll', 'rp', 'p', 'r', 're', 'd', 'w', 'l', 'ble', 'nkle', 'ttle', 'ggle', 'the', 'te', 've', 'gh', 'cks', 'tch', 'rch', 'nch', 'rse', 'sh', 'rt', 'rst', 'rsty', 'rty', 'rm', 'rf', 'pt', 'nny', 'se', 'ce', 'ge', 'nce', 'nge', 'ngth', 'rk', 'key', 'ky', 'sy', 'ry', 'ty', 'ly', 'py', 'lly', 'ff', 't\'s', '\'s', 'x', 'zz'],
	},
	'french': {
		name: 'Frankoid',
		starts: ['b', 'j', 'g', 'd', 'h', 'p', 'm', 'n', 'ad', 'ab', 'fr', 'fl', 'ch', 'f', 'c', 'ph', 'qu', 'gr', 'tr', 'l', 'gl', 'dr', 'cl', 'cr', 'br', 'bl', 'pr', 'pl', 't', 'r', 's', 'sc', 'l\'', 's\'', 'qu\'', '&eacute;l', '&eacute;t', '&eacute;tr'],
		mids: ['a', 'a', 'a', 'o', 'o', 'i', 'i', 'e', 'e', 'e', 'u', 'u', 'ai', 'au', 'ou', 'oi', 'ui', 'ie', '&agrave;', '&egrave;', '&eacute;', '&ecirc;', '&acirc;', '&ucirc;', '&ocirc;'],
		joints: ['l', 't', 'c', 'cr', 'cc', 'ss', 'ct', 'tr', 'rs', 'rt', 'ff', 'fr', 'fl', 'pt', 'pht', 's', 'r', 'g', 'll', 'gn', 'nc', 'ns', 'nd', 'ls', 'dm', 'mb', 'mbl', 'md', 'mpt', 'ng', 'mm', 'nn', 'v', 'lv', 'rb', 'bd', 'lt', 'lb', 'st', 'mb', 'mbr', 'qu', '&ccedil;'],
		ends: ['nt', 'nd', 'nte', 'nde', 'm', 'n', 'le', 'ne', 'me', 'de', 'rti', 'rtie', 'r', 't', 'te', 't&eacute;', 's&eacute;', 'tte', 'tre', 'che', 'cru', 'gru', 'gt', 'que', 'sque', 'n', 'rd', 'rde', 'rt', 'rte', 's', 'se', 'fe', 're', 'phe', 'd', 'l', 'gne', 'tion', 'bli', 'pi', 'pie', 'rme', 'ble', 'tions', 'lier', 'li&egrave;re', 'bles', 'teau', 'telle', 'peau', 'pelle', 'meau', 'melle', 'ste', 'nse', 'nce', 'rs', 'ng', 'nge', 'x', 'z'],
	},
	'japanese': {
		name: 'Nipponoid',
		starts: ['ak', 'al', 'as', 'ik', 'is', 'its', 'ot', 'ok', 'k', 's', 't', 'n', 'h', 'm', 'w', 'd', 'p', 'j', 'ch', 'z', 'r', 'sh', 'g', 'ts'],
		mids: [/*common*/'a', 'a', 'a', 'o', 'o', 'o', 'u', 'u', 'i', 'i', 'e', 'e', 'a', 'a', 'a', 'o', 'o', 'o', 'u', 'u', 'i', 'i', 'e', 'e',/**/'in', 'ou', 'ai', 'ao', 'ii', 'ei', 'yo', 'ya', 'yu', 'aa'],
		joints: ['t', 'k', 's', 'b', 'n', 'm', 'g', 'z', 'sh', 'j', 'p', 'd', 'h', 'kk', 'ch', 'ts', 'ht'],
		ends: ['ko', 'ka', 'ki', 'ku', 'ke', 'mo', 'ma', 'mi', 'mu', 'me', 'no', 'na', 'ni', 'nu', 'ne', 'to', 'ta', 'ti', 'tu', 'te', 'ro', 'ra', 'ri', 'ru', 're', 'jo', 'ja', 'ji', 'ju', 'je', 'do', 'da', 'di', 'du', 'de', 'tso', 'tsa', 'tsi', 'tsu', 'tse', 'n', 'n', 'n', 'n', 'wa', 'sai', 'chi', 'jio'],
	},
	'grecoroman': {
		name: 'Grecoromanoid',
		starts: ['m', 'n', 'x', 'g', 'gn', 'p', 'tr', 't', 'gr', 'ad', 'ap', 'agr', 'atr', 'ant', 'ambr', 'arthr', 'pr', 'cl', 'chl', 'kl', 'st', 'sp', 'sk', 'skl', 'skr', 'ov', 'om', 'omb', 'onth', 'on', 'v', 'l', 'k', 'h', 'd', 's', 'int', 'inc', 'in', 'fr', 'gl', 'pt', 'pht', 'aut', 'aud', 'ur', 'ult', 'exp', 'extr', 'ext'],
		mids: ['a', 'e', 'i', 'o', 'u', 'y', 'io', 'ia', 'iu', 'ae', 'eu'],
		joints: ['th', 'l', 'll', 'nt', 't', 'thr', 'tr', 'st', 'sk', 'skl', 'skr', 'gr', 'ngr', 'ntr', 'nth', 'v', 'g', 'gg', 'c', 'cc', 'k', 's', 'x', 'd', 'cl', 'ct', 'kl', 'r', 'fr', 'pt', 'pht', 'mb', 'mbr'],
		ends: [/*common*/'n', 's', 'm', 'th', 'd', 'n', 's', 'm', 'th', 'sma', 'rma', 'd', 'n', 's', 'm', 'th', 'd', 'n', 's', 'm', 'th', 'd',/**/'x', 'na', 'nus', 'nis', 'sa', 'sia', 'sus', 'sis', 'ta', 'tia', 'tius', 'tis', 'ga', 'gia', 'gius', 'gis', 'la', 'lia', 'lius', 'lis'],
	},
	'huaxiade': {
		name: 'Huaxiaren',
		starts: ['b', 'p', 'm', 'f', 'd', 't', 'n', 'l', 'g', 'k', 'h', 'j', 'q', 'x', 'zh', 'ch', 'sh', 'r', 'z', 'c', 's'
		],
		mids: ['a', 'o', 'e', 'ai', 'ei', 'ao', 'ou', 'an', 'en', 'ang', 'eng', 'ong', 'i', 'ia', 'ie', 'iao', 'iou', 'ian', ' in ', 'iang', 'iong', 'u', 'ua', 'uai', 'uan', 'uen', 'uang', 'ueng'],
		joints: ['b', 'p', 'm', 'f', 'd', 't', 'n', 'l', 'g', 'k', 'h', 'j', 'q', 'x', 'zh', 'ch', 'sh', 'r', 'z', 'c', 's'],
		ends: [/*common*/'a', 'o', 'e', 'ai', 'ei', 'ao', 'ou', 'an', 'en', 'ang', 'eng', 'ong', 'i', 'ia', 'ie', 'iao', 'iou', 'ian', ' in ', 'iang', 'iong', 'u', 'ua', 'uai', 'uan', 'uen', 'uang', 'ueng'],
	},
};

G.translate = function (input, languages, seed) {
	var starts = [];
	var mids = [];
	var joints = [];
	var ends = [];

	var seed = seed || '0';
	if (!languages) { languages = []; for (var i in G.languages) { languages.push(i); } }
	for (var i in languages) {
		var language = G.languages[languages[i]];
		starts.push(language.starts);
		mids.push(language.mids);
		joints.push(language.joints);
		ends.push(language.ends);
	}

	var output = '';
	input = decodeEntities(input);
	input += ' ';
	var len = input.length;
	var word = '';
	var endWord = false;
	for (var i = 0; i < len; i++) {
		var thisChar = input.charAt(i);
		//if the char is a letter or ', add it to the word; if not, end the word
		if (thisChar.toLowerCase() != thisChar.toUpperCase() || thisChar == '\'') { word += thisChar; } else { endWord = true; }
		if (endWord && word.length > 0) {
			//if we reached the end of a word, process it; chop it into chunks of 4 letters and translate each chunk
			var len2 = Math.ceil(word.length / 4);
			var bits = [];
			var balance = false;
			//if (len2%3==2) balance=true;//if the last chunk is only 1 letter, add 1 to it and remove 1 from the first chunk
			for (var ii = 0; ii < len2; ii++) {
				//if (ii==len2-2 && balance) bits.push(word.charAt(ii*3)+word.charAt(ii*3+1));
				//else if (ii==len2-1 && balance) bits.push(word.charAt(ii*3-1)+word.charAt(ii*3)+word.charAt(ii*3+1));
				//else bits.push(word.charAt(ii*3)+word.charAt(ii*3+1)+word.charAt(ii*3+2));
				bits.push(word.charAt(ii * 3) + word.charAt(ii * 3 + 1) + word.charAt(ii * 3 + 2));
			}
			var len2 = bits.length;
			for (var ii = 0; ii < len2; ii++) {
				var bit = '';
				Math.seedrandom('translate' + seed + bits[ii].toLowerCase());
				var lang = Math.floor(Math.random() * starts.length);
				var start = starts[lang];
				var end = ends[lang];
				var mid = mids[lang];
				var joint = joints[lang];
				if (ii == 0 && ii == len2 - 1 && bits[ii].length > 2 && Math.random() < 0.5) bit = choose(start) + choose(mid) + choose(end);//longish singles
				else if (ii == 0 && ii == len2 - 1) bit = choose([choose(mid), choose(start) + choose(mid), choose(mid) + choose(end)]);//singles
				else if (ii == 0) bit = choose(start) + choose(mid);//first part
				else if (ii == len2 - 1) bit = choose(end);//end
				else bit = choose(joint) + choose(mid);//middles

				bit = decodeEntities(bit);
				if (bits[ii].charAt(0).toUpperCase() == bits[ii].charAt(0)) bit = bit.charAt(0).toUpperCase() + bit.slice(1);
				output += bit;
			}
			word = '';
		}
		if (endWord) { output += thisChar; word = ''; endWord = false; }
	}
	output = output.slice(0, -1);
	return output;
}
G.getRandomString = function (syllables, maxSyllables) {
	if (!maxSyllables) var maxSyllables = syllables;
	syllables = Math.floor(Math.random() * (maxSyllables - syllables) + syllables);
	var vow = ['a', 'e', 'i', 'o', 'u', 'y'];
	var cons = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'z'];
	var str = '';
	for (var i = 0; i < syllables; i++) {
		str += choose(cons) + choose(vow);
	}
	if (Math.random() < 0.25) str += choose(cons);
	return str;
}
G.testTranslate = function (input, languages) {
	for (var i = 0; i < 10; i++) {
		document.write(G.translate(input, languages) + '<br>');
	}
}