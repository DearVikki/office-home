require('initial');
require('public');
require('headerfooter');
require('./css/usercenter.less');
var $ = require('jquery');
var ls = require('./js/localStorage');
var userinfo = ls('user');
var $avatar = $('.avatar');
var $username = $('.user-name');
if(userinfo) {
	var nickname = userinfo.nickname, status, level;
	switch(userinfo.status){
		case 0:
		status = '未加盟';
		break;
		case 1:
		status = '已加盟';
		break;
	}
	switch(userinfo.level){
		case 0:
		level = '普通会员';
		break;
		case 1:
		level = '黄金会员';
		break;
		case 2:
		level = '白金会员';
		break;
		case 3:
		level = '钻石会员';
		break;
	}
	$avatar.attr('src',userinfo.head);
	$username.text(userinfo.nickname);
	$('.level-metal').text(status);
	$('.level-member').text(level);
}