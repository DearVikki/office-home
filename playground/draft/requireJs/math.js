
/*define(['jquery'], function($){
	console.log($('input'));
	var sum = 0;
	var add = function(x,y){
		sum += x + y;
		return sum;
	};
	return add;
})

define(function(){
	return {
		color:'black',
		size:'unizs'
	}
})*/

define(function(require, exports, module){
	var m = require('minus');
	exports.add = function(x,y){
	return x+y+m.m1;
}
})