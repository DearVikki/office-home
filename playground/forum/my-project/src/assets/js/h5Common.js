var xhr = new XMLHttpRequest();
xhr.open('post', 'http://www.bmwenwo.com/index.php/PcApi/selectSession', true);
xhr.withCredentials = true;
xhr.send();
xhr.onload = function(r){
	// alert(JSON.parse(xhr.response).user_id)
	if(!JSON.parse(xhr.response).user_id) {
		window.location.href="http://www.bmwenwo.com/index.php/PcApi/login";
	} else {
		// 未认证用户跳到认证页
		if(location.href.slice(-19) === 'authentication.html') return;
		var xhr2 = new XMLHttpRequest();
		xhr2.open('post', 'http://www.bmwenwo.com/index.php/PcApi', true);
		xhr2.withCredentials = true;
		xhr2.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhr2.send("name=xwlt.pc.IsAuthentication");
		xhr2.onreadystatechange = function() {//Call a function when the state changes.
		    if(xhr2.readyState == 4 && xhr2.status == 200) {
		    	if(Number(JSON.parse(xhr2.responseText).data.suspended)) disableAccount();
		        if(!Number(JSON.parse(xhr2.responseText).data.is_authentication)) location.href="./user-authentication.html";
		    }
		}
	}
}

var viewport = document.querySelector("meta[name=viewport]");
var winWidths=window.innerWidth;
var densityDpi=640/winWidths;
  densityDpi= densityDpi>1?300*640*densityDpi/640:densityDpi;
if(isWeixin()){
  viewport.setAttribute('content', 'width=640,initial-scale=.5,maximum-scale=.5, minimum-scale=.5,user-scalable=no, target-densityDpi='+densityDpi);
}
function isWeixin(){
  var ua = navigator.userAgent.toLowerCase();
  if(ua.match(/MicroMessenger/i)=="micromessenger") {
  return true;
  } else {
  return false;
  }
}
document.getElementsByTagName('html')[0].style.fontSize = window.innerWidth / 10 + 'px';

function disableAccount(){
	var html = "<div id=\"\">" +
		 +
	"</div>";
	var div = document.createElement('div');
	div.innerHTML = "<div id=\"disabled_accoount_inner\">" +
			"<div class=\"part1\">" +
				"<p class=\"c-txt6\">你的账号被封印了！</p>" +
				"<p class=\"c-txt5\">请尽快联系管理员解开封印</p>" +
			"</div>" +
			"<a class=\"part2\" class=\"c-txt6\" href=\"javascript:open(location, '_self').close();\">确定并退出</a>" +
		"</div>";
	div.id = 'disabled_accoount_container'
	document.body.appendChild(div);
	// 阻止页面滚动
	window.ontouchmove = function(){
		console.log('hey')
		return false;
	}
}
