﻿
var picid = "0";
var wordid = "0";
(function () {

    var shuffleArray = function (array) {
        var m = array.length, t, i;
        // While there remain elements to shuffle
        while (m) {
            // Pick a remaining element…
            i = Math.floor(Math.random() * m--);
            // And swap it with the current element.
            t = array[m];
            array[m] = array[i];
            array[i] = t;
        }
        return array;
    }
    function arraysEqual(arr1, arr2) {
        if (arr1.length !== arr2.length)
            return false;
        for (var i = arr1.length; i--;) {
            if (arr1[i] !== arr2[i])
                return false;
        }
        return true;
    }
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    var picturecardmoule = angular.module("PicApp", []);

    picturecardmoule.controller("PicturecardController", function ($scope, $interval) {
        var t = this;
        $scope.prev = false;
        $scope.picturelist = [];
        $scope.picturelist = picturelistH.slice(0);
        $scope.picturelist = shuffleArray($scope.picturelist);
        $scope.i = 0;
        $scope.picture = $scope.picturelist[$scope.i];
        $scope.picture.Wlist = shuffleArray($scope.picture.Wlist);
        $scope.picid = $scope.picture.PID;
        picid = $scope.picture.PID;
        $scope.totalscore = 0;
        $scope.score = 0;        
        $scope.currentlist = [];
        $scope.displayScore = function () {
            $scope.StopTimer();
            $scope.screen = "score";
        };
        $scope.displayGame = function () {
            b = $("#P1");
            b.css('display', 'none');
            b = $("#P2");
            b.css('display', 'none');
            b = $("#P3");
            b.css('display', 'none');
            b = $("#P4");
            b.css('display', 'none');
            b = $("#P5");
            b.css('display', 'none');

            $scope.screen = "game";
            $scope.picturelist = [];
            $scope.picturelist = PicturelistM.slice(0);
            $scope.picturelist = shuffleArray($scope.picturelist);
            $scope.i = 0;
            $scope.picture = $scope.picturelist[$scope.i];
            $scope.picture.Wlist = shuffleArray($scope.picture.Wlist);
            $scope.picid = $scope.picture.PID;
            picid = $scope.picture.PID;
            $scope.totalscore = 0;
            $scope.score = 0;
            b = $("#" + $scope.picture.PID);
            b.css('display', 'inline');
            $scope.StartTimer();
        };

        b = $("#" + $scope.picture.PID);
        b.css('display', 'inline');
        $scope.screen = "game";
        
        $scope.nextclick = function () {
            $scope.getnextpic();
            $scope.curnum = $scope.getrandompic();
            wordid = $scope.picture.Wlist[$scope.curnum].ID;
            c = $("#" + wordid);
            //c.addClass('anim');
        }
        $scope.previousclick = function () {
            $scope.getprevpic();
            $scope.curnum = $scope.getrandompic();
            wordid = $scope.picture.Wlist[$scope.curnum].ID;
            c = $("#" + wordid);
            //c.addClass('anim');
        }

        $scope.getprevpic = function () {
            if ($scope.i > 0) {
                b = $("#" + $scope.picture.PID);
                b.css('display', 'none');
                $scope.i = $scope.i - 1;
                $scope.picture = $scope.picturelist[$scope.i];
                $scope.picture.Wlist = shuffleArray($scope.picture.Wlist);
                for (a in $scope.picture.Wlist) {
                    $scope.picture.Wlist[a].played = false;
                    c = $("#" + $scope.picture.Wlist[a].ID);
                    //c.removeClass('anim');
                }

                $scope.picid = $scope.picture.PID;
                picid = $scope.picture.PID;
                $scope.score = 0;
                b = $("#" + $scope.picture.PID);
                b.css('display', 'inline');

            }
            if ($scope.i == 0)
            {
                $scope.prev = false;
            }
            else {
                $scope.prev = true;
            }
        }


        $scope.getnextpic = function () {
            if ($scope.i < 3) {
                b = $("#" + $scope.picture.PID);
                b.css('display', 'none');
                $scope.i = $scope.i + 1;
                $scope.picture = $scope.picturelist[$scope.i];
                $scope.picture.Wlist = shuffleArray($scope.picture.Wlist);
                for (a in $scope.picture.Wlist) {
                    $scope.picture.Wlist[a].played = false;
                    c = $("#" + $scope.picture.Wlist[a].ID);
                    //c.removeClass('anim');
                }
                $scope.picid = $scope.picture.PID;
                picid = $scope.picture.PID;
                $scope.score = 0;
                b = $("#" + $scope.picture.PID);
                b.css('display', 'inline');

                if ($scope.i == 0) {
                    $scope.prev = false;
                }
                else {
                    $scope.prev = true;
                }
            }
        else {
                $scope.displayScore();
            }
        }     

        $scope.getrandompic = function () {
            var wlength = 0;
            if ($scope.picture.Wlist.length < 5)
                wlength = $scope.picture.Wlist.length;
            else
                wlength = 5;
            var no= getRandomInt(0, wlength - 1);
            if ($scope.picture.Wlist[no].played == true) {
                return $scope.getrandompic();
            }
            else {
                return no;
            }
            
        };


        $scope.getnextword = function () {            
            c = $("#" + wordid);
            c.removeClass('anim');
            c.css('fill', 'none');    
            $scope.picture.Wlist[$scope.curnum].played = true;
            $scope.currentlist.push($scope.picture.Wlist[$scope.curnum].MyWords);

            $scope.curnum = $scope.getrandompic();
            wordid = $scope.picture.Wlist[$scope.curnum].ID;
            c = $("#" + wordid);

            setTimeout(function () { playsound2(wordid); }, 3000);

            
            //c.addClass('anim');
        };

        $scope.playcurwordsound = function () {
            wordid = $scope.picture.Wlist[$scope.curnum].ID;
            c = $("#" + wordid);
            //c.addClass('anim');
            playsound2(wordid);
        };
		
		
		

        $scope.checkalert = function ()
        {
            alert("success");
        }

        $scope.curnum = $scope.getrandompic();
        wordid = $scope.picture.Wlist[$scope.curnum].ID;
        c = $("#" + wordid);
        //c.addClass('anim');
        playsound2(wordid);
        $scope.Timer = null;


        //Timer start function.
        $scope.StartTimer = function () {
            $scope.colornum = 0;
            //Set the Timer start message.
            $scope.Message = "Timer started. ";
            $scope.maxsec = 99;
            $scope.animationstate = 1;
            //Initialize the Timer to run every 1000 milliseconds i.e. one second.
            $scope.Timer = $interval(function () {

                if ($scope.maxsec == 0 || $scope.score == 200 ) {
                    //alert("Timer Stopped");
                    $scope.displayScore();
                }
                else {
                    $scope.maxsec = $scope.maxsec - 1;
                }
                //Display the current time.
                $scope.Message = "Timer Ticked. " + $scope.maxsec;

                //b = $("#" + wordid);
                c = $("#" + wordid);
                c.css('cursor', 'pointer');                            
            }, 1000);
        };



        //Timer stop function.
        $scope.StopTimer = function () {

            //Set the Timer stop message.
            $scope.Message = "Timer stopped.";

            //Cancel the Timer.
            if (angular.isDefined($scope.Timer)) {
                $interval.cancel($scope.Timer);
            }
        };

        $scope.StartTimer();

        $scope.checkword = function (a) {
            if (a == wordid) {
                $scope.score = $scope.score + 10;
                $scope.totalscore = $scope.totalscore + 10;

                //var audio = new Audio('Content/sound/congrats.mp3');
                //audio.play();
                var sound_array = ["Content/sound/Rooster.mp3"];

                var sound = sound_array[Math.floor(Math.random() * sound_array.length)];
                var audio = new Audio(sound);
                audio.play();
                

                if ($scope.score == 50) {
                    $scope.getnextpic();
                    $scope.currentlist=[];

                    $scope.curnum = $scope.getrandompic();
                    wordid = $scope.picture.Wlist[$scope.curnum].ID;
                    c = $("#" + wordid);
                    playsound2(wordid);
                    //c.addClass('anim');
                }
                else {
                    $scope.getnextword();
                }
                
            } else

                //var audio = new Audio('Content/sound/wrong.mp3');
                //audio.play();

                var sound_array1 = ["Content/sound/Chickencoop.mp3"];
                var sound1 = sound_array1[Math.floor(Math.random() * sound_array1.length())];
                var audio1 = new Audio(sound1);
                audio1.play();
                
        };
    }
    );


})();