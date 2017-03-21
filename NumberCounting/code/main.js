
var counting={};
var count=1;
var itemSelected=0;
var audioTag;
var repeatQuestion=false;
var Operations=[1,2];  // 1=Adition ,2=Subtraction
var coutForMinusAlreadyImage;
var DoneCategories=[];
$(document).ready(function()
{
	audioTag=document.getElementById('playSound');
	$("#levelOnePage").hide();
	$("#levelTwoPage").hide();
	$("#levelPage").show();
	$("#countingGame").css("background-image","url('"+jsonData.levelPageImage+"')");
	$(".SubmitButtonText").html(jsonData.submitButtonName);
	$("#levelOneText").html(jsonData.levelOneName);
	$("#levelTwoText").html(jsonData.levelTwoName);
	counting.Categories=Categories;
    counting.randomCategory=1;

});


counting.startLevelOne=function()
{
	$("#countingGame").css("background-image","url('img/Background.png')");
	$("#levelPage").hide();
	$("#levelTwoPage").hide();
	$("#levelOnePage").show();
	$("#CharacterOfLevel1").removeClass("Category"+counting.Categories[counting.randomCategory].categoryId+"Character"); //applied width and height to image
   	repeatQuestion==true ? counting.randomCategory=counting.randomCategory : counting.randomCategory=Math.floor(Math.random()*counting.Categories.length);
   	if(repeatQuestion==false){
   		if(counting.Categories.length==DoneCategories.length)
   			DoneCategories=[];
     	else
 	  		while($.inArray(counting.randomCategory, DoneCategories) >=0)
 				counting.randomCategory=Math.floor(Math.random()*counting.Categories.length);
		DoneCategories.push(counting.randomCategory);
   	}
   	$("#CharacterOfLevel1").attr("src",counting.Categories[counting.randomCategory].Normal_Character);
   	$("#CharacterOfLevel1").addClass("Category"+counting.Categories[counting.randomCategory].categoryId+"Character");
	var newelement='<img id="whatBG'+
     	             counting.Categories[counting.randomCategory].categoryId+'" src="'+counting.Categories[counting.randomCategory].GiveObjectFrom+'" class="blockimage" style="position: absolute;"></img>';
   	var emptyelement='<img id="Category'+
  	     	             counting.Categories[counting.randomCategory].categoryId+'GiveObjectIn" src="'+counting.Categories[counting.randomCategory].GiveObjectIn+'" class="blockimage" style="position: absolute;"></img>';
	var count=1;
   	for(var i=1;i<3;i++){
       	newelement+='<div class="col-md-12 col-lg-12 col-sm-12 col-xs-12 whatrowheight'+counting.Categories[counting.randomCategory].categoryId+' whatRow'+i+'Category'+counting.Categories[counting.randomCategory].categoryId+'">';
       	emptyelement+='<div class="col-md-12 col-lg-12 col-sm-12 col-xs-12 inWhatrowheight'+counting.Categories[counting.randomCategory].categoryId+' inWhatRow'+i+'Category'+counting.Categories[counting.randomCategory].categoryId+'">';
       	for(j=1;j<6;j++){
       		if(count<10){
       		newelement+='<div class="col-md-2 col-lg-2 col-sm-2 col-xs-2 img-outer whatFiveDivC'+counting.Categories[counting.randomCategory].categoryId+'" id="what1'+
       	            	 counting.Categories[counting.randomCategory].categoryId+'_'+count+'" >'+
     	            	    '<img class="threeImagesRow " src='+counting.Categories[counting.randomCategory].ObjectToGive+
     				        ' id="img'+count+'" ></img></div>';
       		}
       		emptyelement+='<div id="inWhat1'+
       	             counting.Categories[counting.randomCategory].categoryId+'_'+count+'" class="col-md-2 col-lg-2 col-sm-2 col-xs-2 inWhatFiveDivC'+counting.Categories[counting.randomCategory].categoryId+'" ></div>';
  	        count++;
       	}
       	newelement+='</div>';
       	emptyelement+='</div>';
  	}
   
   	$("#what").append(newelement);
    $("#level1GiveObjectInDiv").append(emptyelement);

    // Apply Drag And Drop Events 
   	var count=1;
   	for(var i=1;i<3;i++){
       	for(j=1;j<6;j++){
       		if(count<10){
       			$('#img'+count).draggable({
       				cursor:'move',
       				revert :'invalid',
       				stack : '#img'+count,
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
   			var ele='<img class="threeImagesRow " src="'+counting.Categories[counting.randomCategory].ObjectToGive+'">';
			$('#inWhat1'+counting.Categories[counting.randomCategory].categoryId+'_'+(itemSelected+1)).append(ele);
			itemSelected++;
		
			audioTag.src="sound/Numbers/"+itemSelected+".mp3";
			audioTag.play();
		//	var aud1= "NumberCounting/sound/Numbers/"+itemSelected+".mp3"; 
		//	Android.playAudio(aud1);
      		
      		$("#countOfSelectedObject").html(itemSelected);
   		}
   	});
	
	var countArray=[2,3,4,5,6,7,8,9]
	repeatQuestion==true ? counting.randomNumber=counting.randomNumber :counting.randomNumber=countArray[Math.floor(Math.random()*countArray.length)];
	var levelOneQuestionMsg=counting.Categories[counting.randomCategory].LevelOneQuestions.QuestionText+"&emsp;"+counting.randomNumber;
	$("#levelOneQuestionMsg").html(levelOneQuestionMsg);
	$("#countOfSelectedObject").html(itemSelected);
	
    counting.repeatLevelOneQuestion();
}

// check level One Ans.
counting.checkLevelOneAnswer=function(){
	
	var tempDur;
	if(counting.randomNumber==itemSelected){
		$("#CharacterOfLevel1").attr("src",counting.Categories[counting.randomCategory].Happy_Character);
		audioTag.src=counting.Categories[counting.randomCategory].happysound;
	    audioTag.play();
//		Android.playAudio("NumberCounting/"+counting.Categories[counting.randomCategory].happysound);
	    repeatQuestion=false;
		//tempDur=Android.audioDuration("NumberCounting/"+counting.Categories[counting.randomCategory].happysound);
	}
	else{
		$("#CharacterOfLevel1").attr("src",counting.Categories[counting.randomCategory].Angry_Character);
		audioTag.src="sound/tryagain2.mp3";
	    audioTag.play();
//		Android.playAudio("NumberCounting/sound/Tryagain2.mp3");
		//tempDur=Android.audioDuration("NumberCounting/sound/tryagain2.mp3");
	    repeatQuestion=true;
    }
	setTimeout(function(){
		itemSelected=0;
		$('#what').empty();
		$('#level1GiveObjectInDiv').empty();
		$('#countOfSelectedObject').empty();
		counting.startLevelOne();
	},3000);
}


// Start Level Two
counting.startLevelTwo=function()
{
	$("#countingGame").css("background-image","url('img/Background.png')");
	$("#levelPage").hide();
	$("#levelOnePage").hide();
	$("#levelTwoPage").show();
	$('#SubmitLevelTwoAns').hide();
	$('.Speaker').hide();

	$("#toWhom2").removeClass("Category"+counting.Categories[counting.randomCategory].categoryId+"Character");
	counting.randomCategory=Math.floor(Math.random()*counting.Categories.length);

	if(counting.Categories.length==DoneCategories.length)
		DoneCategories=[];
   	else
  		while($.inArray(counting.randomCategory, DoneCategories) >=0)
			counting.randomCategory=Math.floor(Math.random()*counting.Categories.length);
		DoneCategories.push(counting.randomCategory);
	$("#toWhom2").addClass("Category"+counting.Categories[counting.randomCategory].categoryId+"Character");
  	$("#toWhom2").attr("src",counting.Categories[counting.randomCategory].Normal_Character);
    var newelement='<img id="whatBG'+
        	             counting.Categories[counting.randomCategory].categoryId+'" src="'+counting.Categories[counting.randomCategory].GiveObjectFrom+'"class="blockimage" style="position: absolute;"></img>';
    var emptyelement='<img id="Category'+
  	     	             counting.Categories[counting.randomCategory].categoryId+'GiveObjectIn" src="'+counting.Categories[counting.randomCategory].GiveObjectIn+'" class="blockimage" style="position: absolute;"></img>';
	
	var msgrow='';
	var count=1;
    for(var i=1;i<3;i++){
        newelement+='<div class="col-md-12 col-lg-12 col-sm-12 col-xs-12 whatrowheight'+counting.Categories[counting.randomCategory].categoryId+' whatRow'+i+'Category'+counting.Categories[counting.randomCategory].categoryId+'">';
        emptyelement+='<div class="col-md-12 col-lg-12 col-sm-12 col-xs-12 inWhatrowheight'+counting.Categories[counting.randomCategory].categoryId+' inWhatRow'+i+'Category'+counting.Categories[counting.randomCategory].categoryId+'" >';
        for(j=1;j<6;j++){
        	if(count!=10){
        	newelement+='<div class="col-md-2 col-lg-2 col-sm-2 col-xs-2 img-outer whatFiveDivC'+counting.Categories[counting.randomCategory].categoryId+'" id="what2'+
        	             counting.Categories[counting.randomCategory].categoryId+'_'+count+'">'+
      	                '<img class="threeImagesRow " src='+counting.Categories[counting.randomCategory].ObjectToGive+
      			        ' id="img'+count+'" ></img></div>';
           	emptyelement+='<div id="inWhat2'+
        	             counting.Categories[counting.randomCategory].categoryId+'_'+count+'" class="col-md-2 col-lg-2 col-sm-2 col-xs-2 inWhatFiveDivC'+counting.Categories[counting.randomCategory].categoryId+'"></div>';
        	count++;
            }
        }
        newelement+='</div>';
        emptyelement+='</div>';

        msgrow+='<div class="row blackboard" >'+
  	   		     	'<div id="msg'+i+'" class="col-md-6 col-lg-6 col-sm-6 col-xs-6 " style="width: 46%;">'+
  	   		        '</div>'+
  	   		        '<div id="msg'+i+'images" class="col-md-5 col-lg-5 col-sm-5 col-xs-5" >'+
  	   		        '</div>'+
  	   		        '<div id="msg'+i+'imagescount" class="col-md-1 col-lg-1 col-sm-1 col-xs-1">'+
  	   		        '</div>'+
  	   		    '</div>';
    }

    $("#what2").append(newelement);
    $("#inWhat2").append(emptyelement);
    $("#msgBox").append(msgrow);

    var optionButtons='';

    for(i=1;i<10;i+=3){
    	optionButtons+='<div class="row" style="height: 33%;"">'+
 	   	    			'<div class="col-md-3 col-lg-3 col-sm-4 col-xs-4  numberimg blink_me" style="height: 95%;text-align: center;margin-left: 5%;" onclick="counting.ShowImagesInAnsRow('+i+');">'+
 	   	    				'<div id="div'+i+'" style="padding-top: 40%;" >'+i+'</div>'+	
 	   	    		    '</div>'+
 	   	    		    '<div class="col-md-3 col-lg-3 col-sm-4 col-xs-4  numberimg blink_me" style="height: 95%;text-align: center;margin-left: 5%;" onclick="counting.ShowImagesInAnsRow('+(i+1)+');">'+
 	   	    				'<div id="div'+(i+1)+'" style="padding-top: 40%;" >'+(i+1)+'</div>'+	
 	   	    		    '</div>'+
 	   	    		    '<div class="col-md-3 col-lg-3 col-sm-4 col-xs-4 numberimg blink_me" style="height: 95%;text-align: center;margin-left: 5%;" onclick="counting.ShowImagesInAnsRow('+(i+2)+');">'+
 	   	    				'<div id="div'+(i+2)+'" style="padding-top: 40%;" >'+(i+2)+'</div>'+	
 	   	    		    '</div>'+
 	   	    		'</div>';
 	   	    		
    }
    $("#optionButtons").append(optionButtons);
    $('#optionButtons').hide();

    counting.operation =Operations[Math.floor(Math.random()*Operations.length)];
    //1=Addition ...2=Subtraction
    //counting.operation=2;
    if(counting.operation==1)
    	counting.Addition();
    else
    	counting.Subtraction();

}

counting.Addition=function(){
	var msg1Array=[2,3,4,5,6,7]
	counting.countOfAlreadyHad=msg1Array[Math.floor(Math.random()*msg1Array.length)];
	var msg1=counting.Categories[counting.randomCategory].LevelTwoQuestions.msg1+"&emsp;"+counting.countOfAlreadyHad;
	$("#msg1").html(msg1);

    var msg2Array = [];
	for (i=2;((i+counting.countOfAlreadyHad)<=9);i++) {
    	msg2Array.push(i);
	}
	counting.countOfNewGiving=msg2Array[Math.floor(Math.random()*msg2Array.length)];
	var msg2=counting.Categories[counting.randomCategory].LevelTwoQuestions.msg2+"&emsp;"+counting.countOfNewGiving;
	$("#msg2").html(msg2);
	$("#msg3").html(counting.Categories[counting.randomCategory].LevelTwoQuestions.msg4);

    audioTag.src=counting.Categories[counting.randomCategory].LevelTwoQuestions.msg1sound;
	audioTag.play();
    audioTag.onended=function() {
 		audioTag.src="sound/Numbers/"+counting.countOfAlreadyHad+".mp3";
 		audioTag.play();
		audioTag.onended=function() {
	    		counting.displayAlreadyHadImages(counting.countOfAlreadyHad);
		};
	}; 
/*	var audio1="NumberCounting/"+counting.Categories[counting.randomCategory].LevelTwoQuestions.msg1sound;
   	var	audio2="NumberCounting/sound/Numbers/"+counting.countOfAlreadyHad+".mp3";
	var arr = [audio1,audio2];
	var tempTimeOut=Android.audioDurationArr(arr);
	Android.multipleAudio(arr);
	setTimeout( function(){
		counting.displayAlreadyHadImages(counting.countOfAlreadyHad);
	},tempTimeOut+1000);
*/

}

counting.Subtraction=function(){
    var msg1Array=[4,5,6,7,8,9]
	counting.countOfAlreadyHad=msg1Array[Math.floor(Math.random()*msg1Array.length)];
	coutForMinusAlreadyImage=counting.countOfAlreadyHad;
	var msg1=counting.Categories[counting.randomCategory].LevelTwoQuestions.msg1+counting.countOfAlreadyHad;
	$("#msg1").html(msg1);

	var msg2Array = [];
	for (i=2;(i<=(counting.countOfAlreadyHad-2));i++) {
    	msg2Array.push(i);
	}
	counting.countOfMinus=msg2Array[Math.floor(Math.random()*msg2Array.length)];
	var msg2=counting.Categories[counting.randomCategory].LevelTwoQuestions.msg3+counting.countOfMinus;
	$("#msg2").html(msg2);
	$("#msg3").html(counting.Categories[counting.randomCategory].LevelTwoQuestions.msg4);

//	audioTag.pause(); 

    audioTag.src=counting.Categories[counting.randomCategory].LevelTwoQuestions.msg1sound;
	audioTag.play();
	audioTag.onended=function() {
	    audioTag.pause();
 		audioTag.src="sound/Numbers/"+counting.countOfAlreadyHad+".mp3";
 		audioTag.play();
		audioTag.onended=function() {
	    		audioTag.pause();
	    		counting.displayAlreadyHadImages(counting.countOfAlreadyHad);
		};
	}; 

/*	var audio1="NumberCounting/"+counting.Categories[counting.randomCategory].LevelTwoQuestions.msg1sound;
   	var	audio2="NumberCounting/sound/Numbers/"+counting.countOfAlreadyHad+".mp3";
	var arr = [audio1,audio2];
	var tempTimeOut=Android.audioDurationArr(arr);
	Android.multipleAudio(arr);
	setTimeout( function(){
		counting.displayAlreadyHadImages(counting.countOfAlreadyHad);
	},tempTimeOut+2000);
*/
}

counting.displayAlreadyHadImages=function(imagescount){

	if(count<=imagescount){
		var msg1images='<div class="col-md-1 col-lg-1 col-sm-1 col-xs-1" style="padding: 0%;width: 11%;"><img src="'+counting.Categories[counting.randomCategory].ObjectToGive+'" style="height: 33px;width: 99%;" /></div>';
		$("#msg1images").append(msg1images);
		var imgInWhat='<img class="threeImagesRow" src='+counting.Categories[counting.randomCategory].ObjectToGive+
      			        ' id="inWhatImg'+count+'"></img>';
		$('#inWhat2'+counting.Categories[counting.randomCategory].categoryId+'_'+count).append(imgInWhat);
	    $("#msg1imagescount").html(count);

		audioTag.pause();
		audioTag.src="sound/Numbers/"+count+".mp3";
	    audioTag.play();
	    count++;
   	    audioTag.onended=function() {
	    	audioTag.pause();
	    	counting.displayAlreadyHadImages(imagescount);
	 	}; 
   	    
/*		audio1="NumberCounting/sound/Numbers/"+count+".mp3";
		Android.playAudio(audio1);
		count++;
		setTimeout(function(){
			counting.displayAlreadyHadImages(imagescount);
		},1000);    
		*/
	}
	else{
		count=1;
		if(counting.operation==1){
		/*
			var audio1="NumberCounting/"+counting.Categories[counting.randomCategory].LevelTwoQuestions.msg2sound;
			var	audio2="NumberCounting/sound/Numbers/"+counting.countOfNewGiving+".mp3";
			var arr = [audio1,audio2];
			var tempTimeOut=Android.audioDurationArr(arr);
			Android.multipleAudio(arr);
			setTimeout( function(){
				counting.displayNewGivingImages(counting.countOfNewGiving);
			},	tempTimeOut+2000);
        */
 			audioTag.src=counting.Categories[counting.randomCategory].LevelTwoQuestions.msg2sound;
	    	audioTag.play();
   	 	    audioTag.onended=function() {
 				audioTag.src="sound/Numbers/"+counting.countOfNewGiving+".mp3";
				audioTag.play();
				audioTag.onended=function() {
	    			counting.displayNewGivingImages(counting.countOfNewGiving);
				};
			};  
	    }
	    else{
		/*	var audio1="NumberCounting/"+counting.Categories[counting.randomCategory].LevelTwoQuestions.msg3sound;
			var	audio2="NumberCounting/sound/Numbers/"+counting.countOfMinus+".mp3";
			var arr = [audio1,audio2];
			var tempTimeOut=Android.audioDurationArr(arr);
			Android.multipleAudio(arr);
			setTimeout( function(){
				counting.displayNewGivingImages(counting.countOfMinus);
			},tempTimeOut+2000);
        */
 	    	audioTag.src=counting.Categories[counting.randomCategory].LevelTwoQuestions.msg3sound;
	    	audioTag.play();
	    	audioTag.onended=function() {
 				audioTag.src="sound/Numbers/"+counting.countOfMinus+".mp3";
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
		var msg2images='<div class="col-md-1 col-lg-1 col-sm-1 col-xs-1" style="padding: 0%;width: 11%;"><img src="'+counting.Categories[counting.randomCategory].ObjectToGive+'" style="height: 33px;width: 99%;" /></div>';
		$("#msg2images").append(msg2images);
		var imgInWhat='<img class="threeImagesRow" src='+counting.Categories[counting.randomCategory].ObjectToGive+
      			        ' ></img>';
		if(counting.operation==1){
			$('#img'+count).hide();
			$('#inWhat2'+counting.Categories[counting.randomCategory].categoryId+'_'+(counting.countOfAlreadyHad+count)).append(imgInWhat);
        }
        else{
        	$('#inWhatImg'+coutForMinusAlreadyImage).hide();
			$("#toWhom2").attr("src",counting.Categories[counting.randomCategory].gifForMinus);
        	coutForMinusAlreadyImage--;
        }
	    $("#msg2imagescount").html(count);

        audioTag.src="sound/Numbers/"+count+".mp3";
	    audioTag.play();
	    count++;
	    audioTag.onended=function() {
	    	audioTag.pause();
	    	counting.displayNewGivingImages(imagescount);
		}; 
/*		var audio1="NumberCounting/sound/Numbers/"+count+".mp3";
		Android.playAudio(audio1);
	    count++;
    	setTimeout( function(){
	    	counting.displayNewGivingImages(imagescount);
		},1000);    */
	}
	else{
		count=1;
	  	$("#toWhom2").attr("src",counting.Categories[counting.randomCategory].Normal_Character);
		audioTag.src=counting.Categories[counting.randomCategory].LevelTwoQuestions.msg4sound;
	    audioTag.play();
		audioTag.onended=function() {
			$('#inWhat2').find('img').addClass('blink_me');
			$('#inWhatBG'+(counting.randomCategory+1)).removeClass('blink_me');
        	$('#optionButtons').show();
       		$('.Speaker').show();
  			$('#SubmitLevelTwoAns').show();
        		
		};

/*		var audio1="NumberCounting/"+counting.Categories[counting.randomCategory].msg4sound;
		Android.playAudio(audio1); 
		setTimeout( function(){
			$('#inWhat2').find('img').addClass('blink_me');
			$('#inWhatBG'+(counting.randomCategory+1)).removeClass('blink_me');
	    	$('#optionButtons').show();
	    	$('.Speaker').show();
  			$('#SubmitLevelTwoAns').show();
		},3000);
		 */

	}
}


counting.ShowImagesInAnsRow=function(selectedAns)
{
	$('#msg3images').empty();
	counting.LevelTwoAns=selectedAns;
	var msg3images='';
	for(var i=1;i<=selectedAns;i++){
		msg3images+='<div class="col-md-1 col-lg-1 col-sm-1 col-xs-1" style="padding: 0%;width: 11%;"><img src="'+counting.Categories[counting.randomCategory].ObjectToGive+'" style="height: 33px;width: 99%;"  /></div>';
	}
	$("#msg3images").append(msg3images);
	$("#msg3imagescount").html(selectedAns);
	
//	audioTag.pause();
	audioTag.src="sound/Numbers/"+selectedAns+".mp3";
	audioTag.play();

//	var audio1="NumberCounting/sound/Numbers/"+selectedAns+".mp3";
//	Android.playAudio(audio1);

}

counting.checkLevelTwoAns=function()
{
	var ans=false; 
	if(counting.operation==1){
		if((counting.countOfAlreadyHad+counting.countOfNewGiving)==counting.LevelTwoAns)
			ans=true;    
    }
    else if(counting.operation==2){
    	if((counting.countOfAlreadyHad-counting.countOfMinus)==counting.LevelTwoAns)
			ans=true;
    }
    if(ans==true){
    	$("#toWhom2").attr("src",counting.Categories[counting.randomCategory].Happy_Character);
			audioTag.src=counting.Categories[counting.randomCategory].happysound;
		    audioTag.play();
//			var audio1="NumberCounting/"+counting.Categories[counting.randomCategory].happysound;
//			Android.playAudio(audio1);
			setTimeout(function(){
				count=1;
				$('#what2').empty();
				$('#inWhat2').empty();
				$('#msg1images').empty();
				$('#msg2images').empty();
				$('#msg3images').empty();
				$('#msg1imagescount').empty();
				$('#msg2imagescount').empty();
				$('#msg3imagescount').empty();
				$('#optionButtons').empty();
				counting.startLevelTwo();
			},3500);
    }
	else{
		$("#toWhom2").attr("src",counting.Categories[counting.randomCategory].Angry_Character);
		audioTag.src=counting.Categories[counting.randomCategory].wrongSound;
	    audioTag.play();
//		var audio1="NumberCounting/"+counting.Categories[counting.randomCategory].wrongSound;
//		Android.playAudio(audio1);
		setTimeout(function(){
			$("#toWhom2").attr("src",counting.Categories[counting.randomCategory].Normal_Character);
		},2000);
	}
}; 

counting.repeatLevelOneQuestion=function(){
	audioTag.src=counting.Categories[counting.randomCategory].LevelOneQuestions.QuestionSound;
	audioTag.play();
	audioTag.onended=function() {
   		audioTag.src="sound/Numbers/"+counting.randomNumber+".mp3";
    	audioTag.play();
   		audioTag.onended=function() {
    		audioTag.pause();
		};
	};  /*
	var audio1="NumberCounting/"+counting.Categories[counting.randomCategory].msg1sound;
	var	audio2="NumberCounting/sound/Numbers/"+counting.randomNumber+".mp3";
	var arr = [audio1,audio2];
	Android.multipleAudio(arr); */
}