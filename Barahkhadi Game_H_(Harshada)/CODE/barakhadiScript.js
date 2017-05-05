var Barakhadi={};
var Utils={};
Utils.Path='';

$(document).ready(function(){
	//Android.getPath('newBarakhadiGame');
	setTimeout(function(){
		Barakhadi.setAllImages();
		Barakhadi.init();
	},200);
});


Barakhadi.setAllImages=function(){

	$('#playGame').prop('src',Utils.Path+'IMAGES/Barakhadi_play.png');
	$('#scrollLeft').prop('src',Utils.Path+'IMAGES/previous.png');
	$('#scrollRight').prop('src',Utils.Path+'IMAGES/next.png');
	$('#Hammer').prop('src',Utils.Path+'IMAGES/emoticons_02.png');
	$('#FinalOk').prop('src',Utils.Path+'IMAGES/emoticons_01.png');
	$('#Next').prop('src',Utils.Path+'IMAGES/Barakhadi_Next.png');
};


Barakhadi.init=function()
{
	$('#coverPage').show();
	$('#level1').hide();
	Barakhadi.scrollleftRight=100,Barakhadi.counter=0,Barakhadi.answerCounter=0;
	Barakhadi.arrayOfTopPositions=[],Barakhadi.arrayOfLeftPositions=[];
	$('#background').css({'background-image':'url('+Utils.Path+'IMAGES/Cover.jpg)'});
}

Barakhadi.getGameData=function()
{
	Barakhadi.words=[];
	$('#level1').show();
	$('#coverPage,#FinalOk').hide();
		$('#background').css({'background-image':'url('+Utils.Path+'IMAGES/BG.jpg)'});
	Barakhadi.words=Barakhadi.wordsData.slice();
	Barakhadi.addLettersToScrollBar();
}

Barakhadi.scroll=function(evt)
{
	if(evt=='scrollLeft')
		Barakhadi.scrollleftRight=Barakhadi.scrollleftRight-100;
	else if(evt=='scrollRight')
		Barakhadi.scrollleftRight=Barakhadi.scrollleftRight+100;
	$('#scrollBar').scrollLeft(Barakhadi.scrollleftRight);
}

Barakhadi.addLettersToScrollBar=function()
{
	var div,spanElement;
	$('#Next,#Hammer,#containment-wrapper').hide();
	for(var i=0;i<Barakhadi.words.length;i++)
	{
		div=$('<div class="alignInLine"></div>');
		spanElement=$('<span>'+Barakhadi.words[i]['suffix']+'</span>');
		$(div).append(spanElement);
		$(spanElement).on('click',Barakhadi.showCompleteBarakhadi);
		$('#scrollBar').append(div);
	}
}

Barakhadi.searchWord=function(evt)
{
	for(var i=0;i<Barakhadi.words.length;i++)
	{
		if(Barakhadi.words[i]['suffix']==$(evt).text())
		{
			break;
		}
	}
	Barakhadi.ltrForbarakhadi=Barakhadi.words[i];
	console.log(Barakhadi.ltrForbarakhadi);
}

Barakhadi.showCompleteBarakhadi=function()
{
	Barakhadi.ltrForbarakhadi=0;
	$('#scrollbarDiv').addClass('magictime puffOut');
	Barakhadi.searchWord(this);
	Barakhadi.addSpacesForBarakhadi();
	$('#barakhadiDiv').addClass('magictime puffIn');
	$('#Next,#Hammer').show();
	Barakhadi.playSoundAndHighlight();
}

Barakhadi.addSpacesForBarakhadi=function()
{
	var div,spanElement,outerDiv,k=0;
	$('#containment-wrapper').show();
	$('#scrollbarDiv').hide();
	for(var i=0;i<2;i++)
	{
		outerDiv=$('<div style="margin-top:2%;margin-bottom:5%" class="col-lg-12 col-md-12 col-xs-12 col-sm-12"></div>');
		for(var j=0;j<6;j++)
		{
			div=$('<div class="align6InLine col-lg-2 col-md-2 col-xs-2 col-sm-2" ></div>');
			if(k<Barakhadi.ltrForbarakhadi['list'].length)
			{
				spanElement=$('<span id="space'+k+'" class="trans text-center spaces deviceWiseSize" >'+Barakhadi.ltrForbarakhadi['list'][k]['word']+'</span>');
				$(spanElement).data('sound',Utils.Path+''+Barakhadi.ltrForbarakhadi['list'][k]['sound']);
				$(spanElement).on('click',function(){
					Barakhadi.playSoundForEachWord($(this));
				});

				$(div).append(spanElement);
				k++;
			}
			$(outerDiv).append(div);
		}
		$('#barakhadiDiv').append(outerDiv);
	}
}

Barakhadi.playSoundForEachWord=function(element)
{
	document.getElementById('playSound').src=Utils.Path+'SOUND/'+$(element).data('sound');
	document.getElementById('playSound').play();
}

Barakhadi.playSoundAndHighlight=function()
{
	var time;
	$('#scrollbarDiv').hide();
	$('#barakhadiDiv').removeClass('magictime puffIn');
	document.getElementById('playSound').src=Utils.Path+'SOUND/'+Barakhadi.ltrForbarakhadi['list'][Barakhadi.counter]['sound'];
	document.getElementById('playSound').play();
	document.getElementById('space'+Barakhadi.counter).style.color="green";
	Barakhadi.timeout=setTimeout(function()
	{
		document.getElementById('space'+Barakhadi.counter).style.color="black";
		Barakhadi.counter++;
		document.getElementById('playSound').pause();
		if(Barakhadi.counter<Barakhadi.ltrForbarakhadi['list'].length)
		{
			Barakhadi.playSoundAndHighlight();
		}
		else
		{
			$('#Hammer').hide();
			document.getElementById('playSound').src=Utils.Path+'SOUND/glassBreak.wav';
			document.getElementById('playSound').play();
			
			Barakhadi.dropRandomWords();
		}
	},1350);
}

Barakhadi.addDragAndDrop=function(){
	var spanElement,xy;
	Barakhadi.answerCounter=0;
	for(var i=0;i<Barakhadi.ltrForbarakhadi['list'].length;i++)
	{
		//$('#space'+i).css({'color':'transparent','border':'3px solid black'});
		spanElement=$('<span id="letter'+i+'" class="letters" style="font-size:60px;color:red;">'+Barakhadi.ltrForbarakhadi['list'][i]['word']+'</span>');
		$(spanElement).data('sound',Utils.Path+''+Barakhadi.ltrForbarakhadi['list'][i]['sound']);
		$(spanElement).draggable({
			cursor: 'move',
			containment: "#containment-wrapper",
			start: function()
			{
				$(this).data("origPosition",$(this).position());
				Barakhadi.playSoundForEachWord($(this));
			}
		});
		
		$('body').append(spanElement);
		xy=Barakhadi.getPositions();
		$(spanElement).css({"position": "absolute","top": xy[1] + "%", "left": xy[0] + "%"});
		$('#space'+i).droppable({
			drop : Barakhadi.Handledrop,
			dragover:Barakhadi.allowDrop
		});
	}
	Barakhadi.addbackgroundColours();
}



Barakhadi.dropRandomWords=function()
{
	var noOfWords,randomPlace,arrOfRandomPlaces=[],arrayOfInfo=[],spanElement,xy;
	Barakhadi.answerCounter=0;
	noOfWords=Math.floor(Barakhadi.ltrForbarakhadi['list'].length/2);
	$('.spaces').css({'border':'3px solid black','color':'green'});
	Barakhadi.answerCounter=Barakhadi.ltrForbarakhadi['list'].length-noOfWords;
	for(var i=0;i<noOfWords;i++)
	{
		randomPlace=Math.floor(Math.random()*Barakhadi.ltrForbarakhadi['list'].length);
		while($.inArray(randomPlace,arrOfRandomPlaces)!=-1)
		{
			randomPlace=Math.floor(Math.random()*Barakhadi.ltrForbarakhadi['list'].length);
		}
		arrOfRandomPlaces.push(randomPlace);
		arrayOfInfo.push(Barakhadi.ltrForbarakhadi['list'][randomPlace]);
	}
	for(var i=0;i<noOfWords;i++)
	{
		$('#space'+arrOfRandomPlaces[i]).css({'color':'transparent'});
		spanElement=$('<span id="letter'+arrOfRandomPlaces[i]+'" class="letters text-center deviceWiseLetters">'+arrayOfInfo[i]['word']+'</span>');
		$(spanElement).data('sound',Utils.Path+''+arrayOfInfo[i]['sound']);
		$(spanElement).draggable({
			cursor: 'move',
			containment: "#containment-wrapper",
			start: function()
			{
				$(this).data("origPosition",$(this).position());
				Barakhadi.playSoundForEachWord($(this));
			}
		});
		$('body').append(spanElement);
		xy=Barakhadi.getPositions();
		$(spanElement).css({"position": "absolute","top": xy[1] + "%", "left": xy[0] + "%"});
		$('#space'+arrOfRandomPlaces[i]).droppable({
			drop : Barakhadi.Handledrop,
			dragover:Barakhadi.allowDrop
		});
	}
	Barakhadi.addbackgroundColours();
}

Barakhadi.clearAllAndShowNext=function()
{
	clearTimeout(Barakhadi.timeout);
	$('#FinalOk').hide();
	$('#scrollbarDiv').removeClass('magictime puffOut');
	$('#scrollbarDiv').addClass('magictime puffIn');
	$('#scrollbarDiv').show();
	Barakhadi.counter=0;
	Barakhadi.arrayOfTopPositions=[],Barakhadi.arrayOfLeftPositions=[];
	$('.letters').remove();
	$('#barakhadiDiv').empty();
	$('#Next,#Hammer').hide();
}

Barakhadi.Handledrop=function(event,ui)
{
	console.log('hi');
	var draggedLetter=ui.draggable;
	var droppedSpan= $(this);
	if($(draggedLetter).text().trim()==$(droppedSpan).text().trim())
	{
		Barakhadi.answerCounter++;
		$(draggedLetter).draggable('disable');
		$(draggedLetter).css({'color':'green'});
		$(draggedLetter).position({
		  my: "center center",
		  at: "center center",
		  of:this
		});
		if(Barakhadi.answerCounter==Barakhadi.ltrForbarakhadi['list'].length)
		{
			document.getElementById('playSound').src=Utils.Path+'SOUND/welldone.mp3';
			document.getElementById('playSound').play();
			$('#FinalOk').show();
			$('#barakhadiDiv').removeClass('magictime puffIn');
			setTimeout(function(){
				Barakhadi.clearAllAndShowNext();
			},2000);
		}
	}
	else{
		ui.draggable.animate(ui.draggable.data("origPosition"),"slow");
		document.getElementById('playSound').src=Utils.Path+'SOUND/BuzzerWrong.mp3';
		document.getElementById('playSound').play();
	}
}

Barakhadi.getPositions=function()
{
	var y=Math.floor((Math.random()*35)+40);
	var x=Math.floor(Math.random()*75);
	while($.inArray(((y)||(y+1)||(y+2)||(y-1)||(y-2)||(y-3)),Barakhadi.arrayOfTopPositions)>=0)
	{
		y=Math.floor((Math.random()*35)+40);
		
	}
	while(($.inArray(((x)||(x+1)||(x+2)||(x-1)||(x-2)||(x-3)),Barakhadi.arrayOfLeftPositions)>=0))
	{
		x=Math.floor(Math.random()*75);
	}

	Barakhadi.arrayOfTopPositions.push(y);
	Barakhadi.arrayOfLeftPositions.push(x);
	
	return [x,y];
}

Barakhadi.allowDrop=function(event)
{
	event.preventDefault();
}

Barakhadi.skipReading=function()
{
	clearTimeout(Barakhadi.timeout);
	$('#Hammer').hide();
	document.getElementById('playSound').src=Utils.Path+'SOUND/glassBreak.wav';
	document.getElementById('playSound').play();
	//Barakhadi.addDragAndDrop();
	Barakhadi.dropRandomWords();
	//Barakhadi.addSomeRandomWords();
}

Barakhadi.addbackgroundColours=function()
{
	$('.trans').removeClass('trans');
}