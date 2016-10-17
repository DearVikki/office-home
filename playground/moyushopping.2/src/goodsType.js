require('public');
require('headerfooter');
require('./css/common-display-list.less');
require('./css/common-divider.less');
require('./css/search.less');
require('./css/common-alert.less');
var $ = require('jquery');
require('initial');
var ajax = require('ajax');
var scroll = require('./js/scroll.js');
var qs = require('./js/queryString.js');
var noResult = require('./js/noResult.js');
require('./js/historyBack.js');
require('./js/search.js')
var cate = qs('cate');
var search = qs('search');
var type = 1,
    page = 1;
var $container = $('#search-result-container'),
    $nomore = $('#no-more');
$('.back').back();

function getList(config) {
    var data = {};
    if (cate) {
        data.name = 'shopping.sys.catagory.goods';
        data.class_append_id = cate;
    } else {
        data.name = 'shopping.sys.search.goods';
        data.search = search;
    }
    data.type = type;
    data.page = page;
    ajax({
        data: data,
        success: function(data, status) {
            var item = data.data.goods_list;
            $.each(item, function() {
                $container.children('ul').append('<a class="item" href="good.html?id='+this.pre_goods_id+'"><img src="' + this.cover_pic + '"/><div class="item-detail"><span class="title">' + this.description + '</span><span class="price">￥' + this.price + '</span><span class="more-info"><span class="comments">' + this.comment_num + '</span>条评论 <span class="buyers">' + this.sales_num + '</span>人付款</span></div></a>')
            })
            noResult(item, page);
            page++;
        }
    })
}

function clearList() {
    $('.item').remove();
    $nomore.hide();
    $('.nothing-alert').remove();
}
$('.layout').on('click', function() {
    var $this = $(this);
    $this.toggleClass('line-display-list').toggleClass('display-list');
    $container.toggleClass('line-display-list').toggleClass('display-list');
})
$('.order-item').on('click', function() {
    var $this = $(this);
    var $cheap = $('.cheap'),
        $exp = $('.expensive');
    if ($this.hasClass('price')) {
        if (!$cheap.hasClass('active')) {
            type = 4;
            $cheap.addClass('active');
            $exp.removeClass('active');
        } else {
            type = 5;
            $exp.addClass('active');
            $cheap.removeClass('active');
        }
    } else {
        type = $this.data('type');
        $('.cheap, .exp').removeClass('active')
    };
    $('.order-item.active').removeClass('active');
    $this.addClass('active');
    page = 1;
    clearList();
    getList();
})
if(search) $('input').val(search);
scroll(getList);
getList();