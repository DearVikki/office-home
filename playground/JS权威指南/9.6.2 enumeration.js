function enumeration(nameToValues){
	var enumeration = function(){ throw 'cant instantiate enumerations'};

	var proto = enumeration.prototype = {
		constructor: enumeration,
		toString: function() {return this.name; },
		valueOf: function() {return this.value; },
		toJSON: function() {return this.name; }
	};
	enumeration.values = [];

	for(name in namesToValues) {
		var e = Object.create(proto);
		
	}
}