var Abacus={};
var audioCounter=0,timer1,timer2,timer3;
var Utils ={};
$(document).ready(function()
{
	Utils.Path='';  
	setTimeout(function(){
		Abacus.setImagesAndLabels();   
		Abacus.registerEventListener();
		Abacus.attachBallsToRespectivePlaces();
		Abacus.ChooseRandomNumberToPlay();
	},10);
});

Abacus.setImagesAndLabels=function(){
	$(".ballFor1").prop("src",Utils.Path+"img/ballFor1.png");
	$(".ballFor10").prop("src",Utils.Path+"img/ballFor10.png");
	$(".ballFor100").prop("src",Utils.Path+"img/ballFor100.png");
	$(".ballFor1000").prop("src",Utils.Path+"img/ballFor1000.png");
	$(".SubmitIcon").prop("src",Utils.Path+"img/submit.png");
	$(".ClearIcon").prop("src",Utils.Path+"img/clear.png");   
	$(".NextIcon").prop("src",Utils.Path+"img/next.png");
	$(".SpeakerIcon").prop("src",Utils.Path+"img/speaker.png");
	audioTag = new Audio();
}

Abacus.registerEventListener=function(){
	$(".submitIcon").on("click",Abacus.checkAnswer);
	$(".nextIcon").on("click",Abacus.ChooseRandomNumberToPlay);
}

Abacus.attachBallsToRespectivePlaces=function(){
	var template='',template2='',maxRowInColumn=5;
	for(var row=1,ballNoForBox1=1,ballNoForBox2=11;row<=maxRowInColumn;row++,ballNoForBox1++,ballNoForBox2++){
		template+='<div class="BeadsImages " style="margin-top:2px;">'+
		'<img  class="ballInAbacusPad ballNo'+(ballNoForBox1+5)+'" src="">'+
		'<img  class="ballInAbacusPad ballNo'+(ballNoForBox1)+'" src="">'+
		'</div>'; 
		template2+='<div class="BeadsImages " style="margin-top:2px;">'+
		'<img  class="ballInAbacusPad ballNo'+(ballNoForBox2+5)+'" src="">'+
		'<img  class="ballInAbacusPad ballNo'+(ballNoForBox2)+'" src="">'+
		'</div>'; 
	}
	$('.firstNumberBalls , .secondNumberBalls').append(template);
	$('#AnsNumber > .column1 > .firstBox , #AnsNumber > .column2 > .firstBox , #AnsNumber > .column3 > .firstBox, #AnsNumber > .column4 > .firstBox').append(template);
	$('#AnsNumber > .column1 > .secondBox , #AnsNumber > .column2 > .secondBox , #AnsNumber > .column3 > .secondBox, #AnsNumber > .column4 > .secondBox').append(template2);

	$('.column1 >.columnBallsDiv > .BeadsImages >.ballInAbacusPad').prop("src",Utils.Path+"img/ballFor1000.png");
	$('.column2 >.columnBallsDiv > .BeadsImages >.ballInAbacusPad').prop("src",Utils.Path+"img/ballFor100.png");
	$('.column3 >.columnBallsDiv > .BeadsImages >.ballInAbacusPad').prop("src",Utils.Path+"img/ballFor10.png");
	$('.column4 >.columnBallsDiv > .BeadsImages >.ballInAbacusPad').prop("src",Utils.Path+"img/ballFor1.png");
	$(".ballInAbacusPad").hide();
}

Abacus.ChooseRandomNumberToPlay=function(){
	clearTimeout(timer1);
	clearTimeout(timer2);
	audioTag.pause();
	//syntax : Math.floor(Math.random() * (max - min + 1)) + min
	Abacus.firstNumber=Math.floor(Math.random() * (4000 - 1 + 1)) + 1; // in range(1,6)
	Abacus.secondNumber=Math.floor(Math.random() * (4000 - 1 + 1)) + 1; // in range(1,6)
	Abacus.ansNumber=Abacus.firstNumber+Abacus.secondNumber;
	var placeOfDigitInNumber=1;
	while(Abacus.ansNumber>0)
	{
		var Digit=Math.floor(Abacus.ansNumber% 10);
		Abacus.ansNumber =Math.floor(Abacus.ansNumber / 10);
		if(placeOfDigitInNumber==1)
		Abacus.AnsOnesPlace=Digit;
		if(placeOfDigitInNumber==2)
		Abacus.AnsTensPlace=Digit;
		if(placeOfDigitInNumber==3)
		Abacus.AnsHundredPlace=Digit;
		if(placeOfDigitInNumber==4)
		Abacus.AnsThousandPlace=Digit;
		placeOfDigitInNumber++;
	}
	Abacus.audioArrayOfWholeNumber=[];

	if(Abacus.AnsThousandPlace!=0)
	Abacus.audioArrayOfWholeNumber.push(Utils.Path+"sound/Numbers/"+(Abacus.AnsThousandPlace*1000)+".mp3");
	if(Abacus.AnsHundredPlace!=0)
	Abacus.audioArrayOfWholeNumber.push(Utils.Path+"sound/Numbers/"+(Abacus.AnsHundredPlace*100)+".mp3");
	if(Abacus.AnsTensPlace!=0)
	Abacus.audioArrayOfWholeNumber.push(Utils.Path+"sound/Numbers/"+Abacus.AnsTensPlace+Abacus.AnsOnesPlace+".mp3");
	else if(Abacus.AnsOnesPlace!=0)
	Abacus.audioArrayOfWholeNumber.push(Utils.Path+"sound/Numbers/"+Abacus.AnsOnesPlace+".mp3");

	$(".digitsAndAddition").html("0")
	$(".ballInAbacusPad,.Hatchya1").hide().removeClass("animated slideInDown slideOutDown blink_me");
	$(".firstBox,.secondBox").css("pointer-events","none");
	$(".columnBallsDiv").show();
  	$(".plusSignDiv").show();
	Abacus.appendBallsOfDigit("firstNumber",Abacus.firstNumber);
	Abacus.appendBallsOfDigit("secondNumber",Abacus.secondNumber);
	Abacus.applyDragAndDropToBalls();
}

Abacus.appendBallsOfDigit=function(PlaceOfNumber,ValueOfDigit){
	var Digit=0;
	var pressedDigit=ValueOfDigit;
	var placeOfDigitInNumber=1;
	var OnesPlace=0,TensPlace=0,HundredPlace=0,ThousandPlace=0;
	while(pressedDigit>0)
	{
		Digit=Math.floor(pressedDigit% 10);
		pressedDigit =Math.floor(pressedDigit / 10);
		if(placeOfDigitInNumber==1)
		OnesPlace=Digit;
		if(placeOfDigitInNumber==2)
		TensPlace=Digit;
		if(placeOfDigitInNumber==3)
		HundredPlace=Digit;
		if(placeOfDigitInNumber==4)
		ThousandPlace=Digit;
		placeOfDigitInNumber++;
	}
	$('#'+PlaceOfNumber+' > .column1 >.NoOfBallsInColumn').html(ThousandPlace);
	$('#'+PlaceOfNumber+' > .column2 >.NoOfBallsInColumn').html(HundredPlace);
	$('#'+PlaceOfNumber+' > .column3 >.NoOfBallsInColumn').html(TensPlace);
	$('#'+PlaceOfNumber+' > .column4 >.NoOfBallsInColumn').html(OnesPlace);

	for(var i=1;i<=ThousandPlace;i++)
	$('#'+PlaceOfNumber+' > .column1 >.columnBallsDiv > .BeadsImages >.ballNo'+i).show();
	for(var i=1;i<=HundredPlace;i++)
	$('#'+PlaceOfNumber+' > .column2 >.columnBallsDiv > .BeadsImages >.ballNo'+i).show();
	for(var i=1;i<=TensPlace;i++)
	$('#'+PlaceOfNumber+' > .column3 >.columnBallsDiv > .BeadsImages >.ballNo'+i).show();
	for(var i=1;i<=OnesPlace;i++)
	$('#'+PlaceOfNumber+' > .column4 >.columnBallsDiv > .BeadsImages >.ballNo'+i).show();
}

Abacus.applyDragAndDropToBalls=function(){
	$('.columnBallsDiv').draggable({
		zIndex: 100,
		revert :'invalid',
		containment:'#gamePage'
	});
	$("#AnsNumber > .column4").droppable({
		accept : "#firstNumberballFor1InAbacusPad, #secondNumberballFor1InAbacusPad",
		tolerance: "touch",
		drop : function(event,ui){
			var ballsDiv=ui.draggable.attr("id");
			if(ballsDiv=="firstNumberballFor1InAbacusPad" || ballsDiv=="secondNumberballFor1InAbacusPad")
				Abacus.transferBallsToAnswerNumwer(event,ui,4,"firstNumberballFor1InAbacusPad","secondNumberballFor1InAbacusPad");
			else
				Abacus.transferCarry(event,ui,4);
		},
	});
	$("#AnsNumber > .column3").droppable({
		accept : "#firstNumberballFor10InAbacusPad, #secondNumberballFor10InAbacusPad,#AnsNumber > .column4 > #column4firstBox,#AnsNumber > .column4 > #column4secondBox",
		tolerance: "touch",
		drop : function(event,ui){
			var ballsDiv=ui.draggable.attr("id");
			if(ballsDiv=="firstNumberballFor10InAbacusPad" || ballsDiv=="secondNumberballFor10InAbacusPad")
				Abacus.transferBallsToAnswerNumwer(event,ui,3,"firstNumberballFor10InAbacusPad","secondNumberballFor10InAbacusPad");
			else
				Abacus.transferCarry(event,ui,3);
		}
	});

	$("#AnsNumber > .column2").droppable({
		accept : "#firstNumberballFor100InAbacusPad, #secondNumberballFor100InAbacusPad,#AnsNumber > .column3 > #column3firstBox,#AnsNumber > .column3 > #column3secondBox",
		tolerance: "touch",
		drop : function(event,ui){
			var ballsDiv=ui.draggable.attr("id");
			if(ballsDiv=="firstNumberballFor100InAbacusPad" || ballsDiv=="secondNumberballFor100InAbacusPad")
				Abacus.transferBallsToAnswerNumwer(event,ui,2,"firstNumberballFor100InAbacusPad","secondNumberballFor100InAbacusPad");
			else
				Abacus.transferCarry(event,ui,2);
		},
	});
	$("#AnsNumber > .column1").droppable({
		accept : "#firstNumberballFor1000InAbacusPad, #secondNumberballFor1000InAbacusPad,#AnsNumber > .column2 > #column2firstBox,#AnsNumber > .column2 > #column2secondBox",
		tolerance: "touch",
		drop : function(event,ui){
			var ballsDiv=ui.draggable.attr("id");
			if(ballsDiv=="firstNumberballFor1000InAbacusPad" || ballsDiv=="secondNumberballFor1000InAbacusPad")
				Abacus.transferBallsToAnswerNumwer(event,ui,1,"firstNumberballFor1000InAbacusPad","secondNumberballFor1000InAbacusPad");
			else
				Abacus.transferCarry(event,ui,1);
		},
	});
}


Abacus.transferBallsToAnswerNumwer=function(event,ui,columnNo,firstNumberBallsBoxId,secondNumberBallsBoxId){
	var ballsDiv=ui.draggable.attr("id");
	var countOfDraggingBalls=$("#"+ballsDiv+" > .BeadsImages > img:visible").length;
	var droppingDiv='';
	var startingNoToShowBall;
	$("#"+ballsDiv+" > .BeadsImages > img:visible").hide();
	var Old_text=$(".column"+columnNo+" > .digitsAndAddition").html();
	if(ballsDiv==firstNumberBallsBoxId){
		startingNoToShowBall=1;
		droppingDiv=".firstBox";
		if(Old_text=='0')
			$(".column"+columnNo+" > .digitsAndAddition").html(countOfDraggingBalls);
		else
			$(".column"+columnNo+" > .digitsAndAddition").html(""+countOfDraggingBalls+"+"+Old_text);
	}
	else{
		startingNoToShowBall=11;
		droppingDiv=".secondBox";
		if(Old_text=='0')
			$(".column"+columnNo+" > .digitsAndAddition").html(countOfDraggingBalls);
		else
			$(".column"+columnNo+" > .digitsAndAddition").html(Old_text+"+"+countOfDraggingBalls);

	}
	for(i=startingNoToShowBall,j=1 ; j<=countOfDraggingBalls;i++,j++){
		$('#AnsNumber .column'+columnNo+' >'+droppingDiv+'> .BeadsImages >.ballNo'+i).show();
	}
	ui.draggable.draggable('option','revert',true); 

	if($(".firstNumberBalls > .BeadsImages > img:visible ,.secondNumberBalls > .BeadsImages > img:visible").length==0){
		if($(".column4 > .digitsAndAddition").html()!=0)
			$(".column4 > .plusSignDiv > .plusSign").css("visibility","visible");
		else if($(".column3 > .digitsAndAddition").html()!=0)
			$(".column3 > .plusSignDiv > .plusSign").css("visibility","visible");
		else if($(".column2 > .digitsAndAddition").html()!=0)
			$(".column2 > .plusSignDiv > .plusSign").css("visibility","visible");
		else if($(".column1 > .digitsAndAddition").html()!=0)
			$(".column1 > .plusSignDiv > .plusSign").css("visibility","visible");
	}

}



Abacus.doAdditionForColumn=function(columnNo){
	var totalBallsInColumn=$("#AnsNumber > .column"+columnNo+" > .firstBox > .BeadsImages > img:visible").length + $("#AnsNumber > .column"+columnNo+" > .secondBox > .BeadsImages > img:visible").length ; 
	$("#AnsNumber > .column"+columnNo+" > .plusSignDiv > .plusSign").css("visibility","hidden");
	$("#AnsNumber > .column"+columnNo+" > .firstBox > .BeadsImages > img:visible ,#AnsNumber > .column"+columnNo+" > .secondBox > .BeadsImages > img:visible").hide();
	$("#AnsNumber > .column"+columnNo+" > .digitsAndAddition").html(totalBallsInColumn+$(".column"+columnNo+" > .HatchyaDiv > .Hatchya1:visible").length);

	for(ballNo=1;ballNo<=totalBallsInColumn;ballNo++){
		$('#AnsNumber > .column'+columnNo+' >.columnBallsDiv > .BeadsImages >.ballNo'+ballNo).show();
	}
	if($("#AnsNumber > .column"+columnNo+" > .HatchyaDiv > .Hatchya1:visible").length==1){
		$("#AnsNumber > .column"+columnNo+" > .HatchyaDiv > .Hatchya1:visible").addClass("animated slideOutDown")
		timer1=setTimeout(function(){
			$("#AnsNumber > .column"+columnNo+" > .HatchyaDiv > .Hatchya1:visible").css("display","none");
            $('#AnsNumber .column'+columnNo+' >.columnBallsDiv > .BeadsImages >.ballNo'+ballNo).show().addClass("animated slideInDown");
        	if($("#AnsNumber > .column"+columnNo+" > .firstBox > .BeadsImages > img:visible").length==10){
				$("#AnsNumber > .column"+columnNo+" > .firstBox").css("pointer-events","auto");
				timer2=setTimeout(function(){
					$('#AnsNumber .column'+columnNo+' >.columnBallsDiv > .BeadsImages >.ballNo'+ballNo).removeClass("animated slideInDown");
					$("#AnsNumber > .column"+columnNo+" > .firstBox > .BeadsImages > img:visible").addClass("blink_me");
				},1000);
			}
			else{
				if($("#AnsNumber > .column"+(columnNo-1)+" > .digitsAndAddition").html()!=0)
					$("#AnsNumber > .column"+(columnNo-1)+" > .plusSignDiv > .plusSign").css("visibility","visible");
				else if($("#AnsNumber > .column"+(columnNo-2)+" > .digitsAndAddition").html()!=0)
					$("#AnsNumber > .column"+(columnNo-2)+" > .plusSignDiv > .plusSign").css("visibility","visible");
				else if($("#AnsNumber > .column"+(columnNo-3)+" > .digitsAndAddition").html()!=0)
					$("#AnsNumber > .column"+(columnNo-3)+" > .plusSignDiv > .plusSign").css("visibility","visible");
			}
        },1000);
	}
	else{
		if($("#AnsNumber > .column"+columnNo+" > .firstBox > .BeadsImages > img:visible").length==10){
			$("#AnsNumber > .column"+columnNo+" > .firstBox").css("pointer-events","auto");
			$("#AnsNumber > .column"+columnNo+" > .firstBox > .BeadsImages > img:visible").addClass("blink_me");	
		}
		else{
			if($("#AnsNumber > .column"+(columnNo-1)+" > .digitsAndAddition").html()!=0)
				$("#AnsNumber > .column"+(columnNo-1)+" > .plusSignDiv > .plusSign").css("visibility","visible");
			else if($("#AnsNumber > .column"+(columnNo-2)+" > .digitsAndAddition").html()!=0)
				$("#AnsNumber > .column"+(columnNo-2)+" > .plusSignDiv > .plusSign").css("visibility","visible");
			else if($("#AnsNumber > .column"+(columnNo-3)+" > .digitsAndAddition").html()!=0)
				$("#AnsNumber > .column"+(columnNo-3)+" > .plusSignDiv > .plusSign").css("visibility","visible");
		}
	}	
}

Abacus.transferCarry=function(event,ui,columnNo){
 	var ballsDiv=ui.draggable.attr("id");
    $("#AnsNumber > .column"+columnNo+" > .HatchyaDiv > .Hatchya1").css("display","inline-block");
    $("#"+ballsDiv).hide();
   	$("#AnsNumber > .column"+columnNo+" > .digitsAndAddition").append("+1");
   	$("#AnsNumber > .column"+columnNo+" > .plusSignDiv > .plusSign").css("visibility","visible");
   	var previousColumn_digitsAndAddition=Number($("#AnsNumber > .column"+(columnNo+1)+" > .digitsAndAddition").html());
   	$("#AnsNumber > .column"+(columnNo+1)+" > .digitsAndAddition").html(previousColumn_digitsAndAddition-10);
   	$("#AnsNumber > .column"+(columnNo+1)+" > .plusSignDiv").hide();
	ui.draggable.draggable('option','revert',true); 
}

//play list of audio and calls "callBackFunction" if exists when list finish
Abacus.playAudioList=function(AudioList,callBackFunction){
	audioTag.pause();
	audioTag.src= AudioList[audioCounter];
	audioTag.play();
	audioCounter++
	if(audioCounter<(AudioList.length)){
		audioTag.onended=function(){
			audioTag.pause();
			Abacus.playAudioList(AudioList,callBackFunction);  
		}
	}
	else{
		audioCounter=0;
		audioTag.onended=function(){
			audioTag.pause();
			if(callBackFunction!='')
				callBackFunction.call();
		}
	}
}

Abacus.checkAnswer=function(){
	if( Number($("#AnsNumber > .column1 > .digitsAndAddition").html())==Abacus.AnsThousandPlace
	 && Number($("#AnsNumber > .column2 > .digitsAndAddition").html())==Abacus.AnsHundredPlace
	 && Number($("#AnsNumber > .column3 > .digitsAndAddition").html())==Abacus.AnsTensPlace
	 && Number($("#AnsNumber > .column4 > .digitsAndAddition").html())==Abacus.AnsOnesPlace ){
		audioTag.src=Utils.Path+"sound/Are wah.mp3";
		audioTag.play();
		audioTag.onended=function(){
			audioTag.pause();
			audioCounter=0;
			Abacus.playAudioList(Abacus.audioArrayOfWholeNumber,"");
		}
	}
	else{
		audioTag.src=Utils.Path+"sound/Tryagain1.mp3";
		audioTag.play();
		audioTag.onended=function(){
			audioTag.pause();
		}
	}
}