<template>
	<div>
		<div id="order_container">
			<div class="title">订单详情
				<!-- 新增地址 -->
				<span class="fr smallGrey" v-if="order_info.status === 1">待付款</span>
				<span class="fr smallGrey" v-if="order_info.status === 2">待发货</span>
				<span class="fr smallGrey" v-if="order_info.status === 3">待收货</span>
				<span class="fr smallGrey" v-if="order_info.status === 4">待评价</span>
				<span class="fr smallGrey" v-if="order_info.status === 5">交易关闭</span>
				<span class="fr smallGrey" v-if="order_info.status === 6">交易成功</span>
				<span class="fr smallGrey" v-if="order_info.status === 7">退款处理中</span>
				<span class="fr smallGrey" v-if="order_info.status === 8">退货处理中</span>
				<span class="fr smallGrey" v-if="order_info.status === 8">退款完成</span>
				<span class="fr smallGrey" v-if="order_info.status === 8">退货完成</span>
			</div>
			<div id="order_address">
				<img src="~assets/img/order/location.png">
				<span class="txt" :title="address_info.receive_name">{{address_info.receive_name}} </span>
				<span class="txt" :title="address_info.idcard">{{address_info.idcard}}</span>
				<span class="txt" :title="address_info.receive_mobile">{{address_info.receive_mobile}}</span>
				<span class="txt" :title="address_info.address">
					{{address_info.address}}
				</span>
			</div>
			<!-- <div id="order_invoice">
				<img src="~assets/img/order/invoice.png">
				<span class="txt name" :title="invoice.selected.company_name">{{invoice.selected.company_name}}</span>
				<span class="txt" :title="invoice.selected.company_taxid">{{invoice.selected.company_taxid}}</span>
				<span class="txt mobile" :title="invoice.selected.company_tel">{{invoice.selected.company_tel}}</span>
				<span class="txt address" :title="invoice.selected.company_address+' '+invoice.selected.company_area+' '+invoice.selected.company_city">
					{{invoice.selected.company_address}} {{invoice.selected.company_area}} {{invoice.selected.company_city}}
				</span>
			</div> -->
			<div id="order_main">
				<div id="order_header">
					<div class="header-item"
					v-for="h in headers"
					:style="h.style">
						{{h.name}}
						<span class="border"></span>
					</div>
				</div>
				<a id="order_dealer">{{dealer_info.dealer_name}}</a>
				<div id="order_goods">
					<div class="goods-item" v-for="goods in goods_info">
						<img :src="goods.goods_pic">
						<div class="goods-title">{{goods.goods_name}}</div>
						<div class="goods-detail">
							<p v-for="d in goods.description">{{d}}</p>
						</div>
						<div class="goods-price">${{goods.price}}</div>
						<div class="goods-num">{{goods.goods_num}}</div>
						<div class="goods-price-all">${{goods.price*goods.goods_num}}</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import '../../assets/lib/order-item.less'
	import {getParameterByName} from '../../assets/js/utils.js'
	export default{
		name:'orderdetail',
		data(){
			return{
				id:'',
				address_info:'',
				invoice_info:'',
				delivery_info:'',
				order_info:'',
				dealer_info:{
					name:'示例店铺',
					id:''
				},
				goods_info:[{
					pre_goods_id: 2,
					goods_id: 1,
					description: ['颜色:白色'],
					goods_name: "JNBY_江南布衣2016夏新商场同款简洁大方圆领T恤5G561001",
					goods_pic: "http://121.40.91.157/shopping/php/assets/img/pre_goods/cat_1/2/goods/1.png",
					price: 0.01,
					goods_num: 5,
					status: 0,
					is_comment: "0"
				}],
					headers:[{
						name:'店铺宝贝',
						style:'width:38%'
					},{
						name:'商品属性',
						style:'width:16%'
					},{
						name:'单价(比索)',
						style:'width:13%'
					},{
						name:'数量',
						style:'width:13%'
					},{
						name:'小计',
						style:'width:20%'
					}]
			}
		},
		mounted(){
			this.id = getParameterByName('id');
			this.$http.post('',{
				name:'zl.shopping.sys.order.detail',
				order_id: this.id
			}).then((response)=>{
				this.order_info = response.body.data.order;
				this.address_info = response.body.data.address_info;
				let goods_info = [];
				response.body.data.goods_info.forEach((e)=>{
					e.description = e.description.split(' ').filter((d)=>{return d});
					goods_info.push(e);
				})
				this.goods_info = goods_info;
			})
		}
	}
</script>
<style lang='less' scoped>
	#order_container{
		margin:20px auto;
		max-width: 1200px;
		width: 100%;
		min-width: 1000px;
		.txt{
			margin-right: 7px;
		}
		#order_main{
			margin-top: 35px;
			margin-bottom: 90px;
		}
	}
</style>