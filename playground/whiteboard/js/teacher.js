
document.querySelector('#pl_h').onclick = function(e){
	var target = e.target;
	if(target.hasClass('nav')) {
		document.querySelector('.active.nav').removeClass('active');
		target.addClass('active');
	}
}
// 右上角倒计时
new Countdown('.countdown',120);