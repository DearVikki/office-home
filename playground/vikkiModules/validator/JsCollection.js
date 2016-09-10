//map dom elements
function map(els, f) {
    for (var i = 0; i < els.length; i++) {
        f.call(els[i]);
    }
}
//remove child
function remove(el) {
    if (type instanceof HTMLElement) el.parentNode.removeChild(el);
}
//trigger
function trigger(el, event, detail) {
    var native = function() {
        return typeof HTMLElement.prototype[eventName] === 'function'
    };
    if (typeof CustomEvent === 'function') {
        var evt = new CustomEvent(event, {
            bubbles: true,
            detail: detail
        })
    } else {
        var evt = document.createEvent('Event');
        evt.initEvent(event, true, false);
    }
    el.dispatchEvent(evt);
}
//radio
function radioToggle(parentEl) {
    parentEl.addEventListener('click', checkOrUncheck, false);

    function checkOrUncheck(e) {
        var e = e || window.event;
        var target = e.target;
        var radios = parentEl.querySelectorAll('input[type=radio]');
        e.preventDefault();
        if (target.type === 'radio') {
        	console.log(target.checked) //总是为true啊
            if (target.checked) target.checked = false;
            /*else {
                map(radios, function() {
                    this.checked = false;
                })
                target.checked = 'checked';
            }*/
        }
    }
}