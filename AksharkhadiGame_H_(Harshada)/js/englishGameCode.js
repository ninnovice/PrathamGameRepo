var Barakhadi={};
Barakhadi.init=function(){

	$('#playGame').text(Barakhadi.hardCodeddata.play);
	$('#Flip').hide();
	$('#coverPage').show();
	$('#background').css({'backgroundImage':"url('Images/Cover.jpg')"});
};

Barakhadi.getGameDataAfterTimeOut=function()
{
	$('#background').css({'backgroundImage':"url('css/BG.jpg')"});
	$('#Flip').show();
	$('#coverPage').hide();
	var randomIndex=0,tempArray=[];
	Barakhadi.counter=0,Barakhadi.correctAnswerCount=0;
	Barakhadi.arrOfSelectedWords=[];
	$('.optionForFlip').css({'display':'block'});
	$('.slide').css({'pointer-events': 'auto'});
	$('.defaultImage').removeClass('flip');
	$('#lastGamePage,#divContainingFullImage').hide();
	$('#soundDiv,#homeDiv,#divContainingSplitImages').fadeIn('slow');
	Barakhadi.arrOfSelectedWords=populate(Barakhadi.wordsData,Barakhadi.arrOfSelectedWords, 9);
	Barakhadi.arrOfSelectedWords=shuffleArray(Barakhadi.arrOfSelectedWords);
	Barakhadi.tempArray=Barakhadi.arrOfSelectedWords.slice();
	Barakhadi.fillGrid();
	setTimeout(function(){
		Barakhadi.showQuestions();
	},1500);
}

Barakhadi.getGameData=function()
{
	$('#background').css({'backgroundImage':"url('css/BG.jpg')"});
	$('#Flip').show();
	$('#coverPage').hide();
	var randomIndex=0,tempArray=[];
	Barakhadi.counter=0,Barakhadi.correctAnswerCount=0;
	Barakhadi.arrOfSelectedWords=[];
	$('.optionForFlip').css({'display':'block'});
	$('.slide').css({'pointer-events': 'auto'});
	$('.defaultImage').removeClass('flip');
	$('#lastGamePage,#divContainingFullImage').hide();
	$('#soundDiv,#homeDiv,#divContainingSplitImages').fadeIn('slow');
	Barakhadi.arrOfSelectedWords=populate(Barakhadi.wordsData,Barakhadi.arrOfSelectedWords, 9);
	Barakhadi.arrOfSelectedWords=shuffleArray(Barakhadi.arrOfSelectedWords);
	Barakhadi.tempArray=Barakhadi.arrOfSelectedWords.slice();
	Barakhadi.fillGrid();
	Barakhadi.showQuestions();
}

function populate(array1, array2, length)
{
	var randomIndex;
	while (array2.length !== length) 
	{
		randomIndex = Math.floor(Math.random()*array1.length);
		if($.inArray(array1[randomIndex],array2) === -1)
		array2.push(array1[randomIndex]);
	}
	return array2;
}

function shuffleArray(array)
{
	var i,j,temp;
	for (i = array.length - 1; i > 0; i--) 
	{
	    j = Math.floor(Math.random() * (i + 1));
	    temp = array[i];
	    array[i] = array[j];
	    array[j] = temp;
	}
	return array;
}

Barakhadi.playSoundAgain=function()
{
	document.getElementById('playSound').play();
	//Android.audioPlayer('ICDSBarakhadiGame/sounds/'+Barakhadi.tempArray[Barakhadi.randomQuestion]['sound']);
};

Barakhadi.showQuestions=function(tempArray)
{
	Barakhadi.randomQuestion=Math.floor(Math.random()*Barakhadi.tempArray.length);
	$('#title').data('question',Barakhadi.tempArray[Barakhadi.randomQuestion]['word'].trim());
	document.getElementById('playSound').src='sounds/'+Barakhadi.tempArray[Barakhadi.randomQuestion]['sound'];
	document.getElementById('playSound').play();
	//Android.audioPlayer('ICDSBarakhadiGame/sounds/'+Barakhadi.tempArray[Barakhadi.randomQuestion]['sound']);
}

Barakhadi.fillGrid=function()
{
	var i=1,imagePath;
	Barakhadi.randomImg=Math.floor(Math.random()*Barakhadi.imageSet.length);
	for(var j=1;j<4;j++)
	{
		for(var k=0;k<3;k++)
		{
			Barakhadi.randomQuestion=Math.floor(Math.random()*Barakhadi.arrOfSelectedWords.length);
			$('#imgDiv'+(i-1)).data('answer',Barakhadi.arrOfSelectedWords[Barakhadi.randomQuestion]['word'].trim());
			imagePath=Barakhadi.imageSet[Barakhadi.randomImg]['img'];
			$('#imgDiv'+(i-1)).data('backImg',imagePath+''+i+''+Barakhadi.imageSet[Barakhadi.randomImg]['type']);
			/*if(Barakhadi.arrOfSelectedWords[Barakhadi.randomQuestion]['img']=="none")
			{*/
				$('#option'+(i-1)).text(Barakhadi.arrOfSelectedWords[Barakhadi.randomQuestion]['word'].trim());
				$('#img'+j+'_'+k).hide();
			/*}
			else
			{
				$('#img'+j+'_'+k).prop('src','Images/'+Barakhadi.arrOfSelectedWords[Barakhadi.randomQuestion]['img']);
				$('#option'+(i-1)).hide();
			}*/
			i++;
			Barakhadi.arrOfSelectedWords.splice(Barakhadi.randomQuestion,1);
		}
	}	
}

Barakhadi.checkAns=function(evt)
{
	var source;
	Barakhadi.counter++;
	$('.slide').css({'pointer-events': 'none'});
	if($('#'+evt).data('answer')==$('#title').data('question'))
	{
		Barakhadi.correctAnswerCount++;
		$('#'+evt).find('img').show();
		$('#'+evt).find('p').hide();
		source=$('#'+evt).data('backImg');
		$('#'+evt).find('img').prop('src',source);
		setTimeout(function()
		{
			$('#'+evt).find('img').addClass('flip');
			//$('.slide').css({'pointer-events': 'auto'});
		},500);
	}	
	else
	{
		$('#'+evt).addClass("shake");
		setTimeout(function()
		{
			$('#'+evt).removeClass("shake");
			//$('.slide').css({'pointer-events': 'auto'});
		},500);
	}
	Barakhadi.tempArray.splice(Barakhadi.randomQuestion,1);
	setTimeout(function()
	{
		if(Barakhadi.counter<9)
		{	
			Barakhadi.showQuestions();
			$('.slide').css({'pointer-events': 'auto'});
		}
		else
		{
			$('.slide').css({'pointer-events': 'none'});
			if(Barakhadi.correctAnswerCount>8)
			{
				setTimeout(function()
				{
					$('#divContainingSplitImages').fadeOut();
					$('#soundDiv,#homeDiv').hide();
					$('#div3').removeClass('col-xs-6 col-sm-6 col-md-6 col-lg-6 col-lg-offset-1 col-md-offset-1 col-sm-offset-1 col-sm-offset-1 left ');
					$('#div3').addClass('col-xs-6 col-sm-6 col-md-6 col-lg-6 col-lg-offset-3 col-md-offset-3 col-sm-offset-3 col-sm-offset-3 left ');
					$('#fullImage').prop('src',''+Barakhadi.imageSet[Barakhadi.randomImg]['completeImg']);
					$('#divContainingFullImage').show();
					$('#divContainingFullImage').addClass('magictime foolishIn');
					document.getElementById('playSound').src='sounds/SoundForCorrect.mp3';
					document.getElementById('playSound').play();
					//Android.audioPlayer('ICDSBarakhadiGame/sounds/SoundForCorrect.mp3');
					//$('#title').text(Barakhadi.imageSet[Barakhadi.randomImg]['description']);
					setTimeout(function()
					{
						Barakhadi.showNextQuestion();
					},4000);
				},500);
			}
			else
			{
				document.getElementById('playSound').src='sounds/soundForWrong.mp3';
				document.getElementById('playSound').play();
				//Android.audioPlayer('ICDSBarakhadiGame/sounds/soundForWrong.mp3');
				setTimeout(function()
				{
					$('#divContainingSplitImages').fadeOut();
					$('#myModal').show();
					$('#myModal').addClass('magictime foolishIn');
					$('#soundDiv,#homeDiv').hide();
				},1300);
			}
		}
	},2000);	
}

Barakhadi.showNextQuestion=function()
{
		$('#myModal').removeClass('magictime foolishIn');
		$("#myModal").fadeOut('slow');
		$('#div3').removeClass('col-xs-6 col-sm-6 col-md-6 col-lg-6 col-lg-offset-3 col-md-offset-3 col-sm-offset-3 col-sm-offset-3 left ');
		$('#div3').addClass('col-xs-6 col-sm-6 col-md-6 col-lg-6 col-lg-offset-1 col-md-offset-1 col-sm-offset-1 col-sm-offset-1 left ');
		Barakhadi.getGameData();
}