Object.defineProperty(Object.prototype, 'extend', {
    writable: true,
    enumerable: true,
    configurable: false,
    value: function(that) {
        var prop = Object.getOwnPropertyNames(that);
        prop.forEach(function(p) {
            console.log('x' in this)
        	console.log(p in this)
            if (!p in this) {
            	console.log('add in!')
                var des = Object.getOwnPropertyDescriptor(that, p);
                Object.defineProperty(this, p, des);
            }
        })
    }
})
Object.defineProperty(Object.prototype, 'extend', {
    writable: true,
    enumerable: true,
    configurable: false,
    value: function(that) {
        var prop = Object.getOwnPropertyNames(that);
        for (var i = 0; i < prop.length; i++) {
        	console.log('x' in this)
            if (prop[i] in this) continue;
            var des = Object.getOwnPropertyDescriptor(that, prop[i]);
            Object.defineProperty(this, prop[i], des);
        }
    }
})