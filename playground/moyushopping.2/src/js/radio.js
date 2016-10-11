! function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(require('jquery'));
    } else {
        root.times = factory(root.jQuery);
    }
}(this, function($) {
    function Radio(containerClass, radioClass, type, cb) {
        var container = $(containerClass);

        function bind(e) {
            var radio = $(e).find(radioClass);
            radio.on('click', function() {
                if (type === 'multi') {
                    $(this).toggleClass('active');
                } else {
                    radio.removeClass('active');
                    $(this).addClass('active');
                }
                if (typeof cb === 'function') cb();
            })
        }
        Array.prototype.slice.call(container).forEach(bind);
    }
    return Radio;
})