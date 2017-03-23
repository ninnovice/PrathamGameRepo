var tracing=[];
$( document ).ready(function() {
         if(navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i)){/*For Tablet */ tracing.deviceFlag=1;}
                    else{/* for Desktop */ tracing.deviceFlag=0;}
        if(tracing.deviceFlag){
                Android.getPath("TracingGame");
        }
        setTimeout(function(){
            document.getElementById("mainpage").style.display='block';
             if(tracing.deviceFlag){
                            Android.getPath("TracingGame");
                            setImagesThroughScript();
                    }
             else{
                    setImagesThroughScriptForDesktop();
             }
        },10);
});

var wrapper1 = document.getElementById("signature-pad");
    clearButton1 = wrapper1.querySelector("[data-action=clear]");
    nextButton1 = wrapper1.querySelector("[data-action=next]");
	restartButton1 = wrapper1.querySelector("[data-action=reStart]");
	soundButton1 = wrapper1.querySelector("[data-action=soundStart]");
var wrapper2 = document.getElementById("signature-pad2");
    clearButton2 = wrapper2.querySelector("[data-action=clear]");
    nextButton2 = wrapper2.querySelector("[data-action=next]");
    restartButton2 = wrapper2.querySelector("[data-action=reStart]");
	soundButton2 = wrapper2.querySelector("[data-action=soundStart]");
var wrapper3 = document.getElementById("signature-pad3");
    clearButton3 = wrapper3.querySelector("[data-action=clear]");
    nextButton3 = wrapper3.querySelector("[data-action=next]");
	restartButton3 = wrapper3.querySelector("[data-action=reStart]");
	soundButton3 = wrapper3.querySelector("[data-action=soundStart]");

tracing.store=0;
tracing.cnt=0;
tracing.character=0;
tracing.currentI=0;
tracing.scrollOffset=100;
tracing.deviceFlag=0;/* 0:Desktop & 1:Tab */

    var can1=document.getElementById("canvas1");var caninner1=document.getElementById("canvasinner1");
    var can2=document.getElementById("canvas2");var caninner2=document.getElementById("canvasinner2");
    var can3=document.getElementById("canvas3");var caninner3=document.getElementById("canvasinner3");


document.getElementById("part1").addEventListener("click",startlevel1);
document.getElementById("part2").addEventListener("click",startlevel2);
document.getElementById("part3").addEventListener("click",startlevel3);

    function setImagesThroughScriptForDesktop() {
                $("#HomeImage").attr("src","img/home.png");
                $("#BackScroll").attr("src","img/previousScroll.png");
                $("#NextScroll").attr("src","img/nextScroll.png");
                $("#Aakar").attr("src","img/Star.gif");
                $("#Akshar").attr("src","img/A.gif");
                $("#Ank").attr("src","img/1.gif");
                $(".soundButtons").attr("src","img/Speaker-icon.png");
                $(".restartButtons").attr("src","img/restart.png");
                $(".clearButtons").attr("src","img/erase.png");
                //$(".Pratham").attr("src","img/pratham.png");
                $(".Pratham").hide();
                $(".Next").attr("src","img/next.png");
    }

    function setImagesThroughScript() {
        $("#HomeImage").attr("src",Utils.Path+"img/home.png");
        $("#BackScroll").attr("src",Utils.Path+"img/previousScroll.png");
        $("#NextScroll").attr("src",Utils.Path+"img/nextScroll.png");
        $("#Aakar").attr("src",Utils.Path+"img/Star.gif");
        $("#Akshar").attr("src",Utils.Path+"img/A.gif");
        $("#Ank").attr("src",Utils.Path+"img/1.gif");
        $(".soundButtons").attr("src",Utils.Path+"img/Speaker-icon.png");
        $(".restartButtons").attr("src",Utils.Path+"img/restart.png");
        $(".clearButtons").attr("src",Utils.Path+"img/erase.png");
        //$(".Pratham").attr("src",Utils.Path+"img/pratham.png");
        $(".Pratham").hide();
        $(".Next").attr("src",Utils.Path+"img/next.png");
    }

	function previousScroll() {
        if(tracing.scrollOffset>0)
        {
            var left=$("#scrollbar").scrollLeft(tracing.scrollOffset-=100);
        }
	}

	function nextScroll() {
        if(tracing.scrollOffset<2000)
        {
            var right=$("#scrollbar").scrollLeft(tracing.scrollOffset+=100);
        }
    }
    function startlevel1() {
		 if(!tracing.deviceFlag){
		 		var audio=new Audio(imgSoundMappingMain[0].soundURL);
		 		audio.play();
		 	}
		else{
            var audio=new Audio(Utils.Path+imgSoundMappingMain[0].soundURL);
            audio.play();
			//Android.audioPlayer("TracingGame/"+imgSoundMappingMain[0].soundURL);
		}
		 document.getElementById("heading").style.display='block';
		 document.getElementById("outerScrollbar").style.display='none';
         $("#level1").show();
         $("#mainpage").hide();
         $('body').css('background-color','rgb(179, 179, 179)');
         $('body').css('background-image','none');
         $("#canvasinner1").attr('height',$("#showGif1").height());
         $("#canvasinner1").attr('width',$("#showGif1").width());
         $("#canvasinner1").sketch({defaultColor: "rgb(243, 174, 0)",defaultSize: "20"});sketch1=$("#canvasinner1").sketch();
		 canvasReset();
    }
    
    function startlevel2() {
		 if(!tracing.deviceFlag){
		 		var audio=new Audio(imgSoundMappingMain[1].soundURL);
		 		audio.play();
		 	}
		else{
		 		var audio=new Audio(Utils.Path+imgSoundMappingMain[1].soundURL);
		 		audio.play();
		}
		 document.getElementById("heading").style.display='block';
         $("#level2").show();
         $("#mainpage").hide();
         $('body').css('background-color','rgb(179, 179, 179)');
         $('body').css('background-image','none');
         $("#canvas2").attr('height',$("#showGif2").height());
         $("#canvas2").attr('width',$("#showGif2").width());
         $("#canvasinner2").attr('height',$("#showGif2").height());
         $("#canvasinner2").attr('width',$("#showGif2").width());
         $("#canvasinner2").sketch({defaultColor: "rgb(132, 194, 37)",defaultSize: "20"});sketch2=$("#canvasinner2").sketch();
		 level2();
     }

    function startlevel3() {
		 if(!tracing.deviceFlag){
		 		var audio=new Audio(imgSoundMappingMain[2].soundURL);
		 		audio.play();
		 	}
		else{
				var audio=new Audio(Utils.Path+imgSoundMappingMain[2].soundURL);
            	audio.play();
		 }
		 document.getElementById("heading").style.display='block';
         $("#level3").show();
         $("#mainpage").hide();
         $('body').css('background-color','rgb(179, 179, 179)');
         $('body').css('background-image','none');
		 $("#canvas3").attr('height',$("#showGif3").height());
         $("#canvas3").attr('width',$("#showGif3").width());
         $("#canvasinner3").attr('height',$("#showGif3").height());
         $("#canvasinner3").attr('width',$("#showGif3").width());
         $("#canvasinner3").sketch({defaultColor: "rgb(228, 82, 145)",defaultSize: "20"});sketch3=$("#canvasinner3").sketch();
		 level3();
    }

    function canvasReset() {
		     var cntx=can1.getContext("2d");
		     cntx.strokeStyle="#FFFFFF";
		     if(tracing.cnt>10){tracing.cnt=0;}
		
         switch(tracing.cnt){
		     case 0: {
				      if(!tracing.deviceFlag){
                   	  		$("#showGif1").css('background-image','url("'+imgShapeMapping[tracing.cnt].imgURL+'")');
                   	  }
                      else{
                       		$("#showGif1").css('background-image','url("'+Utils.Path+imgShapeMapping[tracing.cnt].imgURL+'")');
   				      }
				      cntx.beginPath();
					  cntx.moveTo(can1.width/2,can1.height-15);
					  cntx.lineTo(can1.width/2,can1.height-130);
					  cntx.setLineDash([10,10]);
					  cntx.stroke();
			 		}break;
			 case 1: {
				      if(!tracing.deviceFlag){
                       		$("#showGif1").css('background-image','url("'+imgShapeMapping[tracing.cnt].imgURL+'")');
                       }
                       else{
                            $("#showGif1").css('background-image','url("'+Utils.Path+imgShapeMapping[tracing.cnt].imgURL+'")');
                       }
				      cntx.beginPath();
				 	  cntx.moveTo(60,can1.height/2);
                      cntx.lineTo(can1.width-50,can1.height/2);
                      cntx.setLineDash([10,10]);
                      cntx.stroke();
			 		}break;
			 case 2: {
				      if(!tracing.deviceFlag){
                            $("#showGif1").css('background-image','url("'+imgShapeMapping[tracing.cnt].imgURL+'")');
                      }
                      else{
                            $("#showGif1").css('background-image','url("'+Utils.Path+imgShapeMapping[tracing.cnt].imgURL+'")');
                      }
				      cntx.beginPath();
				      cntx.moveTo(60,can1.height-110);
 					  cntx.lineTo(can1.width-50,can1.height-30);
					  cntx.setLineDash([10,10]);
					  cntx.stroke();
			 		}break;
			 case 3: {
				      if(!tracing.deviceFlag){
                            $("#showGif1").css('background-image','url("'+imgShapeMapping[tracing.cnt].imgURL+'")');
                      }
                      else{
                            $("#showGif1").css('background-image','url("'+Utils.Path+imgShapeMapping[tracing.cnt].imgURL+'")');
                      }
					  cntx.beginPath();
					  cntx.arc(can1.width/2,can1.height/4+40,55,0,2*Math.PI);
					  cntx.setLineDash([10,10]);
					  cntx.stroke();
			 		}break;
			 case 4: {
				      if(!tracing.deviceFlag){
                            $("#showGif1").css('background-image','url("'+imgShapeMapping[tracing.cnt].imgURL+'")');
                      }
                      else{
                            $("#showGif1").css('background-image','url("'+Utils.Path+imgShapeMapping[tracing.cnt].imgURL+'")');
                      }
				      cntx.beginPath();
					  cntx.arc(can1.width/2,can1.height/4+40,55,0.6*Math.PI,1.4*Math.PI,true);
					  cntx.setLineDash([10,10]);
					  cntx.stroke();
			 		}break;
			 case 5: {
				       if(!tracing.deviceFlag){
                            $("#showGif1").css('background-image','url("'+imgShapeMapping[tracing.cnt].imgURL+'")');
                       }
                       else{
                            $("#showGif1").css('background-image','url("'+Utils.Path+imgShapeMapping[tracing.cnt].imgURL+'")');
                       }
				      cntx.beginPath();
					  cntx.arc(can1.width/2,can1.height/4+40,55,0.4*Math.PI,1.6*Math.PI,false);
					  cntx.setLineDash([10,10]);
					  cntx.stroke();
			 		}break;
			case 6: {
				       if(!tracing.deviceFlag){
                            $("#showGif1").css('background-image','url("'+imgShapeMapping[tracing.cnt].imgURL+'")');
                       }
                       else{
                            $("#showGif1").css('background-image','url("'+Utils.Path+imgShapeMapping[tracing.cnt].imgURL+'")');
                       }
				      cntx.beginPath();
					  cntx.moveTo(can1.width/2,15);
                      cntx.lineTo(can1.width*0.75-20,80);
                      cntx.lineTo(can1.width/2, 140);
                      cntx.lineTo(can1.width*0.25+20,80);
				      cntx.lineTo(can1.width/2,15);
					  cntx.setLineDash([5,10]);
					  cntx.stroke();
			 		}break;
			case 7: {
				       if(!tracing.deviceFlag){
                            $("#showGif1").css('background-image','url("'+imgShapeMapping[tracing.cnt].imgURL+'")');
                       }
                       else{
                            $("#showGif1").css('background-image','url("'+Utils.Path+imgShapeMapping[tracing.cnt].imgURL+'")');
                       }
				      cntx.beginPath();
					  cntx.moveTo(can1.width*0.25,40);
                      cntx.lineTo(can1.width*0.75,40);
                      cntx.lineTo(can1.width*0.75,120);
                      cntx.lineTo(can1.width*0.25,120);
				      cntx.lineTo(can1.width*0.25,40);
					  cntx.setLineDash([5,10]);
					  cntx.stroke();
			 		}break;
			case 8: {
				     if(!tracing.deviceFlag){
                            $("#showGif1").css('background-image','url("'+imgShapeMapping[tracing.cnt].imgURL+'")');
                     }
                     else{
                            $("#showGif1").css('background-image','url("'+Utils.Path+imgShapeMapping[tracing.cnt].imgURL+'")');
                     }
				      cntx.beginPath();
					  cntx.moveTo(can1.width*0.35,30);
                      cntx.lineTo(can1.width*0.65,30);
                      cntx.lineTo(can1.width*0.65,120);
                      cntx.lineTo(can1.width*0.35,120);
				      cntx.lineTo(can1.width*0.35,30);
					  cntx.setLineDash([5,10]);
					  cntx.stroke();
			 		}break;
			case 9: {
				      if(!tracing.deviceFlag){
                            $("#showGif1").css('background-image','url("'+imgShapeMapping[tracing.cnt].imgURL+'")');
                      }
                      else{
                            $("#showGif1").css('background-image','url("'+Utils.Path+imgShapeMapping[tracing.cnt].imgURL+'")');
                      }
				      cntx.beginPath();
					  cntx.moveTo(can1.width/2,30);
                      cntx.lineTo(can1.width*0.75,120);
                      cntx.lineTo(can1.width*0.25,120);
				      cntx.lineTo(can1.width/2,30);
					  cntx.setLineDash([5,10]);
					  cntx.stroke();
			 		}break;
			case 10: {
				      if(!tracing.deviceFlag){
                            $("#showGif1").css('background-image','url("'+imgShapeMapping[tracing.cnt].imgURL+'")');
                      }
                      else{
                            $("#showGif1").css('background-image','url("'+Utils.Path+imgShapeMapping[tracing.cnt].imgURL+'")');
                      }
				      drawStar(cntx,can1.width/2,80,5,60,30);
			 		}
		 }
		      
		
    } 

 function drawStar(cntx,cx,cy,spikes,outerRadius,innerRadius){
      var rot=Math.PI/2*3;
      var x=cx;
      var y=cy;
      var step=Math.PI/spikes;

      cntx.beginPath();
      cntx.moveTo(cx,cy-outerRadius)
      for(i=0;i<spikes;i++){
        x=cx+Math.cos(rot)*outerRadius;
        y=cy+Math.sin(rot)*outerRadius;
        cntx.lineTo(x,y)
        rot+=step

        x=cx+Math.cos(rot)*innerRadius;
        y=cy+Math.sin(rot)*innerRadius;
        cntx.lineTo(x,y)
        rot+=step
      }
      cntx.lineTo(cx,cy-outerRadius);
      cntx.closePath();
      cntx.stroke();
    }

function setTextForLevel2(){
		 var position = Math.floor(Math.random() * imgTextMapping.length) + 0;
	     while(position==tracing.store){position=Math.floor(Math.random() * imgTextMapping.length) + 0;}
	     tracing.store=position;
         var cntx=can2.getContext("2d");
		 cntx.strokeStyle="#FFFFFF";
	     cntx.font = "bold 200px arial";
         cntx.textAlign = "center";
         cntx.strokeText(imgTextMapping[position].originalText, can2.width/2, can2.height/2+100);
		 currentI=position;
		 if(!tracing.deviceFlag){
		    var img="url("+imgTextMapping[position].imgURL+")";
		 }
		 else{
		    var img="url("+Utils.Path+imgTextMapping[position].imgURL+")";
		 }
         $("#showGif2").css('background-image',img);
}

function setTextForLevel3(){
		 var position = Math.floor(Math.random() * imgNumberMapping.length) + 0;
	     while(position==tracing.store){position=Math.floor(Math.random() * imgNumberMapping.length) + 0;}
	     tracing.store=position;
         var cntx=can3.getContext("2d");
		 cntx.strokeStyle="#FFFFFF";
	     cntx.font = "bold 200px Arial";
         cntx.textAlign = "center";
         cntx.strokeText(imgNumberMapping[position].number, can3.width/2, can3.height/2+60);
		 currentI=position;
		 if(!tracing.deviceFlag){
            var img="url("+imgNumberMapping[position].imgURL+")";
         }
         else{
            var img="url("+Utils.Path+imgNumberMapping[position].imgURL+")";
         }
         $("#showGif3").css('background-image',img);
}

clearButton1.addEventListener("click", function (event) {
     clearLevel1();
 });

clearButton2.addEventListener("click", function (event) {
	 clearLevel2();
});

clearButton3.addEventListener("click", function (event) {
	 clearLevel3();
});

nextButton1.addEventListener("click", function (event) {
	clearLevel1();
	can1.getContext("2d").clearRect(0,0,can1.width,can1.height);
	canvasReset(++tracing.cnt);
});	

nextButton2.addEventListener("click", function (event) {
	/*var image = new Image();
	image.src = caninner2.toDataURL();
	var string = OCRAD(image);
    alert(string);*/
	clearLevel2();
	can2.getContext("2d").clearRect(0,0,can2.width,can2.height);
	setTextForLevel2();
});	

nextButton3.addEventListener("click", function (event) {
	clearLevel3();
	can3.getContext("2d").clearRect(0,0,can3.width,can3.height);
	setTextForLevel3();
});	

restartButton1.addEventListener("click", function (event) {
    if(!tracing.deviceFlag){
           $('#showGif1').css('background-image', 'url("' +imgShapeMapping[tracing.cnt].imgURL + '?x=' + Date.now() + '")' );
    }
	else{
	       $('#showGif1').css('background-image', 'url("' + Utils.Path+imgShapeMapping[tracing.cnt].imgURL + '?x=' + Date.now() + '")' );
	}
});	

restartButton2.addEventListener("click", function (event) {
	if(!tracing.deviceFlag){
               $('#showGif2').css('background-image', 'url("' +imgTextMapping[currentI].imgURL + '?x=' + Date.now() + '")' );
        }
    	else{
    	       $('#showGif2').css('background-image', 'url("' + Utils.Path+imgTextMapping[currentI].imgURL + '?x=' + Date.now() + '")' );
    	}
});	

restartButton3.addEventListener("click", function (event) {
	if(!tracing.deviceFlag){
               $('#showGif3').css('background-image', 'url("' +imgNumberMapping[currentI].imgURL + '?x=' + Date.now() + '")' );
        }
    	else{
    	       $('#showGif3').css('background-image', 'url("' + Utils.Path+imgNumberMapping[currentI].imgURL + '?x=' + Date.now() + '")' );
    	}
});	

soundButton1.addEventListener("click", function (event) {
	if(!tracing.deviceFlag){
		 		var audio=new Audio(imgShapeMapping[tracing.cnt].soundURL);
				audio.play();
		 	}
		else{
			    var audio=new Audio(Utils.Path+imgShapeMapping[tracing.cnt].soundURL);
            	audio.play();
		}
});	


soundButton2.addEventListener("click", function (event) {
	if(!tracing.deviceFlag){
		 		var audio=new Audio(imgTextMapping[currentI].soundURL);
				audio.play();
		 	}
		else{
			    var audio=new Audio(Utils.Path+imgTextMapping[currentI].soundURL);
            	audio.play();
		}
});	

soundButton3.addEventListener("click", function (event) {
	if(!tracing.deviceFlag){
		 		var audio=new Audio(imgNumberMapping[currentI].soundURL);
				audio.play();
		 	}
		else{
			    var audio=new Audio(Utils.Path+imgNumberMapping[currentI].soundURL);
            	audio.play();
		}
});	

function clearLevel1(){
     caninner1.getContext("2d").clearRect(0,0,caninner1.width,caninner1.height);sketch1.actions=[];
}

function clearLevel2(){
	 caninner2.getContext("2d").clearRect(0,0,caninner2.width,caninner2.height);sketch2.actions=[];
}

function clearLevel3(){
	 caninner3.getContext("2d").clearRect(0,0,caninner3.width,caninner3.height);sketch3.actions=[];
}

function level2(){
	var temp="";
	for(i=0;i<imgTextMapping.length;i++){
		temp+="<div id='div"+i+"' style='width:10%; color:rgb(256, 256, 256);' onclick='genericTextLevel2("+i+")'><h2>"+imgTextMapping[i].originalText+"</h2></div>";
	}
	 $("#scrollbar").html(""+temp);
}

function level3(){
	var temp="";
	for(i=0;i<imgNumberMapping.length;i++){
		temp+="<div id='div"+i+"' style='width:15%; color:rgb(256, 256, 256);' onclick='genericTextLevel3("+i+")'><h2>"+imgNumberMapping[i].number+"</h2></div>";
	}
	 $("#scrollbar").html(""+temp);
}

 function genericTextLevel2(i){
	         clearLevel2();
	 		 can2.getContext("2d").clearRect(0,0,can2.width,can2.height);
	  		 currentI=i;
	  		 if(!tracing.deviceFlag){
                        $("#showGif2").css('background-image','url('+imgTextMapping[i].imgURL+')');
                 }
             	else{
             	       $("#showGif2").css('background-image','url('+Utils.Path+imgTextMapping[i].imgURL+')');
             	}
			 var cntx=can2.getContext("2d");
			 cntx.strokeStyle="#FFFFFF";
			 cntx.font = "bold 200px Arial";
			 cntx.textAlign = "center";
			 cntx.strokeText(imgTextMapping[i].originalText, can2.width/2, can2.height/2+100);
 }

 function genericTextLevel3(i){
	         clearLevel3();
	 		 can3.getContext("2d").clearRect(0,0,can3.width,can3.height);
	 		 currentI=i;
	 		  if(!tracing.deviceFlag){
                                     $("#showGif3").css('background-image','url('+imgNumberMapping[i].imgURL+')');
                              }
                          	else{
                          	       $("#showGif3").css('background-image','url('+Utils.Path+imgNumberMapping[i].imgURL+')');
                          	}
			 var cntx=can3.getContext("2d");
			 cntx.strokeStyle="#FFFFFF";
			 cntx.font = "bold 200px Arial";
			 cntx.textAlign = "center";
			 cntx.strokeText(imgNumberMapping[i].number, can3.width/2, can3.height/2+60);
 }

 function setMarker(r,g,b,canvasNumber,element){
        $(".description>a").removeClass("blink_me");
        $(element).addClass("blink_me");
        switch(canvasNumber){
            case 1:{
            sketch1.color="rgb("+r+","+g+","+b+")";
            break;
            }
            case 2:{
            sketch2.color="rgb("+r+","+g+","+b+")";
            break;
            }
            case 3:{
            sketch3.color="rgb("+r+","+g+","+b+")";
            break;
            }
            default:{
            }
        }
 }