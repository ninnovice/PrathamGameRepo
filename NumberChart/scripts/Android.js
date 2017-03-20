/// <reference path="taffy-min.js" />
var Android = {};
Android.setFlag = function (flag) {
    console.log(flag);
}

Android.ShowScore = function () {
        return false;
}

Android.getLanguage = function () {
    return Assessment.selectedLanguage;
}

Android.getSubjects = function () {
    var distinct, i = 0, length, Subjects = [];
    Subjects = DB({ "LanguageId": Assessment.Language }).distinct("Subject", "LanguageSpecificSubjectName");
    Assessment.getSubjects(Subjects);
}

Android.getTopics = function (Subject) {
    var Topics = DB({ "Subject": Subject, "LanguageId": Assessment.Language }).distinct("Topic", "LanguageSpecificTopicName");
    Assessment.showTopics(Topics);
}

Android.getLevels = function (Topic) {
    var Levels = DB({ "Topic": Topic, "LanguageId": Assessment.Language }).distinct("Level");
    Assessment.showLevels(Levels);
}

Android.getAssessmentData = function () {
    var Questions, Data = {};
    Questions = DB(Assessment.DataForQuery).get();
    Data.QuestionFormat = "YesNo";
    if (Assessment.DataForQuery.QuestionType === "media")
        Data.QuestionFormat = "Media";
    Data.Questions = Questions;
    Assessment.showQuestions(Data);
}