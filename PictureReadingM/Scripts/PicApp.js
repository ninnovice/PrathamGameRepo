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
        this.prev = false;
        this.picturelist = [];
        this.picturelist = PicturelistM.slice(0);
        this.picturelist = shuffleArray(this.picturelist);
        this.i = 0;
        this.picture = this.picturelist[this.i];
        this.picture.Wlist = shuffleArray(this.picture.Wlist);
        this.picid = this.picture.PID;
        picid = this.picture.PID;
        this.totalscore = 0;
        this.score = 0;        

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
            this.picturelist = [];
            this.picturelist = PicturelistM.slice(0);
            this.picturelist = shuffleArray(this.picturelist);
            this.i = 0;
            this.picture = this.picturelist[this.i];
            this.picture.Wlist = shuffleArray(this.picture.Wlist);
            this.picid = this.picture.PID;
            picid = this.picture.PID;
            this.totalscore = 0;
            this.score = 0;
            b = $("#" + this.picture.PID);
            b.css('display', 'inline');
            $scope.StartTimer();
        };

        b = $("#" + this.picture.PID);
        b.css('display', 'inline');
        $scope.screen = "game";
        
        this.nextclick = function () {
            this.getnextpic();
            this.curnum = this.getrandompic();
            wordid = this.picture.Wlist[this.curnum].ID;
            c = $("#" + wordid);
            c.addClass('anim');
        }
        this.previousclick = function () {
            this.getprevpic();
            this.curnum = this.getrandompic();
            wordid = this.picture.Wlist[this.curnum].ID;
            c = $("#" + wordid);
            c.addClass('anim');
        }

        this.getprevpic = function () {
            if (this.i > 0) {
                b = $("#" + this.picture.PID);
                b.css('display', 'none');
                this.i = this.i - 1;
                this.picture = this.picturelist[this.i];
                this.picture.Wlist = shuffleArray(this.picture.Wlist);
                for (a in this.picture.Wlist) {
                    this.picture.Wlist[a].played = false;
                    c = $("#" + this.picture.Wlist[a].ID);
                    c.removeClass('anim');
                }

                this.picid = this.picture.PID;
                picid = this.picture.PID;
                this.score = 0;
                b = $("#" + this.picture.PID);
                b.css('display', 'inline');

            }
            if (this.i == 0)
            {
                this.prev = false;
            }
            else {
                this.prev = true;
            }
        }


        this.getnextpic = function () {
            if (this.i < 4) {
                b = $("#" + this.picture.PID);
                b.css('display', 'none');
                this.i = this.i + 1;
                this.picture = this.picturelist[this.i];
                this.picture.Wlist = shuffleArray(this.picture.Wlist);
                for (a in this.picture.Wlist) {
                    this.picture.Wlist[a].played = false;
                    c = $("#" + this.picture.Wlist[a].ID);
                    c.removeClass('anim');
                }
                this.picid = this.picture.PID;
                picid = this.picture.PID;
                this.score = 0;
                b = $("#" + this.picture.PID);
                b.css('display', 'inline');

                if (this.i == 0) {
                    this.prev = false;
                }
                else {
                    this.prev = true;
                }
            }
        else {
                $scope.displayScore();
            }
        }     

        this.getrandompic = function () {
            var wlength = 0;
            if (this.picture.Wlist.length < 10)
                wlength = this.picture.Wlist.length;
            else
                wlength = 10;
            var no= getRandomInt(0, wlength - 1);
            if (this.picture.Wlist[no].played == true) {
                return this.getrandompic();
            }
            else {
                return no;
            }
            
        };


        this.getnextword = function () {            
            c = $("#" + wordid);
            c.removeClass('anim');
            c.css('fill', 'none');    
            this.picture.Wlist[this.curnum].played = true;
            this.curnum = this.getrandompic();
            wordid = this.picture.Wlist[this.curnum].ID;
            c = $("#" + wordid);
            c.addClass('anim');
        };


        this.curnum = this.getrandompic();
        wordid = this.picture.Wlist[this.curnum].ID;
        c = $("#" + wordid);
        c.addClass('anim');
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

                if ($scope.maxsec == 0) {
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

        this.checkword = function (a) {
            if (a == wordid) {
                this.score = this.score + 10;
                this.totalscore = this.totalscore + 10;

                //var audio = new Audio('Content/sound/congrats.mp3');
                //audio.play();
                var sound_array = ["Content/sound/Rooster.mp3"];

                var sound = sound_array[Math.floor(Math.random() * sound_array.length)];
                var audio = new Audio(sound);
                audio.play();
                

                if (this.score == 100) {
                    this.getnextpic();

                    this.curnum = this.getrandompic();
                    wordid = this.picture.Wlist[this.curnum].ID;
                    c = $("#" + wordid);
                    c.addClass('anim');
                }
                else {
                    this.getnextword();
                }
                
            } else

                //var audio = new Audio('Content/sound/wrong.mp3');
                //audio.play();

                var sound_array1 = ["Content/sound/Chickencoop.mp3"];
                var sound1 = sound_array1[Math.floor(Math.random() * sound_array1.length)];
                var audio1 = new Audio(sound1);
                audio1.play();
                
        };
        $scope.pad = function (num, size) {
            var s = num + "";
            while (s.length < size) s = "0" + s;
            return s;
        };
    }
    );


})();