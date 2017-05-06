
VideoStory.counter=0;
VideoStory.volumeFlag=false;
VideoStory.recordFlag=false;
VideoStory.playAudioFlag=false;
VideoStory.arrayOfSplitedSentence=[];
VideoStory.widthOfword=[];
VideoStory.icounter=0;

VideoStory.addSentences=function()
{
	var sentence;
	$('#playAudio').css('pointer-events','none');
	$('#record').css('pointer-events','none');
	//$('#sentenceDiv').empty();
	//VideoStory.randomSentence=Math.floor(Math.random()*VideoStory.jsondata.length);
	//sentence=VideoStory.jsondata[VideoStory.randomSentence]['Sentence'];
	sentence=VideoStory.jsondata[VideoStory.counter]['Sentence'];
	VideoStory.arrayOfSplitedSentence=sentence.split(' ').slice();
	for(var i=0;i<VideoStory.arrayOfSplitedSentence.length;i++)
	{
		element=document.createElement('span');
		element.id="span"+i;
		element.style="font-size:35px;color:black"
		element.className="sentence";
		document.getElementById('sentenceDiv').appendChild(element);
		element.innerHTML=" "+VideoStory.arrayOfSplitedSentence[i];
		VideoStory.widthOfword.push($(element).text().length);
	}
	document.getElementById('myModal').style="display:block";
	document.getElementById('game').style="filter: blur(2px)";
	/*setTimeout(function(){
		VideoStory.playsound();
	},1000);*/
	
}

VideoStory.playsound=function()
{	
	document.getElementById('myModal').style="display:none";
	document.getElementById('game').style="filter: blur(0px)";
	if(VideoStory.icounter<VideoStory.jsondata[VideoStory.counter]['Words'].length)
	{
		$('#prev').css('pointer-events','none');
		$('#next').css('pointer-events','none');
		var time;
		var temp=VideoStory.jsondata[VideoStory.counter]['Words'];
		time=temp[VideoStory.icounter]['Duration']* 1000;
		document.getElementById('span'+VideoStory.icounter).style.color='rgb(235,72,157)';
		document.getElementById('playSound').src=VideoStory.jsondata[VideoStory.counter]['Audio'];
		document.getElementById('playSound').currentTime=temp[VideoStory.icounter]['From'];
		document.getElementById('playSound').play();
		setTimeout(function()
		{
			document.getElementById('playSound').pause();
			console.log(VideoStory.icounter);
			document.getElementById('span'+VideoStory.icounter).style.color="black";
			VideoStory.icounter++;
			VideoStory.playsound();
		}, time);
	}
	else
	{
		$('#prev').css('pointer-events','auto');
		$('#next').css('pointer-events','auto');
	}
}

VideoStory.volumeOnOff=function()
{
		if(VideoStory.volumeFlag==false)
		{
			VideoStory.volumeFlag=true;
			document.getElementById('volume').src="images/volumeoff.png";
			$('#playSound').prop('muted',true);
		}
		else if(VideoStory.volumeFlag==true)
		{
			VideoStory.volumeFlag=false;
			document.getElementById('volume').src="images/volumeup.png";
			$('#playSound').prop('muted',false);
		}
}


VideoStory.recordAudio=function(evt)
{
	i=0;
	document.getElementsByClassName('sentence').style.color="black";
	$('#playSound').prop('muted',true);

	//$('video').prop('autoplay',true);
	VideoStory.playsound();
	if(VideoStory.recordFlag==false)
	{
		VideoStory.recordFlag=true;
		$('#playAudio').css('pointer-events','none');
		document.getElementById(evt).src="images/stop.png";
		//Android.startRecording();
	}
	else if(VideoStory.recordFlag=true)
	{
		//Android.stopRecording();
		VideoStory.recordFlag=false;
		document.getElementById(evt).src="images/microphone.png";
		$('#playAudio').css('pointer-events','auto');	
	}
}
	
	VideoStory.nextVideoCalled=function()
	{
		//i=0;
		VideoStory.counter++;
		if(VideoStory.counter>=5)
			VideoStory.counter=0;
		document.getElementById('playSound').pause();
		$('#playSound').prop('muted',false);
		$('#sentenceDiv').empty();

		document.getElementById('record').src="images/microphone.png";
		document.getElementById('playAudio').src="images/play.png";

		document.getElementById('pic1').src=VideoStory.imagesArray[VideoStory.counter]['img'];
		setTimeout(function(){
			VideoStory.icounter=0;
			VideoStory.addSentences();
		},0);
		
		//$('#playAudio').css('pointer-events','none');
	}
	
	VideoStory.backVideoCalled=function()
	{
		
		VideoStory.counter+=2;
		if(VideoStory.counter>=5)
			VideoStory.counter=0;
		document.getElementById('playSound').pause();
		$('#playSound').prop('muted',false);
		$('#sentenceDiv').empty();
		document.getElementById('record').src="images/microphone.png";
		document.getElementById('playAudio').src="images/play.png";
		document.getElementById('pic1').src=VideoStory.imagesArray[VideoStory.counter]['img'];
		setTimeout(function(){
			VideoStory.icounter=0;
			VideoStory.addSentences();
		},0);
		//$('#playAudio').css('pointer-events','none');
		
	}

	VideoStory.playMyAudio=function(evt)
	{
		$('video').prop('autoplay',true);
		if(VideoStory.playAudioFlag==false)
		{
			//Android.audioPlayerForStory("/storage/sdcard0/recordGame.mp4", null);
			
			document.getElementById(evt).src="images/stop.png";	
			VideoStory.playAudioFlag=true;
			$('#record').css('pointer-events','none');
		}
		else if(VideoStory.playAudioFlag=true)
		{
			//Android.stopAudioPlayer();
			
			document.getElementById(evt).src="images/play.png";	
			VideoStory.playAudioFlag=false;
			$('#record').css('pointer-events','auto');
		}
	}
	
	VideoStory.playVideo=function()
	{

		var video=document.getElementById('sentenceDiv');
		
	}


	