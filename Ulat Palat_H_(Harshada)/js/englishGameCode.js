var EnglishFlip={};
EnglishFlip.level=0;

EnglishFlip.init=function()
{
	$('#Flip').hide();
	$('#coverPage').show();
	$('#playGame').text(EnglishFlip.hardCodedData.playGame);
	$('#FlipGameForRI').css({'backgroundImage':"url('css/ulat-palat.gif')"});
}

EnglishFlip.getGameDataAfterTimeOut=function()
{
	var randomIndex=0,tempArray=[];
	EnglishFlip.counter=0;
	EnglishFlip.correctAnswerCount=0;
	EnglishFlip.arrOfSelectedWords=[];
	$('.optionForFlip').css({'display':'block'});
	$('.slide').css({'pointer-events': 'none'});
	$('.defaultImage').removeClass('flip');
	$('#lastGamePage,#divContainingFullImage').hide();
	$('#soundDiv,#homeDiv,#divContainingSplitImages').show();
	EnglishFlip.arrOfSelectedWords=populate(EnglishFlip.wordsData[EnglishFlip.level]['wordList'],EnglishFlip.arrOfSelectedWords, 9);
	EnglishFlip.arrOfSelectedWords=shuffleArray(EnglishFlip.arrOfSelectedWords);
	EnglishFlip.tempArray=EnglishFlip.arrOfSelectedWords.slice();
	EnglishFlip.fillGrid();
	setTimeout(function(){
		EnglishFlip.showQuestions();
		$('.slide').css({'pointer-events': 'auto'});
	},1500);
} 

EnglishFlip.showNextQuestion=function()
{
		$('#myModal').removeClass('magictime foolishIn');
		$("#myModal").fadeOut('slow');
		$('#div3').removeClass('col-xs-6 col-sm-6 col-md-6 col-lg-6 col-lg-offset-3 col-md-offset-3 col-sm-offset-3 col-sm-offset-3 left ');
		$('#div3').addClass('col-xs-6 col-sm-6 col-md-6 col-lg-6 col-lg-offset-1 col-md-offset-1 col-sm-offset-1 col-sm-offset-1 left ');
		$('#soundDiv,#game').show();
		EnglishFlip.getGameData();
}

EnglishFlip.startGame=function()
{
	$('#Flip').show();
	$('#coverPage').hide();
	$('#FlipGameForRI').css({'backgroundImage':"url('css/BG.jpg')"});
	//EnglishFlip.getGameData();
	EnglishFlip.getGameDataAfterTimeOut();
}

EnglishFlip.getGameData=function()
{
	var randomIndex=0,tempArray=[];
	EnglishFlip.counter=0;
	EnglishFlip.correctAnswerCount=0;
	EnglishFlip.arrOfSelectedWords=[];
	$('.optionForFlip').css({'display':'block'});
	$('.slide').css({'pointer-events': 'auto'});
	$('.defaultImage').removeClass('flip');
	$('#lastGamePage,#divContainingFullImage').hide();
	$('#soundDiv,#homeDiv,#divContainingSplitImages').show();
	EnglishFlip.arrOfSelectedWords=populate(EnglishFlip.wordsData[EnglishFlip.level]['wordList'],EnglishFlip.arrOfSelectedWords, 9);
	EnglishFlip.arrOfSelectedWords=shuffleArray(EnglishFlip.arrOfSelectedWords);
	EnglishFlip.tempArray=EnglishFlip.arrOfSelectedWords.slice();
	EnglishFlip.fillGrid();
	EnglishFlip.showQuestions();
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

EnglishFlip.playSoundAgain=function()
{
	document.getElementById('playSound').play();
	//Android.audioPlayer('UlatPalat/sounds/'+EnglishFlip.tempArray[EnglishFlip.randomQuestion]['sound']);

};

EnglishFlip.showQuestions=function(tempArray)
{
	EnglishFlip.randomQuestion=Math.floor(Math.random()*EnglishFlip.tempArray.length);
	$('#title').data('question',EnglishFlip.tempArray[EnglishFlip.randomQuestion]['word'].trim());
	document.getElementById('playSound').src='sounds/'+EnglishFlip.tempArray[EnglishFlip.randomQuestion]['sound'];
	document.getElementById('playSound').play();
	//Android.audioPlayer('UlatPalat/sounds/'+EnglishFlip.tempArray[EnglishFlip.randomQuestion]['sound']);
}

EnglishFlip.fillGrid=function()
{
	var i=1,imagePath;
	EnglishFlip.randomImg=Math.floor(Math.random()*EnglishFlip.imageSet.length);
	for(var j=1;j<4;j++)
	{
		for(var k=0;k<3;k++)
		{
			EnglishFlip.randomQuestion=Math.floor(Math.random()*EnglishFlip.arrOfSelectedWords.length);
			$('#imgDiv'+(i-1)).data('answer',EnglishFlip.arrOfSelectedWords[EnglishFlip.randomQuestion]['word'].trim());
			imagePath=EnglishFlip.imageSet[EnglishFlip.randomImg]['img'];
			$('#imgDiv'+(i-1)).data('backImg',imagePath+''+i+''+EnglishFlip.imageSet[EnglishFlip.randomImg]['type']);
			/*if(EnglishFlip.arrOfSelectedWords[EnglishFlip.randomQuestion]['img']=="none")
			{*/
				$('#option'+(i-1)).text(EnglishFlip.arrOfSelectedWords[EnglishFlip.randomQuestion]['word'].trim());
				$('#img'+j+'_'+k).hide();
			/*}
			else
			{
				$('#img'+j+'_'+k).prop('src','Images/'+EnglishFlip.arrOfSelectedWords[EnglishFlip.randomQuestion]['img']);
				$('#option'+(i-1)).hide();
			}*/
			i++;
			EnglishFlip.arrOfSelectedWords.splice(EnglishFlip.randomQuestion,1);
		}
	}	
}



//function to add images to the game
EnglishFlip.addImagesToGame=function()
{ 	
	var i=1;
	EnglishFlip.chooserandomImage=Math.floor(Math.random()*EnglishFlip.imageSet.length);
	console.log(EnglishFlip.chooserandomImage);
	for(var j=1;j<4;j++)
	{
		for(var k=0;k<3;k++)
		{
			document.getElementById('img'+j+'_'+k).src=EnglishFlip.imageSet[EnglishFlip.chooserandomImage]['Image'+i];
			i++;
		}
	}
}

EnglishFlip.checkAns=function(evt)
{
	var source;
	EnglishFlip.counter++;
	
	$('.slide').css({'pointer-events': 'none'});
	if($('#'+evt).data('answer')==$('#title').data('question'))
	{
		EnglishFlip.correctAnswerCount++;
		$('#'+evt).find('img').show();
		$('#'+evt).find('p').hide();
		source=$('#'+evt).data('backImg');
		$('#'+evt).find('img').prop('src',source);
		document.getElementById('playSound').src='sounds/CorrectSound.mp3';
		document.getElementById('playSound').play();
		//Android.audioPlayer('UlatPalat/sounds/CorrectSound.mp3');
		setTimeout(function()
		{
			$('#'+evt).find('img').addClass('flip');
			//$('.slide').css({'pointer-events': 'auto'});
		},500);
		
	}	
	else
	{
		$('#'+evt).addClass("shake");
		document.getElementById('playSound').src='sounds/WrongSound.mp3';
		document.getElementById('playSound').play();
		//Android.audioPlayer('UlatPalat/sounds/WrongSound.mp3');
		setTimeout(function()
		{
			$('#'+evt).removeClass("shake");
			//$('.slide').css({'pointer-events': 'auto'});
		},500);
	}
	EnglishFlip.tempArray.splice(EnglishFlip.randomQuestion,1);
	setTimeout(function()
	{
		if(EnglishFlip.counter<9)
		{	
			EnglishFlip.showQuestions();
			$('.slide').css({'pointer-events': 'auto'});
		}
		else
		{
			$('.slide').css({'pointer-events': 'none'});
			if(EnglishFlip.correctAnswerCount>8)
			{
				setTimeout(function()
				{
					$('#divContainingSplitImages').fadeOut();
					$('#soundDiv,#homeDiv').hide();
					$('#div3').removeClass('col-xs-6 col-sm-6 col-md-6 col-lg-6 col-lg-offset-1 col-md-offset-1 col-sm-offset-1 col-sm-offset-1 left ');
					$('#div3').addClass('col-xs-6 col-sm-6 col-md-6 col-lg-6 col-lg-offset-3 col-md-offset-3 col-sm-offset-3 col-sm-offset-3 left ');
					$('#fullImage').prop('src',''+EnglishFlip.imageSet[EnglishFlip.randomImg]['completeImg']);
					$('#divContainingFullImage').show();
					$('#divContainingFullImage').addClass('magictime foolishIn');
					document.getElementById('playSound').src='sounds/SoundForCorrect.mp3';
					document.getElementById('playSound').play();
					//Android.audioPlayer('UlatPalat/sounds/SoundForCorrect.mp3');
					$('#title').text(EnglishFlip.imageSet[EnglishFlip.randomImg]['description']);
					setTimeout(function(){
						EnglishFlip.level++;
						if(EnglishFlip.level>2)
							location.reload(true);
						$('#div3').removeClass('col-xs-6 col-sm-6 col-md-6 col-lg-6 col-lg-offset-3 col-md-offset-3 col-sm-offset-3 col-sm-offset-3 left ');
						$('#div3').addClass('col-xs-6 col-sm-6 col-md-6 col-lg-6 col-lg-offset-1 col-md-offset-1 col-sm-offset-1 col-sm-offset-1 left ');
						EnglishFlip.getGameData();
					},5000);
				},500);
			}
			else
			{
				document.getElementById('playSound').src='sounds/soundForWrong.mp3';
				document.getElementById('playSound').play();
				//Android.audioPlayer('UlatPalat/sounds/soundForWrong.mp3');
				setTimeout(function()
				{
					$('#divContainingSplitImages').fadeOut();
					$('#myModal').show();
					$('#myModal').addClass('magictime foolishIn');
					$('#soundDiv,#game').hide();
				},1200);
			}
		}
	},2000);	
}