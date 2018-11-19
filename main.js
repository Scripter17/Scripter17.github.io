function randInt(min, max){ // Return values: min to max-1
	var x=Math.random();
	return Math.floor(x*(max-min)+min);
}
window.onload=function(){
	var i, terribleJoke;
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
