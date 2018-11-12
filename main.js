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

function randInt(min, max){ // Return values: min to max-1
	var x=Math.random();
	return Math.floor(x*(max-min)+min);
}
window.onload=function(){
	var i;
	terribleJokes=[
		"eval(Math.random())",
		"function f(){try{/*stuff*/}catch(e){f();}}",
		"You were expecting a joke, but it was me, undefined!",
		"Internet Explorer. That's the joke.",
		"I'm actually infinitely many monkeys on typewriters."
	];
	
	// Never select the same joke twice in a row. It just seems more random this way, even though it isn't.
	// Apparently localStorage isn't supported in IE.
	if (localStorage){
		do{
			i=randInt(0,terribleJokes.length);
		} while (localStorage.getItem("jokeIndex")==i)
		localStorage.setItem("jokeIndex", i);
	} else {
		i=randInt(0,terribleJokes.length);
	}

	document.getElementById("terribleJoke").innerHTML=terribleJokes[i];
}
