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
        var actualSuccessCb = config.success;
        config.success = function(result) {
            if (result.code === 1004) location.href = 'login.html';
            else actualSuccessCb(result);
        }
        $.ajax(config);
    }

    function visitorAjax(config) {
        config.url = 'http://mozhishi.com/shopping/php/PcApi';
        config.method = 'post';
        config.xhrFields = {
            withCredentials: true
        };
        config.crossDomain = true;
        $.ajax(config);
    }
    return {
        ajax: ajax,
        visitorAjax: visitorAjax
    };
})