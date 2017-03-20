var AddSubtract = {};
AddSubtract.number=0;
AddSubtract.flag=false;
var myArray=[];
var boxes=[];

$(document).ready(function(){
	$("#container").hide();
	$("#part1").on("click",AddSubtract.level1);
	$("#part2").on("click",AddSubtract.level2);
	$("#part3").on("click",AddSubtract.level3);
});

AddSubtract.level1=function(){
	$("#container").show();
	$("#mainpage").hide();
	$("#checkAns").hide();
	$("#submitAns").text("अगला");
	AddSubtract.ChooseNumber();
	AddSubtract.ShowAnswers();
	$("#submitAns").on("click",function(){
		for(i=0;i<myArray.array.length;i++){
		$(myArray.array[i]).css("background-color","white");
		$(myArray.array[i]).css("color","rgb(211, 211, 211)");	
		$(myArray.array[i]).removeClass("blink_me");
		//AddSubtract.shake($(array[i]));
	}
		AddSubtract.level1();
	});
};
AddSubtract.level2=function(){
	$("#container").show();
	$("#mainpage").hide();
	AddSubtract.ChooseNumber();
	$("#checkAns").on("click", AddSubtract.check);
	$("#submitAns").on("click",function(){
		for(i=0;i<myArray.array.length;i++){
		$(myArray.array[i]).css("background-color","white");
		$(myArray.array[i]).css("color","rgb(211, 211, 211)");	
		$(myArray.array[i]).removeClass("blink_me");
		//AddSubtract.shake($(array[i]));
	}
		$(".forTransparent").css("background-color","transparent");
		$(this).closest('#AddSubtract').find("input[type=number], textarea").val("");
		//$(this).closest('#Questions').find("input[type=number], id").css("background-color","black");
		$("#submitAns").removeClass("blink_me");
		AddSubtract.level2();
	});
};
AddSubtract.level3=function(){
	$("#container").show();
	$("#grid").hide();
	$("#AddSubtract").removeClass("col-md-5 col-lg-5");
	$("#AddSubtract").addClass("col-sm-12 col-xs-12 col-md-12 col-lg-12");
	$("#AddSubtract").css("width","100%");
	$("#addTwo").css("margin-top","25%");
	$("#addThree").css("margin-top","25%");
	$("#addThree").css("margin-left","1%");
	$("#subOne").css("margin-top","6%");
	$("#subOne").css("margin-left","1%");
	$("#subTwo").css("margin-top","6%");
	$("#subThree").css("margin-top","32%");
	$("#number").css("margin-top","9%");
	$("#number").css("margin-left","40%");
	$("#number").css("width","20%");
	$("#number").css("height","40%");
	$("#homeGif").css("margin-left","1%");
	$(".buttonsDiv").css("margin-top","38%");
	$(".buttonsDiv").css("margin-left","20%");
	$(".buttonsDiv").removeClass("col-sm-12 col-xs-12 col-md-12 col-lg-12");
	$(".buttonsDiv").addClass("col-sm-9 col-xs-9 col-md-9 col-lg-9");
	$("#mainpage").hide();
	AddSubtract.ChooseNumber();
	$("#checkAns").on("click", AddSubtract.check);
	$("#submitAns").on("click",function(){
		for(i=0;i<myArray.array.length;i++){
		$(myArray.array[i]).css("background-color","white");
		$(myArray.array[i]).css("color","rgb(211, 211, 211)");	
		$(myArray.array[i]).removeClass("blink_me");
		//AddSubtract.shake($(array[i]));
	}
		$(".forTransparent").css("background-color","transparent");
		$(this).closest('#AddSubtract').find("input[type=number], textarea").val("");
		$("#submitAns").removeClass("blink_me");
		AddSubtract.level2();
	});
};

AddSubtract.ChooseNumber = function(){
     /* number = Math.floor((Math.random() * 20) + 1);
      number  ? number = number+2: number = number;*/
	  do{
		  number=AddSubtract.randomIntFromInterval(1,20);
	  }while(number<5 || number>16);
      AddSubtract.Display(number);
};
AddSubtract.Display = function(number){
  var div, column, className;
    myArray.array = $(".middle").filter(function(){
	     { return $(this).text() == number;}
     });
    $("#number").text(number);
	for(i=0;i<myArray.array.length;i++){
	$(myArray.array[i]).css("background-color","pink");
	$(myArray.array[i]).css("color","black");	
	$(myArray.array[i]).addClass("blink_me");
		//AddSubtract.shake($(array[i]));
	}
    /*div = Utils.ChooseRandomFromArray(array, false);
    className = $(div).prop("class").split(" ")[3];*/
    AddSubtract.GetAnswers(div, className);
};
AddSubtract.GetAnswers = function(div, className){
    additionArray = [$("."+className+":eq(0)").html(), $($(".animate").parent().children()[0]).html()];
    subArray =[$("."+className+":last").html(), $($(".animate").parent()).find(".gridSub").html()];
};
AddSubtract.ShowAnswers = function(){
	var add1=AddSubtract.randomIntFromInterval(number,1);
	$("#add1-1").val(add1);
	$("#add1-2").val(number-add1);
	do{
		var add2=AddSubtract.randomIntFromInterval(number,1);
	}while(add2==add1);
	$("#add2-1").val(add2);
	$("#add2-2").val(number-add2);
	do{
		var add3=AddSubtract.randomIntFromInterval(number,1);
	}while(add3==add1 || add3==add2);
	$("#add3-1").val(add3);
	$("#add3-2").val(number-add3);
	
	var sub1=AddSubtract.randomIntFromInterval(20,number);
	$("#sub1-1").val(sub1);
	$("#sub1-2").val(sub1-number);
	do{
		var sub2=AddSubtract.randomIntFromInterval(20,number);
	}while(sub2==sub1);
	$("#sub2-1").val(sub2);
	$("#sub2-2").val(sub2-number);
	do{
		var sub3=AddSubtract.randomIntFromInterval(20,number);
	}while(sub3==sub1 || sub3==sub2);
	$("#sub3-1").val(sub3);
	$("#sub3-2").val(sub3-number);
}
AddSubtract.randomIntFromInterval = function(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
};
AddSubtract.check = function(){
	boxes[0]=AddSubtract.rightOrWrongAddition("#add1-1","#add1-2");
	boxes[1]=AddSubtract.rightOrWrongAddition("#add2-1","#add2-2");
	boxes[2]=AddSubtract.rightOrWrongAddition("#add3-1","#add3-2");
	boxes[3]=AddSubtract.rightOrWrongSubtraction("#sub1-1","#sub1-2");
	boxes[4]=AddSubtract.rightOrWrongSubtraction("#sub2-1","#sub2-2");
	boxes[5]=AddSubtract.rightOrWrongSubtraction("#sub3-1","#sub3-2");
	for(var i=0;i<6;i++){
		if(boxes[i]==0){
			AddSubtract.flag=false;
			break;
		}
		AddSubtract.flag=true;
	}
	if(AddSubtract.flag==true){
		$("#submitAns").text("अगला");
		$("#submitAns").addClass("blink_me");
		AddSubtract.flag=false;
		//AddSubtract.level2();
	}
};
AddSubtract.rightOrWrongAddition = function(box1,box2){
	if((Number($(box1).val()))+(Number($(box2).val()))==number)
	{
		if($(box1).val()==""){
		$(box1).css("background-color","red");	
		$(box1).addClass('ahashakeheartache');
			setTimeout(function(){
				$(box1).removeClass('ahashakeheartache');
			},1000);
		return 0;
		}
		else if($(box2).val()=="")
			{
				$(box2).css("background-color","red");	
				$(box2).addClass('ahashakeheartache');
				setTimeout(function(){
				$(box2).removeClass('ahashakeheartache');
			},1000);
				return 0;
			}
		else{
			$(box1).css("background-color","green");$(box2).css("background-color","green");
			return 1;
		}
	}
	else
	{
		$(box1).css("background-color","red");
		$(box2).css("background-color","red");
		$(box1).addClass('ahashakeheartache');
		setTimeout(function(){
				$(box1).removeClass('ahashakeheartache');
			},1000);
		$(box2).addClass('ahashakeheartache');
		setTimeout(function(){
				$(box2).removeClass('ahashakeheartache');
			},1000);
		return 0;
	}
};
AddSubtract.rightOrWrongSubtraction = function(box1,box2){
	if((Number($(box1).val()))-(Number($(box2).val()))==number)
	{
		if($(box1).val()==""){
		$(box1).css("background-color","red");	
		$(box1).addClass('ahashakeheartache');
			setTimeout(function(){
				$(box1).removeClass('ahashakeheartache');
			},1000);
		return 0;
		}
		else if($(box2).val()=="")
			{
				$(box2).css("background-color","red");	
				$(box2).addClass('ahashakeheartache');
				setTimeout(function(){
				$(box2).removeClass('ahashakeheartache');
			},1000);
				return 0;
			}
		else{
			$(box1).css("background-color","green");$(box2).css("background-color","green");
			return 1;
		}
	}
	else
	{
		$(box1).css("background-color","red");
		$(box2).css("background-color","red");
		$(box1).addClass('ahashakeheartache');
		setTimeout(function(){
				$(box1).removeClass('ahashakeheartache');
			},1000);
		$(box2).addClass('ahashakeheartache');
		setTimeout(function(){
				$(box2).removeClass('ahashakeheartache');
			},1000);
		return 0;
	}
};

AddSubtract.CheckAnswer = function(){
    $(".addText, .subText").removeClass("wrong");
    var addOne, addTwo, subOne, subTwo;
    addOne = $("#addOne").val();
    addTwo = $("#addTwo").val();
    subOne = $("#subOne").val();
    subTwo = $("#subTwo").val();
    if($.inArray(addOne, additionArray) === -1 || $.inArray(addTwo, additionArray) === -1){
      console.log("addition failed");
      $(".addText").addClass("wrong");
    }else if($.inArray(subOne, subArray) === -1 || $.inArray(subTwo, subArray) === -1){
      console.log("subtraction failed");
      $(".subText").addClass("wrong");
    }else {
      console.log("correct");
      AddSubtract.Next();
    }
};

AddSubtract.Next = function(){
  var className;
  //$(".middle").css("background","white");
  $(".animate").parent().css("background","none");
  className = $(".animate").prop("class").split(" ")[3];
  $("."+className).css("background","none");
  $(".add").css("background","#92d050");
  $(".subtract").css("background","red");
  $(".animate").removeClass("animate");
  AddSubtract.ChooseNumber();
}
/*
AddSubtract.shake = function(shakeDiv){
    $(shakeDiv).animate({
        'margin-left': '-=10px',
        'margin-right': '+=10px'
    }, 200, function() {
        $(shakeDiv).animate({
            'margin-left': '+=10px',
            'margin-right': '-=10px'
        }, 200, function() {
            //and so on...
        });
    });
}*/