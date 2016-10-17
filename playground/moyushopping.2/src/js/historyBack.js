! function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(require('jquery'));
    } else {
        root.times = factory(root.jQuery);
    }
}(this, function($) {
    $.fn.back = function() {
        this.on('click', function() {
            window.history.back();
        })
    }
})