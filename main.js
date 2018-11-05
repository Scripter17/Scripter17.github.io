// Normally, when you press [tab] when a link in the sidebar is active, the window scrolls to the top. (It's a bug with position:sticky)
// This script prevents that, albeit with a bit of spaghetti.
window.onkeydown=function(e){
	var ofsYPre, // How far down the screen is scrolled before the active element scrolls into view
		id, // The id of the active element's Great Grandparent
		ua; // userAgent
	// https://jsfiddle.net/alvaroAV/svvz7tkn/
	ua=navigator.userAgent;
	if (e.keyCode==9 && !(ua.indexOf("MSIE ")>-1 || ua.indexOf("Trident/")>-1)){ // keyCode 9 is [tab]
		// position:sticky isn't supported in IE, so this isn't run in it
		ofsYPre=window.pageYOffset; // The page's Y offset before scrolling
		window.requestAnimationFrame(function(){ // setTimeout causes a 1 millisecond flicker where the body scrolls to the top
			try{
				id=document.activeElement.parentElement.parentElement.parentElement.id;
			} catch (err){
				// This isn't an issue, so just fail silently (bad practice, but reasonable here)
				id=undefined;
			}
			// If the current active element is a link in the sidebar, then scroll back to where it was 1 frame ago
			if (id=="Sidebar"){
				window.scrollTo(0, ofsYPre);
			}
		})
	}
}
