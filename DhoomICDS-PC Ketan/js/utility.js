var resId,startTime;

function getURLParameter(name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null
}

function passResId(pageName)
{
	resId = getURLParameter("resId");
	//console.log("resId from utility:"+pageName+"?resId="+resId);
	window.location.href = pageName+"?resId="+resId;
}

function passResIdWithLevel(pageName)
{
	resId = getURLParameter("resId");
	//console.log("resId from utility:"+pageName+"?resId="+resId);
	window.location.href = pageName+"&resId="+resId;
}

$(window).load(function(event) {

	var d=new Date();
	startTime=d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate()+" "+
	d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
	//console.log("start time ="+startTime);

	resId = getURLParameter("resId");
	//console.log(resId);
});