require('public');
require('./css/common-input.less');
require('./css/common-btn.less');
require('./css/signup.less');
require('initial');
require('headerfooter');
var ajax = require('ajax');
var $ = require('jquery');
var R = require('./js/radio');
var V = require('./js/validator');
var S = require('./js/toggleSlides');
var C = require('./js/countdown');
var container1 = $('#step1-container');
var container2 = $('#step2-container');
var container3 = $('#step3-container');
var btn1 = container1.find('.common-btn');
var btn2 = container2.find('.common-btn');
var btn3 = container3.find('.common-btn');
new R('#step1-container', '.radio', 'single');
//第一步验证
var v1 = new V('#step1-container', [{
    field: '.phone',
    isPhone: {},
    checkEvent: 'keyup',
    checkAll: true
}, {
    field: '.radio',
    custom: {
        rule: function(target) {
            return ($('.radio').hasClass('active')) ? true : false;
        },
        msg: ''
    },
    checkEvent: 'click',
    checkAll: true
}]);
container1.on('validateFail', function(event, errMsg) {
    btn1.removeClass('active');
    console.log('fail')
});
container1.on('validateAllPass', function(event, msg) {
    btn1.addClass('active');
    $('.tel').text($('.phone').val());
    //console.log('pass')
});
console.log(v1)
//v1.checkAll()
//v1.check($('.phone')); //想要可以直接$('.phone').check()
v1.ruleFunctions.isPhone($('.phone'))
//发送验证码
var $veri = $('.getVerify');
var $access = $('.access');
$veri.on('click', function() {
    if ($veri.hasClass('disabled')) return;
    ajax({
        data: {
            name: 'shopping.sys.register.sms.send',
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
                console.log(result)
                $('.wrong-verify').text(result.msg).show();
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
            name: 'shopping.sys.register.sms.confirm',
            mobile: $('.phone').val(),
            code: $('.verify').val()
        },
        success: function(result) {
            if (result.success == true) {
                a = true;
            } else {
                $('.wrong-verify').text(result.msg).show();
                a = false;
            }
        }
    })
    return a;
}
//第二步验证
new V('#step2-container', [{
    field: '.verify',
    checkEvent: 'keyup',
    min: {
        len: 4
    },
    custom: {
        rule: function(target) {
            return checkVeri() ? true : false;
        }
    }
}]);
container2.on('validateFail', function(event, errMsg) {
    btn2.addClass('active');
});
container2.on('validateAllPass', function(event, msg) {
    btn2.addClass('active');
});
//第三步验证
new V('#step3-container', [{
    field: '.pw1',
    checkEvent: 'keyup',
    min: {
        len: 6
    },
    max: {
        len: 20
    },
    checkAll: true
}, {
    field: '.pw2',
    checkEvent: 'keyup',
    equalTo: {
        field: '.pw1'
    },
    checkAll: true
}]);
container3.on('validateFail', function(event, errMsg) {
    btn3.removeClass('active');
});
container3.on('validateAllPass', function(event, msg) {
    btn3.addClass('active');
});
//下一步按钮
new S({
    slides: '.container',
    prev: '.back',
    next: '.common-btn',
    custom: {
        '#step1-container': function(slide) {
            return slide.find('.common-btn').hasClass('active') ? true : false;
        }
    },
    prevCb: function(target) {
        target.find('.wrong-verify').hide();
    },
    first: function(){
        $('.back').on('click',historyBack);
    },
    mid: function(){
        $('.back').off('click',historyBack);
    }
});
//the last signup btn
btn3.on('click', function() {
    if (!btn.hasClass('active')) return;
    var pw = $('.pw1').val();
    ajax({
        data: {
            name: 'shopping.sys.pc.register',
            mobile: $('.phone').val(),
            password: pw,
            r_password: pw,
            type: $('.radio.active').data('type'),
            input_code: ''
        },
        success: function(data, status) {
            if (data.code == 1000) {
                //注册成功
                window.location.href = 'login.html';
            } else if (data.code == 1033) {
                //用户已存在
                $('.reset-pw-reminder').text('用户已存在');
                setTimeout(function() {
                    window.location.href = 'login.html';
                }, 2000)
            }
        }
    })
});
function historyBack(){
    window.history.back();
}