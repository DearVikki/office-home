require('public');
require('./css/common-input.less');
require('./css/common-btn.less');
require('./css/login.less');
require('initial');
require('headerfooter');
var ajax = require('ajax').ajax;
var $ = require('jquery');
var V = require('./js/validator');
var h = require('./js/hideReminder');
var ls = require('./js/localStorage');
var href = require('./js/href');
var container = $('#main-container');
var btn = $('.common-btn');
new V('#main-container', [{
    field: '.phone',
    isPhone: {},
    checkEvent: 'keyup',
    checkAll: true
}, {
    field: '.pw',
    min: {
        len: 6
    },
    checkEvent: 'keyup',
    checkAll: true
}])
container.on('validateFail', function(event, errMsg) {
    btn.removeClass('active');
});
container.on('validateAllPass', function(event, msg) {
    btn.addClass('active');
});
h({
    input: '.pw',
    reminder: '.reminder'
});
btn.on('click', function() {
    if (!btn.hasClass('active')) return;
    ajax({
        data: {
            name: 'shopping.sys.pc.login',
            mobile: $('.phone').val(),
            password: $('.pw').val()
        },
        success: function(data) {
            if (data.code == 1000) {
                ls('user', data.data);
                href({
                    special: [{
                        end: ['signup.html', 'forgetPw.html'],
                        goto: 'index.html'
                    }],
                    default: document.referrer
                })
            } else {
                $('.reminder').text(data.msg).show();
            }
        }
    })
})