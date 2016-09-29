define(function() {
    var max = false;

    function _bind(that, triggerEl, dragArea) {
        console.log(container) //为什么container有定义
        var input = document.createElement('input');
        input.type = 'file';
        input.style.display = 'none';
        container.appendChild(input);
        triggerEl.addEventListener('click', function() {
            input.click();
        })
        input.onchange = function() {
                if (input.files) {
                    var file = input.files[0];
                    that.showFile(file);
                } else {
                    var src = input.value;
                    that.showPicIE(src);
                }
                input.value = '';
            }
            //是否拖拽上传
        if (dragArea) {
            dragArea.addEventListener('dragover', function(e) {
                e.preventDefault();
            });
            dragArea.addEventListener('drop', function(e) {
                e.preventDefault();
                var file = e.dataTransfer.files[0];
                that.showFile(file);
            })
        }
    }

    function _checkExist(file, fileArray) {
        var exist = true;
        for (var i = 0; i < fileArray.length; i++) {
            if (fileArray[i].name === file.name) {
                exist = false;
                break;
            }
        }
        return exist;
    }

    function _checkMax(that) {
        if (that.files.length >= that.max) {
            trigger(container, 'maxImg');
            max = true;
        } else {
            trigger(container, 'unmaxImg');
            max = false;
        }
        console.log(max)
    }

    function _showPic(that, src) {
        var dom = that.template.cloneNode(true);
        var newImg = dom.querySelectorAll('.vikki-img');
        var removeBtn;
        for (var i = 0; i < newImg.length; i++) {
            newImg[i].src = src;
        }
        if (!that.multipics) {
            var currentPic = container.querySelector('.vikki-img-holder');
            remove(currentPic);
            that.files.shift();
        }
        container.insertAdjacentHTML('beforeend', dom.outerHTML);
        removeBtn = last('.vikki-img-holder', container).querySelector('.vikki-img-remove');
        if (removeBtn) removeBtn.addEventListener('click', function() {
            var e = e || window.event;
            var target = e.target;
            that.deletePic(target);
        }, false);
    }

    function VikkiPicFun(config) {
        var triggerEl = config.trigger;
        var container = config.container;
        var dragArea = config.dragArea;
        this.files = []; //也可以直接最简单的var $this = this;
        this.template = container.querySelector('.vikki-img-holder');
        this.multipics = config.multipics;
        this.max = config.max; //如何不作为属性挂在上面呢？
        remove(this.template);
        _bind(this, triggerEl, dragArea);
    }
    VikkiPicFun.prototype.showFile = function(file) {
        if (file.type.split('/')[0] !== 'image' || max) return;
        var $this = this;
        if (!_checkExist(file, $this.files)) return;
        var fr = new FileReader();
        fr.readAsDataURL(file);
        fr.onload = function() {
            _showPic($this, this.result);
            $this.files.push(file);
            _checkMax($this);
        }
    }
    VikkiPicFun.prototype.showPicIE = function() {}
    VikkiPicFun.prototype.deletePic = function(target) {
        var holder = parent(target, '.vikki-img-holder');
        var index = domIndex(holder, '.vikki-img-holder', container);
        remove(holder);
        this.files.splice(index, 1);
    }
    return VikkiPicFun;
})