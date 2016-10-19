! function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(require('jquery'));
    } else {
        root.href = factory(root.jQuery);
    }
}(this, function($) {
    function href(config) {
        var h = document.referrer;
        config.special.forEach(function(e) {
            if (Array.isArray(e.end)) {
                e.end.forEach(function(g) {
                    if (h.slice(-g.length, h.length) === g) location.replace(e.goto);
                })
            } else if (h.slice(-e.end.length, h.length) === e.end) location.replace(e.goto);
        })
        location.replace(config.default);
    }
    return href;
})