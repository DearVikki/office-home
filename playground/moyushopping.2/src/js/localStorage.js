! function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.times = factory();
    }
}(this, function() {
    function ls() {
        var a = arguments;
        if (a.length === 1) return JSON.parse(localStorage.getItem(a[0]));
        else if (a.length === 2) return localStorage.setItem(a[0], JSON.stringify(a[1]));
    }
    return ls;
})