function VikkiPic(config) {
    var fileArray = this.files = []; //也可以直接最简单的var $this = this;
    var input = config.input;
    var container = config.template;
    var template = container.querySelector('.vikki-img-holder');
    var initialStyle = template.style.display;
    template.style.display = 'none';
    input.onchange = function() {
        if (input.files) {
            var file = input.files[0];
            showPic(file);
        } else {
            var src = input.value;
            showPicIE(src);
        }
        fileArray.push(file);
    }

    function showPic(file) {
        console.log('show!')
        var fr = new FileReader();
        fr.readAsDataURL(file);
        fr.onload = function() {
            var img = new Image();
            img.src = this.result;
            var dom = template.cloneNode(true);
            dom.style.display = initialStyle;
            var newImg = dom.querySelectorAll('.vikki-img');
            var removeBtn;
            for (var i = 0; i < newImg.length; i++) {
                newImg[i].src = this.result;
            }
            container.insertAdjacentHTML('beforeend', dom.outerHTML);
            removeBtn = last('.vikki-img-holder', container).querySelector('.vikki-img-remove');
            if (removeBtn) removeBtn.addEventListener('click', deletePic, false);
        }
    }

    function showPicIE(src) {
        src = 'file:///'+src;
        console.log(src)
        var imgDiv = document.createElement('div');
        document.body.appendChild(imgDiv);
        imgDiv.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod = scale)";
        imgDiv.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = src;
        container.appendChild(imgDiv)
    }

    function deletePic() {
        console.log('hey')
        var e = e || window.event;
        var target = e.target;
        var holder = parent(target, '.vikki-img-holder');
        var index = domIndex(holder, '.vikki-img-holder', container) - 1;
        remove(holder);
        fileArray.splice(index, 1);
    }
}