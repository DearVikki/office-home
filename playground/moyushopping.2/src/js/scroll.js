! function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(require('jquery'));
    } else {
        root.times = factory(root.jQuery);
    }
}(this, function($) {
    var w = $(window);

    function scrollToEnd(cb) {
        var timeout;
        w.on('scroll', function() {
                var scrollTop = w.scrollTop();
                var viewHeight = w.height();
                var pageHeight = $(document).height();
                if (scrollTop + viewHeight >= pageHeight - 2 && scrollTop !== 0) {
                    cb();
                    w.off('scroll');
                    timeout = setTimeout(scrollToEnd.bind(this, cb), 500);
                }
            })
            //return timeout;
    }
    return scrollToEnd;
})