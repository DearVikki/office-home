require('public');
require('headerfooter');
var css = './css/';
require(css + 'index.less');
require(css + 'common-display-list.less');
require(css + 'common-divider.less');
var $ = require('jquery');
require('initial');
var scroll = require('./js/scroll.js');
var ajax = require('ajax');
var page = 1;
var $container = $('.recommend-container');
require('./lib/swiper.min.css');
var S = require('./lib/swiper.jquery.umd.js');
var mySwiper1 = new S('.swiper-container.banner-container', {
    pagination: '.swiper-pagination',
    loop: true,
    paginationClickable: true,
    autoplay: 4000,
    autoplayDisableOnInteraction: false
})
var mySwiper2 = new S('.sale-container .swiper-container', {
    pagination: '.swiper-pagination',
    slidesPerView: '4',
    paginationClickable: true
});
scroll(function() {
    ajax({
        data: {
            name: 'shopping.sys.hot.goods',
            page: page
        },
        success: function(data) {
            var goods = data.data.hotgoods;
            $.each(goods, function(index) {
                $container.find('ul').append('<li class="item"><img src="' + this.cover_pic + '" /><div class="item-detail"><span class="title">' + this.description + '</span><span class="price">+' + this.price + '</span></div></li>');
            })
            page++;
            if (data.data.hotgoods.length == 0) {
                $('#no-more').show();
                $(window).off('scroll');
            }
        }
    })
})