

									/* ..add images and name of stories ..*/
VideoStory.init=function()
{
	VideoStory.counter=0,VideoStory.arrayOfSplitedSentence=[],VideoStory.widthOfword=[];
	VideoStory.wordCnt=0;
	VideoStory.Flags={};
	VideoStory.currentTime=0;
	VideoStory.Flags.volume=false;
	VideoStory.Flags.record=false;
	VideoStory.Flags.playAudio=false;
	VideoStory.Flags.playingAudio=false;
	VideoStory.Flags.recorded=false;
	VideoStory.timeOut=0;
	VideoStory.interval;

	var i=0,j=0,tempArray=[],div,img,para,storyNumber;
	$('#game').hide();
	tempArray=VideoStory.jsondata.slice();
	$('#background').css({'background-color':'rgb(232,82,132)'});
	while(i<tempArray.length)
	{
		div=document.createElement('div');
		div.className="col-lg-3 col-md-3 col-xs-3 col-sm-3 storyDivs";
		div.id="div"+i;
		div.style="margin-bottom:3%;";
		
		img=document.createElement('img');
		img.id="img"+i;
		img.style="border:2px solid black;padding:0px;!important ";
		img.src=tempArray[i]['storyImage'];
		img.className="img-responsive col-lg-10 col-md-10 col-xs-10 col-sm-10 col-lg-offset-1 col-md-offset-1 col-sm-offset-1 col-xs-offset-1";
		para=document.createElement('p');
		para.id="para"+i;
		para.innerHTML=tempArray[i]['storyName'];
		para.style="font-weight:bold";
		para.className="text-center storyNames col-lg-10 col-md-10 col-xs-10 col-sm-10 col-lg-offset-1 col-md-offset-1 col-sm-offset-1 col-xs-offset-1";
		div.appendChild(img);
		div.appendChild(para);
		document.getElementById('menu').appendChild(div);
		$('#div'+i).data('storyNumber',tempArray[i].storyNumber);
		i++;
	}

	$('.storyDivs').on('click',VideoStory.showStory);

	$('.navigate').on('click',function()
	{
		VideoStory.navigateSentences(this.id);
	});
}

									/* ..show selected story ..*/
VideoStory.showStory=function()
{
	$('#menu').hide();
	$('#game').show();
	var storyNumber=$(this).data('storyNumber');
	for(var i=0;i<VideoStory.jsondata.length;i++)
	{
		if(VideoStory.jsondata[i]['storyNumber']===storyNumber)
		{
			VideoStory.selectedStory=i;

		}
	}
	$('#storyName').text(VideoStory.jsondata[VideoStory.selectedStory]['storyName']);
	$('#background').css({'background-color':'rgb(176,176,176)'});
	VideoStory.addSentences();
}
									
									/* ..show sentences in the selected story ..*/
VideoStory.addSentences=function()
{	var sentence,element,sentenceCounter,time,length;
	VideoStory.playTime=0;
	document.getElementById('image').src=VideoStory.jsondata[VideoStory.selectedStory]['pages'][VideoStory.counter]['img'];
	sentence=VideoStory.jsondata[VideoStory.selectedStory]['pages'][VideoStory.counter]['Sentence'];
	VideoStory.arrayOfSplitedSentence=sentence.split(' ').slice();
	VideoStory.arrayOfSplitedSentence=sentence.split(' ').slice();
	for(var i=0;i<VideoStory.arrayOfSplitedSentence.length;i++)
	{
		element=document.createElement('span');
		element.id="span"+i;
		element.className="sentence";
		document.getElementById('sentenceDiv').appendChild(element);
		element.innerHTML=" "+VideoStory.arrayOfSplitedSentence[i];
		VideoStory.widthOfword.push($(element).text().length);
	}

	sentenceCounter=VideoStory.jsondata[VideoStory.selectedStory]['pages'][VideoStory.counter];
	length=sentenceCounter['Words'].length;
	VideoStory.playTime=(sentenceCounter['Words'][length-1]['To']-sentenceCounter['Words'][0]['From'])*1000;
    VideoStory.currentTime=sentenceCounter['Words'][0]['From'];
    document.getElementById('playSound').src='sounds/'+sentenceCounter['Audio'];
}

									/* ..play sound for each word in the sentence ..*/
VideoStory.playsound=function()
{	
	var length,time,temp;
	if(VideoStory.Flags.playingAudio==false)
	{
		VideoStory.Flags.playingAudio=true;
		$('#play').prop('src','images/stop.png');
		document.getElementById('playSound').currentTime=VideoStory.currentTime;
		document.getElementById('playSound').play();

       // Android.partAudioPlayer(tempAudio, seconds);
        setTimeout(function(){
        	document.getElementById('playSound').pause();
        	VideoStory.currentTime=document.getElementById('playSound').currentTime;
            //Android.stopAudioPlayer();
				VideoStory.Flags.playingAudio=false;
				$('#play').prop('src','images/play.png');

		}, VideoStory.playTime);
		VideoStory.wordCnt=0;
	}
	else if(VideoStory.Flags.playingAudio==true){
		document.getElementById('playSound').pause();
		VideoStory.currentTime=document.getElementById('playSound').currentTime;
		//Android.stopAudioPlayer();
//		clearTimeout(VideoStory.timeOut);

		VideoStory.Flags.playingAudio=false;
		$('#play').prop('src','images/play.png');
	}
}

VideoStory.stopSound=function()
{
	document.getElementById('playSound').pause();
	VideoStory.currentTime=0;
}
									/* ..change icon on volume on and off ..*/
VideoStory.volumeOnOff=function()
{
		if(VideoStory.Flags.volume==false)
		{
			Android.toggleVolume(VideoStory.Flags.volume)
			VideoStory.Flags.volume=true;
			document.getElementById('volume').src="images/volumeoff.png";
//			$('#playSound').prop('muted',true);
		}
		else if(VideoStory.Flags.volume==true)
		{
			Android.toggleVolume(VideoStory.Flags.volume)
			VideoStory.Flags.volume=false;
			document.getElementById('volume').src="images/volumeup.png";
//			$('#playSound').prop('muted',false);
		}
}

VideoStory.navigateSentences=function(evt)
{
	VideoStory.Flags.record==false;
	VideoStory.Flags.recorded==false;
	var length=VideoStory.jsondata[VideoStory.selectedStory]['pages'].length;
	Android.stopAudioPlayer();
	if(VideoStory.Flags.playingAudio==true)
	{
		VideoStory.Flags.playingAudio=false;
		$('#play').prop('src','images/play.png');
	}

	if(evt=='prev')
	{
		if(VideoStory.counter!==0)
			VideoStory.counter--;
		else
			VideoStory.counter=length-1;
	}
	else if(evt=='next')
	{
		if(VideoStory.counter!==length-1)
			VideoStory.counter++;
		else
			VideoStory.counter=0;
	}
		document.getElementById('playSound').pause();
		$('#playSound').prop('muted',false);
		document.getElementById('volume').src="images/volumeup.png";
		$('#sentenceDiv').empty();
		VideoStory.wordCnt=0;
		
	if(VideoStory.counter>=length)
	{
		VideoStory.counter=0;
	}
	VideoStory.addSentences();
}

VideoStory.recordAudio=function()
{
//	$('#playSound').prop('muted',true);
	
	if(VideoStory.Flags.playingAudio==true)
	{
		Android.stopAudioPlayer();
		VideoStory.Flags.playingAudio=false;
		$('#play').prop('src','images/play.png');

	}
	
	if(VideoStory.Flags.playAudio==true){
		VideoStory.playRecordedAudio();
	}
	
	if(VideoStory.Flags.record==false)
	{
		VideoStory.Flags.record=true;
		$('#play').css({'pointer-events': 'none'});
		$('#record').prop('src','images/stop.png');
		/*VideoStory.interval=setInterval(function()
		{
			$('#record').toggleClass('blink');
		},1000);*/
		$('#record').addClass('blink_me');
		
		$('#playRecord').css({'pointer-events': 'none'});
		$('#record').css({'pointer-events': 'auto'});
		$('#prev').css({'pointer-events': 'auto'});
		$('#next').css({'pointer-events': 'auto'});

		//$('#playRecord').css({'filter':'blur(3px)'});

		Android.startRecording();
	}
	else if(VideoStory.Flags.record==true)
	{
		VideoStory.Flags.record=false;
		//clearInterval(VideoStory.interval);
		$('#record').removeClass('blink_me');
		$('#record').prop('src','images/Record.png');
		$('#playRecord').css({'pointer-events': 'auto'});
		$('#prev').css({'pointer-events': 'auto'});
		$('#next').css({'pointer-events': 'auto'});
		$('#play').css({'pointer-events': 'auto'});
		//$('#record').css({'pointer-events': 'none'});

		Android.stopRecording();
		VideoStory.Flags.recorded= true;
		//$('#playRecord').css({'filter':'blur(0px)'});	
	}
}

VideoStory.playRecordedAudio=function()
{
	if((VideoStory.Flags.recorded==true)&&(VideoStory.Flags.playingAudio==false))
	{
    	if (VideoStory.Flags.playAudio==false)
    	{
			$('#playRecord').prop('src','images/stop.png');
			$('#play').css({'pointer-events': 'none'});
	        VideoStory.Flags.playAudio=true;
			//        Android.audioPlayerForStory("recordGame.3gp", null);
			Android.audioPlayer("recordGame.3gp");
   	 	}
    	else if(VideoStory.Flags.playAudio==true)
    	{
			$('#playRecord').prop('src','images/My-Recording.png');
			$('#play').css({'pointer-events': 'auto'});
	        VideoStory.Flags.playAudio=false;
			//        Android.stopRecording();
			Android.stopAudioPlayer();
			$('#record').css({'pointer-events': 'auto'});
	    }
	}
}




