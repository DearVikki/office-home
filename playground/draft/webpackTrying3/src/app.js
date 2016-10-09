alert('123');

require('./css/style.css');
require('./css/test.less');
var yell = require('./js/alert.js');
//为什么会在渲染颜色之前运行?
//yell('world')
require(['./js/alert.js'],function(good){
	//good('worlddd');
	console.log('123asdsad12');
})