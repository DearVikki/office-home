! function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(require('jquery'));
    } else {
        root.hideReminder = factory(root.jQuery);
    }
}(this, function($) {
    function hideReminder(e) {
        $(e.input).on('focus', function() {
            $(e.reminder).hide();
        })
    }
    return hideReminder;
})