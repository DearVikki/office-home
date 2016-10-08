require('./css/style.css');
require('./css/test.less');
var yell = require('./js/alert.js');
//为什么会在渲染颜色之前运行?
//yell('world')
alert('123');
require(['./js/alert.js'],function(good){
	//good('worlddd');
	console.log('12312asdsadsad');
})