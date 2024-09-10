	G.AddData({
name:'Homosapientlegacy',
author:'CX61',
desc:'We do a little human history replicating and then make up some shit. Some code structure from !pelletsstarPLs magix mod which is amazing.',
engineVersion:1,
manifest:0,
sheets:{'H1sheet':'https://file.garden/ZGd4-WLYvB6VkIdj/img/H1sheet.png'},
func:function()
{
	/*
		Note : unlike some other strategy games, this dataset does not attempt to replicate Earth human history. In fact, care has been taken not to mention any existing civilizations; other topics consciously avoided are the player's species (no "mankind" or "humans") and gender ("they" is used when referring to any single individual).
		Similarly, technologies do not necessarily follow the order in which they were invented in real life, if it makes sense for them to do so.
		Mods should feel free to follow along these guidelines or to implement real-world civilizations, species, and genders into the game if they wish to.
			-Playable species may be added as a game concept at some point in the future.
		Note : Warning, Homo sapient legacy author thinks huamn history is awesome.
	*/
	
	/*=====================================================================================
	PROPS & FUNCTIONS
	=======================================================================================*/
	
	G.props['fastTicksOnResearch']=200;
	
	G.funcs['new game blurb']=function()
	{
		var str=
		'<b>Your tribe :</b><div class="thingBox">'+
		G.textWithTooltip('<div class="icon freestanding" style="'+G.getIconUsedBy(G.getRes('adult'))+'"></div><div class="freelabel">x5</div>','7 Adults')+
		G.textWithTooltip('<div class="icon freestanding" style="'+G.getIconUsedBy(G.getRes('elder'))+'"></div><div class="freelabel">x1</div>','1 Elder')+
		G.textWithTooltip('<div class="icon freestanding" style="'+G.getIconUsedBy(G.getRes('child'))+'"></div><div class="freelabel">x2</div>','4 Children')+
		G.textWithTooltip('<div class="icon freestanding" style="'+G.getIconUsedBy(G.getRes('baby'))+'"></div><div class="freelabel">x2</div>','A baby to take care of')+
		G.textWithTooltip('<div class="icon freestanding" style="'+G.getIconUsedBy(G.getRes('cured meat'))+'"></div><div class="freelabel">x250</div>','250 cured meat')+
		G.textWithTooltip('<div class="icon freestanding" style="'+G.getIconUsedBy(G.getRes('water'))+'"></div><div class="freelabel">x250</div>','250 Water')+
		'</div>'+
		'<div class="par fancyText bitBiggerText" style="color:blue"><b>Interested in the mod?<a href="https://discord.com/invite/7XcgfTp7V8" target="_blank">Join the discord!</a></b></div>'+
		'<div class="par fancyText bitBiggerText">Your tribe finds a place to settle in the wilderness.<br>Resources are scarce, and everyone starts foraging.</div>'+
		'<div class="par fancyText bitBiggerText">It seems like they need you to assign them to find water.</div>'+
		'<div class="par fancyText bitBiggerText">You emerge as the tribe\'s leader. They call you :</div>';
		return str;
	}

	G.funcs['new game']=function()
	{
		var str='Your name is '+G.getName('ruler')+''+(G.getName('ruler').toLowerCase()=='orteil'?' <i>(but that\'s not you, is it?)</i>':'')+', ruler of '+G.getName('civ')+'. Your tribe is primitive, but full of hope.<br>The first year of your legacy has begun. May it stand the test of time.';

		G.Message({type:'important tall',text:str,icon:[0,3]})
		{
		 if(G.achievByName['mausoleum'].won > 0)
		 {
			 {G.gainTech(G.techByName['mausoleum complete'])};
			 G.middleText('Is this afterlife? <br>You seems to have little idea of where you are.<br>Until your tribe members walks up on you.','slow')
		 }
		 if(G.achievByName['mausoleum'].won > 1) 
		 {G.gainTech(G.techByName['mausoleum complete']),G.middleText('You know where you are.<br>And this is not after life.<br>You started to question it.','slow')}
		 }

		 function getRandomInt(max) {
			return Math.floor(Math.random() * max);
		  }
		 var origin = getRandomInt(5);
		 if(origin==0){G.gainTech(G.techByName['forest origin'])};
		 if(origin==1){G.gainTech(G.techByName['mountain origin'])};
		 if(origin==2){G.gainTech(G.techByName['desert origin'])};
		 if(origin==3){G.gainTech(G.techByName['swamp origin'])};
		 if(origin==4){G.gainTech(G.techByName['jungle origin'])};
		 if(origin==5){G.gainTech(G.techByName['arctic origin'])};
		 
		 

	};

	G.funcs['game over']=function()
	{
		var str=G.getName('civ')+' is no more, and your legacy is but a long-lost memory, merely a sidenote in a history book.<br>Everyone is either dead or escaped.';
		G.Message({type:'bad',text:str,icon:[5,4]});
	}
	G.funcs['game loaded']=function()
	{
		G.Message({type:'important tall',text:'Welcome back, '+G.getName('ruler')+', ruler of '+G.getName('civ')+'.',icon:[0,3]});
	}
	G.funcs['new year']=function()
	{
		if (G.on)
		{
			var str='';
			str+='It is now the year '+(G.year+1)+'.<br>';
			str+='Report for last year :<br>';
			str+='&bull; Births : '+B(G.getRes('born this year').amount)+'<br>';
			str+='&bull; Deaths : '+B(G.getRes('died this year').amount)+'<br>';
			G.getRes('born this year').amount=0;
			G.getRes('died this year').amount=0;
			G.Message({type:'important',text:str,icon:[0,3]});
			
			//influence trickle
			if (G.getRes('influence').amount<=G.getRes('authority').amount-1)G.gain('influence',1);
			if (G.getRes('resource depletion').amount>=0)G.gain('resource depletion',-100);
		}
	}
	
	G.props['new day lines']=[
		'Creatures are lurking.',
		'Danger abounds.',
		'Wild beasts are on the prowl.',
		'Large monsters roam, unseen.',
		'This is a cold night.',
		'No sound but the low hum of a gray sky.',
		'The darkness is terrifying.',
		'Clouds twist in complicated shapes.',
		'It is raining.',
		'Dark birds caw ominously in the distance.',
		'There is a storm on the horizon.',
		'The night is unforgiving.',
		'Creatures crawl in the shadows.',
		'A stream burbles quietly nearby.',
		'In the distance, a prey falls to a pack of beasts.',
		'An unexplained sound echoes on the horizon.',
		'Everything stands still in the morning air.',
		'A droning sound fills the sky.',
		'The night sky sparkles, its mysteries unbroken.',
		'Dry bones crack and burst underfoot.',
		'Wild thorns scratch the ankles.',
		'Something howls in the distance.',
		'Strange ashes snow down slowly from far away.',
		'A blood-curdling wail is heard.',
		'Unknown creatures roll and scurry in the dirt.',
		'The air carries a peculiar smell today.',
		'Wild scents flow in from elsewhere.',
		'The dust is oppressive.',
		'An eerie glow from above illuminates the night.',
		'Distant lands lay undisturbed.'
	];
	
	shuffle(G.props['new day lines']);
	G.funcs['new day']=function()
	{
		if (G.on)
		{
			if (G.getSetting('atmosphere') && Math.random()<0.01)
			{
				//show a random atmospheric message occasionally on new days
				//we pick one of the first 5 lines in the array, then push that line back at the end; this means we get a semi-random stream of lines with no frequent repetitions
				var i=Math.floor(Math.random()*5);
				var msg=G.props['new day lines'].splice(i,1)[0];
				G.props['new day lines'].push(msg);
				G.Message({text:msg});
			}
			if (G.has('humid weather'))G.gain('resource depletion',-5);
			
			//possibility to gain random traits everyday
			for (var i in G.trait)
			{
				var me=G.trait[i];
				if(G.has(me.name))
				{
				var lt = me.lifetime
				if(me.lifetime >= 1 && me.lifetime!=Infinity)
				{
					me.lifetime -= 1
					if (me.lifetime === 0 && me.lifetime!=Infinity)
					{	
						G.Message({type:'important tall',text:'A trait has lost its effect </b>.'});		
						G.deleteTrait(me);
						me.lifetime += 150
					}
					
				}
				}
				if (!G.has(me.name))
				{
	

					if (Math.random()<1/(me.chance*300))
					{

						if (G.checkReq(me.req) && G.testCost(me.cost,1))
						{
							G.doCost(me.cost,1);
							G.gainTrait(me);
							G.Message({type:'important tall',text:'Your people have adopted the trait <b>'+me.displayName+'</b>.',icon:me.icon});
						}

					}
				}
			}
			
			G.trackedStat=Math.max(G.trackedStat,G.getRes('population').amount);
		}
	}
	
	G.funcs['tracked stat str']=function()
	{
		return 'Most population ruled';
	}
	
	G.funcs['civ blurb']=function()
	{
		var str='';
		str+='<div class="fancyText shadowed">'+
		'<div class="barred infoTitle">The land of '+G.getName('civ')+'</div>'+
		'<div class="barred">ruler : '+G.getName('ruler')+'</div>';
		var toParse='';
		var pop=G.getRes('population').amount;
		if (pop>0)
		{
			toParse+='Population : <b>'+B(pop)+' [population,'+G.getName((pop==1?'inhab':'inhabs'))+']</b>//';
			var stat=G.getRes('happiness').amount/pop;
			var text='unknown';if (stat<=-200) text='miserable'; else if (stat<=-100) text='mediocre'; else if (stat<=-50) text='low'; else if (stat<50) text='average'; else if (stat<100) text='pleasant'; else if (stat<=200) text='high'; else if (stat>=200) text='euphoric';
			toParse+='Happiness : <b>'+text+'</b>//';
			var stat=G.getRes('health').amount/pop;
			var text='unknown';if (stat<=-200) text='dreadful'; else if (stat<=-100) text='sickly'; else if (stat<=-50) text='low'; else if (stat<50) text='average'; else if (stat<100) text='good'; else if (stat<=200) text='gleaming'; else if (stat>=200) text='examplary';
			toParse+='Health : <b>'+text+'</b>//';
		}
		else toParse+='All '+G.getName('inhabs')+' have died out.';
		str+=G.parse(toParse);
		str+='</div>';
		return str;
	}
	
	G.funcs['found tile']=function(tile)
	{
		G.Message({type:'good',mergeId:'foundTile',textFunc:function(args){
			if (args.count==1) return 'Our explorers have found a new tile : <b>'+args.tile.land.displayName+'</b>.';
			else return 'Our explorers have found '+B(args.count)+' new tiles; the latest is <b>'+args.tile.land.displayName+'</b>.';
		},args:{tile:tile,count:1},icon:[14,4]});

	}
	
	G.funcs['production multiplier']=function()
	{
		var mult =1
		if (G.getRes('population').amount>0)
		{
			var happiness=(G.getRes('happiness').amount/G.getRes('population').amount)/100;
			var infrastructure=(G.getDict('infrastructure').amount-G.getDict('infrastructure').used)
			happiness=Math.max(-2,Math.min(2,happiness));
			if (happiness>=0) mult=(Math.pow(2,happiness+1)/2);
			else mult=1/(Math.pow(2,-happiness+1)/2);
			if (infrastructure >= 0.1*G.getDict('infrastructure').amount)
			mult += 0.2 
		}
		return mult;
	}
	G.deleteTrait=function(me)
	{
			var index=G.traitsOwned.indexOf(me);
			G.traitsOwned.splice(index,1);//remove trait
			G.traitsOwnedNames.splice(index,1);
			G.applyKnowEffects(me,true,true);
			G.update['trait']();
	}
	
	
	/*=====================================================================================
	RESOURCES
	=======================================================================================*/
	G.resCategories={
		'main':{
			name:'Essentials',
			base:[],
			side:['population','worker','happiness','health','productivity','land','coin'],
		},
		'stats':{
			name:'Statistics',
			base:['baby','child','adult','elder','worker','sick','wounded'],
			side:['population','infrastructure','housing','building slot','corpse','burial spot','resource depletion'],
		},
		'food':{
			name:'Food & Water',
			base:[],
			side:['food','spoiled food','water','muddy water','food storage'],
		},
		'consumeables':{
			name:'Consumeables & Seasonings',
			base:[],
		},
		'build':{
			name:'Crafting & Construction',
			base:[],
			side:['archaic building materials','basic building materials','advanced building materials','precious building materials','material storage','treasury storage'],
		},
		'ore':{
			name:'Ores and chemicals',
			base:[],
		},
		'gear':{
			name:'Gear',
			base:[],
			side:[],
		},
		'misc':{
			name:'Miscellaneous',
			base:[],
		},
	};
	
	new G.Res({name:'died this year',hidden:true});
	new G.Res({name:'born this year',hidden:true});
	
	var numbersInfo='//The number on the left is how many are in use, while the number on the right is how many you have in total.';
	
	new G.Res({
		name:'coin',
		displayName:'Coins',
		desc:'[#coin,Currency] has a multitude of uses, from paying the upkeep on units to purchasing various things.//Before the invention of currency, [food] is used instead.',
		icon:[13,1],
		replacement:'food',
		tick:function(me,tick)
		{
			if (me.replacement) me.hidden=true; else me.hidden=false;
		}
	});
	
	new G.Res({
		name:'population',
		desc:'Your [population] represents everyone living under your rule. These are the people that look to you for protection, survival, and glory.',
		meta:true,
		visible:true,
		icon:[0,3],

		tick:function(me,tick)
		{
			//this.displayName=G.getName('inhabs');

			if (me.amount>0)
			{
				//note : we also sneak in some stuff unrelated to population here
				//policy ticks
				if (tick%50==0)
				{
					var rituals=['mating gathering','healing rituals','wisdom rituals'];
					for (var i in rituals)
					{
						if (G.checkPolicy(rituals[i])=='on')
						{
							if (G.getRes('faith').amount<=0) G.setPolicyModeByName(rituals[i],'off');
							else G.lose('faith',1,'rituals');
						}
					}

					var tactics=['systematic gathering'];
					for (var i in tactics)
					{
						if (G.checkPolicy(tactics[i])=='on')
						{
							if (G.getRes('influence').amount<=0) G.setPolicyModeByName(tactics[i],'off');
							else G.lose('influence',5,'tactics');
						}
					}
				}
				
				var productionMult=G.doFunc('production multiplier',1);
				
				var deathUnhappinessMult=1;

				if (tick%3==0 && G.checkPolicy('disable eating')=='off')
				{
					//drink water
					var toConsume=0;
					var weights={'baby':0.1,'child':0.3,'adult':0.5,'elder':0.5,'sick':0.4,'wounded':0.4};
					if (G.has('desert origin')) {
						if (rations=='meager');
						G.gain('happiness',me.amount*0.3,'Desert sprit');}
					for (var i in weights)
					{toConsume+=G.getRes(i).amount*weights[i];}
					var rations=G.checkPolicy('water rations');
					if (rations=='none') {toConsume=0;G.gain('happiness',-me.amount*3,'water rations');G.gain('health',-me.amount*2,'water rations');}
					else if (rations=='meager') {toConsume*=0.5;G.gain('happiness',-me.amount*1,'water rations');G.gain('health',-me.amount*0.5,'water rations')}
					else if (rations=='plentiful') {toConsume*=1.5;G.gain('happiness',me.amount*1,'water rations');}
					toConsume=randomFloor(toConsume);
					var lacking=toConsume-G.lose('water',toConsume,'drinking');
					if (rations=='none') lacking=me.amount*0.5;
					if (lacking>0)//are we out of water?
					{
						//resort to muddy water
						if (rations!='none' && G.checkPolicy('drink muddy water')=='on') lacking=lacking-G.lose('muddy water',lacking,'drinking');
						if (lacking>0 && G.checkPolicy('disable aging')=='off')//are we also out of muddy water?
						{
							G.gain('happiness',-lacking*5,'no water');
							//die off
							var toDie=(lacking/5)*0.05;
							if (G.year<1) toDie/=5;//less deaths in the first year
							var died=0;
							var weights={'baby':0.1,'child':0.2,'adult':0.5,'elder':1,'sick':0.3,'wounded':0.3};//the elderly are the first to starve off
							var sum=0;for (var i in weights){sum+=weights[i];}for (var i in weights){weights[i]/=sum;}//normalize
							for (var i in weights){var ratio=(G.getRes(i).amount/me.amount);weights[i]=ratio+(1-ratio)*weights[i];}
							for (var i in weights)
							{var n=G.lose(i,randomFloor((Math.random()*0.8+0.2)*toDie*weights[i]),'dehydration');died+=n;}
							G.gain('corpse',died,'dehydration');
							G.gain('happiness',-died*20*deathUnhappinessMult,'dehydration');
							G.getRes('died this year').amount+=died;
							if (died>0) G.Message({type:'bad',mergeId:'diedDehydration',textFunc:function(args){return B(args.died)+' '+(args.died==1?'person':'people')+' died from dehydration.';},args:{died:died},icon:[5,4]});
						}
					}
					
					//eat food
					var toConsume=0;
					var consumeMult=1;
					var happinessAdd=0;
					if (G.has('lessened desire')) {consumeMult*=0.5}
					else if (G.has('desire to consume')) {consumeMult*=1.5;happinessAdd+=0.5;}
					var weights={'baby':0.2,'child':0.5,'adult':1,'elder':1,'sick':0.75,'wounded':0.75};
					if (G.has('desert origin')) {
						if (rations=='meager');
						G.gain('happiness',me.amount*0.1,'Desert sprit');};
					for (var i in weights)
					{toConsume+=G.getRes(i).amount*weights[i];}
					var rations=G.checkPolicy('food rations');
					if (rations=='none') {toConsume=0;G.gain('happiness',-me.amount*3,'food rations');G.gain('health',-me.amount*2,'food rations');}
					else if (rations=='meager') {toConsume*=0.5;G.gain('happiness',-me.amount*0.25,'food rations');G.gain('health',-me.amount*0.05,'food rations');}
					else if (rations=='plentiful') {toConsume*=1.5;G.gain('happiness',me.amount*0.25,'food rations');}
					toConsume=randomFloor(toConsume*consumeMult);
					var consumed=G.lose('food',toConsume,'eating');
					G.gain('happiness',G.lose('salt',randomFloor(consumed*0.1),'eating')*5,'salting food');//use salt
					G.gain('health',G.lose('salt',randomFloor(consumed*0.1),'eating')*5,'salting food');//use salt
					G.gain('happiness',G.lose('spice',randomFloor(consumed*0.1),'eating')*1,'flavourful food');//use spice
					G.gain('happiness',consumed*happinessAdd,'food culture');
					var lacking=toConsume-consumed;
					if (rations=='none') lacking=me.amount*1;
					
					if (lacking>0)//are we out of food?
					{
						//resort to spoiled food
						if (rations!='none' && G.checkPolicy('eat spoiled food')=='on') lacking=lacking-G.lose('spoiled food',lacking,'eating');
						if (lacking>0 && G.checkPolicy('disable aging')=='off')//are we also out of spoiled food?
						{
							G.gain('happiness',-lacking*5,'no food');
							//die off
							var toDie=(lacking/5)*0.05;
							if (G.year<1) toDie/=5;//less deaths in the first year
							var died=0;
							var weights={'baby':0.1,'child':0.2,'adult':0.5,'elder':1,'sick':0.3,'wounded':0.3};//the elderly are the first to starve off
							var sum=0;for (var i in weights){sum+=weights[i];}for (var i in weights){weights[i]/=sum;}//normalize
							for (var i in weights){var ratio=(G.getRes(i).amount/me.amount);weights[i]=ratio+(1-ratio)*weights[i];}
							for (var i in weights)
							{var n=G.lose(i,randomFloor((Math.random()*0.8+0.2)*toDie*weights[i]),'starvation');died+=n;}
							G.gain('corpse',died,'starvation');
							G.gain('happiness',-died*20*deathUnhappinessMult,'starvation');
							G.getRes('died this year').amount+=died;
							if (died>0) G.Message({type:'bad',mergeId:'diedStarvation',textFunc:function(args){return B(args.died)+' '+(args.died==1?'person':'people')+' died from starvation.';},args:{died:died},icon:[5,4]});
						}
					}
				}
				
				//clothing
				var objects={'basic clothes':[0.1,0.1],'primitive clothes':[0,0]};
				var leftout=me.amount;
				var prev=leftout;
				var fulfilled=0;
				for (var i in objects)
				{
					fulfilled=Math.min(me.amount,Math.min(G.getRes(i).amount,leftout));
					G.gain('happiness',fulfilled*objects[i][0],'clothing');
					G.gain('health',fulfilled*objects[i][1],'clothing');
					leftout-=fulfilled;
				}
				G.gain('happiness',-leftout*0.15,'no clothing');
				G.gain('health',-leftout*0.15,'no clothing');
				
				//fire
				var objects={'fire pit':[10,0.1,0.1],'torch':[5,0.1,0.1]};
				var leftout=me.amount;
				var prev=leftout;
				var fulfilled=0;
				for (var i in objects)
				{
					fulfilled=Math.min(me.amount,Math.min(G.getRes(i).amount*objects[i][0],leftout));
					G.gain('happiness',fulfilled*objects[i][1],'warmth & light');
					G.gain('health',fulfilled*objects[i][2],'warmth & light');
					leftout-=fulfilled;
				}
				G.gain('happiness',-leftout*0.1,'cold & darkness');
				G.gain('health',-leftout*0.1,'cold & darkness');
				
				//homelessness
				var homeless=Math.max(0,(me.amount)-G.getRes('housing').amount);
				if (G.has('sedentism') && me.amount>25 && homeless>0)
				{
					if (tick%10==0) G.Message({type:'bad',mergeId:'homeless',textFunc:function(args){return B(args.n)+' '+(args.n==1?'person is':'people are')+' homeless.<br>Homelessness with more than 25 population leads to lower birth rates.';},args:{n:homeless},replaceOnly:true,icon:[12,4]});
				}
				
				//age
				if (G.checkPolicy('disable aging')=='off')
				{
					if (G.year>=15)//no deaths of old age the first 10 years
					{
						var n=randomFloor(G.getRes('elder').amount*0.00035);
						G.gain('corpse',n,'old age');
						G.lose('elder',n,'old age');
						G.gain('happiness',-n*5*deathUnhappinessMult,'death');
						if (n>0) G.Message({type:'bad',mergeId:'diedAge',textFunc:function(args){return B(args.n)+' '+(args.n==1?'person':'people')+' died of old age.';},args:{n:n},icon:[13,4]});
						
						G.getRes('died this year').amount+=n;
					}
					if (G.year>=20)//no aging adults the first 5 years
					{
						var n=randomFloor(G.getRes('adult').amount*0.0002);
						G.gain('elder',n,'-');G.lose('adult',n,'aging up');
					}
					var n=randomFloor(G.getRes('child').amount*0.002);G.gain('adult',n,'aging up');G.lose('child',n,'aging up');
					var n=randomFloor(G.getRes('baby').amount*0.005);G.gain('child',n,'aging up');G.lose('baby',n,'aging up');
					
					//births
					var parents=G.getRes('adult').amount+G.getRes('elder').amount;
					if (parents>=2)//can't make babies by yourself
					{
						var born=0;
						var birthRate=2;
						if (me.amount<100) birthRate*=4;//more births if low pop
						if (me.amount<10) birthRate*=4;//even more births if very low pop
						if (G.checkPolicy('mating gathering')=='on') birthRate*=1.2;
						if (G.checkPolicy('population control')=='forbidden') birthRate*=0;
						else if (G.checkPolicy('population control')=='limited') birthRate*=0.5;
						if (G.getRes('food')>50*G.getRes('population')) birthRate*=1.5;//more births for food abundance
						birthRate*=productionMult;
						if (homeless>0 && me.amount>15) birthRate*=0.05;//harder to make babies if you have more than 15 people and some of them are homeless
						var n=randomFloor(G.getRes('adult').amount*0.0003*birthRate);G.gain('baby',n,'birth');G.gain('happiness',n*10,'birth');born+=n;
						var n=randomFloor(G.getRes('elder').amount*0.00003*birthRate);G.gain('baby',n,'birth');G.gain('happiness',n*10,'birth');born+=n;
						G.getRes('born this year').amount+=born;
						if (born>0) G.Message({type:'good',mergeId:'born',textFunc:function(args){return B(args.born)+' '+(args.born==1?'baby has':'babies have')+' been born.';},args:{born:born},icon:[2,3]});
					}
					
					//health (diseases and wounds)
					//note : when a sick or wounded person recovers, they turn into adults; this means you could get a community of old people fall sick, then miraculously age back. life is a mystery
					
					//sickness
					var toChange=0.00003;
					if (G.getRes('health').amount<0)
					{
						toChange*=(1+Math.abs(G.getRes('health').amount/me.amount));
					}
					if (toChange>0)
					{
						if (G.year<5) toChange*=0.5;//less disease the first 5 years
						if (me.amount<=15) toChange*=0.5;
						if (G.checkPolicy('healing rituals')=='on') toChange*=0.8;
						var changed=0;
						var weights={'baby':2,'child':1.5,'adult':1,'elder':2};
						if (G.checkPolicy('child workforce')=='on') weights['child']*=1.2;
						if (G.checkPolicy('elder workforce')=='on') weights['elder']*=1.2;
						if (G.year<5) weights['adult']=0;//adults don't fall sick the first 5 years
						for (var i in weights)
						{var n=G.lose(i,randomFloor(Math.random()*G.getRes(i).amount*toChange*weights[i]),'-');changed+=n;}
						G.gain('sick',changed,'disease');
						if (changed>0) G.Message({type:'bad',mergeId:'fellSick',textFunc:function(args){return B(args.n)+' '+(args.n==1?'person':'people')+' fell sick.';},args:{n:changed},icon:[6,3]});
					}
					//sickness : death and recovery
					var sickMortality=0.005;
					var changed=0;
					var n=G.lose('sick',randomFloor(Math.random()*G.getRes('sick').amount*sickMortality),'disease');G.gain('corpse',n,'disease');changed+=n;
					G.gain('happiness',-changed*15*deathUnhappinessMult,'death');
					G.getRes('died this year').amount+=changed;
					if (changed>0) G.Message({type:'bad',mergeId:'diedSick',textFunc:function(args){return B(args.n)+' '+(args.n==1?'person':'people')+' died from disease.';},args:{n:changed},icon:[5,4]});
					
					var sickHealing=0.01;
					if (G.checkPolicy('healing rituals')=='on') sickHealing*=1.2;
					var changed=0;
					var n=G.lose('sick',randomFloor(Math.random()*G.getRes('sick').amount*sickHealing),'healing');G.gain('adult',n,'-');changed+=n;
					G.gain('happiness',changed*10,'recovery');
					if (changed>0) G.Message({type:'good',mergeId:'sickRecovered',textFunc:function(args){return B(args.n)+' sick '+(args.n==1?'person':'people')+' got better.';},args:{n:changed},icon:[4,3]});
					
					//wounds
					var toChange=0.00003;
					if (toChange>0)
					{
						if (G.year<5) toChange*=0.5;//less wounds the first 5 years
						if (me.amount<=15) toChange*=0.5;
						var changed=0;
						var weights={'baby':2,'child':1.5,'adult':1,'elder':2};
						if (G.checkPolicy('child workforce')=='on') weights['child']*=2;
						if (G.checkPolicy('elder workforce')=='on') weights['elder']*=1.2;
						if (G.year<5) weights['adult']=0;//adults don't get wounded the first 5 years
						for (var i in weights)
						{var n=G.lose(i,randomFloor(Math.random()*G.getRes(i).amount*toChange*weights[i]),'-');changed+=n;}
						G.gain('wounded',changed,'accident');
						if (changed>0) G.Message({type:'bad',mergeId:'gotWounded',textFunc:function(args){return B(args.n)+' '+(args.n==1?'person':'people')+' got wounded.';},args:{n:changed},icon:[7,3]});
					}
					//wounds : death and recovery
					var woundMortality=0.005;
					var changed=0;
					var n=G.lose('wounded',randomFloor(Math.random()*G.getRes('wounded').amount*woundMortality),'wounds');G.gain('corpse',n,'wounds');changed+=n;
					G.gain('happiness',-changed*15*deathUnhappinessMult,'death');
					G.getRes('died this year').amount+=changed;
					if (changed>0) G.Message({type:'bad',mergeId:'diedWounded',textFunc:function(args){return B(args.n)+' '+(args.n==1?'person':'people')+' died from their wounds.';},args:{n:changed},icon:[5,4]});
					
					var sickHealing=0.005;
					var changed=0;
					var n=G.lose('wounded',randomFloor(Math.random()*G.getRes('wounded').amount*sickHealing),'healing');G.gain('adult',n,'-');changed+=n;
					G.gain('happiness',changed*10,'recovery');
					if (changed>0) G.Message({type:'good',mergeId:'woundedRecovered',textFunc:function(args){return B(args.n)+' '+(args.n==1?'person':'people')+' recovered from their wounds.';},args:{n:changed},icon:[4,3]});
				}
				
			}
			else if (G.T>0) {G.GameOver();}
			
		},
		getDisplayAmount:function()
		{
			if (G.has('census')) return (G.getRes('population').amount)
			else{ 
				if (G.getRes('population').amount>1000) return '1000+';
				else if (G.getRes('population').amount<=1000) return (G.getRes('population').amount)
		}
		}
	});
	new G.Res({
		name:'baby',
		desc:'[baby,Babies] are what happens when you have 2 or more [adult,Adults] left to their own devices.//Any 2 adults can have babies, even if they are working. [elder]s can also have babies, though much slower.//[happiness] affects how many babies your people make.//Over time, babies will grow into [child,Children].//Babies drink and eat half as much as children.',
		startWith:1,
		visible:true,
		partOf:'population',
		icon:[2,3],
	});
	new G.Res({
		name:'child',
		desc:'[child,Children] grow from [baby,Babies] over time.//After a while, they will grow up into [adult,Adults].//Children drink and eat half as much as adults.//Children do not count as [worker,Workers], unless special measures are in place.',
		startWith:3,
		visible:true,
		partOf:'population',
		icon:[3,3],
		getDisplayAmount:function()
		{
			if (G.has('census')) return (G.getRes('child').amount)
			else{ 
				if (G.getRes('population').amount>1000) return '1000+';
				else if (G.getRes('population').amount<=1000) return (G.getRes('child').amount)
		}
	}
	});
	new G.Res({
		name:'adult',
		desc:'[adult,Adults] grow from [child,Children] over time.//They eventually age into [elder,Elders].//Generally, adults make up most of your [worker,workforce].',
		startWith:7,
		visible:true,
		partOf:'population',
		icon:[4,3],
		getDisplayAmount:function()
		{
			if (G.has('census')) return (G.getRes('adult').amount)
			else{ 
				if (G.getRes('population').amount>1000) return '1000+';
				else if (G.getRes('population').amount<=1000) return (G.getRes('adult').amount)
		}
	}
	});
	new G.Res({
		name:'elder',
		desc:'[adult,Adults] that grow old are [elder,Elders].//Elders may end up [corpse,dying] of old age.//Elders do not count as [worker,Workers], unless special measures are in place.',
		startWith:2,
		visible:true,
		partOf:'population',
		icon:[5,3],
		getDisplayAmount:function()
		{
			if (G.has('census')) return (G.getRes('elder').amount)
			else{ 
				if (G.getRes('population').amount>1000) return '1000+';
				else if (G.getRes('population').amount<=1000) return (G.getRes('elder').amount)
			}
		}
	});
	new G.Res({
		name:'sick',
		desc:'[adult,People] can fall [sick,sick] when your [health] levels are too low. They do not [worker,work], but may be healed over time.',
		partOf:'population',
		icon:[6,3],
	});
	new G.Res({
		name:'wounded',
		desc:'[adult,People] may get [wounded,wounded] due to work injuries, or from war. They do not [worker,work], but may slowly get better over time.',
		partOf:'population',
		icon:[7,3],
	});
	new G.Res({
		name:'corpse',
		desc:'[corpse,Corpses] are the remains of [population,People] that died, whether from old age, accident, disease, starvation or war.//Corpses left in the open air tend to spread diseases and make people unhappy, which gets even worse as superstitions develop. To mitigate this, you need a [burial spot] for each corpse.',
		startWith:0,
		icon:[8,3],
		tick:function(me,tick)
		{
			var graves=G.getRes('burial spot');
			if (G.getRes('population').amount>0)
			{
				if (me.amount>0)
				{
					//bury slowly
					if (graves.amount>graves.used)
					{
						var amount=Math.min(graves.amount-graves.used,Math.max(10,randomFloor(me.amount*0.1)));
						graves.used+=amount;G.lose('corpse',amount,'burial');
						G.gain('happiness',amount*2,'burial');
					}
				}
			}
			if (graves.amount<graves.used)
			{
				//more occupied burial spots than total burial spots? this means we've been deleting burial spot that was already containing corpses; exhume those suckers
				var toExhume=randomFloor((graves.used-graves.amount)*0.1);
				graves.used-=toExhume;
				G.gain('corpse',toExhume,'not enough burial spots');
			}
			
			var toSpoil=me.amount*0.02;
			var spent=G.lose('corpse',randomFloor(toSpoil),'decay');
			
			var unhappiness=0.01;
			if (G.has('burial')) unhappiness*=2;
			G.gain('happiness',-me.amount*unhappiness,'corpses');
			G.gain('health',-me.amount*0.1,'corpses');
		},
	});
	new G.Res({
		name:'burial spot',
		desc:'Each [burial spot] has enough room for one [corpse], letting you prevent the spread of disease and unhappiness.//By default, corpses are buried at the rate of 1 per day.//The number on the left is how many burial spots are occupied, while the number on the right is how many you have in total.',
		icon:[13,4],
		displayUsed:true,
	});
	new G.Res({
		name:'housing',
		desc:'Each [housing,Housing spot] accommodates one [population,Person].//Beyond the 15 people a nomad tribe can support, your population will only grow if you have empty housing.//Homelessness (having less housing than population) will lead to unhappiness and disease.//The number on the left is how much housing is occupied, while the number on the right is how much housing room you have in total.',
		icon:[12,4],
		getDisplayAmount:function()
		{
			return B(Math.min(this.displayedAmount,G.getRes('population').displayedAmount))+'<wbr>/'+B(this.displayedAmount);
		},
	});
	new G.Res({
		name:'land',
		desc:'Each tile of territory you own grants you some [land] (200 per fully-explored non-ocean tile, by default) upon which you can construct buildings. If for some reason you find yourself with less land than your buildings are using, some of them will start to slowly crumble away.//The number on the left is how much land is occupied, while the number on the right is how much land you have in total.',
		icon:[14,4],
		displayUsed:true,
		tick:function(me)
		{
			me.amount=Math.ceil(G.currentMap.territoryByOwner[1]*200);
			//me.amount=G.tiles;
			//TODO : this stuff
			/*
				concept :
					-each tile owned can be explored to 100%
					-you get one land per explored percent per tile
					-some techs also add a +10 etc bonus to the max of 100 land per full tile
					-we need to setup a system to recalculate this when appropriate
			*/
		},
		getDisplayAmount:function()
		{
			return B(this.displayedUsedAmount)+'<wbr>/'+B(this.displayedAmount);
		},
	});
	new G.Res({
		name:'building slot',
		desc:'Each structure group of you own grants you some [building slot]s upon which you can construct buildings.//The number on the left is how much land is occupied, while the number on the right is how much land you have in total.',
		icon:[12,3,'H1sheet'],
		displayUsed:true,
		getDisplayAmount:function()
		{
			return B(this.displayedUsedAmount)+'<wbr>/'+B(this.displayedAmount);
		},
	});
	new G.Res({
		name:'infrastructure',
		desc:'[infrastructure] is the blood vessel of civlizations. Which population and goods flow through. Productive structures take up it. If you dont have enough of it. [productivity] will decrease.If you have enough spare [infrastructure], [productivity] will increase.',
		icon:[12,3,'H1sheet'],
		displayUsed:true,
		getDisplayAmount:function()
		{
			return B(this.displayedUsedAmount)+'<wbr>/'+B(this.displayedAmount);
		},
	});

	new G.Res({
		name:'resource depletion',
		desc:'[resource depletion] is the consquence of gathering or hunting too much. Result in negative traits.',
		icon:[12,3,'H1sheet'],
	});

	new G.Res({
		name:'productivity',
		desc:'[productivity] describes the extra/lessend effeciciency your [worker]s are working at, which is what stats like [happiness] and [health], the amount of [infrastructure]s affects.',
		visible:true,
		icon:[14,3,'H1sheet'],
		fractional:true,
		getDisplayAmount:function()
		{
			var productionMult=G.doFunc('production multiplier',1)-1;
			return (productionMult).toFixed(2)+'%'
		},
		getIcon:function(me)
		{
				var productionMult=G.doFunc('production multiplier',1)-1;
				if (productionMult>0) return [14,3,'H1sheet'];
				else if (productionMult<0) return [15,3,'H1sheet'];
				else return [15,3,'H1sheet']
		},
	});	
	new G.Res({
		name:'worker',
		desc:'Your [worker,Workforce] is the part of your [population] that is ready to work.//The number on the left is how many are currently being employed, while the number on the right is your total amount of workers.',
		startWith:0,
		visible:true,
		displayUsed:true,
		icon:[1,3],

		getDisplayAmount:function(me)
		{
			if (G.has('census')) return B(this.displayedUsedAmount)+'<wbr>/'+B(this.displayedAmount)
			else{ 
				if (G.getRes('population').amount>1000) return '1000+';
			    else if (G.getRes('population').amount<=1000) return B(this.displayedUsedAmount)+'<wbr>/'+B(this.displayedAmount)
			}
		},
		tick:function(me,tick)
		{
			me.amount=G.getRes('adult').amount;
			if (G.checkPolicy('elder workforce')=='on') me.amount+=G.getRes('elder').amount;
			if (G.checkPolicy('child workforce')=='on') me.amount+=G.getRes('child').amount;
			if (me.used>me.amount)
			{
				//TODO maybe ?
				//select all units that require workers
				//pick some at random until we have enough people to reach the difference between workers and workers needed
				//kill them if the unit has no gizmos, otherwise reduce the unit's percent by 1 rank
				//maybe this could be generalized to work will all requirements
				//or not ? some requirements have unique conditions, such as : 10 factories running at 50% only use half the workers and tools, but still need 10 land
				//maybe this could just be a flag on land, reqIgnoresPercent=true
				//but then how do we deal with the situation where we have less land available than land used (like after a war where we lost tiles) ? the desired behavior would be that buildings slowly die off until we're under the threshold
				//maybe just implement a "onReqFail" function that overrides the default behavior
			}
		},
	});
	
	new G.Res({
		name:'happiness',
		desc:'[happiness] describes the global level of well-being of your [population].//Happy people work even harder, while unhappy people tend to slack off; at +100% happiness, most of your workers will work twice as fast, while at -100% happiness, they will work twice as slow. This goes on up to +200% and -200%.//Several things improve happiness, such as good [food,food], entertainment, or luxury items; things that bring down happiness are spoiled food, starvation, disease, death and harsh policies.//Happiness and unhappiness both tend to level off over time.',
		startWith:0,
		visible:true,
		icon:[3,4],
		fractional:true,
		tick:function(me,tick)
		{
			if (G.getRes('population').amount>0 && tick%2==0)
			{
				me.amount*=0.99;
			}
		},
		getDisplayAmount:function()
		{
			if (G.getRes('population').amount<=0) return '-';
			var amount=(this.displayedAmount/G.getRes('population').displayedAmount);
			if (amount>200) amount=200;
			if (amount<-200) amount=-200;
			return B(amount)+'%';
		},
		getIcon:function(me)
		{
			if (G.getRes('population').amount<=0) return [5,4];
			else
			{
				var amount=me.amount/G.getRes('population').amount;
				if (amount>=100) return [4,4];
				else if (amount>=50) return [3,4];
				else if (amount>=-50) return [2,4];
				else if (amount>=-100) return [1,4];
				else return [0,4];
			}
		},
	});
	
	new G.Res({
		name:'health',
		desc:'[health] represents the average physical condition of your [population].//Lower health tends to make people [sick] and unhappy, while higher health will make people happier.//Health can be affected by a number of things : eating raw or spoiled [spoiled food,Food], drinking [muddy water], poor living conditions, and ongoing plagues.',
		startWith:0,
		visible:true,
		icon:[3,5],
		fractional:true,
		tick:function(me,tick)
		{
			if (G.getRes('population').amount>0 && tick%2==0)
			{
				//note : this is "soft" sickness; it affects the chance of people falling sick
				//G.getRes('happiness').amount+=(me.amount-G.getRes('happiness').amount)*0.01;
				G.gain('happiness',me.amount*0.001,'health');
				
				var sickness=0.1;
				sickness+=Math.pow(Math.max(0,G.getRes('population').amount-50),0.1)*0.1;//more people means more contagion
				G.gain('health',-G.getRes('population').amount*(Math.random()*sickness),'disease');//people randomly get sick
				var recovery=0.98;
				me.amount*=recovery;//people recover over time
			}
		},
		getDisplayAmount:function()
		{
			if (G.getRes('population').amount<=0) return '-';
			return B(this.displayedAmount/G.getRes('population').displayedAmount)+'%';
		},
		getIcon:function(me)
		{
			if (G.getRes('population').amount<=0) return [5,5];
			else
			{
				var amount=me.amount/G.getRes('population').amount;
				if (amount>=100) return [4,5];
				else if (amount>=50) return [3,5];
				else if (amount>=-50) return [2,5];
				else if (amount>=-100) return [1,5];
				else return [0,5];
			}
		},
	});
	
	new G.Res({
		name:'food storage',
		desc:'Each [food storage] unit slows down decay for one [food] unit.//The number on the left is how much food storage is occupied, while the number on the right is how much you have in total.',
		icon:[12,5],
		tick:function(me,tick)
		{
			var amount=0;
			amount+=G.getRes('basket').amount*10;
			amount+=G.getRes('pot').amount*25;
			amount+=G.getRes('ice').amount;
			amount+=G.getRes('added food storage').amount;
			me.amount=amount;
		},
		getDisplayAmount:function()
		{
			return B(Math.min(this.displayedAmount,G.getRes('food').displayedAmount))+'<wbr>/'+B(this.displayedAmount);
		},
	});
	new G.Res({
		name:'added food storage',
		//food storage added by buildings
		desc:'',
		icon:[12,5],
		hidden:true,
	});
	
	new G.Res({
		name:'material storage',
		desc:'Each [material storage] unit lowers the rate of decay or theft for one unit of your materials.//The number on the left is how much material storage is occupied, while the number on the right is how much you have in total.',
		icon:[14,5],
		tick:function(me,tick)
		{
			var amount=0;
			amount+=G.getRes('added material storage').amount;
			me.amount=amount;
			
			var materials=0;
			for (var i in G.props['perishable materials list'])
			{
				var mat=G.props['perishable materials list'][i];
				materials+=mat.amount;
			}
			me.used=materials;
			
			if (materials>0)
			{
				var stored=Math.min(materials,amount)/materials;
				var notStored=1-stored;
				
				for (var i in G.props['perishable materials list'])
				{
					var mat=G.props['perishable materials list'][i];
					
					var toSpoil=mat.amount*0.002*notStored+mat.amount*0.0001*stored;
					var spent=G.lose(mat.name,randomFloor(toSpoil),'decay');
				}
			}
			
			G.props['perishable materials list']=[];
		},
		getDisplayAmount:function()
		{
			return B(Math.min(this.displayedAmount,this.displayedUsedAmount))+'<wbr>/'+B(this.displayedAmount);
		},
		displayUsed:true,
	});
	new G.Res({
		name:'added material storage',
		//material storage added by buildings
		desc:'',
		icon:[14,5],
		hidden:true,
	});
	new G.Res({
		name:'treasury storage',
		desc:'Each [treasury storage] unit lowers the rate of decay or theft for one unit of your materials.//The number on the left is how much material storage is occupied, while the number on the right is how much you have in total.',
		icon:[15,5,'H1sheet'],
		tick:function(me,tick)
		{
			var amount=0;
			amount+=G.getRes('added treasury storage').amount;
			me.amount=amount;
			
			var materials=0;
			for (var i in G.props['perishable treasury list'])
			{
				var mat=G.props['perishable treasury list'][i];
				materials+=mat.amount;
			}
			me.used=materials;
			
			if (materials>0)
			{
				var stored=Math.min(materials,amount)/materials;
				var notStored=1-stored;
				
				for (var i in G.props['perishable treasury list'])
				{
					var mat=G.props['perishable treasury list'][i];
					
					var toSpoil=mat.amount*0.002*notStored+mat.amount*0.0001*stored;
					var spent=G.lose(mat.name,randomFloor(toSpoil),'decay');
				}
			}
			
			G.props['perishable treasury list']=[];
		},
		getDisplayAmount:function()
		{
			return B(Math.min(this.displayedAmount,this.displayedUsedAmount))+'<wbr>/'+B(this.displayedAmount);
		},
		displayUsed:true,
	});
	new G.Res({
		name:'added treasury storage',
		//treasury storage added by buildings
		desc:'',
		icon:[15,5,'H1sheet'],
		hidden:true,
	});
	new G.Res({
		name:'water',
		desc:'[water] is required to keep your [population,people] hydrated, at the rate of half a unit per person every 3 ticks (although babies and children drink less).//Without water, people will resort to drinking [muddy water], which is unhealthy; if that runs out too, your people will simply die off.//Most terrains have some fresh water up for gathering - from ponds, streams and rain; drier locations will have to rely on well digging.//Water turns into [muddy water] over time, if your water storage is insufficient.',
		icon:[7,6],
		startWith:250,
		visible:true,
		turnToByContext:{'drinking':{'health':0.01,'happiness':0}},
		tick:function(me,tick)
		{
			if (G.checkPolicy('disable spoiling')=='off')
			{
				var toSpoil=me.amount*0.02;
				var spent=G.lose('water',randomFloor(toSpoil),'decay');
				G.gain('muddy water',randomFloor(spent),'decay');
			}
		},
	});
	new G.Res({
		name:'muddy water',
		desc:'[muddy water] tastes awful and is unhealthy, but is better than dying of thirst. Your people will default to drinking it in the absence of fresh [water].//Muddy water can be collected while gathering, from stagnant pools or old rainwater; [water] also turns into muddy water over time, if not stored properly. Additionally, muddy water itself will slowly dry out.',
		icon:[8,6],
		visible:true,
		turnToByContext:{'drinking':{'health':-0.075,'happiness':-0.02}},
		tick:function(me,tick)
		{
			if (G.checkPolicy('disable spoiling')=='off')
			{
				var toSpoil=me.amount*0.01;
				var spent=G.lose('muddy water',randomFloor(toSpoil),'decay');
			}
		},
	});
	
	new G.Res({
		name:'food',
		desc:'[food] is consumed by your [population,people] when they get hungry, at the rate of 1 unit per person every 3 ticks (although babies and children eat less).//Some types of food are tastier or healthier than others.//Note that some food types may or may not be eaten depending on policies in place.//Food will slowly decay into [spoiled food] if you lack proper food storage.',
		meta:true,
		visible:true,
		icon:[3,6],
		tick:function(me,tick)
		{
			if (me.amount>0 && G.checkPolicy('disable spoiling')=='off')
			{
				var stored=Math.min(me.amount,G.getRes('food storage').amount)/me.amount;
				var notStored=1-stored;
				
				var toSpoil=me.amount*0.025*notStored+me.amount*0.00005*stored;
				var spent=G.lose('food',randomFloor(toSpoil),'decay');
				//G.gain('spoiled food',randomFloor(spent));
			}
		},
	});
	new G.Res({
		name:'spoiled food',
		desc:'[spoiled food] is eaten when no other [food] is available, in a last-ditch effort to fend off starvation.//Spoiled food is terribly unhealthy and tastes just as bad. Over time, it will decay even further into inedibility.',
		icon:[3,7],
		visible:true,
		turnToByContext:{'eating':{'health':-0.3,'happiness':-0.5}},
		tick:function(me,tick)
		{
			if (G.checkPolicy('disable spoiling')=='off')
			{
				var toSpoil=me.amount*0.01;
				var spent=G.lose('spoiled food',randomFloor(toSpoil),'decay');
			}
		},
	});
	
	//a trick to make different food types spoil at different speeds : turnToByContext:{'decay':{'fruit':0.2}} would make fruit last 20% longer (note : the food may still produce spoiled food)
	
	new G.Res({
		name:'herb',
		desc:'[herb,Herbs] are various plants, roots and mushrooms that can be collected by simply foraging around. While relatively healthy to eat, they tend to taste fairly unpleasant.',
		icon:[4,6],
		turnToByContext:{'eating':{'health':0.001,'happiness':-0.03},'decay':{'herb':0.2,'spoiled food':0.8}},
		partOf:'food',
		category:'food',
	});
	new G.Res({
		name:'fruit',
		desc:'[fruit,Fruits], whether gathered from berry bushes or fruit trees, are both sweet-tasting and good for you.',
		icon:[4,7],
		startWith:250,
		turnToByContext:{'eating':{'health':0.02,'happiness':0.01},'decay':{'spoiled food':1}},
		partOf:'food',
		category:'food',
	});

	new G.Res({
		name:'vegetable',
		desc:'@[vegetable]s, are [herb] that is the most editable and has high nutrition.',
		icon:[18,7,'H1sheet'],
		turnToByContext:{'eating':{'health':0.05},'decay':{'spoiled food':1}},
		partOf:'food',
		category:'food',
	});

	new G.Res({
		name:'meat',
		desc:'[meat,Raw meat] is gathered from dead animals and, while fairly tasty, can harbor a variety of diseases.',
		icon:[5,7],
		turnToByContext:{'eating':{'health':-0.03,'happiness':0.02,'bone':0.1},'decay':{'spoiled food':1}},
		partOf:'food',
		category:'food',
	});
	new G.Res({
		name:'cooked meat',
		desc:'Eating [cooked meat] is deeply satisfying and may even produce a [bone].',
		icon:[6,7],
		turnToByContext:{'eating':{'health':0.02,'happiness':0.04,'bone':0.05},'decay':{'cooked meat':0.2,'spoiled food':0.8}},
		partOf:'food',
		category:'food',
	});
	new G.Res({
		name:'cured meat',
		desc:'[cured meat] is interestingly tough and can keep for months without spoiling.',
		icon:[11,6],
		turnToByContext:{'eating':{'health':0.02,'happiness':0.05,'bone':0.1},'decay':{'cured meat':0.95,'spoiled food':0.05}},
		partOf:'food',
		category:'food',
	});
	new G.Res({
		name:'seafood',
		desc:'[seafood,Raw seafood] such as fish, clams, or shrimps, is both bland-tasting and several kinds of nasty.',
		icon:[5,6],
		turnToByContext:{'eating':{'health':-0.02,'happiness':0.01,'bone':0.02},'decay':{'spoiled food':1}},
		partOf:'food',
		category:'food',
	});
	new G.Res({
		name:'cooked seafood',
		desc:'[cooked seafood] tastes pretty good and has various health benefits.',
		icon:[6,6],
		turnToByContext:{'eating':{'health':0.03,'happiness':0.03,'bone':0.02},'decay':{'cooked seafood':0.2,'spoiled food':0.8}},
		partOf:'food',
		category:'food',
	});
	new G.Res({
		name:'cured seafood',
		desc:'[cured seafood] has a nice smoky flavor and lasts terribly long.',
		icon:[12,6],
		turnToByContext:{'eating':{'health':0.02,'happiness':0.04,'bone':0.02},'decay':{'cured seafood':0.95,'spoiled food':0.05}},
		partOf:'food',
		category:'food',
	});

	new G.Res({
		name:'egg',
		desc:'[egg] can be eaten in all ways, and it is pretty nutritious.',
		icon:[13,6,'H1sheet'],
		turnToByContext:{'eating':{'health':0.01},'decay':{'spoiled food':1}},
		partOf:'food',
		category:'food',
	});
	
	new G.Res({
		name:'bread',
		desc:'[bread] is filling, nutritious, and usually not unpleasant to eat; for these reasons, it is often adopted as staple food by those who can produce it.',
		icon:[7,7],
		turnToByContext:{'eating':{'health':0.02,'happiness':0.02},'decay':{'spoiled food':1}},
		partOf:'food',
		category:'food',
	});
	
	new G.Res({
		name:'bugs',
		desc:'Worms, insects, spiders - [bugs] are easily caught, but are usually not considered [food].',
		icon:[8,11],
		turnToByContext:{'eating':{'health':0,'happiness':-0.05},'decay':{'spoiled food':0.5}},
		//partOf:'food',
		category:'food',
		tick:function(me,tick)
		{
			var toLose=me.amount*0.003;//bugs don't like to stick around
			var spent=G.lose(me.name,randomFloor(toLose),'decay');
		}
	});
	
	
	G.props['perishable materials list']=[];
	G.props['perishable treasury list']=[];
	var loseMaterialsTick=function(me,tick)
	{
		if (G.checkPolicy('disable spoiling')=='off')
		{
			G.props['perishable materials list'].push(me);
		}
	};
	var losePreciousMaterialsTick=function(me,tick)
	{
		if (G.checkPolicy('disable spoiling')=='off')
		{
			G.props['perishable treasury list'].push(me);
		}
	};
	new G.Res({
		//hidden, used for every material that can be stored in a warehouse that isn't part of any other material
		name:'misc materials',
		meta:true,
		tick:loseMaterialsTick,
		hidden:true,
	});

	new G.Res({
		name:'archaic building materials',
		desc:'Materials such as [stick]s and [stone]s, used to build rudimentary structures.',
		icon:[2,7],
		meta:true,
		tick:loseMaterialsTick,
	});
	new G.Res({
		name:'stone',
		desc:'Just a simple rock. Found regularly when foraging, and even more commonly when digging, mining or quarrying.',
		icon:[2,6],
		partOf:'archaic building materials',
		category:'build',
	});
	new G.Res({
		name:'stick',
		desc:'A short but sturdy branch. Obtained when foraging or when felling a tree.',
		icon:[0,6],
		partOf:'archaic building materials',
		category:'build',
	});
	new G.Res({
		name:'limestone',
		desc:'A fairly soft mineral. Can be foraged from some places, but is more commonly extracted while mining or quarrying.',
		icon:[6,8],
		partOf:'archaic building materials',
		category:'build',
	});
	new G.Res({
		name:'mud',
		desc:'Dirt saturated with water; found often when foraging or digging.',
		icon:[0,7],
		partOf:'archaic building materials',
		category:'build',
	});
	
	new G.Res({
		name:'basic building materials',
		desc:'Processed materials such as [cut stone,Stone blocks], [brick]s and [lumber], used to build basic structures.',
		icon:[2,8],
		meta:true,
		tick:loseMaterialsTick,
	});
	new G.Res({
		name:'cut stone',
		desc:'[stone]s carved into blocks for easier hauling and building.',
		icon:[0,8],
		partOf:'basic building materials',
		category:'build',
	});
	new G.Res({
		name:'log',
		desc:'Chopped wood that can be directly used in construction, but can also be processed into [lumber].',
		icon:[1,6],
		partOf:'basic building materials',
		category:'build',
	});
	new G.Res({
		name:'lumber',
		desc:'[log]s that have been processed into planks, making them an adaptable and resilient building material.',
		icon:[1,8],
		partOf:'basic building materials',
		category:'build',
	});
	new G.Res({
		name:'clay',
		desc:'Found by digging in damp soil; can be baked into [brick]s.',
		icon:[1,7],
		partOf:'misc materials',
		category:'build',
	});
	new G.Res({
		name:'brick',
		desc:'Made from fired [clay]; can be used to construct solid walls efficiently.',
		icon:[3,8],
		partOf:'basic building materials',
		category:'build',
	});
	
	new G.Res({
		name:'advanced building materials',
		desc:'Building materials such as [concrete] and [glass], used to build advanced structures.',
		icon:[3,9],
		meta:true,
		tick:loseMaterialsTick,
	});
	new G.Res({
		name:'sand',
		desc:'Easily harvested from deserts and beaches; may be processed into [glass].',
		icon:[4,9],
		partOf:'misc materials',
		category:'build',
	});
	new G.Res({
		name:'glass',
		desc:'Obtained by melting [sand]; can be used to construct windows, which are part of most advanced buildings.',
		icon:[4,8],
		partOf:'advanced building materials',
		category:'build',
	});
	new G.Res({
		name:'concrete',
		desc:'An exceptionally sturdy construction material, made by mixing [limestone] with [water] and letting it set.',
		icon:[5,8],
		partOf:'advanced building materials',
		category:'build',
	});
	
	new G.Res({
		name:'precious building materials',
		desc:'Building materials such as [marble], used to build monuments.',
		icon:[16,8],
		meta:true,
		tick:losePreciousMaterialsTick,
	});
	new G.Res({
		name:'marble',
		desc:'A construction material prized for its decorative properties, that can also be employed in sculptures.',
		icon:[7,8],
		partOf:'precious building materials',
		category:'build',
	});
	new G.Res({
		name:'gold block',
		desc:'A valuable, if unreliable construction material.',
		icon:[14,8],
		partOf:'precious building materials',
		category:'build',
	});
	new G.Res({
		name:'gem block',
		desc:'A precious building material used only for the finest monuments.',
		icon:[choose([17,18]),8],//i can't pick
		partOf:'precious building materials',
		category:'build',
	});
	
	new G.Res({
		name:'copper ore',
		desc:'Ore that can be processed into [soft metal ingot]s.',
		icon:[9,8],
		category:'ore',
		tick:loseMaterialsTick,
	});
	new G.Res({
		name:'iron ore',
		desc:'Ore that can be processed into [hard metal ingot]s.',
		icon:[10,8],
		category:'ore',
		tick:loseMaterialsTick,
	});
	new G.Res({
		name:'gold ore',
		desc:'Ore that can be processed into [precious metal ingot]s.',
		icon:[11,8],
		category:'ore',
		tick:loseMaterialsTick,
	});
	new G.Res({
		name:'tin ore',
		desc:'Ore that can be processed into [soft metal ingot]s.',
		icon:[13,8],
		category:'ore',
		tick:loseMaterialsTick,
	});
	
	new G.Res({
		name:'gems',
		desc:'Shiny, valuable minerals from deep under the earth.',
		icon:[7,9],
		partOf:'misc materials',
		category:'ore',
		tick:loseMaterialsTick,
	});
	
	new G.Res({
		name:'coal',
		desc:'Extracted from mines; makes a good source of energy, and can be used in alloying.',
		icon:[12,8],
		partOf:'misc materials',
		category:'ore',
		tick:loseMaterialsTick,
	});
	
	new G.Res({
		name:'soft metal ingot',
		desc:'Soft, malleable metal that can be used to make basic [metal tools].//Includes tin and copper.',
		icon:[9,9],
		partOf:'misc materials',
		category:'build',
	});
	new G.Res({
		name:'hard metal ingot',
		desc:'Tough, durable metal that can be used to craft [metal tools] and weapons.//Includes iron and bronze.',
		icon:[10,9],
		partOf:'misc materials',
		category:'build',
	});
	new G.Res({
		name:'strong metal ingot',
		desc:'Solid metal possessing high tensile strength.//Includes steel.',
		icon:[12,9],
		partOf:'misc materials',
		category:'build',
	});
	new G.Res({
		name:'precious metal ingot',
		desc:'Metal with little industrial usefulness but imbued with valuable aesthetics.//Includes gold and silver.',
		icon:[11,9],
		partOf:'misc materials',
		category:'build',
	});
	
	new G.Res({
		name:'knapped tools',
		desc:'Rudimentary tools made by hitting [stone]s, usually flint, until their edges are sharp enough.'+numbersInfo,
		icon:[0,9],
		displayUsed:true,
		category:'gear',
		tick:function(me,tick)
		{
			var toSpoil=me.amount*0.005;
			var spent=G.lose(me.name,randomFloor(toSpoil),'decay');
		},
	});
	new G.Res({
		name:'stone tools',
		desc:'Simple tools made of [stone]s and [stick]s for a variety of purposes - hammering, cutting, piercing, crushing.'+numbersInfo,
		icon:[1,9],
		displayUsed:true,
		category:'gear',
		tick:function(me,tick)
		{
			var toSpoil=me.amount*0.003;
			var spent=G.lose(me.name,randomFloor(toSpoil),'decay');
		},
	});
	new G.Res({
		name:'metal tools',
		desc:'Solid, durable tools made of metal and wood.'+numbersInfo,
		icon:[2,9],
		displayUsed:true,
		category:'gear',
		tick:function(me,tick)
		{
			var toSpoil=me.amount*0.001;
			var spent=G.lose(me.name,randomFloor(toSpoil),'decay');
		},
	});
	
	new G.Res({
		name:'stone weapons',
		desc:'Simple weapons made of [stone]s and [stick]s.'+numbersInfo,
		icon:[5,9],
		displayUsed:true,
		category:'gear',
		tick:function(me,tick)
		{
			var toSpoil=me.amount*0.005;
			var spent=G.lose(me.name,randomFloor(toSpoil),'decay');
		},
	});
	new G.Res({
		name:'bow',
		desc:'A weapon made of [stick,Wood] that fires [stone]-tipped arrows at a distance.'+numbersInfo,
		icon:[6,9,'H1sheet'],
		displayUsed:true,
		category:'gear',
		tick:function(me,tick)
		{
			var toSpoil=me.amount*0.001;
			var spent=G.lose(me.name,randomFloor(toSpoil),'decay');
		},
	});
	
	var clothesInfo='//Your people automatically wear the highest-quality clothing available, moving on to the next type if there isn\'t enough.';
	new G.Res({
		name:'primitive clothes',
		desc:'Made out of rudimentary materials such as [hide]s or [herb]s.//Each [population,Person] wearing clothing is slightly happier and healthier.'+clothesInfo,
		icon:[15,7],
		category:'gear',
		tick:function(me,tick)
		{
			var toSpoil=me.amount*0.005;
			var spent=G.lose(me.name,randomFloor(toSpoil),'decay');
		},
	});
	new G.Res({
		name:'basic clothes',
		desc:'Sewn together from [leather] or textile fiber.//Each [population,Person] wearing clothing is slightly happier and healthier.'+clothesInfo,
		icon:[16,7],
		category:'gear',
		tick:function(me,tick)
		{
			var toSpoil=me.amount*0.002;
			var spent=G.lose(me.name,randomFloor(toSpoil),'decay');
		},
	});
	
	new G.Res({
		name:'bone',
		desc:'Obtained from the corpse of an animal, or discarded from eating flesh.',
		icon:[8,7],
		partOf:'misc materials',
		category:'build',
	});
	new G.Res({
		name:'hide',
		desc:'A pelt obtained by slicing the skin off a dead animal.',
		icon:[9,7],
		partOf:'misc materials',
		category:'build',
	});
	new G.Res({
		name:'leather',
		desc:'[hide] that has been cured and worked to make it strong and durable for a variety of uses.',
		icon:[10,7],
		partOf:'misc materials',
		category:'build',
	});
	new G.Res({
		name:'statuette',
		desc:'A small idol that was rudimentarily carved from [stone] or [bone].//May be used up over time, creating [culture].',
		icon:[8,9],
		partOf:'misc materials',
		category:'misc',
		tick:function(me,tick)
		{
			var toSpoil=me.amount*0.0025;
			var spent=G.lose(me.name,randomFloor(toSpoil),'decay');
			G.pseudoGather(G.getRes('culture'),randomFloor(spent));
		},
	});
	new G.Res({
		name:'recording medium',
		desc:'A civilisation depends on effective storage of its information.<>Embracement of trait, and lots of technology need it to store experience.',
		icon:[16,5,'H1sheet'],
		partOf:'misc materials',
		category:'misc',
	});

	new G.Res({
		name:'ice',
		desc:'Can be used to preserve [food] longer.//Will melt into [water] over time.',
		icon:[12,7],
		partOf:'misc materials',
		category:'misc',
		tick:function(me,tick)
		{
			var toSpoil=me.amount*0.01;
			var spent=G.lose(me.name,randomFloor(toSpoil),'decay');
			G.gain('water',randomFloor(spent*10),'ice melting');
		},
	});

	new G.Res({
		name:'salt',
		desc:'Gives flavor to [food], rendering it more enjoyable to eat; may also be used to preserve food and make it last longer.',
		icon:[11,7],
		category:'consumeables',
	});

	new G.Res({
		name:'spice',
		desc:'Rare herbs that gives flavor to [food], rendering it absolutely enjoyable to eat.',
		icon:[15,6,'H1sheet'],
		category:'consumeables',
		tick:function(me,tick)
		{
			var toSpoil=me.amount*0.0025;
			var spent=G.lose(me.name,randomFloor(toSpoil),'decay');
		},
	});
	
	new G.Res({
		name:'medical herb',
		desc:'[medical herb] are herbs that can be used in medicine,',
		icon:[14,6,'H1sheet'],
		category:'consumeables',
		tick:function(me,tick)
		{
			var toSpoil=me.amount*0.0025;
			var spent=G.lose(me.name,randomFloor(toSpoil),'decay');
		},
	});

	new G.Res({
		name:'fire pit',
		//desc:'Keeps your tribe warm and may prevent animals from attacking.//Used by some types of crafting.//Will burn out over time.',
		desc:'Keeps your tribe warm; each fire reduces illness for 10 people.//Used by some types of crafting.//Will burn out over time.',
		icon:[13,7],
		category:'consumeables',
		tick:function(me,tick)
		{
			var toSpoil=me.amount*0.01;
			var spent=G.lose(me.name,randomFloor(toSpoil),'decay');
		},
	});

	new G.Res({
		name:'torch',
		desc:'Keeps your tribe warm and bright; each fire reduces illness for 5 people.It is not used in crafting and decays slower.',
		icon:[17,7,'H1sheet'],
		category:'consumeables',
		tick:function(me,tick)
		{
			var toSpoil=me.amount*0.005;
			var spent=G.lose(me.name,randomFloor(toSpoil),'decay');
		},
	});
	
	
	new G.Res({
		name:'basket',
		desc:'Each basket stores 10 [food].//Will decay over time.',
		icon:[14,7],
		category:'misc',
		tick:function(me,tick)
		{
			var toSpoil=me.amount*0.0025;
			var spent=G.lose(me.name,randomFloor(toSpoil),'decay');
		},
	});
	new G.Res({
		name:'pot',
		desc:'Each pot stores 25 [food].//Will decay slowly over time.',
		icon:[13,5],
		category:'misc',
		tick:function(me,tick)
		{
			var toSpoil=me.amount*0.0005;
			var spent=G.lose(me.name,randomFloor(toSpoil),'decay');
		},
	});
	

	
	
	var limitDesc=function(limit){return 'It is limited by your '+limit+'; the closer to the limit, the slower it is to produce more.';};
	var researchGetDisplayAmount=function()
		{
			var limit=G.getDict(this.limit).displayedAmount;
			return B(this.displayedAmount)+'<wbr>/'+B(limit);
		};
	var researchWhenGathered=function(me,amount,by)
		{
			var limit=G.getDict(this.limit).amount;
			if (limit>0)
			{
				var mult=1;
				if (G.year<5) mult=1.25;//faster research the first 5 years
				me.amount+=randomFloor(Math.pow(1-me.amount/limit,2)*(Math.random()*amount*me.mult*mult));
				me.amount=Math.min(me.amount,limit);
			}
		};
	var recording=function()
		{
			G.getDict['record'].amount = G.getDict['record'].amount + G.getDict('recording medium').amount
		};
	new G.Res({
			name:'experience',
			desc:'[experience] represents your people\'s discovery in the world.//'+limitDesc('[record]')+'//Many technologies require experience to be researched.',
			icon:[8,4],
			category:'main',
			limit:'record',
			getDisplayAmount:researchGetDisplayAmount,
			whenGathered:researchWhenGathered,
	});
	new G.Res({
			name:'record',
			hidden:true,
			icon:[16,5,'H1sheet'],
			category:'main',
			recording
	});
	new G.Res({
		name:'insight',
		desc:'[insight] represents your people\'s ideas and random sparks of intuition.//'+limitDesc('[wisdom]')+'//Many technologies require insight to be researched.',
		icon:[8,4],
		category:'main',
		limit:'wisdom',
		getDisplayAmount:researchGetDisplayAmount,
		whenGathered:researchWhenGathered,
	});
	new G.Res({
		name:'wisdom',
		hidden:true,
		icon:[8,5],
		category:'main',
	});
	
	new G.Res({
		name:'science',
		desc:'[science] is the product of experiments and discoveries.//'+limitDesc('[education]')+'//Many technologies require science to be researched.',
		icon:[6,4],
		category:'main',
		limit:'education',
		getDisplayAmount:researchGetDisplayAmount,
		whenGathered:researchWhenGathered,
	});
	new G.Res({
		name:'education',
		hidden:true,
		icon:[6,5],
		category:'main',
	});
	
	new G.Res({
		name:'culture',
		desc:'[culture] is produced when your people create beautiful and thought-provoking things.//'+limitDesc('[inspiration]')+'//Culture is used to develop cultural traits.',
		icon:[10,4],
		category:'main',
		limit:'inspiration',
		getDisplayAmount:researchGetDisplayAmount,
		whenGathered:researchWhenGathered,
	});
	new G.Res({
		name:'inspiration',
		hidden:true,
		icon:[10,5],
		category:'main',
	});
	
	new G.Res({
		name:'faith',
		desc:'[faith] derives from all things divine, from meditation to sacrifices.//'+limitDesc('[spirituality]')+'//Some cultural traits and technologies depend on faith.',
		icon:[7,4],
		category:'main',
		limit:'spirituality',
		getDisplayAmount:researchGetDisplayAmount,
		whenGathered:researchWhenGathered,
	});
	new G.Res({
		name:'spirituality',
		hidden:true,
		icon:[7,5],
		category:'main',
	});
	
	new G.Res({
		name:'influence',
		desc:'[influence] is generated by power structures.//You also get 1 influence point at the start of every year.//'+limitDesc('[authority]')+'//Influence is required to enact most policies or remove traits.',
		icon:[11,4],
		category:'main',
		limit:'authority',
		startWith:5,
		getDisplayAmount:researchGetDisplayAmount,
		whenGathered:researchWhenGathered,
	});
	new G.Res({
		name:'authority',
		hidden:true,
		icon:[11,5],
		category:'main',
	});
	
	/*=====================================================================================
	UNITS
	=======================================================================================*/
	G.unitCategories.push(
		{id:'debug',name:'Debug'},
		{id:'civil',name:'Civil'},
		{id:'crafting',name:'Crafting'},
		{id:'cooking',name:'Cooking'},
		{id:'production',name:'Gathering/Production'},
		{id:'political',name:'Political'},
		{id:'discovery',name:'Discovery'},
		{id:'cultural',name:'Cultural'},
		{id:'spiritual',name:'Spiritual'},
		{id:'exploration',name:'Exploration'},
		{id:'infrastructure',name:'infrastructure'},
		{id:'settlement',name:'Settlements'},
		{id:'storage',name:'Storage'},
		{id:'wonder',name:'Wonders'}
	);
	
	G.MODE_OFF={name:'Off',desc:'The unit will not produce anything.',icon:[1,0]};
	
	var unitGetsConverted=function(into,min,max,message,single,plural)
	{
		//the unit is destroyed and its workers are converted into something else (such as wounded or dead)
		//min and max define the random percent of the unit's amount that gets wounded every day
		return function(me)
		{
			var toChange=Math.min(1,Math.random()*(max-min)+min);
			toChange=randomFloor(me.amount*toChange);
			var workers=0;
			if (me.mode && me.mode.use && me.mode.use['worker']) workers+=me.mode.use['worker'];
			if (me.unit.use['worker']) workers+=me.unit.use['worker'];
			if (me.unit.staff['worker']) workers+=me.unit.staff['worker'];
			if (toChange>0 && workers>0)
			{
				peopleToChange=toChange*workers;
				var changed=0;
				if (true) {var i='adult';var n=G.lose(i,peopleToChange);changed+=n;}
				if (changed<peopleToChange && G.checkPolicy('elder workforce')=='on') {var i='elder';var n=G.lose(i,peopleToChange);changed+=n;}
				if (changed<peopleToChange && G.checkPolicy('child workforce')=='on') {var i='child';var n=G.lose(i,peopleToChange);changed+=n;}
				
				for (var i in into)
				{
					G.gain(i,randomFloor(changed*into[i]),me.unit.displayName+' accident');
				}
				changed/=workers;
				G.wasteUnit(me,changed);
				
				if (changed>0) G.Message({type:'bad',mergeId:'unitGotConverted-'+me.unit.name,textFunc:function(args){
						return args.str.replaceAll('\\[people\\]',(args.n==1?args.single:args.plural)).replaceAll('\\[X\\]',B(args.n));
					},args:{n:changed,str:message,single:single,plural:plural},icon:me.unit.icon});
			}
		}
	}
	
	new G.Unit({
		name:'gatherer',
		startWith:4,
		desc:'@forages for basic [food], [water] and [archaic building materials,Various interesting things]<>A vital part of an early tribe, [gatherer]s venture in the wilderness to gather food, wood, and other things of note.',
		icon:[0,2],
		cost:{},
		use:{'worker':1},
		//upkeep:{'food':0.2},
		//alternateUpkeep:{'food':'spoiled food'},
		gizmos:true,
		modes:{
			'gather food only':{name:'gather food only',icon:[4,7],desc:'Doing their best to self sustain by gathering food from the wild.'},
			'gather water only':{name:'gather water only',icon:[7,6],desc:'Doing their best to self sustain by gathering water from streams.'},
			'gather archaic materials':{name:'gather archaic materials',icon:[2,7],desc:'Ingore food and water,only gather materials'},
			'gather rare herb':{name:'gather rare herbs',icon:[4,6],desc:'Dedicate themselves to find strange herbs with strange properties, such as healing, using [basket]s as tool.',req:{'plant lore':true}},
		},
		effects:[
			{type:'gather',context:'foodgather',amount:2,max:4,mode:'gather food only'},
			{type:'gather',context:'foodgather',what:{'resource depletion':0.05},mode:'gather food only'},
			{type:'gather',context:'watergather',what:{'water':2,'muddy water':4},amount:3,max:6,mode:'gather water only'},
			{type:'gather',context:'watergather',what:{'water':2,'muddy water':4},amount:3,max:6,mode:'gather water only',req:{'humid weather':true}},
			{type:'gather',context:'materialgather',what:{'stick':1,'stone':1,'mud':1},amount:1,max:2,mode:'gather archaic materials',req:{'use of tool':true}},
			{type:'gather',context:'foodgather',what:{'vegetable':0.5,'fruit':0.5,'herb':-0.5},amount:1,max:1,mode:'gather food only',req:{'plant lore':true}},
			{type:'gather',context:'herbgather',amount:2,max:2,mode:'gather rare herb',req:{'plant lore':true},use:{'basket':1}},
			{type:'mult',value:1.1,req:{'forest origin':true}},
			{type:'mult',value:1.25,req:{'side job of the population':'gatherer'}},
			
		],
		req:{'tribalism':true},
		category:'production',
		priority:10,
	});
	new G.Unit({
		name:'labourer',
		desc:'@Hard working Labourers who transfers goods.',
		icon:[21,4,'H1sheet'],
		cost:{},
		use:{'worker':1},
		gizmos:true,
		modes:{
			'carry material':{name:'carry materials',icon:[13,3,'H1sheet'],desc:'Provide 10 [infrastructure]'},
			'carry water':{name:'carry water',use:{'pot':1},icon:[7,6],desc:'Making use of pots and carry liquids back to settlements.',req:{'pottery':true}}
		},
		effects:[
			{type:'gather',what:{'water':6},context:'watergather',amount:6,max:12,mode:'carry water'},
			{type:'provide',what:{'infrastructure':10},mode:'carry material'},
			{type:'gather',context:'foodgather',amount:0.25,max:1,req:{'side job of the population':'gatherer'}},
			{type:'gather',context:'watergather',what:{'water':2,'muddy water':4},amount:0.25,max:1,req:{'side job of the population':'gatherer'}},
			{type:'gather',what:{'resource depletion':0.001},req:{'side job of the population':'gatherer'}},
			{type:'mult',value:0.5,req:{'side job of the population':'gatherer'}},
		],
		req:{'tribalism':true,'chieftain':true},
		category:'infrastructure',
		priority:5,
	});
	new G.Unit({
		name:'mud road',
		desc:'@Provide 5 [infrastructure]<>A convenient way for stuff to move faster...',
		icon:[27,3,'H1sheet'],
		cost:{'stone tools':4},
		effects:[
			{type:'provide',what:{'infrastructure':5}},
			{type:'waste',chance:0.005/1000},
		],
		req:{'digging':true},
		category:'infrastructure',
	});
	new G.Unit({
		name:'stone road',
		desc:'@Provide 20 [infrastructure]<>A convenient way for stuff to move faster...',
		icon:[27,3,'H1sheet'],
		cost:{'cut stone':50},
		upkeep:{'cut stone':0.01},
		effects:[
			{type:'provide',what:{'infrastructure':20}},
			{type:'waste',chance:0.001/1000},
		],
		req:{'masonry':true},
		category:'infrastructure',
	});
	new G.Unit({
		name:'scholar',
		desc:'@generates [insight] every now and then, which you can use to research early technologies<>A [scholar] spends their time observing, thinking, and wondering why things are the way they are.',
		icon:[1,2],
		cost:{},
		use:{'worker':1},
		//upkeep:{'coin':0.2},
		effects:[
			{type:'provide res',what:{'record':10}},
			{type:'gather',what:{'insight':0.005},req:{'symbolism':true}},
			{type:'mult',value:1.2,req:{'wisdom rituals':'on'}},
			{type:'gather',context:'foodgather',amount:0.25,max:1,req:{'side job of the population':'gatherer'}},
			{type:'gather',context:'watergather',what:{'water':2,'muddy water':4},amount:0.25,max:1,req:{'side job of the population':'gatherer'}},
			{type:'gather',what:{'resource depletion':0.001},req:{'side job of the population':'gatherer'}},
			{type:'mult',value:0.5,req:{'side job of the population':'gatherer'}},
		],
		req:{'oral tradition':true},
		category:'discovery',
		priority:5,
	});
	
	new G.Unit({
		name:'storyteller',
		desc:'@generates [culture] every now and then<>[storyteller]s gather the tribe around at nightfall to tell the tales of their ancestors.',
		icon:[14,2],
		cost:{},
		use:{'worker':1},
		upkeep:{'coin':0.1},
		gizmos:true,
		modes:{
			'tell stories':{name:'tell stories',icon:[10,4],desc:'Make up stories to generate small amount of cultrue.'},
			'statuette story telling':{name:'statuette story telling',icon:[8,9],desc:'Use statuette to tell stories in a more intuitive way',req:{'carving':true}},
		},
		effects:[
			{type:'gather',what:{'culture':0.05},mode:'tell stories'},
			{type:'gather',what:{'culture':0.05},mode:'tell stories',req:{'symbolism':true}},
			{type:'convert',from:{'statuette':1},into:{'culture':0.5},mode:'statuette story telling'},
			{type:'mult',value:1.2,req:{'wisdom rituals':'on'}},
			{type:'gather',context:'foodgather',amount:0.25,max:1,req:{'side job of the population':'gatherer'}},
			{type:'gather',context:'watergather',what:{'water':2,'muddy water':4},amount:0.25,max:1,req:{'side job of the population':'gatherer'}},
			{type:'gather',what:{'resource depletion':0.001},req:{'side job of the population':'gatherer'}},
			{type:'mult',value:0.5,req:{'side job of the population':'gatherer'}},
		],
		req:{'oral tradition':true},
		category:'cultural',
	});
	
	new G.Unit({
		name:'artisan',
		desc:'@starts with the ability to turn [stone]s into [knapped tools]@gains more modes as technology progresses<>An [artisan] dedicates their life to crafting various little objects by hand.//Note : artisans will gain new modes of operation when you discover new technologies, such as crafting stone tools; you can press the button with 3 dots on the side of this unit to switch between those modes.',
		icon:[6,2],
		cost:{},
		use:{'worker':1},
		upkeep:{'coin':0.1},
		gizmos:true,
		modes:{
			'knap':{name:'Knap flint',icon:[0,9],desc:'Turn [stone]s into [knapped tools].'},
			'knap bone':{name:'Knap bone',icon:[0,9,8,7],desc:'Turn [bone]s into [knapped tools].',req:{'bone-working':true}},
			'stone tools':{name:'Craft stone tools',icon:[1,9],desc:'Turn [stone]s and [stick]s into [stone tools].',req:{'tool-making':true},use:{'knapped tools':1}},
			'stone weapons':{name:'Craft stone weapons',icon:[5,9],desc:'Turn [stone]s and [stick]s into [stone weapons].',req:{'spears':true},use:{'knapped tools':1}},
			'bows':{name:'Craft bows',icon:[6,9],desc:'Turn [stone]s and [stick]s into [bow]s.',req:{'bows':true},use:{'stone tools':1}},
			'baskets':{name:'Weave baskets',icon:[14,7],desc:'Turn [stick]s into [basket]s.',req:{'basket-weaving':true},use:{'knapped tools':1}},
		},
		effects:[
			{type:'convert',from:{'stone':1},into:{'knapped tools':1},every:5,mode:'knap'},
			{type:'convert',from:{'bone':1},into:{'knapped tools':1},every:5,mode:'knap bone'},
			{type:'convert',from:{'stick':1,'stone':1},into:{'stone tools':1},every:8,mode:'stone tools'},
			{type:'convert',from:{'stick':1,'stone':1},into:{'stone weapons':1},every:8,mode:'stone weapons'},
			{type:'convert',from:{'stick':1,'stone':1},into:{'bow':1},every:10,mode:'bows'},
			{type:'convert',from:{'stick':15},into:{'basket':1},every:10,mode:'baskets'},
			{type:'gather',context:'foodgather',amount:0.25,max:1,req:{'side job of the population':'gatherer'}},
			{type:'gather',context:'watergather',what:{'water':2,'muddy water':4},amount:0.25,max:1,req:{'side job of the population':'gatherer'}},
			{type:'gather',what:{'resource depletion':0.001},req:{'side job of the population':'gatherer'}},
			{type:'mult',value:0.5,req:{'side job of the population':'gatherer'}},
		],
		req:{'stone-knapping':true},
		category:'crafting',
	});
	
	new G.Unit({
		name:'carver',
		desc:'@starts with the ability to turn [stone]s or [bone]s into [statuette]s@gains more modes as technology progresses<>A [carver] uses fine hand-crafting to produce goods out of wood, stone and bone.',
		icon:[21,2],
		cost:{},
		use:{'worker':1},
		upkeep:{'coin':0.1},
		gizmos:true,
		modes:{
			'stone statuettes':{name:'Carve stone statuettes',icon:[8,9],desc:'Turn [stone]s into [statuette]s.',use:{'knapped tools':1}},
			'bone statuettes':{name:'Carve bone statuettes',icon:[8,9],desc:'Turn [bone]s into [statuette]s.',use:{'knapped tools':1}},
			'carve knowledge':{name:'Carve knowledge',icon:[8,9],desc:'Turn [insight] and [log]s into [recording medium] slowly',use:{'stone tools':1},req:{'basic drawing':true}},
			'cut stone':{name:'Cut stones',icon:[0,8],desc:'Slowly turn 10 [stone]s into 1 [cut stone].',req:{'masonry':true},use:{'stone tools':1}},
			'smash cut stone':{name:'Smash stone blocks',icon:[2,6],desc:'Turn [cut stone]s into 9 [stone]s each.',req:{'quarrying':true},use:{'stone tools':1}},
			'gem blocks':{name:'Carve gem blocks',icon:[7,9],desc:'Slowly turn 10 [gems] into 1 [gem block].',req:{'gem-cutting':true},use:{'stone tools':1}}
		},
		effects:[
			{type:'convert',from:{'stone':1},into:{'statuette':1},every:5,mode:'stone statuettes'},
			{type:'convert',from:{'bone':1},into:{'statuette':1},every:5,mode:'bone statuettes'},
			{type:'convert',from:{'insight':20,'log':5},into:{'recording medium':1},every:10,mode:'carve knowledge'},
			{type:'convert',from:{'stone':10},into:{'cut stone':1},every:15,mode:'cut stone'},
			{type:'convert',from:{'cut stone':1},into:{'stone':9},every:5,mode:'smash cut stone'},
			{type:'convert',from:{'gems':10},into:{'gem block':1},every:15,mode:'gem blocks'},
			{type:'gather',context:'foodgather',amount:0.25,max:1,req:{'side job of the population':'gatherer'}},
			{type:'gather',context:'watergather',what:{'water':2,'muddy water':4},amount:0.25,max:1,req:{'side job of the population':'gatherer'}},
			{type:'gather',what:{'resource depletion':0.001},req:{'side job of the population':'gatherer'}},
			{type:'mult',value:0.5,req:{'side job of the population':'gatherer'}},
		],
		req:{'carving':true},
		category:'crafting',
	});
	
	new G.Unit({
		name:'clothier',
		desc:'@works with textiles, notably producing all kinds of clothes<>A [clothier] can make and use fabrics to keep your people clothed, and therefore warm and happy.',
		icon:[19,2],
		cost:{},
		use:{'worker':1},
		upkeep:{'coin':0.2},
		gizmos:true,
		modes:{
			'sew grass clothing':{name:'Sew grass clothing',icon:[15,7],desc:'Craft [primitive clothes] from 30 [herb]s each.',use:{'stone tools':1}},
			'sew hide clothing':{name:'Sew hide clothing',icon:[15,7],desc:'Craft [primitive clothes] from 3 [hide]s each.',use:{'stone tools':1}},
			'weave fiber clothing':{name:'Weave fiber clothing',icon:[16,7],desc:'Craft [basic clothes] from 50 [herb]s each.',use:{'stone tools':1},req:{'weaving':true}},//TODO : implement fibers
			'weave leather clothing':{name:'Weave leather clothing',icon:[16,7],desc:'Craft [basic clothes] from 2 [leather] each.',use:{'stone tools':1},req:{'weaving':true,'leather-working':true}},
			'make leather':{name:'Make leather',icon:[10,7],desc:'Produce [leather] from [hide]s, [water], [salt] and [log]s.',use:{'stone tools':1},req:{'leather-working':true}},
			'cheap make leather':{name:'Make leather (cheap)',icon:[10,7],desc:'Slowly produce [leather] from [hide]s, [muddy water] and [herb]s.',use:{'stone tools':1}},
		},
		effects:[
			{type:'convert',from:{'hide':3},into:{'primitive clothes':1},every:8,mode:'sew hide clothing'},
			{type:'convert',from:{'herb':30},into:{'primitive clothes':1},every:20,mode:'sew grass clothing'},
			{type:'convert',from:{'leather':2},into:{'basic clothes':1},every:8,mode:'weave leather clothing'},
			{type:'convert',from:{'herb':50},into:{'basic clothes':1},every:20,mode:'weave fiber clothing'},
			{type:'convert',from:{'hide':1,'water':5,'salt':1,'log':0.1},into:{'leather':1},every:15,mode:'make leather'},
			{type:'convert',from:{'hide':1,'muddy water':5,'herb':10},into:{'leather':1},every:30,mode:'cheap make leather'},
			{type:'gather',context:'foodgather',amount:0.25,max:1,req:{'side job of the population':'gatherer'}},
			{type:'gather',context:'watergather',what:{'water':2,'muddy water':4},amount:0.25,max:1,req:{'side job of the population':'gatherer'}},
			{type:'gather',what:{'resource depletion':0.001},req:{'side job of the population':'gatherer'}},
			{type:'mult',value:0.5,req:{'side job of the population':'gatherer'}},
		],
		req:{'sewing':true},
		category:'crafting',
	});
	
	new G.Unit({
		name:'hunter',
		desc:'@hunts wild animals for [meat], [bone]s and [hide]s@may get wounded<>[hunter]s go out into the wilderness and come back days later covered in blood and the meat of a fresh kill.',
		icon:[18,2],
		cost:{},
		use:{'worker':1},
		//upkeep:{'coin':0.2},
		gizmos:true,
		modes:{
			'endurance hunting':{name:'Endurance hunting',icon:[0,6],desc:'Hunt animals by simply running after them until they get exhausted.//Slow and tedious.'},
			'spear hunting':{name:'Spear hunting',icon:[5,9],desc:'Hunt animals with spears.',use:{'stone weapons':1},req:{'spears':true}},
			'bow hunting':{name:'Bow hunting',icon:[6,9],desc:'Hunt animals with bows.',use:{'bow':1},req:{'bows':true}},
		},
		effects:[
			{type:'gather',context:'hunt',amount:1,max:5,mode:'endurance hunting'},
			{type:'gather',context:'hunt',what:{'resource depletion':0.05},mode:'endurance hunting'},
			{type:'gather',context:'hunt',amount:2.5,max:5,mode:'spear hunting'},
			{type:'gather',context:'hunt',what:{'resource depletion':0.075},mode:'spear hunting'},
			{type:'gather',context:'hunt',amount:4,max:5,mode:'bow hunting'},
			{type:'gather',context:'hunt',what:{'resource depletion':0.1},mode:'bow hunting'},//TODO : consuming arrows?
			{type:'function',func:unitGetsConverted({'wounded':1},0.001,0.03,'[X] [people] wounded while hunting.','hunter was','hunters were'),chance:1/30},
			{type:'mult',value:1.2,req:{'systematic gathering':'on'}},
			{type:'mult',value:1.15,req:{'jungle origin':true}},
			{type:'gather',context:'foodgather',amount:0.25,max:1,req:{'side job of the population':'gatherer'}},
			{type:'gather',context:'watergather',what:{'water':2,'muddy water':4},amount:0.25,max:1,req:{'side job of the population':'gatherer'}},
			{type:'gather',what:{'resource depletion':0.001},req:{'side job of the population':'gatherer'}},
			{type:'mult',value:0.5,req:{'side job of the population':'gatherer'}},
		],
		req:{'hunting':true},
		category:'production',
		priority:5,
	});
	new G.Unit({
		name:'fisher',
		desc:'@catches [seafood] from rivers and shores<>[fisher]s arm themselves with patience and whatever bait they can find, hoping to trick another creature into becoming dinner.',
		icon:[17,2],
		cost:{},
		use:{'worker':1},
		//upkeep:{'coin':0.2},
		gizmos:true,
		modes:{
			'catch by hand':{name:'Catch by hand',icon:[0,6],desc:'Catch fish with nothing but bare hands.//Slow and tedious.'},
			'spear fishing':{name:'Spear fishing',icon:[5,9],desc:'Catch fish with spears.',use:{'stone weapons':1},req:{'spears':true}},
			'line fishing':{name:'Line fishing',icon:[5,9],desc:'Catch fish with fishing poles.',use:{'stone tools':1},req:{'fishing hooks':true}},
			//TODO : nets
		},
		effects:[
			{type:'gather',context:'fish',amount:1,max:5,mode:'catch by hand'},
			{type:'gather',context:'fish',amount:2.5,max:5,mode:'spear fishing'},
			{type:'gather',context:'fish',amount:4,max:5,mode:'line fishing'},
			{type:'gather',context:'fish',what:{'resource depletion':0.05},mode:'catch by hand'},
			{type:'gather',context:'fish',what:{'resource depletion':0.075},mode:'spear fishing'},
			{type:'gather',context:'fish',what:{'resource depletion':0.1},mode:'line fishing'},
			{type:'mult',value:1.2,req:{'systematic gathering':'on'}},
			{type:'gather',context:'foodgather',amount:0.25,max:1,req:{'side job of the population':'gatherer'}},
			{type:'gather',context:'watergather',what:{'water':2,'muddy water':4},amount:0.25,max:1,req:{'side job of the population':'gatherer'}},
			{type:'gather',what:{'resource depletion':0.001},req:{'side job of the population':'gatherer'}},
			{type:'mult',value:0.5,req:{'side job of the population':'gatherer'}},
		],
		req:{'fishing':true},
		category:'production',
		priority:5,
	});
	new G.Unit({
		name:'firekeeper',
		desc:'@creates [fire pit]s from fuel@gains more fuel types as technology progresses@handles other fire-related tasks<>The [firekeeper] is tasked with starting and maintaining fires to keep the tribe warm.',
		icon:[16,2],
		cost:{},
		use:{'worker':1},
		staff:{},
		upkeep:{'coin':0.1},
		gizmos:true,
		modes:{
			'drilling wood to start fire':{name:'drilling wood to start fire',icon:[0,6,13,7],desc:'Craft [fire pit]s from 24 [stick]s each slowly.'},
			'flint and stone':{name:'flint and stone',icon:[0,6,13,7],desc:'Craft [fire pit]s from 12 [stick]s each quickly.',use:{'knapped tools':1}},
			'make torches':{name:'Start fires from sticks and some herbs',icon:[0,6,13,7],desc:'Craft [torch]s from 5 [stick]s each.',use:{'knapped tools':1}},
			'cook':{name:'Cook',icon:[6,7,13,7],desc:'Turn [meat] and [seafood] into [cooked meat] and [cooked seafood] in the embers of [fire pit]s',req:{'cooking':true}},
			'cure':{name:'Cure & smoke',icon:[11,6,12,6],desc:'Turn 1 [meat] or [seafood] into 2 [cured meat] or [cured seafood] using [salt] in the embers of [fire pit]s',req:{'curing':true}},
	
		},
		effects:[
			{type:'convert',from:{'stick':24},into:{'fire pit':1},every:2,mode:'drilling wood to start fire'},
			{type:'convert',from:{'stick':12},into:{'fire pit':1},every:2,mode:'flint and stone'},
			{type:'convert',from:{'stick':5,'herb':2},into:{'torch':1},every:1,mode:'make torches'},
			{type:'convert',from:{'meat':1,'fire pit':0.01},into:{'cooked meat':1},every:2,repeat:5,mode:'cook'},
			{type:'convert',from:{'seafood':1,'fire pit':0.01},into:{'cooked seafood':1},every:2,repeat:5,mode:'cook'},
			{type:'convert',from:{'meat':1,'salt':1,'fire pit':0.01},into:{'cured meat':2},every:1,repeat:10,mode:'cure'},
			{type:'convert',from:{'seafood':1,'salt':1,'fire pit':0.01},into:{'cured seafood':2},every:1,repeat:10,mode:'cure'},
			{type:'gather',context:'foodgather',amount:0.25,max:1,req:{'side job of the population':'gatherer'}},
			{type:'gather',context:'watergather',what:{'water':2,'muddy water':4},amount:0.25,max:1,req:{'side job of the population':'gatherer'}},
			{type:'gather',what:{'resource depletion':0.001},req:{'side job of the population':'gatherer'}},
			{type:'mult',value:0.5,req:{'side job of the population':'gatherer'}},
		],
		req:{'fire-making':true},
		category:'cooking',
		priority:3,
	});
	
	new G.Unit({
		name:'potter',
		desc:'@uses [clay] or [mud] to craft goods<>The [potter] shapes their clay with great care, for it might mean the difference between fresh water making it to their home safely - or spilling uselessly into the dirt.',
		icon:[20,2],
		cost:{},
		use:{'worker':1},
		staff:{'stone tools':1},
		upkeep:{'coin':0.2},
		gizmos:true,
		modes:{
			'any':{name:'Craft pots out of basic materials',icon:[1,7,13,5],desc:'Craft [pot]s from 3 [clay] or 10 [mud] each; requires [fire pit]s.'},
			'preserve knowledge':{name:'Carve knowledge by firing them onto the clay ',icon:[1,7,13,5],desc:'Craft [recording medium]s from 50 [clay] each; requires [fire pit]s.'},
		},
		effects:[
			{type:'convert',from:{'clay':3,'fire pit':0.01},into:{'pot':1},every:1,mode:'any'},
			{type:'convert',from:{'mud':10,'fire pit':0.01},into:{'pot':1},every:1,mode:'any'},
			{type:'convert',from:{'mud':50,'fire pit':0.05},into:{'recording medium':1},every:1,mode:'preserve knowledge'},
			{type:'gather',context:'foodgather',amount:0.25,max:1,req:{'side job of the population':'gatherer'}},
			{type:'gather',context:'watergather',what:{'water':2,'muddy water':4},amount:0.25,max:1,req:{'side job of the population':'gatherer'}},
			{type:'gather',what:{'resource depletion':0.001},req:{'side job of the population':'gatherer'}},
			{type:'mult',value:0.5,req:{'side job of the population':'gatherer'}},
		],
		req:{'pottery':true},
		category:'crafting',
	});
	new G.Unit({
		name:'kiln',
		desc:'@processes goods with fire<>A [kiln] is an impressive edifice for those not yet accustomed to its roaring fire.',//TODO : desc
		icon:[23,2],
		cost:{'archaic building materials':50,'basic building materials':20},
		use:{'building slot':1,'infrastructure':10},
		//require:{'worker':1,'stone tools':1},
		//upkeep:{'stick':3},//TODO : some fuel system
		modes:{
			'off':G.MODE_OFF,
			'bricks':{name:'Fire bricks',icon:[3,8],desc:'Produce 10 [brick]s out of 1 [clay].',use:{'worker':1,'stone tools':1},req:{}},
		},
		effects:[
			{type:'convert',from:{'clay':1},into:{'brick':10},every:5,mode:'bricks'},
		],
		gizmos:true,
		req:{'masonry':true},
		category:'crafting',
	});
	
	new G.Unit({
		name:'well',
		desc:'@produces fresh [water], up to 20 per day<>The [well] is a steady source of drinkable water.',
		icon:[25,3],
		cost:{'stone':50,'basic building materials':20},
		use:{'building slot':1,'infrastructure':10},
		//require:{'worker':2,'stone tools':2},
		//upkeep:{'coin':0.2},
		effects:[
			{type:'gather',what:{'water':10}},
			{type:'mult',value:1.5,req:{'humid weather':true}}
		],
		category:'production',
		req:{'well-digging':true},
		limitPer:{'land':10},
	});
	
	new G.Unit({
		name:'digger',
		desc:'@digs the soil for [mud] and [stone]<>[digger]s yield various materials that can be used for tool-making and rudimentary construction.',
		icon:[7,2],
		cost:{},
		use:{'worker':1},
		staff:{'knapped tools':1},
		upkeep:{'coin':0.1},
		effects:[
			{type:'gather',context:'dig',amount:1,max:1},
			{type:'gather',context:'dig',what:{'clay':5},max:1,req:{'pottery':true}},
			{type:'gather',context:'foodgather',amount:0.25,max:1,req:{'side job of the population':'gatherer'}},
			{type:'gather',context:'watergather',what:{'water':2,'muddy water':4},amount:0.25,max:1,req:{'side job of the population':'gatherer'}},
			{type:'gather',what:{'resource depletion':0.001},req:{'side job of the population':'gatherer'}},
			{type:'mult',value:0.5,req:{'side job of the population':'gatherer'}},
		],
		req:{'digging':true},
		category:'production',
	});
	new G.Unit({
		name:'quarry',
		desc:'@carves [cut stone] out of the ground@may find other minerals such as [limestone] and [marble]<>The [quarry] dismantles the ground we stand on so that our children may reach higher heights.',
		icon:[22,3],
		cost:{'archaic building materials':100},
		use:{'land':1,'building slot':1,'infrastructure':10},
		//require:{'worker':3,'stone tools':3},
		modes:{
			'off':G.MODE_OFF,
			'quarry':{name:'Quarry stone',icon:[0,8],desc:'Produce [cut stone] and other minerals.',use:{'worker':3,'stone tools':3}},
			'advanced quarry':{name:'Advanced quarry stone',icon:[8,12,0,8],desc:'Produce [cut stone] and other minerals at a superior rate with metal tools.',use:{'worker':3,'metal tools':3}},
		},
		effects:[
			{type:'gather',context:'quarry',amount:5,max:10,every:3,mode:'quarry'},
			{type:'gather',context:'quarry',what:{'cut stone':1},max:5,notMode:'off'},
			{type:'gather',context:'mine',amount:0.005,max:0.05,notMode:'off'},
			{type:'gather',context:'quarry',amount:10,max:30,every:3,mode:'advanced quarry'},
			{type:'function',func:unitGetsConverted({'wounded':1},0.001,0.01,'[X] [people].','quarry collapsed, wounding its workers','quarries collapsed, wounding their workers'),chance:1/50},
		],
		gizmos:true,
		req:{'quarrying':true},
		category:'production',
	});
	new G.Unit({
		name:'mine',
		desc:'@extracts ores, [coal] and [stone] out of the ground@may occasionally collapse<>The workers in [mine]s burrow deep into the earth to provide all kinds of minerals.',
		icon:[22,2],
		cost:{'archaic building materials':100},
		use:{'land':1,'building slot':1,'infrastructure':10},
		//require:{'worker':3,'stone tools':3},
		modes:{
			'off':G.MODE_OFF,
			'any':{name:'Any',icon:[8,8],desc:'Mine without focusing on specific ores.',use:{'worker':5,'stone tools':5}},
			'coal':{name:'Coal',icon:[12,8],desc:'Mine for [coal] with x5 efficiency.',req:{'prospecting':true},use:{'worker':5,'metal tools':5}},
			'salt':{name:'Salt',icon:[11,7],desc:'Mine for [salt].',req:{'prospecting':true},use:{'worker':5,'metal tools':5}},
			'copper':{name:'Copper',icon:[9,8],desc:'Mine for [copper ore] with x5 efficiency.',req:{'prospecting':true},use:{'worker':5,'metal tools':5}},
			'tin':{name:'Tin',icon:[13,8],desc:'Mine for [tin ore] with x5 efficiency.',req:{'prospecting':true},use:{'worker':5,'metal tools':5}},
			'iron':{name:'Iron',icon:[10,8],desc:'Mine for [iron ore] with x5 efficiency.',req:{'prospecting':true},use:{'worker':5,'metal tools':5}},
			'gold':{name:'Gold',icon:[11,8],desc:'Mine for [gold ore] with x5 efficiency.',req:{'prospecting':true},use:{'worker':5,'metal tools':5}},
		},
		effects:[
			{type:'gather',context:'mine',amount:10,max:30,mode:'any'},
			{type:'gather',context:'mine',what:{'stone':10},max:30,notMode:'off'},
			{type:'gather',context:'mine',what:{'coal':50},max:30,mode:'coal'},
			{type:'gather',context:'mine',what:{'salt':50},max:30,mode:'salt'},
			{type:'gather',context:'mine',what:{'copper ore':50},max:30,mode:'copper'},
			{type:'gather',context:'mine',what:{'tin ore':50},max:30,mode:'tin'},
			{type:'gather',context:'mine',what:{'iron ore':50},max:30,mode:'iron'},
			{type:'gather',context:'mine',what:{'gold ore':50},max:30,mode:'gold'},
			{type:'function',func:unitGetsConverted({'wounded':1},0.001,0.01,'[X] [people].','mine collapsed, wounding its miners','mines collapsed, wounding their miners'),chance:1/50},
		],
		gizmos:true,
		req:{'mining':true},
		category:'production',
	});
	new G.Unit({
		name:'furnace',
		desc:'@converts metal ores into ingots that can be used for further crafting<>The [furnace] is employed in various processes to extract the metal in raw ore, as well as for alloying those metals.',
		icon:[24,2],
		cost:{'basic building materials':100},
		use:{'building slot':1,'infrastructure':10},
		//require:{'worker':2,'stone tools':2},
		modes:{
			'off':G.MODE_OFF,
			'copper':{name:'Copper smelting',icon:[9,9],desc:'Cast [soft metal ingot]s out of 9 [copper ore]s each.',use:{'worker':2,'stone tools':2},req:{}},
			'tin':{name:'Tin smelting',icon:[9,9],desc:'Cast [soft metal ingot]s out of 9 [tin ore]s each.',use:{'worker':2,'stone tools':2},req:{}},
			'iron':{name:'Iron smelting',icon:[10,9],desc:'Cast [hard metal ingot]s out of 6 [iron ore]s each.',use:{'worker':2,'metal tools':2},req:{'iron-working':true}},
			'gold':{name:'Gold smelting',icon:[11,9],desc:'Cast [precious metal ingot]s out of 9 [gold ore]s each.',use:{'worker':2,'metal tools':2},req:{'gold-working':true}},
			'bronze':{name:'Bronze alloying',icon:[10,9],desc:'Cast [hard metal ingot]s out of 9 [copper ore]s and 2 [tin ore]s each.',use:{'worker':2,'metal tools':2},req:{'bronze-working':true}},
			'steel':{name:'Steel alloying',icon:[12,9],desc:'Cast [strong metal ingot]s out of 19 [iron ore]s and 1 [coal] each.',use:{'worker':2,'metal tools':2},req:{'steel-making':true}},
		},
		effects:[
			{type:'convert',from:{'copper ore':9},into:{'soft metal ingot':1},repeat:3,mode:'copper'},
			{type:'convert',from:{'tin ore':9},into:{'soft metal ingot':1},repeat:3,mode:'tin'},
			{type:'convert',from:{'iron ore':6},into:{'hard metal ingot':1},repeat:3,mode:'iron'},
			{type:'convert',from:{'gold ore':9},into:{'precious metal ingot':1},repeat:1,mode:'gold'},
			{type:'convert',from:{'tin ore':2,'copper ore':9},into:{'hard metal ingot':1},repeat:3,mode:'bronze'},
			{type:'convert',from:{'iron ore':19,'coal':1},into:{'strong metal ingot':1},repeat:1,mode:'steel'},
			{type:'waste',chance:0.001/1000},
		],
		gizmos:true,
		req:{'smelting':true},
		category:'crafting',
	});
	new G.Unit({
		name:'blacksmith workshop',
		desc:'@forges metal goods out of ingots<>The [blacksmith workshop,Blacksmith] takes the same pride in shaping the tool that tills as they do the sword that slays.',
		icon:[26,2,25,2],
		cost:{'basic building materials':500},
		use:{'building slot':1,'infrastructure':10},
		//require:{'worker':2,'stone tools':2},
		modes:{
			'off':G.MODE_OFF,
			'metal tools':{name:'Forge tools from soft metals',icon:[2,9],desc:'Forge [metal tools] out of 2 [soft metal ingot]s each.',use:{'worker':1,'stone tools':1},req:{}},
			'hard metal tools':{name:'Forge tools from hard metals',icon:[2,9],desc:'Forge 6 [metal tools] out of 1 [hard metal ingot].',use:{'worker':1,'metal tools':1},req:{}},
			'gold blocks':{name:'Forge gold blocks',icon:[14,8],desc:'Forge [gold block]s out of 10 [precious metal ingot]s each.',use:{'worker':1,'stone tools':1},req:{'gold-working':true}},
		},
		effects:[
			{type:'convert',from:{'soft metal ingot':12},into:{'metal tools':1},repeat:2,mode:'metal tools'},
			{type:'convert',from:{'hard metal ingot':3},into:{'metal tools':1},repeat:2,mode:'hard metal tools'},
			{type:'convert',from:{'precious metal ingot':9},into:{'gold block':1},mode:'gold blocks'},
			{type:'waste',chance:0.001/1000},
			//TODO : better metal tools, weapons etc
		],
		gizmos:true,
		req:{'smelting':true},
		category:'crafting',
	});

	new G.Unit({
		name:'library',
		desc:'@provides 10 [wisdom]<>A place for preserving infomation medium, the most popular one being books.//Use up 2 knowledgeable men to classify and check if any morons did not place the book right',
		icon:[30,2,'H1sheet',25,2,'H1sheet'],
		cost:{'basic building materials':500,'recording medium':100},
		use:{'building slot':1,'worker':2,'infrastructure':5},
		//require:{'worker':2,'knapped tools':2},
		effects:[
			{type:'provide',what:{'wisdom':5}},
			{type:'waste',chance:0.001/1000}
		],
		limitPer:{'population':100},
		req:{'writing':true},
		category:'storage',
	});
			
	new G.Unit({
		name:'woodcutter',
		desc:'@cuts trees, producing [log]s<>[woodcutter]s turn forests into precious wood that can be used as fuel or construction materials.',
		icon:[8,2],
		cost:{},
		use:{'worker':1},
		staff:{'knapped tools':1},
		upkeep:{'coin':0.1},
		effects:[
			{type:'gather',wwhat:{'resource depletion':0.05},context:'chop',amount:1,max:1},
			{type:'gather',context:'foodgather',amount:0.25,max:1,req:{'side job of the population':'gatherer'}},
			{type:'gather',context:'watergather',what:{'water':2,'muddy water':4},amount:0.25,max:1,req:{'side job of the population':'gatherer'}},
			{type:'gather',what:{'resource depletion':0.001},req:{'side job of the population':'gatherer'}},
			{type:'mult',value:0.5,req:{'side job of the population':'gatherer'}},
		],
		req:{'woodcutting':true},
		category:'production',
	});
	new G.Unit({
		name:'carpenter workshop',
		desc:'@processes wood<>The [carpenter workshop,Carpenter] is equipped with all kinds of tools to coerce wood into more useful shapes.',
		icon:[27,2,25,2],
		cost:{'basic building materials':100},
		use:{'building slot':1,'infrastructure':10},
		//require:{'worker':2,'stone tools':2},
		modes:{
			'off':G.MODE_OFF,
			'lumber':{name:'Cut logs into lumber',icon:[1,8],desc:'Cut [log]s into 3 [lumber] each.',use:{'worker':1,'stone tools':1},req:{}},
			'Cut sticks':{name:'Cut logs into sticks',icon:[1,8],desc:'Cut [log]s into 21 [stick] each.',use:{'worker':1,'stone tools':1},req:{}},
		},
		effects:[
			{type:'convert',from:{'log':1},into:{'lumber':3},repeat:2,mode:'lumber'},
			{type:'convert',from:{'log':1},into:{'stick':21},repeat:2,mode:'lumber'},
			{type:'waste',chance:0.001/1000},
			
		],
		gizmos:true,
		req:{'carpentry':true},
		category:'crafting',
	});
	
	new G.Unit({
		name:'soothsayer',
		desc:'@generates [faith] and [happiness] every now and then<>[soothsayer]s tell the tales of the dead, helping tribespeople deal with grief.',
		icon:[15,2],
		cost:{},
		use:{'worker':1},
		upkeep:{'coin':0.2},
		effects:[
			{type:'gather',what:{'faith':0.1,'happiness':0.1}},
			{type:'gather',what:{'faith':0.05},req:{'symbolism':true}},
			{type:'gather',context:'foodgather',amount:0.25,max:1,req:{'side job of the population':'gatherer'}},
			{type:'gather',context:'watergather',what:{'water':2,'muddy water':4},amount:0.25,max:1,req:{'side job of the population':'gatherer'}},
			{type:'gather',what:{'resource depletion':0.001},req:{'side job of the population':'gatherer'}},
			{type:'mult',value:0.5,req:{'side job of the population':'gatherer'}},
		],
		req:{'ritualism':true},
		category:'spiritual',
	});
	new G.Unit({
		name:'healer',
		desc:'@uses [medical herb]s to heal the [sick] and the [wounded] slowly<>The [healer] knows the secrets of special plants that make illness stay away.',
		icon:[23,3],
		cost:{},
		use:{'worker':1},
		staff:{'stone tools':1},
		upkeep:{'coin':0.2},
		effects:[
			{type:'convert',from:{'sick':1,'medical herb':2.5},into:{'adult':1},chance:1/5,every:5},
			{type:'convert',from:{'wounded':1,'medical herb':2.5},into:{'adult':1},chance:1/10,every:5},
			{type:'gather',context:'foodgather',amount:0.25,max:1,req:{'side job of the population':'gatherer'}},
			{type:'gather',context:'watergather',what:{'water':2,'muddy water':4},amount:0.25,max:1,req:{'side job of the population':'gatherer'}},
			{type:'gather',what:{'resource depletion':0.001},req:{'side job of the population':'gatherer'}},
			{type:'mult',value:0.5,req:{'side job of the population':'gatherer'}},
		],
		req:{'healing':true},
		category:'spiritual',
		priority:5,
	});
	
	new G.Unit({
		name:'chieftain',
		desc:'@generates [insight] and [influence] every now and then<>The [chieftain] leads over a small group of people, guiding them in their decisions.',
		icon:[18,3],
		cost:{'food':25},
		use:{'worker':1},
		upkeep:{'coin':0.5},
		effects:[
			{type:'gather',what:{'influence':0.1}},
			{type:'gather',what:{'insight':0.05}},
			{type:'gather',what:{'insight':0.05},req:{'speech':true}},
			{type:'gather',what:{'influence':0.025},req:{'chieftain':true}},
			{type:'gather',what:{'influence':0.025},req:{'code of law':true}},
			{type:'mult',value:1.1,req:{'arctic origin':true}}
		],
		limitPer:{'population':50},
		req:{'tribalism':true},
		category:'political',
		priority:5,
	});
	new G.Unit({
		name:'clan leader',
		desc:'@generates [influence] every now and then<>The [clan leader] is followed by many, and is trusted with defending the honor and safety of their people.',
		icon:[19,3,'H1sheet'],
		cost:{'food':100},
		use:{'worker':1},
		upkeep:{'coin':0.75},
		effects:[
			{type:'gather',what:{'influence':0.05}},
			{type:'gather',what:{'influence':0.05},req:{'code of law':true}},
			{type:'provide',what:{'authority':2},req:{'code of law':true}},
			{type:'mult',value:1.1,req:{'arctic origin':true}}
		],
		limitPer:{'population':500},
		req:{'clans':true},
		category:'political',
		priority:5,
	});
	
	new G.Unit({
		name:'grave',
		desc:'@provides 10 [burial spot], in which the [corpse,dead] are automatically interred one by one@graves with buried corpses decay over time, freeing up land for more graves<>A simple grave dug into the earth, where the dead may find rest.//Burying your dead helps prevent [health,disease] and makes your people slightly [happiness,happier].',
		icon:[13,2],
		cost:{},
		use:{'land':1},
		//require:{'worker':1,'knapped tools':1},
		effects:[
			{type:'provide',what:{'burial spot':10}},
			{type:'waste',chance:1/100},
		],
		req:{'burial':true},
		category:'civil',
	});
	
    new G.Unit({
		name:'primitive settlement',
		desc:'@provides 20 [housing]@provides 5 [building slot]s<>A settlement made out of mud, stick and stone.',
		icon:[2,14,'H1sheet'],
		wideIcon:[3,14,'H1sheet'],
		cost:{'archaic building materials':300,'knapped tools':10},
		use:{'land':10},
		effects:[
			{type:'provide',what:{'housing':20}},
            {type:'provide',what:{'building slot':5}},
			{type:'waste',chance:0.001/1000}
		],
		req:{'sedentism':true},
        limitPer:{'population':10},
		category:'settlement',
	});
	new G.Unit({
		name:'village',
		desc:'@provides 100 [housing]@provides 20 [building slot]s<>Sparking of civilisation.',
		icon:[5,14,'H1sheet'],
		wideIcon:[6,14,'H1sheet'],
		cost:{'basic building materials':1e3,'stone tools':50,'authority':1},
		use:{'land':50,'infrastructure':20},
		effects:[
			{type:'provide',what:{'housing':100}},
            {type:'provide',what:{'building slot':20}},
			{type:'waste',chance:0.0005/1000},
		],
		req:{'building':true},
        limitPer:{'population':50},
		category:'settlement',
	});
	new G.Unit({
		name:'city',
		desc:'@Develop a village.@provides 2000 [housing].@provides 100 [building slot]s.<>A tile full of human stuctures.',
		icon:[8,14,'H1sheet'],
		wideIcon:[9,14,'H1sheet'],
		cost:{'basic building materials':1e4,'metal tools':100,'authority':5},
		use:{'land':200,'infrastructure':100},
		effects:[
			{type:'function',func:function(me){
				G.buyUnitByName('village',-1,true);	
			}},
			{type:'provide',what:{'housing':2000}},
			{type:'provide',what:{'housing':1000},req:{'city planning':true}},
            {type:'provide',what:{'building slot':100}},
			{type:'provide',what:{'building slot':20},req:{'city planning':true}},
			{type:'waste',chance:0.0005/1000},
		],
		req:{'cities':true},
		category:'settlement',
	});
	new G.Unit({
		name:'storage pit',
		desc:'@provides 400 [food storage] and 400 [material storage]<>A simple hole in the ground, lined with stones.//Prevents some amount of food from perishing and some goods from being stolen, but may crumble away over time.',
		icon:[12,2],
		cost:{'archaic building materials':50},
		use:{'land':1,'infrastructure':10},
		//require:{'worker':2,'knapped tools':2},
		effects:[
			{type:'provide',what:{'added food storage':400}},
			{type:'provide',what:{'added material storage':400}},
			{type:'waste',chance:0.8/1000}
		],
		req:{'stockpiling':true},
		category:'storage',
	});
	new G.Unit({
		name:'stockpile',
		desc:'@provides 1000 [material storage]<>A simple building where resources are stored.//Slows material decay and deters theft somewhat, but may itself decay over time.',
		icon:[22,4],
		cost:{'archaic building materials':100},
		use:{'building slot':1,'infrastructure':10},
		//require:{'worker':2,'stone tools':2},
		effects:[
			{type:'provide',what:{'added material storage':1000}},
			{type:'waste',chance:0.1/1000}
		],
		req:{'stockpiling':true,'building':true},
		category:'storage',
	});
	new G.Unit({
		name:'warehouse',
		desc:'@provides 4000 [material storage]<>A large building for storing materials. Staffed with two guards to prevent theft.',
		icon:[25,4],
		cost:{'basic building materials':500},
		use:{'building slot':1,'infrastructure':20},
		staff:{'worker':2},
		//require:{'worker':3,'stone tools':3},
		effects:[
			{type:'provide',what:{'added material storage':4000}},
			{type:'waste',chance:0.001/1000}
		],
		req:{'stockpiling':true,'construction':true},
		category:'storage',
	});
	new G.Unit({
		name:'treasury',
		desc:'@provides 4000 [treasury storage]<>A large building for storing materials. Staffed with five guards to prevent theft.',
		icon:[20,4,'H1sheet'],
		cost:{'basic building materials':500},
		use:{'building slot':1,'infrastructure':20},
		staff:{'worker':5},
		//require:{'worker':3,'stone tools':3},
		effects:[
			{type:'provide',what:{'added treasury storage':1000}},
			{type:'waste',chance:0.001/1000}
		],
		req:{'stockpiling':true,'construction':true},
		category:'storage',
	});
	new G.Unit({
		name:'granary',
		desc:'@provides 1000 [food storage]<>A grain storage building built on stilts to prevent pests from getting in.',
		icon:[23,4],
		cost:{'archaic building materials':50,'basic building materials':50,'pot':15},
		use:{'building slot':1,'infrastructure':20},
		//require:{'worker':2,'stone tools':2},
		effects:[
			{type:'provide',what:{'added food storage':1000}},
			{type:'waste',chance:0.01/1000}
		],
		req:{'stockpiling':true,'pottery':true},
		category:'storage',
	});
	new G.Unit({
		name:'barn',
		desc:'@provides 4000 [food storage]<>A large wooden building for storing food. A worker manages the grain to prevent rot.',
		icon:[24,4],
		cost:{'basic building materials':500},
		use:{'building slot':1,'infrastructure':20},
		staff:{'worker':1},
		//require:{'worker':2,'stone tools':2},
		effects:[
			{type:'provide',what:{'added food storage':4000}},
			{type:'waste',chance:0.001/1000}
		],
		req:{'stockpiling':true,'carpentry':true},
		category:'storage',
	});
	
	new G.Unit({
		name:'architect',
		desc:'@can be set to manage automatic building construction<>The [architect] is tasked with fulfilling your people\'s housing needs so that you don\'t have to worry about it too much.',
		icon:[26,4],
		cost:{},
		use:{'worker':1},
		upkeep:{'coin':0.5},
		gizmos:true,
		modes:{
			'off':G.MODE_OFF,
			'undertaker':{name:'Undertaker',icon:[13,2],desc:'Dig [grave]s as long as there are unburied corpses.'},
		},
		effects:[
			{type:'function',func:function(me){
				var wiggleRoom=50;
				var toMake=Math.min(me.amount-me.idle,Math.max(0,(G.getRes('corpse').amount+wiggleRoom)-10*(G.getRes('burial spot').amount-10*G.getRes('burial spot').used)));
				if (toMake>0 && G.canBuyUnitByName('grave',toMake))
				{
					G.buyUnitByName('grave',toMake,true);
				}
			},mode:'undertaker'},
			{type:'gather',context:'foodgather',amount:0.25,max:1,req:{'side job of the population':'gatherer'}},
			{type:'gather',context:'watergather',what:{'water':2,'muddy water':4},amount:0.25,max:1,req:{'side job of the population':'gatherer'}},
			{type:'gather',what:{'resource depletion':0.001},req:{'side job of the population':'gatherer'}},
			{type:'mult',value:0.5,req:{'side job of the population':'gatherer'}},
		],
		limitPer:{'land':100},
		req:{'city planning':true},
		category:'civil',
	});
	
	new G.Unit({
		name:'wanderer',
		desc:'@explores occupied tiles for [land]@cannot discover new tiles@may sometimes get lost<>[wanderer]s walk about in search of new places to settle, reporting what they saw when they come back.<>They also acts as out-going personel between human organizations.',
		icon:[2,2],
		cost:{'food':10},
		upkeep:{'food':1},
		use:{'worker':1},
		gizmos:true,
		modes:{
			'careful exploration':{name:'Careful exploration',desc:'[wanderer]s would mark their path and have the patience, making them explore slower and harder to get lost'},
			'aggressive exploration':{name:'Aggresive exploration',desc:'[wanderer]s would explore at normal rate, the chance of getting lost is normal'},
			'recuit wild human':{name:'Recuit wild human',desc:'[wanderer]s will try to intergrate any wild man they can communicate into our tribe, they use up [culture] and [food]s in this process.',req:{'chieftains':true,'tribe migration':true}},
		},
		effects:[
			{type:'explore',explored:0.075,unexplored:0,mode:'careful exploration'},
			{type:'explore',explored:0.125,unexplored:0,mode:'aggressive exploration'},
			{type:'convert',from:{'culture':3,'food':5},into:{'adult':1},chance:1/100,req:{'chieftains':true},mode:'recuit wild human'},
			{type:'convert',from:{'culture':3,'food':5},into:{'elder':1},chance:1/150,req:{'chieftains':true},mode:'recuit wild human'},
			{type:'convert',from:{'culture':3,'food':5},into:{'child':1},chance:1/80,req:{'chieftains':true},mode:'recuit wild human'},
			{type:'function',func:unitGetsConverted({},0.01,0.05,'[X] [people].','wanderer got lost','wanderers got lost'),chance:1/200,mode:'careful exploration'},
			{type:'function',func:unitGetsConverted({},0.01,0.05,'[X] [people].','wanderer got lost','wanderers got lost'),chance:1/50,mode:'aggressive exploration'},
			{type:'mult',value:1.1,req:{'mountain origin':true}},
		],
		req:{'speech':true},
		category:'exploration',
	});
	new G.Unit({
		name:'scout',
		desc:'@discovers new tiles for [land]@cannot explore occupied tiles@may sometimes get lost<>[scout]s explore the world in search of new territories.',
		icon:[24,3],
		cost:{'food':100},
		use:{'worker':1},
		staff:{'stone tools':1},
		effects:[
			{type:'explore',explored:0,unexplored:0.01},
			{type:'function',func:unitGetsConverted({},0.01,0.05,'[X] [people].','scout got lost','scouts got lost'),chance:1/300}
		],
		req:{'scouting':true},
		category:'exploration',
	});
	
	//wonders
	
	new G.Unit({
		name:'mausoleum',
		desc:'@leads to the <b>Mausoleum Victory</b><>A mystical monument where the dead lie.//A temple housing a tomb deep under its rocky platform, the Mausoleum stands tall, its eternal shadow forever reminding your people of your greatness.',
		wonder:'mausoleum',
		icon:[1,14],
		wideIcon:[0,14],
		cost:{'basic building materials':1000},
		costPerStep:{'basic building materials':200,'precious building materials':20},
		steps:100,
		messageOnStart:'You begin the construction of the Mausoleum. Its towering mass already dominates the city, casting fear and awe wherever its shadow reaches.',
		finalStepCost:{'population':100},
		finalStepDesc:'To complete the Mausoleum, 100 of your [population,People] must be sacrificed to accompany you as servants in the afterlife.',
		use:{'land':10},
		//require:{'worker':10,'stone tools':10},
		req:{'monument-building':true},
		category:'wonder',
	});
	
	//debug units
	new G.Unit({
		name:'auto nanny',
		desc:'@generates 50 [fruit], 50 [cooked meat,Meat], and 100 [water]<>Keeps your people fed so you don\'t have to.//Powered by strange energies.',
		icon:[4,2],
		cost:{},
		effects:[
			{type:'gather',what:{'fruit':50,'cooked meat':50,'water':100}}
		],
		category:'debug',
	});
	new G.Unit({
		name:'auto brain',
		desc:'@generates 50 of [insight], [culture], [faith], [science] and [influence]<>Educates your people so you don\'t have to.//Powered by strange energies.',
		icon:[5,2],
		cost:{},
		effects:[
			{type:'gather',what:{'insight':50,'culture':50,'faith':50,'science':50,'influence':50}}
		],
		category:'debug',
	});
	
	
	/*=====================================================================================
	TECH & TRAIT CATEGORIES
	=======================================================================================*/
	/*Tech */
	G.knowCategories.push(
		{id:'disc',name:'Discovery'},
		{id:'indu',name:'Industrial'},
		{id:'order',name:'Order'},
		{id:'inno',name:'Innovation'},
		{id:'tradi',name:'Tradition'},
		{id:'reli',name:'Religious'},
		{id:'wisd',name:'Wisdom'},
		{id:'lega',name:'Legacy/Heritage'},
	/*Trait */
		{id:'trend',name:'Trends'},
		{id:'occur',name:'Occurance'},
		{id:'peri',name:'Periods'},
	);
	
	/*=====================================================================================
	TECHS
	=======================================================================================*/
	
	new G.ChooseBox({
		name:'research box',
		context:'tech',
		choicesN:5,
		getCosts:function()
		{
			var cost=Math.floor(G.getRes('wisdom').amount*(0.025+0.05*this.roll));
			return {'insight':cost};
		},
		getCardCosts:function(what)
		{
			return what.cost;
		},
		getCards:function()
		{
			var choices=[];
			var n=G.tech.length;
			for (var i=0;i<n;i++)
			{
				var tech=G.tech[i];
				if (!G.techsOwnedNames.includes(tech.name) && G.checkReq(tech.req))
				{
					if (tech.chance)
					{
						var chance=randomFloor(tech.chance);
						for (var ii=0;ii<chance;ii++)
						{
							choices.push(tech);
						}
					}
					else choices.push(tech);
				}
			}
			return choices;
		},
		onBuy:function(what,index)
		{
			G.fastTicks+=G.props['fastTicksOnResearch'];
			G.gainTech(what);
			G.Message({type:'good tall',text:'Your people have discovered the secrets of <b>'+what.displayName+'</b>.',icon:what.icon})
			G.update['tech']();
			G.popupSquares.spawn(l('chooseOption-'+index+'-'+this.id),l('techBox').children[0]);
			l('techBox').children[0].classList.add('popIn');
		},
		onReroll:function()
		{
			this.roll+=1;
			G.update['tech']();
			G.popupSquares.spawn(l('chooseIgniter-'+this.id),l('chooseBox-'+this.id));
		},
		onTick:function()
		{
			this.roll-=0.01;
			this.roll=Math.max(this.roll,0);
		},
		buttonText:function()
		{
			var str='';
			if (this.choices.length>0) str+='Reroll';
			else str+='Research';
			var costs=this.getCosts();
			var costsStr=G.getCostString(costs);
			if (costsStr) str+=' ('+costsStr+')';
			return str;
		},
		buttonTooltip:function()
		{
			return '<div class="info"><div class="par">'+(this.choices.length==0?'Generate new research opportunities.<br>The cost scales with your Wisdom resource.':'Reroll into new research opportunities if none of the available choices suit you.<br>Cost increases with each reroll, but will decrease again over time.')+'</div><div>Cost : '+G.getCostString(this.getCosts(),true)+'.</div></div>';
		}
	});
	
	new G.Tech({
		name:'forest origin',
		desc:'Your people came from tribes of the forests, which granted them better eyesights in gathering.<>@[gatherer] efficiency increased by 10%.',
		icon:[4,6,'H1sheet'],

		req:{'tribalism':false},
		category:'tradi'
	});
	new G.Tech({
		name:'mountain origin',
		desc:'Your people came from tribes of the mountains, which granted them tougher sprits to scour the terrain .<>@[wanderer],[scout] efficiency increased by 10%.',
		icon:[2,6,'H1sheet'],

		req:{'tribalism':false},
		category:'tradi'
	});
	new G.Tech({
    	name:'desert origin',
    	desc:'Your people came from tribes of the deserts, which granted them toughness to survive.<>@[food]&[water] rationing policy affect happiness less.',
    	icon:[4,9,'H1sheet'],

    	req:{'tribalism':false},
		category:'tradi'	
	});
	new G.Tech({
		name:'jungle origin',
		desc:'Your people came from tribes of the jungle, which granted them hightened sense to sense danger.<>@[hunter] efficiency increased by 15%.',
		icon:[4,7,'H1sheet'],

		req:{'tribalism':false},
		category:'tradi'
	});
	new G.Tech({
		name:'swamp origin',
		desc:'Your people came from tribes of the marsh, which granted them a...unique way of living.<>@Enables you to eat [bugs] with no penalty at start.',
		icon:[14,6,'H1sheet'],
		effects:[
			{type:'function',func:function(){G.getDict('bugs').turnToByContext['eating']['happiness']=0.05;}},
		],
		req:{'tribalism':false},
		category:'tradi'
	});
	new G.Tech({
		name:'arctic origin',
		desc:'Your people came from tribes of the arctic, which granted them a determination to survive no matter the cost.<>@leader gain increased by 10%.',
		icon:[12,7,'H1sheet'],
		req:{'tribalism':false},
		category:'tradi'
		});
	new G.Tech({
		name:'fire-making',
		desc:'@unlocks [firekeeper]s<>Fire keeps you warm and makes animal attacks much less frequent, one of the most valueable knowledge that differs human from animals.',
		icon:[16,1],
		startWith:true,
		effects:[
		],
		category:'disc'
	});
	new G.Tech({
		name:'tribalism',
		desc:'@unlocks [gatherer]@unlocks [chieftain]@provides 5 [authority]<>Taking its roots in wild animal packs, [tribalism] is the organization of individuals into simple social structures with little hierarchy.',
		icon:[0,1],
		startWith:true,
		effects:[
			{type:'provide res',what:{'authority':5}},
			{type:'show res',what:['influence']},
			{type:'show context',what:['foodgather']},
			{type:'show context',what:['watergather']},
			{type:'show context',what:['materialgather']},
		],
		category:'order'
	});
	new G.Tech({
		name:'speech',
		desc:'@unlocks [wanderer]@provides 5 [wisdom]<>[speech], in its most primitive form, is a series of groans and grunts that makes it possible to communicate things, events, and concepts.',
		icon:[1,1],
		startWith:true,
		effects:[
			{type:'provide res',what:{'wisdom':5}},
			{type:'show res',what:['insight']},
		],
		category:'wisd'
	});
	new G.Tech({
		name:'use of tool',
		desc:'@unlocks [gatherer]s mode to gather [archaic building materials], humanity realised tool usage, they pick up simple stone and sticks to break.',
		icon:[31,2,'H1sheet'],
		startWith:true,
		effects:[
			{type:'provide res',what:{'wisdom':5}},
		],
		category:'indu'
	});
	new G.Tech({
		name:'language',
		desc:'@[chieftain] generates more insights @provides 5 [inspiration]<>[language] improves on [speech] by combining complex grammar with a rich vocabulary, allowing for better communication and the first signs of culture.',
		icon:[2,1],
		cost:{'insight':0.5},
		req:{'speech':true},
		effects:[
			{type:'provide res',what:{'inspiration':5}},
		],
		chance:50,
		category:'wisd'
	});
	new G.Tech({
		name:'stone-knapping',
		desc:'@unlocks [artisan]s, which can create [knapped tools]<>[stone-knapping] allows you to make your very first tools - simple rocks that have been smashed against each other to fashion rather crude cleavers, choppers, and hand axes.//Tools have little use by themselves, but may be used in many other industries.',
		icon:[3,1],
		cost:{'insight':1,'experience':10},
		req:{'use of tool':true},
		effects:[
		],
		chance:20,
		category:'indu'
	});

	new G.Tech({
		name:'hunting',
		desc:'@unlocks [hunter]s<>It is a common tragedy that a creature should die so that another may survive.',
		icon:[15,1],
		cost:{'experience':10},
		req:{'language':true,'tribalism':true},
		effects:[
			{type:'show context',what:['hunt']},
		],
		category:'disc'
	});
	
	new G.Tech({
		name:'fishing',
		desc:'@unlocks [fisher]s<>Fishing is more than simply catching fish; it involves knowing where the fish like to gather and which ones are good to eat.//It would be wise to check whether any of your territory contains fish before investing in this technology.',
		icon:[25,1],
		cost:{'experience':10},
		req:{'language':true,'tribalism':true},
		effects:[
			{type:'show context',what:['fish']},
		],
		category:'disc'
	});
	new G.Tech({
		name:'oral tradition',
		desc:'@unlocks [scholar]@unlocks [storyteller]@provides 20 [inspiration]@provides 25 [wisdom]<>[oral tradition] emerges when the members of a tribe gather at night to talk about their day. Stories, ideas, and myths are all shared and passed on from generation to generation.',
		icon:[5,1],
		cost:{'insight':1,'experience':20},
		req:{'language':true},
		effects:[
			{type:'provide res',what:{'inspiration':5}},
		],
		chance:50,
		category:'wisd'
	});
	new G.Tech({
		name:'tool-making',
		desc:'@[artisan]s can now create [stone tools]<>With proper [tool-making], new procedures arise to craft a multitude of specialized tools out of cheap materials - such as hammers, knives, and axes.',
		icon:[4,1],
		cost:{'insight':1,'experience':20},
		req:{'stone-knapping':true,'carving':true},
		effects:[
		],
		chance:3,
		category:'indu'
	});
	
	new G.Tech({
		name:'basket-weaving',
		desc:'@[artisan]s can now craft [basket]s<>Baskets are a cheap, if flimsy means of storing food.',
		icon:[7,1],
		cost:{'insight':2,'experience':20},
		req:{'tool-making':true,'bone-working':true},
		effects:[
		],
		category:'indu'
	});
	
	new G.Tech({
		name:'scouting',
		desc:'@unlocks [scout]s, which can discover new territory<>The [scout] is an intrepid traveler equipped to deal with the unknown.',
		icon:[24,7],
		cost:{'insight':5,'experience':20},
		req:{'tool-making':true,'chieftains':true},
		effects:[
		],
		chance:2,
		category:'disc'
	});
	new G.Tech({
		name:'canoes',
		//TODO : fishing boats
		desc:'@allows exploring through ocean shores<>',
		icon:[26,7],
		cost:{'insight':10,'experience':50},
		req:{'tool-making':true,'woodcutting':true},
		effects:[
			{type:'allow',what:['shore exploring']},
		],
		category:'indu'
	});
	new G.Tech({
		name:'boat building',
		//TODO : in the future, boats will be units or resources
		desc:'@allows full ocean exploring<>',
		icon:[28,7],
		cost:{'insight':50,'experience':200},
		req:{'canoes':true,'carpentry':true,'construction':true},
		effects:[
			{type:'allow',what:['ocean exploring']},
		],
		category:'indu'
	});
	
	new G.Tech({
		name:'sedentism',
		desc:'@unlocks [primitive settlement]s<>To stay in one place when food is scarce is a bold gamble, especially to those without knowledge of agriculture.',//TODO : this should unlock a policy that lets you switch between nomadism (housing and food storage have no effect) and sedentism (gathering and hunting are much less efficient)
		icon:[8,1],
		cost:{'insight':5,'experience':50},
		req:{'digging':true,'language':true},
		effects:[
		],
		chance:3,
		category:'tradi'
	});
	new G.Tech({
		name:'building',
		desc:'@unlocks [village]s@unlocks [stockpile]s<>',
		icon:[9,1],
		cost:{'insight':25,'experience':100},
		req:{'sedentism':true,'tool-making':true,'stockpiling':true,'burial':true},
		effects:[
		],
		chance:3,
		category:'indu'
	});
	new G.Tech({
		name:'cities',
		desc:'@unlocks [city]s<>',
		icon:[29,7],
		cost:{'insight':50,'experience':100},
		req:{'construction':true,'code of law':true,'well-digging':true},
		effects:[
		],
		category:'indu'
	});
	new G.Tech({
		name:'construction',
		desc:'@unlocks [treasury]s@unlocks [warehouse]s (with [stockpiling])<>',
		icon:[30,7],
		cost:{'insight':50,'experience':100},
		req:{'building':true,'masonry':true,'carpentry':true,'quarrying':true,'basic drawing':true},
		effects:[
		],
		chance:3,
		category:'indu'
	});
	new G.Tech({
		name:'city planning',
		desc:'@unlocks [architect]s@Adds 1000 housing space and 20 building slots to each city.<>',
		icon:[22,8],
		cost:{'insight':75,'experience':50},
		req:{'construction':true,'cities':true,'writing':true},
		effects:[
		],
		category:'indu'
	});
	new G.Tech({
		name:'stockpiling',
		desc:'@unlocks [storage pit]s<>The foresight to store sustenance and materials ahead of time can make or break a budding civilization.',
		icon:[10,1],
		cost:{'insight':25,'experience':50},
		req:{'digging':true},
		effects:[
			{type:'show res',what:['food storage']},
			{type:'show res',what:['material storage']},
		],
		chance:2,
		category:'indu'
	});
	
	new G.Tech({
		name:'digging',
		desc:'@unlocks [digger]s@paves the way for simple buildings<>The earth is full of riches - to those who can find them.',
		icon:[11,1],
		cost:{'insight':5,'experience':25},
		req:{'stone-knapping':true},
		effects:[
			{type:'show context',what:['dig']},
		],
		category:'disc'
	});
	new G.Tech({
		name:'well-digging',
		desc:'@unlocks [well]s<>It takes some thinking to figure out that water can be found if you dig deep enough.//It takes a lot of bravery, however, to find out if it is safe to drink.',
		icon:[22,7],
		cost:{'insight':30,'experience':100},
		req:{'digging':true,'tool-making':true},
		effects:[
		],
		category:'disc'
	});
	new G.Tech({
		name:'woodcutting',
		desc:'@unlocks [woodcutter]s<>',//TODO : desc
		icon:[23,5],
		cost:{'insight':5,'experience':30},
		req:{'stone-knapping':true},
		effects:[
			{type:'show context',what:['chop']},
		],
		category:'indu'
	});
	
	new G.Tech({
		name:'plant lore',
		desc:'@[gatherer]s find more [herb]s and [fruit]s@unlock a mode for gatheres to gather more type of herbs<>The knowledge of which plants are good to eat and which mean certain death is a slow and perilous one to learn.',
		icon:[23,7],
		cost:{'experience':50},
		req:{'oral tradition':true,'basket-weaving':true},
		effects:[
			{type:'show context',what:['herbgather']},
		],
		category:'disc'
	});
	new G.Tech({
		name:'healing',
		desc:'@unlocks [healer]s<>',
		icon:[25,7],
		cost:{'insight':20,'experience':50},
		req:{'plant lore':true,'stone-knapping':true},
		effects:[
		],
		chance:2,
		category:'disc'
	});
	
	new G.Tech({
		name:'ritualism',
		desc:'@provides 10 [spirituality]@unlocks [soothsayer]s@unlocks some ritual policies<>Simple practices, eroded and polished by time, turn into rites and traditions.',
		icon:[12,1],
		cost:{'culture':30,'experience':5},
		req:{'oral tradition':true},
		effects:[
			{type:'provide res',what:{'spirituality':10}},
		],
		category:'reli'
	});
	
	new G.Tech({
		name:'symbolism',
		desc:'@[scholar]s produce 50% more [insight]@[storyteller]s produce 50% more [culture]@[soothsayer]s produce 50% more [faith]<>The manifestation of one thing for the meaning of another - to make the cosmos relate to itself.',
		icon:[13,1],
		cost:{'culture':25,'insight':25},
		req:{'oral tradition':true},
		effects:[
		],
		category:'wisd'
	});
	
	new G.Tech({
		name:'burial',
		desc:'@unlocks [grave]s@exposed [corpse]s make people even more unhappy<>It is the belief that there might be more to death than is first apparent that drives us to bury our deceased.',
		icon:[14,1],
		cost:{'culture':25,'insight':25,'experience':100,},
		req:{'ritualism':true,'digging':true},
		effects:[
		],
		chance:2,
		category:'reli'
	});
	

	
	new G.Tech({
		name:'bone-working',
		desc:'@[artisan]s can now make [knapped tools] out of [bone]@[bone]s can now be used as [archaic building materials]<>',
		icon:[22,5],
		cost:{'insight':5,'experience':25},
		req:{'stone-knapping':true},
		effects:[
			{type:'make part of',what:['bone'],parent:'archaic building materials'},
		],
		category:'indu'
	});
	
	new G.Tech({
		name:'spears',
		displayName:'Spears and maces',
		desc:'@[artisan]s can now craft [stone weapons]@unlocks new modes for [hunter]s and [fisher]s<>Using tools as weapons opens a world of possibilities, from hunting to warfare.',
		icon:[26,1],
		cost:{'insight':7,'experience':25},
		req:{'stone-knapping':true},
		category:'inno'
	});
	new G.Tech({
		name:'bows',
		desc:'@[artisan]s can now craft [bow]s@unlocks new modes for [hunter]s<>',//TODO : desc
		icon:[27,1],
		cost:{'insight':25,'experience':75},
		req:{'spears':true},
		category:'inno'
	});
	new G.Tech({
		name:'fishing hooks',
		desc:'@unlocks new modes for [fisher]s<>',//TODO : desc
		icon:[28,1],
		cost:{'experience':50},
		req:{'fishing':true,'spears':true},
		category:'inno'
	});
	new G.Tech({
		name:'cooking',
		desc:'@[firekeeper]s can now cook [cooked meat] and [cooked seafood]<>Tossing fish and meat over a sizzling fire without reducing them to a heap of ash takes a bit of practice.',
		icon:[17,1],
		cost:{'insight':1,'experience':10},
		req:{'fire-making':true},
		category:'disc'
	});
	new G.Tech({
		name:'curing',
		desc:'@[firekeeper]s can now prepare [cured meat] and [cured seafood] with [salt], which last much longer<>Storing food with special preparations seems to ward off rot, and comes along with the advent of delicious jerky.',
		icon:[27,7],
		cost:{'experience':50},
		req:{'cooking':true,'stockpiling':true},
		category:'disc'
	});
	
	new G.Tech({
		name:'sewing',
		desc:'@unlocks [clothier]s, who work with fabric and can sew [primitive clothes]<>',//TODO : desc
		icon:[29,1],
		cost:{'insight':15,'experience':50},
		req:{'bone-working':true},
		effects:[
		],
		category:'indu'
	});
	new G.Tech({
		name:'weaving',
		desc:'@[clothier]s can now sew [basic clothes]<>',
		icon:[30,1],
		cost:{'insight':30,'experience':50},
		req:{'sewing':true},
		category:'indu'
	});
	new G.Tech({
		name:'leather-working',
		desc:'@[clothier]s can now cure [hide]s into [leather] and use leather in cloth-making (with [weaving])<>',
		icon:[31,1],
		cost:{'experience':75},
		req:{'sewing':true},
		category:'indu'
	});
	
	new G.Tech({
		name:'smelting',
		desc:'@unlocks [furnace]s, which turn ore into metal ingots@unlocks [blacksmith workshop]s, which forge metal ingots into metal goods<>',//TODO : desc
		icon:[26,5],
		cost:{'insight':30,'experience':75},
		req:{'fire-making':true,'construction':true},
		effects:[
		],
		category:'indu'
	});
	
	new G.Tech({
		name:'bronze-working',
		desc:'@[furnace]s can now make [hard metal ingot]s from [copper ore] and [tin ore]<>',//TODO : desc
		icon:[28,5],
		cost:{'insight':50,'experience':200},
		req:{'smelting':true},
		effects:[
		],
		category:'indu'
	});
	new G.Tech({
		name:'iron-working',
		desc:'@[furnace]s can now make [hard metal ingot]s from [iron ore]<>',//TODO : desc
		icon:[27,5],
		cost:{'insight':100,'experience':400},
		req:{'smelting':true},
		effects:[
		],
		category:'indu'
	});
	new G.Tech({
		name:'gold-working',
		desc:'@[furnace]s can now make [precious metal ingot]s from [gold ore]@[blacksmith workshop]s can now forge [gold block]s out of [precious metal ingot]s<>',//TODO : desc
		icon:[29,5],
		cost:{'culture':10,'insight':50,'experience':100},
		req:{'smelting':true},
		effects:[
		],
		category:'indu'
	});
	new G.Tech({
		name:'steel-making',
		desc:'@[furnace]s can now make [strong metal ingot]s from [iron ore] and [coal]<>',//TODO : desc
		icon:[30,5],
		cost:{'insight':200,'experience':1000,'science':1},
		req:{'iron-working':true},
		effects:[
		],
		category:'indu'
	});
	
	new G.Tech({
		name:'chieftains',
		desc:'@Make chiefs generate more[influence],enable [wanderer]s to find wild men and recuit them via the means of cultural intergration.@provides 10 [authority]<>',//TODO : desc
		icon:[22,6],
		cost:{'insight':10},
		req:{'oral tradition':true},
		effects:[
			{type:'provide res',what:{'authority':10}},
		],
		category:'order'
	});
	new G.Tech({
		name:'clans',
		desc:'@unlocks [clan leader]s, which generate [influence]@provides 10 [authority]<>',//TODO : desc
		icon:[23,6],
		cost:{'insight':25},
		req:{'chieftains':true,'code of law':true},
		effects:[
			{type:'provide res',what:{'authority':10}},
		],
		category:'order'
	});
	new G.Tech({
		name:'code of law',
		desc:'@provides 15 [authority]@political units generate more [influence]@[clan leader]s provide [authority]<>',//TODO : desc
		icon:[24,6],
		cost:{'insight':20,'recording medium':1},
		req:{'symbolism':true,'sedentism':true},
		effects:[
			{type:'provide res',what:{'authority':15}},
		],
		category:'order'
	});
	
	new G.Tech({
		name:'mining',
		desc:'@unlocks [mine]s<>Strike the earth!',
		icon:[24,5],
		cost:{'insight':20,'recording medium':5},
		req:{'digging':true,'building':true},
		effects:[
			{type:'show context',what:['mine']}
		],
		category:'indu'
	});
	new G.Tech({
		name:'prospecting',
		desc:'@[mine]s can now be set to mine for specific ores',
		icon:[25,5],
		cost:{'insight':35,'recording medium':5},
		req:{'mining':true},
		effects:[
		],
		category:'disc'
	});
	
	new G.Tech({
		name:'quarrying',
		desc:'@unlocks [quarry,Quarries]<>',
		icon:[25,6],
		cost:{'insight':35,'recording medium':5},
		req:{'digging':true,'building':true},
		effects:[
			{type:'show context',what:['quarry']}
		],
		category:'indu'
	});
	
	new G.Tech({
		name:'carving',
		desc:'@unlocks [carver]s, which can produce a variety of goods out of stone, wood and bone@may lead to the knowledge of better tools<>',
		icon:[26,6],
		cost:{'insight':5},
		req:{'stone-knapping':true},
		effects:[
		],
		chance:3,
		category:'indu'
	});
	
	new G.Tech({
		name:'gem-cutting',
		desc:'@[carver]s can now make [gem block]s out of [gems]<>',//TODO : desc
		icon:[27,6],
		cost:{'insight':20},
		req:{'masonry':true,'tool-making':true},
		effects:[
		],
		category:'indu'
	});
	
	new G.Tech({
		name:'pottery',
		desc:'@unlocks [potter]s, which produce goods such as [pot]s out of [clay] and [mud]@unlocks [granary,Granaries] (with [stockpiling])@[digger]s find more [clay]<>',
		icon:[28,6],
		cost:{'insight':20},
		req:{'fire-making':true,'digging':true,'tool-making':true},
		effects:[
		],
		category:'indu'
	});
	new G.Tech({
		name:'masonry',
		desc:'@unlocks [kiln]s, which produce a variety of goods such as [brick]s@[carver]s can now turn [stone]s into [cut stone] slowly<>',
		icon:[29,6],
		cost:{'insight':35,'recording medium':5},
		req:{'building':true,'pottery':true},
		effects:[
		],
		category:'indu'
	});
	new G.Tech({
		name:'carpentry',
		desc:'@unlocks [carpenter workshop]s, which can process [log]s into [lumber] and produce wooden goods@unlocks [barn]s (with [stockpiling])<>',
		icon:[30,6],
		cost:{'insight':35,'recording medium':5},
		req:{'building':true,'woodcutting':true},
		effects:[
		],
		category:'indu'
	});
	
	new G.Tech({
		name:'monument-building',
		desc:'@unlocks the [mausoleum], an early wonder<>',
		icon:[24,8],
		cost:{'insight':100,'culture':50},
		req:{'construction':true},
		effects:[
		],
		category:'reli'
	});

	new G.Tech({
        name:'basic drawing',
        desc:'@Provides 20 [inspiration]s<>Enable your civlization to draw simple shapes to express their idea and perspective.<>',
        icon:[29,4,'H1sheet'],
        cost:{'insight':20},
        req:{'symbolism':true},
        effects:[{type:'provide res',what:{'inspiration':20}}
        ],
		category:'wisd'
    });

	new G.Tech({
        name:'writing',
        desc:'@Provide 10 [inspiration]s<>Enable your civlization build [library]<>To pass on knowledge and give idea in detail, some sort of small symbols was invented by you.<>',
        icon:[30,4,'H1sheet'],
        cost:{'insight':45,'recording medium':10},
        req:{'symbolism':true},
        effects:[{type:'provide res',what:{'inspiration':15}}
        ],
		category:'wisd'
    });

	new G.Tech({
        name:'census',
        desc:'@Enables the display of population after it reaches 1000<>',
        icon:[25,8,'H1sheet'],
        cost:{'insight':50,'recording medium':100},
        req:{'cities':true,'clans':true,'writing':true},
        effects:[
        ],
		category:'order'
    });

    new G.Tech({
        name:'mausoleum complete',
        desc:'@Are you in the afterlife, or are you merely being put back to all those years ago just with a different name?<>',
        icon:[26,8,'H1sheet'],
        cost:{'insight':999},
        req:{'tribalism':false},
		chance:0,
        effects:[
        ],
		category:'lega'
    });
	
	/*=====================================================================================
	TRAITS
	=======================================================================================*/
	//chances are evaluated every day and represent how many years (on average) it takes to randomly discover them once they fulfill the requirements

	new G.Trait({
		name:'end of a period',
		desc:'@This particular historical period is about to end after 300 days.@The traits earned during this period will wear off.<>Research the permanent trait while they are still avaliable!',
		icon:[16,3,'H1sheet'],
		chance:10,
		lifetime:300,
		req:{},
		category:'peri'
	});

	new G.Trait({
		name:'humid weather',
		desc:'@The [water] gain is increased and the nature is growing back... Praise it.',
		icon:[0,31,'H1sheet'],
		chance:5,
		req:{'dry weather':false},
		category:'occur'
	});
	new G.Trait({
		name:'dry weather',
		desc:'@Environment is harsher, and it is easier for fire to start... Beware.',
		icon:[1,31,'H1sheet'],
		chance:5,
		req:{'humid weather':false},
		category:'occur'
	});
	new G.Trait({
		name:'overhunting',
		desc:'@The number of hunt is decreasing significantly on our land.@Nature does not approve greediness.',
		icon:[2,31,'H1sheet'],
		cost:{'resource depletion':150},
		chance:1,
		req:{},
		effects:[],
		category:'occur'
	});
	new G.Trait({
		name:'overfishing',
		desc:'@The number of marine creature is decreasing significantly on our land.@Nature does not approve greediness.',
		icon:[3,31,'H1sheet'],
		cost:{'resource depletion':150},
		chance:1,
		req:{},
		effects:[],
		category:'occur'
	});
	new G.Trait({
		name:'overgather',
		desc:'@The number of forgeables are decreasing significantly on our land.@Nature does not approve greediness.',
		icon:[4,31,'H1sheet'],
		cost:{'resource depletion':150},
		chance:1,
		req:{},
		effects:[],
		category:'occur'
	});
	new G.Trait({
		name:'desire to overcome',
		desc:'@People began to think about how they should get what they lacked...//@Adds 5 wisdom permanently even after the trait is gone',
		icon:[5,31,'H1sheet'],
		cost:{},
		chance:5,
		req:{'lessened desire':false,'desire to consume':false,'bliss':false},
		effects:[{type:'provide res',what:{'wisdom':5}}],
		category:'trend'
	});
	new G.Trait({
		name:'desire to consume',
		desc:'@Some people have a strong belief that their life is all about savoring...//@People will eat and drink more than normal.@The happiness from eating and drinking is doubled.',
		icon:[6,31,'H1sheet'],
		cost:{},
		chance:10,
		req:{'desire to overcome':false,'lessened desire':false,'bliss':false},
		effects:[],
		category:'trend'
	});
	new G.Trait({
		name:'lessened desire',
		desc:'@People began to rethink if they need what they are asking for at all.//@People will eat and drink less than normal.@The happiness from eating and drinking remains normal.',
		icon:[7,31,'H1sheet'],
		cost:{},
		chance:10,
		req:{'desire to overcome':false,'desire to consume':false,'bliss':false},
		effects:[],
		category:'trend'
	});
	new G.Trait({
		name:'bliss',
		desc:'@People are happy for... no particular reasons.//@Peoples overall happniness increases.@Religions increase the chance of this occurance(Not implemented yet)',
		icon:[8,31,'H1sheet'],
		cost:{},
		chance:20,
		req:{'desire to overcome':false,'desire to consume':false,'lessened desire':false},
		effects:[],
		category:'trend'
	});
	new G.Trait({
		name:'earthquake',
		desc:'@The ground starts to shake violently... Damaging the buildings',
		icon:[9,31,'H1sheet'],
		cost:{},
		chance:200,
		req:{},
		effects:[],
		category:'occur'
	});
	new G.Trait({
		name:'house fire',
		desc:'@Some of the buildings accidentally catches fire.',
		icon:[16,1,'H1sheet'],
		cost:{},
		chance:10,
		req:{'dry weather':true,'sedentism':true},
		effects:[],
		category:'occur'
	});
	new G.Trait({
		name:'drought',
		desc:'@The dry weather is exacerbating...',
		icon:[12,31,'H1sheet'],
		cost:{},
		chance:100,
		req:{'dry weather':true},
		effects:[],
		category:'occur'
	});
	new G.Trait({
		name:'flood',
		desc:'@The wet weather is good at first, but it also exacerbates...',
		icon:[10,31,'H1sheet'],
		cost:{},
		chance:100,
		req:{'humid weather':true},
		effects:[],
		category:'occur'
	});
	new G.Trait({
		name:'cold winter',
		desc:'@This years winter is extra cold...',
		icon:[11,1,'H1sheet'],
		cost:{},
		chance:50,
		req:{},
		effects:[],
		category:'occur'
	});
	new G.Trait({
		name:'great harvest',
		desc:'Good yield.',
		icon:[13,1,'H1sheet'],
		cost:{},
		chance:50,
		req:{},
		effects:[],
		category:'occur'
	});

	new G.Trait({
		name:'bountifulness',
		desc:'@increased gather rate<>The nature is very kind to our civilization.',
		icon:[14,1,'H1sheet'],
		cost:{},
		chance:50,
		req:{},
		effects:[],
		category:'occur'
	});
	new G.Trait({
		name:'tribe migration',
		desc:'@unlock [wanderer] to recuit people.<>Some random tribe migrated by...',
		icon:[15,1,'H1sheet'],
		cost:{},
		chance:20,
		req:{},
		effects:[],
		category:'occur'
	});
	/*=====================================================================================
	POLICIES
	=======================================================================================*/
	G.policyCategories.push(
		{id:'debug',name:'Debug'},
		{id:'food',name:'Food'},
		{id:'work',name:'Work'},
		{id:'population',name:'Population'},
		{id:'faith',name:'Faith'}
	);
	
	new G.Policy({
		name:'disable aging',
		desc:'Aging, disease, births, and deaths are disabled.',
		icon:[3,12,8,3],
		cost:{},
		startWith:true,
		category:'debug',
	});
	new G.Policy({
		name:'disable eating',
		desc:'Eating and drinking are disabled.',
		icon:[3,12,3,6],
		cost:{},
		startWith:true,
		category:'debug',
	});
	new G.Policy({
		name:'disable spoiling',
		desc:'All resource spoilage is disabled.',
		icon:[3,12,3,7],
		cost:{},
		startWith:true,
		category:'debug',
	});
	new G.Policy({
		name:'side job of the population',
		desc:'[worker]s can have a side job while working on their profession if the situation calles for it.',
		icon:[5,12,3,6],
		cost:{'influence':5},
		startMode:'gatherer',
		modes:{
			'none':{name:'none',desc:'Your [worker]s will focus on their profession.'},
			'gatherer':{name:'gatherer',desc:'Make every [worker] also be a low efficiency gatherer but halfs their original productivity'},
		},
		req:{'tribalism':true},
		category:'work',
	});
	new G.Policy({
		name:'child workforce',
		desc:'[child,Children] now count as [worker]s; working children are more prone to accidents and receive lower education.',
		icon:[7,12,3,3],
		cost:{'influence':2},
		startMode:'on',
		req:{'tribalism':true},
		category:'work',
	});
	new G.Policy({
		name:'elder workforce',
		desc:'[elder]s now count as [worker]s; working elders are more prone to accidents and early death.',
		//an interesting side-effect of this and how population is coded is that elders are now much more prone to illness and wounds, and should they recover they will magically turn back into adults, thus blessing your civilization with a morally dubious way of attaining eternal life
		icon:[7,12,5,3],
		cost:{'influence':2},
		startMode:'on',
		req:{'tribalism':true},
		category:'work',
	});
	new G.Policy({
		name:'food rations',
		desc:'Define how much [food] your people are given each day.//Bigger rations will make your people happier, while smaller ones may lead to sickness and starvation.',
		icon:[5,12,3,6],
		cost:{'influence':2},
		startMode:'sufficient',
		modes:{
			'none':{name:'None',desc:'Eating food is forbidden.<br>Your people will start to starve.'},
			'meager':{name:'Meager',desc:'Your people receive half a portion per day.'},
			'sufficient':{name:'Sufficient',desc:'Your people receive a full portion per day.'},
			'plentiful':{name:'Plentiful',desc:'Your people receive a portion and a half per day.'},
		},
		req:{'tribalism':true},
		category:'food',
	});
	new G.Policy({
		name:'water rations',
		desc:'Define how much [water] your people are given each day.//Bigger rations will make your people happier, while smaller ones may lead to sickness and dehydration.',
		icon:[5,12,7,6],
		cost:{'influence':2},
		startMode:'sufficient',
		modes:{
			'none':{name:'None',desc:'Drinking water is forbidden.<br>Your people will start to die from dehydration.'},
			'meager':{name:'Meager',desc:'Your people receive half a portion per day.'},
			'sufficient':{name:'Sufficient',desc:'Your people receive a full portion per day.'},
			'plentiful':{name:'Plentiful',desc:'Your people receive a portion and a half per day.'},
		},
		req:{'tribalism':true},
		category:'food',
	});
	new G.Policy({
		name:'eat spoiled food',
		desc:'Your people will eat [spoiled food] when other [food] gets scarce, with dire consequences for health and morale.',
		icon:[6,12,3,7],
		cost:{'influence':1},
		startMode:'on',
		req:{'tribalism':true},
		category:'food',
	});
	new G.Policy({
		name:'drink muddy water',
		desc:'Your people will drink [muddy water] when clean [water] gets scarce, with dire consequences for health and morale.',
		icon:[6,12,8,6],
		cost:{'influence':1},
		startMode:'on',
		req:{'tribalism':true},
		category:'food',
	});
	new G.Policy({
		name:'insects as food',
		desc:'[bugs] now count as [food], although most people find them unpalatable.',
		icon:[6,12,8,11],
		cost:{'influence':1},
		effects:[
			{type:'make part of',what:['bugs'],parent:'food'},
		],
		effectsOff:[
			{type:'make part of',what:['bugs'],parent:''},
		],
		req:{'tribalism':true},
		category:'food',
	});
	new G.Policy({
		name:'eat raw meat and fish',
		desc:'[meat] and [seafood] are eaten raw, which may be unhealthy.',
		icon:[6,12,5,7],
		cost:{'influence':1},
		startMode:'on',
		effects:[
			{type:'make part of',what:['meat','seafood'],parent:'food'},
		],
		effectsOff:[
			{type:'make part of',what:['meat','seafood'],parent:''},
		],
		req:{'tribalism':true},
		category:'food',
	});
	new G.Policy({
		name:'mating gathering',
		desc:'Improves birth rate by 20%. Consumes 1 [faith] every 20 days; will stop if you run out.<>A common practise in many cultrue is to gather up all of their teenagers to have a big festival, and put them together. This is one of those.',
		icon:[8,12,2,3],
		cost:{'faith':1,'influence':1},
		startMode:'off',
		req:{'ritualism':true},
		category:'faith',
	});
	new G.Policy({
		name:'healing rituals',
		desc:'People get sick slower and recover faster. Consumes 2 [faith] every 20 days; will stop if you run out.',
		icon:[8,12,4,5],
		cost:{'faith':2},
		startMode:'off',
		req:{'ritualism':true},
		category:'faith',
	});
	new G.Policy({
		name:'wisdom rituals',
		desc:'Improves [scholar] and [storyteller] efficiency by 20%. Consumes 2 [faith] every 20 days; will stop if you run out.',
		icon:[8,12,8,5],
		cost:{'faith':2},
		startMode:'off',
		req:{'ritualism':true},
		category:'faith',
	});
	new G.Policy({
		name:'systematic gathering',
		desc:'Improves [gatherer], [hunter] and [fisher] efficiency by 20%. Consumes 5 [influence] every 20 days; will stop if you run out.',
		icon:[4,12,4,7],
		cost:{'influence':5},
		startMode:'off',
		req:{'clans':true},
		category:'faith',
	});
	new G.Policy({
		name:'population control',
		desc:'Set rules on how many children your people are allowed to have.',
		icon:[4,12,2,3],
		cost:{'influence':3},
		startMode:'normal',
		req:{'tribalism':true},
		modes:{
			'forbidden':{name:'Forbidden',desc:'Your people are not allowed to make children.//Your population will not grow.'},
			'limited':{name:'Limited',desc:'Your people are only allowed to have one child.//Your population will grow slowly.'},
			'normal':{name:'Normal',desc:'You have no specific rules regarding children.//Your population will grow normally.'},
		},
		category:'population',
	});
	
	/*=====================================================================================
	LANDS
	=======================================================================================*/

	new G.Land({
		name:'ocean',
		names:['Ocean'],
		goods:[
			{type:'fish',min:1,max:2},
			{type:'costal critters',chance:0.2,min:1,max:2},
			{type:'avians',chance:0.1,amount:0.1},
			{type:'saltwater'},
		],
		ocean:true,
		image:3,
		score:0,
	});
	new G.Land({
		name:'arctic ocean',
		names:['Icesheet'],
		goods:[
			{type:'fish',min:1,max:2},
			{type:'avians',chance:0.1,amount:0.1},
			{type:'snow cover'},
			{type:'saltwater'},
			{type:'iceburg'},
		],
		ocean:true,
		image:2,
		score:0,
	});
	new G.Land({
		name:'tropical ocean',
		names:['Tropical ocean'],
		goods:[
			{type:'fish',min:1,max:3},
			{type:'avians',chance:0.1,amount:0.1},
			{type:'costal critters',chance:0.4,min:0.8,max:2},
			{type:'saltwater'},
		],
		ocean:true,
		image:4,
		score:0,
	});
	new G.Land({
		name:'prairie',
		names:['Prairie','Grassland','Plain','Steppe','Meadow'],
		goods:[
			{type:['oak','birch'],chance:1,min:0.1,max:0.2},
			{type:['oak','birch'],chance:0.5,min:0.1,max:0.4},
			{type:'berry bush',chance:0.25,min:0.2,max:0.5},
			{type:'grass',amount:1},
			{type:'forest critters',chance:0.25,min:0.1,max:0.3},
			{type:'large mammal predators',chance:0.1,amount:0.1},
			{type:'large mammal preys',chance:0.2,amount:0.25},
			{type:'wild bugs'},
			{type:'costal critters',chance:0.1,min:0.1,max:0.3},
			{type:'stream'},
			{type:'river',chance:0.6,min:0.5,max:1},
			{type:'lake',chance:0.3,min:0.3,max:0.5},
			{type:'avians',chance:0.3,amount:0.3,amount:0.3},
			{type:'rocky substrate'},
		],
		modifiers:{'river':0.4,'volcano':0.2,},
		image:6,
		score:10,
	});
	new G.Land({
		name:'shrubland',
		names:['Shrubland','Drylands','Highlands','Heath'],
		goods:[
			{type:['oak','birch'],chance:0.5,min:0.2,max:0.4},
			{type:'dead tree',amount:0.3},
			{type:'berry bush',chance:0.1,min:0.2,max:0.5},
			{type:'grass',amount:1.5},
			{type:'forest critters',chance:0.3,min:0.1,max:0.3},
			{type:'large mammal predators',chance:0.1,amount:0.1},
			{type:'avians',chance:0.5,amount:0.5},
			{type:'wild bugs'},
			{type:'costal critters',chance:0.05,min:0.1,max:0.3},
			{type:'stream'},
			{type:'river',chance:0.15,min:0.1,max:0.3},
			{type:'lake',chance:0.15,min:0.1,max:0.3},
			{type:'rocky substrate'},
		],
		modifiers:{'river':0.4,'volcano':0.2,},
		image:5,
		score:7,
	});
	new G.Land({
		name:'forest',
		names:['Forest','Forest','Woodland','Marsh'],
		goods:[
			{type:['oak','birch'],amount:3},
			{type:['oak','birch','dead tree'],chance:0.5},
			{type:'berry bush',chance:0.5,min:0.2,max:0.5},
			{type:'forest mushrooms',chance:0.5,min:0.2,max:0.5},
			{type:'grass'},
			{type:'forest critters',chance:0.4,min:0.2,max:0.5},
			{type:'avians',chance:0.3,amount:0.3},
			{type:'large mammal predators',chance:0.3,min:0.1,max:0.3},
			{type:'large mammal preys',chance:0.5,amount:0.9},
			{type:'wild bugs',min:1,max:1.5},
			{type:'costal critters',chance:0.05,min:0.1,max:0.3},
			{type:'rocky substrate'},
			{type:'stream'},
			{type:'swamp',chance:0.3,min:0.2,max:0.4},,
			{type:'river',chance:0.65,min:0.3,max:0.7},
			{type:'lake',chance:0.3,min:0.1,max:0.3},
		],
		image:7,
		score:8,
	});
	new G.Land({
		name:'tundra',
		names:['Tundra','Cold plain','Cold steppe'],
		goods:[
			{type:['fir tree'],amount:1},
			{type:'berry bush',chance:0.8},
			{type:'grass'},
			{type:'forest critters',chance:0.1},
			{type:'large mammal predators',chance:0.5,min:0.1,max:0.5},
			{type:'large mammal preys',chance:0.3,amount:0.5},
			{type:'avians',chance:0.3,amount:0.3},
			{type:'wild bugs'},
			{type:'costal critters',chance:0.05,min:0.1,max:0.3},
			{type:'lake',chance:0.3,min:0.1,max:0.3},
			{type:'river',chance:0.3,min:0.4,max:0.6},
			{type:'snow cover'},
			{type:'rocky substrate'},
		],
		image:9,
		score:7,
	});
	new G.Land({
		name:'ice desert',
		names:['Ice desert','Cold desert'],
		goods:[
			{type:'dead tree',amount:0.5},
			{type:['fir tree'],amount:0.2},
			{type:'berry bush',chance:0.5,amount:0.2},
			{type:'grass',chance:0.4,amount:0.2},
			{type:'forest critters',chance:0.05},
			{type:'large mammal predators',chance:0.1,min:0.1,max:0.5},
			{type:'avians',chance:0.2,amount:0.2},
			{type:'wild bugs',amount:0.05},
			{type:'iceburg',amount:0.3},
			{type:'snow cover'},
			{type:'rocky substrate'},
		],
		image:8,
		score:2,
	});
	new G.Land({
		name:'boreal forest',
		names:['Boreal forest','Pine forest','Taiga'],
		goods:[
			{type:['fir tree'],amount:3},
			{type:'berry bush',chance:0.9},
			{type:'forest mushrooms',chance:0.4},
			{type:'grass'},
			{type:'forest critters',chance:0.2},
			{type:'large mammal predators',chance:0.5,min:0.5,max:1},
			{type:'large mammal preys',chance:0.7,amount:0.5},
			{type:'avians',chance:0.3,amount:0.3},
			{type:'wild bugs'},
			{type:'costal critters',chance:0.05,min:0.1,max:0.3},
			{type:'stream'},
			{type:'lake',chance:0.3,min:0.1,max:0.5},
			{type:'river',chance:0.5,min:0.4,max:0.8},
			{type:'snow cover'},
			{type:'rocky substrate'},
		],
		image:10,
		score:8,
	});
	new G.Land({
		name:'savanna',
		names:['Savannah','Savannah','Sun prairie'],
		goods:[
			{type:'acacia',amount:1},
			{type:'palm tree',chance:0.4,amount:0.3},
			{type:'berry bush',chance:0.6},
			{type:'succulents',chance:0.4,min:0.1,max:0.3},
			{type:'grass',amount:1.5},
			{type:'forest critters',chance:0.3},
			{type:'large mammal predators',chance:0.4,amount:0.5},
			{type:'large mammal preys',chance:0.3,amount:0.5},
			{type:'avians',chance:0.3,amount:0.3},
			{type:'wild bugs'},
			{type:'costal critters',chance:0.05,min:0.1,max:0.3},
			{type:'stream'},
			{type:'lake',chance:0.3,min:0.2,max:0.6},
			{type:'river',chance:0.6,min:0.4,max:0.8},
			{type:'sandy soil',chance:0.3},
			{type:'rocky substrate'},
		],
		image:12,
		score:7,
	});
	new G.Land({
		name:'desert',
		names:['Desert','Scorched land'],
		goods:[
			{type:'dead tree',amount:0.5},
			{type:'acacia',amount:0.2,chance:0.4},
			{type:'succulents',min:0.1,max:0.6},
			{type:'grass',chance:0.3,amount:0.1},
			{type:'forest critters',chance:0.05},
			{type:'large mammal predators',chance:0.1,min:0.1,max:0.3},
			{type:'avians',chance:0.3,amount:0.3},
			{type:'wild bugs',amount:0.15},
			{type:'lake',chance:0.01,min:0.2,max:0.2},
			{type:'river',chance:0.01,min:0.1,max:0.3},
			{type:'costal critters',chance:0.05,min:0.1,max:0.3},
			{type:'sandy soil'},
			{type:'rocky substrate'},
		],
		image:11,
		score:2,
	});
	new G.Land({
		name:'jungle',
		names:['Jungle','Tropical forest','Mangrove'],
		goods:[
			{type:['palm tree'],amount:3},
			{type:'jungle fruits',chance:1},
			{type:'grass'},
			{type:'forest critters',chance:0.3},
			{type:'large mammal predators',chance:0.2,amount:0.5},
			{type:'avians',chance:0.5,amount:0.5},
			{type:'wild bugs',min:1,max:2},
			{type:'costal critters',chance:0.05,min:0.1,max:0.3},
			{type:'stream'},
			{type:'lake',chance:0.5,min:0.4,max:1},
			{type:'river',chance:0.6,min:0.5,max:1},
			{type:'rocky substrate'},
		],
		image:13,
		score:8,
	});
	
	/*=====================================================================================
	GOODS
	=======================================================================================*/
	
	G.contextNames['foodgather']='Gathering Foods';
	G.contextNames['materialgather']='Gathering Materials';
	G.contextNames['watergather']='Gathering Water';
	G.contextNames['herbgather']='Gathering Rare Herbs';
	G.contextNames['fish']='Fishing';
	G.contextNames['hunt']='Hunting';
	G.contextNames['chop']='Chopping';
	G.contextNames['dig']='Digging';
	G.contextNames['mine']='Mining';
	G.contextNames['quarry']='Quarrying';
	
	//plants
	new G.Goods({
		name:'grass',
		desc:'[grass] is a good source of [herb]s; you may also occasionally find some [fruit]s and [stick]s while foraging.',
		icon:[10,10],
		res:{
			'foodgather':{'herb':3,'fruit':0.25,'vegetable':0.5},
			'herbgather':{'medical herb':0.05,'spice':0.075},
			'materialgather':{'stick':0.5},
		},
		mult:10,
	});
	new G.Goods({
		name:'oak',
		desc:'The [oak] is a mighty tree that thrives in temperate climates, rich in [log]s and [stick]s.',
		icon:[0,10],
		res:{
			'chop':{'log':3,'stick':6},
			'materialgather':{'stick':1},
		},
		affectedBy:['deforestation'],
		mult:5,
	});
	new G.Goods({
		name:'birch',
		desc:'[birch,Birch trees] have white bark and are rather frail, but are a good source of [log]s and [stick]s.',
		icon:[1,10],
		res:{
			'chop':{'log':2,'stick':4},
			'materialgather':{'stick':1},
		},
		affectedBy:['deforestation'],
		mult:5,
	});
	new G.Goods({
		name:'palm tree',
		desc:'[palm tree]s prefer warm climates and provide [log]s when chopped; harvesting them may also yield [stick]s and [fruit]s such as bananas and coconuts.',
		icon:[2,10],
		res:{
			'chop':{'log':2,'stick':4},
			'foodgather':{'fruit':0.3},
			'materialgather':{'stick':0.25},
		},
		affectedBy:['deforestation'],
		mult:5,
	});
	new G.Goods({
		name:'acacia',
		desc:'The [acacia,Acacia tree] tends to grow in warm, dry climates, and can be chopped for [log]s and harvested for [stick]s.',
		icon:[8,10],
		res:{
			'chop':{'log':2,'stick':4},
			'materialgather':{'stick':1},
		},
		affectedBy:['deforestation'],
		mult:5,
	});
	new G.Goods({
		name:'fir tree',
		desc:'[fir tree]s can endure cold climates and keep their needles year-long; they can provide [log]s and [stick]s.',
		icon:[3,10],
		res:{
			'chop':{'log':2,'stick':6},
			'herbgather':{'medical herb':0.5},
			'materialgather':{'stick':1},
		},
		affectedBy:['deforestation'],
		mult:5,
	});
	new G.Goods({
		name:'dead tree',
		desc:'While an ornery sight, [dead tree]s are an adequate source of dry [log]s and [stick]s.',
		icon:[9,10],
		res:{
			'chop':{'log':1,'stick':2},
			'materialgather':{'stick':0.5},
		},
		affectedBy:['deforestation'],
		mult:5,
	});
	new G.Goods({
		name:'berry bush',
		desc:'[berry bush,Berry bushes] can be foraged for [fruit]s, [stick]s and sometimes [herb]s.',
		icon:[4,10],
		res:{
			'foodgather':{'fruit':1.5,'herb':0.1},
			'materialgather':{'stick':0.5},
			'herbgather':{'medical herb':0.25},
		},
		affectedBy:['scarce forageables'],
		mult:10,
	});
	new G.Goods({
		name:'forest mushrooms',
		desc:'[forest mushrooms] grow in the penumbra of the underbrush, and often yield all sorts of interesting [herb]s.',
		icon:[5,10],
		res:{
			'foodgather':{'herb':0.5,'vegetable':1},
			'herbgather':{'medical herb':0.5,'spice':0.2},
		},
		affectedBy:['scarce forageables'],
		mult:10,
	});
	new G.Goods({
		name:'succulents',
		desc:'Hardy cactii that grow in the desert. While tricky to harvest, [succulents] can provide [herb]s and [fruit]s.',
		icon:[6,10],
		res:{
			'foodgather':{'fruit':0.5,'herb':3},
			'herbgather':{'medical herb':0.5},
		},
		affectedBy:['scarce forageables'],
		mult:10,
	});
	new G.Goods({
		name:'jungle fruits',
		desc:'[jungle fruits] come in all shapes, colors and sizes, and will yield [fruit]s and [herb]s to those who forage them.',
		icon:[7,10],
		res:{
			'foodgather':{'fruit':2,'herb':0.5,'vegetable':0.5},
			'herbgather':{'medical herb':0.5,'spice':0.5},
		},
		affectedBy:['scarce forageables'],
		mult:10,
	});
	//animals
	new G.Goods({
		name:'forest critters',
		desc:'[forest critters] are often carnivorous, quick and hard to catch, and yield a little [meat], [bone]s and [hide]s. Consist of Rabbits, Stoats and even Foxes and Koalas//Carcasses can sometimes be gathered for [spoiled food].',
		icon:[14,11,'H1sheet'],
		res:{
			'foodgather':{'spoiled food':0.5},
			'hunt':{'meat':1,'bone':0.2,'hide':0.5},
		},
		affectedBy:['over hunting'],
		mult:5,
	});

	new G.Goods({
		name:'large mammal predators',
		desc:'[large mammal predators] are Large mammals, they are hard to mess with and have a chance of preying on your people, however hunting them down can yield a lot of [meat], [bone]s and [hide]s. Consist of Bears of all kinds, Tigers and Lions and even Pack of wolves.//Carcasses can sometimes be gathered for [spoiled food].',
		icon:[15,11,'H1sheet'],
		res:{
			'foodgather':{'spoiled food':0.5},
			'hunt':{'meat':3,'bone':1,'hide':1},
		},
		affectedBy:['over hunting'],
		mult:5,
	});

	new G.Goods({
		name:'large mammal preys',
		desc:'[large mammal preys] are Large mammals, they are pretty good at running from and fighting off dangers and eating fibres passively, hunting accident occurs more frequently when hunting for these animals, tho hunting them down can yield a lot of [meat], [bone]s and [hide]s. Consist of Deers, Boars and Elephants and many others.//Carcasses can sometimes be gathered for [spoiled food].',
		icon:[16,11,'H1sheet'],
		res:{
			'foodgather':{'spoiled food':0.5},
			'hunt':{'meat':3,'bone':1,'hide':1},
		},
		affectedBy:['over hunting'],
		mult:5,
	});

	new G.Goods({
		name:'avians',
		desc:'[avians] are also critters, they flys high from any danger, tho there are also some decent walkers among them, tho hunting them down can yield nice amount of [meat] and [bone]s. Consist of Birds of all kinds,pheasant of all kinds, ostriches and many others.//their nests can be a source for gathering [egg].',
		icon:[17,11,'H1sheet'],
		res:{
			'foodgather':{'egg':0.5},
			'hunt':{'meat':2,'bone':0.1},
		},
		affectedBy:['over hunting'],
		mult:5,
	});
	new G.Goods({
		name:'wild bugs',
		displayName:'Bugs',
		desc:'[wild bugs,Bugs] are ubiquitious and easy to capture.',
		icon:[8,11],
		res:{
			'foodgather':{'bugs':2},
		},
		//affectedBy:['over hunting'],
		mult:5,
	});
	new G.Goods({
		name:'fish',
		desc:'Fish of every size and color.//A source of [seafood].',
		icon:[11,11],
		res:{
			'foodgather':{'seafood':0.2},
			'fish':{'seafood':2},
		},
		affectedBy:['over fishing'],
		mult:5,
	});
	new G.Goods({
		name:'costal critters',
		desc:'Clam and Crabs that is going to get your people a tough time to open.',
		icon:[13,11,'H1sheet'],
		res:{
			'foodgather':{'seafood':0.5},
			'fish':{'seafood':1.2},
		},
		affectedBy:['over fishing'],
		mult:5,
	});
	//substrates
	new G.Goods({
		name:'rocky substrate',
		desc:'A [rocky substrate] is found underneath most terrain types.//Surface [stone]s may be gathered by hand.//Digging often produces [mud], more [stone]s and occasionally [copper ore,Ores] and [clay].//Mining provides the best results, outputting a variety of [stone]s, rare [gold ore,Ores], and precious [gems].',
		icon:[11,10],
		res:{
			'materialgather':{'stone':0.25,'clay':0.005,'limestone':0.005},
			'dig':{'mud':2,'clay':0.15,'stone':0.6,'copper ore':0.001,'tin ore':0.0005,'limestone':0.1,'salt':0.05},
			'mine':{'stone':0.5,'copper ore':0.1,'tin ore':0.1,'iron ore':0.05,'gold ore':0.005,'coal':0.1,'salt':0.1,'gems':0.005},
			'quarry':{'cut stone':1,'limestone':0.5,'marble':0.01},
		},
		affectedBy:['mineral depletion'],
		noAmount:true,
		mult:5,
	});
	new G.Goods({
		name:'snow cover',
		desc:'A [snow cover] is often available year-long in cold environments, and is a petty source of [water]; it may also conceal [ice], which must be dug out.',
		icon:[13,10],
		res:{
			'watergather':{'water':1,'muddy water':2},
			'dig':{'ice':0.5},
		},
		mult:5,
	});
	new G.Goods({
		name:'sandy soil',
		desc:'[sandy soil] is the result of a [rocky substrate] eroded by wind over long periods of time. [sand] is plentiful here.',
		icon:[12,10],
		res:{
			'dig':{'sand':1},
		},
		noAmount:true,
		mult:5,
	});
	//liquids
	new G.Goods({
		name:'saltwater',
		desc:'[saltwater] cannot be collected for [water], but may produce [salt] deposits.',
		icon:[14,10],
		res:{
			'foodgather':{'salt':0.05},
		},
		noAmount:true,
		mult:5,
	});
	new G.Goods({
		name:'iceburg',
		desc:'[iceburg], found in the upper and down edge of the world, [ice] and [muddy water] can be found on it.',
		icon:[18,10,'H1sheet'],
		res:{
			'watergather':{'ice':0.1,'muddy water':2},
			'dig':{'ice':1}
		},
		mult:5,
	});
	new G.Goods({
		name:'stream',
		desc:'[stream], produced by rain and other sources, appears in anywhere that rains.',
		icon:[16,10,'H1sheet'],
		res:{
			'watergather':{'water':4}
		},
		mult:5,
	});
	new G.Goods({
		name:'river',
		desc:'[river], a prime location for clear [water].',
		icon:[16,10,'H1sheet'],
		res:{
			'watergather':{'water':12},
			'fish':{'seafood':2},
		},
		mult:5,
	});
	new G.Goods({
		name:'lake',
		desc:'[lake], a lot of water in one place makes for a great location for living... [water] and [fish]es can be found.',
		icon:[17,10,'H1sheet'],
		res:{
			'watergather':{'water':8},
			'fish':{'seafood':3},
		},
		mult:5,
	});
	new G.Goods({
		name:'swamp',
		desc:'[swamp], a dirty place... [muddy water] and [bugs] can be found. But there are also rare herbs...',
		icon:[19,10,'H1sheet'],
		res:{
			'watergather':{'muddy water':8,'water':2},
			'foodgather':{'bugs':1},
			'herbgather':{'medical herb':0.5,'spice':0.25},
		},
		mult:5,
	});
	/*=====================================================================================
	TILE EFFECTS
	=======================================================================================*/
	//TODO : implement
	new G.TileEffect({
		name:'deforestation',
		desc:'This is the result of too much woodcutting in an area.//Having this effect on a tile lowers the quantity of trees it provides.//If woodcutting is halted, this effect will slowly subside as trees grow back over time, if the deforestation isn\'t too severe.',
		visibleAt:100,
	});
	new G.TileEffect({
		name:'mineral depletion',
		desc:'This is the result of too much mining and digging in an area.//Having this effect on a tile lowers the quantity of minerals it provides.//If mining and digging are halted, this effect will slowly subside as more ore nodes are discovered.',
		visibleAt:100,
	});
	new G.TileEffect({
		name:'over hunting',
		desc:'This is the result of too much hunting in an area.//Having this effect on a tile lowers the quantity of animals it provides.//If hunting is halted, this effect will slowly subside as animal population recovers over time, if there is enough of it left.',
		visibleAt:100,
	});
	new G.TileEffect({
		name:'over fishing',
		desc:'This is the result of too much fishing in an area.//Having this effect on a tile lowers the quantity of sea creatures it provides.//If fishing is halted, this effect will slowly subside as wildlife population recovers over time, if there is enough of it left.',
		visibleAt:100,
	});
	new G.TileEffect({
		name:'scarce forageables',
		desc:'This is the result of too much foraging in an area.//Having this effect on a tile lowers the quantity of all forageables it provides.//If foraging is halted, this effect will slowly subside.',
		visibleAt:100,
	});
	new G.TileEffect({
		name:'reserve',
		desc:'A [reserve] prevents any resource extraction from this tile, letting depleted resources heal over.',
	});
	
	/*=====================================================================================
	ACHIEVEMENTS
	=======================================================================================*/
	
	G.legacyBonuses.push(
		{id:'addFastTicksOnStart',name:'+[X] free fast ticks',desc:'Additional fast ticks when starting a new game.',icon:[0,0],func:function(obj){G.fastTicks+=obj.amount;},context:'new'},
		{id:'addFastTicksOnResearch',name:'+[X] fast ticks from research',desc:'Additional fast ticks when completing research.',icon:[0,0],func:function(obj){G.props['fastTicksOnResearch']+=obj.amount;}}
	);
	
	//do NOT remove or reorder achievements or saves WILL get corrupted
	
	new G.Achiev({
		tier:0,
		name:'mausoleum',
		desc:'You have been laid to rest in the Mausoleum, an ancient stone monument the purpose of which takes root in archaic religious thought.',
		fromUnit:'mausoleum',
		effects:[
			{type:'addFastTicksOnStart',amount:300*3},
			{type:'addFastTicksOnResearch',amount:150},
		],
	});
	
	/*=====================================================================================
	MAP GENERATOR
	=======================================================================================*/
	G.funcs['create map']=function(w,h)
	{
		//generate basic geography using Conway's Game of Life (rule : births from 4 to 9 neighbors, survival from 6 to 9 neighbors)
		
		var generate=function(w,h)
		{
			var getAt=function(map,x,y)
			{
				//if (x<0||x>=map.length||y<0||y>=map[0].length) return 0;
				//wrap around so we don't get big empty spots on the edges (as a bonus, this creates donut-shaped worlds)
				if (x<0) x+=map.length;
				else if (x>=map.length) x-=map.length;
				if (y<0) y+=map[0].length;
				else if (y>=map[0].length) y-=map[0].length;
				return map[x][y];
			}
			
			//init map
			var lvl=[];
			for (var x=0;x<w;x++)
			{
				lvl[x]=[];
				for (var y=0;y<h;y++)
				{
					lvl[x][y]=Math.random()<0.5?1:0;
				}
			}
			
			//init buffer
			var lvlBuffer=[];
			for (var x=0;x<w;x++){lvlBuffer[x]=[];for (var y=0;y<h;y++){lvlBuffer[x][y]=0;}}
			
			var passes=1;
			for (var i=0;i<passes;i++)
			{
				//live
				for (var x=0;x<w;x++)
				{
					for (var y=0;y<h;y++)
					{
						var n=getAt(lvl,x-1,y)+getAt(lvl,x-1,y-1)+getAt(lvl,x,y-1)+getAt(lvl,x+1,y-1)+getAt(lvl,x+1,y)+getAt(lvl,x+1,y+1)+getAt(lvl,x,y+1)+getAt(lvl,x-1,y+1);
						var on=lvl[x][y];
						if (on && n>=4 && n<=9) on=1; else on=0;
						if (!on && n>=6 && n<=9) on=1;
						if (Math.random()<0.05) on=Math.random()<0.5?1:0;//just a bit of extra randomness
						lvlBuffer[x][y]=on;
					}
				}
				//copy buffer back
				for (var x=0;x<w;x++){for (var y=0;y<h;y++){lvl[x][y]=lvlBuffer[x][y];}}
			}
			
			return lvl;
		}
		
		var getStrAt=function(map,x,y)
		{
			if (x<0||x>=map.length-1||y<0||y>=map[0].length-1) return 'out';
			return map[x][y];
		}
		var getAt=function(map,x,y)
		{
			if (x<0||x>=map.length-1||y<0||y>=map[0].length-1) return 0.5;
			return map[x][y];
		}
		
		var landTiles=[];
		var seaTiles=[];
		var fit=false;
		i=0;
		while (i<20 && fit==false)//discard any map with less than 30% or more than 50% land
		{
			var lvl=generate(w,h);
			
			landTiles=[];
			seaTiles=[];
			for (var x=0;x<w;x++)
			{
				for (var y=0;y<h;y++)
				{
					if (lvl[x][y]==0) seaTiles.push([x,y]);
					else landTiles.push([x,y]);
				}
			}
			var total=landTiles.length+seaTiles.length;
			if (landTiles.length/total>0.3 && landTiles.length/total<0.5) fit=true;
			i++;
		}
		
		//translate into terrain
		for (var x=0;x<w;x++)
		{
			for (var y=0;y<h;y++)
			{
				var land='ocean';
				if (lvl[x][y]==0) land='ocean';
				else if (lvl[x][y]==1)
				{
					land='none';
				}
				lvl[x][y]=land;
			}
		}
		
		//precipitation map
		//generate more humidity over sea, less in land - with some variance
		//on tiles with low humidity, 30% of the time, add some huge variance
		//then, blur the map so that coasts get some humidity and variance can spread
		var wet=[];
		for (var x=0;x<w;x++)
		{
			wet[x]=[];
			for (var y=0;y<h;y++)
			{
				wet[x][y]=(lvl[x][y]=='ocean'?0.8:0.2)+Math.random()*0.1-0.1/2;
				if (Math.random()<0.3 && wet[x][y]<0.5) wet[x][y]+=Math.random()*5-2.5;
			}
		}
		for (var x=0;x<w;x++)//blur
		{
			for (var y=0;y<h;y++)
			{
				var variance=0.05;
				var n=getAt(wet,x-1,y)+getAt(wet,x-1,y-1)+getAt(wet,x,y-1)+getAt(wet,x+1,y-1)+getAt(wet,x+1,y)+getAt(wet,x+1,y+1)+getAt(wet,x,y+1)+getAt(wet,x-1,y+1);
				wet[x][y]=(wet[x][y]+n)/9+Math.random()*variance-variance/2;
			}
		}
		//temperature map. why not
		var jumble=false;
		if (!jumble)
		{
			//vertical sine wave (so we get hot equator and cold poles), with some variance
			//humidity lowers temperature by a bit
			var temp=[];
			for (var x=0;x<w;x++)
			{
				temp[x]=[];
				for (var y=0;y<h;y++)
				{
					var variance=0.15;
					temp[x][y]=Math.sin(((y+0.5)/h-0.25)*Math.PI*2)/2+(lvl[x][y]=='ocean'?0.6:0.5)-(wet[x][y])*0.15+Math.random()*variance-variance/2;
				}
			}
		}
		else
		{
			//temperature spawns in big blobs of cold and hot
			var temp=[];
			for (var x=0;x<w;x++)
			{
				temp[x]=[];
				for (var y=0;y<h;y++)
				{
					temp[x][y]=0.65+Math.random()*0.1-0.1/2-wet[x][y]*0.15;
					if (Math.random()<0.5) temp[x][y]+=Math.random()*10-5;
				}
			}
			for (var i=0;i<2;i++)//blur
			{
				for (var x=0;x<w;x++)
				{
					for (var y=0;y<h;y++)
					{
						var variance=0.05;
						var n=getAt(temp,x-1,y)+getAt(temp,x-1,y-1)+getAt(temp,x,y-1)+getAt(temp,x+1,y-1)+getAt(temp,x+1,y)+getAt(temp,x+1,y+1)+getAt(temp,x,y+1)+getAt(temp,x-1,y+1);
						temp[x][y]=(temp[x][y]+n)/9+Math.random()*variance-variance/2;
					}
				}
			}
		}
		
		//biomes
		for (var x=0;x<w;x++)
		{
			for (var y=0;y<h;y++)
			{
				var tempTile=temp[x][y];
				var wetTile=wet[x][y];
				var landTile=lvl[x][y];
				
				var biomes=[];
				if (tempTile<-0.1)
				{
					if (landTile=='ocean') biomes.push('arctic ocean');
					else biomes.push('ice desert');
				}
				else if (tempTile<0.15)
				{
					if (landTile=='ocean') biomes.push('arctic ocean');
					else if (wetTile<0.25) biomes.push('ice desert');
					else if (wetTile>0.5) biomes.push('boreal forest');
					else biomes.push('tundra');
				}
				else if (tempTile>1.1)
				{
					if (landTile=='ocean') biomes.push('tropical ocean');
					else biomes.push('desert');
				}
				else if (tempTile>0.85)
				{
					if (landTile=='ocean') biomes.push('tropical ocean');
					else if (wetTile<0.25) biomes.push('desert');
					else if (wetTile>0.5) biomes.push('jungle');
					else biomes.push('savanna');
				}
				else
				{
					if (landTile=='ocean') biomes.push('ocean');
					else if (wetTile<0.25) biomes.push('shrubland');
					else if (wetTile>0.5) biomes.push('forest');
					else biomes.push('prairie');
				}
				if (biomes.length==0) biomes.push('prairie');
				lvl[x][y]=choose(biomes);
			}
		}
		
		for (var x=0;x<w;x++)//clean all tiles with no terrain
		{
			for (var y=0;y<h;y++)
			{
				if (lvl[x][y]=='none') lvl[x][y]='forest';
			}
		}
		return lvl;
	}
}

});