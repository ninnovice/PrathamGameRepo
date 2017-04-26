var dhoom={};
var resultFunctions={};
dhoom.level5Flag=0;
dhoom.initialCopLeftPosition=2;
dhoom.initialCopMarkerBottomPosition=5;
dhoom.initialThiefMarkerBottomPosition=25;
dhoom.gameCounter=0;
dhoom.quesCounter=0;
dhoom.score=0;
dhoom.randomPrevious1=0, dhoom.randomPrevious2=0, dhoom.randomPrevious3=0;
dhoom.questionNumber=0;
dhoom.totalMarks=50;
dhoom.scoredMarks;
dhoom.currentLevel=0;
dhoom.thiefWhilee = 0;
dhoom.wrongAnsCounter=0;
dhoom.wrongAnsCounter2=0;
dhoom.correctAnsCounter=0;
dhoom.primeArray=[2,3,5,7,11];
var Utils={};

$( document ).ready(function() {
	Utils.Path="";
/* 
    setTimeout(function(){
        Android.getPath("DhoomICDS");
    },100);
 */
    //dhoom.setLabels();
    setTimeout(function(){
        dhoom.initialHiddenDivs();
        dhoom.addMediaSources();
        },10);

	$('.svgSizeClass').css("width","200px");
	
/* 	var a = document.getElementById("alphasvg");
	//it's important to add an load event listener to the object, as it will load the svg doc asynchronously
	a.addEventListener("load",function(){
		var svgDoc = a.contentDocument; //get the inner DOM of alpha.svg
		var svgRoot  = svgDoc.documentElement;

		var delta = svgDoc.getElementById("svgSection1");
                // add behaviour
            delta.css("fill", "#8BC34A");
		//now we can query stuff with jquery like this
		//note that we pass in the svgRoot as the context node!
		//$("foo bar",svgRoot);
    },false);

 */	
//	var svgNoData1 = Math.floor((Math.random() * 4) + 1);
//	var svgNoData2 = Math.floor((Math.random() * 4) + 1);
//	dhoom.SvgImage1=dhoom.svgData[svgNoData1-1].svgName;
//	dhoom.SvgImage2=dhoom.svgData[svgNoData2-1].svgName;
	// dhoom.triangleSvgImage=;
	
	//dhoom.svgData

		//$('#tempDiv').html(dhoom.svgData[0].svgName);
	
//	setTimeout(function(){
//		$('polygon').click(function(){
//			var forFill=($(this).attr('id'));
//			$('#'+forFill).css("fill", "rgba(255, 255, 255, 0.40)");
//			$(this).css("fill", "rgba(255, 255, 255, 0.40)");
			
//		});
//	},1000);
	
//	$('#circleSvgDiv');
/*	var x = Math.floor((Math.random() * 6) + 1);
	var cntr=sqX=x;
	
	console.log(x);
	
	$("#btnToggle").click(function(){
		$("#svgSquare").toggle();
	});
	
	$('.svgSizeClass').css("width","100%");
	while(cntr != 0){
		if(sqX>8)
			sqX=1			
		var sqId=".squareSection"+sqX;
		$(sqId).css("fill", "rgba(255, 255, 255, 0.40)");
		sqX++;
		cntr--;
	}

	for(i=1;i<=x;i++){
		var svgid=".circleSection"+i;
		$(svgid).css("fill", "rgba(255, 255, 255, 0.40)");
	}
*/	
	$("#test").splitFlap({
		text:''+dhoom.score,
		speed:90
	});

	dhoom.vehiclePosition = { 0 : 'myCopCycle', 1 : 'myCopHorse', 2 : 'myCopBike', 3 : 'myCopCopter'};
	dhoom.vehiclePosition2 = { 0 : 'myCopCycle2', 1 : 'myCopHorse2', 2 : 'myCopBike2', 3 : 'myCopCopter2'};

	$(".ansBtns").on('click', dhoom.checkAnswer);
	$(".ansBtns").prop('disabled',true);

    dhoom.playIntroVideo();
	$(".playButton").on('click', dhoom.startGame);

});

dhoom.setLabels= function(){
	$('.instructionsLBL').html(""+dhoom.Labels.instructionsLBL);
	$('.ModalInstructions').html(""+dhoom.Labels.ModalInstructions);
	$('.lblInstructionsBtn').html(""+dhoom.Labels.InstructionsBtn);
	$('.lblPlayBtn').html(""+dhoom.Labels.PlayBtn);
	$('.CloseBtn').html(""+dhoom.Labels.CloseBtn);
	$('.scoreLbl').html(""+dhoom.Labels.scoreLbl);
	$('.replayLbl').html(""+dhoom.Labels.replayLbl);
	$('.gameName').html(""+dhoom.Labels.gameName);
}

dhoom.initialHiddenDivs= function(){
	$('#gamePlayButton,.forIntroHide,.CopWin,.CriminalWin,.midHide2,.forHide,#mapOuter,.thiefLookingBehind').hide();
}

dhoom.addMediaSources = function(){
    $('.copCycleImg').prop("src",Utils.Path+"images/CopCycle.gif");
    $('.copHorseImg').prop("src",Utils.Path+"images/CopHorse.gif");
    $('.copBikeImg').prop("src",Utils.Path+"images/CopBike.gif");
    $('.copCopterImg').prop("src",Utils.Path+"images/CopCopter.gif");
    $('.thiefLookingAhead').prop("src",Utils.Path+"images/ThiefBike.gif");
    $('.thiefLookingBehind').prop("src",Utils.Path+"images/ThiefBike2.gif");
    $('.mapBGImg').prop("src",Utils.Path+"images/mapBG.jpg");
    $('.copMarkerImg').prop("src",Utils.Path+"images/copMarker.png");
    $('.thiefMarkerImg').prop("src",Utils.Path+"images/thiefMarker.png");
    $('.airportMarkerImg').prop("src",Utils.Path+"images/airportMarker.png");
    $('.PrisonMarkerImg').prop("src",Utils.Path+"images/PrisonMarker.png");
    $('.copImg').prop("src",Utils.Path+"images/Cop.png");
    $('.criminalImg').prop("src",Utils.Path+"images/Criminal.png");
    $('.sadCopImg').prop("src",Utils.Path+"images/sadCop.png");
    $('.happyCriminalImg').prop("src",Utils.Path+"images/happyCriminal.png");
    $('#frameDivider').prop("src",Utils.Path+"images/BodyBG.jpg");
    $('#mapOuter').prop("src",Utils.Path+"images/mapBG.jpg");
    $('.border').prop("src",Utils.Path+"images/divBG.jpg");
    $('.roadRotate').css("background-image", "url("+Utils.Path+"images/RoadBg0.gif)");
    $('.roadRotate2').css("background-image", "url("+Utils.Path+"images/RoadBg1.gif)");
    $('#controlRoomSection').css("background-image", "url("+Utils.Path+"images/BodyBG.jpg)");
    $('#chaseCam').css("background-image", "url("+Utils.Path+"images/RoadBg0.gif)");
    $('#mapView').css("background-image", "url("+Utils.Path+"images/mapBG.jpg)");


}

dhoom.playIntroVideo = function(){
	$("#"+dhoom.vehiclePosition2[dhoom.currentLevel]).show();

	$('#gameVideo').show();
//	Android.showVideo("DhoomICDS/Videos/DhoomIntro.mp4",null);
	$('#gameVid').prop("src","Videos/DhoomIntro.mp4");
	setTimeout(function(){
		$('#gameVideo').hide();
		$('#gamePlayButton').show();
	},12000);
	
}

dhoom.startGame= function(){
	$('#gamePlayButton').hide();
	$('.forIntroHide').show();
	dhoom.playBackgroundAudio();
	dhoom.enterCharacters();
	dhoom.thiefToNextWindow();
}

dhoom.playBackgroundAudio=function(){
	dhoom.myAudio = new Audio(Utils.Path+'soundFile/BackgroundTrack.mp3');
	dhoom.myAudio.addEventListener('ended', function() {
		this.currentTime = 0;
		this.play();
	}, false);
	dhoom.myAudio.play();
}

dhoom.enterCharacters=function(){
	$(".mainBg").css("background-image", "url("+Utils.Path+"images/BodyBG.jpg)");

	setTimeout(function(){
		$("#"+dhoom.vehiclePosition[dhoom.currentLevel]).animate({
			left: dhoom.initialCopLeftPosition+"%"
		},2000);
		$("#myThief").animate({
			left: 20+"%"
		},1500);
		$("#myCopCycle").animate({
			left: 8+"%"
		},2000);
	}, 500);
}

dhoom.thiefToNextWindow=function(){
	setTimeout(function(){
		dhoom.playGameSound(Utils.Path+"soundFile/ThiefBike.mp3");

		$('.thiefLookingAhead').hide();
		$('.thiefLookingBehind').show();
		setTimeout(function(){
			$('.thiefLookingBehind').hide();
			$('.thiefLookingAhead').show();
		},1000);

		setTimeout(function(){
			if(dhoom.thiefWhilee == 0)
			{
				dhoom.thiefWhilee = 1;
				$("#myThief").css({'-webkit-transform' : 'rotate(-30deg)','-moz-transform' : 'rotate(-30deg)','-ms-transform' : 'rotate(-30deg)','transform' : 'rotate(-30deg)'});
			}
			$("#myThief").animate({
				left: 65+'%',
			},1200);
			setTimeout(function(){
				$("#myThief").css({'-webkit-transform' : 'rotate(0deg)','-moz-transform' : 'rotate(0deg)','-ms-transform' : 'rotate(0deg)','transform' : 'rotate(0deg)'});
			},800);
		},700);
	
	
	/*** Call to Generate Question */
		setTimeout(function(){
			dhoom.generateQuestion();
			$('#BottomSection').show();
		},2200);
	},3000);
}

dhoom.playGame = function(){
	window.location.href='index.html';
};

dhoom.playGameSound=function(path){
	document.getElementById('gameSound').src = path;
	document.getElementById('gameSound').play();

}

dhoom.showControlRoom=function(){
	
	$(".ansBtns").prop('disabled',true);
	setTimeout(function(){

		dhoom.playGameSound(Utils.Path+"soundFile/PoliceSirenShort.mp3");

		$("#"+dhoom.vehiclePosition2[dhoom.currentLevel]).removeClass('forHide');
		$("#"+dhoom.vehiclePosition2[dhoom.currentLevel]).show();

		$(".forHide").hide();
		setTimeout(function(){ $("#"+dhoom.vehiclePosition[dhoom.currentLevel]+"2").addClass('forHide'); },1000);

		$('.midHide1').hide();
		$('.midHide2').show();
		
		dhoom.mergAndShowBackgrounds();
		
		setTimeout(function(){
			$('.midHide2').hide();
			$('.midHide1').show();
		},3200);
		$(".ansBtns").prop('disabled',false);
	},1900);
};

dhoom.switchBackgrounds=function(){
	dhoom.chorbg=dhoom.currentLevel+1;
	document.getElementById("roadRotate2").style.backgroundImage = "url("+Utils.Path+"images/RoadBg"+dhoom.chorbg+".gif)";
	document.getElementById("roadRotate").style.backgroundImage = "url("+Utils.Path+"images/RoadBg"+dhoom.currentLevel+".gif)";
	document.getElementById("chaseCam").style.backgroundImage = "url("+Utils.Path+"images/RoadBg"+dhoom.currentLevel+".gif)";
}

dhoom.moveCopVehicle=function(){

	setTimeout(function(){
		$(".move").css({'-webkit-transform' : 'rotate(0deg)','-moz-transform' : 'rotate(0deg)','-ms-transform' : 'rotate(0deg)','transform' : 'rotate(0deg)'});
	},500);

	$(".move").animate({
		left: -50+'%'
	},2000);
	$("#"+dhoom.vehiclePosition[dhoom.currentLevel]).removeClass('move');
	$("#"+dhoom.vehiclePosition[dhoom.currentLevel]).animate({
		left: dhoom.initialCopLeftPosition+"%"
	},400);
	setTimeout(function(){	$("#"+dhoom.vehiclePosition[dhoom.currentLevel]).addClass('move'); },100);
}

dhoom.checkLevel= function(){

	if( (dhoom.gameCounter > 17) || ((dhoom.currentLevel == 3) && (dhoom.quesCounter > 2)) ){
		dhoom.playVideosAndEndGame();
	}
	if ( (dhoom.correctAnsCounter > 1) && (dhoom.quesCounter > 2) && (dhoom.currentLevel <3 ) ){

		dhoom.questionNumber=0;
		dhoom.correctAnsCounter=0;
		dhoom.wrongAnsCounter=0;
		dhoom.randomPrevious1=0, dhoom.randomPrevious2=0;
		dhoom.quesCounter=0;
		dhoom.tempQuesId=0;

		dhoom.currentLevel+=1;
		
		dhoom.moveCopVehicle();

		if (dhoom.currentLevel != 3)
			dhoom.switchBackgrounds();
		else if (dhoom.currentLevel==3)
			dhoom.showControlRoom();
	}
/*	else if( (dhoom.wrongAnsCounter >= 3) && (dhoom.quesCounter > 4) && (dhoom.currentLevel > 0) ) {

		dhoom.questionNumber=0;
		dhoom.correctAnsCounter=0;
		dhoom.wrongAnsCounter=0;
		dhoom.randomPrevious1=0, dhoom.randomPrevious2=0;
		dhoom.quesCounter=0;
		dhoom.tempQuesId=0;

		document.getElementById("roadRotate2").style.backgroundImage = "url("+Utils.Path+"images/RoadBg"+dhoom.currentLevel+".gif)";
		dhoom.currentLevel-=1;
		document.getElementById("roadRotate").style.backgroundImage = "url("+Utils.Path+"images/RoadBg"+dhoom.currentLevel+".gif)";
		if (dhoom.currentLevel != 3)
			dhoom.switchBackgrounds();
		else if ( (dhoom.currentLevel==2) && (dhoom.level5Flag == 1))
			dhoom.showControlRoom();
		dhoom.moveCopVehicle();
	}
*/
	
};

dhoom.mergAndShowBackgrounds = function(){
	//---------- Merging Backgrounds ----------//

	if( (dhoom.currentLevel == 3) && (dhoom.level5Flag == 0) ){
		document.getElementById("roadRotate2").style.backgroundImage = "url("+Utils.Path+"images/RoadBg"+dhoom.currentLevel+".gif)";
		$('#roadImage2,#frameDivider').hide();
		$('#roadImage,#roadRotate').css("width","100%");
		$('.roadRotate').css("background-size","100% 350px");
		dhoom.level5Flag=1;
	}
	if( (dhoom.currentLevel == 2) && (dhoom.level5Flag == 1) ){
		dhoom.initialCopLeftPosition=3;
		setTimeout(function(){
			$('#roadImage2,#frameDivider').show();
			$('#roadImage').css("width","45%");
			dhoom.level5Flag=0;
		},1500);
	}
	else{
		dhoom.chorbg=dhoom.currentLevel+1;
		document.getElementById("roadRotate2").style.backgroundImage = "url("+Utils.Path+"images/RoadBg"+dhoom.chorbg+".gif)";
	}
	document.getElementById("roadRotate").style.backgroundImage = "url("+Utils.Path+"images/RoadBg"+dhoom.currentLevel+".gif)";
	document.getElementById("chaseCam").style.backgroundImage = "url("+Utils.Path+"images/RoadBg"+dhoom.currentLevel+".gif)";
	//-----------------------------------------//
}

dhoom.playVideosAndEndGame=function(){
	var winFlag=0, vidTimeout=7500;
	dhoom.scoredMarks=0;
	$(".endHide").hide();
	$('#gameVideo').show();
	$(".mainBg").css("background-image", "url("+Utils.Path+"images/BodyBG.jpg)");

	if( (dhoom.gameCounter > 17) && (dhoom.score > 85) )
		winFlag=1;
	else if( (dhoom.gameCounter > 17) && (dhoom.score < 85) )
		vidTimeout=8800;

	if(winFlag == 1){
//    	Android.showVideo("DhoomICDS/Videos/CopWin.mp4",null);
		$('#gameVid').prop("src",Utils.Path+"Videos/CopWin.mp4");
		setTimeout(function(){
			$('#gameVideo').hide();
			$('#mapOuter').show();
			$("#mapOuter").css("marginLeft","35%");
            $(".mainBg").css("background-image", "url("+Utils.Path+"images/BodyBG.jpg)");
			$("#myMap").css("height","auto");


			$("#mapOuter").animate({
				height: "90%",
				width: "25%"
			},100);

			$("#copMarker").animate({
				bottom: 40+'%'
			},1000);

			$("#thiefMarker").animate({
				bottom: 50+'%'
			},1000);

			setTimeout(function(){
				$("#thiefMarker").animate({
					left: 70+'%',
					bottom: 63+'%'
				},1000);
			},1800);
			setTimeout(function(){
				$("#copMarker").animate({
					left: 70+'%',
					bottom: 40+'%'
				},1000);
			},1800);

			setTimeout(function(){
				$('.GameDiv').hide();
				$('.CopWin').show();
				$('#test1').html(""+dhoom.score);
                $(".mainBg").css("background-image", "url("+Utils.Path+"images/BodyBG3.jpg)");
			},4200);
		},vidTimeout);
	}
	else{
//    	Android.showVideo("DhoomICDS/Videos/ThiefWin.mp4",null);
		$('#gameVid').prop("src",Utils.Path+"Videos/ThiefWin.mp4");
		setTimeout(function(){
			$('#gameVideo').hide();
			$('#mapOuter').show();
			$("#mapOuter").css("marginLeft","35%");
            $(".mainBg").css("background-image", "url("+Utils.Path+"images/BodyBG.jpg)");
			$("#myMap").css("height","auto");


			$("#mapOuter").animate({
				height: "90%",
				width: "25%"
			},100);

			setTimeout(function(){
				$("#thiefMarker").animate({
					bottom: 65+'%',
					left: 10+'%'
				},1000);
				$("#copMarker").animate({
					bottom: 50+'%'
				},600);
			},2000);

			setTimeout(function(){$("#thiefMarker").hide();},3200);
			setTimeout(function(){
				$("#airportMarker").animate({
					left: 100+'%',
					bottom: 110+'%'
				},2000);
			},3800);
			setTimeout(function(){
				$('.GameDiv').hide();
				$('.CriminalWin').show();
                $(".mainBg").css("background-image", "url("+Utils.Path+"images/BodyBG3.jpg)");
				$('#test2').html(""+dhoom.score);
			},5800);
		},vidTimeout);
	}
}

dhoom.generateQuestion= function(){
     var i=0, len = 5;	
	/*--------X--------X-------- Level Check --------X--------X--------*/

	dhoom.checkLevel();

	dhoom.getQuestionData();

	/*--------X--------X-------- Score And Position End Part --------X--------X--------*/
	
	/*--------X--------X-------- Generating Questions --------X--------X--------*/

	dhoom.firstNum= dhoom.lowerBound.match(/[0-9]+/g).map(function(n) {
		return +(n);
	});

	dhoom.secondNum= dhoom.upperBound.match(/[0-9]+/g).map(function(n) {
		return +(n);
	});

/* 	dhoom.thirdNum= dhoom.thirdBound.match(/[0-9]+/g).map(function(n) {
		return +(n);
	}); */

	dhoom.getRandomNumbers();

	console.log("ques : "+dhoom.tempQues)
	console.log("currentLevel : "+dhoom.currentLevel+" Current Ques: "+ dhoom.questionNumber)
	console.log("1 Range- Lower: "+dhoom.firstNum[0]+" Upper: "+dhoom.firstNum[1])
	console.log("2 Range- Lower: "+dhoom.secondNum[0]+" Upper: "+dhoom.secondNum[1])

	console.log("N1 : "+dhoom.firstRandomNumber+" N2 : "+dhoom.secondRandomNumber );


 	/*--------X--------X-------- Checking Calculating Answer According to the level --------X--------X--------*/

	dhoom.tempAnswer = dhoom.difficulty[dhoom.currentLevel].quesList[dhoom.questionNumber]["type"](dhoom.firstRandomNumber, dhoom.secondRandomNumber);

	dhoom.displayQuestion = dhoom.tempQues;
	for(; i<len; i++){
		dhoom.displayQuestion = dhoom.displayQuestion.replace("_", eval(dhoom.difficulty[dhoom.currentLevel].quesList[dhoom.questionNumber].format[i]));
	}



	/*--------X--------X-------- Displaying The Questions --------X--------X--------*/

	$(".ansBtns").prop('disabled',false);
	console.log("DA: "+dhoom.displayAnswer + " CA:"+dhoom.correctAns);
	console.log("ans : "+dhoom.correctAns);

/*----------------------------------------------------------------------------------------------*/ //$("#currentLevel").html(""+dhoom.currentLevel);
	$("#question").html(dhoom.displayQuestion).addClass('magictime puffIn');
	setTimeout(function(){	$("#question").removeClass('magictime puffIn'); },1000);

	/*--------X--------X-------- Thief Looking Behind and going to next frame --------X--------X--------*/

	$('.thiefLookingAhead').hide();
	$('.thiefLookingBehind').show();
	setTimeout(function(){
		$('.thiefLookingBehind').hide();
		$('.thiefLookingAhead').show();
	},1000);

	dhoom.gameCounter++;
//	dhoom.questionNumber++;

};


//---------------------X---------------------X---------------------X---------------------X---------------------/&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&/

dhoom.svgEqual=function(firstNumber, secondNumber){
	
	var SvgImage1, SvgShape1, fracNo1;
	
	fracNo1=dhoom.fractions[firstNumber];
	fracNo2=dhoom.fractions[secondNumber];

	if(dhoom.questionNumber == 3){
		fracNo1=firstNumber;
		fracNo2=secondNumber;
		cntr3=sqX3=firstNumber+secondNumber;
	}

	SvgImage1=dhoom.svgData[0].svgName;
	SvgShape1=dhoom.svgData[0].svgShape;

	SvgImage2=dhoom.svgData[1].svgName;
	SvgShape2=dhoom.svgData[1].svgShape;

	SvgImage3=dhoom.svgData[2].svgName;
	SvgShape3=dhoom.svgData[2].svgShape;
	
	
//	console.log("SVG-----------:>"+SvgImage1);
//	console.log("SHAPE-----------:>"+SvgShape1);

	var cntr1=sqX1=fracNo1;
	var cntr2=sqX2=fracNo2;

	dhoom.firstRandomNumber= '<div class="col-xs-2 col-lg-2 col-md-2" style="margin-left:20%;">'+SvgImage1+'</div>';


	setTimeout(function(){
		dhoom.fillSvgShape(cntr1,sqX1,SvgShape1);
	},1000);
	
	if(dhoom.questionNumber == 0){
	dhoom.displayAnswer= '<div class="col-xs-2 col-lg-2 col-md-2">'+SvgImage2+'</div>';
		if(dhoom.forDisplayAnswer == 1){
			dhoom.displayAnswer= '<div class="frac"> <span>'+ fracNo1 + ' </span><span class="symbol">/</span><span class="bottom">8</span></div>';
			dhoom.correctAns = dhoom.displayAnswer;
		}
		else{
			var tempNum=fracNo1+1;
			dhoom.displayAnswer= '<div class="frac"> <span>'+ tempNum + ' </span><span class="symbol">/</span><span class="bottom">8</span></div>';
			dhoom.correctAns = 1;
		}
	}
	else if(dhoom.questionNumber == 1){
		
	dhoom.displayAnswer= '<div class="col-xs-2 col-lg-2 col-md-2" style="margin-left:1%;" >'+SvgImage2+'</div>';
		if(dhoom.forDisplayAnswer == 1){
			setTimeout(function(){
				dhoom.fillSvgShape(cntr1,sqX1,SvgShape2);
			},1000);
			dhoom.correctAns = dhoom.displayAnswer;
		}
		else{
			setTimeout(function(){
				dhoom.fillSvgShape(cntr2,sqX2,SvgShape2);
			},1000);
			dhoom.correctAns = 0;
		}
	}
	else if(dhoom.questionNumber == 2){
		var tempSwitch
	dhoom.displayAnswer= '<div class="col-xs-2 col-lg-2 col-md-2" style="margin-left:1%;">'+SvgImage2+'</div>';
		setTimeout(function(){
			dhoom.fillSvgShape(cntr2,sqX2,SvgShape2);
		},1000);
		if(dhoom.forDisplayAnswer == 1){
			if(fracNo1<fracNo2){
				tempSwitch=dhoom.firstRandomNumber;
				dhoom.firstRandomNumber=dhoom.displayAnswer;
				dhoom.displayAnswer=tempSwitch;
			}
			dhoom.correctAns = dhoom.displayAnswer;
		}
		else{
			if(fracNo1>fracNo2){
				tempSwitch=dhoom.firstRandomNumber;
				dhoom.firstRandomNumber=dhoom.displayAnswer;
				dhoom.displayAnswer=tempSwitch;
			}
			dhoom.correctAns = 1;
		}
	}
	else if(dhoom.questionNumber == 3){
		dhoom.secondRandomNumber= '<div class="col-xs-2 col-lg-2 col-md-2" style="margin-left:0%;">'+SvgImage2+'</div>';
		dhoom.displayAnswer= '<div class="col-xs-3 col-lg-3 col-md-3" style="margin-left:1%;">'+SvgImage3+'</div>';

		dhoom.correctAns = dhoom.displayAnswer;
		console.log("------------------------------------------------");
		console.log('======> '+dhoom.forDisplayAnswer);
		console.log("------------------------------------------------");
		setTimeout(function(){
			if(dhoom.forDisplayAnswer != 0){
				cntr3--;
				sqX3--;
				dhoom.correctAns = 0;
			}
			dhoom.fillSvgShape(cntr2,sqX2,SvgShape2);
			dhoom.fillSvgShape(cntr3,sqX3,SvgShape3);
		},1000);
	}

	return dhoom.displayAnswer;
}

dhoom.fillSvgShape=function(cntr,sqX,SvgShape){
	while(cntr != 0){
		if(sqX>8)
			sqX=1			
		var sqId="."+SvgShape+"Section"+sqX;
		$(sqId).css("fill", "rgba(255, 255, 255, 0.40)");
		sqX++;
		cntr--;
	}
}
dhoom.equal=function(firstNumber, secondNumber){
	
	dhoom.CAnswer = dhoom.nosWithSpelling[firstNumber]

	if(dhoom.forDisplayAnswer == 1)
		dhoom.displayAnswer = dhoom.correctAns = dhoom.nosWithSpelling[firstNumber];
	else{
		dhoom.displayAnswer = dhoom.nosWithSpelling[secondNumber];
		dhoom.correctAns = 1;
	}
}

dhoom.equalObjects=function(firstNumber, secondNumber){
	var Marble="";
	for(a=1;a<=firstNumber;a++){
		Marble+='<img height="35" width="35" src="'+Utils.Path+'images/marble.png">&nbsp;&nbsp;';
	}
	dhoom.firstRandomNumber= ''+ Marble;	

	if(dhoom.forDisplayAnswer == 1){
		dhoom.displayAnswer = dhoom.correctAns = 0;
		dhoom.secondRandomNumber=firstNumber;
	}
	else{
		dhoom.displayAnswer = 0;
		dhoom.correctAns = 1;
	}
}

dhoom.mod=function(firstNumber, secondNumber){

	dhoom.CAnswer = secondNumber % firstNumber;

	if (dhoom.CAnswer == 0){
		dhoom.displayAnswer = dhoom.correctAns = 1;
	}
	else {
		dhoom.displayAnswer = dhoom.displayAnswer-2;
		dhoom.correctAns = 1;
	}
		return dhoom.displayAnswer;
};

dhoom.multiply=function(firstNumber, secondNumber){
	
	dhoom.firstRandomNumber=firstNumber*10;
	dhoom.secondRandomNumber=secondNumber*10;
	
	dhoom.displayAnswer=dhoom.correctAns = dhoom.firstRandomNumber * dhoom.secondRandomNumber;

	if(dhoom.forDisplayAnswer != 1){
		dhoom.makeWrong = 1;
		dhoom.displayAnswer = dhoom.correctAns + dhoom.makeWrong;
	}

	return dhoom.displayAnswer;
};

dhoom.evenOdd=function(firstNumber, secondNumber){
	if(dhoom.forDisplayAnswer==1){
		if (firstNumber % 2 == 0){
			dhoom.displayAnswer = dhoom.correctAns = dhoom.nosOddEven[1];
			return dhoom.displayAnswer;
		}
		else {
			dhoom.displayAnswer = dhoom.correctAns = dhoom.nosOddEven[2];
			return dhoom.displayAnswer;
		}
	}
	else{
		if (firstNumber % 2 == 0){
			dhoom.correctAns = dhoom.nosOddEven[1];
			dhoom.displayAnswer= dhoom.nosOddEven[2];
			return dhoom.displayAnswer;
		}
		else {
			dhoom.correctAns = dhoom.nosOddEven[2];
			dhoom.displayAnswer= dhoom.nosOddEven[1];
			return dhoom.displayAnswer;
		}
	}
};

dhoom.splitNumber=function(firstNumber, secondNumber){
	var remainder=0, counter=3, noSplitArr =["dummy","dummy","dummy"];

	while(firstNumber != 0)
	{
		remainder = Math.floor(firstNumber%10);
		noSplitArr[counter]=remainder;
		firstNumber = Math.floor(firstNumber/10);
		counter++;
	}
	
	dhoom.displayAnswer = dhoom.correctAns = noSplitArr[dhoom.questionNumber];

	if(dhoom.forDisplayAnswer==0)
		dhoom.displayAnswer=dhoom.displayAnswer+1;

	return dhoom.displayAnswer;
}

dhoom.lessThan=function(firstNumber, secondNumber){
	if (firstNumber < secondNumber){
		dhoom.displayAnswer = dhoom.correctAns = 1;
	}
	else {
		dhoom.displayAnswer =0;
		dhoom.correctAns = 1;
	}
	dhoom.firstRandomNumber=firstNumber;
	dhoom.secondRandomNumber=secondNumber;
	return dhoom.displayAnswer;
};

dhoom.greaterThan=function(firstNumber, secondNumber){
	if (firstNumber > secondNumber){
		dhoom.displayAnswer = dhoom.correctAns = 1;
	}
	else {
		dhoom.displayAnswer =0;
		dhoom.correctAns = 1;
	}
	dhoom.firstRandomNumber = firstNumber;
	dhoom.secondRandomNumber= secondNumber;
	return dhoom.displayAnswer;
};

dhoom.addition = function (firstNumber, secondNumber){

	var makeTen= Math.floor((Math.random() * 2) + 1);
	var tenMulti=100;
	
	if(dhoom.currentLevel==2){
		if(makeTen==1)
			tenMulti=10;
		
	dhoom.firstRandomNumber=firstNumber*tenMulti;
	dhoom.secondRandomNumber=secondNumber*tenMulti;
	}

	dhoom.displayAnswer = dhoom.correctAns = dhoom.firstRandomNumber + dhoom.secondRandomNumber;
	if(dhoom.forDisplayAnswer != 1){
		var forWrong= Math.floor((Math.random() * 10) + 1);
		dhoom.displayAnswer=dhoom.correctAns + forWrong;
	}

	return dhoom.displayAnswer;
};

dhoom.substraction = function (firstNumber, secondNumber){
	var temp;
	
	if(firstNumber<secondNumber){
		temp=firstNumber;
		firstNumber=secondNumber;
		secondNumber=temp;
	}
		

	dhoom.forSubs= Math.floor((Math.random() * (6 - 2)) + 2 );

	dhoom.firstRandomNumber=firstNumber;
	dhoom.secondRandomNumber=secondNumber;

	dhoom.correctAns = firstNumber - secondNumber;
	
	if(dhoom.forDisplayAnswer==1){
		dhoom.displayAnswer=dhoom.correctAns;
	}
	else{
		var tempAns = dhoom.correctAns+dhoom.forSubs;
		dhoom.displayAnswer=tempAns;
		dhoom.correctAns=0;
	}
	return dhoom.displayAnswer;
}


//---------------------X---------------------X---------------------X---------------------X---------------------/&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&/


dhoom.getRandomNumbers= function(){

	dhoom.forDisplayAnswer = Math.floor((Math.random() * 2) + 0);
//	dhoom.forDisplayAnswer = 1;

	dhoom.tempRandomNum1 = Math.floor((Math.random() * (dhoom.firstNum[1] - dhoom.firstNum[0])) + dhoom.firstNum[0] );
	dhoom.tempRandomNum2 = Math.floor((Math.random() * (dhoom.secondNum[1] - dhoom.secondNum[0])) + dhoom.secondNum[0] );

	if(dhoom.currentLevel == 0){
		if(dhoom.tempRandomNum1 == dhoom.tempRandomNum2)
			dhoom.getRandomNumbers();
	}
	else if( (dhoom.currentLevel == 3) && (dhoom.questionNumber==3) && ( (dhoom.tempRandomNum1+dhoom.tempRandomNum2)>8 ) ){
		dhoom.getRandomNumbers();
	}
	else{
		if ( (dhoom.randomPrevious1 == dhoom.tempRandomNum1) || (dhoom.randomPrevious2 == dhoom.tempRandomNum2) || (dhoom.tempRandomNum1 == dhoom.tempRandomNum2))
			dhoom.getRandomNumbers();
	}

	dhoom.firstRandomNumber = dhoom.tempRandomNum1;
	dhoom.secondRandomNumber = dhoom.tempRandomNum2;
	dhoom.randomPrevious1 = dhoom.tempRandomNum1;
	dhoom.randomPrevious2 = dhoom.tempRandomNum2;

};

	/*--------X--------X-------- Genrating The Question and Related Data --------X--------X--------*/

dhoom.getQuestionData = function(){

	dhoom.quesCounter++;
	dhoom.questionNumber = Math.floor((Math.random() * dhoom.difficulty[dhoom.currentLevel].NosOfQues) + 0);
	if( dhoom.questionNumber == dhoom.prevQuestion )
		dhoom.getQuestionData();
	else{
		//console.log("Question And Its Data:------------------------- "+dhoom.difficulty[dhoom.currentLevel].quesList[dhoom.questionNumber].ques);
		dhoom.tempQues=dhoom.difficulty[dhoom.currentLevel].quesList[dhoom.questionNumber].ques;
		dhoom.lowerBound=dhoom.difficulty[dhoom.currentLevel].quesList[dhoom.questionNumber].firstRange;
		dhoom.upperBound=dhoom.difficulty[dhoom.currentLevel].quesList[dhoom.questionNumber].secondRange;
		//dhoom.thirdBound=dhoom.difficulty[3].addRange;
		dhoom.prevQuestion = dhoom.questionNumber;
	}
};


dhoom.checkAnswer= function(){

	$(".ansBtns").attr('disabled',true);

	if( ($(this).hasClass("correctBtn") && (dhoom.correctAns == dhoom.displayAnswer)) || ($(this).hasClass("wrongBtn") && (dhoom.correctAns != dhoom.displayAnswer)) ){
		dhoom.correctAnsCounter+=1;

		console.log("correctAnsCntr: "+dhoom.correctAnsCounter);
		console.log("wrongAnsCntr: "+dhoom.wrongAnsCounter);

		dhoom.playGameSound(Utils.Path+"soundFile/CorrectAns.mp3");

		setTimeout(function(){
            if(dhoom.currentLevel===0){
				dhoom.playGameSound(Utils.Path+"soundFile/BicycleHorn.mp3");
            }
            else if(dhoom.currentLevel===1){
				dhoom.playGameSound(Utils.Path+"soundFile/HorseRun.mp3");
            }
            else if(dhoom.currentLevel === 2){
				dhoom.playGameSound(Utils.Path+"soundFile/BikeRevs.mp3");
            }
            else{
				dhoom.playGameSound(Utils.Path+"soundFile/CopterRevs.mp3");
            }
	    	dhoom.moveCopForward();
    	},1000);

    	dhoom.scoredMarks=dhoom.scoredMarks+10;
		dhoom.score+=10;
		$("#test").splitFlap({
			text:''+dhoom.score,
			speed:50
		});
	}
	else {
		dhoom.playGameSound(Utils.Path+"soundFile/WrongAns.mp3");

		setTimeout(function(){
			dhoom.playGameSound(Utils.Path+"soundFile/ThiefBike2.mp3");
            $("#myThief").css({'-webkit-transform' : 'rotate(-20deg)','-moz-transform' : 'rotate(-20deg)','-ms-transform' : 'rotate(-20deg)','transform' : 'rotate(-20deg)'});
            setTimeout(function(){
                $("#myThief").css({'-webkit-transform' : 'rotate(0deg)','-moz-transform' : 'rotate(0deg)','-ms-transform' : 'rotate(0deg)','transform' : 'rotate(0deg)'});
            },500);
		},1500);

		dhoom.wrongAnsCounter+=1;
		dhoom.scoredMarks=dhoom.scoredMarks+0;
		dhoom.score+=0;

		$("#test").splitFlap({
			text:''+dhoom.score,
			speed:50
		});

		console.log("correctAnsCntr: "+dhoom.correctAnsCounter);
		console.log("wrongAnsCntr: "+dhoom.wrongAnsCounter);
	}

    setTimeout(function(){
        dhoom.generateQuestion();
        $(".ansBtns").attr('disabled',false);
    },1400);

};

dhoom.moveCopForward= function() {
	if(dhoom.currentLevel == 3 )
		$("#"+dhoom.vehiclePosition[dhoom.currentLevel]).css({'-webkit-transform' : 'rotate(20deg)','-moz-transform' : 'rotate(20deg)','-ms-transform' : 'rotate(20deg)','transform' : 'rotate(20deg)'});
	else
		$("#"+dhoom.vehiclePosition[dhoom.currentLevel]).css({'-webkit-transform' : 'rotate(-30deg)','-moz-transform' : 'rotate(-30deg)','-ms-transform' : 'rotate(-30deg)','transform' : 'rotate(-30deg)'});

	if(dhoom.currentLevel==3){
		if(dhoom.initialCopLeftPosition < 35){
			dhoom.initialCopLeftPosition= dhoom.initialCopLeftPosition+5;
			$("#"+dhoom.vehiclePosition[dhoom.currentLevel]).animate({
				left: dhoom.initialCopLeftPosition+"%"
			});
		}
	}
	setTimeout(function(){
		$("#"+dhoom.vehiclePosition[dhoom.currentLevel]).css({'-webkit-transform' : 'rotate(0deg)','-moz-transform' : 'rotate(0deg)','-ms-transform' : 'rotate(0deg)','transform' : 'rotate(0deg)'});
	},500);
};