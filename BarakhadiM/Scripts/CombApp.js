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




    //create module
    var cmbapp = angular.module('CombApp', ['ngDraggable']);
	


	  
    //create controller
    cmbapp.controller('CombController', function ($scope, $interval) {
        //for first div data //
        t = this;
		var wordstack=[];
		this.curword={};
        this.screen = "screen-2";
        
        this.allwords = [];
        this.allwords = wlist[0].AllWords;
        this.mainword = wlist[0].PrimaryWords[Math.floor(Math.random() * wlist[0].PrimaryWords.length)];
        this.mainwordlength = 0;

        this.word = this.mainword.word;
        $scope.words = this.mainword.words.slice();
        
        $scope.joker = "normal";
        $scope.gamescreen = "game";

        this.mainword.WordBank=shuffleArray(this.mainword.WordBank);
        
        this.wordbank = [];

        //this.word2 = "";

        this.points = 0;


        this.overallpoints = 0;
        this.pointlist = [];

        this.ReturnPoint = function (l) {
            var val = 0;
            for (var i = 0; i < this.allwords.length; i++) {
                if (this.allwords[i].letter === l) {
                    val = this.allwords[i].letterpoint;
                }
            }
            return val;
        }

        $.each($scope.words, function (index, value) {
            t.points = t.points +  t.ReturnPoint(value);
        });

        

        $scope.onDrop = function (target, source) {
            //.words[target] = $scope.words[target] + source;
            //$scope.words[target] = $scope.words[target][0].concat(source);
			
			 if (source == "ं" || source == "ः")
                $scope.words[target] = $scope.words[target].concat(source);
            else
                $scope.words[target] = $scope.words[target][0].concat(source);
            
            t.points = t.points + t.ReturnPoint(source);
            console.log("dropped " + source + " on " + target + "words" + $scope.words[target] + "source" + source);
			
			$scope.PushToStack();

        };
				$scope.TestPush=function(a){
					alert("hi");
					
				};
				
				
		$scope.PushToStack=function(){
			curword={};
			var order=0;
			var val = "";
            $("#sortable li").each(function () {
                val += $(this).find("span").html();
				
				if(this.id=="li0")
				{
					curword.li0=$(this).find("span").html();
					curword.li0pos=order;
				}
				if(this.id=="li1")
				{
					curword.li1=$(this).find("span").html();
					curword.li1pos=order;
				}
				if(this.id=="li2")
				{
					curword.li2=$(this).find("span").html();
					curword.li2pos=order;
				}
				order=order+1;
            });
			console.log(curword);
			wordstack.push(curword);
			
			console.log(wordstack);
		};
		
        $scope.dropValidate = function (target, source) {
            return target !== source;
        };

        this.ClearWord2 = function () {
            this.word2 = "";
            this.answer = "";
            this.mainwordlength = 0;
            this.points = 0;

            $scope.words = [];
            $scope.words = this.mainword.words.slice();

            $.each($scope.words, function (index, value) {
                t.points = t.points + t.ReturnPoint(value);
            });
            console.log(this.mainword.words);
        };
		
        this.UndoWord = function () {
            this.word2 = "";
            this.answer = "";
            this.mainwordlength = 0;
            this.points = 0;
			
			console.log(wordstack.length);

			if(wordstack.length>0)
			{$scope.words = [];
				curword = wordstack.pop();
				
				console.log(curword);
				
				$scope.words.push(curword.li0);
				$scope.words.push(curword.li1);
				if(curword.li2!="")
					$scope.words.push(curword.li2);
							
				$.each($scope.words, function (index, value) {
					t.points = t.points + t.ReturnPoint(value);
				});		
			}
			
        };
		
		this.changeword = function () {
			wordstack=[];
			this.curword={};
            	
		    this.mainword = wlist[0].PrimaryWords[Math.floor(Math.random() * wlist[0].PrimaryWords.length)];
		    this.word = this.mainword.word;
		    $scope.words = this.mainword.words.slice();
		    this.points = 0;

		    $.each($scope.words, function (index, value) {
		        t.points = t.points + t.ReturnPoint(value);
		    });

		    this.RightWord1();
        }
		
        //for screen change //
        this.Screen2 = function () {
        this.screen = "screen-2";
        };

        this.Screen1 = function () {
        this.screen = "screen-1";
        };

        this.BasicWord = wlist[0].BasicWord;
        this.UkarWords = wlist[0].UkarWords;



        this.playAgain = function () {
            $scope.StopTimer();
            $scope.joker = "normal";
            $scope.gamescreen = "game";
            this.points = 0;
            this.overallpoints = 0;
            $scope.StartTimer();
            this.pointlist = [];
            this.changeword();
        }

        this.Check = function () {
            var val = "";
            $("#sortable li").each(function () {
				console.log(this.id);
                val += $(this).find("span").html();
            });
            console.log(val+"ooooo");
            this.RightWord(val);         
        };


        this.RightWord1 = function () {
            var a = "";
            $.each($scope.words, function (index, value) {
                a= a+ value;
            });

            if (this.mainword.WordBank.indexOf(a) > -1) {
                if (this.wordbank.indexOf(a) == -1 || this.wordbank.length == 0) {
                    console.log("RightWord found" + a);
                    this.wordbank.push(a);
                    this.pointlist.push({ "word": a, "points": this.points });
                    this.overallpoints = this.overallpoints + this.points;                   
                }

            }
        }

        this.RightWord = function (a) {
            if (this.mainword.WordBank.indexOf(a) > -1) {
                if (this.wordbank.indexOf(a) == -1 || this.wordbank.length == 0) {
                    console.log("RightWord found" + a);
                    this.wordbank.push(a);
                        this.pointlist.push({ "word": a, "points": this.points });
                        this.overallpoints = this.overallpoints + this.points;
                        $scope.joker = "right";
                        var sound_array1 = ["Content/Sound/correct1.mp3", "Content/Sound/correct2.mp3"];
                        var sound1 = sound_array1[Math.floor(Math.random() * sound_array1.length)];
                        var audio1 = new Audio(sound1);
                        audio1.play();

                }
                else {
                    $scope.joker = "error";
                    var sound_array = ["Content/Sound/wrong1.mp3", "Content/Sound/wrong2.mp3"];
                    var sound = sound_array[Math.floor(Math.random() * sound_array.length)];
                    var audio = new Audio(sound);
                    audio.play();
                    //alert('data already exist');
                }
                //this.ClearWord2();
            }
            else {
                $scope.joker = "error";
                var sound_array = ["Content/Sound/wrong1.mp3", "Content/Sound/wrong2.mp3"];
                var sound = sound_array[Math.floor(Math.random() * sound_array.length)];
                var audio = new Audio(sound);
                audio.play();
                //alert("false");
            }

            setTimeout(function () { $scope.joker = "normal"; }, 1000);

        }

        this.RightWord1();

        //Timer start function.
        $scope.StartTimer = function () {
            $scope.colornum = 0;
            //Set the Timer start message.
            $scope.Message = "Timer started. ";
            //$scope.maxsec = 180;
            $scope.maxsec = 180;
            $scope.animationstate = 1;
            //Initialize the Timer to run every 1000 milliseconds i.e. one second.
            $scope.Timer = $interval(function () {

                if ($scope.maxsec == 0) {
                    $scope.gamescreen = "score";

                    //alert("Timer Stopped");
                    //$scope.displayScore();
                }
                else {
                    $scope.maxsec = $scope.maxsec - 1;
                }
                //Display the current time.
                $scope.Message = "Timer Ticked. " + $scope.maxsec;
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

        $scope.pad = function (num, size) {
            var s = num + "";
            while (s.length < size) s = "0" + s;
            return s;
        };
        $scope.StartTimer();

    });




})();