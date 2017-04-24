var Jodi={};
	Jodi.mainArrayUpper=[];
	Jodi.mainArrayLower=[];
	Jodi.arrayToSelectFromUpper=[];
	Jodi.arrayToSelectFromLower=[];
	Jodi.upperArray=[];
	Jodi.lowerArray=[];
	Jodi.jsonDataUpper;
	Jodi.jsonDataLower;
	Jodi.elementLength=10;
	Jodi.upperInterval=0,Jodi.lowerInterval=0;
	Jodi.upperCnt=0,Jodi.lowerCnt=0,Jodi.upperFirst=0,Jodi.lowerFirst=0;

$( document ).ready(function() {
    Jodi.setAllImagesThroughScript();
	Jodi.registerEventListeners();
	Jodi.jsonDataUpper=Jodi.imgMappingUpper;
	Jodi.jsonDataLower=Jodi.imgMappingLower;
	Jodi.arrayStore();
	Jodi.createDivs();
	Jodi.slidingOperations();
});

Jodi.setAllImagesThroughScript=function(){
	$("#homeLogo").css('background-image','url(images/home.png)');
};

Jodi.registerEventListeners=function(){
	$("#homeLogo").on("click", function() {
  		window.location.reload();
    });
	$(".buttonClass").on("click", function() {
		clearInterval(Jodi.upperInterval);
		clearInterval(Jodi.lowerInterval);
  		var num=Number($(this).attr("id").substring(1));
		if($("#upper"+(Jodi.upperFirst+num)).attr("value") == $("#lower"+(Jodi.lowerFirst+(3-num))).attr("value")){
				//correct Animation 
				$("#upper"+(Jodi.upperFirst+num)).addClass("animated zoomOutUp");
				$("#lower"+(Jodi.lowerFirst+(3-num))).addClass("animated zoomOutDown");
				setTimeout(function(){
					var ran=Math.floor(Math.random() * Jodi.elementLength) + 0 ; 
					if(Jodi.jsonDataUpper[Jodi.upperArray[Jodi.upperArray[ran%Jodi.elementLength]]].objType == "image"){
					$("#upperImg"+(Jodi.upperFirst+num)).prop("src",(Jodi.jsonDataUpper[Jodi.upperArray[ran%Jodi.elementLength]].imgURL));
					$("#upper"+(Jodi.upperFirst+num)).attr("value",Jodi.jsonDataUpper[Jodi.upperArray[ran%Jodi.elementLength]].matchType);
					}else{
						//set text div
						$("#upper"+(Jodi.upperFirst+num)).html(Jodi.jsonDataUpper[Jodi.upperArray[ran%Jodi.elementLength]].Text);
						$("#upper"+(Jodi.upperFirst+num)).attr("value",Jodi.jsonDataUpper[Jodi.upperArray[ran%Jodi.elementLength]].matchType);
					}
					if(Jodi.jsonDataUpper[Jodi.upperArray[Jodi.upperArray[ran%Jodi.elementLength]]].objType == "image"){
					$("#lowerImg"+(Jodi.lowerFirst+(3-num))).prop("src",(Jodi.jsonDataLower[Jodi.lowerArray[ran%Jodi.elementLength]].imgURL));
					$("#lower"+(Jodi.lowerFirst+(3-num))).attr("value",Jodi.jsonDataLower[Jodi.lowerArray[ran%Jodi.elementLength]].matchType);
					}else{
						// set text div
						$("#lower"+(Jodi.lowerFirst+(3-num))).html(jsonDataLower[Jodi.lowerArray[ran%Jodi.elementLength]].Text);
						$("#lower"+(Jodi.lowerFirst+(3-num))).attr("value",Jodi.jsonDataLower[Jodi.lowerArray[ran%Jodi.elementLength]].matchType);
					}
					$("#upper"+(Jodi.upperFirst+num)).removeClass("animated zoomOutUp");
					$("#lower"+(Jodi.lowerFirst+(3-num))).removeClass("animated zoomOutDown");
				},1200);
		}
		else{
				//incorrect Animation
				$("#upper"+(Jodi.upperFirst+num)).addClass("animated wobble");
				$("#lower"+(Jodi.lowerFirst+(3-num))).addClass("animated wobble");
			setTimeout(function(){
				$("#upper"+(Jodi.upperFirst+num)).removeClass("animated wobble");
				$("#lower"+(Jodi.lowerFirst+(3-num))).removeClass("animated wobble");
				},1200);
		}
		Jodi.slidingOperations();
    });
};

Jodi.arrayStore=function(){
	Jodi.mainArrayUpper=Array.from(Array(Jodi.jsonDataUpper.length).keys());
	Jodi.mainArrayLower=Array.from(Array(Jodi.jsonDataLower.length).keys());
	Jodi.mainArrayUpper=Jodi.shuffle(Jodi.mainArrayUpper);
	Jodi.mainArrayLower=Jodi.shuffle(Jodi.mainArrayLower);
	Jodi.arrayToSelectFromUpper=Jodi.mainArrayUpper.slice(0, Jodi.elementLength);
	Jodi.arrayToSelectFromLower=Jodi.mainArrayLower.slice(0, Jodi.elementLength);
	Jodi.upperArray=(Jodi.shuffle(Jodi.arrayToSelectFromUpper)).slice(0,Jodi.elementLength);
	Jodi.lowerArray=(Jodi.shuffle(Jodi.arrayToSelectFromLower)).slice(0,Jodi.elementLength);
};

Jodi.shuffle=function(array){
	var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};

Jodi.createDivs=function(){
	var upperDiv=0,lowerDiv=0;
	for(Jodi.upperCnt=0;Jodi.upperCnt<4;Jodi.upperCnt++){
		if(Jodi.jsonDataUpper[Jodi.upperArray[Jodi.upperCnt]].objType == "image"){
				upperDiv=$('<div id="upper'+Jodi.upperCnt+'" class="sameHeight upper col-sm-3 col-xs-3 col-md-3 col-lg-3" value='+Jodi.jsonDataUpper[Jodi.upperArray[Jodi.upperCnt]].matchType+'><img id="upperImg'+Jodi.upperCnt+'" class="img-responsive col-lg-12 col-md-12 col-xs-12 col-sm-12 allImages" src="'+Jodi.jsonDataUpper[Jodi.upperArray[Jodi.upperCnt]].imgURL+'"/></div>');	
		}
		else{
				upperDiv=$('<div id="upper'+Jodi.upperCnt+'" class="sameHeight upper col-sm-3 col-xs-3 col-md-3 col-lg-3" value='+Jodi.jsonDataUpper[Jodi.upperArray[Jodi.upperCnt]].matchType+'>'+Jodi.jsonDataUpper[Jodi.upperArray[Jodi.upperCnt]].Text+'</div>');
		}
		$('#leftScrolling').append(upperDiv);
	}
	
	for(Jodi.lowerCnt=0;Jodi.lowerCnt<4;Jodi.lowerCnt++){
		if(Jodi.jsonDataLower[Jodi.lowerArray[Jodi.lowerCnt]].objType == "image"){
				lowerDiv=$('<div id="lower'+Jodi.lowerCnt+'" class="sameHeight lower col-sm-3 col-xs-3 col-md-3 col-lg-3" value='+Jodi.jsonDataLower[Jodi.lowerArray[Jodi.lowerCnt]].matchType+'><img id="lowerImg'+Jodi.lowerCnt+'" class="img-responsive col-lg-12 col-md-12 col-xs-12 col-sm-12 allImages" src="'+Jodi.jsonDataLower[Jodi.lowerArray[Jodi.lowerCnt]].imgURL+'"/></div>');	
		}
		else{
				lowerDiv=$('<div id="lower'+Jodi.lowerCnt+'" class="sameHeight lower col-sm-3 col-xs-3 col-md-3 col-lg-3" value='+Jodi.jsonDataLower[Jodi.lowerArray[Jodi.lowerCnt]].matchType+'>'+Jodi.jsonDataLower[Jodi.lowerArray[Jodi.lowerCnt]].Text+'</div>');	
		}
		$('#rightScrolling').prepend(lowerDiv);	
	}
};

Jodi.slidingOperations=function(){
               
					Jodi.upperInterval=setInterval(function(){
					$(".upper").animate({
					  left: '-=' + 342
				   }, 500).promise().done(function () {
						if(Jodi.jsonDataUpper[Jodi.upperArray[Jodi.upperCnt%Jodi.elementLength]].objType == "image"){
					   			$("#leftScrolling").append('<div id="upper'+Jodi.upperCnt+'" class="sameHeight upper col-sm-3 col-xs-3 col-md-3 col-lg-3" value='+Jodi.jsonDataUpper[Jodi.upperArray[Jodi.upperCnt%Jodi.elementLength]].matchType+'><img id="upperImg'+Jodi.upperCnt+'" class="img-responsive col-lg-12 col-md-12 col-xs-12 col-sm-12 allImages" src="'+Jodi.jsonDataUpper[Jodi.upperArray[Jodi.upperCnt%Jodi.elementLength]].imgURL+'"/></div>');
						}
						else{
							$("#leftScrolling").append('<div id="upper'+Jodi.upperCnt+'" class="sameHeight upper col-sm-3 col-xs-3 col-md-3 col-lg-3" value='+Jodi.jsonDataUpper[Jodi.upperArray[Jodi.upperCnt%Jodi.elementLength]].matchType+'>'+Jodi.jsonDataUpper[Jodi.upperArray[Jodi.upperCnt%Jodi.elementLength]].Text+'</div>');
						}
						$("#upper"+Jodi.upperFirst).remove();
						$(".upper").css("left","0");
						Jodi.upperCnt++;Jodi.upperFirst++;
				   });
				},4000);
				
					Jodi.lowerInterval=setInterval(function(){
					$(".lower").animate({
					  left: '+=' + 342
				   }, 500).promise().done(function () {
						if(Jodi.jsonDataLower[Jodi.lowerArray[Jodi.lowerCnt%Jodi.elementLength]].objType == "image"){
					   			$("#rightScrolling").prepend('<div id="lower'+Jodi.lowerCnt+'" class="sameHeight lower col-sm-3 col-xs-3 col-md-3 col-lg-3" value='+Jodi.jsonDataLower[Jodi.lowerArray[Jodi.lowerCnt%Jodi.elementLength]].matchType+'><img id="lowerImg'+Jodi.lowerCnt+'" class="img-responsive col-lg-12 col-md-12 col-xs-12 col-sm-12 allImages" src="'+Jodi.jsonDataLower[Jodi.lowerArray[Jodi.lowerCnt%Jodi.elementLength]].imgURL+'"/></div>');
						}
						else{
							$("#rightScrolling").prepend('<div id="lower'+Jodi.lowerCnt+'" class="sameHeight lower col-sm-3 col-xs-3 col-md-3 col-lg-3" value='+Jodi.jsonDataLower[Jodi.lowerArray[Jodi.lowerCnt%Jodi.elementLength]].matchType+'>'+Jodi.jsonDataLower[Jodi.lowerArray[Jodi.lowerCnt%Jodi.elementLength]].Text+'</div>');
						}
						$("#lower"+Jodi.lowerFirst).remove();
						$(".lower").css("left","0");
						Jodi.lowerCnt++;Jodi.lowerFirst++;
				   });
				},2500);
};
