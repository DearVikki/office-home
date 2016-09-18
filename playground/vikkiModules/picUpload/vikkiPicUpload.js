function VikkiPic(config) {
    var fileArray = this.files = [];
    var input = config.input;
    var container = config.template;
    var template = container.querySelector('.vikki-img-holder');
    var initialStyle = template.style.display;
    template.style.display = 'none';
    input.onchange = function() {
        var file = input.files[0];
        showPic(file);
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
            removeBtn.addEventListener('click', deletePic, false);
        }
    }

    function deletePic() {
        console.log('hey')
        var e = e || window.event;
        var target = e.target;
        //parents()及children()如何实现?
        var holder = target.parentNode;
        var index = domIndex(holder, '.vikki-img-holder', container) - 1;
        remove(holder);
        fileArray.splice(index, 1);
    }
}