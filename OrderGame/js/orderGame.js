function playSoundnew(filepath) {
    var numAudio = "#gameSound";
    //$(numAudio).prop("src", Utils.Path + filepath);
    $(numAudio).attr("src", filepath);
    $(numAudio).trigger('play');
}

var correctCards = 0;
var level = 0;
var maxboogies = 5;

//$(init);

$('#startdv').show();
$('#numbers').hide();
$('#shapesc').hide();
$('#content').hide();
$('#orderlevel').hide();

// Hide the success message
$('#checkMessage').hide();
$('#successMessage').hide();
$('#successMessage').css({
});



function init() {

        // Reset the game
        correctCards = 0;
        $('#cardPile').html('');
        $('#cardSlots').html('');

        // Create the pile of shuffled cards

        console.log(orderGame[level].Wlist);

        var WlistD = orderGame[level].Wlist;
        
        console.log(maxboogies);
        //var maxboogies = 5;
        var numbers = [1, 2, 3, 4, 5];

        for (var i = 0; i < maxboogies; i++) {
            $('<div>' + WlistD[i].ID + '</div>').data('number', WlistD[i].ID).appendTo('#cardSlots').droppable({
                accept: '#cardPile div',
                hoverClass: 'hovered',
                drop: handleCardDrop
            });
        }

        WlistD.sort(function () { return Math.random() - .5 });

        for (var i = 0; i < maxboogies; i++) {
            $('<div style="background-image:url(image/' + WlistD[i].ImgUrl + ');"></div>').data('number', WlistD[i].ID).attr('id', 'card' + WlistD[i].ID).appendTo('#cardPile').draggable({
                containment: '#content',
                stack: '#cardPile div',
                cursor: 'move',
                revert: true
            });
        }
   

}

    // Create the card slots


$("#btn1to5").click(function () {
    $('#numbers').hide();
    $('#shapesc').hide();
    $('#startdv').hide();
    $('#orderlevel').hide();
    $('#content').show();

    level = 0;
    init();
});

$("#btn5to1").click(function () {
    $('#numbers').hide();
    $('#shapesc').hide();
    $('#startdv').hide();
    $('#orderlevel').hide();
    $('#content').show();

    level = 0;
    init();
});

$("#btn6to10").click(function () {
    $('#numbers').hide();
    $('#shapesc').hide();
    $('#startdv').hide();
    $('#orderlevel').hide();
    $('#content').show();

    level = 1;
    init();
});
$("#btn10to6").click(function () {
    $('#numbers').hide();
    $('#shapesc').hide();
    $('#startdv').hide();
    $('#orderlevel').hide();
    $('#content').show();

    level = 0;
    init();
});

$("#btn11to15").click(function () {
    $('#numbers').hide();
    $('#shapesc').hide();
    $('#startdv').hide();
    $('#orderlevel').hide();
    $('#content').show();

    level = 3;
    init();
});

$("#btn15to11").click(function () {
    $('#numbers').hide();
    $('#shapesc').hide();
    $('#startdv').hide();
    $('#orderlevel').hide();
    $('#content').show();

    level = 0;
    init();
});

$("#btn16to20").click(function () {
    $('#numbers').hide();
    $('#shapesc').hide();
    $('#startdv').hide();
    $('#orderlevel').hide();
    $('#content').show();

    level = 4;
    init();
});

$("#btn20to15").click(function () {
    $('#numbers').hide();
    $('#shapesc').hide();
    $('#startdv').hide();
    $('#orderlevel').hide();
    $('#content').show();

    level = 0;
    init();
});

$("#btnstart").click(function () {
    $('#numbers').show();
    $('#shapesc').show();
    $('#startdv').hide();
    $('#content').hide();
    $('#orderlevel').hide();
});

$("#btnnum").click(function () {
    $('#numbers').hide();
    $('#shapesc').hide();
    $('#startdv').hide();
    $('#content').hide();
    $('#orderlevel').show();
    
});


$("#btncheck").click(function () {
    //if (correctCards == 5) {
    //    $('#btncheck').show();
    //}
  
    var answer = 1;
    $(".wrong").each(function () {
        answer = 0;
        $(this).draggable('enable');
    });
    if (answer == 1) {
        //alert("Corrent");
        playSoundnew("sound/correct.mp3");
        $('#correct').show();
        $('#wrong').hide();
        init();
    }
    else {
        //alert("Wrong");
        playSoundnew("sound/wrong.mp3");
        init();
        $('#wrong').show();
        $('#correct').hide();
    }
    //console.log('test');
    $('#successMessage').show();
    $('#engine').hide();
    $('#cardPile').hide();
    $('#cardSlots').hide();
    $('#checkMessage').hide();
   
});

$("#btnplayagain").click(function () {
    $('#engine').show();
    $('#cardPile').show();
    $('#cardSlots').show();
    $('#successMessage').hide();
});

function handleCardDrop(event, ui) {
    var slotNumber = $(this).data('number');
    var cardNumber = ui.draggable.data('number');
    $(this).removeClass('correct');
    $(this).removeClass('wrong');
    if (slotNumber == cardNumber)
        $(this).addClass('correct');
    else
        $(this).addClass('wrong');

    //ui.draggable.addClass('correct');
   // ui.draggable.draggable('disable');
    //$(this).droppable('disable');
    ui.draggable.position({ of: $(this), my: 'left top', at: 'left top' });
    ui.draggable.draggable('option', 'revert', false);
    correctCards++;
    if (correctCards == 5) {
        $('#checkMessage').show();
    }
   
}