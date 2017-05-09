var Abacus={};
var audioCounter=0,globalCounter=1,timerForFunCall_CountBalls1,timerForFunCall_CountBalls2,imageChangetimer;
var Utils ={};
$(document).ready(function()
{
  	Utils.Path='';
 	Abacus.setImagesAndLabels();   
  	Abacus.registerEventListener();
 	setTimeout(function(){ $('#levelPage').show(); $("#coverPage").hide(); },2500);  
});

Abacus.setImagesAndLabels=function(){
  	audioTag = new Audio();
	$('#levelPage,#gamePage').hide();
	$("#AbacusGameMainDiv").css("background-image","url('"+Utils.Path+"img/BodyBG.jpg')");
	$("#coverPage").css("background-image","url('"+Utils.Path+"img/coverPage.jpg')");
	$("#levelOneImage").prop("src",Utils.Path+"img/level1.png");
	$("#levelTwoImage").prop("src",Utils.Path+"img/level2.png");
	$("#levelThreeImage").prop("src",Utils.Path+"img/level3.png");
	$(".homeIcon").prop("src",Utils.Path+"img/home.png");  
	$(".nextIcon").prop("src",Utils.Path+"img/next.png");  
	$(".prathamlogo").prop("src",Utils.Path+"img/prathamlogo.png");  
	$(".ballFor1").prop("src",Utils.Path+"img/ballFor1.png");
	$(".ballFor10").prop("src",Utils.Path+"img/ballFor10.png");
	$(".ballFor100").prop("src",Utils.Path+"img/ballFor100.png");
	$(".ballFor1000").prop("src",Utils.Path+"img/ballFor1000.png");
    $(".kakaji").prop("src",Utils.Path+"img/pointing.png");
	$("#coverPage").show();
}

Abacus.registerEventListener=function(){
	$("#levelOneImage").on("click",function(){  Abacus.createAbacusTemplateForRange(1,10); });
	$("#levelTwoImage").on("click",function(){  Abacus.createAbacusTemplateForRange(10,100); });
	$("#levelThreeImage").on("click",function(){  Abacus.createAbacusTemplateForRange(100,1000); });
	$(".nextIcon").on("click",function(){
    	$(".nextIcon").addClass("animated pulse");
    	setTimeout(function(){$(".nextIcon").removeClass("animated pulse");},700);
    	Abacus.selectRandomNumberFromRange();
  	});
}

Abacus.createAbacusTemplateForRange=function(startNo,endNo){
	var abacusTemplate='',TotalNoOfColumn=10,NumberOnColumn=startNo;
	Abacus.StartNoOfLevel=startNo;
	Abacus.EndNoOfLevel=endNo;
	for(var columnNo=1;columnNo<=TotalNoOfColumn;columnNo++){
		abacusTemplate+='<div id=column'+columnNo+' class="column col-lg-1 col-md-1 col-sm-1 col-xs-1" >'+
	                    '<div class="abacusNumber row" onclick="Abacus.showBallsBelowColumn('+columnNo+');">'+NumberOnColumn+'</div>';
	for(var BallsRow=1;BallsRow<=columnNo&&BallsRow<=5;BallsRow++){
	    if(columnNo>5&&(columnNo-BallsRow)>=5)
	    	abacusTemplate+='<div class="ballsInColumn_Div row">'+
	                        '<div class="col-lg-6 col-md-6 col-sm-6 col-xs-6 Col1BallsDiv" style="padding:0px;">'+
	                       '<img class=" animated ballsInColumn ballNo'+BallsRow+'" src="'+Utils.Path+'img/ballFor'+startNo+'.png"></div>'+
	                       '<div class="col-lg-6 col-md-6 col-sm-6 col-xs-6" style="padding:0px;">'+
	                       '<img class="animated ballsInColumn  ballNo'+(BallsRow+5)+'" src="'+Utils.Path+'img/ballFor'+startNo+'.png"></div>'+
	                    '</div>';
	    else
	    	abacusTemplate+='<div class="ballsInColumn_Div row">'+
	                      '<div class="col-lg-6 col-md-6 col-sm-6 col-xs-6 Col1BallsDiv" style="padding:0px;">'+
	                       '<img class="animated ballsInColumn ballNo'+BallsRow+'" src="'+Utils.Path+'img/ballFor'+startNo+'.png"></div>'+
	                    '</div>';
		}
		if(columnNo==10)
		    abacusTemplate+='<div class="row BallForRoundup">'+
		                      '<div class="col-lg-6 col-md-6 col-sm-6 col-xs-6" style="padding:0px;">'+
		                       '<img class="ballsInColumn " src="'+Utils.Path+'img/ballFor'+(startNo*10)+'.png"></div>'+
		                    '</div>';
	    abacusTemplate+='</div>';   
		NumberOnColumn+=startNo;
	}
	$('#abacusPad').append(abacusTemplate);
	$('.column >.ballsInColumn_Div').hide();
	$('.column >.BallForRoundup').hide();
	$(".abacusNumber").css("background-image","url('"+Utils.Path+"img/ButtonBGForBall"+startNo+".png')");
	if(Abacus.StartNoOfLevel==1)
	$(".ballsInColumn").addClass("BallFor1WidthInAbacusPad");
	if(Abacus.StartNoOfLevel==10)
	$(".ballsInColumn").addClass("BallFor10WidthInAbacusPad");
	if(Abacus.StartNoOfLevel==100)
	$(".ballsInColumn").addClass("BallFor100WidthInAbacusPad");
	$('#levelPage').hide();
	$('#gamePage').show();
	Abacus.selectRandomNumberFromRange();
}

Abacus.selectRandomNumberFromRange=function(){
	audioTag.pause();
	audioTag.src=Utils.Path+"sound/ting.mp3";
    audioTag.play();
    audioTag.onended=function(){
        audioTag.pause();
    }
	clearTimeout(timerForFunCall_CountBalls1);
	clearTimeout(timerForFunCall_CountBalls2);
    clearTimeout(imageChangetimer);
    $('.ballsInColumn_Div,.BallForRoundup').hide();
	$(".kakaji").prop("src",Utils.Path+"img/pointing.png");
    $(".abacusNumber").css("pointer-events", "auto");
	//syntax : Math.floor(Math.random() * (max - min + 1)) + min
	var oneToTenDigit=Math.floor(Math.random() * (10 - 1 + 1)) + 1; // in range(1,9)
	Abacus.randomNumber=oneToTenDigit*Abacus.StartNoOfLevel;
	$(".circleNumber").html(Abacus.numberTextJSON[Abacus.randomNumber]).addClass("blink_me");
}

//show all the balls when press on any number.
Abacus.showBallsBelowColumn=function(columnNo){
	audioTag.pause();
    clearTimeout(timerForFunCall_CountBalls1);
	clearTimeout(timerForFunCall_CountBalls2);
    clearTimeout(imageChangetimer);
    if(Abacus.randomNumber!=$('#column'+columnNo+'>.abacusNumber').text()){
		$(".kakaji").prop("src",Utils.Path+"img/Angry.png"); 
		audioTag.src=Utils.Path+"sound/BuzzerWrong.mp3";
		audioTag.play();
		imageChangetimer=setTimeout(function(){$(".kakaji").prop("src",Utils.Path+"img/pointing.png");},900);
  	}	
	else{
        clearTimeout(imageChangetimer);
        $(".abacusNumber").css("pointer-events", "none");
		$(".circleNumber").removeClass("blink_me animated slideInDown");
		$(".kakaji").prop("src",Utils.Path+"img/Happy.png"); 
		audioTag.src=Utils.Path+"sound/Shabbas.mp3";
		audioTag.play();
		$('.ballsInColumn_Div').hide();
		$('.BallForRoundup').hide();
		$('#column'+columnNo+'>.ballsInColumn_Div > div > .ballsInColumn').removeClass("zoomIn");
		$('#column'+columnNo+'>.ballsInColumn_Div').show();
		$('#column'+columnNo+'>.BallForRoundup').hide();
		globalCounter=1;  
		timerForFunCall_CountBalls1=setTimeout(function(){
									Abacus.CountBallsInColumn(columnNo);
								 },1500);
	}
}

//count all the balls in column one by one ,with sound
Abacus.CountBallsInColumn=function(columnNo){
    var ballsInColumn=$('#column'+columnNo+'>.ballsInColumn_Div > div > .ballsInColumn').length;
    if(ballsInColumn>=globalCounter){
    	audioTag.src=Utils.Path+"sound/Numbers/"+(globalCounter*Abacus.StartNoOfLevel)+".mp3";
    	audioTag.play();
    	$('#column'+columnNo+'>.ballsInColumn_Div > div > .ballNo'+globalCounter).addClass("zoomIn");
    	globalCounter++;
    	timerForFunCall_CountBalls2=setTimeout(function(){
      						   		Abacus.CountBallsInColumn(columnNo);
      						   	},966);
  	}
  	else{
    	globalCounter=1;
    	if(columnNo==10){
    		$('#column'+columnNo+'>.ballsInColumn_Div').hide();
       		$('#column'+columnNo+'>.BallForRoundup > div > img').css("width",""+($(".ballsInColumn").width()+15)+"%");
      		$('#column'+columnNo+'>.BallForRoundup').show();
  		}
  		Abacus.selectRandomNumberFromRange();
  	}
}