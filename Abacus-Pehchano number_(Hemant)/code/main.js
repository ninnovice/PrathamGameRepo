var Abacus={};
var audioCounter=0;
var Utils ={};
$(document).ready(function()
{
//  Android.getPath("NumberCounting");
  Utils.Path='';  
  Abacus.setImagesAndLabels();   
  setTimeout(function(){
    Abacus.registerEventListener();
    Abacus.CreateHTMlTemplateForAnsOptionsAndAppend();
    Abacus.applyDragAndDropToAnsOptions();
    Abacus.ChooseRandomNumberToPlay();
  },10);
});

Abacus.setImagesAndLabels=function(){
  $(".ballFor1").prop("src",Utils.Path+"img/ballFor1.png");
  $(".ballFor10").prop("src",Utils.Path+"img/ballFor10.png");
  $(".ballFor100").prop("src",Utils.Path+"img/ballFor100.png");
  $(".ballFor1000").prop("src",Utils.Path+"img/ballFor1000.png");
  $(".SubmitIcon").prop("src",Utils.Path+"img/Submit.png");
  $(".NextIcon").prop("src",Utils.Path+"img/Next.png");
  $("#AnsTitle").html("पर्याय");
  $("#NumberInTextRow > #ThousandPlace , #NumberInTextRow > #HundredPlace").html("___");
  $("#NumberInTextRow > #hazar").html("हज़ार,");
  audioTag = new Audio();
}

Abacus.registerEventListener=function(){
  $(".SubmitIcon").on("click",Abacus.checkAnswer);
  $(".NextIcon").on("click",Abacus.resetAndContinue);
}

//create answer options to drag and drop
Abacus.CreateHTMlTemplateForAnsOptionsAndAppend=function(){
  var template='';
  var TotalOptions=9;
  for(var option=1;option<=TotalOptions;option++){
    template+='<div data="'+option+'"  class="row AnsOptions">'+
              Abacus.numberTextJSON[option]+'</div>';
  }
  $("#AnsOptionsBox").append(template);
}

//
Abacus.applyDragAndDropToAnsOptions=function(){
  $('.AnsOptions').draggable({
    zIndex: 100,
    revert :'invalid',
    containment:'#gamePage',
    helper: "clone",
    start: function( event, ui ) {
      audioTag.pause();
      audioTag.src="sound/Numbers/"+$(event.target).attr("data")+".mp3";
      audioTag.play();
       audioTag.onended=function(){
          audioTag.pause();
       }
    }
  });
  $('#ThousandPlace,#HundredPlace').droppable({
    drop : function(event,ui){
      $(this).html(ui.draggable.html());
      $(this).attr("data",ui.draggable.attr("data"));
    }
  });  
}

Abacus.ChooseRandomNumberToPlay=function(){
  var singleDigitFromWholeNumber,placeOfNumber;
  Abacus.audioArray=[];
  audioCounter=0;
  Abacus.OnesPlace=Math.floor(Math.random() * (2 - 1 + 1)) + 1;
  Abacus.TensPlace=Math.floor(Math.random() * (2 - 0 + 1)) + 0;
  Abacus.HundredsPlace=Math.floor(Math.random() * (9 - 1 + 1)) + 1;
  Abacus.ThousandsPlace=Math.floor(Math.random() * (9 - 1 + 1)) + 1;
 
  Abacus.audioArray.push(Utils.Path+"sound/Numbers/"+(Abacus.ThousandsPlace*1000)+".mp3");
  Abacus.audioArray.push(Utils.Path+"sound/Numbers/"+(Abacus.HundredsPlace*100)+".mp3");

  if(Abacus.TensPlace!=0){
    Abacus.audioArray.push(Utils.Path+"sound/Numbers/"+Abacus.TensPlace+Abacus.OnesPlace+".mp3");
    $("#TensPlace").html("सौ "+Abacus.numberTextJSON[Abacus.TensPlace+""+Abacus.OnesPlace]);
  }
  else if(Abacus.OnesPlace!=0){
    Abacus.audioArray.push(Utils.Path+"sound/Numbers/"+Abacus.OnesPlace+".mp3");
    $("#TensPlace").html("सौ "+Abacus.numberTextJSON[Abacus.OnesPlace]);
  }
  Abacus.appendBallsImagesOfRandomnumber("ballFor1000.png",Abacus.ThousandsPlace);
  Abacus.appendBallsImagesOfRandomnumber("ballFor100.png",Abacus.HundredsPlace);
  Abacus.appendBallsImagesOfRandomnumber("ballFor10.png",Abacus.TensPlace);
  Abacus.appendBallsImagesOfRandomnumber("ballFor1.png",Abacus.OnesPlace);
  Abacus.PlaceBallsInRandomPlaces();
}

Abacus.appendBallsImagesOfRandomnumber=function(imageName,NoOfImages){
    var template='';
    for(var i=1;i<=NoOfImages;i++){
        template+='<img class="ballInBallsBox" src="img/'+imageName+'">';                
    }
    $("#ballsBox").append(template);
}

Abacus.checkAnswer=function() {
  if(Abacus.ThousandsPlace==$("#ThousandPlace").attr("data") 
  && Abacus.HundredsPlace==$("#HundredPlace").attr("data")){
    audioTag.src=Utils.Path+"sound/Are wah.mp3";
    audioTag.play();
    audioTag.onended=function(){
      audioTag.pause();
      Abacus.playAudioList(Abacus.resetAndContinue);
    }
  }
  else{
    audioTag.src=Utils.Path+"sound/Tryagain1.mp3";
    audioTag.play();
    audioTag.onended=function(){
      audioTag.pause();
      audioCounter=0;
    }
  }
}

Abacus.resetAndContinue=function() {
  $("#ballsBox").empty();
  $("#NumberInTextRow > #ThousandPlace , #NumberInTextRow > #HundredPlace").html("___");
  Abacus.ChooseRandomNumberToPlay();
}

Abacus.playAudioList=function(callBackFunction){
  audioTag.pause();
  audioTag.src=Abacus.audioArray[audioCounter];
  audioTag.play();
  audioCounter++
  audioTag.onended=function(){
    audioTag.pause();
  }
  if(audioCounter<(Abacus.audioArray.length)){
    audioTag.onended=function(){
    Abacus.playAudioList(callBackFunction);  
    }
  }
  else{
    audioCounter=0;
    audioTag.onended=function(){
     callBackFunction.call();
    }
  }
}

Abacus.PlaceBallsInRandomPlaces=function(){
  var containerW = $("#ballsBox").width();
  var containerH = $("#ballsBox").height();
  var positions = [];
  $('.ballInBallsBox').each(function() {
    var coords = {
      w: $(this).outerWidth(true),
      h: $(this).outerHeight(true)
    };
    var success = false;
    while (!success)
    {
      coords.x = parseInt(Math.random() * (containerW-coords.w));
      coords.y = parseInt(Math.random() * (containerH-coords.h));
      var success = true;
      $.each(positions, function(){
        if (
          coords.x <= (this.x + this.w) &&
          (coords.x + coords.w) >= this.x &&
          coords.y <= (this.y + this.h) &&
          (coords.y + coords.h) >= this.y){
            success = false;
        }
      });
    }
    positions.push(coords);
    /* $(this).css({
      top: coords.y + 'px',
      left: coords.x + 'px'
    });
    */
    $(this).animate({
      top: coords.y + 'px',
      left: coords.x + 'px'
    }, 500);
  });
}