var $ = require('jquery');
function ajax(config){
	config.url = 'http://mozhishi.com/shopping/php/PcApi';
	config.method = 'post';
	$.ajax(config);
}
module.exports = ajax;