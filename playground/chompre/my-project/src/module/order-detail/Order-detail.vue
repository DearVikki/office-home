<template>
	<div>
		<div id="order_container">
			<div class="title">{{lang.ORDER_DETAIL}}
				<span class="fr smallGrey time">{{time}}</span>
				<!-- 新增地址 -->
				<span class="fr smallGrey" v-if="order_info.status === 1">{{lang.TO_PAY}}</span>
				<span class="fr smallGrey" v-if="order_info.status === 2">{{lang.TO_SEND}}</span>
				<span class="fr smallGrey" v-if="order_info.status === 3">{{lang.TO_RECEIVE}}</span>
				<span class="fr smallGrey" v-if="order_info.status === 4">{{lang.TO_COMMENT}}</span>
				<span class="fr smallGrey" v-if="order_info.status === 5">{{lang.DEAL_CLOSE}}</span>
				<span class="fr smallGrey" v-if="order_info.status === 6">{{lang.DEAL_SUCCESS}}</span>
				<span class="fr smallGrey" v-if="order_info.status === 7">{{lang.REFUND_ING}}</span>
				<span class="fr smallGrey" v-if="order_info.status === 8">{{lang.RESEND_GOODS_ING}}</span>
				<span class="fr smallGrey" v-if="order_info.status === 8">{{lang.REFUND_SUCCESS}}</span>
				<span class="fr smallGrey" v-if="order_info.status === 8">{{lang.RESEND_GOODS_SUCCESS}}</span>
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
				<span class="txt" :title="address_info.receive_name">{{lang.DELIVERY_NO}}: {{order_info.ems_no}} </span>
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
				{{lang.TOTAL}}:
				<span>${{totalPrice}}</span>
			</div>
		</div>
	</div>
</template>
<script>
	import '../../assets/lib/order-item.less'
	import {getParameterByName, timestamp} from '../../assets/js/utils.js'
	import lang from '../../assets/js/language.js'
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
					name:lang.PRODUCT_NAME,
					style:'width:38%'
				},{
					name:lang.PRODUCT_INFO,
					style:'width:16%'
				},{
					name:lang.PRODUCT_UNIT_PRICE,
					style:'width:13%'
				},{
					name:lang.NUM,
					style:'width:13%'
				},{
					name:lang.PRODUCT_TOTAL,
					style:'width:20%'
				}],
				lang:lang
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
		},
		computed:{
			totalPrice(){
				let p = 0;
				this.goods_info.forEach((e) => {
					p += e.price * e.goods_num;
				})
				return p;
			}
		}
	}
</script>
<style lang='less' scoped>
	#order_container{
		margin:20px auto;
		max-width: 1200px;
		width: 100%;
		min-width: 1000px;
		overflow: hidden;
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