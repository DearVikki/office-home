require('public');
require('./css/common-alert.less');
require('./css/common-btn.less');
require('./css/common-num-editor.less');
require('./css/product.less');
require('initial');
require('headerfooter');
var ajax = require('ajax').ajax,
    visitorAjax = require('ajax').visitorAjax;
require('./js/historyBack.js');
var $ = require('jquery');
var V = require('./js/validator');
var qs = require('./js/queryString');
require('./lib/swiper.min.css');
var S = require('./lib/swiper.jquery.umd.js');
var myAlert = require('./js/alert.js').myAlert;
require('./js/numEdit.js');
$('.back').back();
var $commentUl = $('#comment ul'),
    $cover = $('.cover'),
    $btn = $('.common-btn'),
    $optprice = $('.opt-price'),
    $optstock = $('.opt-storage'),
    $simg = $('.small-img'),
    $num = $('.num'),
    $numEdit = $('.num-edit'),
    $collect = $('.collection')
var id = qs('id'),
    goodsId;
//初始化部分
visitorAjax({
    data: {
        name: 'shopping.sys.goods.info',
        pre_goods_id: id
    },
    success: function(result) {
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
        $optprice.text('￥' + goodsInfo.price);
        $('.sell').text(goodsInfo.sales_num);
        $('.storage').text(goodsInfo.stock);
        $optstock.text('库存' + goodsInfo.stock + '件');
        if (goodsInfo.is_collected) $collect.addClass('active');
        $('.good-rate').text(goodsInfo.feedback_rate + '%');
        $('.comment-num').text(goodsInfo.comment_num);
        commentInfo.forEach(function(e) {
            $commentUl.append('<li class="comment-item"><div style="margin-top:.2rem"><span class="star"></span><span class="fr name">' + e.comment_user_nickname + '</span></div><div class="text">' + e.content + '</div></li>')
            var $li = $commentUl.find('li').last();
            for (var i = 1; i < e.star_num; i++) {
                $li.find('.star').append('<img src="image/purchase/common_star_selected@2x.png"/>');
            }
            if (is_picture) $li.append('<div class="show"></show>');
            e.comment_pic.forEach(function(p) {
                $li.find('.show').append('<img src="' + p + '"/>')
            });
            if (is_reply) $li.append('<div class="fr reply"><span>商家回复：' + e.reply_comment.content + '</span></div>');
        })
        if (commentInfo.length === 0) {
            $commentUl.append('<p class="no-comment">暂无评价</p>')
        }
    }
})
visitorAjax({
    data: {
        name: 'shopping.sys.goods.detail.pic',
        pre_goods_id: id
    },
    success: function(result) {
        var $imgs = $('.imgs');
        result.data.detail_pic.forEach(function(e) {
            $imgs.append('<img src="' + e + '" />');
        })
    }
})
visitorAjax({
    data: {
        name: 'shopping.sys.goods.attribute',
        pre_goods_id: id
    },
    success: function(result) {
        var $main = $('.main');
        var $num = $('.compulsory-option');
        $simg.attr('src', result.data.picture);
        result.data.attribute_info.forEach(function(e) {
            $num.before('<div class="optional-option"><span class="opt-title">' + e.name + '</span><ul></ul></div>');
            var $option = $('.optional-option').last().find('ul');
            e.list.forEach(function(l) {
                $option.append('<li class="opt-item color" data-attribute=' + l.attribute_id + '>' + l.attribute_value + '</li>');
            })
        })
        var v = new V('.main', [{
            field: '.optional-option',
            custom: {
                rule: function(target) {
                    return target.hasClass('active') ? true : false;
                }
            },
            beforeCheck: function(target, eventTarget) {
                eventTarget.addClass('active');
                eventTarget.siblings().removeClass('active');
                target.addClass('active');
            },
            checkEvent: 'click',
            checkAll: true
        }])
    }
})
$('.num-edit').numEdit({
        plus: '.num-add',
        num: '.num',
        minus: '.num-minus'
    })
    //拉取购物车数量
function cartNum() {
    visitorAjax({
        data: {
            name: 'shopping.sys.shop.cart.count'
        },
        success: function(result) {
            var count = result.data.goods_count;
            if (count > 0) {
                $('.cart-num').text(count).addClass('active');
            }
        }
    })
}
cartNum();
//真正的交互部分
$('.add-cart').on('click', function() {
    $cover.show();
})
$('.opt-close').on('click', function() {
        $cover.hide();
    })
    //拉取库存
$('.main').on('validateAllPass', function() {
        var $opts = $('.opt-item.active');
        var attribute = [];
        Array.prototype.slice.call($opts).forEach(function(e) {
            attribute.push($(e).data('attribute'));
        })
        ajax({
            data: {
                name: 'shopping.sys.goods.detail',
                pre_goods_id: id,
                attribute: attribute.sort().toString()
            },
            success: function(result) {
                var goodsInfo = result.data.goods_info;
                $optprice.text('￥' + goodsInfo.price);
                $optstock.text('库存' + goodsInfo.stores + '件');
                $simg.attr('src', goodsInfo.picture);
                $numEdit.data('max', goodsInfo.stores);
                if (goodsInfo.stores > 0) {
                    $btn.addClass('active');
                    $numEdit.data('min', 1);
                } else $numEdit.data('min', 0);
                $numEdit.numInitial();
                goodsId = goodsInfo.goods_id;
            }
        })
    })
    //加入购物车
$btn.on('click', function() {
        if (!$(this).hasClass('active')) return;
        ajax({
            data: {
                name: 'shopping.sys.add.goods',
                goods_id: goodsId,
                goods_num: $num.text()
            },
            success: function(result) {
                if (result.code === 1000) {
                    myAlert('加入成功');
                    $cover.hide();
                    cartNum();
                }
            }
        })
    })
    //收藏/取消收藏
$collect.on('click', function() {
    var data = {
        for_type: 'pre_goods',
        for_id: id
    };
    var state = $collect.hasClass('active');
    if (state) data.name = 'shopping.sys.collect.cancel';
    else data.name = 'shopping.sys.collect';
    ajax({
        data: data,
        success: function(result) {
            if (state) myAlert('取消收藏成功');
            else myAlert('收藏成功');
            $collect.toggleClass('active');
        }
    })
})