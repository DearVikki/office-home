! function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(require('jquery'));
    } else {
        root.times = factory(root.jQuery);
    }
}(this, function($) {
    var h = $('html');
    var width = h.width();
    var viewport = document.querySelector("meta[name=viewport]");
    var densityDpi = 640 / width;
    densityDpi = densityDpi > 1 ? 300 * densityDpi : densityDpi;
    if (isWeixin()) {
        viewport.setAttribute('content', 'width=640, target-densityDpi=' + densityDpi);
    }
    h.css('font-size', width / 10 + 'px');

    function isWeixin() {
        var ua = navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
            return true;
        } else {
            return false;
        }
    }
})