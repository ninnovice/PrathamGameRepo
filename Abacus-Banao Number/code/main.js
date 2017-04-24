var Abacus={};
var audioCounter=0;
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
  Abacus.IterationCounter=0;
  $("#AbacusGameMainDiv").css("background-image","url('"+Utils.Path+"img/BodyBG.jpg')");
  $("#levelOneImage").prop("src",Utils.Path+"img/10_99.jpg");
  $("#levelTwoImage").prop("src",Utils.Path+"img/100_999.jpg");
  $("#levelThreeImage").prop("src",Utils.Path+"img/1000_9999.jpg");
  $(".homeIcon").prop("src",Utils.Path+"img/home.png");
  $("#ballFor1").prop("src",Utils.Path+"img/ballFor1.png");
  $("#ballFor10").prop("src",Utils.Path+"img/ballFor10.png");
  $("#ballFor100").prop("src",Utils.Path+"img/ballFor100.png");
  $("#ballFor1000").prop("src",Utils.Path+"img/ballFor1000.png");
  $(".SpeakerIcon").prop("src",Utils.Path+"img/Speaker.png");
  $(".ClearIcon").prop("src",Utils.Path+"img/Clear.png");
  $(".SubmitIcon").prop("src",Utils.Path+"img/Submit.png");
  $(".NextIcon").prop("src",Utils.Path+"img/Next.png");
  $('#levelPage').show();
  $('#gamePage').hide();
}

Abacus.registerEventListener=function(){
  $("#levelOneImage").on("click",function(){
    Abacus.startgameForRange(10,99);
  });
  $("#levelTwoImage").on("click",function(){
    Abacus.startgameForRange(100,999);
  });
  $("#levelThreeImage").on("click",function(){
    Abacus.startgameForRange(1000,9999);
  });
  $(".SpeakerIcon").on("click",function(){
    $(".SpeakerIcon").addClass("animated pulse");
    Abacus.repeatQuestionSound();});
  $(".ClearIcon").on("click",function(){
    $(".ClearIcon").addClass("animated pulse");
    Abacus.clearAbacusPad();});
  $(".SubmitIcon").on("click",function(){
    $(".SubmitIcon").addClass("animated pulse");
    Abacus.checkAnswer();});
  $(".NextIcon").on("click",Abacus.ChooseRandomNumberToPlay);
}

Abacus.startgameForRange=function(MinimumNumber,MaximumNumber){
  $('#gamePage').show();
  $('#levelPage').hide();
  Abacus.MinimumNumber=MinimumNumber;
  Abacus.MaximumNumber=MaximumNumber;
  Abacus.attachBallsToRespectivePlaces();
  Abacus.applyDragAndDrop();
  Abacus.ChooseRandomNumberToPlay();
}

Abacus.attachBallsToRespectivePlaces=function(){
  var template='',maxRowInColumn=5;
  for(var row=1;row<=maxRowInColumn;row++){
    template+='<div class="BeadsImages row" style="margin-top:2px;">'+
                    '<img  class="ball ballNo'+(row)+'" src="">'+
                  '<img  class="ball ballNo'+(row+5)+'" src="">'+
                '</div>'; 
  }

  $('#column1,#column2,#column3,#column4').append(template);
  $('#column1 >.BeadsImages >.ball').attr({src:Utils.Path+"img/ballFor1000.png", data:"column1"});
  $('#column2 >.BeadsImages >.ball').attr({src:Utils.Path+"img/ballFor100.png", data:"column2"})
  $('#column3 >.BeadsImages >.ball').attr({src:Utils.Path+"img/ballFor10.png", data:"column3"})
  $('#column4 >.BeadsImages >.ball').attr({src:Utils.Path+"img/ballFor1.png", data:"column4"})
}

Abacus.applyDragAndDrop=function(){
  $('.ballInPickerBox').draggable({
    zIndex: 100,
    revert :'invalid',
    containment:'#gamePage',
    helper: "clone"
  });
  $('#column1').droppable({
    accept :'#ballFor1000',
    drop : function(event,ui){
      Abacus.appendBallInAbacusPad(ui);      
    }
  });
  $('#column2').droppable({
    accept :'#ballFor100',
    drop : function(event,ui){
      Abacus.appendBallInAbacusPad(ui);      
    }
  });
  $('#column3').droppable({
    accept :'#ballFor10',
    drop : function(event,ui){
      Abacus.appendBallInAbacusPad(ui);      
    }
  });
  $('#column4').droppable({
    accept :'#ballFor1',
    drop : function(event,ui){
      Abacus.appendBallInAbacusPad(ui);      
    }
  });
  $('.ball').draggable({
    zIndex: 100,
    revert :'invalid',
    containment:'#gamePage',
    helper: "clone"
  });
  $('#ballPickerBox').droppable({
    accept :'.ball',
    drop : function(event,ui){ 
      Abacus.removeBallFromAbacusPad(ui);      
    }
  });
}

Abacus.appendBallInAbacusPad=function(ui){
  var columnNo=ui.draggable.attr("data");
  var ballsExistsInTheColumn=$('#'+columnNo+'>.NoOfBallsInColumn').html();
  if(Number(ballsExistsInTheColumn)<9){
    $("#"+columnNo+'>.BeadsImages > .ballNo'+(Number(ballsExistsInTheColumn)+1)).css("visibility","visible");
    $('#'+columnNo+'>.NoOfBallsInColumn').html(Number(ballsExistsInTheColumn)+1);
  }
}

Abacus.removeBallFromAbacusPad=function(ui){
  var columnNo=ui.draggable.attr("data");
  var ballsExistsInTheColumn=$('#'+columnNo+'>.NoOfBallsInColumn').html();
  $("#"+columnNo+'>.BeadsImages > .ballNo'+(Number(ballsExistsInTheColumn))).css("visibility","hidden");
  $('#'+columnNo+'>.NoOfBallsInColumn').html(Number(ballsExistsInTheColumn)-1);
}      

Abacus.ChooseRandomNumberToPlay=function(){
  var numberText='';
  var NumberBanaoOrNumberPhechanoArray=[1,2];  // 1=Number Banao ,2 =number phechano  
  Abacus.audioArrayOfWholeNumber=[];
  audioCounter=0;
  $('.ball').css('visibility','hidden');
  $('.NoOfBallsInColumn').html("0");

  Abacus.OnesPlace=0; Abacus.TensPlace=0; Abacus.HundredsPlace=0;Abacus.ThousandsPlace=0; Abacus.NumberOfTensAndOnesPlace=0;

  if(Abacus.MaximumNumber==99){
      Abacus.OnesPlace=Math.floor(Math.random() * (6 - 1 + 1)) + 1;
      Abacus.TensPlace=Math.floor(Math.random() * (6 - 1 + 1)) + 1;
  }
  else if(Abacus.MaximumNumber==999){
    Abacus.OnesPlace=Math.floor(Math.random() * (6 - 0 + 1)) + 0;
    Abacus.IterationCounter>4 && Abacus.IterationCounter<=9 ? Abacus.TensPlace=0 : Abacus.TensPlace=Math.floor(Math.random() * (6 - 0 + 1)) + 0;
    Abacus.HundredsPlace=Math.floor(Math.random() * (6 - 1 + 1)) + 1;
  }
  else{
    Abacus.OnesPlace=Math.floor(Math.random() * (6 - 0 + 1)) + 0;
    Abacus.IterationCounter>4 && Abacus.IterationCounter<=9 ? Abacus.TensPlace=0 : Abacus.TensPlace=Math.floor(Math.random() * (6 - 0 + 1)) + 0;
    Abacus.IterationCounter>4 && Abacus.IterationCounter<=9 ? Abacus.HundredsPlace=0 : Abacus.HundredsPlace=Math.floor(Math.random() * (6 - 0 + 1)) + 0;
    Abacus.ThousandsPlace=Math.floor(Math.random() * (6 - 1 + 1)) + 1;
  }
 
 //Abacus.ThousandsPlace=3;Abacus.HundredsPlace=7 ;Abacus.TensPlace=0;Abacus.OnesPlace=7;

 Abacus.MinimumNumber!=10 ? $("#TextOfTensPlace").css("margin-left", "2%") : $("#TextOfTensPlace").css("margin-left", "36%");
 Abacus.MinimumNumber!=10 ? $("#AnsList2").css("margin-left", "16%") : $("#AnsList2").css("margin-left", "35%");
 Abacus.MinimumNumber!=100 ? $("#TextOfHundredsPlace").css("margin-left", "0%") : $("#TextOfHundredsPlace").css("margin-left", "26%");

  Abacus.operation=1;
  Abacus.operation= NumberBanaoOrNumberPhechanoArray[Math.floor(Math.random()*NumberBanaoOrNumberPhechanoArray.length)];
  
  if(Abacus.ThousandsPlace!=0 ){
    Abacus.audioArrayOfWholeNumber.push(Utils.Path+"sound/Numbers/"+(Abacus.ThousandsPlace*1000)+".mp3");
    Abacus.operation==1 ? $("#TextOfThousandsPlace").html(numberTextJSON[Abacus.ThousandsPlace]) : $("#TextOfThousandsPlace").html("___");
    $("#TextOfThousandsPlace ,#TextOfhazar").show();
  }
  else{
    $("#TextOfThousandsPlace").attr("data","0");
    $("#TextOfThousandsPlace ,#TextOfhazar").hide();
  }
  
  if(Abacus.HundredsPlace!=0){
    Abacus.audioArrayOfWholeNumber.push(Utils.Path+"sound/Numbers/"+(Abacus.HundredsPlace*100)+".mp3");
    Abacus.operation==1 ? $("#TextOfHundredsPlace").html(numberTextJSON[Abacus.HundredsPlace]) : $("#TextOfHundredsPlace").html("___");
    $("#TextOfHundredsPlace ,#TextOfSou").show();
  }
  else{
    $("#TextOfHundredsPlace").attr("data","0");
    $("#TextOfHundredsPlace ,#TextOfSou").hide();
  }

  if(Abacus.TensPlace!=0){
    Abacus.audioArrayOfWholeNumber.push(Utils.Path+"sound/Numbers/"+Abacus.TensPlace+Abacus.OnesPlace+".mp3");
    Abacus.operation==1 ? $("#TextOfTensPlace").html(numberTextJSON[Abacus.TensPlace+""+Abacus.OnesPlace]) :  $("#TextOfTensPlace").html("___");
    $("#TextOfTensPlace").show();
    Abacus.NumberOfTensAndOnesPlace=(Abacus.TensPlace*10 + Abacus.OnesPlace);
  }
  else if(Abacus.OnesPlace!=0){
    Abacus.audioArrayOfWholeNumber.push(Utils.Path+"sound/Numbers/"+Abacus.OnesPlace+".mp3");
    Abacus.operation==1 ? $("#TextOfTensPlace").html(numberTextJSON[Abacus.OnesPlace]) :$("#TextOfTensPlace").html("___");
    $("#TextOfTensPlace").show();
    Abacus.NumberOfTensAndOnesPlace=(Abacus.OnesPlace);
  }
  else{
    $("#TextOfTensPlace").attr("data","0");
    $("#TextOfTensPlace").hide();
  }

  if(Abacus.operation==1){
    $("#AskedQues").html("नंबर बनाओ");
    audioTag.src=Utils.Path+"sound/numberBanao.mp3";
    audioTag.play();
    audioTag.onended=function(){
      audioTag.pause();
      audioCounter=0;
      Abacus.playAudioList(Abacus.audioArrayOfWholeNumber,"");
    }
    $(".NoOfBallsInColumn").css("visibility","visible");
    $("#AnsTitle,#AnsList1,#AnsList2").hide();
    $("#ballPickerBox").show();
    $("#TextOfThousandsPlace,#TextOfHundredsPlace,#TextOfTensPlace").css("color", "darkblue");
    $("#TextOfThousandsPlace,#TextOfHundredsPlace,#TextOfTensPlace").css("text-decoration", "none");
  }
  else{
    $("#AskedQues").html("नंबर पहचानो");
    audioTag.src=Utils.Path+"sound/numberBanao.mp3";
    audioTag.play();
    audioTag.onended=function(){
      audioTag.pause();
    }
    $(".NoOfBallsInColumn").css("visibility","hidden");
    $("#ballPickerBox").hide();
    $("#AnsTitle,#AnsList2").show();
    if(Abacus.MinimumNumber!=10)
          $("#AnsList1").show();
    if(Abacus.OnesPlace==0 && Abacus.TensPlace==0)
          $("#AnsList2").hide();
    $("#TextOfThousandsPlace,#TextOfHundredsPlace").css("color", "orange");
    $("#TextOfTensPlace").css("color", "blueviolet");
    $("#TextOfThousandsPlace,#TextOfHundredsPlace,#TextOfTensPlace").css("text-decoration", "underline");
    Abacus.DisplayBeadsForNumberPhechano("column1",Abacus.ThousandsPlace);
    Abacus.DisplayBeadsForNumberPhechano("column2",Abacus.HundredsPlace);
    Abacus.DisplayBeadsForNumberPhechano("column3",Abacus.TensPlace);
    Abacus.DisplayBeadsForNumberPhechano("column4",Abacus.OnesPlace);
    $("#AnsList1").empty();
    $("#AnsList2").empty();
    Abacus.CreateHTMlTemplateForAnsOptionsAndAppend();
    Abacus.applyDragAndDropToAnsOptions();
  }
}

Abacus.DisplayBeadsForNumberPhechano=function(column,NoOfBalls){
  for(var ballNo=1;ballNo<=NoOfBalls;ballNo++){
    $("#"+column+" > .BeadsImages > .ballNo"+ballNo).css("visibility","visible");
  }
}

Abacus.CreateHTMlTemplateForAnsOptionsAndAppend=function(){
  var optionList1='',optionList2='';
  var TotalOptions=9;
  var CreateRandomOptionArrayForAnsList2=Abacus.CreateRandomOptionArrayForAnsList2();
  for(var option=1;option<=TotalOptions;option++){
    optionList1+='<div data="'+option+'"  class="row AnsOptions">'+
              numberTextJSON[option]+'</div>';
    optionList2+='<div data="'+CreateRandomOptionArrayForAnsList2[option-1]+'"  class="row AnsOptions">'+
              numberTextJSON[CreateRandomOptionArrayForAnsList2[option-1]]+'</div>';
  }
  $("#AnsList1").append(optionList1);
  $("#AnsList2").append(optionList2);
}

Abacus.CreateRandomOptionArrayForAnsList2=function(){
  var randomOptionArrayForAnsList2=[];
  var randomOption=0;
  //select 8 random random options 
  for(var i=1;i<=8;i++){
    randomOption=Math.floor(Math.random() * (99 - 1 + 1)) + 1;
    while(($.inArray(randomOption, randomOptionArrayForAnsList2)>=0) || randomOption ==Abacus.NumberOfTensAndOnesPlace )
      randomOption=Math.floor(Math.random() * (99 - 1 + 1)) + 1;
    randomOptionArrayForAnsList2.push(randomOption);  
  }
  //push actual ans 
  randomOptionArrayForAnsList2.push(Abacus.NumberOfTensAndOnesPlace);
  console.log(randomOptionArrayForAnsList2);   

  // shuffle option array
  for (var i = randomOptionArrayForAnsList2.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = randomOptionArrayForAnsList2[i];
        randomOptionArrayForAnsList2[i] = randomOptionArrayForAnsList2[j];
        randomOptionArrayForAnsList2[j] = temp;
  }
  console.log(randomOptionArrayForAnsList2);   
  return randomOptionArrayForAnsList2;
}

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
  $('#TextOfThousandsPlace,#TextOfHundredsPlace').droppable({
    accept: "#AnsList1 > .AnsOptions",
    drop : function(event,ui){
      $(this).html(ui.draggable.html());
      $(this).attr("data",ui.draggable.attr("data"));
    }
  }); 
  $('#TextOfTensPlace').droppable({
    accept:"#AnsList2 > .AnsOptions",
    drop : function(event,ui){
      $(this).html(ui.draggable.html());
      $(this).attr("data",ui.draggable.attr("data"));
    }
  }); 
}

Abacus.checkAnswer=function(){
  if((Number($('#column1 >.NoOfBallsInColumn').html())==Abacus.ThousandsPlace 
      && Number($('#column2 >.NoOfBallsInColumn').html())==Abacus.HundredsPlace
      && Number($('#column3 >.NoOfBallsInColumn').html())==Abacus.TensPlace 
      && Number($('#column4 >.NoOfBallsInColumn').html())==Abacus.OnesPlace) 
      ||
      (Abacus.ThousandsPlace==$("#TextOfThousandsPlace").attr("data") 
      && Abacus.HundredsPlace==$("#TextOfHundredsPlace").attr("data")
      && Abacus.NumberOfTensAndOnesPlace==$("#TextOfTensPlace").attr("data")) ){
    Abacus.IterationCounter++;
    audioTag.src=Utils.Path+"sound/Are wah.mp3";
    audioTag.play();
    audioTag.onended=function(){
      $(".SubmitIcon").removeClass("animated pulse");
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
    audioTag.onended=function(){
     $(".SubmitIcon").removeClass("animated pulse");
      Abacus.repeatQuestionSound();
    }
  }
}

Abacus.repeatQuestionSound=function(){
  audioCounter=0;
  if(Abacus.operation==1){
    audioTag.src=Utils.Path+"sound/numberBanao.mp3";
    audioTag.play();
    audioTag.onended=function(){
      $(".SpeakerIcon").removeClass("animated pulse");
      audioTag.pause();
      audioCounter=0;
      Abacus.playAudioList(Abacus.audioArrayOfWholeNumber,"");
    }
  }
  else{
    audioTag.src=Utils.Path+"sound/numberBanao.mp3";
    audioTag.play();
    audioTag.onended=function(){
      $(".SpeakerIcon").removeClass("animated pulse");
      audioTag.pause();
    }
  }

}

Abacus.playAudioList=function(AudioList,callBackFunction){
  audioTag.pause();
  audioTag.src= AudioList[audioCounter];
  audioTag.play();
  audioCounter++
  audioTag.onended=function(){
    audioTag.pause();
  }
  if(audioCounter<(AudioList.length)){
    audioTag.onended=function(){
    Abacus.playAudioList(AudioList,callBackFunction);  
    }
  }
  else{
    audioCounter=0;
    audioTag.onended=function(){
      if(callBackFunction!='')
        callBackFunction.call();
    }
  }
}

Abacus.clearAbacusPad=function(){
  audioTag.pause();
  audioTag.src= Utils.Path+"sound/clearSound.mp3";
  audioTag.play();
  audioTag.onended=function(){
    $(".ClearIcon").removeClass("animated pulse");
    audioTag.pause();
  }
  if(Abacus.operation==1){
    $('.NoOfBallsInColumn').html("0");
    $('.ball').css('visibility','hidden');
  }
  else{
    $("#TextOfThousandsPlace,#TextOfHundredsPlace,#TextOfTensPlace").html("___");
     $("#TextOfThousandsPlace,#TextOfHundredsPlace,#TextOfTensPlace").attr("data","");
  }
}