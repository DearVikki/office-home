var Range = function(from, to){
	this.from = from;
	this.to = to;
}
Range.prototype = {
	constructor: Range,
	includes: function(x) {
		if(x>this.to && x<this.from) return true;
		return false;
	},
	foreach: function(f) {
		for(var i = this.from; i<this.to; i++) f(i);
	},
	toString: function(){
		console.log('from'+this.from+'to'+this.to);
	},
	equal: function(that) {
		if(that === null || that === undefined) return false;
		if(!that instanceof Range) return false;
		if(this.to === that.to && this.from === that.from) return true;
	},
	compareTo: function(that) {
		if(that === null || that === undefined) throw 'unsupported type';
		return this.to - that.to;
	}
}