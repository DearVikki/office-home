require('public');
require('./css/common-input.less');
require('./css/common-btn.less');
require('./css/login.less');
require('initial');
require('headerfooter');
var ajax = require('ajax');
var $ = require('jquery');
var V = require('./js/validator');
var container = $('#main-container');
new V({
    '#step1-container',
    [{
        field: '.phone',
        isPhone: {},
        checkEvent: 'keyup',
        checkAll: true
    }, {
        field: '.radio',
        min: 6,
        checkEvent: 'keyup',
        checkAll: true
    }]
})
container1.on('validateFail', function(event, errMsg) {
    btn1.removeClass('active');
});
container1.on('validateAllPass', function(event, msg) {
    btn1.addClass('active');
    $('.tel').text($('.phone').val());
});