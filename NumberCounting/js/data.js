var jsonData={
	playButtonName:"खेलें",
	gamePageImage:"img/gamepage.jpg",
	levelPageImage:"img/levelPage.png",
	submitButtonName:"Check",
	levelOneName:"स्तर 1",
	levelTwoName:"स्तर 2",
	
}


var Categories = [
	
	{
		// Girl-Icecream
		"categoryId":1,
		"Normal_Character":"img/Girl_Normal.gif",
		"Happy_Character":"img/Girl_Happy.gif",
		"Angry_Character":"img/Girl_Angry.gif",
     	"gifForMinus":"img/Girl_Normal.gif",
		"ObjectToGive":"img/ice-cream.png",
		"GiveObjectFrom":"img/Fridge.png",
		"GiveObjectIn":"img/Cart.png",
		"happysound":"sound/correct.mp3",
     	"wrongSound":"sound/Tryagain1.mp3",
		"LevelOneQuestions":{
			"QuestionText":"लडकी को आइस क्रीम दो :",
			"QuestionSound":"sound/Girl/GirlIcecreamQ1.mp3"
		},	
		"LevelTwoQuestions":{
			"msg1":"लड़की के पास आइस क्रीम हैं:",
			"msg1sound":"sound/Girl/Girl1.mp3",
	    	"msg2":"मैंने उसको आइस क्रीम दी : ",
	    	"msg2sound":"sound/Girl/Girl2A.mp3",
			"msg3":"उसने मुझे आइस क्रीम दी : ",
	    	"msg3sound":"sound/Girl/Girl2S.mp3",
			"msg4":"अब उसके पास कितनी आइस क्रीम हैं ?",
			"msg4sound":"sound/Girl/Girl3.mp3"
		}
	},
	{
		// Elephant--Grass
		"categoryId":2,
		"Normal_Character":"img/Elephant-Normal.gif",
		"Happy_Character":"img/Elephant-happy.gif",
   		"Angry_Character":"img/Elephant-Angry.gif",
        "gifForMinus":"img/Elephant-Eating.gif",
		"ObjectToGive":"img/Grass.png",
		"GiveObjectFrom":"img/truck.png",
		"GiveObjectIn":"img/GrassCart.png",
		"happysound":"sound/correct.mp3",
     	"wrongSound":"sound/Tryagain2.mp3",
     	"LevelOneQuestions":{
			"QuestionText":"हाथी को घास के गट्ठर दो :",
			"QuestionSound":"sound/Elephant/ELEPHANTGRASSQ1.mp3"
		},
		"LevelTwoQuestions":{
			"msg1":"हाथी के पास घास के गट्ठर हैं  :",
			"msg1sound":"sound/Elephant/elephant1.mp3",
	    	"msg2":"मैंने उसको घास के गट्ठर दिए: ",
	    	"msg2sound":"sound/Elephant/elephant2A.mp3",
	    	"msg3":"उसने खा लिए : ",
	    	"msg3sound":"sound/Elephant/elephant2S.mp3",	
			"msg4":"अब उसके पास घास के कितने गट्ठर हैं ?",
			"msg4sound":"sound/Elephant/elephant3.mp3"
		}			
	},
	{
		// Monkey--Banana
		"categoryId":3,
		"Normal_Character":"img/Monkey_Normal.gif",
		"Happy_Character":"img/Monkey_Happy.gif",
		"Angry_Character":"img/Monkey_Angry.gif",
     	"gifForMinus":"img/Monkey_Eating.gif",	
		"ObjectToGive":"img/banana.png",
		"GiveObjectFrom":"img/Fridge.png",
		"GiveObjectIn":"img/GrassCart.png",
		"happysound":"sound/correct.mp3",
     	"wrongSound":"sound/Tryagain1.mp3",
		"LevelOneQuestions":{
			"QuestionText":"बंदर को केले दो :",
			"QuestionSound":"sound/Monkey/MONKEYBANANAQ1.mp3"
		},
		"LevelTwoQuestions":{
			"msg1":"बंदर के पास केले है  :",
			"msg1sound":"sound/Monkey/Monkey1.mp3",
	    	"msg2":"मैंने उसको केले दिए :",
	    	"msg2sound":"sound/Monkey/Monkey2A.mp3",
			"msg3":"उसने खा लिए : ",
	    	"msg3sound":"sound/Monkey/Monkey2S.mp3",
			"msg4":"अब उसके पास कितने केले है ?",
			"msg4sound":"sound/Monkey/Monkey3.mp3"
		}
	},
	{
		// rabbit--carrot
		"categoryId":4,
		"Normal_Character":"img/Rabbit-normal.gif",
		"Happy_Character":"img/Rabbit-Happy.gif",
		"Angry_Character":"img/Rabbit-Sad.gif",
     	"gifForMinus":"img/Rabbit_Eating.gif",	
		"ObjectToGive":"img/carrot.png",
		"GiveObjectFrom":"img/Basket.png",
		"GiveObjectIn":"img/GrassCart.png",
		"happysound":"sound/correct.mp3",
     	"wrongSound":"sound/Tryagain2.mp3",	
		"LevelOneQuestions":{
			"QuestionText":"खरगोश को गाजर दो :",
			"QuestionSound":"sound/Rabbit/RabbitcarrotQ1.mp3"
		},
		"LevelTwoQuestions":{
			"msg1":"खरगोश के पास गाजर हैं :",
			"msg1sound":"sound/Rabbit/Rabbit1.mp3",
	    	"msg2":"मैंने उसको गाजर दी ",
	   		"msg2sound":"sound/Rabbit/Rabbit2A.mp3",
	   		"msg3":"उसने खा लिए : ",
	    	"msg3sound":"sound/Rabbit/Rabbit2S.mp3",	
			"msg4":"अब उसके पास कितनी गाजर है ? ",
			"msg4sound":"sound/Rabbit/Rabbit3.mp3"
		}
	},
	{
		// Cat--Fish
		"categoryId":5,
		"Normal_Character":"img/Cat_Normal.png",
		"Happy_Character":"img/Cat_Normal.png",
		"Angry_Character":"img/Cat_Normal.png",
     	"gifForMinus":"img/Cat_Normal.png",	
		"ObjectToGive":"img/Fish.png",
		"GiveObjectFrom":"img/Basket.png",
		"GiveObjectIn":"img/GrassCart.png",
		"happysound":"sound/correct.mp3",
     	"wrongSound":"sound/Tryagain2.mp3",
		"LevelOneQuestions":{
			"QuestionText":"बिल्ली को मछली दो :",
			"QuestionSound":"sound/Cat/CatfishQ1.mp3"
		},
		"LevelTwoQuestions":{
			"msg1":"बिल्ली के पास मछली हैं :",
			"msg1sound":"sound/Cat/Cat1.mp3",
	    	"msg2":"मैंने उसे मछली दी :",
	    	"msg2sound":"sound/Cat/Cat2A.mp3",
			"msg3":"उसने खा ली : ",
	   		"msg3sound":"sound/Cat/Cat2S.mp3",
			"msg4":"अब बिल्ली के पास कितनी मछली हैं ? ",
			"msg4sound":"sound/Cat/Cat3.mp3"
		}
	},
	{
		// Mother--Rose
		"categoryId":6,
		"Normal_Character":"img/Mother-Normal.gif",
		"Happy_Character":"img/Mother-Happy.gif",
   		"Angry_Character":"img/Mother-Angry.gif",
        "gifForMinus":"img/Mother-Normal.gif",
		"ObjectToGive":"img/Rose.png",
		"GiveObjectFrom":"img/Basket.png",
		"GiveObjectIn":"img/GrassCart.png",
		"happysound":"sound/correct.mp3",
     	"wrongSound":"sound/Tryagain2.mp3",
     	"LevelOneQuestions":{
			"QuestionText":"माँ को फूल  दो :",
			"QuestionSound":"sound/Mother/Motherq1.mp3"
		},
		"LevelTwoQuestions":{
			"msg1":"माँ के पास फूल हैं   :",
			"msg1sound":"sound/Mother/Mother1.mp3",
	    	"msg2":"मैंने उनको फूल दिए : ",
	    	"msg2sound":"sound/Mother/Mother2A.mp3",
	    	"msg3":"उन्होंने मुझे फूल दिए : ",
	    	"msg3sound":"sound/Mother/Mother2S.mp3",	
			"msg4":"अब उनके पास कितने फूल हैं  ?",
			"msg4sound":"sound/Mother/Mother3.mp3"
		}			
	},
	{
		// Grandmother--Apple
		"categoryId":7,
		"Normal_Character":"img/Grandma_normal.gif",
		"Happy_Character":"img/Grandma_happy.gif",
   		"Angry_Character":"img/Grandma_angry.gif",
        "gifForMinus":"img/Grandma_normal.gif",
		"ObjectToGive":"img/Apple.png",
		"GiveObjectFrom":"img/Basket.png",
		"GiveObjectIn":"img/GrassCart.png",
		"happysound":"sound/correct.mp3",
     	"wrongSound":"sound/Tryagain2.mp3",
     	"LevelOneQuestions":{
			"QuestionText":"नानी को सेब दो  :",
			"QuestionSound":"sound/Grandma/Grandmaq1.mp3"
		},
		"LevelTwoQuestions":{
			"msg1":"नानी के पास सेब हैं    :",
			"msg1sound":"sound/Grandma/Grandma1.mp3",
	    	"msg2":"मैंने उनको सेब दिए : ",
	    	"msg2sound":"sound/Grandma/Grandma2A.mp3",
	    	"msg3":"उन्होंने मुझे सेब दिए  : ",
	    	"msg3sound":"sound/Grandma/Grandma2S.mp3",	
			"msg4":"अब उसके पास कितने सेब हैं  ?",
			"msg4sound":"sound/Grandma/Grandma3.mp3"
		}			
	}
	
];


