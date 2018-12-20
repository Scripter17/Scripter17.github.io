(function(){
	window.browserElements={
		getIEVersion:function(){ // https://codepen.io/gapcode/pen/vEJNZN
			var ua=window.navigator.userAgent;
			var msie=ua.indexOf('MSIE ');
			if (msie>0){return parseInt(ua.substring(msie+5, ua.indexOf('.', msie)), 10);}
			var trident=ua.indexOf('Trident/');
			if (trident>0){var rv=ua.indexOf('rv:'); return parseInt(ua.substring(rv+3, ua.indexOf('.', rv)), 10);}
			var edge=ua.indexOf('Edge/');
			if (edge>0){return parseInt(ua.substring(edge+5, ua.indexOf('.', edge)), 10);}
			return false;
		},
		getFireFoxVersion:function(){ // Home-made function; Probably broken (User agent list: https://udger.com/resources/ua-list/browser-detail?browser=Firefox )
			// You know you need to re-evaluate your code when you label something as "home-made".
			var ua=navigator.userAgent;
			var i=ua.indexOf("Firefox");
			var v=parseInt(ua.substr(i+8, ua.length-i-8));
			return v;
		},
		getChromeVersion:function(){ // https://stackoverflow.com/a/4900484
			var raw=navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);
			return (raw?parseInt(raw[2], 10):false);
		},
		getBrowser:function(){ // TODO: Make this much more rigorous.
			var browser;
			var IEdge=browserElements.getIEVersion();
			if (IEdge>=12 && typeof IEdge==="number"){
				browser="Edge";
			} else if (IEdge<=11 && typeof IEdge==="number"){
				browser="IE";
			} else if (navigator.userAgent.indexOf("Firefox")!=-1){
				browser="Firefox";
			} else if (navigator.userAgent.indexOf("Chrome")!=-1){
				browser="Chrome";
			}
			return browser;
		},
		getBrowserVersion:function(){
			var type=browserElements.getBrowser();
			if (type=="Chrome"){return browserElements.getChromeVersion();}
			if (type=="Firefox"){return browserElements.getFireFoxVersion();}
			if (type=="Edge"){return browserElements.getIEVersion()-11;}
			if (type=="IE"){return browserElements.getIEVersion();}
			return null;
		},
		debug:{
			getMaxvRange:function(ver){
				return [ver, Math.pow(10,((ver+"").length))-1]
			}
		},
		main:function(elem, single){
			// type=Chrome ver=70
			// <elem if-chrome="1..70 \d*70..999">
			if (elem===undefined || elem+""==="[object Event]"){elem=document.body;}
			var i;
			if (!single){
				if (elem.childNodes===undefined){return false;}
				for (i=0; i<elem.childNodes.length; i++){
					if (elem.childNodes[i].tagName!=undefined){
						browserElements.main(elem.childNodes[i], single);
					}
				}
			}
			var types=["chrome", "firefox", "edge", "ie"],
				type=browserElements.getBrowser(),
				ver=browserElements.getBrowserVersion(),
				ifname="if-"+type.toLowerCase(),
				range=elem.getAttribute(ifname);
			if (range===null){
				for (i in types){
					if (elem.getAttribute("if-"+types[i])!==null){
						elem.style.display="none";
					}
				}
			} else {
				var rs=range.split("-");
				if (range!=="" && !((rs[0]<=ver || rs[0]==="") && (ver<=rs[1] || rs[1]===""))){
					elem.style.display="none";
				}
			}
			
			return elem;
		}
	}
})()