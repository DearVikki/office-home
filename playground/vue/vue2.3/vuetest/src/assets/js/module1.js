! function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.noResult = factory();
    }
}(this, function() {
    function myAlert() {
        alert('It works!')
    }
    return myAlert;
})