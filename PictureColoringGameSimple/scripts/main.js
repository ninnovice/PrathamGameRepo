var Picture={};
	Picture.sketchObj;
	Picture.myCanvas;
	Picture.selectedColor;
	Picture.jsonData=[];
	Picture.imgCnt=0;
	Picture.actionsHere=[];
	Picture.actionsForRedo=[];
	Picture.allactions=[];
	Picture.recentAction;
	Picture.pickerAsset;
	Picture.opacity=0.5;

$(document).ready(function() {
	Picture.setImages();
	Picture.myCanvas=document.querySelector('#myCanvas');
	Picture.jsonData=imgMapping;
	Picture.fitCanvasToContainer(Picture.myCanvas);
	Picture.setCanvasForSketch();
	Picture.setScroll();
	Picture.setSVG();
	//Picture.getSVGPaths();
	Picture.registerEventListeners();
});

Picture.setImages=function(){
	$('body').css('backgroundImage','url(images/background.jpg)');
	$("#brush").css("background-image",'url(images/brush.png)');
	$("#undo").css("background-image",'url(images/undo.png)');
	$("#redo").css("background-image",'url(images/redo.png)');
	$("#clear").css("background-image",'url(images/clear.png)');
	$("#next").css("background-image",'url(images/next.png)');
	$("#home").css("background-image",'url(images/home.png)');
	$("#logo").css("background-image",'url(images/logo.png)');
	$("#dropper").css("background-image",'url(images/dropper.png)');
	$("#eraser").css("background-image",'url(images/eraser.png)');
};

Picture.fitCanvasToContainer=function(canvas){
  canvas.style.width='100%';
  canvas.style.height='100%';
  canvas.width  = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
};

Picture.setCanvasForSketch=function(){
	$("#myCanvas").sketch({defaultColor: "rgba(0, 0, 0,"+Picture.opacity+")",defaultSize: "10"});
	Picture.sketchObj=$("#myCanvas").sketch();
};

Picture.registerEventListeners=function(){
	$("#home").on("click", function() {
  		window.location.reload();
    });
	$(".operationHeight").on("click",function(){
		$(".operationHeight").removeClass("animated flipInX");
		var currentId = $(this).attr('id');
		$('#' + currentId +'').addClass("animated flipInX");
	});
	$("#brush").on("click", function() {
		$("#brushSize").toggle();
		$("#myCanvas").show();
		$("#selectedColor").css("background-color","rgba(0, 0, 0,"+Picture.opacity+")");
		Picture.opacity=0.5;
  		Picture.sketchObj.color="rgba(0, 0, 0, "+Picture.opacity+")";
    });
	$(".sizeDivs").on("click", function() {
		Picture.sketchObj.size=$(this).attr("value");
    });
	$("#dropper").on("click", function() {
		$("#myCanvas").hide();
		Picture.opacity=1;
		//$("#selectedColor").css("background-color","rgba(0, 0, 0,"+Picture.opacity+")");
		Picture.sketchObj.color=Picture.selectedColor.replace(')', ', '+Picture.opacity+')').replace('rgb', 'rgba');
    });
	$("#eraser").on("click", function() {
		Picture.sketchObj.color="rgba(256,256,256,1)";
    });
	$("#undo").on("click",function(){
		Picture.undo();
	});
	$("#redo").on("click",function(){
		Picture.redo();
	});
	$("#clear").on("click",function(){
		Picture.clearCanvas();
		$("svg>*").css("fill","rgba(255,255,255,0)");
	});
	$(".colorHeight").on("click",function(){
		Picture.setMarker(this.style.backgroundColor);
	});
	$("#next").on("click",function(){
		Picture.clearCanvas();
		Picture.setSVG();
	});
	$(document).mouseup(function (e)
	{
    var containersizeBtn = $("#brush");
    if (!containersizeBtn.is(e.target) // if the target of the click isn't the container...
        && containersizeBtn.has(e.target).length === 0) // ... nor a descendant of the container
    {
        $("#brushSize").css("display","none");
    }
	});
};

Picture.undo=function(){
	Picture.actionsHere=Picture.sketchObj.actions;
	var arrayLength=Picture.actionsHere.length;
	if(arrayLength>0){
	Picture.recentAction=Picture.sketchObj.actions[arrayLength-1];
	Picture.actionsForRedo.push(Picture.recentAction);
	Picture.sketchObj.actions.splice(arrayLength-1,1);
	Picture.sketchObj.redraw();
	}
};

Picture.redo=function(){
	var arrayLength=Picture.actionsForRedo.length;
	if(arrayLength>0)
	Picture.sketchObj.actions.push(Picture.actionsForRedo[arrayLength-1]);
	Picture.actionsForRedo.splice(arrayLength-1,1);
	Picture.sketchObj.redraw();
};

Picture.clearCanvas=function(){
	var context=Picture.myCanvas.getContext("2d");
	context.clearRect(0, 0, Picture.myCanvas.width, Picture.myCanvas.height);
	Picture.sketchObj.actions=[];
};

Picture.setMarker=function(selectedColor){
	$("#selectedColor").css("background-color",selectedColor);
	Picture.sketchObj.color=selectedColor.replace(')', ', '+Picture.opacity+')').replace('rgb', 'rgba');
	Picture.selectedColor=selectedColor;
};

Picture.setScroll=function(){
	var temp="";
	for(var i=0;i<Picture.jsonData.length;i++){
			temp="<div id='div"+i+"' class='scrollDivs' onclick='Picture.clickedSVG("+i+",this)'></div>";
			$("#scroll").append(temp);
			$("#div"+i).css('backgroundImage','url('+Picture.jsonData[i].imgThumbnail+')');
		}
};

Picture.setSVG=function(){
	if(Picture.imgCnt == Picture.jsonData.length){Picture.imgCnt=0;}
	$("#forSVG").html(""+Picture.jsonData[Picture.imgCnt++].imgURL);
	Picture.setSVGListeners();
};

Picture.getSVGPaths=function(){
	var context=Picture.myCanvas.getContext("2d");
	var svgPathsData=$("svg > path");
	var len=svgPathsData.length;
	for(var i=0;i<len;i++){
		var p = new Path2D($(svgPathsData[i]).attr('d'));
		$(svgPathsData[i]).on("click",function(){
			console.log("chaltay ki");
		});
		context.stroke(p);
		context.fill(p);
	}
};

Picture.clickedSVG=function(id,obj){
	Picture.clearCanvas();
	Picture.imgCnt=id;
	$("#forSVG").html(""+Picture.jsonData[Picture.imgCnt++].imgURL);
	Picture.setSVGListeners();
}

Picture.setSVGListeners=function(){
	$("svg>*").css("fill","rgba(255,255,255,0)");
	$("svg>*").click(function(){
		$(this).css({ fill:Picture.sketchObj.color});
		$("#myCanvas").show();
		Picture.opacity=0.5;
		Picture.sketchObj.color=Picture.selectedColor.replace(')', ', '+Picture.opacity+')').replace('rgb', 'rgba');
    });
}

/*
	For Eraser:
	
	onloading svg get all the paths using ?
	and then draw all paths simultaneously on canvas.
*/

/*var picture={};
picture.sketchObj;
picture.canvas;
picture.actionsHere=[];
picture.actionsForRedo=[];
picture.allactions=[];
picture.isClearClicked=false;
picture.recentAction;
picture.opacity=0.5;
picture.pickerAsset;

$( document ).ready(function() {
	$("#sizeBtn").on("click",function(){
	picture.showSizeDivs();
	});
	$("#pen1,#pen2,#pen3,#pen4,#pen5,#pen6").on("click",function(){
	picture.selectSizeDivs(this);
	});
	$("#low,#medium,#high").on("click",function(){
	picture.selectOpacity(this);
	});
	$("#opacityBtn").on("click",function(){
		$(".opacityBtns").css("display","block");
	});
	$(document).mouseup(function (e)
	{
    var containersizeBtn = $("#sizeBtn");
	var containeropacityBtn = $("#opacityBtn");
    if (!containersizeBtn.is(e.target) // if the target of the click isn't the container...
        && containersizeBtn.has(e.target).length === 0) // ... nor a descendant of the container
    {
        $(".sizeDivs").css("display","none");
    }
	 if (!containeropacityBtn.is(e.target) // if the target of the click isn't the container...
        && containeropacityBtn.has(e.target).length === 0) // ... nor a descendant of the container
    {
        $(".opacityBtns").css("display","none");
    }
	}); 
	$("#clear").on("click",function(){
		if(picture.confirmBox()){
			var context=picture.canvas.getContext("2d");
			context.clearRect(0, 0, picture.canvas.width, picture.canvas.height);
			picture.allactions=picture.sketchObj.actions;
			picture.isClearClicked=true;
			picture.sketchObj.actions=[];
		}
	});
	$("#undo").on("click",function(){
		if(picture.isClearClicked){
			picture.isClearClicked=false;	
			picture.sketchObj.actions=picture.allactions;
			picture.sketchObj.redraw();
		}
		else{
			picture.undo();
		}
	});
	$("#redo").on("click",function(){
		picture.redo();
	});
    $("#dropper").css("background-image",'url(images/dropper.ico)');
	$("#brush").css("background-image",'url(images/brush.png)');
	$("#canvas_image").css("background-image",'url(images/Apple.png)');
	$("#undo").css("background-image",'url(images/restart.png)');
	$("#clear").css("background-image",'url(images/erase.png)');
	$("#redo").css("background-image",'url(images/redo.png)');
	picture.canvas = document.querySelector('canvas');
	picture.fitToContainer(picture.canvas);
	$("#canvas_image").sketch({defaultColor: "rgba(256, 256, 256, 0.5)",defaultSize: "10"});
	picture.sketchObj=$("#canvas_image").sketch();
});

picture.undo=function(){
	picture.actionsHere=picture.sketchObj.actions;
	var arrayLength=picture.actionsHere.length;
	if(arrayLength>0){
	picture.recentAction=picture.sketchObj.actions[arrayLength-1];
	picture.actionsForRedo.push(picture.recentAction);
	picture.sketchObj.actions.splice(arrayLength-1,1);
	picture.sketchObj.redraw();
	}
};

picture.redo=function(){
	var arrayLength=picture.actionsForRedo.length;
	if(arrayLength>0)
	picture.sketchObj.actions.push(picture.actionsForRedo[arrayLength-1]);
	picture.actionsForRedo.splice(arrayLength-1,1);
	picture.sketchObj.redraw();
};
picture.confirmBox=function(){
    if (confirm("Do you really want to clear?") == true) {
        return 1;
    } else {
        return 0;
    }
};

picture.setMarker=function(picker){
	picture.pickerAsset=picker;
	picture.sketchObj.color=picture.hexToRgb(picker.toString());
};

picture.fitToContainer=function(canvas) {
  canvas.style.width='100%';
  canvas.style.height='100%';
  canvas.width  = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}

picture.selectOpacity=function(element){
	picture.opacity=$(element).val();
	picture.sketchObj.color=picture.hexToRgb(picture.pickerAsset.toString());
};

picture.showSizeDivs=function(){
	$(".sizeDivs").css("display","block");
};

picture.selectSizeDivs=function(element){
	var ht=$(element).height();
	picture.sketchObj.size=ht;
};

picture.hexToRgb=function(hex) {
    var bigint = parseInt(hex, 16);
    var r = (bigint >> 16) & 255;
    var g = (bigint >> 8) & 255;
    var b = bigint & 255;
    return "rgba("+r+","+g+","+b+","+picture.opacity+")";
}*/
