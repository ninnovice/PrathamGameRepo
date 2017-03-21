var Flip={};
Flip.randomImage=0;
Flip.TrackingFields={},


Flip.imageSet=
[	{
			"Image1": "Flip/images/abc1.jpeg",
	 		"Image2": "Flip/images/abc2.jpeg",
	 		"Image3": "Flip/images/abc3.jpeg",
	 		"Image4": "Flip/images/abc4.jpeg",
	 		"Image5": "Flip/images/abc5.jpeg",
	 		"Image6": "Flip/images/abc6.jpeg",
	 		"Image7": "Flip/images/abc7.jpeg",
	 		"Image8": "Flip/images/abc8.jpeg",
	 		"Image9": "Flip/images/abc9.jpeg",
	 		"fullImage":"Flip/images/abc.jpg"
	},
	{
			"Image1": "Flip/images/xyz1.jpeg",
	 		"Image2": "Flip/images/xyz2.jpeg",
	 		"Image3": "Flip/images/xyz3.jpeg",
	 		"Image4": "Flip/images/xyz4.jpeg",
	 		"Image5": "Flip/images/xyz5.jpeg",
	 		"Image6": "Flip/images/xyz6.jpeg",
	 		"Image7": "Flip/images/xyz7.jpeg",
	 		"Image8": "Flip/images/xyz8.jpeg",
	 		"Image9": "Flip/images/xyz9.jpeg",
	 		"fullImage":"Flip/images/leopard.jpg"
	},
	{
			"Image1": "Flip/images/img1.jpeg",
	 		"Image2": "Flip/images/img2.jpeg",
	 		"Image3": "Flip/images/img3.jpeg",
	 		"Image4": "Flip/images/img4.jpeg",
	 		"Image5": "Flip/images/img5.jpeg",
	 		"Image6": "Flip/images/img6.jpeg",
	 		"Image7": "Flip/images/img7.jpeg",
	 		"Image8": "Flip/images/img8.jpeg",
	 		"Image9": "Flip/images/img9.jpeg",
	 		"fullImage":"Flip/images/_MG_9694.jpg"
	},
	{
			"Image1": "Flip/images/Robin1.jpeg",
	 		"Image2": "Flip/images/Robin2.jpeg",
	 		"Image3": "Flip/images/Robin3.jpeg",
	 		"Image4": "Flip/images/Robin4.jpeg",
	 		"Image5": "Flip/images/Robin5.jpeg",
	 		"Image6": "Flip/images/Robin6.jpeg",
	 		"Image7": "Flip/images/Robin7.jpeg",
	 		"Image8": "Flip/images/Robin8.jpeg",
	 		"Image9": "Flip/images/Robin9.jpeg",
	 		"fullImage":"Flip/images/magpieRobin.jpg"
	},
	{
			"Image1": "Flip/images/Northern-Pintail_1.png",
	 		"Image2": "Flip/images/Northern-Pintail_2.png",
	 		"Image3": "Flip/images/Northern-Pintail_3.png",
	 		"Image4": "Flip/images/Northern-Pintail_4.png",
	 		"Image5": "Flip/images/Northern-Pintail_5.png",
	 		"Image6": "Flip/images/Northern-Pintail_6.png",
	 		"Image7": "Flip/images/Northern-Pintail_7.png",
	 		"Image8": "Flip/images/Northern-Pintail_8.png",
	 		"Image9": "Flip/images/Northern-Pintail_9.png",
	 		"fullImage":"Flip/images/NorthernPintail.jpg"
	},
	{
			"Image1": "Flip/images/Spotted-Redshank_1.png",
	 		"Image2": "Flip/images/Spotted-Redshank_2.png",
	 		"Image3": "Flip/images/Spotted-Redshank_3.png",
	 		"Image4": "Flip/images/Spotted-Redshank_4.png",
	 		"Image5": "Flip/images/Spotted-Redshank_5.png",
	 		"Image6": "Flip/images/Spotted-Redshank_6.png",
	 		"Image7": "Flip/images/Spotted-Redshank_7.png",
	 		"Image8": "Flip/images/Spotted-Redshank_8.png",
	 		"Image9": "Flip/images/Spotted-Redshank_9.png",
	 		"fullImage":"Flip/images/SpottedRedshank.JPG"
	},
	{
			"Image1": "Flip/images/Northern-Shoveler_1.png",
	 		"Image2": "Flip/images/Northern-Shoveler_2.png",
	 		"Image3": "Flip/images/Northern-Shoveler_3.png",
	 		"Image4": "Flip/images/Northern-Shoveler_4.png",
	 		"Image5": "Flip/images/Northern-Shoveler_5.png",
	 		"Image6": "Flip/images/Northern-Shoveler_6.png",
	 		"Image7": "Flip/images/Northern-Shoveler_7.png",
	 		"Image8": "Flip/images/Northern-Shoveler_8.png",
	 		"Image9": "Flip/images/Northern-Shoveler_9.png",
	 		"fullImage":"Flip/images/NorthernShoveler.jpg"
	},
	{
			"Image1": "Flip/images/Gadwall_1.png",
	 		"Image2": "Flip/images/Gadwall_2.png",
	 		"Image3": "Flip/images/Gadwall_3.png",
	 		"Image4": "Flip/images/Gadwall_4.png",
	 		"Image5": "Flip/images/Gadwall_5.png",
	 		"Image6": "Flip/images/Gadwall_6.png",
	 		"Image7": "Flip/images/Gadwall_7.png",
	 		"Image8": "Flip/images/Gadwall_8.png",
	 		"Image9": "Flip/images/Gadwall_9.png",
	 		"fullImage":"Flip/images/Gadwall.jpg"
	},
	{
			"Image1": "Flip/images/Bluethroat_1.png",
	 		"Image2": "Flip/images/Bluethroat_2.png",
	 		"Image3": "Flip/images/Bluethroat_3.png",
	 		"Image4": "Flip/images/Bluethroat_4.png",
	 		"Image5": "Flip/images/Bluethroat_5.png",
	 		"Image6": "Flip/images/Bluethroat_6.png",
	 		"Image7": "Flip/images/Bluethroat_7.png",
	 		"Image8": "Flip/images/Bluethroat_8.png",
	 		"Image9": "Flip/images/Bluethroat_9.png",
	 		"fullImage":"Flip/images/Bluethroat.jpg"
	},
	{
			"Image1": "Flip/images/egret1.jpeg",
	 		"Image2": "Flip/images/egret2.jpeg",
	 		"Image3": "Flip/images/egret3.jpeg",
	 		"Image4": "Flip/images/egret4.jpeg",
	 		"Image5": "Flip/images/egret5.jpeg",
	 		"Image6": "Flip/images/egret6.jpeg",
	 		"Image7": "Flip/images/egret7.jpeg",
	 		"Image8": "Flip/images/egret8.jpeg",
	 		"Image9": "Flip/images/egret9.jpeg",
	 		"fullImage":"Flip/images/egret.jpg"
	},
	{
			"Image1": "Flip/images/bison1.jpeg",
	 		"Image2": "Flip/images/bison2.jpeg",
	 		"Image3": "Flip/images/bison3.jpeg",
	 		"Image4": "Flip/images/bison4.jpeg",
	 		"Image5": "Flip/images/bison5.jpeg",
	 		"Image6": "Flip/images/bison6.jpeg",
	 		"Image7": "Flip/images/bison7.jpeg",
	 		"Image8": "Flip/images/bison8.jpeg",
	 		"Image9": "Flip/images/bison9.jpeg",
	 		"fullImage":"Flip/images/indianbison.jpg"
	},
	{
			"Image1": "Flip/images/wagtail1.png",
	 		"Image2": "Flip/images/wagtail2.png",
	 		"Image3": "Flip/images/wagtail3.png",
	 		"Image4": "Flip/images/wagtail4.png",
	 		"Image5": "Flip/images/wagtail5.png",
	 		"Image6": "Flip/images/wagtail6.png",
	 		"Image7": "Flip/images/wagtail7.png",
	 		"Image8": "Flip/images/wagtail8.png",
	 		"Image9": "Flip/images/wagtail9.png",
	 		"fullImage":"Flip/images/EasternYellowWagtail.jpg"
	},
	{
			"Image1": "Flip/images/Cuckoos_1.png",
	 		"Image2": "Flip/images/Cuckoos_2.png",
	 		"Image3": "Flip/images/Cuckoos_3.png",
	 		"Image4": "Flip/images/Cuckoos_4.png",
	 		"Image5": "Flip/images/Cuckoos_5.png",
	 		"Image6": "Flip/images/Cuckoos_6.png",
	 		"Image7": "Flip/images/Cuckoos_7.png",
	 		"Image8": "Flip/images/Cuckoos_8.png",
	 		"Image9": "Flip/images/Cuckoos_9.png",
	 		"fullImage":"Flip/images/Cuckoos.jpg"
	},
	{
			"Image1": "Flip/images/Wood-Sandpiper_1.png",
	 		"Image2": "Flip/images/Wood-Sandpiper_2.png",
	 		"Image3": "Flip/images/Wood-Sandpiper_3.png",
	 		"Image4": "Flip/images/Wood-Sandpiper_4.png",
	 		"Image5": "Flip/images/Wood-Sandpiper_5.png",
	 		"Image6": "Flip/images/Wood-Sandpiper_6.png",
	 		"Image7": "Flip/images/Wood-Sandpiper_7.png",
	 		"Image8": "Flip/images/Wood-Sandpiper_8.png",
	 		"Image9": "Flip/images/Wood-Sandpiper_9.png",
	 		"fullImage":"Flip/images/WoodSandpiper.jpg"
	},
	{
			"Image1": "Flip/images/Black-winged-Stilt_1.png",
	 		"Image2": "Flip/images/Black-winged-Stilt_2.png",
	 		"Image3": "Flip/images/Black-winged-Stilt_3.png",
	 		"Image4": "Flip/images/Black-winged-Stilt_4.png",
	 		"Image5": "Flip/images/Black-winged-Stilt_5.png",
	 		"Image6": "Flip/images/Black-winged-Stilt_6.png",
	 		"Image7": "Flip/images/Black-winged-Stilt_7.png",
	 		"Image8": "Flip/images/Black-winged-Stilt_8.png",
	 		"Image9": "Flip/images/Black-winged-Stilt_9.png",
	 		"fullImage":"Flip/images/BlackwingedStilt.jpg"
	},
	{
			"Image1": "Flip/images/koel1.jpeg",
	 		"Image2": "Flip/images/koel2.jpeg",
	 		"Image3": "Flip/images/koel3.jpeg",
	 		"Image4": "Flip/images/koel4.jpeg",
	 		"Image5": "Flip/images/koel5.jpeg",
	 		"Image6": "Flip/images/koel6.jpeg",
	 		"Image7": "Flip/images/koel7.jpeg",
	 		"Image8": "Flip/images/koel8.jpeg",
	 		"Image9": "Flip/images/koel9.jpeg",
	 		"fullImage":"Flip/images/AsianKoel.jpg"
	},
	{
			"Image1": "Flip/images/pqr1.jpeg",
	 		"Image2": "Flip/images/pqr2.jpeg",
	 		"Image3": "Flip/images/pqr3.jpeg",
	 		"Image4": "Flip/images/pqr4.jpeg",
	 		"Image5": "Flip/images/pqr5.jpeg",
	 		"Image6": "Flip/images/pqr6.jpeg",
	 		"Image7": "Flip/images/pqr7.jpeg",
	 		"Image8": "Flip/images/pqr8.jpeg",
	 		"Image9": "Flip/images/pqr9.jpeg",
	 		"fullImage":"Flip/images/192.jpg"
	},
	{
			"Image1": "Flip/images/wigeon1.png",
	 		"Image2": "Flip/images/wigeon2.png",
	 		"Image3": "Flip/images/wigeon3.png",
	 		"Image4": "Flip/images/wigeon4.png",
	 		"Image5": "Flip/images/wigeon5.png",
	 		"Image6": "Flip/images/wigeon6.png",
	 		"Image7": "Flip/images/wigeon7.png",
	 		"Image8": "Flip/images/wigeon8.png",
	 		"Image9": "Flip/images/wigeon9.png",
	 		"fullImage":"Flip/images/EurasianWigeon.jpg"
	},
	{
			"Image1": "Flip/images/Common-Teal_1.png",
	 		"Image2": "Flip/images/Common-Teal_2.png",
	 		"Image3": "Flip/images/Common-Teal_3.png",
	 		"Image4": "Flip/images/Common-Teal_4.png",
	 		"Image5": "Flip/images/Common-Teal_5.png",
	 		"Image6": "Flip/images/Common-Teal_6.png",
	 		"Image7": "Flip/images/Common-Teal_7.png",
	 		"Image8": "Flip/images/Common-Teal_8.png",
	 		"Image9": "Flip/images/Common-Teal_9.png",
	 		"fullImage":"Flip/images/CommonTeal.jpg"
	}
]