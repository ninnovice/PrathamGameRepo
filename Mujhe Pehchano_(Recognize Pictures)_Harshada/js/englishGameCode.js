var EnglishFlip={};
EnglishFlip.init=function(){

	$('#playGame').text(EnglishFlip.hardCodeddata.play);
	$('#Flip').hide();
	$('#coverPage').show();
	$('#background').css({'backgroundImage':"url('css/Cover_Hindi.jpg')"});
};

EnglishFlip.getGameDataAfterTimeOut=function()
{
	$('#background').css({'backgroundImage':"url('css/BG.jpg')"});
	$('#Flip').show();
	$('#coverPage,#wrongImgDiv').hide();
	var randomIndex=0,tempArray=[];
	EnglishFlip.counter=0,EnglishFlip.correctAnswerCount=0;
	EnglishFlip.arrOfSelectedWords=[];
	$('.optionForFlip').css({'display':'block'});
	//$('.slide').css({'pointer-events': 'none'});
	$('.notClicked').css({'pointer-events': 'none'});
	$('.defaultImage').removeClass('flip');
	$('#lastGamePage,#divContainingFullImage').hide();
	$('#soundDiv,#homeDiv,#divContainingSplitImages').fadeIn('slow');
	EnglishFlip.arrOfSelectedWords=populate(EnglishFlip.wordsData,EnglishFlip.arrOfSelectedWords, 9);
	EnglishFlip.arrOfSelectedWords=shuffleArray(EnglishFlip.arrOfSelectedWords);
	EnglishFlip.tempArray=EnglishFlip.arrOfSelectedWords.slice();
	EnglishFlip.fillGrid();
	setTimeout(function(){

		EnglishFlip.showQuestions();
		$('.notClicked').css({'pointer-events': 'auto'});
	},1500);
}


EnglishFlip.getGameData=function()
{
	$('#background').css({'backgroundImage':"url('css/BG.jpg')"});
	$('#Flip').show();
	$('#playAgain').show();
	$('#coverPage,#wrongImgDiv').hide();
	var randomIndex=0,tempArray=[];
	EnglishFlip.counter=0,EnglishFlip.correctAnswerCount=0;
	EnglishFlip.arrOfSelectedWords=[];
	$('.optionForFlip').css({'display':'block'});
	$('.notClicked').css({'pointer-events': 'auto'});
	$('.defaultImage').removeClass('flip');
	$('#lastGamePage,#divContainingFullImage').hide();
	$('#soundDiv,#homeDiv,#divContainingSplitImages').fadeIn('slow');
	EnglishFlip.arrOfSelectedWords=populate(EnglishFlip.wordsData,EnglishFlip.arrOfSelectedWords, 9);
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
	//Android.audioPlayer('RecognizePictures/sounds/'+EnglishFlip.tempArray[EnglishFlip.randomQuestion]['sound']);
};

EnglishFlip.showQuestions=function(tempArray)
{
	EnglishFlip.randomQuestion=Math.floor(Math.random()*EnglishFlip.tempArray.length);
	$('#title').data('question',EnglishFlip.tempArray[EnglishFlip.randomQuestion]['word'].trim());
	document.getElementById('playSound').src='sounds/'+EnglishFlip.tempArray[EnglishFlip.randomQuestion]['sound'];
	document.getElementById('playSound').play();
	//Android.audioPlayer('RecognizePictures/sounds/'+EnglishFlip.tempArray[EnglishFlip.randomQuestion]['sound']);
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
			$('#imgDiv'+(i-1)).data('frontImg',''+EnglishFlip.frontimageSet['img']+''+i+''+EnglishFlip.frontimageSet['type']);
			if(EnglishFlip.arrOfSelectedWords[EnglishFlip.randomQuestion]['img']=="none")
			{
				$('#option'+(i-1)).text(EnglishFlip.arrOfSelectedWords[EnglishFlip.randomQuestion]['word'].trim());
				$('#img'+j+'_'+k).hide();
			}
			else
			{
				$('#img'+j+'_'+k).prop('src','Images/'+EnglishFlip.arrOfSelectedWords[EnglishFlip.randomQuestion]['img']);
				$('#option'+(i-1)).hide();
			}
			i++;
			EnglishFlip.arrOfSelectedWords.splice(EnglishFlip.randomQuestion,1);
		}
	}	
}

EnglishFlip.checkAns=function(evt)
{
	var source,frontImg;
	EnglishFlip.counter++;
	$('.slide').css({'pointer-events': 'none'});
	wrongImgArray=['backWrong1.png','backWrong2.png'];
	if($('#'+evt).data('answer')==$('#title').data('question'))
	{
		EnglishFlip.correctAnswerCount++;
		$('#'+evt).find('img').show();
		$('#'+evt).find('p').hide();
		source=$('#'+evt).data('backImg');
		frontImg=$('#'+evt).data('frontImg');
		document.getElementById('playSound').src='sounds/CorrectSound.mp3';
		document.getElementById('playSound').play();
		//$('#'+evt).find('img').prop('src',frontImg);
		$('#'+evt).find('img').prop('src',source);
		$('#wrongimg1').prop('src','Images/happy-boy.png');
		$('#wrongimg2').prop('src','Images/happy-girl.png');
		$('#wrongImgDiv').show();
		$('#'+evt).removeClass('notClicked');
		setTimeout(function()
		{
			
			$('#'+evt).find('img').addClass('flip');
			setTimeout(function(){
				$('#wrongImgDiv').hide();

			},100);
			
			//$('.slide').css({'pointer-events': 'auto'});
		},800);
		$('#'+evt).css({'pointer-events': 'none'});
	}	
	else
	{
		randomImg=Math.floor(Math.random()*wrongImgArray.length);
		document.getElementById('playSound').src='sounds/WrongSound.mp3';
		document.getElementById('playSound').play();
		$('#wrongimg1').prop('src','Images/sad-boy.png');
		$('#wrongimg2').prop('src','Images/sad-girl.png');
		$('#wrongImgDiv').show();
		for(var i=0;i<9;i++)
		{
			if($('#title').data('question')==$('#imgDiv'+i).data('answer'))
			{
				var offsetOfImage=$('#imgDiv'+i).offset();
				break;
			}
		}
		
		setTimeout(function()
		{
				$('#imgDiv'+i).removeClass('notClicked');
				$('#imgDiv'+i).css({'pointer-events': 'none'});
				$('#imgDiv'+i).find('img').prop('src','Images/'+wrongImgArray[randomImg]);
				$('#imgDiv'+i).find('img').show();
				$('#imgDiv'+i).find('p').hide();
				//$('#'+evt).removeClass("shake");
				//$('#imgDiv'+i).append('<span class="glyphicon glyphicon-remove wronganswer" style="z-index:50;color:red;" id="wrong'+EnglishFlip.counter+'"></span>');
				//$('#wrong'+EnglishFlip.counter).offset({top:''+offsetOfImage.top,left:''+offsetOfImage.left});
				//$('#wrong'+EnglishFlip.counter).css({'margin-left':' 30%','margin-top': '-4%'});
				setTimeout(function(){
				$('#wrongImgDiv').hide();
			},100);
			
			//$('.slide').css({'pointer-events': 'auto'});
		},800);
	}
	EnglishFlip.tempArray.splice(EnglishFlip.randomQuestion,1);
	setTimeout(function()
	{
		if(EnglishFlip.counter<9)
		{	
			EnglishFlip.showQuestions();
			$('.notClicked').css({'pointer-events': 'auto'});
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
					$('#playAgain').hide();
					$('#div3').removeClass('col-xs-6 col-sm-6 col-md-6 col-lg-6 col-lg-offset-1 col-md-offset-1 col-sm-offset-1 col-sm-offset-1 left ');
					$('#div3').addClass('col-xs-6 col-sm-6 col-md-6 col-lg-6 col-lg-offset-3 col-md-offset-3 col-sm-offset-3 col-sm-offset-3 left ');
					$('#fullImage').prop('src',''+EnglishFlip.imageSet[EnglishFlip.randomImg]['completeImg']);
					$('#divContainingFullImage').show();
					$('#divContainingFullImage').addClass('magictime foolishIn');
					//$('#title').text(EnglishFlip.imageSet[EnglishFlip.randomImg]['description']);
					document.getElementById('playSound').src='sounds/Bell.mp3';
					document.getElementById('playSound').play();
					//Android.audioPlayer('RecognizePictures/sounds/SoundForCorrect.mp3');
					setTimeout(function()
					{
						$('.glyphicon-remove').remove();
						//$('#divContainingFullImage').addClass('magictime foolishOut');
						EnglishFlip.showNextQuestion();
					},4000);
				},500);
			}
			else
			{
				document.getElementById('playSound').src='sounds/soundForWrong.mp3';
				document.getElementById('playSound').play();
				//Android.audioPlayer('RecognizePictures/sounds/soundForWrong.mp3');
				setTimeout(function()
				{
					$('#divContainingSplitImages').fadeOut();
					//$('.glyphicon-remove').remove();
					$('#myModal').show();
					$('#playAgain').hide();
					$('#myModal').css({'background-Image':"url('Images/joker.jpg')"});
					$('#myModal').removeClass('magictime foolishOut');
					$('#myModal').addClass('magictime foolishIn');
					$('#soundDiv,#homeDiv').hide();
					setTimeout(function(){
						$('#myModal').removeClass('magictime foolishIn');
						$('#myModal').addClass('magictime foolishOut');
						$('#soundDiv,#homeDiv').show();
						EnglishFlip.showNextQuestion();
					},3000);
					
				},1300);
			}
		}
	},2000);	
}

EnglishFlip.showNextQuestion=function()
{
		$("#myModal").fadeOut('fast');
		//$('.glyphicon-remove').remove();
		$('.slide').addClass('notClicked');
		
		setTimeout(function(){
			$('#div3').removeClass('col-xs-6 col-sm-6 col-md-6 col-lg-6 col-lg-offset-3 col-md-offset-3 col-sm-offset-3 col-sm-offset-3 left ');
		$('#div3').addClass('col-xs-6 col-sm-6 col-md-6 col-lg-6 col-lg-offset-1 col-md-offset-1 col-sm-offset-1 col-sm-offset-1 left ');
			$('#myModal').removeClass('magictime foolishIn');
			EnglishFlip.getGameData();
		
		$('.notClicked').css({'pointer-events': 'auto'});
	},1000);
}