var GaltiMaaf={};
var spanClicked='false';
GaltiMaaf.gameCounter=0,GaltiMaaf.score=0;
GaltiMaaf.correctAnswerCount=0;
$(document).ready(function()
{
	GaltiMaaf.init();
	$('#girlwithLadder').prop('src','Images/Girl-with-ladder_'+(GaltiMaaf.correctAnswerCount+1)+'.png');
});

GaltiMaaf.init=function()
{
	var randomSentence=0;
	spanClicked='false';
	GaltiMaaf.checkAnswerClicked='false';
	$('#wrongSentence').css({'pointer-events':'auto'});
	GaltiMaaf.temparray=[],GaltiMaaf.arrForGalti=[],GaltiMaaf.arrayOfSplitedSentence=[],GaltiMaaf.arrofCorrectWords=[],GaltiMaaf.sentence=0;
	GaltiMaaf.kaanaMatraArr=["ा","ि","ी","ू","ु","े","ै","ो","ौ","ं","ः","ँ","्"];
	GaltiMaaf.specialArr=['अ','आ','इ','ई','उ','ऊ','ए','ऐ','ओ','औ','अं','अः'];
	GaltiMaaf.endingArr=['|','?',',',';','!','.'];
	GaltiMaaf.wrongWordsIndex=[],GaltiMaaf.answerCount=0;
	$('#myModal,#lastPage,#joker').hide();
	//$('#checkAnswer').css({'visibility':'hidden'});
	$('#next').show();
	$('#wrongSentence,#sentence').empty();
	randomSentence=Math.floor(Math.random()*GaltiMaaf.jsonData.length);
	GaltiMaaf.sentence=GaltiMaaf.jsonData[randomSentence].sentence;
	$('#sentence').text(GaltiMaaf.sentence);
	//$('#scoreText').text(GaltiMaaf.hardcodeddata['score']);
	//$('#score').text(GaltiMaaf.score);
	$('#sentence').hide();
	if(GaltiMaaf.gameCounter==0)
	{
		$('#instruction').text(GaltiMaaf.hardcodeddata['instruction']);
		$('#instruction').css({'visibility':'visible'});
	}	
	else 
		$('#instruction').css({'visibility':'hidden'});
	$('#checkAnswer').text(GaltiMaaf.hardcodeddata['checkIt']);
	GaltiMaaf.arrayOfSplitedSentence=GaltiMaaf.sentence.split(' ');
	GaltiMaaf.arrofCorrectWords=GaltiMaaf.arrayOfSplitedSentence.slice();
	searchStringInArray('|',GaltiMaaf.arrayOfSplitedSentence);
	GaltiMaaf.chooseRandomWord();
	GaltiMaaf.addWordsToScreen();
};

GaltiMaaf.chooseRandomWord=function()
{
	var noOfWords=0,randomWord,oneLetter,kana;
	GaltiMaaf.originalWord=0;
	for(var i=1;i<GaltiMaaf.temparray.length;i++)
	{
		noOfWords=(GaltiMaaf.temparray[i]-GaltiMaaf.temparray[i-1]);
		randomWord=Math.floor((Math.random()*(GaltiMaaf.temparray[i]-GaltiMaaf.temparray[i-1]))+GaltiMaaf.temparray[i-1]);
		GaltiMaaf.arrForGalti=GaltiMaaf.arrayOfSplitedSentence[randomWord].split('');
		console.log(GaltiMaaf.arrForGalti);
		oneLetter=Math.floor(Math.random()*GaltiMaaf.arrForGalti.length);//choose randomly one letter from selected word
		console.log(GaltiMaaf.arrForGalti[oneLetter]);
		GaltiMaaf.originalWord=GaltiMaaf.arrofCorrectWords[randomWord];
		GaltiMaaf.checkConditions(oneLetter,randomWord);
	}
};


GaltiMaaf.checkConditions=function(oneLetter,randomWord)
{
	var temp;
	if($.inArray(GaltiMaaf.arrForGalti[oneLetter],GaltiMaaf.kaanaMatraArr)>=0 &&($.inArray(GaltiMaaf.arrForGalti[oneLetter-1],GaltiMaaf.kaanaMatraArr)==-1&&$.inArray(GaltiMaaf.arrForGalti[oneLetter+1],GaltiMaaf.kaanaMatraArr)==-1))
	{
		console.log('present');
		GaltiMaaf.searchAndMakeWrong(oneLetter,GaltiMaaf.kaanaMatraArr,randomWord);
	}
	else if($.inArray(GaltiMaaf.arrForGalti[oneLetter],GaltiMaaf.kaanaMatraArr)>=0 && ($.inArray(GaltiMaaf.arrForGalti[oneLetter-1],GaltiMaaf.kaanaMatraArr)==-1 || $.inArray(GaltiMaaf.arrForGalti[oneLetter+1],GaltiMaaf.kaanaMatraArr)==-1))
	{
		console.log('present');
		if($.inArray(GaltiMaaf.arrForGalti[oneLetter-1],GaltiMaaf.kaanaMatraArr)>=0)
		{
			GaltiMaaf.arrForGalti.splice(oneLetter-1,1);
			GaltiMaaf.searchAndMakeWrong(oneLetter-1,GaltiMaaf.kaanaMatraArr,randomWord);
		}
		else if($.inArray(GaltiMaaf.arrForGalti[oneLetter+1],GaltiMaaf.kaanaMatraArr)>=0)
		{
			GaltiMaaf.arrForGalti.splice(oneLetter+1,1);
			GaltiMaaf.searchAndMakeWrong(oneLetter,GaltiMaaf.kaanaMatraArr,randomWord);
		}
	}
	else if($.inArray(GaltiMaaf.arrForGalti[oneLetter],GaltiMaaf.specialArr)>=0)
	{
		console.log('present in special case');
		GaltiMaaf.searchAndMakeWrong(oneLetter,GaltiMaaf.specialArr,randomWord);
	}
	else if($.inArray(GaltiMaaf.arrForGalti[oneLetter],GaltiMaaf.endingArr)>=0)
	{
		console.log('present in ending case');
		GaltiMaaf.searchAndMakeWrong(oneLetter,GaltiMaaf.endingArr,randomWord);
	}
	else
	{
		console.log('present in Normal case');
		console.log(GaltiMaaf.arrForGalti);
		if($.inArray(GaltiMaaf.arrForGalti[oneLetter+1],GaltiMaaf.kaanaMatraArr)>=0 && $.inArray(GaltiMaaf.arrForGalti[oneLetter+2],GaltiMaaf.kaanaMatraArr)>=0)
		{
			GaltiMaaf.arrForGalti.splice(oneLetter+2,1);
			GaltiMaaf.searchAndMakeWrong(oneLetter+1,GaltiMaaf.kaanaMatraArr,randomWord);
		}
		else if($.inArray(GaltiMaaf.arrForGalti[oneLetter+1],GaltiMaaf.kaanaMatraArr)>=0)
		{
			GaltiMaaf.searchAndMakeWrong(oneLetter+1,GaltiMaaf.kaanaMatraArr,randomWord);
		}
		else
		{	kana=Math.floor(Math.random()*GaltiMaaf.kaanaMatraArr.length);
			while(GaltiMaaf.kaanaMatraArr[kana]=='ः')
			{
				kana=Math.floor(Math.random()*GaltiMaaf.kaanaMatraArr.length);
			}
			GaltiMaaf.arrForGalti[oneLetter]=GaltiMaaf.arrForGalti[oneLetter]+''+GaltiMaaf.kaanaMatraArr[kana];
			temp=GaltiMaaf.arrForGalti.join('');
			GaltiMaaf.arrayOfSplitedSentence[randomWord]=temp;
			if(spanClicked=='true')
			{
				GaltiMaaf.arrayOfSplitedSentence[randomWord]=GaltiMaaf.originalWord;
				GaltiMaaf.arrForGalti=GaltiMaaf.originalWord.split('');
				while($.inArray(temp,GaltiMaaf.arrayOfOptions)>=0)
				{
					GaltiMaaf.checkConditions(oneLetter,randomWord);
					return 0;
				}
				GaltiMaaf.arrayOfOptions.push(temp);
			}
		}
			
	}
}

GaltiMaaf.searchAndMakeWrong=function(searchThisLetter,InThisArray,randomWord)
{
	var kana,temp;
	if($.inArray(GaltiMaaf.arrForGalti[searchThisLetter],InThisArray)>=0)
	{
			kana=Math.floor(Math.random()*InThisArray.length);
			while((InThisArray[kana]==GaltiMaaf.arrForGalti[searchThisLetter])||(InThisArray[kana]=='ः')||(InThisArray[kana]=='अः'))
			{
				kana=Math.floor(Math.random()*InThisArray.length);
			}
			GaltiMaaf.arrForGalti[searchThisLetter]=InThisArray[kana].slice();
			console.log(GaltiMaaf.arrForGalti);
			temp=GaltiMaaf.arrForGalti.join('');
			GaltiMaaf.arrayOfSplitedSentence[randomWord]=temp;
			if(spanClicked=='true')
			{	GaltiMaaf.arrayOfSplitedSentence[randomWord]=GaltiMaaf.originalWord;
				while($.inArray(temp,GaltiMaaf.arrayOfOptions)>=0)
				{
					GaltiMaaf.checkConditions(searchThisLetter,randomWord);
					return 0;
				}
				GaltiMaaf.arrayOfOptions.push(temp);
			}
	}
	//return GaltiMaaf.arrForGalti.join('');
}

GaltiMaaf.addWordsToScreen=function()
{
	var word=0;
	for(var i=0;i<GaltiMaaf.arrayOfSplitedSentence.length;i++)
	{
		word=$('<span id="span'+i+'" class="spans">'+GaltiMaaf.arrayOfSplitedSentence[i]+'</span>');
		$(word).data('answer',GaltiMaaf.arrofCorrectWords[i]);
		$(word).data('randomWord',i);
		//$(word).text(GaltiMaaf.arrayOfSplitedSentence[i]);
		$(word).on('click',function(){
			$('#myModal').show();
			$('#wrongWordsDiv').empty();
			spanClicked='true';
			GaltiMaaf.selectedWord=this.id;
			//console.log(GaltiMaaf.selectedWord);
			GaltiMaaf.calculateOptions(this);
			GaltiMaaf.addOptionsToScreen(this);
		});
		$('#wrongSentence').append(word);
	}
};

GaltiMaaf.calculateOptions=function(element){
	var randomWord=0,oneLetter;
	$(element).css({'color':'red'});
	GaltiMaaf.arrayOfOptions=[],GaltiMaaf.arrForGalti=[];
	GaltiMaaf.arrayOfOptions.push($(element).data('answer'));
	GaltiMaaf.arrForGalti=$(element).text().split('');
	while(GaltiMaaf.arrayOfOptions.length<4)
	{
		randomWord=$(element).data('randomWord');
		GaltiMaaf.originalWord=GaltiMaaf.arrofCorrectWords[randomWord];
		GaltiMaaf.arrForGalti=GaltiMaaf.originalWord.split('');
		oneLetter=Math.floor(Math.random()*GaltiMaaf.arrForGalti.length);//choose randomly one letter from selected word
		console.log(GaltiMaaf.arrForGalti[oneLetter]);
		GaltiMaaf.checkConditions(oneLetter,randomWord);
	}
	shuffleWords(GaltiMaaf.arrayOfOptions);
};

GaltiMaaf.addOptionsToScreen=function(element)
{
	var left=0,width=0,right=0,mid=0,span;
	width=$(element).width();
	for(var i=0;i<GaltiMaaf.arrayOfOptions.length;i++)
	{
		span=$('<div class="text-center col-md-6 col-xs-6 col-lg-6 col-sm-6" style="padding:0px !important;"><div id="option'+i+'" style="padding:15px !important;border:2px solid black; background-color:rgb(137,80,169)" class="options text-center col-md-10 col-xs-10 col-lg-10 col-sm-10 col-lg-offset-1 col-md-offset-1 col-xs-offset-1 col-sm-offset-1">'+GaltiMaaf.arrayOfOptions[i]+'</div></div>');
		$(span).on('click',function(){
			GaltiMaaf.changeText(this,element);
		});
		$('#wrongWordsDiv').append(span);
	}
	
};

GaltiMaaf.changeText=function(spanId,element)
{
	if($(spanId).text()!==$(element).text())
	{
		if($(element).text().trim()==$(element).data('answer'))
		{
			$(element).data('correctAnswerIsChanged','true');
		}
		$(element).text($(spanId).text());
		$(element).css({'color':'white'});
		$('#myModal').hide();
		$('#wrongWordsDiv').empty();
		if($(element).data('answer').trim()==$(spanId).text().trim())
		{
			if(GaltiMaaf.checkAnswerClicked=='false'&& $(element).data('correctAnswerIsChanged')!=='true')
			{
				GaltiMaaf.correctAnswerCount++;
				console.log('Afetr:' +GaltiMaaf.mistakeCount);
				$('#girlwithLadder').prop('src','Images/Girl-with-ladder_'+(GaltiMaaf.correctAnswerCount+1)+'.png');
				GaltiMaaf.score+=10;
			}//$('#score').text(GaltiMaaf.score);
		}	
	}
	//$('#checkAnswer').css({'visibility':'visible'});
};


GaltiMaaf.setFlagAndCheckAnswer=function()
{
	GaltiMaaf.checkAnswerClicked='true';
	$('#next').hide();
	GaltiMaaf.wrongWordsIndex=[];
	GaltiMaaf.answerCount=0;
	$('#wrongSentence').css({'pointer-events':'none'});
	GaltiMaaf.checkAnswer();
};

GaltiMaaf.checkAnswer=function()
{

	for(var i=0;i<GaltiMaaf.arrofCorrectWords.length;i++)
	{
		if(GaltiMaaf.arrofCorrectWords[i]!==$('#span'+i).text())
		{
			GaltiMaaf.wrongWordsIndex.push(i);
		}
		else
			GaltiMaaf.answerCount++;
	}
if(GaltiMaaf.checkAnswerClicked=='true')
{
	if(GaltiMaaf.answerCount==GaltiMaaf.arrofCorrectWords.length)
	{
		document.getElementById('playSound').src="sound/correctBeat.mp3";
		
		/*swal({   title: GaltiMaaf.hardcodeddata['correctAnswer'], 
		   	imageUrl: 'Images/joker.png',
		   	imageSize: '255x180',
		    confirmButtonText: GaltiMaaf.hardcodeddata["next"] ,
		    confirmButtonColor: 'green'},function(){*/
		    	//GaltiMaaf.next();
		    	$('#joker').show();
				$('#joker').addClass('magictime slideUp');
				$('#next').show();
				$('#next').addClass('blink_me');
				$('#checkAnswer').css({'visibility':'hidden'});
		    /*});*/
	}
	else
	{
		document.getElementById('playSound').src="sound/wrongBeat.mp3"
		/*swal({   title: GaltiMaaf.hardcodeddata['wrongAnswer'], 
		  
		    type: "error",   
		    confirmButtonText: GaltiMaaf.hardcodeddata["next"] },function()
		    {*/
		    	$('#next').show();
		    	$('#wrongSentence').css({'pointer-events':'auto'});
		    	for(var j=0;j<GaltiMaaf.wrongWordsIndex.length;j++)
		    	{
		    		$('#span'+GaltiMaaf.wrongWordsIndex[j]).css({'color':'red'});
		    	}
		   /* });*/
	}
	document.getElementById('playSound').play();
}	
};

GaltiMaaf.modalClicked=function()
{
	$('#myModal').hide();
	$('#'+GaltiMaaf.selectedWord).css({'color':'white'});
};

GaltiMaaf.next=function()
{
	GaltiMaaf.gameCounter++;
	$('#checkAnswer').css({'visibility':'visible'});
	$('#next').removeClass('blink_me');
	if(GaltiMaaf.gameCounter<5)
	{
		GaltiMaaf.init();
	}
	else
	{
		$('#gamePage').hide();
		$('#lastPage').show();
		$('#lastmsg').text(GaltiMaaf.hardcodeddata['lastmsg']);
		$('#yourScore').text(GaltiMaaf.hardcodeddata['yourScore']+' : '+GaltiMaaf.score );
		if(GaltiMaaf.score>=100)
		{
			$('#finalImg').prop('src','Images/Girl-with-ladder_'+(GaltiMaaf.correctAnswerCount+1)+'.png');
			setTimeout(function(){
				$('#finalImg').prop('src','Images/Girl-with-ladder_12.png');
			},1000);
		}
		else{
			$('#finalImg').prop('src','Images/Girl-with-ladder_'+(GaltiMaaf.correctAnswerCount+1)+'.png');
			setTimeout(function(){
				$('#finalImg').prop('src','Images/Girl-with-ladder_Lose.png');
			},1000);
		}
		
	}
}