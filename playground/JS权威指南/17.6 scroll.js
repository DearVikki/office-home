function isFirefox() {
    return navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
}

function css(dom, style) {
    //判断是否为DOM对象
    if (dom instanceof HTMLElement) return getComputedStyle(dom)[style].slice(0, -2);
}

function vikkiScroll(dom) {
    var wrapper = dom.querySelector('.vikki-wrapper');
    var swiper = dom.querySelectorAll('.vikki-swiper');
    var n = swiper.length;
    var i = 1;
    var moveWidth = css(swiper[0], 'width');
    var width = css(wrapper, 'width');
    var range = width - css(dom, 'width');
    dom.onmousewheel = wheelHandler;
    if (isFirefox) dom.addEventListener('DOMMouseScroll', wheelHandler, false);

    function wheelHandler(e) {
        var e = e || window.event;
        var delta = e.wheelDelta || -e.detail;
        console.log(i);
        if (delta < 0 && i < n) i++; //右滚
        if (delta > 0 && i > 0) i--; //左滚
        wrapper.style.left = -i * Number(moveWidth) + 'px';
    }
}
var dom = document.getElementById('container');
vikkiScroll(dom);