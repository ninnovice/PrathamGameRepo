var Utils = {};

Utils.ChooseRandomFromArray = function(Array, Todelete){
  var NoOfElements = Array.length, i, Index, Element;
  Index = Math.floor(Math.random() * (NoOfElements - 0) + 0);
  Element = Array[Index];
  if(Todelete === "false")
    return Element;
  else {
      Array.splice(Index, 1);
      return Element;
  }
};

Utils.BackPress = function(){
  Assessment.BackPressed = true;
	$(".options").remove();
  n = 5, count = 0,Assessment.Total = 0;
  $("#gameWindow, #Flip, #endgame").hide(); $("#CommonDiv, #YesNo").show();
  $("#audioQuestion,#videoQuestion").trigger("pause");
  var functionName = Assessment.Back.function, args = Assessment.Back.arguments;
  functionName=functionName.replace("Assessment.","");
  Assessment[functionName](args);
};

//USE ONLY FOR SMALL ARRAYS! (size less than 25)
Utils.shuffle = function (array) {
  var i = 0
    , j = 0
    , temp = null;

  for (i = array.length - 1; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i + 1));
    temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};

Utils.StartTime = function() {
  var d=new Date();
  startTime=d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate()+" "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
  return startTime;
}

Utils.ScoreInformation = {};

Utils.showSubjects = function(data){
  var i, languageSpecificName, name, subjectdiv;
  $("#CommonDiv").empty();
  selectorDiv = $("<div id='wid'><ul class='subjectlist'></ul></div>");
  $("#CommonDiv").append(selectorDiv);
  for(i = 0; i < data.length; i++){
    languageSpecificName = data[i].LanguageSpecificSubjectName;
    name = data[i].Subject;
    subjectdiv = $("<li class='Subjects' data-subjectname='"+name+"'>"+languageSpecificName+"</li>");
    $(".subjectlist").append(subjectdiv);
  }
};

Utils.showTopics = function(data){
  var i, languageSpecificName, name, topicdiv, selectorDiv;
  $("#CommonDiv").empty();
  selectorDiv = $("<div id='wid'><ul class='topiclist'></ul></div>");
  $("#CommonDiv").append(selectorDiv)
  for(i = 0; i < data.length; i++){
    languageSpecificName = data[i].LanguageSpecificTopicName;
    name = data[i].Topic;
    topicdiv = $("<li class='topics' data-topicname='"+name+"'>"+languageSpecificName+"</li>");
    $(".topiclist").append(topicdiv);
  }
};

Utils.showLevels = function(data){
  var i, level, leveldiv;
  $("#CommonDiv").empty();
  selectorDiv = $("<div class='selector'><ul class='selectorUL'></ul></div>");
  $("#CommonDiv").append(selectorDiv);
  for(i = 0; i < data.length; i++){
    level = data[i];
    leveldiv = $("<li><input id='"+i+"'/ type='checkbox'><label for='"+i+"' class='Levels' data-level='"+level+"'>"+level+"</label></li>");
    $(".selectorUL").append(leveldiv);
  }
  $(".selector").append($("<button>"+Language[Assessment.Language]["Select Level"]+"</button>"));
  $(".selectorUL").removeClass("selectorUL");
  setTimeout(function() { toggleOptions('.selector'); }, 100);
};

Utils.AppendOptions = function(data){
  var i, option, optiondiv, wordflag = false;
  $(".options").remove();
  for(i = 0; i < data.length; i++){
    option = data[i];
    if(option.trim() === ""){
      i--;
      continue;
    }
    optiondiv = $("<div class='col-md-5 col-lg-5 col-sm-5 col-xs-5 options CheckAnswer' data-level='"+option+"'>"+option+"</div>");
    $("#answer").append(optiondiv);
    option = option.trim();
    if(option.length >= 14){
      $(optiondiv).addClass("SmallTextOption")
    }else {
      $(optiondiv).addClass("BigTextOption");
    }
  }
  $(".CheckAnswer").off().on("click", Assessment.CheckAnswer);
};

Utils.AppendScores = function(currentObj){
  var outerDiv, innerDiv, i=1, key, Marks = currentObj.Marks[0], scoreDiv, marks,length = Object.keys(currentObj.Marks[0]).length;
  outerDiv = $("<div id='"+currentObj.Subject+"' class='col-md-12 col-lg-12 col-sm-12 col-xs-12 trapezium'></div>");
  innerDiv = $("<div class='ScoreSubjects'>"+currentObj.LanguageSpecificSubjectName+"</div>");
  $("#ScoreCard").append(outerDiv);
  $(outerDiv).append(innerDiv);
  for(;i<=length;i++){
    marks = Marks[i];//key = i.toString();
    scoreDiv = $("<div class='Scores'>"+marks+"<img src='"+marks+".png' height='80%' width='70%' style='margin-top:-20px;'/></div>");
    $(outerDiv).append(scoreDiv);
  }
};

var nbOptions = 8;
var angleStart = -360;

// jquery rotate animation
function rotate(li,d) {
    $({d:angleStart}).animate({d:d}, {
        step: function(now) {
            $(li)
               .css({ transform: 'rotate('+now+'deg)' })
               .find('label')
                  .css({ transform: 'rotate('+(-now)+'deg)' });
        }, duration: 0
    });
}

// show / hide the options
function toggleOptions(s) {
    $(s).addClass('open');
    var li = $(s).find('li');
    var deg = $(s).hasClass('half') ? 180/(li.length-1) : 360/li.length;
    for(var i=0; i<li.length; i++) {
        var d = $(s).hasClass('half') ? (i*deg)-90 : i*deg;
        $(s).hasClass('open') ? rotate(li[i],d) : rotate(li[i],angleStart);
    }
}

$('.selector button').click(function(e) {
    toggleOptions($(this).parent());
});
