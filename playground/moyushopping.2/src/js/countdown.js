! function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(require('jquery'));
    } else {
        root.times = factory(root.jQuery);
    }
}(this, function($) {
    function Countdown(config) {
        var $p = $(config.text);
        var t = config.time;
        var s = config.start;
        var e = config.end;
        s();
        var i = setInterval(function(cb) {
            $p.text(--t);
            if (t == 0) {
                clearInterval(i);
                $p.text('');
                e();
            };
        }, 1000)
    }
    return Countdown;
})