Element.prototype.hasClass = function(className){
	return this.classList.contains(className)?true:false;
}
Element.prototype.addClass = function(className){
	this.classList.add(className);
	console.log(this)
	return this;
}
Element.prototype.removeClass = function(className){
	this.classList.remove(className);
	return this;
}
document.querySelector('#pl_h').onclick = function(e){
	var target = e.target;
	if(target.hasClass('nav')) {
		document.querySelector('.active.nav').removeClass('active');
		target.addClass('active');
	}
}