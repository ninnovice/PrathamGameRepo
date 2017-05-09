var Abacus={};
var audioCounter=0,NumberBanaoOrNumberPhechanoArray=[1,2];  // 1=Number Banao ,2 =number phechano  
;
var Utils ={};
$(document).ready(function()
{
  Utils.Path='';
  Abacus.setImagesAndLabels();   
  Abacus.registerEventListener();
  setTimeout(function(){ $('#levelPage').show(); $("#coverPage").hide();},2500);
 });

Abacus.setImagesAndLabels=function(){
  audioTag = new Audio();
  Abacus.IterationCounter=0;
  $('#levelPage,#gamePage').hide();
  $("#AbacusGameMainDiv").css("background-image","url('"+Utils.Path+"img/BodyBG.jpg')");
  $("#coverPage").css("background-image","url('"+Utils.Path+"img/coverPage.jpg')");
  $("#levelOneImage").prop("src",Utils.Path+"img/10_99.png");
  $("#levelTwoImage").prop("src",Utils.Path+"img/100_999.png");
  $("#levelThreeImage").prop("src",Utils.Path+"img/1000_9999.png");
  $("#ballFor1").prop("src",Utils.Path+"img/ballFor1.png");
  $("#ballFor10").prop("src",Utils.Path+"img/ballFor10.png");
  $("#ballFor100").prop("src",Utils.Path+"img/ballFor100.png");
  $("#ballFor1000").prop("src",Utils.Path+"img/ballFor1000.png");
  $(".homeIcon").prop("src",Utils.Path+"img/home.png");
  $(".prathamlogo").prop("src",Utils.Path+"img/prathamlogo.png");
  $(".SpeakerIcon").prop("src",Utils.Path+"img/speaker.png");
  $(".ClearIcon").prop("src",Utils.Path+"img/clear.png");
  $(".SubmitIcon").prop("src",Utils.Path+"img/submit.png");
  $(".NextIcon").prop("src",Utils.Path+"img/next.png");
  $("#TextOfhazar").html(Abacus.langWiseJsonData["thousand"]);
  $("#TextOfSou").html(Abacus.langWiseJsonData["hundred"]);
  $("#paryay").html(Abacus.langWiseJsonData["Option"]);
  $(".placeHeaderOf1").html(Abacus.langWiseJsonData["placeHeaderOf1"]);
  $(".placeHeaderOf10").html(Abacus.langWiseJsonData["placeHeaderOf10"]);
  $(".placeHeaderOf100").html(Abacus.langWiseJsonData["placeHeaderOf100"]);
  $(".placeHeaderOf1000").html(Abacus.langWiseJsonData["placeHeaderOf1000"]);
  $("#coverPage").show();
}

Abacus.registerEventListener=function(){
  $("#levelOneImage").on("click",function(){  Abacus.startgameForRange(10,99); });
  $("#levelTwoImage").on("click",function(){  Abacus.startgameForRange(100,999); });
  $("#levelThreeImage").on("click",function(){  Abacus.startgameForRange(1000,9999); });
  $(".SpeakerIcon").on("click",function(){ 
    $(".SpeakerIcon").addClass("animated pulse");
    setTimeout(function(){$(".SpeakerIcon").removeClass("animated pulse");},700);
     Abacus.repeatQuestionSound();
  });
  $(".ClearIcon").on("click",function(){ 
    $(".ClearIcon").addClass("animated pulse");
    setTimeout(function(){$(".ClearIcon").removeClass("animated pulse");},700);
    Abacus.clearAbacusPad();
  });
  $(".SubmitIcon").on("click",function(){ 
    $(".SubmitIcon").addClass("animated pulse");
    setTimeout(function(){$(".SubmitIcon").removeClass("animated pulse");},700);
    Abacus.checkAnswer();
  });
  $(".NextIcon").on("click",function(){
    $(".NextIcon").addClass("animated pulse");
    setTimeout(function(){$(".NextIcon").removeClass("animated pulse");},700);
    Abacus.ChooseRandomNumberToPlay();
  });
}

Abacus.startgameForRange=function(MinimumNumber,MaximumNumber){
  $('#gamePage').show();           $('#levelPage').hide();
  Abacus.MinimumNumberOfLevel=MinimumNumber;
  Abacus.MaximumNumberOfLevel=MaximumNumber;
  Abacus.attachBallsToRespectivePlaces();
  Abacus.applyDragAndDropToBalls();
  Abacus.ChooseRandomNumberToPlay();
}

// attach 9 balls in each column And hide them at start.
Abacus.attachBallsToRespectivePlaces=function(){
  var template='',maxRowInColumn=5;
  for(var row=1;row<=maxRowInColumn;row++){
    template+='<div class="BeadsImages " style="margin-top:2px;">'+
                    '<img  class="ballInAbacusPad ballNo'+(row)+'" src="">'+
                    '<img  class="ballInAbacusPad ballNo'+(row+5)+'" src="">'+
                '</div>'; 
  }
  $('#column1,#column2,#column3,#column4').append(template);
  $('.ballInAbacusPad').css('visibility','hidden');
  $('#column1 >.BeadsImages >.ballInAbacusPad').prop("src",Utils.Path+"img/ballFor1000.png").attr("data","column1");
  $('#column2 >.BeadsImages >.ballInAbacusPad').prop("src",Utils.Path+"img/ballFor100.png").attr("data","column2");
  $('#column3 >.BeadsImages >.ballInAbacusPad').prop("src",Utils.Path+"img/ballFor10.png").attr("data","column3");
  $('#column4 >.BeadsImages >.ballInAbacusPad').prop("src",Utils.Path+"img/ballFor1.png").attr("data","column4");
}

// apply drag option to balls for game "Number Banao"  &  make each colum droppable   
Abacus.applyDragAndDropToBalls=function(){
  $('.ballInPickerBox,.ballInAbacusPad').draggable({
    zIndex: 100,
    revert :'invalid',
    containment:'#gamePage',
    helper: "clone"
  });
  $('#column1').droppable({ accept :'#ballFor1000'   ,  drop : function(event,ui){ Abacus.appendBallInAbacusPad(ui); }  });
  $('#column2').droppable({ accept :'#ballFor100'    ,  drop : function(event,ui){ Abacus.appendBallInAbacusPad(ui); }  });
  $('#column3').droppable({ accept :'#ballFor10'     ,  drop : function(event,ui){ Abacus.appendBallInAbacusPad(ui); }  });
  $('#column4').droppable({ accept :'#ballFor1'      ,  drop : function(event,ui){ Abacus.appendBallInAbacusPad(ui); }  });
  $('#ballPickerBox').droppable({ accept :'.ballInAbacusPad'    ,  drop : function(event,ui){ Abacus.removeBallFromAbacusPad(ui); } });
}

// append dragged ball in respective column
Abacus.appendBallInAbacusPad=function(ui){
  var columnNo=ui.draggable.attr("data");
  var ballsExistsInTheColumn=Number($('#'+columnNo+'>.NoOfBallsInColumn').html());
  if(ballsExistsInTheColumn<9){
    $("#"+columnNo+'>.BeadsImages > .ballNo'+(ballsExistsInTheColumn+1)).css("visibility","visible");
    $('#'+columnNo+'>.NoOfBallsInColumn').html(ballsExistsInTheColumn+1);
  }
}

//remove ball from column (back dragging)
Abacus.removeBallFromAbacusPad=function(ui){
  var columnNo=ui.draggable.attr("data");
  var ballsExistsInTheColumn=Number($('#'+columnNo+'>.NoOfBallsInColumn').html());
  $("#"+columnNo+'>.BeadsImages > .ballNo'+ballsExistsInTheColumn).css("visibility","hidden");
  $('#'+columnNo+'>.NoOfBallsInColumn').html(ballsExistsInTheColumn-1);
}      

//choose a random number to play within range of level (Maximum number,minimum nu.)
Abacus.ChooseRandomNumberToPlay=function(){
  Abacus.audioArrayOfWholeNumber=[];
  audioCounter=0;  Abacus.OnesPlace=0; Abacus.TensPlace=0; Abacus.HundredsPlace=0;Abacus.ThousandsPlace=0,Abacus.NumberOfTensAndOnesPlace=0; 
  $('.ballInAbacusPad').css('visibility','hidden');
  $('.NoOfBallsInColumn').html("0");
  if(Abacus.MaximumNumberOfLevel==99){
      //syntax : Math.floor(Math.random() * (max - min + 1)) + min
      Abacus.OnesPlace=Math.floor(Math.random() * (6 - 1 + 1)) + 1; // in range(1,6)
      Abacus.TensPlace=Math.floor(Math.random() * (6 - 1 + 1)) + 1; // in range(1,6)
  }
  else if(Abacus.MaximumNumberOfLevel==999){
    //syntax : Math.floor(Math.random() * (max - min + 1)) + min
    Abacus.OnesPlace=Math.floor(Math.random() * (6 - 0 + 1)) + 0;  //in range(0,6)
    Abacus.IterationCounter>4 && Abacus.IterationCounter<=9 ? Abacus.TensPlace=0 : Abacus.TensPlace=Math.floor(Math.random() * (6 - 0 + 1)) + 0;
    Abacus.HundredsPlace=Math.floor(Math.random() * (6 - 1 + 1)) + 1;   //in range(1,6)
  }
  else{
    //syntax : Math.floor(Math.random() * (max - min + 1)) + min
    Abacus.OnesPlace=Math.floor(Math.random() * (6 - 0 + 1)) + 0; //in range(0,6)
    Abacus.IterationCounter>4 && Abacus.IterationCounter<=9 ? Abacus.TensPlace=0 : Abacus.TensPlace=Math.floor(Math.random() * (6 - 0 + 1)) + 0;  //in range(0,6)
    Abacus.IterationCounter>4 && Abacus.IterationCounter<=9 ? Abacus.HundredsPlace=0 : Abacus.HundredsPlace=Math.floor(Math.random() * (6 - 0 + 1)) + 0;  //in range(0,6)
    Abacus.ThousandsPlace=Math.floor(Math.random() * (6 - 1 + 1)) + 1;  // in range(1,6)
  }
  Abacus.MinimumNumberOfLevel!=10 ? $("#TextOfTensAndOnesPlace").css("margin-left", "2%") : $("#TextOfTensAndOnesPlace").css("margin-left", "36%");
  Abacus.MinimumNumberOfLevel!=100 ? $("#TextOfHundredsPlace").css("margin-left", "0%") : $("#TextOfHundredsPlace").css("margin-left", "26%");

  //select random operation for "No. Banao" or "No. pehachano"
  Abacus.operation=NumberBanaoOrNumberPhechanoArray[Math.floor(Math.random()*NumberBanaoOrNumberPhechanoArray.length)];
  
  $("#TextOfThousandsPlace,#TextOfHundredsPlace,#TextOfTensAndOnesPlace,#TextOfhazar,#TextOfSou").attr("data","0").hide();
  
  if(Abacus.ThousandsPlace!=0 ){
    Abacus.audioArrayOfWholeNumber.push(Utils.Path+"sound/Numbers/"+(Abacus.ThousandsPlace*1000)+".mp3");
    Abacus.operation==1 ? $("#TextOfThousandsPlace").html(Abacus.numberTextJSON[Abacus.ThousandsPlace]) : $("#TextOfThousandsPlace").html("___");
    $("#TextOfThousandsPlace ,#TextOfhazar").show();
  }
  
  if(Abacus.HundredsPlace!=0){
    Abacus.audioArrayOfWholeNumber.push(Utils.Path+"sound/Numbers/"+(Abacus.HundredsPlace*100)+".mp3");
    Abacus.operation==1 ? $("#TextOfHundredsPlace").html(Abacus.numberTextJSON[Abacus.HundredsPlace]) : $("#TextOfHundredsPlace").html("___");
    $("#TextOfHundredsPlace ,#TextOfSou").show();
  }
  
  if(Abacus.TensPlace!=0){
    Abacus.audioArrayOfWholeNumber.push(Utils.Path+"sound/Numbers/"+Abacus.TensPlace+Abacus.OnesPlace+".mp3");
    Abacus.operation==1 ? $("#TextOfTensAndOnesPlace").html(Abacus.numberTextJSON[Abacus.TensPlace+""+Abacus.OnesPlace]) :  $("#TextOfTensAndOnesPlace").html("___");
    $("#TextOfTensAndOnesPlace").show();
  }
  else if(Abacus.OnesPlace!=0){
    Abacus.audioArrayOfWholeNumber.push(Utils.Path+"sound/Numbers/"+Abacus.OnesPlace+".mp3");
    Abacus.operation==1 ? $("#TextOfTensAndOnesPlace").html(Abacus.numberTextJSON[Abacus.OnesPlace]) :$("#TextOfTensAndOnesPlace").html("___");
    $("#TextOfTensAndOnesPlace").show();
  }

  Abacus.NumberOfTensAndOnesPlace=(Abacus.TensPlace*10 + Abacus.OnesPlace);

  // Make HTML divs hide n show as per selected operation
  if(Abacus.operation==1){
    $("#AskedQues").html(Abacus.langWiseJsonData["NumberBanao"]);
    audioTag.src=Utils.Path+"sound/ting.mp3";
    audioTag.play();
    audioTag.onended=function(){
      audioTag.src=Utils.Path+"sound/numberBanao.mp3";
      audioTag.play();
      audioTag.onended=function(){
        audioTag.pause();
        audioCounter=0;
        Abacus.playAudioList(Abacus.audioArrayOfWholeNumber,"");
      }
    }
    $("#abacusPad").css("text-align","center");
    $("#abacusPad > .ballFor1,#abacusPad > .ballFor10,#abacusPad > .ballFor100,#abacusPad > .ballFor1000").remove();
    $("#column1,#column2,#column3,#column4").show();
    $(".NoOfBallsInColumn").css("visibility","visible");
    $("#AnsOption").hide();
    $("#ballPickerBox").show();
    $("#TextOfThousandsPlace,#TextOfHundredsPlace,#TextOfTensAndOnesPlace").css({"color":"darkblue","text-decoration":"none"});
  }
  else{
    $("#AskedQues").html(Abacus.langWiseJsonData["NumberPechano"]);
    audioTag.src=Utils.Path+"sound/ting.mp3";
    audioTag.play();
    audioTag.onended=function(){
      audioTag.src=Utils.Path+"sound/NumberPehchano.mp3";
      audioTag.play();
      audioTag.onended=function(){
        audioTag.pause();
      }
    }
    $(".NoOfBallsInColumn").css("visibility","hidden");
    $("#ballPickerBox").hide();
    $("#AnsOption").show();
    $("#TextOfThousandsPlace,#TextOfHundredsPlace,#TextOfTensAndOnesPlace").css({"color":"orange","text-decoration":"underline"});
    
    // Display STyle = 1-balls under respective column...2-balls at random places
    $("#abacusPad > .ballFor1,#abacusPad > .ballFor10,#abacusPad > .ballFor100,#abacusPad > .ballFor1000").remove();
    var ballsDisplayStyle=Math.floor(Math.random() * (2 - 1 + 1)) + 1; // in range(1,2)
    if(ballsDisplayStyle==1){
      $("#abacusPad").css("text-align","center");
      $("#column1,#column2,#column3,#column4").show();
      Abacus.DisplayBeadsForNumberPhechano("column1",Abacus.ThousandsPlace);
      Abacus.DisplayBeadsForNumberPhechano("column2",Abacus.HundredsPlace);
      Abacus.DisplayBeadsForNumberPhechano("column3",Abacus.TensPlace);
      Abacus.DisplayBeadsForNumberPhechano("column4",Abacus.OnesPlace);
    }
    else{
      $("#abacusPad").css("text-align","left");
      $("#column1,#column2,#column3,#column4").hide();
      Abacus.appendBallsImagesOfRandomnumber("ballFor1000",Abacus.ThousandsPlace);
      Abacus.appendBallsImagesOfRandomnumber("ballFor100",Abacus.HundredsPlace);
      Abacus.appendBallsImagesOfRandomnumber("ballFor10",Abacus.TensPlace);
      Abacus.appendBallsImagesOfRandomnumber("ballFor1",Abacus.OnesPlace);
      Abacus.PlaceBallsInRandomPlaces();
    }
    Abacus.CreateHTMlTemplateForAnsOptionsAndAppend();
    Abacus.applyDragAndDropToAnsOptions();
  }
}

//For number pehechano ,,display style 2 (balls places at random)
Abacus.appendBallsImagesOfRandomnumber=function(imageName,NoOfImages){
    var template='';
    for(var i=1;i<=NoOfImages;i++){
        template+='<img class="ballInBallsBox '+imageName+'" src="img/'+imageName+'.png">';                
    }
    $("#abacusPad").append(template);
}

//For number pehchano ..place all balls in box at random places
Abacus.PlaceBallsInRandomPlaces=function(){
  var containerW = $("#abacusPad").width();
  var containerH = $("#abacusPad").height();
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
    $(this).animate({
      top: coords.y + 'px',
      left: coords.x + 'px'
    }, 500);
  });
}

//For number pehechano ,,display style 1 (balls under respective column)
Abacus.DisplayBeadsForNumberPhechano=function(column,NoOfBalls){
  for(var ballNo=1;ballNo<=NoOfBalls;ballNo++)
    $("#"+column+" > .BeadsImages > .ballNo"+ballNo).css("visibility","visible");
}

// for operation "number phechano" create list of ans option to fill blank places in number text & append to html div  
Abacus.CreateHTMlTemplateForAnsOptionsAndAppend=function(){
  var optionList='',TotalOptions=9;
  var RandomOptionArray=Abacus.CreateRandomOptionArray();
  for(var option=1;option<=TotalOptions;option++)
    optionList+='<div data="'+RandomOptionArray[option-1]+'"  class="row AnsOptionText">'+
              Abacus.numberTextJSON[RandomOptionArray[option-1]]+'</div>';
  $("#AnsOptionList").html(optionList);
}

// create a list of 9 (unique)option (5 from(1,9) 4 from(10,99)) including correct option ..n suffle 
Abacus.CreateRandomOptionArray=function(){
  var randomOptionArray=[],randomOption=0,oneDigitOptions=5,TwoDigitOptions=4; 
  if(Abacus.ThousandsPlace!=0){
    oneDigitOptions-- ;
    randomOptionArray.push(Abacus.ThousandsPlace);
  }
  if( Abacus.HundredsPlace!=0 &&  (Abacus.HundredsPlace!=Abacus.ThousandsPlace)   ){
    oneDigitOptions-- ;
    randomOptionArray.push(Abacus.HundredsPlace);
  }
  if(Abacus.NumberOfTensAndOnesPlace!=0 && (Abacus.HundredsPlace!=Abacus.NumberOfTensAndOnesPlace) && (Abacus.ThousandsPlace!=Abacus.NumberOfTensAndOnesPlace )){
    TwoDigitOptions--;
    randomOptionArray.push(Abacus.NumberOfTensAndOnesPlace);
  }
  for(var i=1;i<=oneDigitOptions;i++){
    //syntax : Math.floor(Math.random() * (max - min + 1)) + min
    randomOption=Math.floor(Math.random() * (9 - 1 + 1)) + 1;
    while(($.inArray(randomOption, randomOptionArray)>=0) || randomOption ==Abacus.HundredsPlace ||  randomOption ==Abacus.ThousandsPlace)
      randomOption=Math.floor(Math.random() * (9 - 1 + 1)) + 1;
    randomOptionArray.push(randomOption);  
  }
  for(var i=1;i<=TwoDigitOptions;i++){
    //syntax : Math.floor(Math.random() * (max - min + 1)) + min
    randomOption=Math.floor(Math.random() * (99 - 1 + 1)) + 1;
    while(($.inArray(randomOption, randomOptionArray)>=0) || randomOption ==Abacus.HundredsPlace ||  randomOption ==Abacus.ThousandsPlace)
      randomOption=Math.floor(Math.random() * (99 - 1 + 1)) + 1;
    randomOptionArray.push(randomOption);  
  }
  // shuffle option array
  for (var i = randomOptionArray.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = randomOptionArray[i];
    randomOptionArray[i] = randomOptionArray[j];
    randomOptionArray[j] = temp;
  }
  return randomOptionArray;
}

// for operation "number phechano" apply drag option to text options & make blank palces droppable 
Abacus.applyDragAndDropToAnsOptions=function(){
  $('.AnsOptionText').draggable({
    zIndex: 100,
    revert :'invalid',
    containment:'#gamePage',
    helper: "clone",
    start: function( event, ui ) {
      audioTag.pause();
      audioTag.src="sound/Numbers/"+$(event.target).attr("data")+".mp3";
      audioTag.play();
      audioTag.onended=function(){  audioTag.pause(); }
    }
  });
  $('#TextOfThousandsPlace,#TextOfHundredsPlace,#TextOfTensAndOnesPlace').droppable({
    accept: ".AnsOptionText",
    drop : function(event,ui){
      ui.draggable.draggable('option','revert',false);       
      if(($(this).attr("id")=="TextOfThousandsPlace" || $(this).attr("id")=="TextOfHundredsPlace") && ui.draggable.attr("data")>9){
       audioTag.pause();
       audioTag.src="sound/BuzzerWrong.mp3";
       audioTag.play();
       audioTag.onended=function(){  audioTag.pause(); }
        ui.draggable.draggable('option','revert',true);       
      }
      else{
        $(this).html(ui.draggable.html());
        $(this).attr("data",ui.draggable.attr("data"));
      }
    }
  }); 
}

//check Ans of both operation using only one if condi.  for both
Abacus.checkAnswer=function(){
 if((Number($('#column1 >.NoOfBallsInColumn').html())==Abacus.ThousandsPlace 
      && Number($('#column2 >.NoOfBallsInColumn').html())==Abacus.HundredsPlace
      && Number($('#column3 >.NoOfBallsInColumn').html())==Abacus.TensPlace 
      && Number($('#column4 >.NoOfBallsInColumn').html())==Abacus.OnesPlace) 
      ||
      (Abacus.ThousandsPlace==$("#TextOfThousandsPlace").attr("data") 
      && Abacus.HundredsPlace==$("#TextOfHundredsPlace").attr("data")
      && Abacus.NumberOfTensAndOnesPlace==$("#TextOfTensAndOnesPlace").attr("data")) ){
    Abacus.IterationCounter++;
    audioTag.src=Utils.Path+"sound/Are wah.mp3";
    audioTag.play();
    audioTag.onended=function(){
      audioTag.pause();
      if(Abacus.operation==2){
        audioCounter=0;
        Abacus.playAudioList(Abacus.audioArrayOfWholeNumber,function(){
                              Abacus.clearAbacusPad();
                              Abacus.ChooseRandomNumberToPlay();}  );
      }
      else{
        Abacus.clearAbacusPad();
        Abacus.ChooseRandomNumberToPlay();
      }
    }
  }
  else{
    audioTag.src=Utils.Path+"sound/Tryagain1.mp3";
    audioTag.play();
    audioTag.onended=function(){ Abacus.repeatQuestionSound(); };
  }
}

Abacus.repeatQuestionSound=function(){
  audioCounter=0;
  Abacus.operation==1 ? audioTag.src=Utils.Path+"sound/numberBanao.mp3" : audioTag.src=Utils.Path+"sound/NumberPehchano.mp3";
  audioTag.play();
  audioTag.onended=function(){
    audioTag.pause();
    if(Abacus.operation==1)
      Abacus.playAudioList(Abacus.audioArrayOfWholeNumber,"");
  }
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

//execute when press on clear icon
Abacus.clearAbacusPad=function(){
  audioTag.pause();
  audioTag.src= Utils.Path+"sound/clearSound.mp3";
  audioTag.play();
  audioTag.onended=function(){
    audioTag.pause();
  }
  if(Abacus.operation==1){
    $('.NoOfBallsInColumn').html("0");
    $('.ballInAbacusPad').css('visibility','hidden');
  }
  else
    $("#TextOfThousandsPlace,#TextOfHundredsPlace,#TextOfTensAndOnesPlace").html("___").attr("data","0");
}

