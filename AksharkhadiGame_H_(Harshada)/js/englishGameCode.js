var AksharKhadi={};
var Utils={};
Utils.Path='';

$(document).ready(function(){
	//Android.getPath('ICDSAksharkhadiGame');
	setTimeout(function(){
		AksharKhadi.setAllImages();
		AksharKhadi.init();
	},200);
});


AksharKhadi.setAllImages=function()
{
	$('#playGame').prop('src',Utils.Path+'Images/Aksharkhadi_Play.png');
	$('#home').prop('src',Utils.Path+'Images/Aksharkhadi_Home.png');
	$('#volume').prop('src',Utils.Path+'Images/Aksharkhadi_Sound.png');
	$('#next').prop('src',Utils.Path+'Images/Aksharkhadi_Next.png');
	$('#logo').prop('src',Utils.Path+'Images/logo.png');
};

AksharKhadi.init=function(){
	$('#playGame').text(AksharKhadi.hardCodeddata.play);
	$('#Flip').hide();
	$('#coverPage').show();
	$('#background').css({'backgroundImage':'url('+Utils.Path+'Images/Cover.jpg)'});
};

AksharKhadi.getGameDataAfterTimeOut=function()
{
	AksharKhadi.getGameData();
	setTimeout(function(){
		AksharKhadi.showQuestions();
	},1500);
}

AksharKhadi.getGameData=function()
{
	$('#background').css({'backgroundImage':"url('css/BG.jpg')"});
	$('#Flip').show();
	$('#coverPage,#wrongImgDiv').hide();
	var randomIndex=0,tempArray=[];
	AksharKhadi.counter=0,AksharKhadi.correctAnswerCount=0;
	AksharKhadi.arrOfSelectedWords=[];
	$('.optionForFlip').css({'display':'block'});
	$('.slide').css({'pointer-events': 'none'});
	$('.defaultImage').removeClass('flip');
	$('#lastGamePage,#divContainingFullImage').hide();
	$('#soundDiv,#homeDiv,#divContainingSplitImages').fadeIn('slow');
	AksharKhadi.arrOfSelectedWords=populate(AksharKhadi.wordsData,AksharKhadi.arrOfSelectedWords, 9);
	AksharKhadi.arrOfSelectedWords=shuffleArray(AksharKhadi.arrOfSelectedWords);
	AksharKhadi.tempArray=AksharKhadi.arrOfSelectedWords.slice();
	AksharKhadi.fillGrid();
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

AksharKhadi.playSoundAgain=function()
{
	document.getElementById('playSound').play();
	//Android.audioPlayer('ICDSBarakhadiGame/sounds/'+AksharKhadi.tempArray[AksharKhadi.randomQuestion]['sound']);
};

AksharKhadi.showQuestions=function(tempArray)
{

	AksharKhadi.randomQuestion=Math.floor(Math.random()*AksharKhadi.tempArray.length);
	$('#title').data('question',AksharKhadi.tempArray[AksharKhadi.randomQuestion]['word'].trim());
	document.getElementById('playSound').src=Utils.Path+'sounds/'+AksharKhadi.tempArray[AksharKhadi.randomQuestion]['sound'];
	document.getElementById('playSound').play();
	$('.slide').css({'pointer-events': 'auto'});
	//Android.audioPlayer('ICDSBarakhadiGame/sounds/'+AksharKhadi.tempArray[AksharKhadi.randomQuestion]['sound']);
}

AksharKhadi.fillGrid=function()
{
	var i=1,imagePath;
	AksharKhadi.randomImg=Math.floor(Math.random()*AksharKhadi.imageSet.length);
	for(var j=1;j<4;j++)
	{
		for(var k=0;k<3;k++)
		{
			AksharKhadi.randomQuestion=Math.floor(Math.random()*AksharKhadi.arrOfSelectedWords.length);
			$('#imgDiv'+(i-1)).data('answer',AksharKhadi.arrOfSelectedWords[AksharKhadi.randomQuestion]['word'].trim());
			imagePath=Utils.Path+''+AksharKhadi.imageSet[AksharKhadi.randomImg]['img'];
			$('#imgDiv'+(i-1)).data('backImg',imagePath+''+i+''+AksharKhadi.imageSet[AksharKhadi.randomImg]['type']);
			$('#imgDiv'+(i-1)).data('frontImg',Utils.Path+''+AksharKhadi.frontimageSet['img']+''+i+''+AksharKhadi.frontimageSet['type']);
			/*if(AksharKhadi.arrOfSelectedWords[AksharKhadi.randomQuestion]['img']=="none")
			{*/
				$('#option'+(i-1)).text(AksharKhadi.arrOfSelectedWords[AksharKhadi.randomQuestion]['word'].trim());
				$('#img'+j+'_'+k).hide();
			/*}
			else
			{
				$('#img'+j+'_'+k).prop('src','Images/'+AksharKhadi.arrOfSelectedWords[AksharKhadi.randomQuestion]['img']);
				$('#option'+(i-1)).hide();
			}*/
			i++;
			AksharKhadi.arrOfSelectedWords.splice(AksharKhadi.randomQuestion,1);
		}
	}	
}

AksharKhadi.checkAns=function(evt)
{
	var source,frontImg;
	AksharKhadi.counter++;
	$('.slide').css({'pointer-events': 'none'});
	wrongImgArray=['backWrong1.png','backWrong2.png'];
	if($('#'+evt).data('answer')==$('#title').data('question'))
	{
		AksharKhadi.correctAnswerCount++;
		$('#'+evt).find('img').show();
		$('#'+evt).find('p').hide();
		source=$('#'+evt).data('backImg');
		frontImg=$('#'+evt).data('frontImg');
		$('#'+evt).find('img').prop('src',frontImg);
		document.getElementById('playSound').src=Utils.Path+'sounds/CorrectAksharkhadi.mp3';
		document.getElementById('playSound').play();
		setTimeout(function()
		{
			setTimeout(function(){
				$('#'+evt).find('img').prop('src',source);
				$('#'+evt).find('img').addClass('flip');
			},900);
			
		},500);
	}	
	else
	{
		$('#'+evt).addClass("shake");
		randomImg=Math.floor(Math.random()*wrongImgArray.length);
		$('#wrongImgDiv').show();
		document.getElementById('playSound').src=Utils.Path+'sounds/wrongSoundAksharkhadi.mp3';
		document.getElementById('playSound').play();
		for(var i=0;i<9;i++)
		{
			if($('#title').data('question')==$('#imgDiv'+i).data('answer'))
			{
				var offsetOfImage=$('#imgDiv'+i).offset();
				break;
			}
		}

		$('#imgDiv'+i).find('img').prop('src',Utils.Path+'Images/'+wrongImgArray[randomImg]);
		$('#imgDiv'+i).find('img').show();
		$('#imgDiv'+i).find('p').hide();
		setTimeout(function()
		{
			setTimeout(function(){
				$('#'+evt).removeClass("shake");
				$('#wrongImgDiv').hide();
			},900);
			
		},500);
	}
	AksharKhadi.tempArray.splice(AksharKhadi.randomQuestion,1);
	setTimeout(function()
	{
		if(AksharKhadi.counter<9)
		{	
			AksharKhadi.showQuestions();
			$('.slide').css({'pointer-events': 'auto'});
		}
		else
		{
			$('.slide').css({'pointer-events': 'none'});
			if(AksharKhadi.correctAnswerCount>8)
			{
				setTimeout(function()
				{
					$('#divContainingSplitImages').fadeOut();
					$('#soundDiv,#homeDiv').hide();
					$('#div3').removeClass('col-xs-6 col-sm-6 col-md-6 col-lg-6 col-lg-offset-1 col-md-offset-1 col-sm-offset-2 col-xs-offset-2 left ');
					$('#div3').addClass('col-xs-8 col-sm-8 col-md-8 col-lg-8 col-lg-offset-2 col-md-offset-2 col-sm-offset-2 col-xs-offset-2 left ');
					$('#fullImage').prop('src',''+AksharKhadi.imageSet[AksharKhadi.randomImg]['completeImg']);
					$('#divContainingFullImage').show();
					$('#divContainingFullImage').addClass('magictime foolishIn');
					document.getElementById('playSound').src=Utils.Path+'sounds/Bell.mp3';
					document.getElementById('playSound').play();
					//Android.audioPlayer('ICDSBarakhadiGame/sounds/SoundForCorrect.mp3');
					//$('#title').text(AksharKhadi.imageSet[AksharKhadi.randomImg]['description']);
					setTimeout(function()
					{
						AksharKhadi.showNextQuestion();
					},4000);
				},500);
			}
			else
			{
				document.getElementById('playSound').src=Utils.Path+'sounds/soundForWrong.mp3';
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

AksharKhadi.showNextQuestion=function()
{
		$('#myModal').removeClass('magictime foolishIn');
		$("#myModal").fadeOut('slow');
		$('#div3').removeClass('col-xs-8 col-sm-8 col-md-8 col-lg-8 col-lg-offset-2 col-md-offset-2 col-sm-offset-2 col-xs-offset-2 left');
		$('#div3').addClass('col-xs-6 col-sm-6 col-md-6 col-lg-6 col-lg-offset-1 col-md-offset-1 col-sm-offset-2 col-xs-offset-2 left ');
		AksharKhadi.getGameData();
		AksharKhadi.showQuestions();
};