var counting={};
var count=1;
var audioTag;
var repeatQuestion=false;
var Operations=[1,2];  // 1=Adition ,2=Subtraction
var coutForMinusAlreadyImage;
var DoneCategories=[];
var CategoryData;
var CharacterImg,GiveObjectFrom_HTMLTemplate,GiveObjectIn_HTMLTemplate,optionButtons_HTMLTemplate='';
var Utils={};
$(document).ready(function()
{
//   Android.getPath("NumberCounting");
   Utils.Path='';
   setTimeout(function(){
        audioTag=document.getElementById('playSound');
        $("#levelOnePage").hide();
        $("#levelTwoPage").hide();
        $("#levelPage").show();
        $("#countingGame").css("background-image","url('"+Utils.Path+jsonData.levelPageImage+"')");
        $("#levelOneImg").attr("src",Utils.Path+"img/level1.jpg");
        $("#levelTwoImg").attr("src",Utils.Path+"img/level2.jpg");
        $(".SubmitButtonText").html(jsonData.submitButtonName);
        $("#levelOneText").html(jsonData.levelOneName);
        $("#levelTwoText").html(jsonData.levelTwoName);
        $(".homeIcon").attr("src",Utils.Path+"img/home.png");
        $(".SubmitButtonStyle").attr("src",Utils.Path+"img/Submit.png");
        $(".Speaker").attr("src",Utils.Path+"img/Speaker-icon.png");

        counting.Categories=Categories;
   },10);
});


counting.startLevelOne=function()
{
   $("#countingGame").css("background-image","url('"+Utils.Path+"img/Background.png')");
   $(".levelOneMsgStyle").css("background-image","url('"+Utils.Path+"img/woodboard.jpg')");

   $("#levelPage").hide();
   $("#levelTwoPage").hide();
   $("#levelOnePage").show();
   counting.selectRandomCategory();
       CategoryData=counting.Categories[counting.randomCategory];
       counting.createHTMLTemplateFor_Chracter_GiveObjectFrom_GiveObjectIn();
    $("#level1Character").append(CharacterImg);
       $("#level1GiveObjectFromDiv").append(GiveObjectFrom_HTMLTemplate);
    $("#level1GiveObjectInDiv").append(GiveObjectIn_HTMLTemplate);
    // Apply Drag And Drop Events
    counting.ApplyDragAndDropEventToObject(); 

   var countArray=[2,3,4,5,6,7,8,9]
   repeatQuestion==true ? counting.randomNumberOfObjectToGive=counting.randomNumberOfObjectToGive :counting.randomNumberOfObjectToGive=countArray[Math.floor(Math.random()*countArray.length)];
   var levelOneQuestionMsg=CategoryData.LevelOneQuestions.QuestionText+"&emsp;"+counting.randomNumberOfObjectToGive;
   $("#levelOneQuestionMsg").html(levelOneQuestionMsg);
   $("#countOfSelectedObject").html($('.Category'+CategoryData.categoryId+'GiveObjectInImgDiv>img').length);
    counting.playLevelOneQuestionSounds();
}

counting.ApplyDragAndDropEventToObject=function(){
   var count=1;
       for(var i=1;i<3;i++){
           for(j=1;j<6;j++){
              if(count<10){
                 $('#img'+count).draggable({
                    revert :'invalid',
                containment:'#levelOnePage'
                 });
              }
              count++;
          }
       }
       $('#level1GiveObjectInDiv').droppable({
          drop : function(event,ui){ 
             var id=ui.draggable.attr("id");
             $("#"+id).remove();
             var object='<img class="objectSize " src="'+Utils.Path+CategoryData.ObjectToGive+'">';
         $('#Category'+CategoryData.categoryId+'_GiveObjectIn_imgDiv'+($('.Category'+CategoryData.categoryId+'GiveObjectInImgDiv>img').length+1)).append(object);
      
         audioTag.src=Utils.Path+"sound/Numbers/"+($('.Category'+CategoryData.categoryId+'GiveObjectInImgDiv>img').length)+".mp3";
         audioTag.play();
         audioTag.onended=function() {
	   	    		audioTag.pause();
 	    }; 
          $("#countOfSelectedObject").html($('.Category'+CategoryData.categoryId+'GiveObjectInImgDiv>img').length);
          }
       });
}

counting.selectRandomCategory=function(){
   repeatQuestion==true ? counting.randomCategory=counting.randomCategory : counting.randomCategory=Math.floor(Math.random()*counting.Categories.length);
       if(repeatQuestion==false){
          if(counting.Categories.length==DoneCategories.length)
             DoneCategories=[];
       else
         while($.inArray(counting.randomCategory, DoneCategories) >=0)
            counting.randomCategory=Math.floor(Math.random()*counting.Categories.length);
      DoneCategories.push(counting.randomCategory);
       }
}

// check level One Ans.
counting.checkLevelOneAnswer=function(){
   if(counting.randomNumberOfObjectToGive==($('.Category'+CategoryData.categoryId+'GiveObjectInImgDiv>img').length)){
      $(".Character").attr("src",Utils.Path+CategoryData.Happy_Character);
      audioTag.src=Utils.Path+CategoryData.happysound;
       audioTag.play();
       repeatQuestion=false;
   }
   else{
      $(".Character").attr("src",Utils.Path+CategoryData.Angry_Character);
      audioTag.src=Utils.Path+CategoryData.wrongSound;
       audioTag.play();
       repeatQuestion=true;
    }
   setTimeout(function(){
      $('#level1Character').empty();
      $('#level1GiveObjectFromDiv').empty();
      $('#level1GiveObjectInDiv').empty();
      $('#countOfSelectedObject').empty();
      counting.startLevelOne();
   },3000);
}

// Start Level Two
counting.startLevelTwo=function()
{
   $("#countingGame").css("background-image","url('"+Utils.Path+"img/Background.png')");
   $(".levelTwoMsgStyle").css("background-image","url('"+Utils.Path+"img/woodboard.jpg')");
   $("#levelPage").hide();
   $("#levelOnePage").hide();
   $("#levelTwoPage").show();
   $('#LevelTwoSubmitButton').hide();
   $('.Speaker').hide();

   counting.selectRandomCategory();
   CategoryData=counting.Categories[counting.randomCategory];

       counting.createHTMLTemplateFor_Chracter_GiveObjectFrom_GiveObjectIn();
       optionButtons_HTMLTemplate='';
       counting.createHTMLTemplateFor_optionButtons();
    $("#level2Character").append(CharacterImg);
    $("#level2GiveObjectFromDiv").append(GiveObjectFrom_HTMLTemplate);
    $('#level2GiveObjectInDiv').append(GiveObjectIn_HTMLTemplate);
    $("#optionButtons").append(optionButtons_HTMLTemplate);
    $('#optionButtons').hide();

    counting.operation =Operations[Math.floor(Math.random()*Operations.length)];  //1=Addition ...2=Subtraction
    if(counting.operation==1)
       counting.Addition();
    else
       counting.Subtraction();
}

counting.Addition=function(){
   var msg1Array=[2,3,4,5,6,7]
   counting.countOfAlreadyHad=msg1Array[Math.floor(Math.random()*msg1Array.length)];
   var msg1=CategoryData.LevelTwoQuestions.msg1+"&emsp;"+counting.countOfAlreadyHad;
   $("#msg1").html(msg1);

    var msg2Array = [];
   for (i=2;((i+counting.countOfAlreadyHad)<=9);i++) {
       msg2Array.push(i);
   }
   counting.countOfNewGiving=msg2Array[Math.floor(Math.random()*msg2Array.length)];
   var msg2=CategoryData.LevelTwoQuestions.msg2+"&emsp;"+counting.countOfNewGiving;
   $("#msg2").html(msg2);
   $("#msg3").html(CategoryData.LevelTwoQuestions.msg4);

    audioTag.src=Utils.Path+CategoryData.LevelTwoQuestions.msg1sound;
   audioTag.play();
    audioTag.onended=function() {
      audioTag.src=Utils.Path+"sound/Numbers/"+counting.countOfAlreadyHad+".mp3";
      audioTag.play();
      audioTag.onended=function() {
             counting.displayAlreadyHadImages(counting.countOfAlreadyHad);
      };
   }; 
}

counting.Subtraction=function(){
    var msg1Array=[4,5,6,7,8,9]
   counting.countOfAlreadyHad=msg1Array[Math.floor(Math.random()*msg1Array.length)];
   coutForMinusAlreadyImage=counting.countOfAlreadyHad;
   var msg1=CategoryData.LevelTwoQuestions.msg1+counting.countOfAlreadyHad;
   $("#msg1").html(msg1);

   var msg2Array = [];
   for (i=2;(i<=(counting.countOfAlreadyHad-2));i++) {
       msg2Array.push(i);
   }
   counting.countOfMinus=msg2Array[Math.floor(Math.random()*msg2Array.length)];
   var msg2=CategoryData.LevelTwoQuestions.msg3+counting.countOfMinus;
   $("#msg2").html(msg2);
   $("#msg3").html(CategoryData.LevelTwoQuestions.msg4);

    audioTag.src=Utils.Path+CategoryData.LevelTwoQuestions.msg1sound;
   audioTag.play();
   audioTag.onended=function() {
       audioTag.pause();
      audioTag.src=Utils.Path+"sound/Numbers/"+counting.countOfAlreadyHad+".mp3";
      audioTag.play();
      audioTag.onended=function() {
             audioTag.pause();
             counting.displayAlreadyHadImages(counting.countOfAlreadyHad);
      };
   };
}

counting.displayAlreadyHadImages=function(imagescount){

   if(count<=imagescount){
      var msg1images='<div class="col-md-1 col-lg-1 col-sm-1 col-xs-1" style="padding: 0%;width: 11%;"><img src="'+Utils.Path+CategoryData.ObjectToGive+'" style="height: 33px;width: 99%;" /></div>';
      $("#msg1images").append(msg1images);
      var imgInWhat='<img class="objectSize" src='+Utils.Path+CategoryData.ObjectToGive+
                     ' id="inWhatImg'+count+'"></img>';
      $('#Category'+CategoryData.categoryId+'_GiveObjectIn_imgDiv'+count).append(imgInWhat);
       $("#msg1imagescount").html(count);

      audioTag.pause();
      audioTag.src=Utils.Path+"sound/Numbers/"+count+".mp3";
       audioTag.play();
       count++;
           audioTag.onended=function() {
          audioTag.pause();
          counting.displayAlreadyHadImages(imagescount);
      }; 
   }
   else{
      count=1;
      if(counting.operation==1){
         audioTag.src=Utils.Path+CategoryData.LevelTwoQuestions.msg2sound;
          audioTag.play();
              audioTag.onended=function() {
            audioTag.src=Utils.Path+"sound/Numbers/"+counting.countOfNewGiving+".mp3";
            audioTag.play();
            audioTag.onended=function() {
                counting.displayNewGivingImages(counting.countOfNewGiving);
            };
         };  
       }
       else{
          audioTag.src=Utils.Path+CategoryData.LevelTwoQuestions.msg3sound;
          audioTag.play();
          audioTag.onended=function() {
            audioTag.src=Utils.Path+"sound/Numbers/"+counting.countOfMinus+".mp3";
            audioTag.play();
            audioTag.onended=function() {
                counting.displayNewGivingImages(counting.countOfMinus);
            };
         }; 
       }
    }
}

counting.displayNewGivingImages=function(imagescount){

   if(count<=imagescount){
      var msg2images='<div class="col-md-1 col-lg-1 col-sm-1 col-xs-1" style="padding: 0%;width: 11%;"><img src="'+Utils.Path+CategoryData.ObjectToGive+'" style="height: 33px;width: 99%;" /></div>';
      $("#msg2images").append(msg2images);
      var imgInWhat='<img class="objectSize" src='+Utils.Path+CategoryData.ObjectToGive+
                     ' ></img>';
      if(counting.operation==1){
         $('#img'+count).hide();
          $('#Category'+CategoryData.categoryId+'_GiveObjectIn_imgDiv'+(counting.countOfAlreadyHad+count)).append(imgInWhat);
        }
        else{
           $('#inWhatImg'+coutForMinusAlreadyImage).hide();
         $(".Character").attr("src",Utils.Path+CategoryData.gifForMinus);
           coutForMinusAlreadyImage--;
        }
       $("#msg2imagescount").html(count);

        audioTag.src=Utils.Path+"sound/Numbers/"+count+".mp3";
       audioTag.play();
       count++;
       audioTag.onended=function() {
          audioTag.pause();
          counting.displayNewGivingImages(imagescount);
      }; 
   }
   else{
      count=1;
      $(".Character").attr("src",Utils.Path+CategoryData.Normal_Character);
      audioTag.src=Utils.Path+CategoryData.LevelTwoQuestions.msg4sound;
       audioTag.play();
      audioTag.onended=function() {
         $('#level2GiveObjectInDiv').find('img').addClass('blink_me');
         $('#Category'+CategoryData.categoryId+'GiveObjectIn').removeClass('blink_me');
           $('#optionButtons').show();
              $('.Speaker').show();
         $('#LevelTwoSubmitButton').show();
              
      };
   }
}


counting.ShowObjectsInAnsRow=function(objectCount)
{
   $('#msg3images').empty();
   var msg3images='';
   for(var i=1;i<=objectCount;i++){
      msg3images+='<div class="col-md-1 col-lg-1 col-sm-1 col-xs-1" style="padding: 0%;width: 11%;"><img src="'+Utils.Path+CategoryData.ObjectToGive+'" style="height: 33px;width: 99%;"  /></div>';
   }
   $("#msg3images").append(msg3images);
   $("#msg3imagescount").html(objectCount);
   
   audioTag.src=Utils.Path+"sound/Numbers/"+objectCount+".mp3";
   audioTag.play();
}

counting.checkLevelTwoAns=function()
{
   var ans=false; 
   if(counting.operation==1){
      if((counting.countOfAlreadyHad+counting.countOfNewGiving)==($('#msg3images>Div>img').length))
         ans=true;    
    }
    else if(counting.operation==2){
       if((counting.countOfAlreadyHad-counting.countOfMinus)==($('#msg3images>Div>img').length))
         ans=true;
    }
    if(ans==true){
       $(".Character").attr("src",Utils.Path+CategoryData.Happy_Character);
         audioTag.src=Utils.Path+CategoryData.happysound;
          audioTag.play();
         setTimeout(function(){
            count=1;
            $('#level2Character').empty();
            $('#level2GiveObjectFromDiv').empty();
            $('#level2GiveObjectInDiv').empty();
            $('#msg1images').empty();
            $('#msg2images').empty();
            $('#msg3images').empty();
            $('#msg1imagescount').empty();
            $('#msg2imagescount').empty();
            $('#msg3imagescount').empty();
            $('#optionButtons').empty();
            counting.startLevelTwo();
         },3000);
    }
   else{
      $(".Character").attr("src",Utils.Path+CategoryData.Angry_Character);
      audioTag.src=Utils.Path+CategoryData.wrongSound;
       audioTag.play();
      setTimeout(function(){
         $(".Character").attr("src",Utils.Path+CategoryData.Normal_Character);
      },2000);
   }
}; 

counting.playLevelOneQuestionSounds=function(){
   audioTag.src=Utils.Path+CategoryData.LevelOneQuestions.QuestionSound;
   audioTag.play();
   audioTag.onended=function() {
          audioTag.src=Utils.Path+"sound/Numbers/"+counting.randomNumberOfObjectToGive+".mp3";
       audioTag.play();
          audioTag.onended=function() {
          audioTag.pause();
      };
   }; 
}

counting.playLevelTwoQuestionSounds=function(){
   audioTag.src=Utils.Path+CategoryData.LevelTwoQuestions.msg1sound;
   audioTag.play();
   audioTag.onended=function() {
          audioTag.src=Utils.Path+"sound/Numbers/"+counting.countOfAlreadyHad+".mp3";
       audioTag.play();
          audioTag.onended=function() {
          audioTag.src=Utils.Path+counting.operation==1 ? CategoryData.LevelTwoQuestions.msg2sound : CategoryData.LevelTwoQuestions.msg3sound;
          audioTag.play();
          audioTag.onended=function() {
             audioTag.src=Utils.Path+counting.operation==1 ? "sound/Numbers/"+counting.countOfNewGiving+".mp3": "sound/Numbers/"+counting.countOfMinus+".mp3";
             audioTag.play();
             audioTag.onended=function() {
                audioTag.src=Utils.Path+CategoryData.LevelTwoQuestions.msg4sound;
                audioTag.play();
                audioTag.onended=function() {
                   audioTag.pause();
               };
            };

         };
      };
   }; 
}

counting.createHTMLTemplateFor_Chracter_GiveObjectFrom_GiveObjectIn=function(){
   CharacterImg='<img class="Character Category'+CategoryData.categoryId+'Character fitImage" src="'+Utils.Path+CategoryData.Normal_Character+'">';

       GiveObjectFrom_HTMLTemplate='<img id="Category'+
                       CategoryData.categoryId+'GiveObjectFrom" src="'+Utils.Path+CategoryData.GiveObjectFrom+'" class="fitImage" style="position: absolute;"></img>';
       GiveObjectIn_HTMLTemplate='<img id="Category'+
                       CategoryData.categoryId+'GiveObjectIn" src="'+Utils.Path+CategoryData.GiveObjectIn+'" class="fitImage" style="position: absolute;"></img>';
   var count=1;
       for(var i=1;i<3;i++){
           GiveObjectFrom_HTMLTemplate+='<div class="Category'+CategoryData.categoryId+'GiveObjectFromRowHeight Category'+CategoryData.categoryId+'GiveObjectFromRow'+i+'Position  col-md-12 col-lg-12 col-sm-12 col-xs-12">';
           GiveObjectIn_HTMLTemplate+='<div class="Category'+CategoryData.categoryId+'GiveObjectInRowHeight  Category'+CategoryData.categoryId+'GiveObjectInRow'+i+'Position  col-md-12 col-lg-12 col-sm-12 col-xs-12">';
           for(j=1;j<6;j++){
              if(count<10){
              GiveObjectFrom_HTMLTemplate+='<div id="Category'+CategoryData.categoryId+'_GiveObjectFrom_imgDiv'+count+'" class="col-md-2 col-lg-2 col-sm-2 col-xs-2 img-outer Category'+CategoryData.categoryId+'GiveObjectFromImgDiv" >'+
                          '<img class="objectSize " src='+Utils.Path+CategoryData.ObjectToGive+
                        ' id="img'+count+'" ></img></div>';
              
              GiveObjectIn_HTMLTemplate+='<div id="Category'+CategoryData.categoryId+'_GiveObjectIn_imgDiv'+count+'" class="col-md-2 col-lg-2 col-sm-2 col-xs-2 Category'+CategoryData.categoryId+'GiveObjectInImgDiv" ></div>';
           }
           count++;
           }
           GiveObjectFrom_HTMLTemplate+='</div>';
           GiveObjectIn_HTMLTemplate+='</div>';
   }
}

counting.createHTMLTemplateFor_optionButtons=function(){
   for(i=1;i<10;i+=3){
       optionButtons_HTMLTemplate+='<div class="row" style="height: 33%;"">'+
                       '<div class="col-md-3 col-lg-3 col-sm-4 col-xs-4  optionButtons blink_me" onclick="counting.ShowObjectsInAnsRow('+i+');">'+
                          '<div id="div'+i+'" >'+i+'</div>'+ 
                        '</div>'+
                        '<div class="col-md-3 col-lg-3 col-sm-4 col-xs-4  optionButtons blink_me" onclick="counting.ShowObjectsInAnsRow('+(i+1)+');">'+
                          '<div id="div'+(i+1)+'" >'+(i+1)+'</div>'+ 
                        '</div>'+
                        '<div class="col-md-3 col-lg-3 col-sm-4 col-xs-4 optionButtons blink_me" onclick="counting.ShowObjectsInAnsRow('+(i+2)+');">'+
                          '<div id="div'+(i+2)+'" >'+(i+2)+'</div>'+ 
                        '</div>'+
                    '</div>';
                    
    }
}