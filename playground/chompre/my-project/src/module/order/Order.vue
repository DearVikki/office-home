<template>
	<!-- 以下是为了使背景变灰 -->
	<div id="personal_container">
		<div id="personal_main_container">
			<personalside :activeId=1></personalside>
			<div id="personal_right_container">
				<!-- 订单状态navbar -->
				<div id="order_nav_container">
					<div v-for="(nav,i) in navs"
					class="order-nav"
					:class="{active:activeNav === i}"
					:style="nav.style"
					@click="activeNav=i">{{nav.name}}</div>
				</div>
				<!-- 订单部分 -->
				<div id="order_container">
					<div v-for="order in orders"
					class="order">
						<!-- 订单头部 -->
						<div class="order-header">
							<div class="fl">
								<span class="order-time">{{order.order_info.start_time}}</span>
								<span class="order-price">总价: ${{order.order_info.sum_price}}</span>
								<span class="order-no">订单编号: {{order.order_info.order_no}}</span>
								<span class="order-shop">{{order.dealer_info.dealer_name}}</span>
							</div>
							<div class="fr">
								consulta la tienda
							</div>
						</div>
						<!-- 订单商品列条 -->
						<div class="order-goods"
						v-for="goods in order.goods_info">
							<div class="goods-part1">
								<img :src="goods.cover_pic">
								<div class="goods-part1-inner">
									<div class="goods-name">{{goods.goods_name}}</div>
									<div class="goods-detail">
										<!-- 商品详细信息 -->
										<span class="goods-detail1">
											<p v-for="des in goods.description">{{des}}</p>
										</span>
										<span class="price-container">
											<span class="goods-detail2">${{goods.price}}</span>
											<span class="goods-detail3 fr">x3</span>
										</span>
									</div>
								</div>
							</div>
							<div class="goods-part2"></div>
							<div class="goods-part3"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import data from './data.js';
	import personalside from '../../components/PersonalSide.vue';
	import {timestamp} from '../../assets/js/utils.js';
	export default{
		name:'order',
		mounted(){
			this.getOrder();
			data.data.forEach((order)=>{
				// 处理开始时间
				order.order_info.start_time = timestamp(order.order_info.start_time);
				// 处理description成数组
				order.goods_info.forEach((goods)=>{
					goods.description = goods.description.split(' ').filter((d)=>{return d});
				})
				this.orders.push(order);
			})
		},
		data(){
			return{
				navs:[{
					name:'Mis pedidos',
					style:'width:15%'
				},{
					name:'No Pagado',
					style:'width:15%'
				},{
					name:'En Espera de Envio',
					style:'width:20%'
				},{
					name:'Despacho en Tramite',
					style:'width:25%'
				},{
					name:'Esperar Calificacion',
					style:'width:25%'
				}],
				activeNav:0,
				orders:[]
			}
		},
		methods:{
			getOrder(){
				this.$http.post('',{
					name:'zl.shopping.pc.order.type',
					type:this.activeNav
				}).then((response)=>{
					console.log(response.body.data)
				})
			}
		},
		components:{personalside}
	}
</script>
<style scoped lang='less'>
	@baseColor:#d42b1e;
	/*nav条*/
	#order_nav_container{
		width: 100%;
		display: flex;
		.order-nav{
			font-size:18px;
			color:#545454;
			text-align: center;
			height: 35px;
			line-height: 35px;
			border-bottom: 2px solid #f2f2f2;
			cursor: pointer;
			&.active{
				color:@baseColor;
				border-bottom-color: @baseColor;
			}
		}
	}
	/*order部分*/
	#order_container{
		.order{
			width: 100%;
			margin-top: 10px;
			/*头部*/
			.order-header{
				border:1px solid #d3d3d3;
				background: #f2f2f2;
				font-size: 14px;
				overflow: hidden;
				color:#666;
				padding: 0 20px;
				.fl,.fr{
					height: 48px;
					line-height: 48px;
				}
				span{
					display: inline-block;
				}
				.order-time{
					width: 80px;
				}
				.order-price{
					width: 120px;
					color:@baseColor;
					font-weight: bold;
					margin-left: 50px;
				}
				.order-no{
					width: 250px;
				}
				.fr{
					color: @baseColor;
				}
			}
			/*主体*/
			.order-goods{
				overflow: hidden;
				border:1px solid #e7e7e7;
				border-top:none;
				height: 120px;
				font-size: 12px;
				.goods-part1,.goods-part2,.goods-part3{
					padding:20px;
					float: left;
					height: 100%;
				}
				.goods-part1{
					width: 64%;
					img{
						width: 80px;
						height: 80px;
					}
					.goods-part1-inner{
						display: inline-block;
						width: 360px;
						vertical-align:top;
						.goods-detail1{
							font-size:12px;
							color:#979797;
							display: inline-block;
						}
						.price-container{
							float:right;
						}
					}
				}
				.goods-part2{
					width: 18%;
					border-left:1px solid #e7e7e7;
					border-right:1px solid #e7e7e7;
				}
			}
		}
	}
</style>