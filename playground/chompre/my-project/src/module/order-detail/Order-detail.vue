<template>
	<div>
		<div id="order_container">
			<div class="title">订单详情
				<span class="fr smallGrey time">{{time}}</span>
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
			<div id="order_delivery">
				<img src="~assets/img/order/delivery.png">
				<span class="txt" :title="address_info.receive_name">快递编号: {{order_info.ems_no}} </span>
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
				<!-- <a id="order_dealer">{{dealer_info.dealer_name}}</a> -->
				<div id="order_goods">
					<div class="goods-item" v-for="goods in goods_info">
						<a :href="'./product.html?id='+goods.pre_goods_id">
							<img :src="goods.goods_pic">
							<div class="goods-title">{{goods.goods_name}}</div>
						</a>
						<div class="goods-detail">
							<p v-for="d in goods.description">{{d}}</p>
						</div>
						<div class="goods-price">${{goods.price}}</div>
						<div class="goods-num">{{goods.goods_num}}</div>
						<div class="goods-price-all">${{goods.price*goods.goods_num}}</div>
					</div>
				</div>
			</div>
			<div id="conclu">
				Total:
				<span>${{order_info.order_amount}}</span>
			</div>
		</div>
	</div>
</template>
<script>
	import '../../assets/lib/order-item.less'
	import {getParameterByName, timestamp} from '../../assets/js/utils.js'
	export default{
		name:'orderdetail',
		data(){
			return{
				id:'',
				time:'',
				address_info:'',
				invoice_info:'',
				delivery_info:'',
				order_info:'',
				dealer_info:{
					name:'示例店铺',
					id:''
				},
				goods_info:[],
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
				this.time = timestamp( response.body.data.order.start_time);
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
		.time{
			margin-left: 10px;
		}
		#order_main{
			margin-top: 35px;
			margin-bottom: 90px;
		}
		#conclu{
			font-size:20px;
			color:#5c5c5c;
			text-align:right;
			font-weight:bold;
			float: right;
			span{
				font-size:30px;
				color:#d0021b;
			}
		}
	}
</style>