Crumbling.correctSequenceIs=[];
Crumbling.lengthOfsentence=0;
Crumbling.widthOfword=[];
Crumbling.counter=0;
Crumbling.arrayOfTopPositions=[];
Crumbling.arrayOfLeftPositions=[];
Crumbling.temparray=[];
Crumbling.playingSoundFlag=false;

Crumbling.goHome=function()
{
	$('.splitteredSentence').remove();
	$('#correctsentence').empty();
	$('#game').hide();
	Crumbling.correctSequenceIs=[];
	Crumbling.lengthOfsentence=0;
	Crumbling.widthOfword=[];
	Crumbling.counter=0;
	Crumbling.arrayOfTopPositions=[];
	Crumbling.arrayOfLeftPositions=[];
	Crumbling.temparray=[];
	Crumbling.init();
};

Crumbling.init=function()
{
	$('#gamePage,#playGame').hide();
	$('#coverPage').show();
	$('#BackImg').prop('src','images/'+Crumbling.hardCodedData['backImg']+'1.jpg');
	setTimeout(function(){
		$('#background').addClass('magictime vanishOut');
		setTimeout(function(){
			$('#background').removeClass('magictime vanishOut');
			$('#BackImg').prop('src','images/'+Crumbling.hardCodedData['backImg']+'2.jpg');
			$('#background').addClass('magictime vanishIn');
			setTimeout(function(){
				$('#background').removeClass('magictime vanishIn');
				$('#playGame').show();
				$('#playGame').text(Crumbling.hardCodedData['play']);
			},1000);
		},1000);
	},500);
}

Crumbling.addSentence=function()
{
	var element,time, left, top,sentence,myDuration=0;
		Crumbling.widthOfword=[];
		Crumbling.copyOfJsondata=[];
		$('#gamePage').show();
		$('#game,#sentence').show();
		$('#coverPage').hide();
		
		$('#myModal,#lastmsg').hide();
		Crumbling.arrayOfSplitedSentence=[];
		Crumbling.counter=Math.floor(Math.random()*Crumbling.jsondata.length);
		sentence=Crumbling.jsondata[Crumbling.counter]['Sentence'];
		Crumbling.copyOfJsondata=Crumbling.jsondata.slice();
		Crumbling.replaceBythischar();
		Crumbling.arrayOfSplitedSentence=sentence.split(' ').slice();
		Crumbling.correctSequenceIs=Crumbling.arrayOfSplitedSentence.slice();
		searchStringInArray ('।', Crumbling.arrayOfSplitedSentence,"?");
		Crumbling.removeFullStops();
		console.log(Crumbling.arrayOfSplitedSentence);
		Crumbling.arrayOfwordsInSentence=Crumbling.arrayOfSplitedSentence.slice();
		Crumbling.temparray=[];
		Crumbling.lengthOfsentence=Crumbling.arrayOfSplitedSentence.length;
		if(Crumbling.lengthOfsentence<=5)
		{
			$('#divContainingSentence').removeAttr('class');
			$('#divContainingSentence').addClass('col-lg-6 col-md-6 col-xs-6 col-sm-6 col-lg-offset-2 col-md-offset-2 col-xs-offst-2 col-sm-offset-2');
		}
		else if(Crumbling.lengthOfsentence>=12){
			$('#divContainingSentence').removeAttr('class');
			$('#divContainingSentence').addClass('col-lg-10 col-md-10 col-xs-10 col-sm-10 ');
		}
		document.getElementById('sentence').innerHTML=sentence;
		//time=document.getElementById('playSound');
		//time.src="sound/"+Crumbling.jsondata[Crumbling.counter]['Audio'];
		//document.getElementById('playSound').play();
		//var myAudio='CrumblingSentences/sound/'+Crumbling.jsondata[Crumbling.counter]['Audio'];
		//Android.audioPlayer('CrumblingSentences/sound/'+Crumbling.jsondata[Crumbling.counter]['Audio']);
		$('#volume').hide();
		$('#home').hide();
    	//var myDuration=Android.audioDuration(myAudio);
		setTimeout(function()
		{
			Crumbling.dropWords(time);
		},myDuration+1000);
}


Crumbling.removeFullStops=function()
{
	var i=0,res;
	for(i;i<Crumbling.temparray.length;i++)
	{
		var index=Crumbling.temparray[i];
		var word=Crumbling.arrayOfSplitedSentence[index-1];
		res=word.substring(0,word.length-1);
		Crumbling.arrayOfSplitedSentence[index-1]=res;
	}
	
};


Crumbling.dropWords=function(time)
{
	var i=0,randomTime;
	$('#headline').hide();
		$('#sentence').empty();
		for(var i=0;i<Crumbling.arrayOfSplitedSentence.length;i++)
		{
			element=document.createElement('span');
			element.id="span"+i;
			element.className="sentence";
			document.getElementById('sentence').appendChild(element);
			left = $("#span"+i).offset().left;
			top=$("#span"+i).offset().top;
			$("#span"+i).css({"left" : left,"top":top});
			element.innerHTML=" "+Crumbling.arrayOfSplitedSentence[i];
			Crumbling.widthOfword.push(element.innerHTML.length);
		}

		$(".sentence").css('position','fixed');
		// shuffle words 
		Crumbling.shuffleWords(Crumbling.arrayOfSplitedSentence);
		setTimeout(function()
		{
			while(i<Crumbling.lengthOfsentence)
			{	
				randomTime=Math.random()*250;
				$("#span"+i).animate({"top": "+=300px"},randomTime);
				i++;
			}
			document.getElementById('playSound').src="sound/glassBreak.wav";
			document.getElementById('playSound').play();
			//Android.audioPlayer("CrumblingSentences/sound/glassBreak.wav");
			setTimeout(function()
			{
				Crumbling.addDragAndDrop(Crumbling.arrayOfSplitedSentence);
			},350);
		},300);
};

Crumbling.playSoundAgain=function()
{	var time; 
	//time=document.getElementById('playSentence');
	//time.src='sound/'+Crumbling.jsondata[Crumbling.counter]['Audio'];
	//document.getElementById('playSentence').play();
	if(Crumbling.playingSoundFlag==false)
	{
		Crumbling.playingSoundFlag=true;
		$('#volume').prop('src','images/stop.png');
		document.getElementById('playSentence').play();
		//Android.audioPlayer('CrumblingSentences/sound/'+Crumbling.jsondata[Crumbling.counter]['Audio']);
	}
	else if(Crumbling.playingSoundFlag==true)
	{
		Crumbling.playingSoundFlag=false;
		$('#volume').prop('src','images/volumeup.png');
		//Android.stopAudioPlayer();
		document.getElementById('playSentence').pause();
	}
	//Android.audioPlayer('CrumblingSentences/sound/'+Crumbling.jsondata[Crumbling.counter]['Audio']);
};

Crumbling.shuffleWords=function(array)
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

Crumbling.randomRotateEffect=function(element)
{
	var randomDeg=Math.floor(Math.random()*180);
	$(element).css({"transform":'rotate(' + randomDeg + 'deg)'});
}


Crumbling.addDragAndDrop=function(array)
{
	var element,width,value;
	$('#sentence').empty();
	$('#sentence').hide();
	for(var i=0;i<array.length;i++)
	{
		element=document.createElement('span');
		element.id="span"+i;
		$(element).draggable(
		{
			start: function()
			{
				$(this).data("origPosition",$(this).position());
				$(this).css({'transform':'rotate(0deg)'});
				Crumbling.playingSoundFlag=false;
				$('#volume').prop('src','images/volumeup.png');
				Crumbling.playsoundForWord(this.id);
			},
			cursor: 'move',
			snap:'#letter'+i
			
		});

		Crumbling.randomRotateEffect(element);
		element.className="splitteredSentence";
		element.innerHTML=" "+array[i];
		if(Crumbling.lengthOfsentence<=5)
		{
			$('#outerDiv').removeAttr('class');
			value=2.2;
			$('#outerDiv').addClass('col-lg-6 col-md-6 col-xs-6 col-sm-6 col-lg-offset-3 col-md-offset-3 col-xs-offst-3 col-sm-offset-3');
		}
		else{
			$('#outerDiv').removeAttr('class');
			value=1.5;
			$('#outerDiv').addClass('col-lg-10 col-md-10 col-xs-10 col-sm-10 col-lg-offset-1 col-md-offset-1 col-xs-offst-1 col-sm-offset-1');
		}

		//$('#outerDiv').append(element);
		$('body').append(element);
		var xy=Crumbling.getPositions();
		$(element).css({"position": "absolute","top": xy[1] + "%", "left": xy[0] + "%"});
	}

	searchStringInArray ('।', Crumbling.correctSequenceIs, '?');
	Crumbling.addSpaceForSentences(value);
}

function searchStringInArray (str, strArray, str2) 
{
    for (var j=0; j<strArray.length; j++) 
    {
        if ( (strArray[j].indexOf(str)!==-1 ) || (strArray[j].indexOf(str2)!==-1) ) 
        	Crumbling.temparray.push(j+1);
    }
    return -1;
}


Crumbling.addSpaceForSentences=function(value)
{
	var i=0,j=0,k=0,letter;
	for(i;i<Crumbling.temparray.length;i++)
	{
		var div=document.createElement('div');
		div.id="sentences"+i;
		div.className="col-lg-12 col-xs-12 col-sm-12 col-md-12";
		document.getElementById('correctsentence').appendChild(div);
		if(i!==0)
		{
			tempCounter=Crumbling.temparray[i]-Crumbling.temparray[i-1];
		}
		else
			tempCounter=Crumbling.temparray[i];

		for(j=0;j<tempCounter;j++)
		{
			if(k<Crumbling.correctSequenceIs.length)
			{
				letter=document.createElement('span');
				letter.id="letter"+k;
				letter.className="letters"+i;
				$(letter).droppable({
					drop : Crumbling.Handledrop,
					dragover:Crumbling.allowDrop
				});
				$(letter).data('answer',Crumbling.arrayOfwordsInSentence[k]);
				$(letter).text(Crumbling.correctSequenceIs[k]);
				document.getElementById('sentences'+i).appendChild(letter);
				k++;
			}

		}
			letter=document.createElement('span');
			letter.style="font-size:55px;margin-top:1%;margin-left:1%;height:35%;";
			$(letter).text('।');
			document.getElementById('sentences'+i).appendChild(letter);
		
	}
	Crumbling.addSomeRandomWords();
	$('#volume').show();
	$('#home').show();
	/*setTimeout(function(){
		$('#volume').show();
	},500);*/
}


Crumbling.addSomeRandomWords=function()
{
	var k;
	var selectedWords,noOfrandomWords,array2=[];
	noOfrandomWords=Math.round(Crumbling.correctSequenceIs.length/4)-1;
	array2=chooseRandomWords(Crumbling.correctSequenceIs,noOfrandomWords,array2);
	for(var i=0;i<array2.length;i++)
	{
		$('#span'+array2[i]).css({'transform':'rotate(0deg)'});
		for(var j=0;j<Crumbling.correctSequenceIs.length;j++)
		{
			if($('#letter'+j).data('answer').trim()==$('#span'+array2[i]).text().trim())
			{
				Crumbling.lengthOfsentence--;
				offset=$('#letter'+j).offset();
				top=offset.top;
				left=offset.left;
				$('#span'+array2[i]).animate(offset,"fast");
				$('#span'+array2[i]).draggable('disable');
				break;
			}
		}
	}
	$('.letters0').css({'margin-top':'3%'});
}

function chooseRandomWords(array,length,array2)
{
	var i=0,randomNumber;
	while(i<length)
	{
		randomNumber=Math.floor(Math.random()*array.length);
		if($.inArray(randomNumber,array2) === -1)
			array2.push(randomNumber);
		i++;
	}
	return array2;
}

Crumbling.allowDrop=function(event)
{
	event.preventDefault();
}

Crumbling.getPositions=function()
{
	var y=Math.floor((Math.random()*35)+40);
	//y = y + 100;
	var x=Math.floor(Math.random()*75);
	while($.inArray(((y)||(y+1)||(y+2)||(y-1)||(y-2)||(y-3)),Crumbling.arrayOfTopPositions)>=0)
	{
		y=Math.floor((Math.random()*35)+40);
		
	}
	while(($.inArray(((x)||(x+1)||(x+2)||(x-1)||(x-2)||(x-3)),Crumbling.arrayOfLeftPositions)>=0))
	{
		x=Math.floor(Math.random()*75);
	}

	Crumbling.arrayOfTopPositions.push(y);
	Crumbling.arrayOfLeftPositions.push(x);
	
	return [x,y];
}


Crumbling.Handledrop=function(event,ui)
{
	$(droppedSpan).text('');
	var draggedLetter=ui.draggable;
	var droppedSpan= $(this);
	if($(draggedLetter).text().trim()==$(droppedSpan).data('answer'))
	{
		Crumbling.lengthOfsentence--;
		$(draggedLetter).position({
		  my: "center center",
		  at: "center center",
		  of:this
		});
		
		$(draggedLetter).draggable('disable');
	}
	else{
		//console.log(ui.draggable.data("origPosition"));
		//$(draggedLetter).css({'position':'relative'});
		ui.draggable.animate(ui.draggable.data("origPosition"),"slow");
		document.getElementById('playSound').src="sound/wrong.mp3";
		document.getElementById('playSound').play();
		//Android.audioPlayer('CrumblingSentences/sound/wrong.mp3');

		/*ui.draggable.animate({
				       top: "0px",
				       left: "0px"
				    });	*/
	}
	if(Crumbling.lengthOfsentence==0)
	{
		setTimeout(function(){
			//document.getElementById('playSound').src=Crumbling.jsondata[Crumbling.counter]['Audio'];
			//document.getElementById('playSound').play();
			$('#myModal').show();
			$('#myModal').addClass('magictime foolishIn');
			document.getElementById('playSound').src="sound/correct.mp3";
			document.getElementById('playSound').play();
			//Android.audioPlayer('CrumblingSentences/sound/correct.mp3');
			//$('#showMessage').text('Well Done !!!');
		},1000);
	}
}	


Crumbling.playsoundForWord=function(draggable)
{
	var word=$("#"+draggable).text().trim();
	var j=0;
	for(var i=0;i<Crumbling.copyOfJsondata[Crumbling.counter]['Words'].length;i++)
	{
		if(Crumbling.copyOfJsondata[Crumbling.counter]['Words'][i]['name'].trim()==word)
		{
			j=i; 
			break;
		}
	}

    var time = 	Crumbling.copyOfJsondata[Crumbling.counter]['Words'][j]['Duration'] * 1000;
        var currentTime=Crumbling.copyOfJsondata[Crumbling.counter]['Words'][j]['From'];
        var seconds = currentTime * 1000;
        var tempAudio='CrumblingSentences/sound/'+Crumbling.copyOfJsondata[Crumbling.counter]['Audio'];
        console.log("Time: "+seconds);
        console.log("Audio: "+tempAudio);
        console.log("currentTime: "+currentTime);

       // Android.partAudioPlayer(tempAudio, seconds);
        setTimeout(function(){
            //Android.stopAudioPlayer();
        }, time);
}

Crumbling.next=function()
{
	//Crumbling.jsondata.splice(Crumbling.counter,1);
	$('#myModal').hide();
	Crumbling.jsondata.splice(Crumbling.counter,1);
	Crumbling.copyOfJsondata.splice(Crumbling.counter,1);
	
	Crumbling.temparray=[];
	$('.splitteredSentence').remove();
	$('#correctsentence').empty();
	$('#sentence').show();
	Crumbling.arrayOfTopPositions=[];
	Crumbling.arrayOfLeftPositions=[];
	document.getElementById('sentence').innerHTML=sentence;
	Crumbling.counter=Math.floor(Math.random()*Crumbling.jsondata.length);
	if(Crumbling.jsondata.length>Crumbling.counter)
	{
		Crumbling.addSentence();
	}
	else
	{
		//document.getElementById('playSound').pause();
		//Android.stopAudioPlayer();
		$('#lastmsg').show();
		$('#game').hide();
	}
	
}

Crumbling.replaceBythischar=function()
{
	for(var i=0;i<Crumbling.copyOfJsondata[Crumbling.counter]['Words'].length;i++)
	{
		var tempString=Crumbling.copyOfJsondata[Crumbling.counter]['Words'][i]['name'];
		var p="।";
//		if( tempString.includes(p) )
	//	{
			Crumbling.copyOfJsondata[Crumbling.counter]['Words'][i]['name']=Crumbling.copyOfJsondata[Crumbling.counter]['Words'][i]['name'].replace("।", " ");
			Crumbling.copyOfJsondata[Crumbling.counter]['Words'][i]['name']=Crumbling.copyOfJsondata[Crumbling.counter]['Words'][i]['name'].replace("?", " ");
		//}
		
	}
	
}