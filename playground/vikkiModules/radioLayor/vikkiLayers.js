function VikkiLayers(el) {
    var children = Array.prototype.slice.call(el.childNodes);
    var relations = {};
    var leaders = [];
    var followers = [];
    var initialDoms = Array.prototype.slice.call(el.querySelectorAll('.vikki-on'));
    //遍历dom类数组函数
    function domEach(array, f) {
        for (var i = 0; i < array.length; i++) {
            f.call(array[i]);
        }
    }
    //初始化relations
    children.forEach(function(e) {
        if (e.id) {
            var id = e.id;
            var r = [];
            domEach(children, function() {
                try {
                    if (this.getAttribute('data-to') === id) r.push(this);
                } catch (err) {}
            });
            relations[id] = r;
        }
    });
    console.log(relations);

    function toggleClass(el, name, cb) {
        var classList = el.classList;
        if (classList.contains(name)) {
            classList.remove(name);
            cb.remove(el, name);
        } else {
            classList.add(name);
            cb.add(el, name);
        }
    }

    function findFollowers(el, f) {
        if (!relations[el.id]) return;
        relations[el.id].forEach(function(e) {
            f(e);
            findFollowers(e, f);
        })
    }

    function findLeaders(el, f) {
        var id = el.getAttribute('data-to');
        var leader = document.getElementById(id);
        if (!leader) return;
        f(leader);
        findLeaders(leader, f);
    }
    var leadersEvent = {
        add: function(el, name) {
            findFollowers(el, function(e) {
                e.classList.add(name);
            })
        },
        remove: function(el, name) {
            findFollowers(el, function(e) {
                e.classList.remove(name);
            })
        }
    }
    var followersEvent = {
        add: function(el, name) {
            var state = true;
            findLeaders(el, function(e) {
                findFollowers(e, function(g) {
                    if (!g.classList.contains(name)) state = false;
                })
                if (state) e.classList.add(name);
            })
        },
        remove: function(el, name) {
            findLeaders(el, function(e) {
                e.classList.remove(name);
            })
        }
    }
    var cb = {
        add: function(el, name) {
            leadersEvent.add(el, name);
            followersEvent.add(el, name);
        },
        remove: function(el, name) {
            leadersEvent.remove(el, name);
            followersEvent.remove(el, name);
        }
    }

    function eventHandler(e) {
        toggleClass(this, 'vikki-on', cb);
    }
    //绑定事件
    domEach(children, function() {
        if (this.nodeType !== 3 && (this.id || this.hasAttribute('data-to'))) {
            this.addEventListener('click', eventHandler, false);
        }
    });
    //初始化选中的dom
    initialDoms.forEach(function(e) {
        findFollowers(e, function(e){
            e.classList.add('vikki-on');
        })
    });
}