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
        
        $scope.currentlist = [];
        $scope.currentlist = wlist1.slice(0);
        $scope.currentlist = shuffleArray($scope.currentlist).slice(0,10);
        $scope.i = 0;       

        $scope.displaynewword = function () {
            if($scope.i<10){
            $scope.myword = $scope.currentlist[$scope.i].MyWords.slice(0);
            $scope.randomword = shuffleArray($scope.myword);
            $scope.myword = $scope.currentlist[$scope.i].MyWords.slice(0);
            while (arraysEqual($scope.randomword, $scope.currentlist[$scope.i].MyWords)) {
                $scope.randomword = shuffleArray($scope.randomword);
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
        $scope.displaynewword();

        $scope.items = [];
        $scope.score = 0;

        $scope.playAgain = function () {
            $scope.btncheck = false;
            $scope.dvheader = false;
            $scope.dvgame = false;
            $scope.dvcontrol = false;
            $scope.dvplayagain = false;
            $scope.score = 0;
            $scope.maxsec = 120;
            $scope.items = [];
            $scope.currentlist = [];
            $scope.currentlist = wlist1.slice(0);
            $scope.currentlist = shuffleArray($scope.currentlist).slice(0, 10);
            $scope.i = 0;

            $scope.displaynewword = function () {
                if ($scope.i < 10) {
                    $scope.myword = $scope.currentlist[$scope.i].MyWords.slice(0);
                    $scope.randomword = shuffleArray($scope.myword);
                    $scope.myword = $scope.currentlist[$scope.i].MyWords.slice(0);
                    while (arraysEqual($scope.randomword, $scope.currentlist[$scope.i].MyWords)) {
                        $scope.randomword = shuffleArray($scope.randomword);
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
            $scope.displaynewword();
        }

        $scope.Check = function () {
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
					
                    $scope.dvcontrol = true;

                $("#dvmonkey").addClass("animatemonkey");
                $scope.btncheck = true;
                setTimeout(function () {
                    $("#dvmonkey").removeClass("animatemonkey"); //console.log("remove class");
                    

                    $scope.items.push({
                        name: $scope.myword.join('')
                    });
                    $scope.score = $scope.score + 10;
                    $scope.dvcontrol = false;
                    $scope.btncheck = false;
                    
                    $scope.Next();

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

        $scope.Next = function () {
            $scope.i = $scope.i + 1;
            $scope.displaynewword();
            $scope.btncheck = false;
        };

    });
})();