/**
 * Vikki Pic 组件
 * @constructor
 * @param {Object} config 配置
 * @param {HTMLElement} config.container 包装元素
 * @param {HTMLElement} config.trigger 触发上传事件的元素
 * @param {Boolean} config.multipics 选择只上传一张图片还是多张图片
 * @param {HTMLElement} config.dragArea 拖拽上传区域
 */
var VikkiPic = (function() {
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
                    that.showPic(file);
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
                that.showPic(file);
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

    function VikkiPicFun(config) {
        var triggerEl = config.trigger;
        var container = config.container;
        var dragArea = config.dragArea;
        this.files = []; //也可以直接最简单的var $this = this;
        this.template = container.querySelector('.vikki-img-holder');
        this.multipics = config.multipics;
        remove(this.template);
        _bind(this, triggerEl, dragArea);
    }
    VikkiPicFun.prototype.showPic = function(file) {
        console.log(this)
        var $this = this;
        if (file.type.split('/')[0] !== 'image') return;
        if (file.type !== 'image/png') var $this = this;
        if (!_checkExist(file, $this.files)) return;
        var fr = new FileReader();
        fr.readAsDataURL(file);
        fr.onload = function() {
            var img = new Image();
            img.src = this.result;
            var dom = $this.template.cloneNode(true);
            var newImg = dom.querySelectorAll('.vikki-img');
            var removeBtn;
            for (var i = 0; i < newImg.length; i++) {
                newImg[i].src = this.result;
            }
            if (!$this.multipics) {
                var currentPic = container.querySelector('.vikki-img-holder');
                remove(currentPic);
                $this.files.shift();
            }
            container.insertAdjacentHTML('beforeend', dom.outerHTML);
            removeBtn = last('.vikki-img-holder', container).querySelector('.vikki-img-remove');
            if (removeBtn) removeBtn.addEventListener('click', function() {
                var e = e || window.event;
                var target = e.target;
                $this.deletePic(target);
            }, false);
            $this.files.push(file);
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
})()