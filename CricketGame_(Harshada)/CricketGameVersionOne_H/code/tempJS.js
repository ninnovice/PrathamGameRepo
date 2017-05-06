var number=0,answerFlag=0,pid,timer,stopTimer,seconds=8,randomshot,selectedPlayerList=[],playerData=[],ctx,canvas,flag=0,chooseRandomDecimalInteger,chooseRandomDecimalInteger2;
var arrayOfRandomNumbers1=[],arrayOfRandomNumbers2=[],stopTimerFromCalling=0,trueOrfalse;
var stopped=0,playerScore=0,over,ballsInOneOver=0,strikeRate,noOfCorrectAnswers,tempLength,TotalBallsToBePlayed,hardQuestions=0;
var numberClicked=0,C,randomIndex=0,randomAnimation,arrayOfAnimations=[];
var arrayof3CorrectNumbers=[],arrayOfFinal4Options=[],lengthOfArray,p1,p2,score=0,tempJSON,randomPlayer,randomRuns,ballsPlayedByFirstPlayer,randomWickets,RemainingBalls=0;
var startAngle=0;
var endAngle=30,AnswerFlag=0;
var questionlevel=0,flagHit4=0,flagHit6=0,flagShowButtonDiv=0,flagHitSingleRun=0,dummyPlayerScore=0,ballsPlayedBySecondPlayer,playSoundInAndroid;
var resId=2000,questionId=0,totalMarks=40,startTime,scoredMarks=10,dummyPlayer;
var arrayOfSoundsForSingleRun=[],arrayOfSoundsForTwoRuns=[],arrayOfSoundsForFourRuns=[],arrayOfSoundsForSixRuns=[],arrayOfSoundsOfOut=[];
arrayOfSoundsForSingleRun=["sound/single1.mp3",'sound/single2.mp3','sound/single3.mp3','sound/single4.mp3'];
arrayOfSoundsForTwoRuns=['sound/two1.mp3','sound/two2.mp3','sound/two3.mp3','sound/two5.mp3','sound/two6.mp3','sound/two7.mp3'];
arrayOfSoundsForFourRuns=['sound/four1.mp3','sound/four2.mp3','sound/four3.mp3'];
arrayOfSoundsForSixRuns=['sound/six1.mp3','sound/six2.mp3','sound/six3.mp3','sound/four3.mp3'];
arrayOfSoundsOfOut=['sound/out1.mp3','sound/out2.mp3','sound/out3.mp3','sound/out4.mp3','sound/out5.mp3'];
var arrayOfSecondNumber=[1,10,20],showOnlyOnce=0,player,tempNumber=0;

function getInitialData()
{	
	var z = new Image(); 
	z.src = CricketDataDependingUponLanguage['backgroundImage'];
	document.body.background= z.src;
	document.getElementById('howToPlayGame').innerHTML=CricketDataDependingUponLanguage['howToPlayGameTitle'];
	document.getElementById('pp1').innerHTML=CricketDataDependingUponLanguage['titleForInstructions'];
	document.getElementById('pp2').innerHTML=CricketDataDependingUponLanguage['singleRun'];
	document.getElementById('pp3').innerHTML=CricketDataDependingUponLanguage['twoRuns'];
	document.getElementById('pp4').innerHTML=CricketDataDependingUponLanguage['fourRuns'];
	document.getElementById('pp5').innerHTML=CricketDataDependingUponLanguage['sixRuns'];
}


function passResourceId()
{
	passResId('CricketGame.html?resId='+resId);
}

function passIdToCoverPage(){
	passResId('CricketGameCoverPage.html?resId='+resId);
}

function Init()
{
	tempJSON=cricketers.slice();
	document.getElementById("choosePlayers").src=CricketDataDependingUponLanguage['choosePlayer'];
	$('#optionDiv').hide();
	$('#scoreBoard').hide();
	$('#answerDiv').hide();
	$("#showOnStrikePlayer").hide();
	$('#buttondiv').hide();
	$('#myCanvas').hide();
	$('#divshowingCricketBall').hide();
	$('#showFieldChangedMessageDiv').hide();
	$('#divShowingGameFinishedMessge').hide();
	$("body").css("background-image","url(images/Back.png)");
	ChooseAnimation();
	canvas = document.getElementById("myCanvas");
	ctx = canvas.getContext("2d");
}


function showInstructions()
{
	$("body").css("background-image","url(images/Back.png)");
	$('#instructions').show();
	$('#howToPlayGame').hide();
	$('#playCricketGame').hide();
	$('#play').show();
}


function ChooseAnimation()
{
	arrayOfAnimations=["swap","twisterInDown","twisterInUp","openDownLeftRetourn","openUpLeftRetourn","slideDownRetourn","slideUpRetourn","swashIn","tinDownIn","boingInUp"];
	randomAnimation=Math.floor((Math.random() *arrayOfAnimations.length) + 0);
}

function addDivs()
{	
	var noOfPlayers=cricketers.length;
	var firstDiv=document.getElementById("firstdiv");
	for(var i=0;i<4;i++)
	{
		randomPlayer=Math.floor((Math.random() *tempJSON.length) + 0);
		var newDiv=document.createElement("div");
		newDiv.className="col-lg-3 col-md-3 col-xs-3 col-sm-3";
		newDiv.style="margin-top:20px;"
		var newImg=document.createElement("img");
		newImg.className="img-responsive";
		newImg.id=""+i;
		newImg.src=tempJSON[randomPlayer]['source'];
		newImg.title=tempJSON[randomPlayer]['Name'];
		newImg.style.cursor="pointer";

		$(newImg).click(function()
		{
			pid=$(this);

			var titleofPlayer=$(pid).attr('title');
			for (var i=0 ; i < cricketers.length ; i++)
			{
			    if (cricketers[i]["Name"] == titleofPlayer)
			        playerData.push(cricketers[i]);
			}
			$('#divShowingPlayers').hide();
			$('#divshowingCricketBall').show();	
			$('#divshowingCricketBall').addClass('magictime puffIn');
			$('#scoreBoard').show();
			$('#answerDiv').hide();
			displayNameOfPlayerAndShowScore();
			chooseNumbersForFirstRing();
			chooseNumbersForSecondRing();
			document.getElementById('startingSound').src="sound/Stedium crowd.mp3";
			document.getElementById('startingSound').loop=true;
			document.getElementById('startingSound').play();
		})
		newDiv.appendChild(newImg);
		firstDiv.appendChild(newDiv);
		$('#'+i).addClass('magictime');
		$('#'+i).addClass(arrayOfAnimations[randomAnimation]);
		tempJSON.splice(randomPlayer,1);
	}
}

function showLastPageInfoOfPlayer()
{
	$('#divshowingCricketBall').hide();
	$('#backToHomeIcon').hide();
	$("body").css("background-image","url(images/Back.png)");
	document.getElementById("info1").innerHTML=playerData[0]['FullName'];
	document.getElementById("info3").innerHTML=playerScore;
	document.getElementById("info5").innerHTML=ballsPlayedByFirstPlayer;
	document.getElementById("info7").innerHTML=strikeRate.toFixed(2);
	document.getElementById("info8").innerHTML=playerData[0]['country'];
	document.getElementById("info9").innerHTML=randomRuns+"/"+""+randomWickets;
	document.getElementById("lastpageImg").src=playerData[0]['LastImgSource'];
	if(playerScore>=100)
		document.getElementById("Lastmessage").innerHTML="Congratulations!! You won.";
	else 
		document.getElementById("Lastmessage").innerHTML="Oops!! You lost.";
}

function playerCompletedCentury()
{
	$('#divshowingCricketBall').hide();
	$('#backToHomeIcon').hide();
	$("body").css("background-image","url(images/Back.png)");
	document.getElementById("info1").innerHTML=playerData[0]['FullName'];
	document.getElementById("info3").innerHTML=playerScore;
	document.getElementById("info5").innerHTML=ballsPlayedByFirstPlayer;
	document.getElementById("info7").innerHTML=strikeRate.toFixed(2);
	document.getElementById("info8").innerHTML=playerData[0]['country'];
	document.getElementById("info9").innerHTML=randomRuns+"/"+""+randomWickets;
	document.getElementById("lastpageImg").src=playerData[0]['source'];
}

function showTimer() 
{   
	ctx.clearRect(0,0, canvas.width, canvas.height);
	var x=canvas.width/2;
	var y=canvas.height/2;
	
	//      x    y   rad sAng eAng antiC  line    fill
	stopTimer=setInterval(function()
	{	
		drawArc(x,y,50, startAngle,endAngle, false, "#FF4500");
		startAngle=endAngle;
		endAngle=endAngle+30;
	},1000);
}

function drawArc(x, y,r,startAngle, endAngle,anticlockwise,lineColor,fillColor)
{
	var sAngle = startAngle * (Math.PI/180);
	var eAngle = endAngle   * (Math.PI/180);
	var r = r;
	ctx.strokeStyle = lineColor;
	ctx.fillStyle   = fillColor;
	ctx.lineWidth   =100;
	ctx.beginPath();
	ctx.arc(x, y,r,sAngle, eAngle,anticlockwise);
	ctx.stroke();
	if(startAngle>=315)
	{
		clearInterval(stopTimer);
		stopTimer=0;
		showDotBall();
		//chooseRandomShot();
		//when we want to choose any random shot
	}
}

function showDotBall()
{
	setTimeout(function()
	{
		trueOrfalse="true";
		ctx.clearRect(0,0, canvas.width, canvas.height);
		$('#myCanvas').hide();
		answerClicked("",trueOrfalse);
	},100);
}

function chooseRandomShot()
{
	randomshot=Math.floor((Math.random()*3)+1);
	var buttonClicked="btnno"+randomshot;
	var evtChild=$("#"+buttonClicked).children("p").prop("id");
	document.getElementById(buttonClicked).style.background="red";
	document.getElementById(buttonClicked).classList.add("shake");
	setTimeout(function(){
		ctx.clearRect(0,0, canvas.width, canvas.height);
		$('#myCanvas').hide();
		answerClicked(buttonClicked);
		document.getElementById(buttonClicked).style.background="";
		document.getElementById(buttonClicked).classList.remove("shake");
	},1800);
	
}
function displayNameOfPlayerAndShowScore()
{
	$("body").css("background-image","url("+playerData[0]['answerImages']['startingPosition']+")");
	player=playerData[0]['Name'];
	var country=playerData[0]['country'];
	dummyPlayer=playerData[0]['dummyPlayer'];
	dummyPlayerScore=Math.floor((Math.random() *20) + 20);
	ballsPlayedBySecondPlayer=Math.floor((Math.random() *15) + 15);
	over=47;
	TotalBallsToBePlayed=(50-over)*6;
	randomRuns=Math.floor((Math.random() *60) + 220);
	ballsPlayedByFirstPlayer=Math.floor((Math.random() *20) + 45);
	randomWickets=Math.floor((Math.random() *3) + 5);
	playerScore=Math.floor((Math.random() *10) +60);
	strikeRate=(playerScore*100)/ballsPlayedByFirstPlayer;
	document.getElementById("nameOfPlayer").innerHTML=""+player;
	document.getElementById("nameOfCountry").innerHTML=""+country;
	document.getElementById("dummyPlayer").innerHTML=""+dummyPlayer;
	document.getElementById("runs").innerHTML=""+randomRuns+"/"+""+randomWickets;
	document.getElementById("dummyPlayerScore").innerHTML=""+dummyPlayerScore+"("+ballsPlayedBySecondPlayer+")";
	document.getElementById("playerScore").innerHTML=""+playerScore+"("+ballsPlayedByFirstPlayer+")*";
	document.getElementById("TotalOver").innerHTML=""+over;
	document.getElementById("showStrikeRate").innerHTML=""+strikeRate.toFixed(2);
}

function getURLParameter(name) 
{
	return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null
}	
function chooseAnimation()
{
	arrayOfAnimations=["swap","twisterInDown","twisterInUp","openDownLeftRetourn","openUpLeftRetourn","slideDownRetourn","slideUpRetourn","swashIn","tinDownIn","boingInUp"];
	randomAnimation=Math.floor((Math.random() *arrayOfAnimations.length) + 0);
}

//function to show random number on smaller side
function chooseNumbersForFirstRing()
{
	ctx.clearRect(0,0, canvas.width, canvas.height);
	$('#myCanvas').hide();
	$( '.poster1').not("#d1").hide();
	$( '.poster2').not("#d13").hide();
	
	if((flagHit4>=2)||(flagHit6>=2)||((flagHit4>=1)&&(flagHit6>=1)))
	{
		if(questionlevel!==3)
		{
			questionlevel++;
			flagHit4=0;
			flagHit6=0;
			//flagShowButtonDiv=1;
		}
	}
	/*if(playerScore>=90)
	{
		showOnlyOnce++;
		if(showOnlyOnce===1)
		{
			$('#divshowingCricketBall').hide();
			$('#buttondiv').hide();
			$('#showFieldChangedMessageDiv').show();		
			
			flagShowButtonDiv=1;
			setTimeout(function()
			{
				
				$('#showFieldChangedMessageDiv').hide();
				$('#divshowingCricketBall').show();
				$("#StopTheWheel").prop("disabled",false);
				$('#StopTheWheel').addClass('magictime swashIn');
				//$('#buttondiv').show();
			},3000);
			
		}
	}*/
	if(RemainingBalls<TotalBallsToBePlayed)
	{
		/*if(flagShowButtonDiv==1)
		{
			setTimeout(function()
			{
				$("#buttondiv").show();
				flagShowButtonDiv=0;
			},4000);
		}
		else*/
			$("#buttondiv").show();

		RemainingBalls++;
		$("#answerDiv").hide();
		$("#smalldiv").show();
		$("#largediv").show();
		$("#optionDiv").hide();
		var noOfRandomNumbers1=0;
		chooseRandomDecimalInteger=Math.floor(Math.random()*2+0);
		while(noOfRandomNumbers1<12)
		{	
			if(questionlevel==0)
			{
				number=Math.floor((Math.random() * 12) + 2);//number between 2 and 13
			}
			if(questionlevel==1)
			{
				number=Math.floor((Math.random() * 15) + 10);//number between 10 and 25
			}
			if(questionlevel==2)
			{
				number=Math.floor((Math.random() *15) + 10);//number between 10 and 25
			}
			if(questionlevel==3)
			{
				//number=Math.floor((Math.random() *12) + 2);//number between 2 and 13
				number=((Math.random() *19) + 2).toFixed(1);
			}
			if(noOfRandomNumbers1!==0)
			{
				while($.inArray(number,arrayOfRandomNumbers1)>=0)
				{
					if(questionlevel==0)
					{
						number=Math.floor((Math.random() * 12) + 2);
					}
					if(questionlevel==1)
					{
						number=Math.floor((Math.random() * 15) + 10);//number between 10 and 25
					}
					if(questionlevel==2)
					{
						number=Math.floor((Math.random() *15) + 10);//number between 10 and 25
					}
					if(questionlevel==3)
					{
						//number=Math.floor((Math.random() *12) + 2);//number between 2 and 13
						number=((Math.random() * 19) + 2).toFixed(1);
					}
				}
				arrayOfRandomNumbers1.push(number);
			}
			else
				arrayOfRandomNumbers1.push(number);
			noOfRandomNumbers1++;
		}
	}
	/*else
	{
		showLastPageInfoOfPlayer();
	}*/
	
}

function showAllNumbersOnWheel()
{
	var countForFirst=1;
	var countForSecond=13;
	while(countForFirst<=12)
	{
		document.getElementById("p"+countForFirst).innerHTML=arrayOfRandomNumbers1[countForFirst-1];
		countForFirst++;
	}
	while(countForSecond<=24)
	{
			document.getElementById("p"+countForSecond).innerHTML=arrayOfRandomNumbers2[countForSecond-13];
			countForSecond++;
	}
}

function chooseNumbersForSecondRing()
{	
	var noOfRandomNumbers2=0;
	while(noOfRandomNumbers2<12)
	{
		if(questionlevel==0||questionlevel==1)
			number=Math.floor((Math.random() * 12) + 2);//number between 2 and 13

		if(questionlevel==2)
			number=Math.floor((Math.random() *15) + 10);//number between 10 and 25

		if(questionlevel==3)
		{
			number=Math.floor((Math.random()*arrayOfSecondNumber.length)+0);
			number=arrayOfSecondNumber[number];
			//number=((Math.random() * 14) + 2).toFixed(1);// decimal number between 2 and 17
		}
			
		if(noOfRandomNumbers2!==0)
		{
			if(questionlevel!==3)
			{
				while($.inArray(number,arrayOfRandomNumbers2)>=0)
				{
					if(questionlevel==0||questionlevel==1)
					{
						number=Math.floor((Math.random() * 12) + 2);//number between 2 and 13
					}
					if(questionlevel==2)
					{
						number=Math.floor((Math.random() *15) + 10);//number between 10 and 25
					}
					if(questionlevel==3)
					{
						number=((Math.random() * 14) + 2).toFixed(1);// decimal number between 2 and 17
						
					}
				}
			}
			arrayOfRandomNumbers2.push(number);
		}
		else
			arrayOfRandomNumbers2.push(number);

		noOfRandomNumbers2++;
	}
}


function StopWheel()
{	
	
	questionId++;
	//var d=new Date();
	//startTime=d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate()+" "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
	$( '.poster1').show();
	$( '.poster2').show();
	$("#playerScore").removeClass('magictime swashIn');
	$("#runs").removeClass('magictime swashIn');
	$("#playerScore").css('color','white');
	$("#runs").css('color','white');
	showAllNumbersOnWheel();
	$('#divshowingCricketBall').removeClass('magictime puffIn');
	$("#buttondiv").hide();
	document.getElementById("ring-2").classList.remove("stop");
	document.getElementById("ring-1").classList.remove("stop");
	document.getElementById("ring-2").classList.add("fastring");
	setTimeout(function()
	{
		document.getElementById("ring-2").classList.remove("fastring");
		document.getElementById("ring-2").classList.add("slowring");
	},500);
	document.getElementById("ring-1").classList.add("slowring");
	document.getElementById("ring-2").classList.add("ring2");
	document.getElementById("ring-1").classList.add("ring1");
	setTimeout(function()
	{
		$( '.poster1').not("#d1").hide();
		$( '.poster2').not("#d13").hide();
		$('.poster1').css('background-image','url(css/ball4.jpg)');
		$('.poster2').css('background-image','url(css/ball4.jpg)');
		document.getElementById("ring-2").classList.remove("ring2");
		document.getElementById("ring-1").classList.remove("ring1");
		document.getElementById("ring-2").classList.remove("slowring");
		document.getElementById("ring-1").classList.remove("slowring");			
	},4000);
	if(questionlevel==3)
	{
			p1=parseFloat(document.getElementById("p1").innerHTML);
			p2=parseFloat(document.getElementById("p13").innerHTML);
	}
	else
	{
		p1=parseInt(document.getElementById("p1").innerHTML);
		p2=parseInt(document.getElementById("p13").innerHTML);
	}
	if(p1<p2)
	{
		tempNumber=p1;
		p1=p2;
		p2=tempNumber;
		document.getElementById("p1").innerHTML=p1;
		document.getElementById("p13").innerHTML=p2;
		calculate4Numbers(p1,p2);
	}
	else
		calculate4Numbers(p1,p2);
}

function calculate4Numbers(p1,p2)
{	
	var countOfRandomNumbers=0,randomAnswer,division,subtraction,multiplication,addition;;
	setTimeout(function()
	{
		$("#optionDiv").show();
	},4500);

	addition=(p1)+(p2);	//6
	if(questionlevel==3)
		addition=parseFloat(addition.toFixed(2));
	arrayof3CorrectNumbers.push(addition);

	if(flagHitSingleRun!==1)
	{
		multiplication=(p1)*(p2);//8
		if(questionlevel==3)
		{
			multiplication=parseFloat(multiplication.toFixed(2));
		}
		if($.inArray(multiplication,arrayof3CorrectNumbers)==-1)
		{
			arrayof3CorrectNumbers.push(multiplication);
		}
		if((p1)>=(p2))
		{	
			if(p1%p2==0)
			{
				division=(p1)/(p2);//2
				if($.inArray(division,arrayof3CorrectNumbers)==-1)
				{				
					arrayOfFinal4Options.push(division);
					//tempLength=1;
					//noOfCorrectAnswers=4;
				}
			}
			//else
				noOfCorrectAnswers= 3;
				//tempLength=0;
				

			subtraction=(p1)-(p2);
			if(($.inArray(subtraction,arrayof3CorrectNumbers)==-1)&&($.inArray(subtraction,arrayOfFinal4Options)==-1))
			{
				subtraction=parseFloat(subtraction.toFixed(2));
				arrayof3CorrectNumbers.push(subtraction);
			}
			//noOfCorrectAnswers= 3;
		}
		/*else
		{
			subtraction=p2-p1;
			if($.inArray(subtraction,arrayof3CorrectNumbers)==-1)
			{
				subtraction=parseFloat(subtraction.toFixed(2));
				arrayof3CorrectNumbers.push(subtraction);
			}
			noOfCorrectAnswers=3;
		} */
	}
	else
		noOfCorrectAnswers=3;

	if(flagHitSingleRun!==1)
		lengthOfArray=arrayof3CorrectNumbers.length;
	else
		lengthOfArray=arrayof3CorrectNumbers.length;
	while(lengthOfArray<4)
	{	
		if(questionlevel==3)
			randomNumber1=((Math.random() * 40) + 10).toFixed(1);
		else
			randomNumber1=Math.floor((Math.random() *80) + 10);
		
		while((($.inArray(randomNumber1,arrayof3CorrectNumbers)>=0)||($.inArray(randomNumber1,arrayOfFinal4Options)>=0))||(randomNumber1==((p1*p2)||(p1-p2)||(p2-p1)||(p1/p2)||(p1+p2))))
		{
			randomNumber1=Math.floor((Math.random() *150) + 10);
		}
		arrayof3CorrectNumbers.push(randomNumber1);
		lengthOfArray++;
	}
	
	while(countOfRandomNumbers<=noOfCorrectAnswers)//0<3
	{	
		randomAnswer=Math.floor((Math.random() *arrayof3CorrectNumbers.length) + 0);
		arrayOfFinal4Options.push(arrayof3CorrectNumbers[randomAnswer]);
		arrayof3CorrectNumbers.splice(randomAnswer,1);
		countOfRandomNumbers++;
	}
	setTimeout(showNumbersOnTheButtons,4000);
}

function showNumbersOnTheButtons()
{	var i=1;
	var chooseRandomButton;
	AnswerFlag=0;
	var tempLength=arrayOfFinal4Options.length-1;
	while(i<5)
	{
		tempLength=arrayOfFinal4Options.length-1;
		chooseRandomButton=Math.floor((Math.random() *tempLength) + 0);
		document.getElementById("no"+i).innerHTML=arrayOfFinal4Options[chooseRandomButton];
		arrayOfFinal4Options.splice(chooseRandomButton,1);
		i++;
	}
	setTimeout(function()
	{
		$('#divShowingTimerAndMessage').show();
		if(flagHitSingleRun==0||flagHitSingleRun==2)
		{
			$('#myCanvas').show();
			showTimer();
		}
	},600);
}

function answerClicked(evt,trueOrfalse)
{	
	scoredMarks=0;
	AnswerFlag++;
	//clearInterval(playSoundInAndroid);  
	if(AnswerFlag===1)
	{
		if(trueOrfalse=="true")
		{
			$("#divshowingCricketBall").hide();
			document.getElementById("showItsDotBallMessage").innerHTML="Dot ball";
			$('#showItsDotBallMessage').addClass('magictime puffIn');
			scoredMarks=0;
			//console.log(""+resId+" "+questionId+" "+scoredMarks+" "+totalMarks+" 1 "+""+startTime);
			//Android.addScore(resId,questionId,scoredMarks,totalMarks,1,startTime);
			document.getElementById("playSound").src="sound/dotBall.mp3";
			document.getElementById("playSound").play();
			//Android.audioPlayer('dotBall.mp3');
			setTimeout(function()
			{
				document.getElementById("showItsDotBallMessage").innerHTML="";
				$('#showItsDotBallMessage').removeClass('magictime puffIn');
				ballsPlayedByFirstPlayer++;
				document.getElementById("playerScore").innerHTML=""+playerScore+"("+ballsPlayedByFirstPlayer+")*";
				strikeRate=(playerScore*100)/ballsPlayedByFirstPlayer;
				document.getElementById("showStrikeRate").innerHTML=""+strikeRate.toFixed(2);
				ballsInOneOver++;
				if(ballsInOneOver<6)
					document.getElementById("TotalOver").innerHTML=""+over+"."+ballsInOneOver;
				else
				{	
					over++;
					document.getElementById("TotalOver").innerHTML=""+over;
					ballsInOneOver=0;
				}
				if((playerScore>=100)||(RemainingBalls>=TotalBallsToBePlayed))
				{
					setTimeout(function()
					{
						$("#answerDiv").hide();
						$('#scoreBoard').hide();
						showLastPageInfoOfPlayer();
						$("#divShowingGameFinishedMessge").show();
						$('#divShowingGameFinishedMessge').addClass('magictime tinDownIn');	
					},5000);
				}
				else
				{
					$("#divshowingCricketBall").show();
					$('#divshowingCricketBall').addClass('magictime puffIn');
					setTimeout(function()
					{
						$('#divshowingCricketBall').removeClass('magictime puffIn');
					},1200);
					$("#optionDiv").hide();
					arrayOfRandomNumbers1=[];
					arrayOfRandomNumbers2=[];
					arrayof3CorrectNumbers=[];
					arrayOfFinal4Options=[];
					noOfCorrectAnswers=0;
					var h=1;
					while(h<5)
					{
						document.getElementById("no"+h).innerHTML="";
						h++;
					}
					var t=1;
					while(t<25)
					{
						document.getElementById("p"+t).innerHTML="";
						t++;
					}
					$( '.poster1').show();
					$( '.poster2').show();
					chooseNumbersForFirstRing();
					chooseNumbersForSecondRing();
					$('.poster1').css('background-image','url(css/ball2.jpg)');
					$('.poster2').css('background-image','url(css/ball2.jpg)');
						// sound for web
					
					document.getElementById('startingSound').src="sound/Stedium crowd.mp3";
					document.getElementById('startingSound').loop=true;
					document.getElementById('startingSound').play();
				}
			},2500);
		}
		else
		{
			document.getElementById("showItsDotBallMessage").innerHTML="";
			$("body").css("background-image","");
			var answer,randomSound;
			seconds=8;
			clearInterval(stopTimer);
			ctx.clearRect(0,0, canvas.width, canvas.height);
			stopTimer=0;
			$('#myCanvas').hide();
			$('#divshowingCricketBall').hide();
			$("#divShowingPlayers").hide();
			$("#optionDiv").hide();
			$("#smalldiv").hide();
			$("#largediv").hide();
			$("#answerDiv").show();
			var evtChild=$("#"+evt).prop("id");
			if(questionlevel==3)
				answer=parseFloat(document.getElementById(evtChild).innerHTML);
			else
				answer=parseInt(document.getElementById(evtChild).innerHTML);
			ballsInOneOver++;
			if(((p1+p2).toFixed(2)==answer)||((p1-p2).toFixed(2)==answer)||((p1*p2).toFixed(2)==answer)||((p1/p2).toFixed(2)==answer)||((p2-p1).toFixed(2)==answer))
			{
				if(flagHitSingleRun==2)
					flagHitSingleRun=0;
				if(flagHitSingleRun==0)
				{
					ballsPlayedByFirstPlayer++;
					if((p1/p2).toFixed(2)==answer)
					{
						scoredMarks=40;
						randomSound=Math.floor((Math.random()*arrayOfSoundsForSixRuns.length)+0);
						randomRuns=randomRuns+6;
						playerScore=playerScore+6;
						flagHit6++;
						document.getElementById("ansMessage").innerHTML=""+p1+" / "+p2+" = "+answer;
						$("body").css("background-image","");
						$("body").css("background-image","url("+ playerData[0]['answerImages']['six'] + "?id="+ ballsPlayedByFirstPlayer +"" +")");
						
						document.getElementById("playSound").src="sound/sixRuns.mp3";
						document.getElementById("playSound2").src=arrayOfSoundsForSixRuns[randomSound];

						if(player=="Kohli")
						{	setTimeout(function()
							{	
								//Android.audioPlayer(''+arrayOfSoundsForSixRuns[randomSound]);
								document.getElementById("playSound2").play();
							},2000);
						}
						if(player=="Dhoni")
						{	setTimeout(function()
							{
								//Android.audioPlayer(''+arrayOfSoundsForSixRuns[randomSound]);
								document.getElementById("playSound2").play();
							},1500);
						}
						if(player=="Gayle")
						{	setTimeout(function()
							{
								//Android.audioPlayer(''+arrayOfSoundsForSixRuns[randomSound]);
								document.getElementById("playSound2").play();
							},2000);

						}
						if(player=="Watson")
						{	setTimeout(function()
							{
								//Android.audioPlayer(''+arrayOfSoundsForSixRuns[randomSound]);
								document.getElementById("playSound2").play();
							},2000);
						}
						if(player=="Sachin")
						{	setTimeout(function()
							{
								//Android.audioPlayer(''+arrayOfSoundsForSixRuns[randomSound]);
								document.getElementById("playSound2").play();
							},2000);
						}
					}
					else if((p1*p2).toFixed(2)==answer)
					{
						scoredMarks=30;
						randomSound=Math.floor((Math.random()*arrayOfSoundsForFourRuns.length)+0);
						randomRuns=randomRuns+4;
						playerScore=playerScore+4;
						flagHit4++;
						document.getElementById("ansMessage").innerHTML=""+p1+" X "+p2+" = "+answer;
						$("body").css("background-image","");
						$("body").css("background-image","url("+ playerData[0]['answerImages']['four'] + "?id="+ ballsPlayedByFirstPlayer +"" +")");
						
						document.getElementById("playSound").src="sound/sixRuns.mp3";
						document.getElementById("playSound2").src=arrayOfSoundsForFourRuns[randomSound];
						if(player=="Kohli")
						{	setTimeout(function()
							{
								document.getElementById("playSound2").play();
							},2000);
						}
						if(player=="Dhoni")
						{	setTimeout(function()
							{
								document.getElementById("playSound2").play();
							},3800);
						}
						if(player=="Gayle")
						{	setTimeout(function()
							{
								document.getElementById("playSound2").play();
							},2000);

						}
						if(player=="Watson")
						{	setTimeout(function()
							{
								document.getElementById("playSound2").play();
							},2000);
						}
						if(player=="Sachin")
						{	setTimeout(function()
							{
								document.getElementById("playSound2").play();
							},1800);
						}
					}
					else if((p1+p2).toFixed(2)==answer)
					{
						randomSound=Math.floor((Math.random()*arrayOfSoundsForSingleRun.length)+0);
						scoredMarks=10;
						randomRuns=randomRuns+1;
						flagHit4=flagHit4+0;
						flagHit6=flagHit6+0;
						document.getElementById("ansMessage").innerHTML=""+p1+" + "+p2+" = "+answer;
						$("body").css("background-image","");
						$("body").css("background-image","url("+ playerData[0]['answerImages']['single'] + "?id="+ ballsPlayedByFirstPlayer +"" +")");
						
						document.getElementById("playSound").src="sound/sixRuns.mp3";
						document.getElementById("playSound2").src=arrayOfSoundsForSingleRun[randomSound];
						if(player=="Kohli")
						{	setTimeout(function()
							{
								document.getElementById("playSound2").play();
							},2200);
						}
						if(player=="Dhoni")
						{	setTimeout(function()
							{
								document.getElementById("playSound2").play();
							},2000);
						}
						if(player=="Gayle")
						{	setTimeout(function()
							{
								document.getElementById("playSound2").play();
							},2000);

						}
						if(player=="Watson")
						{	setTimeout(function()
							{
								document.getElementById("playSound2").play();
							},2000);
						}
						if(player=="Sachin")
						{	setTimeout(function()
							{
								document.getElementById("playSound2").play();
							},1800);
						}

						playerScore++;
					}
					else if(((p1-p2).toFixed(2)==answer)||((p2-p1).toFixed(2)==answer))
					{
						scoredMarks=20;
						randomSound=Math.floor((Math.random()*arrayOfSoundsForTwoRuns.length)+0);
						randomRuns=randomRuns+2;
						playerScore=playerScore+2;
						flagHit4=flagHit4+0;
						flagHit6=flagHit6+0;
						if(p1>p2)
							document.getElementById("ansMessage").innerHTML=""+p1+" - "+p2+" = "+answer;
						else
							document.getElementById("ansMessage").innerHTML=""+p2+" - "+p1+" = "+answer;
						$("body").css("background-image","");
						$("body").css("background-image","url("+ playerData[0]['answerImages']['twoRuns'] + "?id="+ ballsPlayedByFirstPlayer +"" +")");
						
						document.getElementById("playSound").src="sound/sixRuns.mp3";
						document.getElementById("playSound2").src=arrayOfSoundsForTwoRuns[randomSound];
						
						if(player=="Kohli")
						{	setTimeout(function()
							{
								document.getElementById("playSound2").play();
							},4200);
						}
						if(player=="Dhoni")
						{	setTimeout(function()
							{
								document.getElementById("playSound2").play();
							},2000);
						}
						if(player=="Gayle")
						{	setTimeout(function()
							{
								document.getElementById("playSound2").play();
							},2000);

						}
						if(player=="Watson")
						{	setTimeout(function()
							{
								document.getElementById("playSound2").play();
							},2000);
						}
						if(player=="Sachin")
						{	setTimeout(function()
							{
								document.getElementById("playSound2").play();
							},2000);
						}
					}
				}
				if(flagHitSingleRun==1)
				{
					ballsPlayedBySecondPlayer++;
					randomSound=Math.floor((Math.random()*arrayOfSoundsForSingleRun.length)+0);
					dummyPlayerScore++;
					randomRuns++;
					if((p1+p2).toFixed(2)==answer)
						document.getElementById("ansMessage").innerHTML=""+p1+" + "+p2+" = "+answer;
					$("body").css("background-image","");
					$("body").css("background-image","url("+ playerData[0]['dummyPlayerRunSource']+ "?id="+(ballsPlayedByFirstPlayer+1) +"" +")");
					scoredMarks=10;
					//Android.audioPlayer('sixRuns.mp3');
					document.getElementById("playSound").src="sound/sixRuns.mp3";
					setTimeout(function()
					{
							document.getElementById("playSound2").src=arrayOfSoundsForSingleRun[randomSound];
							document.getElementById("playSound2").play();
							//Android.audioPlayer(''+arrayOfSoundsForSingleRun[randomSound]);
					},3000);
				}
				if(player=="Kohli")
				{
					if(p1*p2==answer)
					{
						setTimeout(function()
						{
							document.getElementById("playSound").play();
						},2400);
					}
					if((p1-p2||p2-p1)==answer)
					{
						setTimeout(function(){
							document.getElementById("playSound").play();
						},3500);
					}
					if(p1/p2==answer)
					{
						setTimeout(function(){
							document.getElementById("playSound").play();
						},2400);
					}
					if(p1+p2==answer)
					{
						setTimeout(function(){
							document.getElementById("playSound").play();
						},2500);
					}
				}
				if(player=="Gayle")
				{
					if(p1*p2==answer)
					{
						setTimeout(function(){
							document.getElementById("playSound").play();
						},2000);
					}
					if((p1-p2||p2-p1)==answer)
					{
						setTimeout(function(){
							document.getElementById("playSound").play();
						},1800);
					}
					if(p1/p2==answer)
					{
						setTimeout(function(){
							document.getElementById("playSound").play();
						},2400);
					}
					if(p1+p2==answer)
					{
						setTimeout(function(){
							document.getElementById("playSound").play();
						},2500);
					}
				}
				if(player=="Sachin")
				{
					if(p1*p2==answer)
					{
						setTimeout(function(){
							document.getElementById("playSound").play();
						},1800);
					}
					if((p1-p2||p2-p1)==answer)
					{
						setTimeout(function(){
							document.getElementById("playSound").play();
						},1900);
					}
					if(p1/p2==answer)
					{
						setTimeout(function(){
							document.getElementById("playSound").play();
						},2400);
					}
					if(p1+p2==answer)
					{
						setTimeout(function(){
							document.getElementById("playSound").play();
						},1900);
					}
				}
				if(player=="Watson")
				{
					if(p1*p2==answer)
					{
						setTimeout(function(){
							document.getElementById("playSound").play();
						},2000);
					}
					if((p1-p2==answer)||(p2-p1==answer))
					{
						setTimeout(function(){
							document.getElementById("playSound").play();
						},2000);
					}
					if(p1/p2==answer)
					{
						setTimeout(function(){
							document.getElementById("playSound").play();
						},2100);
					}
					if(p1+p2==answer)
					{
						setTimeout(function(){
							document.getElementById("playSound").play();
						},2200);
					}
				}
				if(player=="Dhoni")
				{
					if(p1*p2==answer)
					{
						setTimeout(function(){
							document.getElementById("playSound").play();
						},3400);
					}
					if((p1-p2==answer)||(p2-p1==answer))
					{
						setTimeout(function(){
							document.getElementById("playSound").play();
						},2200);
					}
					if(p1/p2==answer)
					{
						setTimeout(function(){
							document.getElementById("playSound").play();
						},1600);
					}
					if(p1+p2==answer)
					{
						setTimeout(function(){
							document.getElementById("playSound").play();
						},2200);
					}
				}
				if(ballsInOneOver<6)
					document.getElementById("TotalOver").innerHTML=""+over+"."+ballsInOneOver;
				else
				{	
					over++;
					document.getElementById("TotalOver").innerHTML=""+over;
					ballsInOneOver=0;
				}
				if(playerScore>=100)
				{
					setTimeout(function()
					{
						$("#answerDiv").hide();
						$('#scoreBoard').hide();
						showLastPageInfoOfPlayer();
						$("#divShowingGameFinishedMessge").show();
						$('#divShowingGameFinishedMessge').addClass('magictime tinDownIn');	
					},5000);
				}
				else
				{
					$( '.poster1').show();
					$( '.poster2').show();
					var i=1;
					while(i<5)
					{
						document.getElementById("no"+i).innerHTML="";
						i++;
					}
					var t=1;
					while(t<25)
					{
						document.getElementById("p"+t).innerHTML="";
						t++;
					}	
					setTimeout(function()
					{
						document.getElementById("runs").innerHTML=""+randomRuns+"/"+""+randomWickets;
						$("#runs").addClass('magictime swashIn');
						$("#runs").css('color','red');
						if(((p1+p2).toFixed(2)==answer)&&(flagHitSingleRun==0))
						{
							document.getElementById("playerScore").innerHTML=""+playerScore+"("+ballsPlayedByFirstPlayer+")*";
							$("#playerScore").addClass('magictime swashIn');
							$("#playerScore").css('color','red');
							document.getElementById("dummyPlayerScore").innerHTML=""+dummyPlayerScore+"("+ballsPlayedBySecondPlayer+")";
							flagHitSingleRun++;
							strikeRate=(playerScore*100)/ballsPlayedByFirstPlayer;
							document.getElementById("showStrikeRate").innerHTML=""+strikeRate.toFixed(2);
							$("body").css("background-image","url("+ playerData[0]['dummyPlayerStansSource']+")");
							setTimeout(function()
							{
								$("#scoreBoard").hide();
								document.getElementById('showOnStrikePlayer').innerHTML=dummyPlayer+" is on strike." ;
								$("#showOnStrikePlayer").addClass('magictime vanishIn');
								$("#showOnStrikePlayer").show();
								
							},1200);
							setTimeout(function()
							{
								$("#scoreBoard").show();
								$("#showOnStrikePlayer").removeClass('magictime vanishIn');
								$("#showOnStrikePlayer").addClass('magictime vanishOut');
								setTimeout(function(){
									$("#showOnStrikePlayer").hide();
									$("#showOnStrikePlayer").removeClass('magictime vanishOut');
								},1200);
								document.getElementById("dummyPlayerScore").innerHTML=""+dummyPlayerScore+"("+ballsPlayedBySecondPlayer+")*";
								document.getElementById("playerScore").innerHTML=""+playerScore+"("+ballsPlayedByFirstPlayer+")";
								$("#playerScore").removeClass('magictime swashIn');
								$("#playerScore").css('color','white');
							},4000);
						}
						else if(flagHitSingleRun==1)
						{
							document.getElementById("dummyPlayerScore").innerHTML=""+dummyPlayerScore+"("+ballsPlayedBySecondPlayer+")*";
							$("#dummyPlayerScore").addClass('magictime swashIn');
							$("#dummyPlayerScore").css('color','red');
							document.getElementById("playerScore").innerHTML=""+playerScore+"("+ballsPlayedByFirstPlayer+")";
							flagHitSingleRun++;
							strikeRate=(dummyPlayerScore*100)/ballsPlayedBySecondPlayer;
							document.getElementById("showStrikeRate").innerHTML=""+strikeRate.toFixed(2);
							$("body").css("background-image","url("+ playerData[0]['answerImages']['startingPosition']+")");
							setTimeout(function()
							{
								$("#scoreBoard").hide();
								document.getElementById('showOnStrikePlayer').innerHTML=""+player+" is on strike." ;
								$("#showOnStrikePlayer").addClass('magictime vanishIn');
								$("#showOnStrikePlayer").show();
							},1200);
							setTimeout(function()
							{
								$("#scoreBoard").show();
								$("#showOnStrikePlayer").removeClass('magictime vanishIn');
								$("#showOnStrikePlayer").addClass('magictime vanishOut');
								setTimeout(function(){
									$("#showOnStrikePlayer").hide();
									$("#showOnStrikePlayer").removeClass('magictime vanishOut');
								},1200);
								document.getElementById("playerScore").innerHTML=""+playerScore+"("+ballsPlayedByFirstPlayer+")*";
								document.getElementById("dummyPlayerScore").innerHTML=""+dummyPlayerScore+"("+ballsPlayedBySecondPlayer+")";
								$("#dummyPlayerScore").removeClass('magictime swashIn');
								$("#dummyPlayerScore").css('color','white');
							},4000);
						}
						else
						{
							$("#playerScore").addClass('magictime swashIn');
							$("#playerScore").css('color','red');
							document.getElementById("playerScore").innerHTML=""+playerScore+"("+ballsPlayedByFirstPlayer+")*";
							document.getElementById("dummyPlayerScore").innerHTML=""+dummyPlayerScore+"("+ballsPlayedBySecondPlayer+")";
							strikeRate=(playerScore*100)/ballsPlayedByFirstPlayer;
							document.getElementById("showStrikeRate").innerHTML=""+strikeRate.toFixed(2);
							$("body").css("background-image","");
							$("body").css("background-image","url("+playerData[0]['answerImages']['startingPosition']+")");

						}
						arrayOfRandomNumbers1=[];
						arrayOfRandomNumbers2=[];
						arrayof3CorrectNumbers=[];
						arrayOfFinal4Options=[];
						noOfCorrectAnswers=0;
						if(RemainingBalls>=TotalBallsToBePlayed)
						{
							$("#answerDiv").hide();
							$('#scoreBoard').hide();
							showLastPageInfoOfPlayer();
							$("#divShowingGameFinishedMessge").show();
							$('#divShowingGameFinishedMessge').addClass('magictime tinDownIn');	
						}
						else
						{
							$('#divshowingCricketBall').show();
							chooseNumbersForFirstRing();
							chooseNumbersForSecondRing();
							document.getElementById("playSound").src="";
							$('.poster1').css('background-image','url(css/ball2.jpg)');
							$('.poster2').css('background-image','url(css/ball2.jpg)');
							document.getElementById('startingSound').src="sound/Stedium crowd.mp3";
							document.getElementById('startingSound').loop=true;
							document.getElementById('startingSound').play();
							$('#divshowingCricketBall').addClass('magictime puffIn');
							setTimeout(function()
							{
								$('#divshowingCricketBall').removeClass('magictime puffIn');
							},1200);	
						}	
					},7000);
				}
			}
			else 
			{
				scoredMarks=0;
				var randomSound=Math.floor((Math.random()*arrayOfSoundsOfOut.length)+0);
				document.getElementById("TotalOver").innerHTML=""+over+"."+ballsInOneOver;
				document.getElementById("ansMessage").innerHTML="";
				document.getElementById("playSound").src="sound/sixRuns.mp3";
				document.getElementById("playSound2").src=arrayOfSoundsOfOut[randomSound];
				randomWickets++;
					if(player=="Kohli")
					{	setTimeout(function()
						{
							document.getElementById("playSound").play();
						},1700);
						setTimeout(function()
						{
							document.getElementById("playSound2").play();
						},2700);
					}
					if(player=="Dhoni")
					{	setTimeout(function()
						{
							document.getElementById("playSound").play();
						},1500);
						setTimeout(function()
						{
							document.getElementById("playSound2").play();
						},3000);
					}
					if(player=="Gayle")
					{	setTimeout(function()
						{
							document.getElementById("playSound").play();
						},800);
						setTimeout(function()
						{
							document.getElementById("playSound2").play();
						},2000);

					}
					if(player=="Watson")
					{	setTimeout(function()
						{
							document.getElementById("playSound").play();
						},800);
						setTimeout(function()
						{
							document.getElementById("playSound2").play();
						},2000);
					}
					if(player=="Sachin")
					{	setTimeout(function()
						{
							document.getElementById("playSound").play();
						},500);
						setTimeout(function()
						{
							document.getElementById("playSound2").play();
						},1200);
					}
				
				if((randomWickets<10)&&(flagHitSingleRun==1))
				{
					$("body").css("background-image","url("+playerData[0]['dummyPlayerOutSource']+"?id="+ ballsPlayedByFirstPlayer +"" +")");
					setTimeout(function()
					{
						var country=document.getElementById("nameOfCountry").innerHTML;
						var c=0,d=0;
						for(c=0;c<dummyPlayersList.length;c++)
						{
							if(country==dummyPlayersList[c]['country'])
							{
								d=Math.floor((Math.random()*(dummyPlayersList[c]['dummy'].length-1))+0);
								dummyPlayer=dummyPlayersList[c]['dummy'][d]['name'];
								document.getElementById('dummyPlayer').innerHTML=dummyPlayer;
								dummyPlayersList[c]['dummy'].splice(d,1);
							}
						}
						document.getElementById("showOnStrikePlayer").innerHTML=dummyPlayer+ " is on Strike";
						$("#showOnStrikePlayer").addClass('magictime vanishIn');
						$("#showOnStrikePlayer").show();
						setTimeout(function(){
							document.getElementById("showOnStrikePlayer").innerHTML="";
							$("#showOnStrikePlayer").removeClass('magictime vanishIn');
							$("#showOnStrikePlayer").hide();

						},2000);
						dummyPlayerScore=0;
						ballsPlayedBySecondPlayer=0;
						document.getElementById('dummyPlayerScore').innerHTML=dummyPlayerScore+"("+ballsPlayedBySecondPlayer+")*";
						$("#answerDiv").hide();
						$('#divshowingCricketBall').show();
						arrayOfRandomNumbers1=[];
						arrayOfRandomNumbers2=[];
						arrayof3CorrectNumbers=[];
						arrayOfFinal4Options=[];
						noOfCorrectAnswers=0;
						var i=1;
						while(i<5)
						{
							document.getElementById("no"+i).innerHTML="";
							i++;
						}
						var t=1;
						while(t<25)
						{
							document.getElementById("p"+t).innerHTML="";
							t++;
						}
						chooseNumbersForFirstRing();
						chooseNumbersForSecondRing();
						$('.poster1').css('background-image','url(css/ball2.jpg)');
						$('.poster2').css('background-image','url(css/ball2.jpg)');
						$("body").css("background-image","");
						$("body").css("background-image","url("+playerData[0]['dummyPlayerStansSource']+")");
						document.getElementById('startingSound').src="sound/Stedium crowd.mp3";
						document.getElementById('startingSound').loop=true;
						document.getElementById('startingSound').play();
						$('#divshowingCricketBall').addClass('magictime puffIn');
						document.getElementById("runs").innerHTML=""+randomRuns+"/"+""+randomWickets;
						$("#dummyPlayerScore").addClass('magictime swashIn');
						$("#dummyPlayerScore").css('color','red');
						$("#dummyPlayer").addClass('magictime swashIn');
						$("#dummyPlayer").css('color','red');
						setTimeout(function()
						{
							$("#dummyPlayer").removeClass('magictime swashIn');
							$("#dummyPlayer").css('color','black');
						},2000);
					},5000);
				}
				else
				{
					$("body").css("background-image","url("+playerData[0]['answerImages']['out']+")");
					setTimeout(function()
					{
						$("#divshowingCricketBall").hide();
						$("#answerDiv").hide();
						$('#scoreBoard').hide();
						showLastPageInfoOfPlayer();
						$("#divShowingGameFinishedMessge").show();
						$('#divShowingGameFinishedMessge').addClass('magictime tinDownIn');	
					},5000);
				}	
			}	
		}
		startAngle=0;
		endAngle=30;
	}
}