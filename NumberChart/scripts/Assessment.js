//var Assessment = {};
Assessment.DataForQuery = {}, /*NumberOfQuestionsToBeDisplayed*/ n = 5, count = 0;
Assessment.Total = 0;

Assessment.Ready = function(){
  Assessment.Language = Android.getLanguage();
  Android.getSubjects();
};

Assessment.getSubjects = function(Subjects){
  $("#ScoreCard").hide(); $("#CommonDiv").show();
  Android.setFlag(false);
	$("#Select").text("");
	Assessment.Subjects = Subjects;//JSON.parse(Subjects);
  $(".CheckAnswer").off().on("click", Assessment.CheckAnswer);
  Assessment.Back = { function: "Assessment.Reload", arguments: "" };
  Utils.showSubjects(Assessment.Subjects);
  $(".Subjects").off().on("click", function(){
    var subject = $(this).data("subjectname");
    $("#wid").animate({
          "width" : "-10px"
      },function(){
        Assessment.getTopics(subject);
      });
  });
};

Assessment.ShowScore = function(ScoreData){
  $("#ScoreCard").show();
  Android.setFlag(false);
  ScoreData = JSON.parse(ScoreData);
  var length = ScoreData.ScoreData.length, i=0, Subject, languageSpecificName, currentObj = {}, goAhead = false, StudentInformation;
  StudentName = ScoreData.StudentName; ScoreData = ScoreData.ScoreData;
  for(; i<length; i++){
    if(ScoreData[i].Marks.length){
      goAhead = true;
      break;
    }
  }
  if(!goAhead)
    Assessment.Ready();
  else {
    $("#ScoreCard").off().on("click",Assessment.Ready);
    $("#StudentInformation").text("Welcome "+StudentName);
    for(;i<length; i++){
      currentObj = ScoreData[i];
      if(currentObj.Marks.length)
        Utils.AppendScores(currentObj);
    }
  }
};

Assessment.WebReady = function () {
    n = 5, count = 0, Assessment.Total = 0;
    $("#gameWindow, #Flip, #endgame").hide(); $("#CommonDiv, #YesNo").show();
      var showScore = Android.ShowScore();
      if(showScore)
        Android.getScoreData();
      else {
        Assessment.Ready();
      }
};

//$(document).ready(function(){
//  var showScore = Android.ShowScore();
//  if(showScore)
//    Android.getScoreData();
//  else {
//    Assessment.Ready();
//  }
//});

Assessment.getTopics = function(subject){
  Android.setFlag(true);
  $("#Select").text(Language[Assessment.Language]["Select Topic"]);
  Assessment.Back = {function : "Assessment.Ready", arguments : ""};
  var Subject = typeof(subject) === "object" ? $(this).data("subjectname") : subject;
  Assessment.DataForQuery.Subject = Subject;
  Android.getTopics(Subject);
};

Assessment.showTopics = function(Topics){
  Assessment.Topics = Topics;//JSON.parse(Topics);
  Utils.showTopics(Assessment.Topics);
  $(".Topics").off().on("click", function(){
    var topic = $(this).data("topicname");
    $("#wid").animate({
          "width" : "0px"
      },function(){
        Assessment.getLevels(topic);
      });
  });
}

Assessment.getLevels = function(topic){
  $("#Select").text("");
  Assessment.Back = {function : "Assessment.getTopics", arguments : Assessment.DataForQuery.Subject};
  var Topic = typeof(topic) === "object" ? $(this).data("topicname") : topic;
  Assessment.DataForQuery.Topic = Topic;
  Android.getLevels(Topic);
};

Assessment.showLevels = function(Levels){
    Assessment.Levels = Levels;//Levels.split(",");
  Utils.showLevels(Assessment.Levels);
  $(".Levels").off().on("click", Assessment.getAssessmentData);
}

Assessment.getAssessmentData = function(level){
  var Format, Level = typeof(level) === "object" ? $(this).data("level") : level;
  
  Assessment.DataForQuery.Level = Level.toString();
  Assessment.DataForQuery.LanguageId = Assessment.Language;
    //Android.getAssessmentData(Assessment.DataForQuery.Subject,Assessment.DataForQuery.Topic,Assessment.DataForQuery.Level);
  Android.getAssessmentData();
};

Assessment.showQuestions = function(Data){
    Assessment.Data = Data;//JSON.parse(Data);

  Assessment.Data.QuestionFormat= Assessment.Data.QuestionFormat.charAt(0).toUpperCase() + Assessment.Data.QuestionFormat.slice(1);

  Assessment.Format = Assessment.Data.QuestionFormat;
  Assessment.Data = Assessment.Data.Questions;
  if (Assessment.Data.length < 5) {
      bootbox.alert("Not enough Questions.", Android.getLevels(Assessment.DataForQuery.Topic));
  } else {
      Assessment.Back = { function: "Assessment.getLevels", arguments: Assessment.DataForQuery.Topic };
      Assessment.Folder = Utils.ChooseRandomFromArray(ImagesFolderPath, "false");
      $("#imageQuestion").prop('src', Assessment.Folder + "0.gif");
      $("#gameWindow").show(); $("#CommonDiv, #Select").hide();
      var text = Language[Assessment.Language][Assessment.Format];
      $("#instructions").text(text);
      Assessment.BackPressed = false;
      Assessment[Assessment.Format]();
  }
};


Assessment.Flip = function(){
  $("#gameWindow, #Select, #CommonDiv").hide();
  $('#mainGamePage').css('background-color', '#336699');
  $('#Flip').css('display','block');
  Flip.getGameData();
};

Assessment.YesNo = function(){
  $(".options").remove();
  $(".hideforImg").hide();
  Assessment.Answer = "false";
  var Question = Utils.ChooseRandomFromArray(Assessment.Data), options = [], Answer, shuffledArray, extraoption;
  QuestionId = Question.QuestionId, StartTime = Utils.StartTime();
  options = (Question.ExtraOptions).split("~");
  shuffledArray = Utils.shuffle(options);
  extraoption = Utils.ChooseRandomFromArray(shuffledArray);
  shuffledArray = [extraoption,Question.Answer];
  Answer = Utils.ChooseRandomFromArray(shuffledArray);
  if(Answer === Question.Answer)
    Assessment.Answer = "true";
  $("#QuestionText").text(Question.Question);
  if(Question.Question.length > 52){
    $("#QuestionText").css("font-size","25px");
  }else {
    $("#QuestionText").css("font-size","35px");
  }
  $("#AnswerText").show().text("उत्तर : "+Answer);
};

Assessment.Media = function(){
  Assessment.Path = "images/"+Language[Assessment.Language]["Language"]+"/"
  $("#YesNo, .hideAll, #AnswerText").hide();
  $(".hideAll").prop("src","");

  var Question = Utils.ChooseRandomFromArray(Assessment.Data), type, Answer, options = [];
  QuestionId = Question.QuestionId, StartTime = Utils.StartTime();
    //if(Question.SourceType !== "picture")
      //Assessment.Path = Android.getPath();
  Question.Source = Assessment.Path + Question.Source;
  Question.SourceType = Question.SourceType.toLowerCase();
  $("."+Question.SourceType).show().prop("src", Question.Source);
  $("#audioQuestion,#videoQuestion").trigger("play");
  Assessment.Answer = Question.Answer;

  $("#QuestionText").text(Question.Question);
  if(Question.Question.length > 52){
    $("#QuestionText").css("font-size","25px");
  }else {
    $("#QuestionText").css("font-size","35px");
  }
  options = (Question.ExtraOptions).split("~");
  options.push(Question.Answer);
  Utils.shuffle(options);
  Utils.AppendOptions(options);
};

Assessment.CheckAnswer = function(){
  count++;
  $(this).focusout();
  $(".CheckAnswer").css("pointer-events","none");
  var Answer = $(this).val() === ""? $(this).text() : $(this).val(), ScoredMarks = 0, imageNo, QuestionFormat = Assessment.Format,subject,topic,questionId, totalMarks = 10, level, time = 0;
  if(Assessment.Answer === Answer){
    ScoredMarks = 10;
    if(QuestionFormat === "YesNo"){
      imageNo = parseInt(($("#imageQuestion").prop("src")).replace(/^\D+/g, ""))+1;
      $("#imageQuestion").prop("src", Assessment.Folder+imageNo+".gif");
    }else {
      $(this).css("background","green");
    }
    //Android.audioPlayer("right_ans.mp3");
  }else {
    if(QuestionFormat !== "YesNo")
      $(this).css("background","red");
   //Android.audioPlayer("wrong-ans.mp3");
  }
  Assessment.Total += ScoredMarks;
  subject = Assessment.DataForQuery.Subject; topic = Assessment.DataForQuery.Topic; level = Assessment.DataForQuery.Level;
  //Android.trackAssessmentScore(subject,topic,StartTime,QuestionId,QuestionFormat,Answer,ScoredMarks,totalMarks,level);
  if(count < n)
    setTimeout(function(){
      $(".CheckAnswer").css("pointer-events","auto");
      if(!Assessment.BackPressed)
        Assessment[QuestionFormat]();
    },1000);
    else {
      if(Assessment.Total === 50 && QuestionFormat === "YesNo")
        time = 4000;
      setTimeout(function(){
        $("#gameWindow").fadeOut(1000);
        $("#endgameMsg").text(Language[Assessment.Language][Assessment.Total.toString()]);
        $("#endgameDiv").text(Language[Assessment.Language]["Score"]+" "+Assessment.Total);
        //Android.saveTotalQuizData(subject,Assessment.Total);
        setTimeout(function(){$("#endgame").fadeIn(1000);},1000);
        $("#audioQuestion,#videoQuestion").trigger("pause");
        setTimeout(function () { Assessment.Reload(); },8000);//window.location.reload();}, 8000);
      },time);
    }
};

Assessment.setPath = function(path){
  Assessment.Path = path;
};
