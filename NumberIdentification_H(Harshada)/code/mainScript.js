var NumberIdenti={};
var Utils={};
Utils.Path='';

$(document).ready(function(){
	//Android.getPath('NumberChartIdentification');
	setTimeout(function(){
		NumberIdenti.setAllImages();
		NumberIdenti.init();
	},200);
});

NumberIdenti.setAllImages=function()
{
	$('#playGame').prop('src',Utils.Path+'Images/Aksharkhadi_Play.png');
	$('#home').prop('src',Utils.Path+'Images/Aksharkhadi_Home.png');
	$('#volume').prop('src',Utils.Path+'Images/Aksharkhadi_Sound.png');
	$('#level1').prop('src',Utils.Path+'Images/level1.png');
	$('#level2').prop('src',Utils.Path+'Images/level2.png');
};

NumberIdenti.init=function(){
	$('#coverPage').show();
	$('#gamePage,#levelDiv').hide();
	$('.levels').on('click',function(){
		NumberIdenti.startGame(this);
	});
	NumberIdenti.gameData=NumberIdenti.jsonData.slice();
};

NumberIdenti.showLevels=function()
{
	$('#playGame').hide();
	$('#levelDiv').show();
};

NumberIdenti.startGame=function(element)
{
	NumberIdenti.tempArray=[];
	NumberIdenti.counter=12;
	$('#coverPage').hide();
	$('#gamePage').show();
	NumberIdenti.fillNumberChart(element);
	NumberIdenti.showQuestion();
};

NumberIdenti.searchNumber=function(number)
{
	for(var i=0;i<NumberIdenti.gameData.length;i++)
	{
		if(NumberIdenti.gameData[i]['number']==number)
		{
			break;
		}
	}
	if(i==NumberIdenti.gameData.length)
		return -1;
	else
		return i;
};

NumberIdenti.fillNumberChart=function(element)
{
	var div,firstNumber=0,lastNumber=0,number=12,returnValue=0;
	NumberIdenti.element=element;
	if(element==level1)
	{
		NumberIdenti.firstNumber=Math.floor(Math.random()*NumberIdenti.gameData.length);
		NumberIdenti.lastNumber=NumberIdenti.firstNumber+number;
		returnValue=NumberIdenti.searchNumber(NumberIdenti.lastNumber);
		while(returnValue==-1)
		{
			NumberIdenti.fillNumberChart(element);
			return 0;
		}
		console.log(returnValue);
		for(var i=0;i<number;i++)
		{
			div=$('<div id="numberDiv'+(i+1)+'" class="numberDiv addremoveThis col-lg-4 col-md-4 col-xs-4 col-sm-4"><p id="number'+(i+1)+'" class="numbers">'+(NumberIdenti.gameData[NumberIdenti.firstNumber]['word'])+'</p></div>');
			$(div).on('click',NumberIdenti.checkAns);
			$(div).data('number',NumberIdenti.gameData[NumberIdenti.firstNumber].number);
			$('#numberChartDiv').append(div);
			NumberIdenti.tempArray.push(NumberIdenti.firstNumber);
			NumberIdenti.firstNumber++;
		}
	}
	if(element==level2)
	{

		for(var i=0;i<number;i++)
		{
			NumberIdenti.firstNumber=Math.floor(Math.random()*NumberIdenti.gameData.length);
			while($.inArray(NumberIdenti.firstNumber,NumberIdenti.tempArray)>=0)
			{
				NumberIdenti.firstNumber=Math.floor(Math.random()*NumberIdenti.gameData.length);
			}
			NumberIdenti.tempArray.push(NumberIdenti.firstNumber);
			div=$('<div id="numberDiv'+(i+1)+'" class="numberDiv col-lg-4 col-md-4 col-xs-4 col-sm-4"><p id="number'+(i+1)+'" class="numbers">'+(NumberIdenti.gameData[NumberIdenti.firstNumber]['word'])+'</p></div>');
			$(div).on('click',NumberIdenti.checkAns);
			$(div).data('number',NumberIdenti.gameData[NumberIdenti.firstNumber].number);
			$('#numberChartDiv').append(div);
			
			//NumberIdenti.gameData.splice(NumberIdenti.firstNumber,1);
		}
	}
};

NumberIdenti.showQuestion=function()
{
	var randomNumber=0;
	randomNumber=Math.floor(Math.random()*NumberIdenti.tempArray.length);
	$('#title').text(NumberIdenti.jsonData[NumberIdenti.tempArray[randomNumber]]['word']);
	console.log('number',randomNumber);
	document.getElementById('playSound').src=Utils.Path+'Sounds/'+NumberIdenti.jsonData[NumberIdenti.tempArray[randomNumber]].sound;
	document.getElementById('playSound').play();
	$('.addremoveThis').css({'pointer-events': 'auto'});
	NumberIdenti.tempArray.splice(randomNumber,1);
};

NumberIdenti.playSoundAgain=function()
{
	document.getElementById('playSound').play();
}

NumberIdenti.checkAns=function()
{
	$('.addremoveThis').css({'pointer-events': 'none'});
	NumberIdenti.counter--;
	if($(this).find('p').text()==$('#title').text())
	{
		NumberIdenti.answflag=true;
		NumberIdenti.addAttributes(this,'excellent','Green','magictime vanishOut','magictime vanishOut',NumberIdenti.answflag);
	}
	else
	{
		NumberIdenti.answflag=false;
		NumberIdenti.addAttributes(this,'not_this_one','red','shake','shake',NumberIdenti.answflag);
	}
};

NumberIdenti.addAttributes=function(div,str,color,addthisclass,removeThis,answflag)
{
		document.getElementById('playSound').src=Utils.Path+'Sounds/'+str+'.mp3';
		document.getElementById('playSound').play();
		$(div).find('p').css({'color':''+color});
		$(div).find('p').addClass(''+addthisclass);
		setTimeout(function()
		{
			$(div).find('p').removeClass(''+removeThis);
			if(answflag)
			{
				$(div).find('p').text($(div).data('number'));
				$(div).removeClass('addremoveThis');
				$(div).css({'pointer-events': 'none'});
			}
			else
				$(div).find('p').css({'color':'black'});
			setTimeout(function(){
				if(NumberIdenti.counter>0)
					NumberIdenti.showQuestion();
				else
					location.reload(true);
			},900);
		},1200);
};

NumberIdenti.clearAllAndShowNext=function()
{
	$('#numberChartDiv').empty();
	NumberIdenti.startGame(NumberIdenti.element);
};