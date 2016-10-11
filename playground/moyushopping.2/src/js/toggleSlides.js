! function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(require('jquery'));
    } else {
        root.times = factory(root.jQuery);
    }
}(this, function($) {
    function Slides(config) {
        var $slides = $(config.slides);
        var len = $slides.length;
        var $next = $(config.next);
        var $prev = $(config.prev);
        var custom = config.custom;
        var first = config.first;
        var last = config.last;
        var mid = config.mid;
        var currentc = 'slide-active';
        $slides.each(function(e) {
            $(this).data('slide', e);
        })
        for (key in custom) {
            $(key).data('custom', custom[key]);
        }
        $next.on('click', function() {
            var $this = $(config.slides + '.' + currentc);
            var $next = $this.next();
            var customF = $this.data('custom');
            if ($slides.index($this) >= len - 1) return;
            if (typeof customF === 'function' && !customF($this)) return;
            $this.hide().removeClass(currentc);
            $next.show().addClass(currentc);
            if(typeof mid === 'function') mid();
            if($slides.index($next) >= len - 1 && typeof last === 'function') last();
        })
        $prev.on('click', function() {
            var $this = $(config.slides + '.' + currentc);
            var $prev = $this.prev();
            if ($slides.index($this) === 0) return;
            $this.hide().removeClass(currentc);
            $prev.show().addClass(currentc);
            config.prevCb($this);
            if(typeof mid === 'function') mid();
            if($slides.index($prev) === 0 && typeof first === 'function') first();
        })
        $slides.first().addClass(currentc);
    }
    return Slides;
})