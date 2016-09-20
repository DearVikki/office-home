//map dom elements
function map(els, f) {
    for (var i = 0; i < els.length; i++) {
        f.call(els[i]);
    }
}
//remove child
function remove(el) {
    if (el instanceof HTMLElement) el.parentNode.removeChild(el);
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
//得到dom数组
function domArray(selector, container) {
    if (!container) container = document;
    //console.log(container)
    //var parser = new DOMParser,
    //doc = parser.parseFromString(container, "text/html");
    //console.log(doc)
    var dom = container.querySelectorAll(selector);
    return Array.prototype.slice.call(dom);
}
//index
function domIndex(el, selector, container) {
    var list = domArray(selector, container);
    return list.indexOf(el);
}
//last child
function last(selector, container) {
    var dom = domArray(selector, container);
    return dom[dom.length - 1];
}
//.parents('')
function parents(el, selector) {
    var selectorArray = domArray(selector);
    var parentsArray = [];

    function findIte(el) {
        var parent = el.parentNode;
        if (parent.nodeName === '#document') return parentsArray;
        if (selectorArray.indexOf(parent) > -1) parentsArray.push(parent);
        return findIte(parent);
    }
    return findIte(el);
}
//.parent()
function parent(el, selector) {
    var selectorArray = domArray(selector);
    var parentDom;

    function findIte(el) {
        var parent = el.parentNode;
        if (parent.nodeName === '#document') return;
        if (selectorArray.indexOf(parent) > -1) return parentDom = parent;
        return findIte(parent);
    }
    return findIte(el);
}
//.children()
function children(el, selector) {
    return domArray(selector, el);
}
//radio
function radioToggle(parentEl) {
    parentEl.addEventListener('click', checkOrUncheck, false);

    function checkOrUncheck(e) {
        var e = e || window.event;
        var target = e.target;
        var radios = parentEl.querySelectorAll('input[type=radio]');
        //e.preventDefault();
        if (target.type === 'radio') {
            console.log(target.checked);
            //target.checked = !target.checked;
            //target.removeAttribute('checked');
            /*else {
                map(radios, function() {
                    this.checked = false;
                })
                target.checked = 'checked';
            }*/
        }
    }
}