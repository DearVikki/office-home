!function(root, factory){
	if(typeof define === 'function' && define.amd){
		define(['jquery'],factory);
	} else if(typeof exports === 'object'){
		module.exports = factory(require('jquery'));
	} else {
		root.times = factory();
	}
}(this,function(){
	function times(a,b){
		$('input').val(a*b);
		return a*b;
	}
	return times;
})