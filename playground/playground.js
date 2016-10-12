var Foo = function(x,y){
	x.onclick = function(){
		console.log(y);
	}
}
var a = new Foo(1,10)
var b = new Foo(2,20)