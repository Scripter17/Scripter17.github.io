window.onload=function(){
	initTable();
}
function initTable(){
	var y, x, // The period and group of each element
		tr, td, // Periods and groups, respectively
		n, // Generic iteration variable
		e, // The current element whose cell is being worked on
		table; // The periodic table itself
	table=document.createElement("table");
	table.innerHTML=""; // If, for some reason, initTable is called more than once, this should make it not break.
	table.id="periodicTable"; // Creative, I know.
	for (y=0; y<11; y++){ // Periods
		tr=document.createElement("tr");
		for (x=0; x<19; x++){ // Groups
			td=document.createElement("td");
			tr.appendChild(td);
		}
		table.appendChild(tr);
	}
	for (x=1; x<=18; x++){table.childNodes[0].childNodes[x].innerHTML=x;} // Add the period labels at the top
	for (y=1; y<=7; y++){table.childNodes[y].childNodes[0].innerHTML=y;} // Add the group labels on the left
	document.getElementById("main").appendChild(table);
	for (n in elems){ // Set table cell symbol and add the onclick event
		e=table.childNodes[elems[n]["ypos"]].childNodes[elems[n]["xpos"]];
		e.innerHTML=elems[n].symbol;
		e.title=elems[n].name;
		e.setAttribute("onclick","viewElement("+n+")"); // If I do e.onclick=function(){viewElement(n);} makes it always do Ogganesson (118).
		e.classList.add("element");
	}
}
function setAttributesNS(elem, attrs){ // call element.setAttributeNS in bulk
	var x;
	for (x in attrs){
		elem.setAttributeNS(null, x, attrs[x]);
	}
	return elem;
}
function viewElement(e){ // Using ths function costs you $11.99 (The price of a plate of spaghetii)
	var svg, // The atom diagram thing
		w, h, // Width and height of the diagram
		n, d, // Generic iteration variables
		txt, txtAttrs, // The atomic symbol in the diagram and its attributes
		ring, ringAttrs, // Electron shells
		elec, elecAttrs, // Electrons
		angle, // The angle of each electron in a shell
		ions, // The ions of the element
		span; // Each number in the ion list is its own span element
	e=elems[e]; // You may think this is stupid, but due to how I had to set the onclick functions, this is the only not-shit way to do it.
	svg=document.getElementById("diagram");
	svg.innerHTML="";
	// Width and height of diagram (Right now, they're constant, but they might change later)
	w=parseInt(svg.getAttribute("width"));
	h=parseInt(svg.getAttribute("height"));
	// Adds the chemical symbol to the diagram.
	txtAttrs={"x":w/2, "y":h/2+4, "style":"text-anchor:middle; font-size:16px;"};
	txt=setAttributesNS(document.createElementNS("http://www.w3.org/2000/svg", "text"), txtAttrs);
	txt.innerHTML=e.symbol;
	svg.appendChild(txt);
	for (n=0; n<e.shells.length; n++){ // The shell loop.
		ringAttrs={"cx":w/2, "cy":h/2, "r":(n+1)*25, "style":"stroke: black; stroke-width:1px; fill:none;"};
		ring=setAttributesNS(document.createElementNS("http://www.w3.org/2000/svg", "circle"), ringAttrs);
		svg.appendChild(ring);
		for (d=0; d<e.shells[n]; d++){ // The Electron loop
			angle=d/e.shells[n]*2*Math.PI;
			elecAttrs={"cx":w/2+Math.sin(angle)*(n+1)*25, "cy":h/2-Math.cos(angle)*(n+1)*25, "r":"5", "style":"fill: black;"};
			elec=setAttributesNS(document.createElementNS("http://www.w3.org/2000/svg", "circle"), elecAttrs);
			svg.appendChild(elec);
		}
	}
	// Set the data under the diagram
	for (x of document.getElementsByClassName("view")){
		x.innerHTML=e[x.id.split("_")[1]];
	}
	// 100% jank method of listing ions with the common ones in blue
	ions=document.getElementById("view_ions");
	ions.innerHTML="";
	for (n of e.ions[0]){
		span=document.createElement("span");
		span.innerHTML=n;
		// e.ions[0]=all ions, e.ions[1]=common ions
		if (e.ions[1].indexOf(n)!=-1){span.style.color="blue";}
		ions.appendChild(span);
		ions.innerHTML+=",";
	}
	ions.innerHTML=ions.innerHTML.substr(0,ions.innerHTML.length-2);
}