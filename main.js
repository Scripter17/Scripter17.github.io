window.onload=function(){
	if (localStorage.getItem("theme")==undefined){
		localStorage.setItem("theme", "light");
	}
	document.body.setAttribute("theme", localStorage.getItem("theme"));
	document.getElementById("themeChange").onclick=function(){
		localStorage.setItem("theme", {"light":"dark", "dark":"light"}[localStorage.getItem("theme")]);
		document.body.setAttribute("theme", localStorage.getItem("theme"));
	}
}
