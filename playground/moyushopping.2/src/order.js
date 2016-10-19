require('public');
require('./css/common-display-list.less');
require('./css/common-divider.less');
require('./css/common-alert.less');
require('./css/order.less');
require('initial');
require('headerfooter');
var ajax = require('ajax').ajax;
var $ = require('jquery');
var qs = require('./js/queryString');
var scroll = require('./js/scroll.js');
var noResult = require('./js/alert.js').noResult;
var $nomore = $('#no-more');
var type = qs('type') || 1;
var page = 1;
var orderArr = [{}, {
    text: '待付款',
    app: '<a class = "fr btn important pay"></a><a class = "fr btn default cancle"></a>'
}, {
    text: '待发货'
}, {
    text: '待收货',
    app: '<a class = "fr btn important confirm" href = ""></a><a class = "fr btn default delivery" href = "delivery.html"></a>'
}, {
    text: '待评价'
}, {
    text: '退款'
}, {
    text: '退货'
}, {
    text: '交易关闭'
}, {
    text: '交易成功',
    app: '<a class = "fr btn important delivery" href = "delivey.html"></a>'
}, {
    text: '退款处理中'
}, {
    text: '退货处理中'
}, {
    text: '退款完成'
}, {
    text: '退货完成'
}]

function getOrder() {
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
                $thisOrder.find('.order-item-status').text(orderArr[status].text);
                $thisOrder.find('.order-footer').append(orderArr[status].app);
                page++;
            })
            noResult(allOrder, page);
        }
    })
}
$('.order-status').on('click', function() {
    var $this = $(this);
    type = $this.data('type');
    page = 1;
    $('.order-status.active').removeClass('active');
    $this.addClass('active');
    $nomore.hide();
    $('.nothing-alert,.order-item').remove();
    getOrder();
})
scroll(getOrder);
getOrder();