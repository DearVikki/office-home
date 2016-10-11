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
                var len = Number(data.len) ? Number(thisRule.len) : 0;
                var msg = 'More                                                                                                                  than ' + len + ' words.';
                return {
                    result: value.length >= len ? true : false,
                    msg: msg
                };
            },
            equalTo: function(value, thisRule) {
                var field2 = $(thisRule.field);
                var value2 = $(field2).val();
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
        this.rangeCheck = function() {};
        Validator.prototype.check = function(target) {
            var targetData = target.attr('data-v');
            var rule = this.allRules[targetData];
            var checkResult = true;
            var errMsg;
            for (var i = 0; i < this.functionNames.length; i++) {
                var thisName = this.functionNames[i];
                if (thisName in rule) {
                    var thisRule = rule[thisName];
                    var data = this.functions[thisName](target.val(), thisRule, target);
                    checkResult = data.result;
                    errMsg = thisRule.msg || data.msg;
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
        }.bind(this);
        Validator.prototype.checkAll = function() {
            var pass = true;
            for (var i = 0; i < inputs.length; i++) {
                this.check(inputs[i]);
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
                if (r.checkAll) Validator.prototype.checkAll(target);
                else Validator.prototype.check(target);
            })
            this.allRules['v' + i] = r;
            inputs.push($el);
        }
        /*submit.on('click', function() {
            Validator.prototype.checkAll()
        });*/
    }
    return Validator;
})