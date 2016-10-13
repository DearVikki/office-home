require('public');
require('./css/common-display-list.less');
require('./css/common-divider.less');
require('./css/common-alert.less');
require('./css/order.less');
require('initial');
require('headerfooter');
var ajax = require('ajax');
var $ = require('jquery');
var qs = require('./js/queryString');
var $nomore = $('#no-more');
var type = qs('type') || 0;
var page = 0;

function getOrder(type,page) {
    ajax({
        data: {
            name: 'shopping.sys.order.info',
            type: type,
            page: page
        },
        success: function(data) {
            var allOrder = data.data;
            $.each(allOrder, function() {
                $('#order-container').append('<div class="order-item to-comment" data-order_id="' + this.order_info.order_id + '"><div class="order-header"><span class="fl order-shop">自营商城</span><span class="fr order-item-status"></span></div><a class="order-detail" href = "order-detail.html" ><img class="order-img" src ="' + this.goods_info.goods_pic + '" /><div class="order-info"><div class="fl title">' + this.goods_info.goods_name + '</div><div class="fr price">￥<span>' + this.goods_info.price + '</span></div><div class= "fl size">' + this.goods_info.description + '</div><div class = "fr piece">x<span>' + this.goods_info.goods_num + '</span></div><div class = "conclu">共<span class = "conclu-pi">' + this.order_info.goods_count + '</span>件商品 合计<span class = "conclu-pr">' + this.order_info.sum_price + '</span>（包运费<span class = "conclu-de">' + this.order_info.postage + '</span>）</div></div></a><div class = "order-footer"></div></div>');
                var status = this.order_info.status;
                var $thisOrder = $('.order-item').last();
                switch (status) {
                    case 1:
                        $thisOrder.find('.order-item-status').text('待付款');
                        $thisOrder.find('.order-footer').append('<a class = "fr btn important pay"></a><a class = "fr btn default cancle"></a>');
                        break;
                    case 2:
                        $thisOrder.find('.order-item-status').text('待发货');
                        break;
                    case 3:
                        $thisOrder.find('.order-item-status').text('待收货');
                        $thisOrder.find('.order-footer').append('<a class = "fr btn important confirm" href = ""></a><a class = "fr btn default delivery" href = "delivery.html"></a>');
                        break;
                    case 4:
                        $thisOrder.find('.order-item-status').text('待评价');
                        $thisOrder.find('.order-footer').append('<a class = "fr btn default delivery" href = "delivery.html"></a>');
                        break;
                    case 5:
                        $thisOrder.find('.order-item-status').text('退款');
                        break;
                    case 6:
                        $thisOrder.find('.order-item-status').text('退货');
                        break;
                    case 7:
                        $thisOrder.find('.order-item-status').text('交易关闭');
                        break;
                    case 8:
                        $thisOrder.find('.order-item-status').text('交易成功');
                        $thisOrder.find('.order-footer').append('<a class = "fr btn important delivery" href = "delivey.html"></a>');
                        break;
                    case 9:
                        $thisOrder.find('.order-item-status').text('退款处理中');
                        break;
                    case 10:
                        $thisOrder.find('.order-item-status').text('退货处理中');
                        break;
                    case 11:
                        $thisOrder.find('.order-item-status').text('退款完成');
                        break;
                    case 12:
                        $thisOrder.find('.order-item-status').text('退货完成');
                        break;
                }
                page++;
            })
            if (allOrder == '' && page !== 0) {
                $nomore.show();
            } else {
            	$('body').append('<div class="nothing-alert">无相关数据</div>');
            }
        }
    })
}

$('.order-status').on('click',function(){
	var $this = $(this);
	type = $this.data('type');
	page = 0;
	$('.order-status.active').removeClass('active');
	$this.addClass('active');
	$('.nothing-alert,.order-item').remove();
	getOrder(type,page);
})