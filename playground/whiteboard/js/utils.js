Element.prototype.hasClass = function(className){
	return this.classList.contains(className)?true:false;
}
Element.prototype.addClass = function(className){
	this.classList.add(className);
	return this;
}
Element.prototype.removeClass = function(className){
	this.classList.remove(className);
	return this;
}
Element.prototype.toggleClass = function(className){
	if(this.hasClass(className)) this.removeClass(className);
	else this.addClass(className);
	return this;
}
function Countdown(el,m){
	this.now = new Date().getTime()/1000;
	this.end = this.now + m*60;
	var self = this;
	function timeFormat(s){
		var h = Math.floor(s/3600);
		var m = Math.floor(s%3600/60);
		var s = Math.floor(s%3600%60);
		m = m < 10 ? '0':m;
		s = s < 10 ? '0':s;
		return h+':'+m+':'+s;
	}
	self.cd = setInterval(function(){
		self.now = new Date().getTime()/1000;
		document.querySelector(el).innerHTML = timeFormat(self.end-self.now);
	},1000)
	Countdown.prototype.end = function(){
		clearInterval(self.cd);
	}
}

var FullScreen = {
	support: function(){
		if(document.documentElement.requestFullscreen() ||
			document.documentElement.webkitRequestFullscreen() ||
			document.documentElement.mozRequestFullScreen()||
			document.documentElement.msRequestFullscreen())
		return true;
	},
	goFullScreen: function(el){
		if (el.requestFullscreen) {
			el.requestFullscreen();
		} else if (el.webkitRequestFullscreen) {
			el.webkitRequestFullscreen();
		} else if (el.mozRequestFullScreen) {
			el.mozRequestFullScreen();
		} else if (el.msRequestFullscreen) {
			el.msRequestFullscreen();
		} else return false;
		return true;
	},
	exitFullScreen: function(){
		if (document.exitFullscreen) {
			document.exitFullscreen();
		} else if (document.webkitExitFullscreen) {
			document.webkitExitFullscreen();
		} else if (document.mozCancelFullScreen) {
			document.mozCancelFullScreen();
		} else if (document.msExitFullscreen) {
			document.msExitFullscreen();
		} else return false;
		return true;
	},
	onfullscreenchange: function(enterCb, exitCb){
		function handler(){
			if (
				document.fullscreenElement ||
				document.webkitFullscreenElement ||
				document.mozFullScreenElement ||
				document.msFullscreenElement
			) enterCb();
			else exitCb();
		}
		document.addEventListener("fullscreenchange", handler);
		document.addEventListener("webkitfullscreenchange", handler);
		document.addEventListener("mozfullscreenchange", handler);
		document.addEventListener("MSFullscreenChange", handler);
	}
}