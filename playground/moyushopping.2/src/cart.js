require('public');
require('./css/common-alert.less');
require('./css/common-input.less');
require('./css/common-num-editor.less');
require('./css/cart.less');
require('initial');
require('headerfooter');
var ajax = require('ajax').ajax;
var R = require('./js/radio');
require('./js/historyBack.js');
var $ = require('jquery');
var myAlert = require('./js/alert.js').myAlert;
require('./js/numEdit.js');
new R('body', '.radio', 'multi')
$('.back').back();
ajax({
    data: {
        name: 'shopping.sys.shop.cart'
    },
    success: function(data) {
        var item = data.data.shop_cart_info;
        if (item.length == 0) {
            $('#cart-container,#cart-footer,label.edit').remove();
            $('#empty-container').show();
        } else {
            $('#cart-container').append('<div class="cart"><div class="shop"><div class="common-radio-group"><div class="radio"></div></div><span class="shop-name">商城自营</span></div><div class="cart-cart"></div></div>')
            $.each(item, function() {
                $('.cart-cart').append('<div class="cart-item" data-goods_id="' + this.goods_id + '" data-pre_goods_id="' + this.pre_goods_id + '" data-selected=0><div class="common-radio-group"><div class="radio"></div></div><div class="goods-pic"><img src="' + this.goods_pic + '"/></div><div class="detail"><a href="good.html?id=' + this.pre_goods_id + '"><p class="name">' + this.goods_name + '</p><p>' + this.description + '</p></a><p class="price">￥' + this.price + '</p><div class="fr num-edit" data-max="' + this.stores + '" data-min=1><span class="num-minus"></span><span class="num">' + this.goods_num + '</span><span class="num-add"></span><p class="store-warn"></p></div></div></div>');
                //判断库存是否不足
                if (this.stores < this.goods_num) {
                    var $cartItem = $('.cart-item').last();
                    $cartItem.find('.num').text(this.goods.stores);
                    if (this.stores == 0) {
                        $cartItem.find('.goods-pic').append('<img class="no-storage" src="' + urlResourcePrefix + '/assets/resource/image/account/img_no_stock.png" />');
                        $cartItem.find('.num-add').addClass('disable');
                        $cartItem.find('.num-minus').addClass('disable');
                    }
                }
            })
            $('.num-edit').numEdit({
                plus: '.num-add',
                num: '.num',
                minus: '.num-minus'
            })
            $('.num-edit').on('numCb', function(e, msg) {
                var $this = $(this);
                var $cartItem = $this.parents('.cart-item');
                var $storeWarn = $cartItem.find('.store-warn');
                ajax({
                    data: {
                        name: 'shopping.sys.shopcart.num.change',
                        goods_id: $cartItem.data('goods_id'),
                        goods_num: msg.num,
                        is_selected: $cartItem.data('selected')
                    },
                    success: function(data) {
                        console.log(msg.num) //undefined
                        console.log(msg.clientChange) //undefined
                        var store = data.data.store;
                        cb({
                            max: store
                        })
                        //calPrice();
                        if (store < n + 3) $storeWarn.text('（库存仅' + store + '件）');
                        else $storeWarn.text('');
                    }
                })
            })
        }
    }
})