function isFirefox() {
    return navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
}
function css(dom, style) {
	if (dom instanceof HTMLElement)
	return getComputedStyle(dom)[style].slice(0, -2);
}
function vikkiScroll(dom) {
    var wrapper = dom.querySelector('.vikki-wrapper');
    var swiper = dom.querySelector('.vikki-swiper');
    var moveWidth = css(swiper,'width');
    var width = css(wrapper,'width');
    var range = width - css(dom,'width');
    dom.onmousewheel = wheelHandler;
    if (isFirefox) dom.addEventListener('DOMMouseScroll', wheelHandler, false);

    function wheelHandler(e) {
        var e = e || window.event;
        var delta = e.wheelDelta || -e.detail;
        var left = getComputedStyle(wrapper)['left'].slice(0, -2);

        if (left <= 0 ) {
            if (delta < 0 && left > -400) left = Number(left) - Number(moveWidth); //右滚
            if (delta > 0 && left < 0 )left = Number(left) + Number(moveWidth); //左滚
        }
        wrapper.style.left = left + 'px';
                console.log(left)
    }
}
var dom = document.getElementById('container');
vikkiScroll(dom);