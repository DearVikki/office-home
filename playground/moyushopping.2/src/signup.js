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
var container1 = $('#step1-container');
var container2 = $('#step2-container');
var container3 = $('#step3-container');
//检查hash
var hash = parseInt(window.location.hash.split('#')[1]);
console.log(hash)
switch (hash) {
    case 1:
        container1.show();
        container2.hide();
        container3.hide();
        break;
    case 2:
    console.log('hey')
        container2.show();
        container1.hide();
        container3.hide();
        break;
    case 3:
        container3.show();
        container1.hide();
        container2.hide();
        break;
}
new R('#step1-container', '.radio', 'single');
//第一步验证
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
var btn1 = $('#step1-container').find('.common-btn');
container1.on('validateFail', function(event, errMsg) {
    btn1.removeClass('active');
})
container1.on('validateAllPass', function(event, msg) {
        btn1.addClass('active');
    })
    //点击按钮
$('.common-btn').on('click', function() {
    var $this = $(this);
    if (!$this.hasClass('active')) return;
    /*var thisContainer = $this.parent('.container');
    var nextContainer = thisContainer.next();
    if (nextContainer.length !== 0) {
        thisContainer.hide();
        nextContainer.show();
    }*/
    if(hash !== 3){
        location.hash = ++hash;
        location.reload(true);
    }
})