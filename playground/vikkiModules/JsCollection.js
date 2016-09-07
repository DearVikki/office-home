//remove child
function remove(el) {
    if (type instanceof HTMLElement) el.parentNode.removeChild(el);
}
//trigger
function trigger(el, event, detail) {
	var native = function(){return typeof HTMLElement.prototype[eventName] === 'function'};
    if (typeof CustomEvent === 'function') {
        var evt = new CustomEvent(event,{bubbles:true,detail:detail})
    } else {
        var evt = document.createEvent('Event');
        evt.initEvent(event, true, false);
    }
    el.dispatchEvent(evt);
}