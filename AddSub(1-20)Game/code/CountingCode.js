var countingGame=[];
countingGame.totalItems =20;
countingGame.scoreCounter=0;
countingGame.gameCounter=0;
countingGame.foritems=0;

$( document ).ready(function() {

	$('.lblGot').html("&nbsp;"+countingGame.labels.lblGot);
	$('.lblHas').html("&nbsp;"+countingGame.labels.lblHas);
	$('.lblUnit').html("&nbsp;"+countingGame.labels.lblUnit);
	$('.lblTenth').html("&nbsp;"+countingGame.labels.lblTenth);
	$('.lblTotal').html("&nbsp;"+countingGame.labels.lblTotal);
	$('.lblPlayAgain').html("&nbsp;"+countingGame.labels.lblPlayAgain);
	$('.lblGameOver').html("&nbsp;"+countingGame.labels.lblGameOver);
	$('.lblAddition').html("&nbsp;"+countingGame.labels.lblAddition);
	$('.lblSubtract').html("&nbsp;"+countingGame.labels.lblSubtract);

	$("#submitAns").on('click', countingGame.checkAnswer);
	$("#giveBtn").on('click', countingGame.giveItems);
	$("#takeBtn").on('click', countingGame.takeItems);

	$(".backPress").on('click', countingGame.myBack);

	var hasItem
/* 
	for(i=0 ; i<=20; i++)
	{
		$('#giveItem'+i).hide();
		$('#hasItem'+i).hide();
	}
*/
	$('.gameScreen').hide();
	$('.gameOver').hide();
	
	$("#AnswerU").on("click", function(){
		$('.myButtons').attr('disabled',false);
	});
	
	$("#firstNumT, #firstNumU, #secondNumT, #secondNumU, #AnswerT, #AnswerU").off().on("focus", function(){
	   inputIn = $(this).prop('id');
	   console.log(inputIn);
	});

	$('.numPadBtnClr').on("click",function(){
		$("#"+inputIn).val("");
	});

	$(".numPadBtn").off().on("click", function(){
		 var t = $(this).text();
		 var y = $(this).html();
		 if($("#"+inputIn).val().split("").length < 2)
		 $("#"+inputIn).val(y);
	});
/* 
	$(".numPadBtn").off().on("click", function(){
		 var t = $(this).text();
		 var y = $(this).html();
		 if($("#"+inputIn).val().split("").length < 2)
		 $("#"+inputIn).val($("#"+inputIn).val()+""+y);
	});
 */
	$(".addLevel").on('click', function(){
		countingGame.currentLevel=0;
		countingGame.countingPath="/moving/add";
		$('.quesSign').html("+&nbsp;");
		$('.homeScreen').hide();
		$('.gameScreen').show();
		countingGame.startGame()
	});
	
	$(".subLevel").on('click', function(){
		countingGame.currentLevel=1;
		countingGame.countingPath="/moving/sub";
		$('.quesSign').html("-&nbsp;");
		$('.homeScreen').hide();
		$('.gameScreen').show();
		countingGame.startGame()
	});

});

function checkNo() {
    var x = $("#"+inputIn).val();
	var y = $("#"+inputIn).html();
	if($("#"+inputIn).val().split("").length == 1)
		countingGame.firstVal=x;
	if($("#"+inputIn).val().split("").length > 1)
		$("#"+inputIn).val(countingGame.firstVal);
}

countingGame.startGame = function(){
	$('.myButtons').attr('disabled',true);
	countingGame.Question=countingGame.getQuestion();
	countingGame.generateNumbers();
};

countingGame.getQuestion = function(){	
	
	var tempQues, tempno;
//	var nosQues=countingGame.Questions[countingGame.currentLevel].quesList.length;
	var nosQues=4;
	console.log("Array Len:"+nosQues);
	countingGame.randomNo=Math.floor(Math.random() * nosQues);
	tempno=countingGame.randomNo+1;
	countingGame.imgCharPath="images/Char"+tempno;
	console.log("QuesNo : "+tempno);
	console.log("Question : "+countingGame.Questions[countingGame.currentLevel].quesList[countingGame.randomNo].ques);
	console.log("Soundsrc : "+countingGame.Questions[countingGame.currentLevel].quesList[countingGame.randomNo].Soundsrc);
	countingGame.quesAudio=countingGame.Questions[countingGame.currentLevel].quesList[countingGame.randomNo].Soundsrc;
	tempQues=countingGame.Questions[countingGame.currentLevel].quesList[countingGame.randomNo].ques;	
	
	document.getElementById("charImg").src = countingGame.imgCharPath+"/charNormal.png";
	$("#hasItems").css("background-image", "url("+countingGame.imgCharPath+"/itemBg1.png)");
	$("#giveItems").css("background-image", "url("+countingGame.imgCharPath+"/itemBg2.png)");
	$(".cBody").css("background-image", "url("+countingGame.imgCharPath+"/bodyBg.png)");

	return tempQues;
}

countingGame.generateNumbers = function(){
	
	var nos=countingGame.Questions[0].numberRange;
	var firstNum,secondNum,Numbers;
	
	console.log("nos: "+nos);
	Numbers= nos.match(/[0-9]+/g).map(function(n) {
		return +(n);
	});
	
	countingGame.firstNum = Math.floor((Math.random() * Numbers[1]) + Numbers[0]);
	countingGame.secondNum = Math.floor((Math.random() * Numbers[1]) + Numbers[0]);
	
	countingGame.firstNumForTransfer = countingGame.firstNum;
	countingGame.secondNumForTransfer= countingGame.secondNum;

	if(countingGame.currentLevel == 0){
		countingGame.theAnswer = countingGame.firstNum + countingGame.secondNum;
		if( (countingGame.theAnswer > 20) || (countingGame.theAnswer < 11) ||  (countingGame.firstNum > 9) ||  (countingGame.firstNum == 1)){
			countingGame.generateNumbers();
		}
		else{
			console.log("NO 0 : "+countingGame.firstNum);
			console.log("NO 1 : "+countingGame.secondNum);
			console.log("Ans  : "+countingGame.theAnswer);
			countingGame.fillItems();
			countingGame.showQuestion();
		}
	}
	if(countingGame.currentLevel == 1){
		countingGame.theAnswer = countingGame.firstNum - countingGame.secondNum;
		if( (countingGame.theAnswer > 10) || (countingGame.theAnswer < 0) ||  (countingGame.firstNum < 10 ) ||  (countingGame.secondNum == 1) || (countingGame.secondNum >10) ){
			countingGame.generateNumbers();
		}
		else{
			console.log("NO 0 : "+countingGame.firstNum);
			console.log("NO 1 : "+countingGame.secondNum);
			console.log("Ans  : "+countingGame.theAnswer);
			countingGame.fillItems();
			countingGame.showQuestion();
		}
		
	}
};

countingGame.fillItems = function(){
	var num1 = countingGame.firstNum;
	var num2 = countingGame.secondNum;
	var hasItem="hasItem",giveItem,makeDiv,i,j, srcHasImg,srcGiveImg;
	
	if(countingGame.currentLevel == 0){
		for(i=1 ; i<=num1 ; i++){
			$("#hasItem"+i).show();
			srcHasImg="imgItem"+i;
			document.getElementById(srcHasImg).src = countingGame.imgCharPath+"/item.png";
			giveItem="giveItem"+i;
			countingGame.Position = $("#"+giveItem).position();
		}
		for(j=1 ; j<=20 ; j++){
			$("#giveItem"+j).show();
			srcGiveImg="imgAddItem"+j;
			document.getElementById(srcGiveImg).src = countingGame.imgCharPath+"/item.png";
		}
	}
	if(countingGame.currentLevel == 1){
		for(i=1 ; i<=num1 ; i++){
			$("#hasItem"+i).show();
			srcHasImg="imgItem"+i;
			document.getElementById(srcHasImg).src = countingGame.imgCharPath+"/item.png";
			giveItem="giveItem"+i;
			countingGame.Position = $("#"+giveItem).position();
		}
	}
};

countingGame.showQuestion = function(){

	console.log("---------> NO             0 : "+countingGame.firstNum);
	console.log("---------> NO             1 : "+countingGame.secondNum);
	console.log("---------> Ans              : "+countingGame.theAnswer);
	
	var startAudio,midAudio1,midAudio2,endAudio,num1Audio,num2Audio;
	
	startAudio="#gameSound";
	
	num1Audio = countingGame.numberAudio[countingGame.firstNum];
	num2Audio = countingGame.numberAudio[countingGame.secondNum];
	var i = 1, qFlag=0;
	var quesPath1= "Sounds/"+countingGame.quesAudio+""+1+".mp3";
	var quesPath3= "Sounds/"+countingGame.quesAudio+""+3+".mp3";
	var quesPath5= "Sounds/"+countingGame.quesAudio+""+5+".mp3";
	
	var arr = [quesPath1,num1Audio,quesPath3,num2Audio,quesPath5];
	
//	var audioDuration = Android.audioDuration();
	
//	Android.multipleAudio(arr);
	
/* */	
	$(startAudio).prop("src","Sounds/"+countingGame.quesAudio+""+i+".mp3");
	$(startAudio).trigger('play');
	
	$(startAudio).on('ended',function(){
		i=i+1;
		if(i <= 5){
			if( (i == 2) || (i == 4) ){
				if( qFlag == 0){
					$(startAudio).prop("src",num1Audio);
					qFlag=1;
				}
				else
					$(startAudio).prop("src",num2Audio);
			}
			else
				$(startAudio).prop("src","Sounds/"+countingGame.quesAudio+""+i+".mp3");
			
			$(startAudio).trigger('play');
		}
		else if(i == 6){
			$(".ansSubmit").attr('disabled',false);
		}
	});
/* */
	countingGame.Question= countingGame.Question.replace("_", countingGame.firstNum);
	countingGame.Question= countingGame.Question.replace("_", countingGame.secondNum);

	setTimeout(function(){
		$('.myButtons').attr('disabled',false);
	},7500);

	$("#displayQuestion").html(""+countingGame.Question);

};

countingGame.giveItems = function(){
	var j;
	
	$('.myBtn').attr('disabled',true);
	document.getElementById("charImg").src = countingGame.imgCharPath+countingGame.countingPath+"/charCounting.gif";
	
	setTimeout(function(){
		$('.myBtn').attr('disabled',false);
		document.getElementById("charImg").src = countingGame.imgCharPath+"/charNormal.png";
	},1000);
	
	if(countingGame.currentLevel == 0){
		countingGame.firstNumForTransfer++;
		var i = countingGame.firstNumForTransfer;
		var k = countingGame.secondNumForTransfer;

		if(i<=20){
			var tick="#gameSound";
			$(tick).prop("src","Sounds/tick.mp3");
			$(tick).trigger('play');
			
			$("#hasItem"+i).show();
			srcHasImg="imgItem"+i;
			document.getElementById(srcHasImg).src = countingGame.imgCharPath+"/item.png";

			if(i == 10)
			{
				$('#bunchSentence').html(countingGame.labels.lblBunchOfTen);
				$(".myBtn").attr('disabled',true);
				$("#AnswerT").addClass("changeColor");
				var no=i, numAudio="#gameSound";
				$(numAudio).prop("src","Sounds/number/"+no+".mp3");
				$(numAudio).trigger('play');
				for(j=1;j<=10;j++){
					$('#imgItem'+j).addClass("shake-constant");
				}
				setTimeout(function(){
				$(".myBtn").attr('disabled',false);
					$("#AnswerT").removeClass("changeColor");
					for(j=1;j<=10;j++){
						$('#imgItem'+j).removeClass("shake-constant");
					}
				},2000);
				
			}
			giveItem="giveItem"+countingGame.totalItems;
			$("#"+giveItem).hide();
			countingGame.totalItems=countingGame.totalItems-1;
			
			countingGame.scoreCounter=countingGame.scoreCounter+1;
			$('#scoreCounter').html(""+countingGame.scoreCounter);
		}
		else{
			countingGame.firstNumForTransfer--;
		}
	}
	if(countingGame.currentLevel == 1){
		
		if(countingGame.foritems > 0){
			countingGame.firstNumForTransfer=countingGame.firstNumForTransfer+1;
			var i = countingGame.firstNumForTransfer;
			
			var tick="#gameSound";
			$(tick).prop("src","Sounds/tick.mp3");
			$(tick).trigger('play');

			$("#hasItem"+i).show();
			srcHasImg="imgItem"+i;
			document.getElementById(srcHasImg).src = countingGame.imgCharPath+"/item.png";

			if(i == 10)
			{
				$('#bunchSentence').html("Bunch Of 10");
				$(".myBtn").attr('disabled',true);
				$("#AnswerT").addClass("changeColor");
				var no=i, numAudio="#gameSound";
				$(numAudio).prop("src","Sounds/number/"+no+".mp3");
				$(numAudio).trigger('play');
				for(j=1;j<=10;j++){
					$('#imgItem'+j).addClass("shake-constant");
				}
				setTimeout(function(){
					$(".myBtn").attr('disabled',false);
					$("#AnswerT").removeClass("changeColor");
					for(j=1;j<=10;j++){
						$('#imgItem'+j).removeClass("shake-constant");
					}
				},2000);
				
			}

			var giveItem="giveItem"+countingGame.foritems;
			$("#"+giveItem).hide();
			countingGame.foritems--;

			countingGame.scoreCounter=countingGame.scoreCounter-1;
			$('#scoreCounter').html(""+countingGame.scoreCounter);
		}
		
	}
};

countingGame.takeItems = function(){

	$('.myBtn').attr('disabled',true);
	document.getElementById("charImg").src = countingGame.imgCharPath+countingGame.countingPath+"/charCounting.gif";
	
	setTimeout(function(){
		$('.myBtn').attr('disabled',false);
		document.getElementById("charImg").src = countingGame.imgCharPath+"/charNormal.png";
	},1000);
	
	if(countingGame.currentLevel == 0){
		var i = countingGame.firstNumForTransfer;
		
		if(i > countingGame.firstNum){

			var tick="#gameSound";
			$(tick).prop("src","Sounds/tick.mp3");
			$(tick).trigger('play');
			
			$("#hasItem"+i).hide();

			if(i-- == 11)
			{
				$('#bunchSentence').html("Bunch Of 10");
				$(".myBtn").attr('disabled',true);
				$("#AnswerT").addClass("changeColor");
				var no=i, numAudio="#gameSound";
				$(numAudio).prop("src","Sounds/number/"+no+".mp3");
				$(numAudio).trigger('play');
				for(j=1;j<=10;j++){
					$('#imgItem'+j).addClass("shake-constant");
				}
				setTimeout(function(){
					$(".myBtn").attr('disabled',false);
					$("#AnswerT").removeClass("changeColor");
					for(j=1;j<=10;j++){
						$('#imgItem'+j).removeClass("shake-constant");
					}
				},2000);
			}
			
			countingGame.totalItems=countingGame.totalItems+1;
			var giveItem="giveItem"+countingGame.totalItems;
			$("#"+giveItem).show();
			document.getElementById(giveItem).src = countingGame.imgCharPath+"/item.png";
			
			countingGame.scoreCounter=countingGame.scoreCounter-1;
			$('#scoreCounter').html(""+countingGame.scoreCounter);
			countingGame.firstNumForTransfer=countingGame.firstNumForTransfer-1;
		}
	}
	if(countingGame.currentLevel == 1){
		var i = countingGame.firstNumForTransfer;
		
		if(i > 0){
			var tick="#gameSound";
			$(tick).prop("src","Sounds/tick.mp3");
			$(tick).trigger('play');

			$("#hasItem"+i).hide();
			
			if(i-- == 11)
			{
				$('#bunchSentence').html("Bunch Of 10");
				$(".myBtn").attr('disabled',true);
				//$("#AnswerT").addClass("changeColor");
				//$("#AnswerT").val(0);
				var no=i, numAudio="#gameSound";
				$(numAudio).prop("src","Sounds/number/"+no+".mp3");
				$(numAudio).trigger('play');
				for(j=1;j<=10;j++){
					$('#imgItem'+j).addClass("shake-constant");
				}
				setTimeout(function(){
					$(".myBtn").attr('disabled',false);
					$("#AnswerT").removeClass("changeColor");
					for(j=1;j<=10;j++){
						$('#imgItem'+j).removeClass("shake-constant");
					}
				},2000);
			}

			countingGame.foritems++;
			var giveItem="giveItem"+countingGame.foritems;
			$("#"+giveItem).show();
			document.getElementById("imgAddItem"+countingGame.foritems).src = countingGame.imgCharPath+"/item.png";

			countingGame.scoreCounter=countingGame.scoreCounter+1;
			$('#scoreCounter').html(""+countingGame.scoreCounter);
			countingGame.firstNumForTransfer=countingGame.firstNumForTransfer-1;
		}
		
	}

};
countingGame.myBack = function(){
	window.location.href="index.html"
}

countingGame.checkAnswer = function(){
	
	var i,userAnswer; 
	var userFirstNum , userSecondNum;
	
	if( ($("#firstNumT").val() )=='' )
		userFirstNumT = 0;
	else
		userFirstNumT = $("#firstNumT").val();
		
	if( ($("#secondNumT").val() )=='' )
		userSecondNumT = 0;
	else
		userSecondNumT = $("#secondNumT").val();
	
	if( ($("#AnswerT").val() )=='' )
		userAnswerT = 0;
	else
		userAnswerT = $("#AnswerT").val();

	
	userFirstNumU = $("#firstNumU").val();
	userSecondNumU = $("#secondNumU").val();
	userAnswerU = $("#AnswerU").val();
	
	userFirstNum = ( Number(userFirstNumT) * 10 ) + Number(userFirstNumU);
	userSecondNum = ( Number(userSecondNumT) * 10 ) + Number(userSecondNumU);
	userAnswer = ( Number(userAnswerT) * 10 ) + Number(userAnswerU);
	
	var scoreCounter = $("#scoreCounter").text();
	
	
	if( (userAnswer == countingGame.theAnswer) && (userFirstNum ==  countingGame.firstNum) && (userSecondNum == countingGame.secondNum) &&  (scoreCounter == userSecondNum) ){
		countingGame.gameCounter++;
		
		var mySound="#gameSound";
		$(mySound).prop("src","Sounds/correctsound.mp3");
		$(mySound).trigger('play');
		document.getElementById("charImg").src = countingGame.imgCharPath+"/charHappy.gif";

		$('.monkeyImg').addClass("shake-constant");
		$("#AnswerT").addClass("changeColorAns");
		$("#AnswerU").addClass("changeColorAns");

		if( countingGame.gameCounter < 1 ){
			setTimeout(function(){
				for(i=0 ; i<=20; i++)
				{
					$('#giveItem'+i).hide();
					$('#hasItem'+i).hide();
				}
				$('#bunchSentence').html("");
				$("#firstNumT").val("");
				$("#firstNumU").val("");
				$("#secondNumT").val("");
				$("#secondNumU").val("");
				$("#AnswerT").val("");
				$("#AnswerU").val("");
				countingGame.scoreCounter=0;
				$("#scoreCounter").html(countingGame.scoreCounter);

				$("#AnswerT").removeClass("changeColorAns");
				$("#AnswerU").removeClass("changeColorAns");
				$('.monkeyImg').removeClass("shake-constant");
				$(".addNoAnswer").removeClass("changeColorAns");
				$(".addNoAnswer").removeClass("changeColor");
				$(".ansSubmit").attr('disabled',true);
				countingGame.totalItems=20;
				countingGame.startGame();
			},2000);
		}
		else{
			setTimeout(function(){
				$('.gameScreen').hide();
				$('.gameOver').show();
			},2000);
		}
	}
	else{
		var mySound="#gameSound";
		$(mySound).prop("src","Sounds/wrongsound.mp3");
		$(mySound).trigger('play');

		$('.myBtn').attr('disabled',true);
		document.getElementById("charImg").src = countingGame.imgCharPath+"/charWrong.gif";
		setTimeout(function(){
			$('.myBtn').attr('disabled',false);
			document.getElementById("charImg").src = countingGame.imgCharPath+"/charNormal.png";
		},2000);
	}
};

/****************************************** Animate Function - Used To Auto Animate The Items ******************************************
countingGame.animateItems = function(){
	
	var bTop,bLeft,basketPosition,i,flag1,move=178,giveItem,pos;
	var num1 = countingGame.firstNum;
	var num2 = countingGame.secondNum;
	pos=countingGame.Position.left+180;
	
	var tOut,tempi=countingGame.firstNum+1;
	var i=tempi,j=1;
	countingGame.tempNum=countingGame.firstNum
	countingGame.timeOut=700;
	countingGame.flg=0;
	
	setTimeout(function(){
		myloop();
		myloop2()
	},countingGame.timeOut);

	function myloop2(){
		giveItem="giveItem"+j;
		$("#"+giveItem).hide();
		j++;
		if( j<=countingGame.secondNum ){
			setTimeout(function(){
				myloop2();
			},countingGame.timeOut);
		}
	}
	function myloop(){
		$("#hasItem"+i).show();
		srcHasImg="imgItem"+i;
		document.getElementById(srcHasImg).src = countingGame.imgCharPath+"/item.png";
		i++;
		var tick=$("#gameSound");
		$(tick).prop("src","Sounds/tick.mp3");
		$(tick).trigger('play');

		if(i<=countingGame.theAnswer){
			countingGame.tempNum++;
			if(countingGame.flg == 1){
				countingGame.timeOut=700
			}
			if(countingGame.tempNum == 10)
			{
				$(".addNoAnswer").	addClass("changeColor");
				$("#Answer").val("1 ");
				var no=i-1, numAudio=$("#gameSound");
				$(numAudio).prop("src","Sounds/number/"+no+".mp3");
				$(numAudio).trigger('play');
				countingGame.timeOut=3000;
				countingGame.flg=1;
			}
			setTimeout(function(){
				myloop();
			},countingGame.timeOut);
		}
	}

	tOut2=(countingGame.secondNum*700)+2700;
	tOut=(countingGame.secondNum*700)+5200;

	setTimeout(function(){
		$("#Answer").val(countingGame.theAnswer);
		$(".addNoAnswer").addClass("changeColorAns");
		var numAudio=$("#gameSound");
		$(numAudio).prop("src","Sounds/number/"+countingGame.theAnswer+".mp3");
		$(numAudio).trigger('play');
	},tOut2);
	
	
	setTimeout(function(){
		for(i=0 ; i<=20; i++)
		{
			$('#giveItem'+i).hide();
			$('#hasItem'+i).hide();
		}
		$("#firstNum").val("");
		$("#secondNum").val("");
		$("#Answer").val("");

		$('.monkeyImg').removeClass("shake-constant");
		$(".addNoAnswer").removeClass("changeColorAns");
		$(".addNoAnswer").removeClass("changeColor");
		$(".ansSubmit").attr('disabled',true);
		countingGame.startGame();
	},tOut);	
};
****************************************** Animate Function - Used To Auto Animate The Items ******************************************/