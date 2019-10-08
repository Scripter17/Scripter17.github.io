window.pagecache={}
window.navbarcache=null;

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
	var setContent=function(){
		document.getElementById("main-wrapper").innerHTML=pagecache[window.location.hash];
	}
	if (pagecache[window.location.hash]===undefined){
		var request=new XMLHttpRequest();
		request.addEventListener("load", function(){
			pagecache[window.location.hash]=this.responseText;
			setContent();
		})
		request.open("GET", "pages/"+window.location.hash.substr(1, window.location.hash.length-1)+".html");
		request.send();
	} else {
		setContent();
	}
	handleNavbar();
}

function handleNavbar(){
	// Handle the navigation elements
	var setNavbar=function(){
		var navbar=document.getElementById("navbar");
		navbar.innerHTML="";
		for (i in navbarcache){
			if (window.location.hash!=i){
				navbar.innerHTML+="<a href='"+i+"'>"+navbarcache[i]+"</a>"
			}
		}
	}
	if (navbarcache===null){
		var navHttp=new XMLHttpRequest();
		navHttp.addEventListener("load", function(){
			navbarcache=JSON.parse(this.responseText);
			setNavbar();
		})
		navHttp.open("GET", "map.json");
		navHttp.send();
	} else {
		setNavbar();
	}
}
window.onhashchange=handleHash;