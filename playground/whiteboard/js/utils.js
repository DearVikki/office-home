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
Element.prototype.remove = function(){
	this.parentNode.removeChild(this);
}
Element.prototype.empty = function(){
	while (this.lastChild) {
	    this.removeChild(this.lastChild);
	}
}
Element.prototype.index = function(siblings){
	var nodelist;
	if(siblings) nodelist = this.parentElement.querySelectorAll(siblings);
	else nodelist = this.parentElement.children;
	nodelist = Array.prototype.slice.call(nodelist);
	return nodelist.indexOf(this);
}

function Modal(config){
	this.$modal = document.querySelector(config.el);
	this.confirmCb = typeof config.confirmCb === 'function'?config.confirmCb:function(){};
	this.cancelCb = typeof config.cancelCb === 'function'?config.cancelCb:function(){};
	var self = this;
	this.$modal.querySelector('.modal').addEventListener('click',function(e){
		e.stopPropagation();
	},false)
	this.$modal.querySelector('.modal-close').addEventListener('click',function(e){
		self.close();
	},false)
	Modal.prototype.close = function(){
		self.$modal.removeClass('active');
		self.cancelCb();
	}
	Modal.prototype.open = function(){
		self.$modal.addClass('active');
	}
	if(!config.maskDisable) this.$modal.onclick = this.close;
}

function Countdown(el,m){
	this.now = new Date().getTime()/1000;
	this.end = this.now + m*60;
	var self = this;
	function timeFormat(s){
		var h = Math.floor(s/3600);
		var m = Math.floor(s%3600/60);
		var s = Math.floor(s%3600%60);
		m = m < 10 ? '0'+ m:m;
		s = s < 10 ? '0' + s:s;
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

function fileSizeConverter(nBytes){
	var output = nBytes + ' bytes';
	var multipleArr = ['KB','MB','GB','TB'],
		multipleIndex = 0, approx = nBytes / 1024;
	for(;approx > 1; approx /= 1024, multipleIndex++) {
		output = approx.toFixed(2) + '' + multipleArr[multipleIndex];
	}
	return output;
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

function myAlert(el,txt){
	var div = document.createElement('div');
	div.addClass('busy-toast');
	div.textContent = txt;
	el.appendChild(div);
	setTimeout(function(){
		el.removeChild(div);
	},1500)
}