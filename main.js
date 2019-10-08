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

	// Handle the navigation elements
	var navHttp=new XMLHttpRequest();
	navHttp.addEventListener("load", function(){
		var navJSON=JSON.parse(this.responseText), i;
		for (i in navJSON){
			var p=window.location.pathname;
			//console.log(p, p.split("index")[0], i)
			if (i==p.split("index")[0]){
				continue
			}
			//<a href="/GIMP">GIMP/Photoshop examples</a>
			document.getElementById("navbar").innerHTML+="<a href='"+i+"'>"+navJSON[i]+"</a>"
		}
	})
	navHttp.open("GET", "/map.json");
	navHttp.send();
}
