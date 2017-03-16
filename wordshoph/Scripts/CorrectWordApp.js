﻿(function () {

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

    var corrword = angular.module("WordApp", []);

    corrword.controller("CorrectController", function ($scope, $timeout, $interval) {
        
        $scope.btncheck = false;
        $scope.maxsec = null;
        $scope.startTimeout = function () {
            $scope.Message = "Timer started. ";
            $scope.maxsec = 120;
            $scope.animationstate = 1;

            $scope.Timer = $interval(function () {
                $scope.maxsec = $scope.maxsec - 1;
                if ($scope.maxsec == 0) {
                    //alert("Timer Stopped");
                    $scope.dvheader = true;
                    $scope.dvgame = true;
                    $scope.dvcontrol = true;
                    $scope.dvplayagain = true;
                }                
            },1000);            
        }
        $scope.startTimeout();
        
        this.currentlist = [];
        this.currentlist = wlist1.slice(0);
        this.currentlist = shuffleArray(this.currentlist).slice(0,10);
        $scope.i = 0;       

        this.displaynewword = function () {
            if($scope.i<10){
            $scope.myword = this.currentlist[$scope.i].MyWords.slice(0);
            this.randomword = shuffleArray($scope.myword);
            $scope.myword = this.currentlist[$scope.i].MyWords.slice(0);
            while (arraysEqual(this.randomword, this.currentlist[$scope.i].MyWords)) {
                this.randomword = shuffleArray(this.randomword);
            }
            }
            else {
                //alert("game finish");
                $scope.dvheader = true;
                $scope.dvgame = true;
                $scope.dvcontrol = true;
                $scope.dvplayagain = true;
            }            
        };        
        this.displaynewword();

        $scope.items = [];
        $scope.score = 0;

        this.playAgain = function () {
            $scope.btncheck = false;
            $scope.dvheader = false;
            $scope.dvgame = false;
            $scope.dvcontrol = false;
            $scope.dvplayagain = false;
            $scope.score = 0;
            $scope.maxsec = 120;
            $scope.items = [];
            this.currentlist = [];
            this.currentlist = wlist1.slice(0);
            this.currentlist = shuffleArray(this.currentlist).slice(0, 10);
            $scope.i = 0;

            this.displaynewword = function () {
                if ($scope.i < 10) {
                    $scope.myword = this.currentlist[$scope.i].MyWords.slice(0);
                    this.randomword = shuffleArray($scope.myword);
                    $scope.myword = this.currentlist[$scope.i].MyWords.slice(0);
                    while (arraysEqual(this.randomword, this.currentlist[$scope.i].MyWords)) {
                        this.randomword = shuffleArray(this.randomword);
                    }
                }
                else {
                    //alert("game finish");
                    $scope.dvheader = true;
                    $scope.dvgame = true;
                    $scope.dvcontrol = true;
                    $scope.dvplayagain = true;
                }
            };
            this.displaynewword();
        }

        this.Check = function () {
            var data = $.map($('#sortable:first li'), function (el) {
                return $(el).attr("data-myattr");
            });
            
            if (arraysEqual(data, $scope.myword))
            {
                //var sound_array = ["sound/Elephant.mp3", "sound/Lion.mp3", "sound/Rooster.mp3", "sound/HorseWhinny.mp3", "sound/Chickencoop.mp3"];
                //var sound = sound_array[Math.floor(Math.random() * sound_array.length)];
                //var audio = new Audio(sound);
                //audio.play();
				var audio = new Audio('sound/correct.mp3');
                    audio.play();
					
					
                $("#dvmonkey").addClass("animatemonkey");
                $scope.btncheck = true;
                setTimeout(function () {
                    $("#dvmonkey").removeClass("animatemonkey"); //console.log("remove class");
                    

                    $scope.items.push({
                        name: $scope.myword.join('')
                    });
                    $scope.score = $scope.score + 10;                    
                }, 500);
                }
            else {
                
                //var sound_array1 = ["sound/Donkey.mp3", "sound/Monkey.mp3", "sound/Crow.mp3", "sound/Birdloon.mp3", "sound/Dogbark.mp3"];
                //var sound1 = sound_array1[Math.floor(Math.random() * sound_array1.length)];
                //var audio1 = new Audio(sound1);
                //audio1.play();
				var audio = new Audio('sound/wrong.mp3');
                    audio.play();
                //return sound;
            };
        };

        this.Next = function () {
            $scope.i = $scope.i + 1;
            this.displaynewword();

            $scope.btncheck = false;
        };
    });
})();