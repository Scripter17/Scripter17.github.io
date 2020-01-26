window.onload=function(){
	var sections=document.querySelectorAll(".content[id] > h2:first-child"),
		i;
	for (i=0; i<sections.length; i++){
		sections[i].innerHTML+="<a class='anchor' href='#"+sections[i].parentElement.getAttribute("id")+"'>#</a>"
	}
}