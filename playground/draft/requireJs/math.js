require.config({
	path: {
		'jquery' : '../jquery.js'
	}
})
define(['jquery'], function(jquery){
	console.log($('table'));
	var sum = 0;
	var add = function(x,y){
		sum += x + y;
		return sum;
	};
	return add;
})