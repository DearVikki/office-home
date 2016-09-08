//jQuery.fn.on
//事件名称、被委托事件、额外信息
function(types, selector, data, fn,
    /*INTERNAL*/
    one) {
    var type, origFn;
    //调整参数
    // Types can be a map of types/handlers
    if (typeof types === "object") {
        // ( types-Object, selector, data )
        if (typeof selector !== "string") {
            // ( types-Object, data )
            data = data || selector;
            selector = undefined;
        }
        for (type in types) {
            this.on(type, selector, data, types[type], one);
        }
        return this;
    }
    if (data == null && fn == null) {
        // ( types, fn )
        fn = selector;
        data = selector = undefined;
    } else if (fn == null) {
        if (typeof selector === "string") {
            // ( types, selector, fn )
            fn = data;
            data = undefined;
        } else {
            // ( types, data, fn )
            fn = data;
            data = selector;
            selector = undefined;
        }
    }
    if (fn === false) {
        fn = returnFalse;
    } else if (!fn) {
        return this;
    }
    if (one === 1) {
        origFn = fn;
        fn = function(event) {
            // Can use an empty set, since event contains the info
            jQuery().off(event);
            return origFn.apply(this, arguments);
        };
        // Use same guid so caller can remove using origFn
        fn.guid = origFn.guid || (origFn.guid = jQuery.guid++);
    }
    return this.each(function() {
        jQuery.event.add(this, types, fn, data, selector);
    });
}
//jQuery.event.add
function(elem, types, handler, data, selector) {
    var tmp, events, t, handleObjIn, special, eventHandle, handleObj, handlers, type, namespaces, origType, elemData = jQuery._data(elem);
    // Don't attach events to noData or text/comment nodes (but allow plain objects)
    if (!elemData) {
        return;
    }
    // Caller can pass in an object of custom data in lieu of(来替代) the handler
    if (handler.handler) {
        handleObjIn = handler;
        handler = handleObjIn.handler;
        selector = handleObjIn.selector;
    }
    // Make sure that the handler has a unique ID, used to find/remove it later
    if (!handler.guid) {
        handler.guid = jQuery.guid++;
    }
    // Init the element's event structure and main handler, if this is the first
    if (!(events = elemData.events)) {
        events = elemData.events = {};
    }
    if (!(eventHandle = elemData.handle)) {
        eventHandle = elemData.handle = function(e) {
            // Discard(抛弃) the second event of a jQuery.event.trigger() and
            // when an event is called after a page has unloaded
            return typeof jQuery !== strundefined && (!e || jQuery.event.triggered !== e.type) ? jQuery.event.dispatch.apply(eventHandle.elem, arguments) : undefined;
        };
        // Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
        eventHandle.elem = elem;
    }
    // Handle multiple events separated by a space
    types = (types || "").match(rnotwhite) || [""];
    t = types.length;
    while (t--) {
        tmp = rtypenamespace.exec(types[t]) || [];
        type = origType = tmp[1];
        namespaces = (tmp[2] || "").split(".").sort();
        // There *must* be a type, no attaching namespace-only handlers
        if (!type) {
            continue;
        }
        // If event changes its type, use the special event handlers for the changed type
        special = jQuery.event.special[type] || {};
        // If selector defined, determine special event api type, otherwise given type
        type = (selector ? special.delegateType : special.bindType) || type;
        // Update special based on newly reset type
        special = jQuery.event.special[type] || {};
        // handleObj is passed to all event handlers
        handleObj = jQuery.extend({
            type: type,
            origType: origType,
            data: data,
            handler: handler,
            guid: handler.guid,
            selector: selector,
            needsContext: selector && jQuery.expr.match.needsContext.test(selector),
            namespace: namespaces.join(".")
        }, handleObjIn);
        // Init the event handler queue if we're the first
        if (!(handlers = events[type])) {
            handlers = events[type] = [];
            handlers.delegateCount = 0;
            // Only use addEventListener/attachEvent if the special events handler returns false
            if (!special.setup || special.setup.call(elem, data, namespaces, eventHandle) === false) {
                // Bind the global event handler to the element
                if (elem.addEventListener) {
                    elem.addEventListener(type, eventHandle, false);
                } else if (elem.attachEvent) {
                    elem.attachEvent("on" + type, eventHandle);
                }
            }
        }
        if (special.add) {
            special.add.call(elem, handleObj);
            if (!handleObj.handler.guid) {
                handleObj.handler.guid = handler.guid;
            }
        }
        // Add to the element's handler list, delegates in front
        if (selector) {
            handlers.splice(handlers.delegateCount++, 0, handleObj);
        } else {
            handlers.push(handleObj);
        }
        // Keep track of which events have ever been used, for event optimization
        jQuery.event.global[type] = true;
    }
    // Nullify elem to prevent memory leaks in IE
    elem = null;
}

//jQuery._data
function (elem, name, data) {
    return internalData(elem, name, data, true); //?
}