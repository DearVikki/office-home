$.fn.swipeHide = function(){
	function swipeLeftHandler(){
		console.log(this)
		//this.style.left = '-200px';
	}
	this.on('swipeLeft', swipeLeftHandler);
}