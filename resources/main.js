window.onload=function(){
	if (!detectMobile()){
		document.getElementById("content-container").innerHTML="<div class='content h-center'><h2>Please disable JavaScript to view this website</h2></div>";
		if ("interestCohort" in document){
			document.getElementById("content-container").innerHTML+="<div class='content h-center'><h2>Also you've been <a href='https://amifloced.org/'>FLoCed</a>. Might be time to <a href='https://www.mozilla.org/en-US/firefox/new/'>switch browsers</a></h2></div>";
		}
	}
};
function detectMobile(){
	// Stolen from https://stackoverflow.com/a/11381730/10720231
	// Mobile browsers don't tend to allow you to disable JavaScript, which is stupid
	// Well at least on iOS, because Apple thinks powerusers are bad
	return 	/Android|iP[ao]d|BlackBerry|Phone/i.test(navigator.userAgent);
}
