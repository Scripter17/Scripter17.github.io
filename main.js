// Normally, when you press [tab] when a link in the sidebar is active, the window scrolls to the top. (It's a bug with position:sticky)
// This script prevents that, albeit with a bit of sphaghetii.
window.onkeydown=function(e){
	var ofsYPre, id;
	if (e.keyCode==9){ // keyCode 9 is [tab]
		ofsYPre=window.pageYOffset; // The page's Y offset before scrolling
		window.requestAnimationFrame(function(){ // setTimeout causes 1 millisecond where the body scrolls to the top
			try{
				id=document.activeElement.parentElement.parentElement.parentElement.id;
			} catch (e){
				// This isn't an isssue, so just fail silently (bad practice, but reasonable here)
				id=undefined;
			}
			// If the current active element is a link in the sidebar, then scroll back to where it was 1 frame ago
			if (id=="Sidebar"){
				window.scrollTo(0, ofsYPre)
			}
		})
	}
}