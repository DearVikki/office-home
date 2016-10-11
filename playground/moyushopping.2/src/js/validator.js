! function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(require('jquery'));
    } else {
        root.times = factory(root.jQuery);
    }
}(this, function($) {
    function Validator(container, rules) {
        var $this = this;
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
            isPhone: function(value) {
                var reg = /^1[3|4|5|7|8]\d{9}$/;
                var msg = 'Invalid phone No.';
                return {
                    result: reg.test(value) ? true : false,
                    msg: msg
                }
            },
            min: function(value, thisRule) {
                var len = Number(thisRule.len) ? Number(thisRule.len) : 0;
                var msg = 'Less than                                                                                                  than ' + len + ' words.';
                return {
                    result: value.length >= len ? true : false,
                    msg: msg
                };
            },
            equalTo: function(value, thisRule) {
                var value2 = $(thisRule.field).val();
                var msg = 'Values are not equal'
                return {
                    result: value === value2 ? true : false,
                    msg: msg
                }
            },
            custom: function(value, thisRule, target) {
                var msg = 'Unqualified field';
                return {
                    result: thisRule.rule(target) ? true : false,
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
        this.check = function(target) {
            var targetData = target.attr('data-v');
            var rule = $this.allRules[targetData];
            var checkResult = true;
            var errMsg;
            for (var i = 0; i < this.functionNames.length; i++) {
                var thisName = this.functionNames[i];
                if (thisName in rule) {
                    var thisRule = rule[thisName];
                    var data = this.functions[thisName](target.val(), thisRule, target);
                    checkResult = data.result;
                    errMsg = thisRule.msg || data.msg;
                    //验证失败 则不会进行队列中排队等待的其他验证
                    if (!checkResult) {
                        target.attr('data-fail', true);
                        target.trigger('validateFail', errMsg);
                        break;
                    }
                }
            }
            if (checkResult) {
                target.removeAttr('data-fail');
                target.trigger('validatePass', 'This field passed');
            }
        }
        //一开始我这里是Validator.prototype.checkAll
        this.checkAll = function() {
            var pass = true;
            for (var i = 0; i < inputs.length; i++) {
                //然后这里的check又写了this...
                $this.check(inputs[i]);
                if (inputs[i].attr('data-fail')) pass = false;
            }
            if (pass) container.trigger('validateAllPass', 'Congrats!');
        }
        var inputs = [];
        container = $(container);
        for (var i = 0; i < rules.length; i++) {
            var r = rules[i];
            var $el = container.find(r.field);
            var checkEvent = 'blur';
            $el.attr('data-v', 'v' + i);
            delete r.field;
            if (r.checkEvent) {
                checkEvent = r.checkEvent;
                delete r.checkEvent;
            }
            $el.on(checkEvent, function() {
                var e = e || window.event;
                var target = $(e.target);
                //一开始我这里↓↓是Validator.prototype.checkAll
                if (r.checkAll) $this.checkAll(target);
                else $this.check(target);
                //我一开始这里↑↑用的是this 所以就会说this.check()is not a function
            })
            this.allRules['v' + i] = r;
            inputs.push($el);
        }
        return this;
    }
    return Validator;
})