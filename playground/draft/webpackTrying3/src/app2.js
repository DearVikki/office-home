alert('123');

console.log('this is page1');
/*require.ensure(['./js/alert'],function(require){
	var a = require('./js/alert');
	a('you');
})*/
var $ = require('jquery');
//var $ = require('jquery');
$('p').append('<p>This is made by jqueryyyy</p>');
var load = require('bundle-loader!./js/alert');
load(function(a){
	a('you');
})
var img = document.createElement('img');
img.src = require('./img/2807.png');
document.body.appendChild(img);
alerrt('hh')