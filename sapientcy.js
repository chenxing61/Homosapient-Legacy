G.AddData({
name:'Sapientcy',
author:'CX61',
desc:'And what do you know, mod has to evolve.Required to play Homosapient legacy 0.4 and later versions.',
engineVersion:1,
manifest:'0',
sheets:{'H1sheet':'https://file.garden/ZGd4-WLYvB6VkIdj/img/H1sheet.png'},
func:function(){

G.parse=function(what)
{
	var str='<div class="par">'+((what
	.replaceAll(']s',',*PLURAL*]'))
	.replace(/\[(.*?)\]/gi,G.parseFunc))
	.replaceAll('http(s?)://','http$1:#SLASH#SLASH#')
	.replaceAll('//','</div><div class="par">')
	.replaceAll('#SLASH#SLASH#','//')
	.replaceAll('@','</div><div class="par bulleted">')
	.replaceAll('<>','</div><div class="divider"></div><div class="par">')+'</div>';
	return str;
}
	}})
	G.fullApplyUnitEffects=function(me,type,amountParam)
	{
		//run through every effect in a unit and apply them
		//"type" lets us run specific effects only : 0 means all effects that happen every tick, 1 means all effects that happen on unit purchase (or sale, or death, if the amount is negative), 2 means all effects that affect the effective unit amount, 3 means all effects that happen when unit is made unidle (or idle, if the amount is negative)
		//"amountParam" depends on the type : if type is 0, it represents the effective unit amount; if type is 1, it is the new amount of the unit we just purchased; if type is 3, it is the amount that was just made unidle
		
		var len=me.unit.effects.length;
		var visible=false;
		//if (me.l && G.tab.id=='unit') visible=true;
		var out=0;//return value; only used by type 2 effects
		if (type==2) out=me.amount-me.idle;
		
		for (var i=0;i<len;i++)
		{
			var effect=me.unit.effects[i];
			if (!effect.req || G.checkReq(effect.req))
			{
				if ((!effect.mode || me.mode.id==effect.mode) && (!effect.notMode || me.mode.id!=effect.notMode))
				{
					if (type==0)//effects that happen every tick
					{
						if (!effect.every || G.tick%effect.every==0)//.every : effect only triggers every X days
						{
							var repeat=1;
							if (effect.repeat) repeat=effect.repeat;//.repeat : effect triggers X times every day
							for (var repI=0;repI<repeat;repI++)
							{
								var myAmount=amountParam;
								if (effect.type=='gather')//gather : extract either specific resources, or anything from a context, or both, using the available resources in owned tiles
								//if .max is specified, each single unit can only gather that amount at most, forcing the player to create enough units to match the resources available in owned tiles
								//by default, units try to gather a random amount between 50% and 100% of the specified amount; add .exact=true to get the precise amount instead
								//the amount gathered is soft-capped by the natural resource
								{
									if (!effect.chance || Math.random()<effect.chance)
									{
									var resWeight=0.95;
									var unitWeight=1-resWeight;
									var res=[];
									var specific=false;
									if (effect.what)//gathering something in particular
									{res=effect.what;specific=true;}
									else//harvest by context only
									{res=G.currentMap.computedPlayerRes[effect.context];}
									for (var ii in res)
									{
										var amount=0;
										if (specific)
										{
											var toGather=myAmount*res[ii];
											var resAmount=toGather;//if no context is defined, ignore terrain goods - just harvest from thin air
											if (effect.context && G.currentMap.computedPlayerRes[effect.context]) resAmount=G.currentMap.computedPlayerRes[effect.context][ii]||0;
											var max=effect.max||0;
										}
										else
										{
											var toGather=myAmount*(effect.amount||1);
											var resAmount=res[ii];
											var max=effect.max||0;
										}
										
										amount=Math.min(resAmount,toGather)*resWeight+unitWeight*(toGather);
										if (!effect.exact) amount*=(0.5+0.5*Math.random());
										if (max) amount=Math.min(max*myAmount,amount);
										amount=randomFloor(amount);
										
										if (amount>0)
										{
											if (G.getRes(ii).whenGathered) G.getRes(ii).whenGathered(G.getRes(ii),amount,me,effect);
											else G.gain(ii,amount,me.unit.displayName);
											if (visible) me.popups.push(G.dict[ii].icon);
										}
									}
									}
								}
								else if (effect.type=='convert')//convert : convert resources into other resources as long as we have enough materials
								{
									if (!effect.chance || Math.random()<effect.chance)
									{
										//establish how many we can make from the current resources
										//i hope i didn't mess up somewhere in there
										var amountToMake=myAmount;
										for (var ii in effect.from)
										{
											amountToMake=Math.min(amountToMake,G.getRes(ii).Amount/(effect.from[ii]*myAmount));
										}
										
										amountToMake=randomFloor(Math.min(1,amountToMake)*myAmount);
										
										if (amountToMake>0)
										{
											for (var ii in effect.from)
											{
												G.lose(ii,effect.from[ii]*amountToMake,me.unit.displayName);
											}
											for (var ii in effect.into)
											{
												if (G.getRes(ii).whenGathered) G.getRes(ii).whenGathered(G.getRes(ii),effect.into[ii]*amountToMake,me,effect);
												else G.gain(ii,effect.into[ii]*amountToMake,me.unit.displayName);
												if (visible && effect.into[ii]*amountToMake>0) me.popups.push(G.dict[ii].icon);
											}
										}
									}
								}
								else if (effect.type=='waste')//waste : a random percent of the unit dies off every tick
								{
									var toDie=randomFloor(effect.chance*me.amount);
									if (toDie>0)
									{
										if (effect.desired){
											//if(me.unit.name.indexOf('grave')!=-1 || me.unit.name.indexOf('cemetary')!=-1)G.gain('corpse',-toDie*G.unitByName[''].effects[0].what['burial spot'],'decay');
											me.targetAmount-=toDie;
										}
										G.wasteUnit(me,toDie);
									}
								}
								else if (effect.type=='explore')
								{
									var limit=500;
									if(G.modsByName["Default dataset"]){
										limit+=(G.has("advanced mapping") ? Infinity : (G.has("basic mapping") ? 6500 : 0)+(G.has("map details") ? 14500 : 0)+(G.has("scouting") ? 1000 : 0) +(G.has("focused scouting") ? 20000 : 0));
										if(G.getRes("wtr").amount+G.getRes("land").amount<limit && G.isMap==0){
											if (effect.explored) G.exploreOwnedTiles+=Math.random()*effect.explored*myAmount;
											if (effect.unexplored) G.exploreNewTiles+=Math.random()*effect.unexplored*myAmount;
											G.getDict('wanderer').effects[G.unitByName['wanderer'].effects.length-1].chance=0.01;
											G.getDict('scout').effects[G.unitByName['scout'].effects.length-1].chance=0.01;
										}else{
											G.getDict('wanderer').effects[G.unitByName['wanderer'].effects.length-1].chance=1e-300;
											G.getDict('scout').effects[G.unitByName['scout'].effects.length-1].chance=1e-300;
										}
									}else{
										//limit+=(G.has("advanced mapping") ? Infinity : (G.has("basic mapping") ? 6000 : 0)+(G.has("map details") ? 14000 : 0));
										limit+=(G.has("map details") ? Infinity : (G.has("basic mapping") ? 6500 : 0)+(G.has("scouting") ? 300 : 0)); //for now since advanced mapping isn't available for C2 yet
										if(G.getRes("wtr").amount+G.getRes("land").amount<limit && G.isMap==false){
											if (effect.explored) G.exploreOwnedTiles+=Math.random()*effect.explored*myAmount;
											if (effect.unexplored) G.exploreNewTiles+=Math.random()*effect.unexplored*myAmount;
										}else{
											G.getDict('wanderer').effects[G.unitByName['wanderer'].effects.length-1].chance=1e-300;
											G.getDict('scout').effects[G.unitByName['scout'].effects.length-1].chance=1e-300;
										}
									}
								}
								else if (effect.type=='exploreAlt')
								{
									var limit=750;
									if(G.modsByName["Default dataset"]){
										limit+=(G.has("advanced mapping") ? Infinity : (G.has("basic mapping") ? 6500 : 0)+(G.has("map details") ? 14000 : 0)+(G.has("scouting") ? 1000 : 0) +(G.has("focused scouting") ? 20000 : 0));
										if(G.getRes("wtr").amount+G.getRes("land").amount<limit && G.isMap==0){
											if (effect.explored) G.exploreOwnedTiles+=Math.random()*effect.explored*myAmount;
											if (effect.unexplored) G.exploreNewTilesAlternate+=Math.random()*effect.unexplored*myAmount;
											G.getDict('wanderer').effects[G.unitByName['wanderer'].effects.length-1].chance=0.01;
										
										}else{
											G.getDict('wanderer').effects[G.unitByName['wanderer'].effects.length-1].chance=1e-300;
	
										}
									}else{
										//limit+=(G.has("advanced mapping") ? Infinity : (G.has("basic mapping") ? 6000 : 0)+(G.has("map details") ? 14000 : 0));
										limit+=(G.has("map details") ? Infinity : (G.has("basic mapping") ? 6500 : 0)+(G.has("scouting") ? 300 : 0)); //for now since advanced mapping isn't available for C2 yet
										if(G.getRes("wtr").amount+G.getRes("land").amount<limit && G.isMap==false){
											if (effect.explored) G.exploreOwnedTiles+=Math.random()*effect.explored*myAmount;
											if (effect.unexplored) G.exploreNewTilesAlternate+=Math.random()*effect.unexplored*myAmount;
										}else{
											G.getDict('wanderer').effects[G.unitByName['wanderer'].effects.length-1].chance=1e-300;
										}
									}
								}
								else if (effect.type=='exploreOcean')//exploreOcean : discover new tiles or explore owned ocean
								{
									var limit=500;
									if(G.modsByName["Default dataset"]){
										limit+=(G.has("advanced mapping") ? Infinity : (G.has("basic mapping") ? 6500 : 0)+(G.has("map details") ? 14500 : 0) +(G.has("focused scouting") ? 20000 : 0)+(G.has("scouting") ? 1000 : 0));
										if(G.getRes("wtr").amount+G.getRes("land").amount<limit && !G.isMap){
											
											G.getDict('boat').effects[2].chance=1/117.5;
											G.getDict('boat').effects[3].chance=1/150;
											if (effect.explored) G.exploreOwnedOceanTiles+=Math.random()*effect.explored*myAmount;
											if (effect.unexplored) G.exploreNewOceanTiles+=Math.random()*effect.unexplored*myAmount;
										}else{
											
											G.getDict('boat').effects[2].chance=1e-300;
											G.getDict('boat').effects[3].chance=1e-300;
										}
									}else{
										//limit+=(G.has("advanced mapping") ? Infinity : (G.has("basic mapping") ? 6000 : 0)+(G.has("map details") ? 14000 : 0));
										limit+=(G.has("map details") ? Infinity : (G.has("basic mapping") ? 6500 : 0))+(G.has("scouting") ? 1000 : 0); //for now since advanced mapping isn't available for C2 yet
										if(G.getRes("wtr").amount+G.getRes("land").amount<limit){
											if (effect.explored) G.exploreOwnedOceanTiles+=Math.random()*effect.explored*myAmount;
											if (effect.unexplored) G.exploreNewOceanTiles+=Math.random()*effect.unexplored*myAmount;
											G.getDict('wanderer').effects[G.unitByName['wanderer'].effects.length-1].chance=0.02;
											G.getDict('druidish travellers team').effects[G.unitByName['druidish travellers team'].effects.length-1].chance=1/230;
											G.getDict('scout').effects[G.unitByName['scout'].effects.length-1].chance=1/90;
										}else{
											G.getDict('wanderer').effects[G.unitByName['wanderer'].effects.length-1].chance=1e-300;
											G.getDict('druidish travellers team').effects[G.unitByName['druidish travellers team'].effects.length-1].chance=1e-300;
											G.getDict('scout').effects[G.unitByName['scout'].effects.length-1].chance=1e-300;
										}
									}
								}
								else if (effect.type=='function')//function : any arbitrary function (or list of functions)
								{
									if (!effect.chance || Math.random()<effect.chance)
									{
										if (effect.funcs)
										{
											for (var ii in effect.funcs)
											{effect.funcs[ii](me);}
										}
										else effect.func(me);
									}
								}
							}
						}
					}
					else if (type==1)//effects that happen when the unit is bought or killed
					{
					}
					else if (type==3)//effects that happen when the unit is made unidle or idle
					{
						if (effect.type=='provide')//provide : when the unit is bought, give a flat amount of a resource; remove that same amount when the unit is deleted
						{
							if (effect.what)
							{
								for (var ii in effect.what)
								{
									var amount=effect.what[ii]*amountParam;
									if (amountParam>0 || !effect.noTakeBack)
									{
										if (G.getRes(ii).whenGathered) G.getRes(ii).whenGathered(G.getRes(ii),amount,me,effect);
										else G.gain(ii,amount,me.unit.displayName);
										if (visible && amount>0) me.popups.push(G.dict[ii].icon);
									}
								}
							}
						}
					}
					else if (type==2)//effects that modify the effective unit amount
					{
						if (effect.what)
						{
							if (effect.type=='add')//add the amount of these resources to the amount
							{
								for (var ii in effect.what)
								{
									var res=G.getRes(ii);
									out+=res.amount*effect.what[ii];
								}
							}
							else if (effect.type=='addFree')//add the free portion of these resources to the amount
							{
								for (var ii in effect.what)
								{
									var res=G.getRes(ii);
									out+=Math.max(0,res.amount-res.used)*effect.what[ii];
								}
							}
							else if (effect.type=='mult')//multiply the amount by the amount of these resources
							{
								for (var ii in effect.what)
								{
									var res=G.getRes(ii);
									out+=res.amount*effect.what[ii];
								}
							}
							else if (effect.type=='multFree')//multiply the amount by the free portion of these resources
							{
								for (var ii in effect.what)
								{
									var res=G.getRes(ii);
									out*=Math.max(0,res.amount-res.used)*effect.what[ii];
								}
							}
						}
						else//flat values
						{
							if (effect.type=='add')//add the value to the amount
							{
								out+=effect.value;
							}
							else if (effect.type=='mult')//multiply the amount by the value
							{
								out*=effect.value;
							}
						}
					}
				}
			}
		}
		return out;
	}