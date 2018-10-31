/*function age(bday, day){
	var age;
	day=day||new Date();
	age=day.getFullYear()-bday.getFullYear();
	if (day.getMonth()<bday.getMonth() || (day.getMonth()==bday.getMonth() && day.getDate()<bday.getDate())){age--;}
	return age;
}
window.onload=function(){
	document.getElementById("age").innerHTML=age(new Date("2002-12-14"))
}/**/