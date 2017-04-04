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
};

NumberIdenti.init=function(){
	$('#coverPage').show();
	$('#gamePage').hide();
	NumberIdenti.gameData=NumberIdenti.jsonData.slice();
};

NumberIdenti.startGame=function(){
	$('#coverPage').hide();
	$('#gamePage').show();
	NumberIdenti.fillNumberChart();
	NumberIdenti.showQuestion();
};

NumberIdenti.fillNumberChart=function()
{
	var div,randomNumber=0,number=20;
	for(var i=0;i<number;i++)
	{
		randomNumber=Math.floor(Math.random()*NumberIdenti.gameData.length);
		div=$('<div id="numberDiv'+(i+1)+'" class="numberDiv col-lg-3 col-md-3 col-xs-3 col-sm-3"><p id="number'+(i+1)+'" class="numbers">'+(NumberIdenti.gameData[randomNumber]['word'])+'</p></div>');
		$(div).on('click',NumberIdenti.checkAns);
		$(div).data('number',NumberIdenti.gameData[randomNumber].number);
		$('#numberChartDiv').append(div);
		NumberIdenti.gameData.splice(randomNumber,1);
	}
};

NumberIdenti.showQuestion=function(){
	var randomNumber=0;
	randomNumber=Math.floor(Math.random()*NumberIdenti.jsonData.length);
	$('#title').text(NumberIdenti.jsonData[randomNumber]['word']);
	console.log('number',randomNumber);
	document.getElementById('playSound').src=Utils.Path+'Sounds/'+NumberIdenti.jsonData[randomNumber].sound;
	document.getElementById('playSound').play();
	$('.numberDiv').css({'pointer-events': 'auto'});
	NumberIdenti.jsonData.splice(randomNumber,1);
};

NumberIdenti.playSoundAgain=function()
{
	document.getElementById('playSound').play();
}

NumberIdenti.checkAns=function()
{
	$('.numberDiv').css({'pointer-events': 'none'});
	if($(this).find('p').text()==$('#title').text())
	{
		NumberIdenti.flag=true;
		NumberIdenti.addAttributes(this,'excellent','Green','magictime vanishOut','magictime vanishOut',NumberIdenti.flag);
	}
	else
	{
		NumberIdenti.flag=false;
		NumberIdenti.addAttributes(this,'not_this_one','red','shake','shake',NumberIdenti.flag);
	}
};

NumberIdenti.addAttributes=function(div,str,color,addthisclass,removeThis,flag)
{
		document.getElementById('playSound').src=Utils.Path+'Sounds/'+str+'.mp3';
		document.getElementById('playSound').play();
		$(div).find('p').css({'color':''+color});
		$(div).find('p').addClass(''+addthisclass);
		setTimeout(function()
		{
			$(div).find('p').removeClass(''+removeThis);
			if(flag)
				$(div).find('p').text($(div).data('number'));
			else
				$(div).find('p').css({'color':'black'});
			setTimeout(function(){
				if(NumberIdenti.jsonData.length>0)
					NumberIdenti.showQuestion();
				else
					location.reload(true);
			},900);
		},1200);
};