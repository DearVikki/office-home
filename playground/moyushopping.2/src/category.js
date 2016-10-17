require('public');
require('headerfooter');
require('./css/category.less');
var $ = require('jquery');
require('initial');
var ajax = require('ajax');
ajax({
    data: {
        name: 'shopping.sys.category.info'
    },
    success: function(data, status) {
        var categoryInfo = data.data['CategoryInfo'];
        categoryInfo.forEach(function(e, index) {
            var menu = e.category_menu;
            var type = 'type' + index;
            $('.swiper-wrapper').append('<a class="tab-item swiper-slide" data-type="' + type + '">' + e.class_name + '</a>');
            menu.forEach(function(e) {
                $('#category-container ul').append('<a class="ca-item ' + type + '" data-id="' + e.class_append_id + '" href="goodsType.html?cate=' + e.class_append_id + '" ><img class="ca-img" src="' + e.imgurl + '"><p class="ca-name">' + e.class_name + '</p></img></a>');
            });
        });
        /*new Swiper('.swiper-container', {
            direction: 'vertical',
            slidesPerView: 10,
            freeMode: true
        });*/
        //默认是打开常用分类
        $('.tab-item:first-child').click();
    }
});
//点击tab
$('#tab-container').on('click', '.tab-item', function() {
    var type = $(this).data('type');
    $('.tab-item.active').removeClass('active');
    $(this).addClass('active');
    $('.ca-item.active').removeClass('active');
    $('.ca-item.' + type).addClass('active');
});