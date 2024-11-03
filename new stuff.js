///Agriculture
{type:'gather',context:'herbgather',what:{'wheat':0.5,'rice':0.5},amount:1,max:1,mode:'gather rare herb',req:{'discovery of crops':true}},
{type:'gather',context:'foodgather',what:{'herb':-0.75},amount:1,max:1,mode:'gather food only',req:{'discovery of crops':true}},
new G.Trait({
	name:'discovery of crops',
	desc:'People discovered a pleasant surprise from the pile of their rotten food',
	icon:[20,1],
	chance:10,
	cost:{'spoiled food':1000},
	req:{'hunting':true,'plant lore':true,'fishing':true},
});
new G.Tech({
    name:'early farming',
    desc:'The discovery of the crops brings forth the revolution of food production.',
    icon:[22,5],
    cost:{'insight':25,'wheat':100},
    req:{'discovery of crops':true},
    effects:[
        {type:'make part of',what:['wheat'],parent:'consumables'},
    ],
});

new G.Unit({
	name:'primitive planter',
	desc:'@Grow crops from the pile of spoiled food at slow rate.',
	icon:[21,3],
	cost:{'anarchic building materials':100},
	use:{'land':1},
	//require:{'worker':3,'metal tools':3},
    effects:[
		{type:'convert',from:{'spoiled food':50},into:{'wheat':0.5,'rice':0.5,'vegetable':0.1,'fruit':0.1},every:5,mode:'knap'},
		{type:'waste',chance:0.001/1000},
    ],
	req:{'early farming':true},
	category:'production',
});

new G.Tech({
    name:'domestication of wheat',
    desc:'You people has discovered how to eat this type of grain.',
    icon:[22,5],
    cost:{'insight':20,},
    req:{'discovery of crops':true},
    effects:[
        {type:'make part of',what:['wheat'],parent:'food'},
    ],
});

new G.Tech({
    name:'domestication of wheat',
    desc:'The discovery of the wheat brings forth the possibility of mass production of it.',
    icon:[22,5],
    cost:{'insight':70,'wheat':500},
    req:{'discovery of crops':true},
    effects:[
    ],
});

new G.Tech({
    name:'discovery of rice',
    desc:'You people has discovered how to eat this type of grain',
    icon:[22,5],
    cost:{'insight':20,},
    req:{'discovery of crops':true},
    effects:[
        {type:'make part of',what:['rice'],parent:'food'},
    ],
});

new G.Tech({
    name:'domestication of rice',
    desc:'The discovery of the rice brings forth the possibility of mass production of it.',
    icon:[22,5],
    cost:{'insight':70,'rice':500},
    req:{'discovery of rice':true},
    effects:[
    ],
});


new G.Tech({
    name:'basic food processing',
    desc:'Unlock the real use of [wheat] and [rice].@Though people are not willing to consume their crops raw anymore.',
    icon:[22,5],
    cost:{'insight':150},
    req:{'domestication of wheat':true},
    effects:[
        {type:'make part of',what:['wheat'],parent:'consumables'},
		{type:'make part of',what:['rice'],parent:'consumables'}
    ],
});


new G.Res({
	name:'wheat',
	desc:'A basic source of carbonhydrate, it provides large amount of energy but need some grinding to turn into [flour],subsequently creating many food types.',
	icon:[15,6,'H1sheet'],
	category:'consumeables',
	turnToByContext:{'eating':{'health':0.002,'happiness':-0.01},'decay':{'spoiled food':1}},
});

new G.Res({
	name:'rice',
	desc:'A basic source of carbonhydrate, it provides large amount of energy,subsequently creating many food types.',
	icon:[15,6,'H1sheet'],
	category:'consumeables',
	turnToByContext:{'eating':{'health':0.002,'happiness':-0.01},'decay':{'spoiled food':1}},
});

new G.Res({
	name:'flour',
	desc:'A product of wheat. Can be turned into many foods. It also has a chance of being turned into [yeasts] when decayed',
	icon:[15,6,'H1sheet'],
	category:'consumeables',
	turnToByContext:{'decay':{'yeast':0.2,'spoiled food':0.8}},
});

new G.Res({
	name:'yeast',
	desc:'A product of flour. It can be used to craft beer and baked goods.',
	icon:[15,6,'H1sheet'],
	category:'consumeables',
	tick:loseMaterialsTick,
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
	name:'hard tack',
	desc:'[hard tack] is a harsh alternative to bread, it is super hard and are often used to feed explorers due to it being easy to make and preserved for a long time. At least its better than nothing.',
	icon:[7,7],
	turnToByContext:{'eating':{'health':0.02,'happiness':0.02},'decay':{'spoiled food':1}},
	partOf:'food',
	category:'food',
});

new G.Unit({
		name:'bakery',
		desc:'@Provides people with baked goods.. Such as [bread]s.',
		icon:[6,2],
		cost:{},
		use:{'building slot':1,'worker':2},
		gizmos:true,
		modes:{
			'make bread':{name:'make bread',icon:[0,9],desc:'Turn [flour],[yeast] and some [water] into [bread]s.'},
			'make hard tacks':{name:'make hard tacks',icon:[0,9],desc:'Turn [flour],[salt] and some [water] into [hard tack]s.'},
		},
		effects:[
			{type:'convert',from:{'flour':2,'water':2,'yeast':1},into:{'bread':4},every:1,mode:'make bread'},
			{type:'convert',from:{'flour':2,'water':2,'salt':1},into:{'hard tack':8},every:1,mode:'make bread'},
		],
		req:{'basic food processing':true}, 
		category:'cooking',
	});

	new G.Unit({
		name:'chef',
		desc:'@A worker who speciallises in creating food and subsequentally cuisines. Such as [cooked rice]@<H6>Not to be confused with chief Haha.</H6>',
		icon:[6,2],
		cost:{},
		use:{'worker':1},
		gizmos:true,
		modes:{
			'cook rice':{name:'cook rice',icon:[0,9],desc:'Turn [rice] and some [water] into [steamed rice].'},
		},
		effects:[
			{type:'convert',from:{'rice':2,'water':2},into:{'steamed rice':3},every:1,mode:'cook rice'},
		],
		req:{'basic food processing':true},
		category:'cooking',
	});	

new G.Res({
	name:'farming capability',
	desc:'This is a index on how many farm can you maintain and produce crops effectively,[farmer]s and subsuquently many agricultral technology may increase it.<H6>Tractor when?</H6>//The number on the left is how much land is occupied, while the number on the right is how much land you have in total.',
	icon:[12,3,'H1sheet'],
	displayUsed:true,
	getDisplayAmount:function()
	{
		return B(this.displayedUsedAmount)+'<wbr>/'+B(this.displayedAmount);
	},
});

new G.Unit({
    name:'farmer',
    desc:'@The backbone of a civlization, mass producing food with adquate [farm],[orchard] and [pens].',
    icon:[0,0],
    cost:{},
    use:{'worker':1},
    effects:[
        {type:'provide',what:{'farming capability':1}},
    ],
    req:{'early farming':true},
    category:'production',
    priority:10,
});


new G.Unit({
	name:'Farms',
	desc:'@Grow crops from the ground<>A piece of land with some functional farming infanstructures.',
	icon:[21,3],
	cost:{'basic building materials':300,'stone tool':10},
	use:{'land':5,'building slots':1,'farming capability':5},
	//require:{'worker':3,'metal tools':3},
	gizmos:true,
    modes:{
        'plant wheat':{name:'plant wheat',icon:[0,0],req:{'domestication of wheat':true}},
        'plant vegetables':{name:'plant vegetables',icon:[0,0]},
        'plant rice':{name:'plant rice',icon:[0,0],req:{'domestication of rice':true}},
    },
    effects:[
		{type:'gather',what:{'wheat':5},mode:'plant wheat'},
		{type:'gather',what:{'rice':5},mode:'plant rice'},
		{type:'gather',what:{'vegetables':1},mode:'plant vegetables'},
		{type:'provide',what:{'food storage':1000}},
		{type:'waste',chance:0.001/1000},
    ],
	req:{'early farming':true},
	category:'production',
});


///Settlement overhaul,make the building cost slots

    new G.Res({
		name:'building slot',
		desc:'Places in the settlement where you can properly build the building and workers can fit in without many problems.',
		icon:[14,4],
		displayUsed:true,
		getDisplayAmount:function()
		{
			return B(this.displayedUsedAmount)+'<wbr>/'+B(this.displayedAmount);
		},
	});

	{type:'waste',chance:0.1/1000,req:{'earthquake':true}}

///Order{
	G.resCategories={
	'main':{
		name:'Essentials',
		base:[],
		side:['population','worker','happiness','health','land','order','coin'],
	},
}

    new G.Trait({
		name:'city state',
		desc:'@City states and bronze, sounds familar? You glance at your societys improvement, feeling a bit alienated@[order] is now a thing to keep track of.',
		icon:[20,1],
		chance:10,
		req:{'census':true,'mausoleum complete':true},
	});

    new G.Res({
        name:'order',
        desc:'[order] describes the society of your [population], how it stays function and intact.//When under 100%, there will be rebels and people are worried, reducing the happiness. When above 100%, the production ups futher.//Order can be decreased by natural disaster and hostile creatures. It can also be raised by certain policy and assign enough men to govern//It works in a simliar way to health.',
        startWith:200,
        visible:true,
        icon:[17,4],
        fractional:true,
        tick:function(me,tick)
        {
            if (G.getRes('population').amount>1000 && tick%2==0 &&{'city state':true})
            {
                me.amount*=0.099;
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
                if (amount>=100) return [18,4,'H1sheet'];
                else if (amount>=50) return [17,4,'H1sheet'];
                else if (amount>=-50) return [16,4,'H1sheet'];
                else if (amount>=-100) return [15,4,'H1sheet'];
                else return [5,4];
            }
        },
    });
///More buildings
new G.Unit({
    name:'Library',
    desc:'@provides 10 [wisdom]<>A place for preserving infomation medium, the most popular one being books.//Use up 2 knowledgeable men to classify and check if any morons did not place the book right',
    icon:[12,2],
    cost:{'basic building materials':500,},
    use:{'land':1,'bulding slot':1,'worker':2},
    //require:{'worker':2,'knapped tools':2},
    effects:[
        {type:'provide',what:{'added food storage':400}},
        {type:'provide',what:{'added material storage':400}},
        {type:'waste',chance:0.8/1000}
    ],
    req:{'stockpiling':true},
    category:'storage',
});

///Wonder
	new G.Unit({
		name:'mausoleum',
		desc:'@leads to the <b>Mausoleum Victory</b><>A mystical monument where the dead lie.//A temple housing a tomb deep under its rocky platform, the Mausoleum stands tall, its eternal shadow forever reminding your people of your greatness.',
		wonder:'mausoleum',
		icon:[1,14],
		wideIcon:[0,14],
		cost:{'basic building materials':1000},
		costPerStep:{'basic building materials':200,'precious building materials':10},
		steps:100,
		messageOnStart:'You begin the construction of the Mausoleum. Its towering mass already dominates the city, casting fear and awe wherever its shadow reaches.',
		finalStepCost:{'population':12},
		finalStepDesc:'To complete the Mausoleum, 12 of your [population,People] must be sacrificed to accompany you as servants in the afterlife.',
		use:{'land':50},
		//require:{'worker':10,'stone tools':10},
		req:{'monument-building':true},
		category:'wonder',
	});

    G.legacyBonuses.push(
		{id:'addFastTicksOnStart',name:'+[X] free fast ticks',desc:'Additional fast ticks when starting a new game.',icon:[0,0],func:function(obj){G.fastTicks+=obj.amount;},context:'new'},
		{id:'addFastTicksOnResearch',name:'+[X] fast ticks from research',desc:'Additional fast ticks when completing research.',icon:[0,0],func:function(obj){G.props['fastTicksOnResearch']+=obj.amount;}}
	);
	
    new G.Unit({
		name:'grand light tower',
		desc:'@Enables ocean exploring tech//Your dreamers dreamt about the giant pillar of light, it can guide the lost to home. You decided to build it.',
		wonder:'grand light tower',
		icon:[1,14],
		wideIcon:[0,14],
		cost:{'cut stone':1000,'marble':1000,'concrete':200,'glass':100},
		costPerStep:{'cut stone':1000,'precious building materials':2},
		steps:100,
		messageOnStart:'You begin the construction of the grand light tower. Its towering mass already dominates the city harbour, the fishers and traders jejoice at the convenience it brings.',
		finalStepCost:{'oil':200},
		finalStepDesc:'To complete the grand light tower, You must have enough oil to light it up, and sacrfice enough so that the god of sea is pleased.',
		use:{'land':50},
		//require:{'worker':10,'stone tools':10},
		req:{'monument-building':true,'mausoleum complete':true,'lighthouse':true},
		category:'wonder',
	});

    G.legacyBonuses.push(
		{id:'addFastTicksOnStart',name:'+[X] free fast ticks',desc:'Additional fast ticks when starting a new game.',icon:[0,0],func:function(obj){G.fastTicks+=obj.amount;},context:'new'},
		{id:'addFastTicksOnResearch',name:'+[X] fast ticks from research',desc:'Additional fast ticks when completing research.',icon:[0,0],func:function(obj){G.props['fastTicksOnResearch']+=obj.amount;}}
	);
	//do NOT remove or reorder achievements or saves WILL get corrupted
	
	});
    new G.Achiev({
		tier:1,
		name:'grand light tower',
		desc:'@enable ocean exploring.<>The Grand light tower stood on the beach near your capital.',
		fromUnit:'grand light tower',
		effects:[
		],
	});
    

///AGE

    new G.Tech({
        name:'grand light tower complete',
        desc:'@Your salior will never get lost again as the Grand light tower stood.',
        icon:[22,5],
        cost:{'insight':999},
        req:{},
        effects:[
        ],
    });

	if (G.achievByName['mausoleum'].won>1)
	{{G.gainTech(G.techByName['mausoleum complete'])};G.Message({type: 'good',text: 'Is this afterlife? You seems to have little idea of where you are until your tribe member walks up on you.'})}
	else{ 
		if (G.achievByName['mausoleum'].won>=2) {G.gainTech(G.techByName['mausoleum complete']),G.Message({type: 'good',text: 'You know where you are, and this is not after life, you started to question it.'})}
		};

	if(G.has('scouting')){
		G.setPolicyModeByName('far foraging','off');
		G.getPolicy('far foraging').visible=false;
		G.update['policy']();
		}

