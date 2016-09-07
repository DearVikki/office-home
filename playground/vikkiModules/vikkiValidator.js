function VikkiValidator(container, rules) {
    this.errMsg = [];
    this.allRules = {};
    this.rulesDefaultNames = ['isRequired', 'rangeCheck', 'min'];
    //空值判断
    this.isRequired = function(el) {
    	var msg = 'Mandatory field';
        return {result:el.value.length > 0 ? true : false, msg:msg}
    };
    //长度判断
    this.min = function(el, data) {
        var len = Number(data.len)?Number(data.len):0;
        var msg = 'Not enough words';
        return {result:el.value.length >= len ? true : false, msg:msg}
    };
    //范围判断
    /*变量解释：
    this.rulesDefaultName: 按顺序储存的默认检测变量名数组
    this.allRules: 经转换过的用户要求检测对象，格式为{fieldName:{isRequired:{..},min{...}},fieldName:{isRequired:{..},min{...}}}
    rule: 当前dom绑定的检测对象，格式为{isRequired:{...},min:{...}}
    thisName: this.rulesDefaultName循环到的每一检测name
    */
    this.rangeCheck = function() {};
    this.check = function(e) {
        var e = e || window.event;
        var target = e.target;
        var targetName = e.target.name;
        var rule = this.allRules[targetName];
        var checkResult = true;
        var errMsg;
        for (var i = 0; i < this.rulesDefaultNames.length; i++) {
            var thisName = this.rulesDefaultNames[i];
            if (thisName in rule) {
            	var thisRule = rule[thisName];
            	var data = this[thisName](target, thisRule);
                checkResult = data.result;
                errMsg = thisRule.msg||data.msg;
                if (!checkResult) {
                    var evt = new CustomEvent('validateFail', {
                        bubbles: true,
                        detail: errMsg
                    });
                    target.dispatchEvent(evt);
                    break;
                }
            }
        }
        if (checkResult) {
            var evt = new CustomEvent('validatePass', {
                'bubbles': true,
                'detail': 'all passed'
            });
            target.dispatchEvent(evt);
        }
    }.bind(this);

    for (var i = 0; i < rules.length; i++) {
        var elName = rules[i].field.name;
        delete rules[i].field;
        this.allRules[elName] = rules[i];
    }
    var inputs = container.querySelectorAll('input');
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].onblur = this.check;
    }
}