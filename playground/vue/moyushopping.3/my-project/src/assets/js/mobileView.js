! function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.times = factory();
    }
}(this, function() {
    var width = window.innerWidth;
    var viewport = document.querySelector("meta[name=viewport]");
    var densityDpi = 640 / width;
    densityDpi = densityDpi > 1 ? 300 * densityDpi : densityDpi;
    if (isWeixin()) {
        viewport.setAttribute('content', 'width=640, target-densityDpi=' + densityDpi);
    }
    document.querySelector('html').style.fontSize = width/10+'px';

    function isWeixin() {
        var ua = navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
            return true;
        } else {
            return false;
        }
    }
})