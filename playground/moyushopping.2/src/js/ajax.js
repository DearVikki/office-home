! function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(require('jquery'));
    } else {
        root.times = factory(root.jQuery);
    }
}(this, function($) {
    function ajaxFactory(noVistor) {
        return function (config) {
            config.url = 'http://mozhishi.com/shopping/php/PcApi';
            config.method = 'post';
            config.xhrFields = {
                withCredentials: true
            };
            config.crossDomain = true;
            if (noVistor) {
            var actualSuccessCb = config.success;
            config.success = function(result) {
                if (result.code === 1004) location.href = 'login.html';
                else actualSuccessCb(result);
            }
        }
            $.ajax(config);
        }
    }
    return {
        ajax: ajaxFactory(true),
        visitorAjax: ajaxFactory(false)
    };
})