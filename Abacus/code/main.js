var abacus={};
var Utils ={};
$(document).ready(function()
{
//  Android.getPath("NumberCounting");
  Utils.Path='';
  setTimeout(function(){
    audioTag = new Audio();
    $('#levelPage').show();
    $('#levelOnePage,#levelTwoPage').hide();   
  },10);
});

abacus.showBeads=function(columnNo){
  $('#column'+columnNo+'>.BeadsImages').toggle();
  $('#column'+columnNo+'>.BeadForRoundup').hide();

 if(columnNo==10){
  setTimeout(function(){
     $('#column'+columnNo+'>.BeadsImages').hide();
     $('#column'+columnNo+'>.BeadForRoundup').show();

  },2000);
 } 
}

abacus.createAbacusTemplate=function(startNo,endNo){
  var abacusTemplate='';
  var abacusNumber=startNo;
  $('#levelOnePage').show();
  $('#levelPage,#levelTwoPage').hide();
  for(i=1;i<=10;i++){
    abacusTemplate+='<div id=column'+i+' class="column col-lg-1 col-md-1 col-sm-1 col-xs-1" >'+
                        '<div class="abacusNumber row" onclick="abacus.showBeads('+i+');">'+abacusNumber+'</div>';
    for(j=1;j<=i&&j<=5;j++){
      if(i>5&&(i-j)>=5)
        abacusTemplate+='<div class="BeadsImages row">'+
                           '<img class="circleFor1 " src="img/circleFor'+startNo+'.png">'+
                           '<img class="circleFor1 " src="img/circleFor'+startNo+'.png">'+
                        '</div>';
      else
        abacusTemplate+='<div class="BeadsImages row">'+
                           '<img class="circleFor1 " src="img/circleFor'+startNo+'.png">'+
                        '</div>';
    }
    if(i==10)
      abacusTemplate+='<div class="row BeadForRoundup">'+
                           '<img class="circleFor1 " src="img/circleFor'+(startNo*10)+'.png">'+
                        '</div>';
    abacusTemplate+='</div>';   
    abacusNumber+=startNo;      
  }
  $('#abacus').append(abacusTemplate);
  $('.column >.BeadsImages').hide();
 $('.column >.BeadForRoundup').hide();

}