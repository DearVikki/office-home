! function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else if (typeof exports === 'object') {
        console.log('commonjs')
        module.exports = factory();
    } else {
        console.log('normal')
        root.times = factory();
    }
}(this, function() {
    function Countdown(config) {
        var p = config.text;
        var t = config.time;
        var s = config.start;
        var e = config.end;
        if(typeof s === 'function') s();
        document.querySelector(p).innerHTML = --t;
        var i = setInterval(function() {
            document.querySelector(p).innerHTML = --t;
            if (t == 0) {
                clearInterval(i);
                document.querySelector(p).innerHTML = '';
                if(typeof e === 'function') e();
            };
        }, 1000)
    }
    return Countdown;
})