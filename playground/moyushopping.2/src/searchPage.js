require('public');
require('headerfooter');
var $ = require('jquery');
require('initial');
$('label').on('click',function(){
	location.href = 'goodsType.html?search='+$('#searchAll').val();
})