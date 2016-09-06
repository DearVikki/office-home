function VikkiValidator(container, rules) {
    this.errMsg = [];
    this.rulesObj = {};
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
    this.lengthCheck = function(el, len, msg){
    	var max = len.max||Infinity;
    	var min = len.min||0;
    	//if(el.value.length >= len)
    };
    //范围判断
    this.rangeCheck = function(){};

    this.check = function(e){
    	var e = e||window.event;
    	var target = e.target;
    	var targetName = e.target.name;
    	var rule = this.rulesObj[targetName];
    	var ruleName = Object.keys(rule);
    	ruleName.forEach(function(name){
    		if(this[name]) this[name](target, rule[ruleName]);
    	}.bind(this))
    }.bind(this)

    for(var i=0; i<rules.length; i++){
    	var elName = rules[i].field.name;
    	delete rules[i].field;
    	this.rulesObj[elName] = rules[i];
    }

    var inputs = container.querySelectorAll('input');
    for(var i=0; i<inputs.length; i++){
    	inputs[i].onblur = this.check;
    }
}