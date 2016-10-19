! function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(require('jquery'));
    } else {
        root.noResult = factory(root.jQuery);
    }
}(this, function($) {
    function noResult(result, page,timeout) {
        var $nomore = $('#no-more');
        if (result == '') {
            if (page > 1) {
                $nomore.show();
                //$(window).off('scroll');
                //clearTimeout(timeout);
            }
            else $('body').append('<div class="nothing-alert">无相关数据</div>');
        }
    }
    function myAlert(t){
        $('body').append('<div class="my-alert">'+t+'</div>');
        setTimeout(function(){
            $('.my-alert').remove();
        },1000)
    }
    return {noResult:noResult,myAlert:myAlert}
})