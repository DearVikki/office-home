/**
 * Vikki Pic 组件
 * @constructor
 * @param {Object} config 配置
 * @param {HTMLElement} config.container 包装元素
 * @param {HTMLElement} config.trigger 触发上传事件的元素
 * @param {Boolean} config.multipics 选择只上传一张图片还是多张图片
 * @param {HTMLElement} config.dragArea 拖拽上传区域
 */
function VikkiPic(config) {
    var fileArray = this.files = []; //也可以直接最简单的var $this = this;
    var triggerEl = config.trigger;
    var container = config.container;
    var template = container.querySelector('.vikki-img-holder');
    var multipics = config.multipics;
    var dragArea = config.dragArea;
    remove(template);

    var input = document.createElement('input');
    input.type = 'file';
    input.style.display = 'none';
    container.appendChild(input);
    triggerEl.addEventListener('click',function(){
        input.click();
    })

    input.onchange = function() {
        if (input.files) {
            var file = input.files[0];
            showPic(file);
        } else {
            var src = input.value;
            showPicIE(src);
        }
        input.value = '';
    }

    //是否拖拽上传
    if(dragArea) {
        dragArea.addEventListener('dragover', function(e){
            e.preventDefault();
        });
        dragArea.addEventListener('drop', function(e){
            e.preventDefault();
            var file = e.dataTransfer.files[0];
            showPic(file);
        })
    }

    function checkExist(file){
        var exist = true;
        for(var i=0; i<fileArray.length; i++){
            if(fileArray[i].name === file.name) {
                exist = false;
                break;
            }
        }
        return exist;
    }

    function showPic(file) {
        if(!checkExist(file)) return;
        var fr = new FileReader();
        fr.readAsDataURL(file);
        fr.onload = function() {
            var img = new Image();
            img.src = this.result;
            var dom = template.cloneNode(true);
            var newImg = dom.querySelectorAll('.vikki-img');
            var removeBtn;
            for (var i = 0; i < newImg.length; i++) {
                newImg[i].src = this.result;
            }
            if(!multipics){
                var currentPic = container.querySelector('.vikki-img-holder');
                remove(currentPic);
                fileArray.shift();
            }
            container.insertAdjacentHTML('beforeend', dom.outerHTML);
            removeBtn = last('.vikki-img-holder', container).querySelector('.vikki-img-remove');
            if (removeBtn) removeBtn.addEventListener('click', deletePic, false);
            fileArray.push(file);
        }
    }

    function showPicIE(src) {
        src = 'file:///'+src;
        var imgDiv = document.createElement('div');
        document.body.appendChild(imgDiv);
        imgDiv.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod = scale)";
        imgDiv.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = src;
        container.appendChild(imgDiv)
    }

    function deletePic() {
        var e = e || window.event;
        var target = e.target;
        var holder = parent(target, '.vikki-img-holder');
        var index = domIndex(holder, '.vikki-img-holder', container);
        remove(holder);
        fileArray.splice(index, 1);
    }
}