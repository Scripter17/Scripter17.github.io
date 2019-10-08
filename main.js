window.onload=function(){
	// Handle themes
	if (localStorage.getItem("theme")==undefined){
		localStorage.setItem("theme", "light");
	}
	document.body.setAttribute("theme", localStorage.getItem("theme"));
	document.getElementById("themeChange").onclick=function(){
		localStorage.setItem("theme", {"light":"dark", "dark":"light"}[localStorage.getItem("theme")]);
		document.body.setAttribute("theme", localStorage.getItem("theme"));
	}

	if (window.location.hash in {"":"", "#":""}){
		window.location.hash="#main";
	}
	handleHash()

	document.getElementById("footer").addEventListener("click",function(){
		window.scrollTo(0,0);
	})


}

function handleHash(){
	var request=new XMLHttpRequest();
	request.addEventListener("load", function(){
		var html=this.responseText;
		document.getElementById("main-wrapper").innerHTML=html;
	})
	request.open("GET", "pages/"+window.location.hash.substr(1, window.location.hash.length-1)+".html");
	request.send();
	handleNavbar();
}
function handleNavbar(){
	// Handle the navigation elements
	var navbar=document.getElementById("navbar");
	var navHttp=new XMLHttpRequest();
	navHttp.addEventListener("load", function(){
		navbar.innerHTML="";
		var navJSON=JSON.parse(this.responseText), i;
		for (var i in navJSON){
			if (window.location.hash!=i){
				navbar.innerHTML+="<a href='"+i+"'>"+navJSON[i]+"</a>";
			}
		}
	})
	navHttp.open("GET", "map.json");
	navHttp.send();
}
window.onhashchange=handleHash;