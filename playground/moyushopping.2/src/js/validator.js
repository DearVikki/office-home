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
        var self = this;
        this.allRules = {};
        this.inputs = [];
        this.container = $(container);
        Validator.prototype.ruleFunctions = {
            isRequired: function(target) {
                var value = target.val();
                var msg = 'Mandatory field';
                return {
                    result: value.length > 0 ? true : false,
                    msg: msg
                };
            },
            isEmail: function(target) {
                var value = target.val();
                var reg = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
                var msg = 'Invalid email address';
                return {
                    result: reg.test(value) ? true : false,
                    msg: msg
                };
            },
            isPhone: function(target) {
                var value = target.val();
                var reg = /^1[3|4|5|7|8]\d{9}$/;
                var msg = 'Invalid phone No.';
                return {
                    result: reg.test(value) ? true : false,
                    msg: msg
                }
            },
            min: function(target, thisRule) {
                var value = target.val();
                var len = Number(thisRule.len) ? Number(thisRule.len) : 0;
                var msg = 'Less than' + len + 'words';
                return {
                    result: value.length >= len ? true : false,
                    msg: msg
                };
            },
            equalTo: function(target, thisRule) {
                var value = target.val();
                var value2 = $(thisRule.field).val();
                var msg = 'Values are not equal'
                return {
                    result: value === value2 ? true : false,
                    msg: msg
                }
            },
            custom: function(target, thisRule) {
                var value = target.val();
                var msg = 'Unqualified field';
                return {
                    result: thisRule.rule(target) ? true : false,
                    msg: msg
                }
            }
        };
        /*变量解释：
        this.functionNames: 按顺序储存的默认检测变量名数组
        this.allRules: 经转换过的用户要求检测对象，格式为{fieldName:{isRequired:{..},min{...}},fieldName:{isRequired:{..},min{...}}}
        rule: 当前dom绑定的检测对象，格式为{isRequired:{...},min:{...}}
        thisName: this.rulesDefaultName循环到的每一检测name
        */
        Validator.prototype.check = function(target) {
            var targetData = target.attr('data-v');
            var rule = this.allRules[targetData];
            var functionNames = Object.keys(Validator.prototype.ruleFunctions);
            var checkResult = true;
            var errMsg;
            for (var i = 0; i < functionNames.length; i++) {
                var thisName = functionNames[i];
                if (thisName in rule) {
                    var thisRule = rule[thisName];
                    var data = this.ruleFunctions[thisName](target, thisRule);
                    checkResult = data.result;
                    errMsg = thisRule.msg || data.msg;
                    //验证失败 则不会进行队列中排队等待的其他验证
                    if (!checkResult) {
                        target.attr('data-fail', true);
                        target.trigger('validateFail', errMsg);
                        console.log('fail:' + data.msg)
                        break;
                    }
                }
            }
            if (checkResult) {
                target.removeAttr('data-fail');
                target.trigger('validatePass', 'This field passed');
            }
        }
        Validator.prototype.checkAll = function() {
            var pass = true;
            for (var i = 0; i < this.inputs.length; i++) {
                this.check(this.inputs[i]);
                if (this.inputs[i].attr('data-fail')) pass = false;
            }
            if (pass) this.container.trigger('validateAllPass', 'Congrats!');
        }
        for (var i = 0; i < rules.length; i++) {
            var r = rules[i];
            var $el = this.container.find(r.field);
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
                if (r.checkAll) self.checkAll();
                else self.check(target);
            })
            this.allRules['v' + i] = r;
            this.inputs.push($el);
        }
    }
    return Validator;
})