var picture={};
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
			/*var arraylength=picture.actionsHere.length;
			for(i=0;i<arraylength;i++){
				picture.undo();
			}*/
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
    $("#toolSection").css("background-image",'url(images/dropper.ico)');
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
}
