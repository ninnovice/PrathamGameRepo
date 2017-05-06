
function searchStringInArray (str, strArray, str2) 
{
	GaltiMaaf.temparray[0]=0;
    for (var j=0; j<strArray.length; j++) 
    {
        if ( (strArray[j].indexOf(str)!==-1 ) || (strArray[j].indexOf(str2)!==-1) ) 
        	GaltiMaaf.temparray.push(j+1);
    }
    return -1;
}

function shuffleWords(array)
{
  var i = 0, j = 0, temp = 0;
  for (i = array.length - 1; i > 0; i--) 
  {
    j = Math.floor(Math.random() * (i + 1));
    temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
};