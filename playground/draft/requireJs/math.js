require.config({
	path: {
		'jquery' : '../jquery.js'
	}
})
define(['jquery'], function(jquery){
	console.log($('table'));
	var add = function(x,y){
		return x+y;
	};
	return {
		add: add
	}
})