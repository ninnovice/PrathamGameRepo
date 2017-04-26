var Abacus={};
var audioCounter=0,globalCounter=1,timerForFunCall_CountBalls1,timerForFunCall_CountBalls2;
var Utils ={};
$(document).ready(function()
{
//  Android.getPath("NumberCounting");
  Utils.Path='';
  setTimeout(function(){
    Abacus.setImagesAndLabels();   
    Abacus.registerEventListener();
  },10);
});

Abacus.setImagesAndLabels=function(){
  audioTag = new Audio();
  $('#gamePage').hide();
  $("#AbacusGameMainDiv").css("background-image","url('"+Utils.Path+"img/BodyBG.jpg')");
  $("#levelOneImage").prop("src",Utils.Path+"img/level1.png");
  $("#levelTwoImage").prop("src",Utils.Path+"img/level2.png");
  $("#levelThreeImage").prop("src",Utils.Path+"img/level3.png");
  $(".homeIcon").prop("src",Utils.Path+"img/home.png");  
  $(".ballFor1").prop("src",Utils.Path+"img/ballFor1.png");
  $(".ballFor10").prop("src",Utils.Path+"img/ballFor10.png");
  $(".ballFor100").prop("src",Utils.Path+"img/ballFor100.png");
  $(".ballFor1000").prop("src",Utils.Path+"img/ballFor1000.png");
  $('#levelPage').show();
}

Abacus.registerEventListener=function(){
  $("#levelOneImage").on("click",function(){ 
    Abacus.createAbacusTemplateForRange(1,10);
  })
  $("#levelTwoImage").on("click",function(){
    Abacus.createAbacusTemplateForRange(10,100);
  })
  $("#levelThreeImage").on("click",function(){
    Abacus.createAbacusTemplateForRange(100,1000);
  })
}

Abacus.createAbacusTemplateForRange=function(startNo,endNo){
  var abacusTemplate='',TotalNoOfColumn=10;
  var NumberOnColumn=startNo;
  Abacus.StartNo=startNo;
  
  for(var columnNo=1;columnNo<=TotalNoOfColumn;columnNo++){
    abacusTemplate+='<div id=column'+columnNo+' class="column col-lg-1 col-md-1 col-sm-1 col-xs-1" >'+
                        '<div class="abacusNumber row" onclick="Abacus.showBallsBelowColumn('+columnNo+');">'+NumberOnColumn+'</div>';
    for(var BallsRow=1;BallsRow<=columnNo&&BallsRow<=5;BallsRow++){
      if(columnNo>5&&(columnNo-BallsRow)>=5)
        abacusTemplate+='<div class="ballsInColumn_Div row">'+
                            '<div class="col-lg-6 col-md-6 col-sm-6 col-xs-6" style="padding:0px;">'+
                           '<img class=" animated ballsInColumn Col1Balls ballNo'+BallsRow+'" src="'+Utils.Path+'img/ballFor'+startNo+'.png"></div>'+
                           '<div class="col-lg-6 col-md-6 col-sm-6 col-xs-6" style="padding:0px;">'+
                           '<img class="animated ballsInColumn  Col2Balls ballNo'+(BallsRow+5)+'" src="'+Utils.Path+'img/ballFor'+startNo+'.png"></div>'+
                        '</div>';
      else
        abacusTemplate+='<div class="ballsInColumn_Div row">'+
                          '<div class="col-lg-6 col-md-6 col-sm-6 col-xs-6" style="padding:0px;">'+
                           '<img class="animated ballsInColumn Col1Balls ballNo'+BallsRow+'" src="'+Utils.Path+'img/ballFor'+startNo+'.png"></div>'+
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
  
  //for small balls ,get them closed
  if(Abacus.StartNo==1 || Abacus.StartNo==10){
  	$("#column6 > .ballsInColumn_Div > div >.Col1Balls ,#column7 > .ballsInColumn_Div > div>.Col1Balls,#column8 > .ballsInColumn_Div > div>.Col1Balls,"+
  		"#column9 > .ballsInColumn_Div > div>.Col1Balls, #column10 > .ballsInColumn_Div > div>.Col1Balls").css("margin-left","19%");
  	$("#column6 > .ballsInColumn_Div > div >.Col2Balls ,#column7 > .ballsInColumn_Div > div>.Col2Balls,#column8 > .ballsInColumn_Div > div>.Col2Balls"+
    	",#column9 > .ballsInColumn_Div > div>.Col2Balls, #column10 > .ballsInColumn_Div > div>.Col2Balls").css("margin-left","-18%");
  }
  $('#levelPage').hide();
  $('#gamePage').show();
}

//show all the balls when press on any number.
Abacus.showBallsBelowColumn=function(columnNo){
  audioTag.src=Utils.Path+"sound/Numbers/"+($('#column'+columnNo+'>.abacusNumber').text())+".mp3";
  audioTag.play();
  clearTimeout(timerForFunCall_CountBalls1);
  clearTimeout(timerForFunCall_CountBalls2);
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

//count all the balls in column one by one ,with sound
Abacus.CountBallsInColumn=function(columnNo){
  var ballsInColumn=$('#column'+columnNo+'>.ballsInColumn_Div > div > .ballsInColumn').length;
  if(ballsInColumn>=globalCounter){
    audioTag.src=Utils.Path+"sound/Numbers/"+(globalCounter*Abacus.StartNo)+".mp3";
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
      $('#column'+columnNo+'>.BallForRoundup').show();
  	}
  }
}