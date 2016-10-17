require('public');
require('./css/common-alert.less');
require('./css/product.less');
require('initial');
require('headerfooter');
var ajax = require('ajax');
require('./js/historyBack.js');
var $ = require('jquery');
var qs = require('./js/queryString');
require('./lib/swiper.min.css');
var S = require('./lib/swiper.jquery.umd.js');
$('.back').back();
var $commentUl = $('#comment ul');
ajax({
    data: {
        name: 'shopping.sys.goods.info',
        pre_goods_id: qs('id')
    },
    success: function(result) {
        console.log(result.data)
        var goodsInfo = result.data.pre_goods_info;
        var commentInfo = result.data.comment_info;
        goodsInfo.banner_pic.forEach(function(e) {
            $('.swiper-wrapper').append('<div class="banner swiper-slide"><img src="' + e + '" /></div>');
        })
        new S('.swiper-container.banner-container', {
            pagination: '.swiper-pagination',
            loop: true,
            paginationClickable: true
        })
        $('.title').text(goodsInfo.description);
        $('.price').text(goodsInfo.price);
        $('.sell').text(goodsInfo.sales_num);
        $('.storage').text(goodsInfo.stock);
        $('.good-rate').text(goodsInfo.feedback_rate + '%');
        $('.comment-num').text(goodsInfo.comment_num);
        commentInfo.forEach(function(e) {
            $commentUl.append('<li class="comment-item"><div style="margin-top:.2rem"><span class="star"></span><span class="fr name">'+ e.comment_user_nickname+'</span></div><div class="text">'+e.content+'</div></li>')
       		var $li = $commentUl.find('li').last();
       		for(var i=1;i<e.star_num;i++){
       			$li.find('.star').append('<img src="image/purchase/common_star_selected@2x.png"/>');
       		}
       		if(is_picture) $li.append('<div class="show"></show>');
       		e.comment_pic.forEach(function(p){
       			$li.find('.show').append('<img src="'+p+'"/>')
       		});
       		if(is_reply) $li.append('<div class="fr reply"><span>商家回复：'+e.reply_comment.content+'</span></div>');
       })
        if (commentInfo.length === 0) {
        	console.log('hey')
        	$commentUl.append('<p class="no-comment">暂无评价</p>')
        }
    }
})