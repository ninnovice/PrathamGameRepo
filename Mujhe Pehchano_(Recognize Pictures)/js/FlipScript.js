var EnglishFlip={};
EnglishFlip.arrOfSelectedWords=[];

EnglishFlip.getGameData=function()
{
	/*var randomIndex=0;
	randomIndex=Math.floor(Math.random() *EnglishFlip.wordsData.length);
	EnglishFlip.selectedWord=EnglishFlip.wordsData[randomIndex];
	console.log(EnglishFlip.selectedWord);*/
	EnglishFlip.arrOfSelectedWords=populate(EnglishFlip.wordsData, EnglishFlip.arrOfSelectedWords, 9);
	console.log(EnglishFlip.arrOfSelectedWords);
}

function populate(array1, array2, length)
{
	var randomIndex;
	while (array2.length !== length) 
	{
		randomIndex = Math.floor(Math.random()*array1.length);
		if($.inArray(array1[randomIndex],array2) === -1)
		array2.push(array1[randomIndex]);
	}
	return array2;
}


Flip.getGameData=function()
{
	var i=0,tempArray=[],chooseRandomly5questions=0;
	$('#next').click(function(){
		window.location.reload();
	});
	Flip.correctAnswers=0,Flip.score=0;
	Flip.randomAnswer=0;
	Flip.TrackingFields.questionId=0,Flip.TrackingFields.startTime,Flip.TrackingFields.scoredMarks = 0,Flip.TrackingFields.totalMarks = 10;
	Flip.questionsArrayOf5=[],Flip.tempArrayPassedData=[],tempArrayOfextraAnswers=[];
	$('.defaultImage').hide();
	document.getElementsByClassName('optionForFlip').innerHTML="";
	document.getElementsByClassName('optionForFlip').style="margin-top:35%";
	$('#divContainingFullImage').hide();
	
	while(i<5)
	{
		chooseRandomly5questions=Math.floor(Math.random() *Assessment.Data.length);
		if($.inArray(chooseRandomly5questions,tempArray)==-1)
		{
			Flip.questionsArrayOf5.push(Assessment.Data[chooseRandomly5questions]);
			tempArray.push(chooseRandomly5questions);
			i++;
		}
	}
	document.getElementById("para").innerHTML=Flip.languagewiseMessage[parseInt(Assessment.Language)-1]['questionTitle'];
	$('#lastGamePage,#coverPage,#lastGamePage').hide();
	$("#mainGamePage").show();

	Flip.addImagesToGame();
	Flip.addAnswersToGame();
	Flip.optionCounter=4;
	Flip.showNewQuestion();
}

//function to add images to the game
Flip.addImagesToGame=function()
{ 	
	var i=1;
	Flip.chooserandomImage=Math.floor(Math.random()*Flip.imageSet.length);
	for(var j=1;j<4;j++)
	{
		for(var k=0;k<3;k++)
		{
			document.getElementById('img'+j+'_'+k).src=Flip.imageSet[Flip.chooserandomImage]['Image'+i];
			i++;
		}

	}
}

//function to add optionForFlip to the div
Flip.addAnswersToGame=function()
{
	var i=0,tempArrayPassedData=[],answerText="",arrayOfAllExtraOptions=[],answerIndex=0,arrayOfAnswers=[],randomAnswer=0;
	while(Flip.questionsArrayOf5.length>i)
	{
		Flip.questionsArrayOf5[i]['Answer']=Flip.questionsArrayOf5[i]['Answer'].trim();
		arrayOfAnswers.push(Flip.questionsArrayOf5[i]['Answer']);
		if(i==0)
			answerText+=Flip.questionsArrayOf5[i]['Answer'];
		else
			answerText+=" , "+Flip.questionsArrayOf5[i]['Answer'];
		i++;
	}
	
	var tempArrayPassedData=Flip.questionsArrayOf5.slice();
	for(i=0;i<tempArrayPassedData.length;i++)
	{
		//if extraoption is string then only split
		if(typeof tempArrayPassedData[i]['ExtraOptions'] === 'string')
		{
			tempArrayPassedData[i]['ExtraOptions']=tempArrayPassedData[i]['ExtraOptions'].split('~');
			for(var j=0;j<tempArrayPassedData[i]['ExtraOptions'].length;j++)
			{
				tempArrayPassedData[i]['ExtraOptions'][j]=tempArrayPassedData[i]['ExtraOptions'][j].trim();
				if(($.inArray(tempArrayPassedData[i]['ExtraOptions'][j],arrayOfAllExtraOptions)==-1)&&(tempArrayPassedData[i]['ExtraOptions'][j]!==""))
				{
					arrayOfAllExtraOptions.push(tempArrayPassedData[i]['ExtraOptions'][j]);
					tempArrayPassedData[i]['ExtraOptions'].splice(j,1);
				}
			}
		}
	}
	
	while(arrayOfAnswers.length<9)
	{
		if(arrayOfAllExtraOptions.length!==0)
		{
			answerIndex=Math.floor(Math.random() *arrayOfAllExtraOptions.length);
			if(($.inArray(arrayOfAllExtraOptions[answerIndex],arrayOfAnswers)==-1)&&(arrayOfAllExtraOptions[answerIndex]!==" "))
			{
				arrayOfAnswers.push(arrayOfAllExtraOptions[answerIndex]);
				answerText+=" , "+arrayOfAllExtraOptions[answerIndex];
				arrayOfAllExtraOptions.splice(answerIndex,1);
			}
			else
			{
				arrayOfAllExtraOptions.splice(answerIndex,1);
			}
		}
		else if(arrayOfAllExtraOptions.length==0)
		{
			answerIndex=Math.floor(Math.random() *Flip.arrayOfDummyOptions[parseInt(Assessment.Language)-1]['array'].length);
			if(($.inArray(Flip.arrayOfDummyOptions[parseInt(Assessment.Language)-1]['array'][answerIndex],arrayOfAnswers)==-1)&&(Flip.arrayOfDummyOptions[parseInt(Assessment.Language)-1]['array'][answerIndex]!==" "))
			{
				arrayOfAnswers.push(Flip.arrayOfDummyOptions[parseInt(Assessment.Language)-1]['array'][answerIndex]);
				answerText+=" , "+Flip.arrayOfDummyOptions[parseInt(Assessment.Language)-1]['array'][answerIndex];
				Flip.arrayOfDummyOptions[parseInt(Assessment.Language)-1]['array'].splice(answerIndex,1);
			}
		}
	}

	for(i=0;i<9;i++)
	{
		randomAnswer=Math.floor(Math.random() *arrayOfAnswers.length);
		document.getElementById('option'+i).innerHTML=arrayOfAnswers[randomAnswer];
		if(arrayOfAnswers[randomAnswer].length>=50)
			document.getElementById('option'+i).style="margin-top:0%";
		else
			document.getElementById('option'+i).style="margin-top:35%";
		arrayOfAnswers.splice(randomAnswer,1);
	}
	$('.optionForFlip').show();
}

//show new question
Flip.showNewQuestion=function()
{
	var question,d=new Date();
	Flip.TrackingFields.startTime=d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate()+" "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
	if(Flip.questionsArrayOf5.length > 0)
	{
		Flip.randomquestion=Math.floor(Math.random() * Flip.questionsArrayOf5.length);
		question=Flip.questionsArrayOf5[Flip.randomquestion]['Question'];
		Flip.TrackingFields.questionId=Flip.questionsArrayOf5[Flip.randomquestion]['QuestionId'];
		document.getElementById("questionOFFlip").innerHTML = question;
		$("#questionOFFlip").data('answerOfThis',Flip.questionsArrayOf5[Flip.randomquestion]['Answer']);
	}
}

//check answer
Flip.checkAns=function(evt)
{	
	var totalMarks=10,time=0,givenAnswer,questionType="Flip";
	Flip.firstClick++;
	document.getElementById('playSound').src="";
	var x=document.getElementById(evt);
	x.style="border-color: white";
	$(".optionForFlip").not('#'+evt).hide();
	subject = Assessment.DataForQuery.Subject; 
	topic = Assessment.DataForQuery.Topic; 
	level = Assessment.DataForQuery.Level;

	givenAnswer=document.getElementById(evt).innerHTML;

	if(givenAnswer== $("#questionOFFlip").data('answerOfThis'))
	{
		Flip.correctAnswers++;
		if(Flip.optionCounter>=0)
		{
			Flip.score +=10;
			Flip.TrackingFields.scoredMarks =10;
			Android.trackAssessmentScore(subject,topic,Flip.TrackingFields.startTime,Flip.TrackingFields.questionId,questionType,givenAnswer,Flip.TrackingFields.scoredMarks,totalMarks,level);
			
			$('#'+evt).hide();
			var idOfImage=$('#'+evt).parent().find('img');
			setTimeout(function()
			{
				$(idOfImage).css({"top":"0px","left":"0px"});
				$(idOfImage).show();
			},500);

			setTimeout(function()
			{
				$(idOfImage).addClass('flip');
				Android.audioPlayer('right_ans.mp3');
			},900);

			Flip.questionsArrayOf5.splice(Flip.randomquestion,1);
			if(Flip.optionCounter===0)
			{
				$('.optionForFlip').hide();
				$('.optionForFlip').textContent="";	
				if(Flip.correctAnswers===5)
				{
					time=5000;
					reloadTime=6000;
					setTimeout(function()
					{
						$('.defaultImage').show();
						setTimeout(function()
						{
							$('.defaultImage').addClass('flip');
							$('.slide').css('border-width','0px 0px 0px 0px');
							document.getElementById('fullImage').src=Flip.imageSet[Flip.chooserandomImage]['fullImage'];
							setTimeout(function()
							{
								$('#divContainingSplitImages').hide();
								$('#divContainingFullImage').show();
							},1000);	
						},800);
					},1500);

					Flip.reloadPageAfterSomeTime(time,reloadTime);
					
				}
				else
				{
					reloadTime=6000;
					time=2500;
					Flip.reloadPageAfterSomeTime(time,reloadTime);
				}
			}
			else
			{	
				Flip.optionCounter--;
				document.getElementById(evt).innerHTML="";
				setTimeout(function()
				{
					Flip.showNewQuestion();
					$(".optionForFlip").not(evt).show();
				},2500);
			}
		}
	}
	else
	{
		var idOfParentDiv=$('#'+evt).parent();
		$('#'+evt).addClass("shake");
		if(givenAnswer.length>=50)
			document.getElementById(evt).style="margin-top:0%";
		else
			document.getElementById(evt).style="margin-top:35%";

		Android.audioPlayer('wrong-ans.mp3');
		Flip.score +=0;
		Flip.TrackingFields.scoredMarks=0;
		Flip.questionsArrayOf5.splice(Flip.randomquestion,1);
		Android.trackAssessmentScore(subject,topic,Flip.TrackingFields.startTime,Flip.TrackingFields.questionId,questionType,givenAnswer,Flip.TrackingFields.scoredMarks,totalMarks,level);
		setTimeout(function()
		{	
					$('#'+evt).removeClass("shake");
					if(Flip.optionCounter===0)
					{
						$(".showButton").prop("disabled",true);
						$(".optionForFlip").hide();
						
						Android.saveTotalQuizData(subject,Flip.score);
						Flip.showscore();
						setTimeout(function()
						{
							$('#game').empty();
							window.location.reload();
						},8000);
						
					}
					else
					{
						Flip.optionCounter--;
						Flip.showNewQuestion();
						$(".optionForFlip").not(evt).show();
					}		
		},1500);

	}
}

Flip.reloadPageAfterSomeTime=function(time,reloadTime)
{
	setTimeout(function()
	{
		Android.saveTotalQuizData(subject,Flip.score);
		Flip.showscore();
		setTimeout(function()
		{
			$('.defaultImage').removeClass('flip');
			$('#game').empty();
			window.location.reload();
		},reloadTime); 
	},time);
}

Flip.showscore=function()
{
	$('#game').fadeOut(1000);
	setTimeout(function()
	{
		$('#lastGamePage').fadeIn(1000);
	},1000);

	document.getElementById('lastMsg').innerHTML=Flip.languagewiseMessage[parseInt(Assessment.Language)-1]['message'];
	document.getElementById('encourageMessage').innerHTML=Flip.languagewiseMessage[parseInt(Assessment.Language)-1][''+Flip.score];
	document.getElementById('showscore').innerHTML=Flip.score;
}

String.prototype.replaceAll = function(search, replace)
{
    //if replace is not sent, return original string otherwise it will
    //replace search string with 'undefined'.
    if (replace === undefined) {
        return this.toString();
    }

    return this.replace(new RegExp('[' + search + ']', 'g'), replace);
};
