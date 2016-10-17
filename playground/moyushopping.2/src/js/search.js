! function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(require('jquery'));
    } else {
        root.search = factory(root.jQuery);
    }
}(this, function($) {
    var $search = $('#search');
    $search.on('focus', function() {
        location.href = 'searchPage.html';
    })
})