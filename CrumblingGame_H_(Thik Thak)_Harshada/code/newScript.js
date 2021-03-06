var Utils={};
Utils.Path='';
$(document).ready(function(){
	//Android.getPath('newCrumblingGame');

	setTimeout(function(){
		Crumbling.setAllImages();
		Crumbling.init();
	},200);
});

Crumbling.setAllImages=function(){

	$('#playGame').prop('src',Utils.Path+'images/Theek-Thak_Play.png');
	$('#volume').prop('src',Utils.Path+'images/Theek-Thak_Sound-Play.png');
	$('#stop').prop('src',Utils.Path+'images/Theek-Thak_01.png');
	$('#home').prop('src',Utils.Path+'images/Theek-Thak_Home.png');
	$('#breakWords').prop('src',Utils.Path+'images/Theek-Thak_Break.png');
	$('#next').prop('src',Utils.Path+'images/Theek-Thak_Next.png');
	$('#joker').prop('src',Utils.Path+'images/joker.png');
};

Crumbling.init=function()
{
	
	$('#gamePage,#playGame').hide();
	$('#coverPage').show();
	$('#background').css({"background-image":'url('+Utils.Path+'images/CoverHindi_02.jpg)'});
	$('#playGame').show();
	$('#playGame').text(Crumbling.hardCodedData['play']);
	
};

Crumbling.replaceBythischar=function()
{
	for(var i=0;i<Crumbling.copyOfJsondata[Crumbling.counter]['Words'].length;i++)
	{
		var tempString=Crumbling.copyOfJsondata[Crumbling.counter]['Words'][i]['name'];
		var p="।";
		Crumbling.copyOfJsondata[Crumbling.counter]['Words'][i]['name']=Crumbling.copyOfJsondata[Crumbling.counter]['Words'][i]['name'].replace("।", " ");
		Crumbling.copyOfJsondata[Crumbling.counter]['Words'][i]['name']=Crumbling.copyOfJsondata[Crumbling.counter]['Words'][i]['name'].replace("?", " ");
	}
	
};

function searchStringInArray (str, strArray, str2) 
{
    for (var j=0; j<strArray.length; j++) 
    {
        if ( (strArray[j].indexOf(str)!==-1 ) || (strArray[j].indexOf(str2)!==-1) ) 
        	Crumbling.temparray.push(j+1);
    }
    return -1;
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

Crumbling.addSentence=function()
{
	var sentence,myDuration=0;
	Crumbling.flag=false;
	Crumbling.playingSoundFlag=false,Crumbling.durationOfAudio=0,durationOfAudio2=0,Crumbling.currentTime=0;
	Crumbling.arrayOfSplitedSentence=[],Crumbling.copyOfJsondata=[],Crumbling.correctSequenceIs=[];
	Crumbling.temparray=[],Crumbling.arrayOfTopPositions=[],Crumbling.arrayOfLeftPositions=[],Crumbling.lengthOfsentence=0;
	$('#gamePage,#game,#sentence').show();
	$('#next').removeClass('blink_me');
	$('#coverPage,#myModal,#lastmsg,#volume,#home,#stop,#joker').hide();
	$('#background').css({"background-image":'url('+Utils.Path+'images/BG.jpg)'});
	Crumbling.counter=Math.floor(Math.random()*Crumbling.jsondata.length);
	sentence=Crumbling.jsondata[Crumbling.counter]['Sentence'];
	$('#sentence').text(sentence);
	Crumbling.copyOfJsondata=Crumbling.jsondata.slice();
	Crumbling.replaceBythischar();// replace | or ? by space.
	Crumbling.arrayOfSplitedSentence=sentence.split(' ').slice();
	searchStringInArray ('।', Crumbling.arrayOfSplitedSentence,"?");//search | & ? in array and save index
	Crumbling.removeFullStops();// remove ? & | from arrayOfSplitedSentence.
	Crumbling.lengthOfsentence=Crumbling.arrayOfSplitedSentence.length;//get length of sentence
	$('#divContainingSentence').removeAttr('class');
	if(Crumbling.lengthOfsentence<=5)
		$('#divContainingSentence').addClass('col-lg-6 col-md-6 col-xs-6 col-sm-6 col-lg-offset-2 col-md-offset-2 col-xs-offst-2 col-sm-offset-2');
	else if(Crumbling.lengthOfsentence>=12)
		$('#divContainingSentence').addClass('col-lg-10 col-md-10 col-xs-10 col-sm-10 ');
	//For Web 
	document.getElementById('playSentence').src=Utils.Path+'sound/'+Crumbling.jsondata[Crumbling.counter]['Audio'];
	document.getElementById('playSound').src=Utils.Path+"sound/"+Crumbling.jsondata[Crumbling.counter]['Audio'];
	document.getElementById('playSound').play();
	
	setTimeout(function(){
		Crumbling.durationOfAudio=document.getElementById('playSound').duration;
		Crumbling.durationOfAudio2=document.getElementById('playSound').duration;
		Crumbling.mainTimeOut=setTimeout(function()
		{
			if(Crumbling.flag==false)
			{
				document.getElementById('playSound').pause();
				Crumbling.addSpaceForSentences();
			}
		},Crumbling.durationOfAudio*1000);
	},300);
	
	 
	//For Android

	//var myAudio='CrumblingSentences/sound/'+Crumbling.jsondata[Crumbling.counter]['Audio'];
	//Android.audioPlayer('CrumblingSentences/sound/'+Crumbling.jsondata[Crumbling.counter]['Audio']);
    //var myDuration=Android.audioDuration(myAudio);
	/*setTimeout(function()
	{
		//Crumbling.dropWords();
		Crumbling.addSpaceForSentences();
	},myDuration+1000);*/
};


Crumbling.callhathodi=function()
{
	Crumbling.flag=true;
	Crumbling.addSpaceForSentences();
	
}

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


Crumbling.getPositions=function()
{
	var y=Math.floor((Math.random()*35)+40);
	
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

Crumbling.addSpaceForSentences=function()
{
	var i=0,j=0,k=0,letter,div,tempCounter;
	clearTimeout(Crumbling.mainTimeOut);
	$('#headline,#breakWords').hide();
	$('#sentence').empty();
	document.getElementById('playSound').pause();
	setTimeout(function(){
		document.getElementById('playSound').src=Utils.Path+"sound/glassBreak.wav";
		document.getElementById('playSound').play();
	},300);
	
	//Android.audioPlayer("CrumblingSentences/sound/glassBreak.wav");
	for(i;i<Crumbling.temparray.length;i++)
	{
		div=$('<div id="sentences'+i+'" class="col-lg-12 col-xs-12 col-sm-12 col-md-12" ></div>');
		$('#correctsentence').append(div);
		if(i!==0)
			tempCounter=Crumbling.temparray[i]-Crumbling.temparray[i-1];
		else
			tempCounter=Crumbling.temparray[i];

		for(j=0;j<tempCounter;j++)
		{
			if(k<Crumbling.arrayOfSplitedSentence.length)
			{
				letter=$('<span id="letter'+k+'" class="letters'+i+'"></span>');
				$(letter).on('click',function()
				{
					Crumbling.playsoundForWord(this.id);
				});
				$(letter).data('answer',Crumbling.arrayOfSplitedSentence[k]);
				$(letter).text(Crumbling.arrayOfSplitedSentence[k]);
				$(letter).droppable({
					drop : Crumbling.Handledrop,
					dragover:Crumbling.allowDrop
				});
				$('#sentences'+i).append(letter);
				k++;
			}
		}
		letter=$('<span style="font-size:55px;margin-top:1%;margin-left:1%;height:35%;color:red">|</span>');
		$('#sentences'+i).append(letter);
	}
	//chooseRandomWords(array,length,array2);
	chooseRandomWords();
	//Crumbling.addSomeRandomWords();
	$('#volume,#home,#stop').show();
}

function chooseRandomWords()
{
	var noOfWords=0,randomPlace=0,arrOfRandomPlaces=[],arrayOfInfo=[];
	for(var i=0;i<Crumbling.temparray.length;i++)
	{
		if(i!==0)
			noOfWords=Math.floor((Crumbling.temparray[i]-Crumbling.temparray[i-1])/2);
		else
			noOfWords=Math.floor(Crumbling.temparray[i]/2);
		for(var j=0;j<noOfWords;j++)
		{
			if(i!==0)
				randomPlace=Math.floor((Math.random()*(Crumbling.temparray[i]-Crumbling.temparray[i-1]))+Crumbling.temparray[i-1]);
			else
				randomPlace=Math.floor(Math.random()*Crumbling.temparray[i]);

			while($.inArray(randomPlace,arrOfRandomPlaces)!=-1)
			{
				randomPlace=Math.floor(Math.random()*Crumbling.temparray[i]);
			}
			arrOfRandomPlaces.push(randomPlace);
			arrayOfInfo.push(Crumbling.arrayOfSplitedSentence[randomPlace]);
		}
	}
	//console.log(arrOfRandomPlaces);
	Crumbling.lengthOfsentence=arrOfRandomPlaces.length;
	for(var i=0;i<arrOfRandomPlaces.length;i++)
	{
		$('#letter'+arrOfRandomPlaces[i]).css({'color':'transparent'});
		spanElement=$('<span id="span'+i+'" class="splitteredSentence">'+arrayOfInfo[i]+'</span>');
		$(spanElement).draggable({
			cursor: 'move',
			snap:'#letter'+i,
			containment: "#containment-wrapper",
			start: function()
			{
				$(this).data("origPosition",$(this).position());
				$(this).css({'transform':'rotate(0deg)'});
				Crumbling.playsoundForWord(this.id);
			}
		});
		Crumbling.randomRotateEffect(spanElement);
		$('body').append(spanElement);
		xy=Crumbling.getPositions();
		$(spanElement).css({"position": "absolute","top": xy[1] + "%", "left": xy[0] + "%"});
	}
}

Crumbling.getPositions=function()
{
	var y=Math.floor((Math.random()*35)+40);
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

Crumbling.playsoundForWord=function(draggable)
{
	var word=$("#"+draggable).text().trim();
	var j=0;
	clearTimeout(Crumbling.timeout);
	//Crumbling.pauseSound();

	Crumbling.playingSoundFlag=false;
	$('#volume').prop('src',Utils.Path+'images/Theek-Thak_Sound-Play.png');
		//Android.stopAudioPlayer();
	Crumbling.currentTime=document.getElementById('playSentence').currentTime;
	document.getElementById('playSentence').pause();
	/*Crumbling.durationOfAudio2=Math.abs(Crumbling.durationOfAudio2-Crumbling.currentTime);*/

	/*clearTimeout(Crumbling.timeout);
	document.getElementById('playSentence').pause();
	Crumbling.currentTime=document.getElementById('playSentence').currentTime;
	Crumbling.playingSoundFlag=false;
	$('#volume').prop('src','images/Music_Play.png');*/
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
        //var tempAudio='CrumblingSentences/sound/'+Crumbling.copyOfJsondata[Crumbling.counter]['Audio'];
        //console.log("Time: "+seconds);
        //console.log("Audio: "+tempAudio);
        //console.log("currentTime: "+currentTime);

        document.getElementById('playSound').src=Utils.Path+'sound/'+Crumbling.copyOfJsondata[Crumbling.counter]['Audio'];
        document.getElementById('playSound').currentTime=Crumbling.copyOfJsondata[Crumbling.counter]['Words'][j]['From'];
				document.getElementById('playSound').play();
				setTimeout(function(){
					document.getElementById('playSound').pause();
				}, time);

       // Android.partAudioPlayer(tempAudio, seconds);
        setTimeout(function(){
            //Android.stopAudioPlayer();
        }, time);
}

Crumbling.allowDrop=function(event)
{
	event.preventDefault();
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
		$(draggedLetter).css({'color':'red','z-index':'5'});
	}
	else{
		//console.log(ui.draggable.data("origPosition"));
		//$(draggedLetter).css({'position':'relative'});
		ui.draggable.animate(ui.draggable.data("origPosition"),"slow");
		document.getElementById('playSentence').pause();
		document.getElementById('playSound').src=Utils.Path+"sound/wrong.mp3";
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
			//$('#myModal').show();
			$('#joker').show();
			$('#joker').addClass('magictime slideUp');
			$('#next').addClass('blink_me');
			$('#myModal').addClass('magictime foolishIn');
			document.getElementById('playSound').src=Utils.Path+"sound/correct.mp3";
			document.getElementById('playSound').play();
			//Android.audioPlayer('CrumblingSentences/sound/correct.mp3');
			//$('#showMessage').text('Well Done !!!');
		},1000);
	}
}
Crumbling.next=function()
{
	//Crumbling.jsondata.splice(Crumbling.counter,1);
	Crumbling.flag=false;
	clearTimeout(Crumbling.mainTimeOut);
	Crumbling.stopSound();
	document.getElementById('playSound').pause();
	$('#myModal,#joker').hide();
	Crumbling.jsondata.splice(Crumbling.counter,1);
	Crumbling.copyOfJsondata.splice(Crumbling.counter,1);
	Crumbling.temparray=[];
	$('.splitteredSentence').remove();
	$('#correctsentence').empty();
	$('#sentence,#breakWords').show();
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

Crumbling.playSoundAgain=function()
{	var time; 
	clearTimeout(Crumbling.timeout);
	//time=document.getElementById('playSentence');
	//time.src='sound/'+Crumbling.jsondata[Crumbling.counter]['Audio'];
	//document.getElementById('playSentence').play();
	if(Crumbling.playingSoundFlag==false)
	{
		console.log('total duration: '+Crumbling.durationOfAudio2);
		console.log('currentTime: '+Crumbling.currentTime);
		Crumbling.playingSoundFlag=true;
		$('#volume').prop('src',Utils.Path+'images/Theek-Thak_Pause.png');
		//document.getElementById('playSentence').src='sound/'+Crumbling.jsondata[Crumbling.counter]['Audio'];
		document.getElementById('playSentence').currentTime=Crumbling.currentTime;
		document.getElementById('playSentence').play();

		Crumbling.timeout=setTimeout(function()
		{
			Crumbling.stopSound();
		},Crumbling.durationOfAudio2*1000);

		//Android.audioPlayer('CrumblingSentences/sound/'+Crumbling.jsondata[Crumbling.counter]['Audio']);
	}
	else if(Crumbling.playingSoundFlag==true)
	{
		
		Crumbling.pauseSound();
	}
	//Android.audioPlayer('CrumblingSentences/sound/'+Crumbling.jsondata[Crumbling.counter]['Audio']);
};

Crumbling.stopSound=function()
{
	
	clearTimeout(Crumbling.timeout);
	Crumbling.currentTime=0;
	document.getElementById('playSentence').pause();
	Crumbling.playingSoundFlag=false;
	$('#volume').prop('src',Utils.Path+'images/Theek-Thak_Sound-Play.png');
	
}

Crumbling.pauseSound=function()
{
		Crumbling.playingSoundFlag=false;
		$('#volume').prop('src',Utils.Path+'images/Theek-Thak_Sound-Play.png');
		//Android.stopAudioPlayer();
		Crumbling.currentTime=document.getElementById('playSentence').currentTime;
		document.getElementById('playSentence').pause();
		Crumbling.durationOfAudio2=Math.abs(Crumbling.durationOfAudio2-Crumbling.currentTime);
}