! function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(require('jquery'));
    } else {
        root.times = factory(root.jQuery);
    }
}(this, function($) {
    function ajax(config) {
        config.url = 'http://mozhishi.com/shopping/php/PcApi';
        config.method = 'post';
        config.xhrFields = {
            withCredentials: true
        };
        config.crossDomain = true;
        $.ajax(config);
    }
    return ajax;
})