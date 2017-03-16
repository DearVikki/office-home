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