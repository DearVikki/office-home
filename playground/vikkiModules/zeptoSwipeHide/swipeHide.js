$.fn.swipeHide = function(){
	function swipeLeftHandler(e){
		console.log(this);
		e.preventDefault();
		//this.style.left = '-200px';
	}
	this.on('swipeLeft', swipeLeftHandler);
}