function VikkiValidator(container, rules) {
    this.errMsg = [];
    this.rulesObj = {};
    this.rulesDefault = ['isRequired', 'rangeCheck', 'lengthCheck'];
    //空值判断
    this.isRequired = function(el) {
        if (el.value.length > 0) {
			var evt = new CustomEvent('validatePass',{'bubbles':true});
            el.dispatchEvent(evt);
        } else {
            var evt = new CustomEvent('validateFail',{'bubbles':true, 'detail':'empty field'});
            el.dispatchEvent(evt);
        }
    };
    //长度判断
    this.min = function(el, len, msg){
    	if(el.value.length < len){
    		var evt = new CustomEvent('validatePass',{'bubbles':true});
            el.dispatchEvent(evt);
    	} else {
    		var evt = new CustomEvent('validateFail',{'bubbles':true, 'detail':'too short'});
            el.dispatchEvent(evt);
    	}
    };
    //范围判断
    this.rangeCheck = function(){};

    this.check = function(e){
    	console.log(this)
    	var e = e||window.event;
    	var target = e.target;
    	var targetName = e.target.name;
    	var rule = this.rulesObj[targetName];
    	var ruleName = Object.keys(rule);
    	/*ruleName.forEach(function(name){
    		if(this[name]) this[name](target, rule[ruleName]);
    	}.bind(this))*/
    	this.rulesDefault.forEach(function(i){
    		console.log(this)
    		if(i in rule) this[i](target, rule[i]);
    	}).bind(this);
    }.bind(this);

    for(var i=0; i<rules.length; i++){
    	var elName = rules[i].field.name;
    	delete rules[i].field;
    	this.rulesObj[elName] = rules[i];
    }

    var inputs = container.querySelectorAll('input');
    for(var i=0; i<inputs.length; i++){
    	console.log(inputs[i])
    	inputs[i].onblur = this.check;
    }
}