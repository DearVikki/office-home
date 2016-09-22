function VikkiValidator(container, rules, submit) {
    this.errMsg = [];
    this.allRules = {};
    this.functions = {
        isRequired: function(value) {
            var msg = 'Mandatory field';
            return {
                result: value.length > 0 ? true : false,
                msg: msg
            };
        },
        isEmail: function(value) {
            var reg = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
            var msg = 'Invalid email address';
            return {
                result: reg.test(value) ? true : false,
                msg: msg
            };
        },
        min: function(value, data) {
            var len = Number(data.len) ? Number(data.len) : 0;
            var msg = 'More                                                                                                                  than ' + len + ' words.';
            return {
                result: value.length >= len ? true : false,
                msg: msg
            };
        },
        equalTo: function(value, data){
            var field2 = idTrans(data.field);
            var value2 = field2.value;
            var msg = 'Values are not equal'
            return {
                result: value === value2 ? true : false,
                msg: msg
            }
        }
    };
    this.functionNames = Object.keys(this.functions);
    /*变量解释：
    this.functionNames: 按顺序储存的默认检测变量名数组
    this.allRules: 经转换过的用户要求检测对象，格式为{fieldName:{isRequired:{..},min{...}},fieldName:{isRequired:{..},min{...}}}
    rule: 当前dom绑定的检测对象，格式为{isRequired:{...},min:{...}}
    thisName: this.rulesDefaultName循环到的每一检测name
    */
    this.rangeCheck = function() {};
    this.check = function(e) {
        var e = e || window.event;
        var target = e.target;
        var targetData = e.target.getAttribute('data-v');
        var rule = this.allRules[targetData];
        var checkResult = true;
        var errMsg;
        //剔除没有被写检查的元素
        //if (rule === undefined) return;
        for (var i = 0; i < this.functionNames.length; i++) {
            var thisName = this.functionNames[i];
            if (thisName in rule) {
                var thisRule = rule[thisName];
                var data = this.functions[thisName](target.value, thisRule);
                checkResult = data.result;
                errMsg = thisRule.msg || data.msg;
                if (!checkResult) {
                    target.setAttribute('data-fail',true);
                    trigger(target, 'validateFail', errMsg)
                    break;
                }
            }
        }
        if (checkResult) {
            target.removeAttribute('data-fail');
            trigger(target, 'validatePass', 'This field passed');
        }
    }.bind(this);
    this.checkAll = function() {
        var pass=true;
        for (var i = 0; i < inputs.length; i++) {
            trigger(inputs[i], 'blur');
            if(inputs[i].hasAttribute('data-fail')) pass=false;
        }
        if(pass) trigger(submit, 'validatePass', false);
        else trigger(submit, 'validateFail', false);
    }

    function idTrans(el) {
        el = (!el instanceof HTMLElement) ? document.getElementById(el) : el;
        return el;
    }

    var inputs = [];
    container = idTrans(container);
    //console.log(submit)
    submit = idTrans(submit);
    //console.log(submit)
    for (var i = 0; i < rules.length; i++) {
        var el = rules[i].field;
        idTrans(el);
        el.setAttribute('data-v', 'v' + i);
        delete rules[i].field;
        this.allRules['v' + i] = rules[i];
        inputs.push(el);
    }

    for (var i = 0; i < inputs.length; i++) {
        inputs[i].onblur = this.check;
    }
    submit.addEventListener('click', this.checkAll, false);
}