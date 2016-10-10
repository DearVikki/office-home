require('public');
require('./css/common-input.less');
require('./css/common-btn.less');
require('./css/signup.less');
require('initial');
require('headerfooter');
require('ajax');
var $ = require('jquery');
var R = require('./js/radio');
var V = require('./js/validator');
new R('#step1-container', '.radio', 'single', function() {
    console.log('hey')
});
new V('#step1-container', [{
    field: '.phone',
    isRequired: {},
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
var container1 = $('#step1-container');
container1.on('validateFail', function(event, errMsg) {
    console.log(errMsg)
})
container1.on('validateAllPass', function(event, msg) {
    console.log(msg)
})