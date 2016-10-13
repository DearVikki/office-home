require('public');
require('./css/common-input.less');
require('./css/common-btn.less');
require('./css/signup.less');
require('initial');
require('headerfooter');
var ajax = require('ajax');
var $ = require('jquery');
var V = require('./js/validator');
var S = require('./js/toggleSlides');
var h = require('./js/hideReminder');
var C = require('./js/countdown');
var container1 = $('#forget-pw');
var container2 = $('#reset-pw');
var btn1 = $('#forget-pw .common-btn');
var btn2 = $('#reset-pw .common-btn');
//发送验证码
var $veri = $('.resend-veri');
var $access = $('.access');
var $reminder = $('.reset-pw-reminder');
$veri.on('click', function() {
    if ($veri.hasClass('disabled')) return;
    ajax({
        data: {
            name: 'shopping.sys.forget.sms.send',
            mobile: $('.phone').val()
        },
        success: function(result) {
            if (result.success === true) {
                new C({
                    text: '.time',
                    time: 60,
                    start: function() {
                        $access.text('s重新发送');
                        $veri.addClass('disabled');
                    },
                    end: function() {
                        $access.text('重新发送');
                    }
                })
            } else {
                $reminder.text(result.msg).show();
            }
        }
    })
});

function checkVeri() {
    var a;
    ajax({
        //这里用了同步…
        async: false,
        data: {
            name: 'shopping.sys.forget.sms.confirm',
            mobile: $('.phone').val(),
            code: $('.verify').val()
        },
        success: function(result) {
            if (result.success == true) {
                a = true;
            } else {
                $reminder.text(result.msg).show();
                a = false;
            }
        }
    })
    return a;
}
new V('#forget-pw', [{
    field: '.phone',
    isPhone: {},
    checkEvent: 'keyup',
    checkAll: true
}, {
    field: '.verify',
    min: {
        len: 4
    },
    custom: {
        rule: function(target) {
            return checkVeri() ? true : false;
        }
    },
    checkEvent: 'keyup',
    checkAll: true
}])
container1.on('validateFail', function(event, errMsg) {
    btn1.removeClass('active');
});
container1.on('validateAllPass', function(event, msg) {
    btn1.addClass('active');
});
new V('#reset-pw', [{
    field: '.pw1',
    min: {
        len: 6
    },
    max: {
        len: 20
    },
    checkEvent: 'keyup',
    checkAll: true
}, {
    field: '.pw2',
    equalTo: {
        field: '.pw1'
    },
    checkEvent: 'keyup',
    checkAll: true
}])
container2.on('validateFail', function(event, errMsg) {
    btn2.removeClass('active');
});
container2.on('validateAllPass', function(event, msg) {
    btn2.addClass('active');
});
btn2.on('click', function() {
        if (!btn2.hasClass('active')) return;
        ajax({
            data: {
                name: 'shopping.sys.reset.password',
                mobile: $('.phone').val(),
                password: $('.pw1').val()
            },
            success: function(data) {
                if (data.code == 1000) {
                    alert('重置成功')
                } else {
                    alert(data.msg)
                }
            }
        })
    })
    //hide reminder
h({
    input: '.verify',
    reminder: '.reset-pw-reminder'
});
//toggleSlides
new S({
    slides: '.container',
    prev: '.back',
    next: '.common-btn',
    custom: {
        '#forget-pw': function(slide) {
            return slide.find('.common-btn').hasClass('active') ? true : false;
        }
    },
    first: function() {
        $('.back').on('click', historyBack);
    },
    mid: function() {
        $('.back').off('click', historyBack);
    }
});

function historyBack() {
    window.history.back();
}