var Recognize={};
var Utils={};
Utils.Path='';

$(document).ready(function(){
	//Android.getPath('RecognizePictures');
	setTimeout(function(){
		Recognize.setAllImages();
		Recognize.init();
	},200);
});

Recognize.setAllImages=function()
{
	$('#playGame').prop('src',Utils.Path+'Images/Play.png');
	$('#volume').prop('src',Utils.Path+'Images/Sound.png');
	$('#home').prop('src',Utils.Path+'Images/home.png');
	$('#playAgain').prop('src',Utils.Path+'Images/Next.png');
	//$('#logo').css({'backgroundImage':'url('+Utils.Path+'Images/logo.png)'});
	$('#logo').prop('src',Utils.Path+'Images/logo.png');
};


Recognize.init=function(){
	$('#playGame').text(Recognize.hardCodeddata.play);
	$('#Flip').hide();
	$('#coverPage').show();
	$('#background').css({'backgroundImage':'url('+Utils.Path+'css/Cover_Hindi.jpg)'});
};

Recognize.getGameDataAfterTimeOut=function()
{
	Recognize.getGameData();
	setTimeout(function(){
		Recognize.showQuestions();
	},1500);
};


Recognize.getGameData=function()
{
	var randomIndex=0,tempArray=[];
	Recognize.counter=0,Recognize.correctAnswerCount=0;
	Recognize.arrOfSelectedWords=[];
	Recognize.arrOfSelectedWords=populate(Recognize.wordsData,Recognize.arrOfSelectedWords,4);
	Recognize.arrOfSelectedWords=shuffleArray(Recognize.arrOfSelectedWords);
	Recognize.tempArray=Recognize.arrOfSelectedWords.slice();
	$('#background').css({'backgroundImage':'url('+Utils.Path+'css/BG.jpg)'});
	$('#Flip').show();
	$('#coverPage,#wrongImgDiv,#lastGamePage,#divContainingFullImage').hide();
	$('.optionForFlip').css({'display':'block'});
	$('.notClicked').css({'pointer-events': 'none'});
	$('.defaultImage').removeClass('flip');
	$('#soundDiv,#homeDiv,#divContainingSplitImages').fadeIn('slow');
	Recognize.fillGrid();
};

Recognize.showQuestions=function()
{
	$('.notClicked').css({'pointer-events': 'auto'});
	Recognize.randomQuestion=Math.floor(Math.random()*Recognize.tempArray.length);
	$('#title').data('question',Recognize.tempArray[Recognize.randomQuestion]['word'].trim());
	document.getElementById('playSound').src=Utils.Path+'sounds/'+Recognize.tempArray[Recognize.randomQuestion]['sound'];
	document.getElementById('playSound').play();
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

Recognize.playSoundAgain=function()
{
	document.getElementById('playSound').play();
};



Recognize.fillGrid=function()
{
	var i=1,imagePath;
	for(var j=1;j<3;j++)
	{
		for(var k=0;k<2;k++)
		{
			Recognize.randomQuestion=Math.floor(Math.random()*Recognize.arrOfSelectedWords.length);
			$('#imgDiv'+(i-1)).data('answer',Recognize.arrOfSelectedWords[Recognize.randomQuestion]['word'].trim());
			imagePath=Utils.Path+''+Recognize.frontimageSet['img'];
			$('#imgDiv'+(i-1)).data('backImg',imagePath+''+i+''+Recognize.frontimageSet['type']);
			if(Recognize.arrOfSelectedWords[Recognize.randomQuestion]['img']=="none")
			{
				$('#option'+(i-1)).text(Recognize.arrOfSelectedWords[Recognize.randomQuestion]['word'].trim());
				$('#img'+j+'_'+k).hide();
			}
			else
			{
				$('#img'+j+'_'+k).prop('src',Utils.Path+'Images/'+Recognize.arrOfSelectedWords[Recognize.randomQuestion]['img']);
				$('#option'+(i-1)).hide();
			}
			i++;
			Recognize.arrOfSelectedWords.splice(Recognize.randomQuestion,1);
		}
	}	
};


Recognize.answerIsCorrect=function(evt){
		Recognize.correctAnswerCount++;
		$('#'+evt).find('img').show();
		$('#'+evt).find('p').hide();
		source=$('#'+evt).data('backImg');
		document.getElementById('playSound').src=Utils.Path+'sounds/CorrectSound.mp3';
		document.getElementById('playSound').play();
		$('#'+evt).find('img').prop('src',source);
		$('#wrongimg1').prop('src',Utils.Path+'Images/happy-boy.png');
		$('#wrongimg2').prop('src',Utils.Path+'Images/happy-girl.png');
		$('#wrongImgDiv').show();
		$('#'+evt).removeClass('notClicked');
		setTimeout(function()
		{
			$('#'+evt).find('img').addClass('flip');
			setTimeout(function(){
				$('#wrongImgDiv').hide();
			},100);
		},800);
		$('#'+evt).css({'pointer-events': 'none'});
};


Recognize.answerIsWrong=function(evt)
{
		wrongImgArray=['backWrong1.png','backWrong2.png'];
		randomImg=Math.floor(Math.random()*wrongImgArray.length);
		document.getElementById('playSound').src=Utils.Path+'sounds/WrongSound.mp3';
		document.getElementById('playSound').play();
		$('#wrongimg1').prop('src',Utils.Path+'Images/sad-boy.png');
		$('#wrongimg2').prop('src',Utils.Path+'Images/sad-girl.png');
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
				$('#imgDiv'+i).find('img').prop('src',Utils.Path+'Images/'+wrongImgArray[randomImg]);
				$('#imgDiv'+i).find('img').show();
				$('#imgDiv'+i).find('p').hide();
				setTimeout(function(){
					$('#wrongImgDiv').hide();
				},100);
		},800);
};

Recognize.checkAns=function(evt)
{
	var source;
	Recognize.counter++;
	$('.slide').css({'pointer-events': 'none'});
	if($('#'+evt).data('answer')==$('#title').data('question'))
		Recognize.answerIsCorrect(evt);
	else
		Recognize.answerIsWrong(evt);

	Recognize.tempArray.splice(Recognize.randomQuestion,1);
	setTimeout(function()
	{
		if(Recognize.counter<4)
			Recognize.showQuestions();
		else
		{
			$('.slide').css({'pointer-events': 'none'});
			if(Recognize.correctAnswerCount>3)
				Recognize.setAttributes('Bell','LastImg');
			else
				Recognize.setAttributes('soundForWrong','joker');
		}
	},2000);	
}

Recognize.showNextQuestion=function()
{
		$("#myModal").fadeOut(1000);
		$('#playAgain').removeClass('blink_me');
		$('.slide').addClass('notClicked');
		setTimeout(function(){
			$('#soundDiv,#homeDiv').show();
			$('#divContainingSplitImages').css({'visibility':'visible'});
			Recognize.getGameData();
			Recognize.showQuestions();
			$('.notClicked').css({'pointer-events': 'auto'});
	},500);
};

Recognize.setAttributes=function(soundFile,showImage)
{
	
			$('#divContainingSplitImages').fadeOut(800);
			setTimeout(function()
			{
				$('#soundDiv,#homeDiv').hide();
				$('#divContainingSplitImages').css({'visibility':'hidden'});
				$('#myModal').fadeIn(800);
				$('#playAgain').hide();
				document.getElementById('playSound').src=Utils.Path+'sounds/'+soundFile+'.mp3';
				document.getElementById('playSound').play();
				$('#myModal').css({'background-Image':'url('+Utils.Path+'Images/'+showImage+'.jpg)'});
				setTimeout(function(){
					$('#divContainingSplitImages').fadeIn();
					$('#playAgain').show().addClass('blink_me');
					$('#myModal').css({'z-index':-1});
					$('#playAgain').css({'z-index':500});
				},1500);
			},800);
	
}