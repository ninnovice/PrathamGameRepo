Crumbling.correctSequenceIs=[];
Crumbling.lengthOfsentence=0;
Crumbling.widthOfword=[];
Crumbling.counter=0;
Crumbling.arrayOfTopPositions=[];
Crumbling.arrayOfLeftPositions=[];
Crumbling.temparray=[];

Crumbling.addSentence=function()
{
	if(Crumbling.jsondata.length>Crumbling.counter)
	{
		var element,time, left, top;
		Crumbling.widthOfword=[];
		$('#nextButton').hide();
		$('#lastmsg').hide();
		Crumbling.arrayOfSplitedSentence=[];
		//Crumbling.randomSentence=Math.floor(Math.random()*Crumbling.jsondata.length);
		//var sentence=Crumbling.jsondata[Crumbling.randomSentence]['Sentence'];
		var sentence=Crumbling.jsondata[Crumbling.counter]['Sentence'];
		Crumbling.arrayOfSplitedSentence=sentence.split(' ').slice();
		Crumbling.lengthOfsentence=Crumbling.arrayOfSplitedSentence.length;
		if(Crumbling.lengthOfsentence<=5)
		{
			$('#divContainingSentence').removeAttr('class');
			$('#divContainingSentence').addClass('col-lg-6 col-md-6 col-xs-6 col-sm-6 col-lg-offset-3 col-md-offset-3 col-xs-offst-3 col-sm-offset-3');
		}
		else if(Crumbling.lengthOfsentence>=12){
			$('#divContainingSentence').removeAttr('class');
			$('#divContainingSentence').addClass('col-lg-10 col-md-10 col-xs-10 col-sm-10 col-lg-offset-1 col-md-offset-1 col-xs-offst-1 col-sm-offset-1');
		}
		

		Crumbling.correctSequenceIs=Crumbling.arrayOfSplitedSentence.slice();
		document.getElementById('sentence').innerHTML=sentence;
		//document.getElementById('list').innerHTML=sentence;
		time=document.getElementById('playSound');
		time.src=Crumbling.jsondata[Crumbling.counter]['Audio'];
		document.getElementById('playSound').play();
		setTimeout(function()
		{
			$('#headline').hide();
			setTimeout(function()
			{
				$('#sentence').empty();
				for(var i=0;i<Crumbling.arrayOfSplitedSentence.length;i++)
				{
					element=document.createElement('span');
					element.id="span"+i;
					element.className="sentence";
					document.getElementById('sentence').appendChild(element);
					left = $("#span"+i).offset().left;
					top=$("#span"+i).offset().top;
					console.log("LEFT : " + left);
					$("#span"+i).css({"left" : left,"top":top});
					element.innerHTML=" "+Crumbling.arrayOfSplitedSentence[i];
					Crumbling.widthOfword.push($(element).text().length);
				}
				
				$(".sentence").css('position','fixed');
				var i=0;
				Crumbling.shuffleWords(Crumbling.arrayOfSplitedSentence);
				setTimeout(function()
				{

					while(i<Crumbling.lengthOfsentence)
					{	
						var randomTime=Math.random()*250;
						$("#span"+i).animate({"top": "+=300px"},randomTime);
						i++;
					}
					document.getElementById('playSound').src="sound/glassBreak.wav";
					document.getElementById('playSound').play();
					Crumbling.addEffects();
				},300);
			},time.duration*1000);
			
		},1000);
	}
	else
	{
		document.getElementById('playSound').pause();
		$('#lastmsg').show();
		$('#game').hide();
	}
	
}

Crumbling.addEffects=function()
{
	setTimeout(function(){
		Crumbling.addDragAndDrop(Crumbling.arrayOfSplitedSentence);
	},350);
}

Crumbling.randomRotateEffect=function(element)
{
	var randomDeg=Math.floor(Math.random()*180);
	$(element).css({"transform":'rotate(' + randomDeg + 'deg)'});
}

Crumbling.shuffleWords=function(array)
{

  var i = 0, j = 0, temp = 0;

  for (i = array.length - 1; i > 0; i--) 
  {
    j = Math.floor(Math.random() * (i + 1));
    temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  
}
Crumbling.addDragAndDrop=function(array)
{
	var element,width,value;
	$('#sentence').empty();
	$('#sentence').hide();
	console.log(Crumbling.correctSequenceIs);
	for(var i=0;i<array.length;i++)
	{
		element=document.createElement('span');
		element.id="span"+i;
		$(element).draggable({
			start: function()
			{
				$(this).data("origPosition",$(this).position());
				$(this).css({'transform':'rotate(0deg)'});
				console.log('position: '+$(this).position().left);
				Crumbling.playsoundForWord(this.id);

			},
			cursor: 'move',
			snap:'#letter'+i,
			revert:"invalid"
		});
		Crumbling.randomRotateEffect(element);
		element.className="splitteredSentence";
		element.innerHTML=" "+array[i];
		if(Crumbling.lengthOfsentence<=5)
		{
			$('#outerDiv').removeAttr('class');
			value=2.2;
			$('#outerDiv').addClass('col-lg-6 col-md-6 col-xs-6 col-sm-6 col-lg-offset-3 col-md-offset-3 col-xs-offst-3 col-sm-offset-3');
		}
		else{
			$('#outerDiv').removeAttr('class');
			value=1.5;
			$('#outerDiv').addClass('col-lg-10 col-md-10 col-xs-10 col-sm-10 col-lg-offset-1 col-md-offset-1 col-xs-offst-1 col-sm-offset-1');
		}
		//$('#outerDiv').append(element);
		$('body').append(element);
		var xy=Crumbling.getPositions();
		
		$(element).css({"position": "absolute","top": xy[1] + "%", "left": xy[0] + "%"});
	}
	searchStringInArray ('.', Crumbling.correctSequenceIs);
	Crumbling.addSpaceForSentences(value);
}

Crumbling.addSpaceForSentences=function(value)
{
	var i=0,j=0,k=0,letter;
	for(i;i<Crumbling.temparray.length;i++)
	{
		var div=document.createElement('div');
		div.id="sentences"+i;
		div.className="col-lg-12 col-xs-12 col-sm-12 col-md-12";
		document.getElementById('correctsentence').appendChild(div);
		if(i!==0)
		{
			tempCounter=Crumbling.temparray[i]-Crumbling.temparray[i-1];
		}
		else
			tempCounter=Crumbling.temparray[i];
		for(j=0;j<tempCounter;j++)
		{
			if(k<Crumbling.correctSequenceIs.length)
			{
				letter=document.createElement('div');
				letter.id="letter"+k;
				console.log($('#span'+k).text().length);
				letter.style="font-size:40px;margin-top:2%;margin-left:4%;border-style:solid;border-width: 0px 0px 2px 0px;height:35%;width:"+Crumbling.widthOfword[k]*value+"%;";
				letter.className="col-lg-2 col-md-2 col-xs-2 col-sm-2 letters"+i;
				$(letter).droppable({
					drop : Crumbling.Handledrop,
					dragover:Crumbling.allowDrop
				});
				$(letter).data('answer',Crumbling.correctSequenceIs[k]);
				document.getElementById('sentences'+i).appendChild(letter);
				k++;
			}
		}
	}
	Crumbling.addSomeRandomWords();
}


Crumbling.addSomeRandomWords=function()
{
	var k;
	var selectedWords,noOfrandomWords,array2=[];
	noOfrandomWords=Math.round(Crumbling.correctSequenceIs.length/4)-1;
	array2=chooseRandomWords(Crumbling.correctSequenceIs,noOfrandomWords,array2);
	console.log(array2);
	for(var i=0;i<array2.length;i++)
	{
		$('#span'+array2[i]).css({'transform':'rotate(0deg)'});
		for(var j=0;j<Crumbling.correctSequenceIs.length;j++)
		{
			if($('#letter'+j).data('answer').trim()==$('#span'+array2[i]).text().trim())
			{
				Crumbling.lengthOfsentence--;
				offset=$('#letter'+j).offset();
				top=offset.top;
				left=offset.left;
				$('#span'+array2[i]).animate(offset,"fast");

				$('#span'+array2[i]).draggable('disable');
			}
		}

	}
	$('.letters0').css({'margin-top':'3%'});
}

function chooseRandomWords(array,length,array2)
{
	var i=0,randomNumber;
	while(i<length)
	{
		randomNumber=Math.floor(Math.random()*array.length);
		if($.inArray(randomNumber,array2) === -1)
			array2.push(randomNumber);
		i++;
	}
	return array2;
}

function searchStringInArray (str, strArray) 
{
    for (var j=0; j<strArray.length; j++) 
    {
        if (strArray[j].indexOf(str)!==-1) 
        	Crumbling.temparray.push(j+1);
    }
    return -1;
}


Crumbling.allowDrop=function(event)
{
	event.preventDefault();
}

Crumbling.getPositions=function()
{
	var y=Math.floor((Math.random()*35)+40);
	//y = y + 100;
	var x=Math.floor(Math.random()*75);
	while($.inArray(((y)||(y+1)||(y+2)||(y-1)||(y-2)||(y-3)),Crumbling.arrayOfTopPositions)>=0)
	{
		y=Math.floor((Math.random()*35)+40);
		
	}
	while(($.inArray(((x)||(x+1)||(x+2)||(x-1)||(x-2)||(x-3)),Crumbling.arrayOfLeftPositions)>=0))
	{
		x=Math.floor(Math.random()*75);
	}

	Crumbling.arrayOfTopPositions.push(y);
	Crumbling.arrayOfLeftPositions.push(x);
	
	return [x,y];
}


Crumbling.Handledrop=function(event,ui)
{
	$(droppedSpan).text('');
	var draggedLetter=ui.draggable;
	var droppedSpan= $(this);
	if($(draggedLetter).text().trim()==$(droppedSpan).data('answer'))
	{
		Crumbling.lengthOfsentence--;
		$(draggedLetter).position({
		  my: "center center",
		  at: "center center",
		  of:this
		});
		
		$(draggedLetter).draggable('disable');
	}
	else{
		//console.log(ui.draggable.data("origPosition"));
		//$(draggedLetter).css({'position':'relative'});
		ui.draggable.animate(ui.draggable.data("origPosition"),"fast");
		/*ui.draggable.animate({
				       top: "0px",
				       left: "0px"
				    });	*/
	}
	if(Crumbling.lengthOfsentence==0)
	{
		setTimeout(function(){
			document.getElementById('playSound').src=Crumbling.jsondata[Crumbling.counter]['Audio'];
			document.getElementById('playSound').play();
			$('#nextButton').show();
		},500);
	}
}	

Crumbling.playsoundForWord=function(draggable)
{
	for(var i=0;i<Crumbling.jsondata[Crumbling.counter]['Words'].length;i++)
	{
		if(Crumbling.jsondata[Crumbling.counter]['Words'][i]['name']==$("#"+draggable).text().trim())
		{
			    var time = Crumbling.jsondata[Crumbling.counter]['Words'][i]['Duration'] * 1000;
				document.getElementById('playSound').src=Crumbling.jsondata[Crumbling.counter]['Audio'];
				document.getElementById('playSound').currentTime=Crumbling.jsondata[Crumbling.counter]['Words'][i]['From'];
				document.getElementById('playSound').play();
				setTimeout(function(){
					document.getElementById('playSound').pause();
				}, time);
		}
	}		
}

Crumbling.next=function()
{
	//Crumbling.jsondata.splice(Crumbling.counter,1);
	Crumbling.counter++;
	Crumbling.temparray=[];
	$('.splitteredSentence').remove();
	$('#correctsentence').empty();
	$('#sentence').show();
	Crumbling.arrayOfTopPositions=[];
	Crumbling.arrayOfLeftPositions=[];
	document.getElementById('list').innerHTML="";
	Crumbling.addSentence();
}

$.fn.letterDrop = function() {
  // Chainability
  return this.each( function() { 
  
  var obj = $( this );
  
  var drop = {
    arr : obj.text().split(' '),
    
    range : {
      min : 1,
      max : 9
    },
    
    styles : function() {
      var dropDelays = '\n', addCSS;
      
       for ( i = this.range.min; i <= this.range.max; i++ ) {
         dropDelays += '.ld' + i + ' { animation-delay: 1.' + i + 's; }\n';  
       }
      
        addCSS = $( '<style>' + dropDelays + '</style>' );
        $( 'head' ).append( addCSS );
    },
    
    main : function() {
      var dp = 0;
      obj.text( '' );
      
      $.each( this.arr, function( index, value ) {

        dp = dp.randomInt( drop.range.min, drop.range.max );
        
        if ( value === ' ' )
          value = '&nbsp';
        
          obj.append( '<span class="letterDrop ld' + dp + '">' + value + '</span>' );
        
      });
          
    }
  };
   
  Number.prototype.randomInt = function ( min, max ) {
    return Math.floor( Math.random() * ( max - min + 1 ) + min );
  };
  
  
  // Create styles
  drop.styles();

    // Initialise
    drop.main();
  });

 }