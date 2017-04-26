var NumberOrdering={};
var Utils={};
Utils.Path='';

$(document).ready(function(){
	NumberOrdering.setAllImages();
	NumberOrdering.init();
});


NumberOrdering.setAllImages=function()
{
	$('#playGame').prop('src',Utils.Path+'IMAGES/Barakhadi_play.png');
	$('#FinalOk').prop('src',Utils.Path+'IMAGES/emoticons_01.png');
	$('#Next').prop('src',Utils.Path+'IMAGES/Barakhadi_Next.png');
	$('#level1').prop('src',Utils.Path+'Images/level1.png');
	$('#level2').prop('src',Utils.Path+'Images/level2.png');
	$('#Home').prop('src',Utils.Path+'Images/Aksharkhadi_Home.png');
};


NumberOrdering.init=function()
{
	$('#coverPage,#playGame').show();
	$('#gamePage,#levelDiv').hide();
	$('#background').css({'background-image':"url('IMAGES/BG.jpg')"});
	$('.levels').on('click',function(){
		NumberOrdering.startGame(this);
	});
};

NumberOrdering.startGame=function(element)
{
	NumberOrdering.level=0;
	NumberOrdering.level=element;
	$('#NumbersDiv,.spaces,.align6InLine').empty();
	$('#gamePage,#Next').show();
	$('#coverPage,#FinalOk').hide();
	NumberOrdering.AllNumbers=[],NumberOrdering.arrOfNumbers=[];
	NumberOrdering.answerCounter=0;
	NumberOrdering.optionArray=['asce','desc'];
	NumberOrdering.arrayOfTopPositions=[],NumberOrdering.arrayOfLeftPositions=[];
	NumberOrdering.chooseNumbers();
};

NumberOrdering.addLevels=function()
{
	$('#playGame').hide();
	$('#background').css({'background-image':"url('IMAGES/BG.jpg')"});
	$('#levelDiv').show();
};

NumberOrdering.chooseNumbers=function()
{
	var randomNumber=0;
	NumberOrdering.numbercount=12;
	randomOption=Math.floor(Math.random()*NumberOrdering.optionArray.length);
	$('#Title').text(NumberOrdering.hardCodedData[''+NumberOrdering.optionArray[randomOption]]);
	if(NumberOrdering.level==level1)
	{
		if(NumberOrdering.optionArray[randomOption]=='asce')
			randomNumber=Math.floor(Math.random()*38);
		else
			randomNumber=Math.floor((Math.random()*3)+13);

		for(var i=0;i<NumberOrdering.numbercount;i++)
		{
			NumberOrdering.arrOfNumbers.push(randomNumber);
			if(NumberOrdering.optionArray[randomOption]=='asce')
				randomNumber++;
			else
				randomNumber--;
		}
		
	}
	if(NumberOrdering.level==level2)
	{
		for(var i=0;i<NumberOrdering.numbercount;i++)
		{
			randomNumber=Math.floor((Math.random()*50)+1);
			while($.inArray(randomNumber,NumberOrdering.arrOfNumbers)>=0)
			{
				randomNumber=Math.floor((Math.random()*50)+1);
			}
			NumberOrdering.arrOfNumbers.push(randomNumber);
		}
		if(NumberOrdering.optionArray[randomOption]=='asce')
		{
			NumberOrdering.arrOfNumbers.sort(function(a,b){
				return a-b;
			});
		}
		else
		{
			NumberOrdering.arrOfNumbers.sort(function(a,b){
				return b-a;
			});
		}
		console.log(NumberOrdering.arrOfNumbers);	
		
	}
	NumberOrdering.addSpacesForBarakhadi();
};

NumberOrdering.searchWord=function(evt)
{
	for(var i=0;i<NumberOrdering.words.length;i++)
	{
		if(NumberOrdering.words[i]['suffix']==$(evt).text())
		{
			break;
		}
	}
	NumberOrdering.ltrForbarakhadi=NumberOrdering.words[i];
	console.log(NumberOrdering.ltrForbarakhadi);
}

NumberOrdering.showCompleteBarakhadi=function()
{
	NumberOrdering.ltrForbarakhadi=0;
	$('#scrollbarDiv').addClass('magictime puffOut');
	NumberOrdering.searchWord(this);
	NumberOrdering.addSpacesForBarakhadi();
	$('#NumbersDiv').addClass('magictime puffIn');
	$('#Next,#Hammer').show();
	NumberOrdering.playSoundAndHighlight();
}


NumberOrdering.allowDrop=function(event)
{
	event.preventDefault();
};


NumberOrdering.shuffleNumbers=function(array)
{
  var i = 0, j = 0, temp = 0;
  for (i = array.length - 1; i > 0; i--) 
  {
    j = Math.floor(Math.random() * (i + 1));
    temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
};

NumberOrdering.addSpacesForBarakhadi=function()
{
	var div,spanElement,outerDiv,k=0;
	var tempArray=[];
	tempArray=NumberOrdering.arrOfNumbers.slice();
	NumberOrdering.shuffleNumbers(tempArray);
	for(var i=0;i<2;i++)
	{
		outerDiv=$('<div style="margin-top:2%;margin-bottom:5%" class="col-lg-12 col-md-12 col-xs-12 col-sm-12"></div>');
		for(var j=0;j<6;j++)
		{
			div=$('<div id="div'+k+'"class="align6InLine text-center col-lg-1 col-md-1 col-xs-1 col-sm-1 col-lg-offset-1 col-md-offset-1 col-sm-offset-1 col-xs-offset-1 left" >'+NumberOrdering.arrOfNumbers[k]+'</div>');
			$(div).droppable({
				drop : NumberOrdering.Handledrop,
				dragover:NumberOrdering.allowDrop
			});
			$(div).data('Answer',NumberOrdering.arrOfNumbers[k]);
			if(k<NumberOrdering.numbercount)
			{
				spanElement=$('<p id="space'+k+'" class="col-lg-12 col-md-12 col-xs-12 col-sm-12 spaces" style="font-size:60px;color:black;padding-right:0px;padding-left:0px!important">'+tempArray[k]+'</p>');
				 /*$(spanElement).data('sound',NumberOrdering.ltrForbarakhadi['list'][k]['sound']);
				$(spanElement).on('click',function(){
					NumberOrdering.playSoundForEachWord($(this));
				}); 
*/
				$(spanElement).data('Answer',tempArray[k]);
				$(spanElement).draggable({
					cursor: 'move',
					
					snap:'#div'+k,
					revert:'invalid'
				});
				$(div).append(spanElement);
				k++;
			}
			$(outerDiv).append(div);
		}
		$('#NumbersDiv').append(outerDiv);
	}
	$('.align6InLine').css({'border':'3px solid black','color':'transparent'});
	NumberOrdering.checkData()
};

NumberOrdering.checkData=function()
{
	for(var i=0;i<NumberOrdering.arrOfNumbers.length;i++)
	{
		if($('#space'+i).data('Answer')==$('#div'+i).data('Answer'))
		{
			console.log('Match Found');
			NumberOrdering.answerCounter++;
			$('#space'+i).draggable('disable');
			$('#space'+i).css({'color':'green'});
		}
	}
};

NumberOrdering.playSoundForEachWord=function(element)
{
	document.getElementById('playSound').src=Utils.Path+'SOUND/'+$(element).data('sound');
	document.getElementById('playSound').play();
};

NumberOrdering.playSoundAndHighlight=function()
{
	var time;
	$('#scrollbarDiv').hide();
	$('#NumbersDiv').removeClass('magictime puffIn');
	document.getElementById('playSound').src='SOUND/'+NumberOrdering.ltrForbarakhadi['list'][NumberOrdering.counter]['sound'];
	document.getElementById('playSound').play();
	document.getElementById('space'+NumberOrdering.counter).style.color="green";
	NumberOrdering.timeout=setTimeout(function()
	{
		document.getElementById('space'+NumberOrdering.counter).style.color="black";
		NumberOrdering.counter++;
		document.getElementById('playSound').pause();
		if(NumberOrdering.counter<NumberOrdering.ltrForbarakhadi['list'].length)
		{
			NumberOrdering.playSoundAndHighlight();
		}
		else
		{
			$('#Hammer').hide();
			document.getElementById('playSound').src='SOUND/glassBreak.wav';
			document.getElementById('playSound').play();
			//NumberOrdering.addDragAndDrop();
			NumberOrdering.dropRandomWords();
			//NumberOrdering.addSomeRandomWords();
		}
	},1350);
}

NumberOrdering.clearAllAndShowNext=function()
{
	
	$('#FinalOk').hide();
	$('#Next').removeClass('blink_me');
	$('#NumbersDiv').addClass('magictime puffIn');
	setTimeout(function(){
		$('#NumbersDiv').removeClass('magictime puffIn');
		$('#NumbersDiv,.spaces,.align6InLine').empty();
		$('#Next,#Hammer').hide();
		NumberOrdering.startGame(NumberOrdering.level);
	},1000);
}

NumberOrdering.Handledrop=function(event,ui)
{
	var destiDiv,sourceLetter,destiLetter,sourceDiv,sourceLetterData,destiLetterData
	sourceLetter=ui.draggable;
	destiDiv= $(this);
	destiLetter=$(this).find('p');
	sourceDiv=ui.draggable.parent();
	sourceLetterData=ui.draggable.data('Answer');
	destiLetterData=$(destiLetter).data('Answer');

	$(sourceLetter).position({
		  my: "center center",
		  at: "center center",
		  of:this
	});
	$(sourceLetter).appendTo(destiDiv).draggable();
	$(destiLetter).appendTo(sourceDiv).draggable();
	$(sourceLetter).css({
			"top":"0px",
			"left":"0px"
	});
	if(sourceDiv!==destiDiv)
	{
		if($(sourceLetter).data('Answer')==$(destiDiv).data('Answer'))
		{
			NumberOrdering.answerCounter++;
			$(sourceLetter).draggable('disable');
			$(destiDiv).droppable('disable');
			$(sourceLetter).css({'color':'green'});
		}
		if($(destiLetter).data('Answer')==$(sourceDiv).data('Answer'))
		{	
			NumberOrdering.answerCounter++;
			$(destiLetter).draggable('disable');
			$(sourceDiv).droppable('disable');
			$(destiLetter).css({'color':'green'});
		}
	}
	if(NumberOrdering.answerCounter==12)
	{
		console.log('Game Over');
		document.getElementById('playSound').src=Utils.Path+'SOUND/welldone.mp3';
		document.getElementById('playSound').play();
		$('#FinalOk').show();
		$('#Next').addClass('blink_me');
	}
};

NumberOrdering.allowDrop=function(event)
{
	event.preventDefault();
}


NumberOrdering.addbackgroundColours=function()
{
	$('.trans').removeClass('trans');
}