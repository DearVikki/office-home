var $ = require('jquery');
var w = $(window);

function scrollToEnd(cb) {
    w.on('scroll', function() {
        var scrollTop = w.scrollTop();
        var viewHeight = w.height();
        var pageHeight = $(document).height();
        if (scrollTop + viewHeight >= pageHeight - 2) {
            cb();
            w.off('scroll');
            setTimeout(scrollToEnd.bind(this,cb), 1500);
        }
    })
}
module.exports = scrollToEnd;