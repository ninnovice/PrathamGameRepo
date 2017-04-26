dhoom.difficulty=[
	{
		level:"0",
		NosOfQues : 5,
		quesList:[
			{
				firstRange:"1 to 20",
				secondRange:"1 to 20",
				format : ['dhoom.firstRandomNumber', 'dhoom.displayAnswer', '0','0','0'],
				type : dhoom.equal,
				ques : "_ = _"
			},{
				firstRange:"1 to 10",
				secondRange:"1 to 10",
				format : ['dhoom.firstRandomNumber', 'dhoom.secondRandomNumber', '0','0','0'],
				type : dhoom.equalObjects,
				ques : "_ = _"
			},{
				firstRange:"1 to 20",
				secondRange:"1 to 20",
				format : ['dhoom.firstRandomNumber', 'dhoom.secondRandomNumber', '0', '0', '0'],
				type : dhoom.greaterThan,
				ques:"_ is greater than _."
			},{
				firstRange:"1 to 10",
				secondRange:"1 to 10",
				format : ['dhoom.firstRandomNumber', 'dhoom.secondRandomNumber', 'dhoom.displayAnswer', '0','0'],
				type : dhoom.addition,
				ques:"_ + _ = _"
			},{
				firstRange:"1 to 20",
				secondRange:"1 to 20",
				format : ['dhoom.firstRandomNumber', 'dhoom.secondRandomNumber', 'dhoom.displayAnswer',  '0','0'],
				type : dhoom.substraction,
				ques:"_ - _ = _"
			}
		]
	},{
		level:"1",
		NosOfQues : 7,
		quesList:[
			{
				firstRange:"3 to 10",
				secondRange:"10 to 30",
				format : ['dhoom.secondRandomNumber', 'dhoom.firstRandomNumber', '0','0','0'],
				type : dhoom.mod,
				ques : "_ is in table of _"
			},{
				firstRange:"10 to 30",
				secondRange:"10 to 30",
				format : ['dhoom.firstRandomNumber', 'dhoom.displayAnswer','0','0','0'],
				type : dhoom.evenOdd,
				ques:"The number _ is an _ number"
			},{
				firstRange:"10 to 30",
				secondRange:"10 to 30",
				format : ['dhoom.firstRandomNumber', 'dhoom.displayAnswer','0','0','0'],
				type : dhoom.evenOdd,
				ques:"The number _ is an _ number"
			},{
				firstRange:"1000 to 6000",
				secondRange:"1000 to 6000",
				format : ['dhoom.firstRandomNumber', 'dhoom.displayAnswer', '0','0','0'],
				type : dhoom.splitNumber,
				ques : "In number _ units place is taken by _"
			},{
				firstRange:"1000 to 6000",
				secondRange:"1000 to 6000",
				format : ['dhoom.firstRandomNumber', 'dhoom.displayAnswer', '0','0','0'],
				type : dhoom.splitNumber,
				ques : "In number _ tens place is taken by _"
			},{
				firstRange:"1000 to 6000",
				secondRange:"1000 to 6000",
				format : ['dhoom.firstRandomNumber', 'dhoom.displayAnswer', '0','0','0'],
				type : dhoom.splitNumber,
				ques : "In number _ hundreds place is taken by _"
			},{
				firstRange:"1000 to 6000",
				secondRange:"1000 to 6000",
				format : ['dhoom.firstRandomNumber', 'dhoom.displayAnswer', '0','0','0'],
				type : dhoom.splitNumber,
				ques : "In number _ Thousands place is taken by _"
			}
		]
	},{
		level:"2",
		NosOfQues: 2,
		quesList:[
			{
				firstRange:"1 to 9",
				secondRange:"1 to 9",
				format : ['dhoom.firstRandomNumber', 'dhoom.secondRandomNumber','dhoom.displayAnswer','0','0'],
				type : dhoom.addition,
				ques : "_ + _ = _"
			},{
				firstRange:"1 to 3",
				secondRange:"2 to 9",
				format : ['dhoom.firstRandomNumber', 'dhoom.secondRandomNumber','dhoom.displayAnswer','0','0'],
				type : dhoom.multiply,
				ques :"_ x _ = _"
			}
		]
	},{
		level:"3",
		NosOfQues: 4,
		quesList:[
			{
				firstRange:"1 to 5",
				secondRange:"1 to 5",
				format : ['dhoom.firstRandomNumber', 'dhoom.displayAnswer','0','0','0'],
				type : dhoom.svgEqual,
				ques : "_ = _"
			},{
				firstRange:"1 to 5",
				secondRange:"1 to 5",
				format : ['dhoom.firstRandomNumber', 'dhoom.displayAnswer','0','0','0'],
				type : dhoom.svgEqual,
				ques : "_ <div class='col-xs-1 col-lg-1 col-md-1'> = </div> _"
			},{
				firstRange:"1 to 5",
				secondRange:"1 to 5",
				format : ['dhoom.firstRandomNumber', 'dhoom.displayAnswer','0','0','0'],
				type : dhoom.svgEqual,
				ques : "_ <div class='col-xs-4 col-lg-4 col-md-4'> is a greater than </div> _"
			},{
				firstRange:"1 to 8",
				secondRange:"1 to 8",
				format : ['dhoom.firstRandomNumber', 'dhoom.secondRandomNumber', 'dhoom.displayAnswer','0','0'],
				type : dhoom.svgEqual,
				ques : "_ <div class='col-xs-1 col-lg-1 col-md-1'> + </div> _ <div class='col-xs-1 col-lg-1 col-md-1'> = </div> _"
			}
		]
	}
]


dhoom.nosWithSpelling= {
	1 : 'one', 2 : 'two', 3 : 'three', 4 : 'four', 5 : 'five', 6 : 'six', 7 : 'seven', 8 : 'eigth', 9 : 'nine', 10 : 'ten', 11 : 'eleven', 12 : 'twelve',
	13 : 'thirteen', 14 : 'fourteen', 15 : 'fifteen', 16 : 'sixteen', 17 : 'seventeen', 18 : 'eighteen', 19 : 'ninteen', 20 : 'twenty'
};

dhoom.vehiclePosition= {  0 : 'myCopRunning', 1 : 'myCopCycle', 2 : 'myCopHorse', 3 : 'myCopBike', 4 : 'myCopCopter'};
dhoom.vehiclePosition2= { 0 : 'myCopRunning', 1 : 'myCopCycle2', 2 : 'myCopHorse2', 3 : 'myCopBike2', 4 : 'myCopCopter2'};

dhoom.nosOddEven= { 1 : 'Even', 2 : 'Odd'};
dhoom.shapes= { 3 : 'Triangle', 4 : 'Quadrilateral', 5 : 'Pentagon', 6 : 'Hexagon', 7 : 'Heptagon'};
dhoom.angles= { 1 : 'Acute', 2 : 'Right', 3 : 'Obtuse', 4 : 'Straight'};
dhoom.fractions= { 1:2, 2:3, 3:4, 4:6, 5:8};
dhoom.positiveNegative= { 1 : 'negative', 2 : 'less than', 3 : 'positive', 4 : 'greater than'};
dhoom.nosAscendingOrder= { 1 : 'ascending', 2 : '0,4,6,9,12', 3 : '4,9,61,23'};
dhoom.nosDescendingOrder= { 1 : 'descending', 2 : '12,9,6,4,0', 3 : '61,23,4,9'};



dhoom.Labels={
	gameName: 'Control Room',
	score:"स्कोर "
};
