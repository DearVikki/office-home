var localPPTArr = [{
	id:1,
	content:["http://tangguyan.vicp.net/upload/2017_03_18/img1489842115wumRmipT.jpg",
"http://tangguyan.vicp.net/upload/2017_03_18/img1489842115hrYkF1pc.jpg",
"http://tangguyan.vicp.net/upload/2017_03_18/img1489842115MwVsWZXy.jpg",
"http://tangguyan.vicp.net/upload/2017_03_18/img1489842115Fj6pP442.jpg"]
}]
function teacher(socket){
	
	var $pptHolder = document.querySelector('#ppt_holder');
	document.querySelector('#pl_h').onclick = function(e){
		var target = e.target;
		if(target.hasClass('nav')) {
			document.querySelector('.active.nav').removeClass('active');
			target.addClass('active');
		}
	}
	// 右上角倒计时
	new Countdown('#pl_h_r .countdown',120);
	new Countdown('#pl_f_r2 .countdown',120);
	

	
}

