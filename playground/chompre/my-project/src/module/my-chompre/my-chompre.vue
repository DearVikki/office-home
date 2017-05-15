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
					@click="clickNav(i)">{{nav.name}}</div>
				</div>
				<!-- 订单部分 -->
				<div id="order_container">
					<div v-for="order in orders"
					class="order" @click="selectedOrder = order">
						<!-- 订单头部 -->
						<div class="order-header">
							<div class="fl">
								<span class="order-time">{{order.order_info.start_time}}</span>
								<span class="order-price">总价: ${{order.order_info.sum_price}}</span>
								<a class="order-no cp" :href="'./order-detail.html?id='+order.order_info.order_id">订单编号: {{order.order_info.order_no}}</a>
								<span class="order-shop">{{order.dealer_info.dealer_name}}</span>
							</div>
							<div class="fr" @click="contactPop.show = true">
								consulta la tienda
							</div>
						</div>
						<!-- 订单商品列条 -->
						<div class="order-goods">
							<div class="goods-part12-container">
								<div class="goods-part1">
									<img :src="order.goods_info.cover_pic">
									<div class="goods-part1-inner">
										<div class="goods-name">{{order.goods_info.goods_name}}</div>
										<div class="goods-detail">
											<!-- 商品详细信息 -->
											<span class="goods-detail1">
												<p v-for="des in order.goods_info.description">{{des}}</p>
											</span>
											<span class="price-container">
												<span class="goods-detail2">${{order.goods_info.price}}</span>
												<span class="goods-detail3 fr">x3</span>
											</span>
										</div>
									</div>
								</div>
								<div class="goods-part2">
									<!-- 待付款 -->
									<div v-if="order.order_info.status === 1">
										<p>待付款</p>
									</div>
									<!-- 待发货 -->
									<div v-if="order.order_info.status === 2">
										<p>待发货</p>
									</div>
									<!-- 待收货 -->
									<div v-if="order.order_info.status === 3">
										<p>待收货</p>
										<p class="main" @click="comment.pop.show = true">评价</p>
										<!-- 为什么这里会报el.setAttribute的错吖！ -->
										<p class="main" @click="test">退货</p>
										<p class="main" @click="changePop.show = true">换货</p>
									</div>
									<!-- 待评价 -->
									<div v-if="order.order_info.status === 4">
										<p>待评价</p>
										<p class="main" @click="comment.pop.show = true">评价</p>
									</div>
									<!-- 取消订单（交易关闭） -->
									<div v-if="order.order_info.status === 5">
										<p>交易关闭</p>
									</div>
									<!-- 交易成功 -->
									<div v-if="order.order_info.status === 6">
										<p>交易成功</p>
									</div>
									<!-- 退款处理中 -->
									<div v-if="order.order_info.status === 7">
										<p>退款处理中</p>
									</div>
									<!-- 退货处理中 -->
									<div v-if="order.order_info.status === 8">
										<p>退货处理中</p>
									</div>
									<!-- 退款完成 -->
									<div v-if="order.order_info.status === 9">
										<p>退款完成</p>
									</div>
									<!-- 退货完成 -->
									<div v-if="order.order_info.status === 10">
										<p>退货完成</p>
									</div>
								</div>
							</div>
							<div class="goods-part3">
								<!-- 待付款 -->
								<div  v-if="order.order_info.status === 1">
									<div class="btn main">付款</div>
								</div>
								<!-- 待发货 -->
								<div v-if="order.order_info.status === 2">
									<div class="btn main">确认收货</div>
									<div class="btn">取消订单</div>
								</div>
								<!-- 待收货 -->
								<div v-if="order.order_info.status === 3">
									<div class="btn main">确认收货</div>
								</div>
								<!-- 待评价 -->
								<div v-if="order.order_info.status === 4">
									<div class="btn" @click="clickDelivery">查看物流</div>
								</div>
								<!-- 取消订单（交易关闭） -->
								<div v-if="order.order_info.status === 5">
								</div>
								<!-- 交易成功 -->
								<div v-if="order.order_info.status === 6">
									<div class="btn" @click="clickDelivery">查看物流</div>
								</div>
								<!-- 退款处理中 -->
								<div v-if="order.order_info.status === 7">
								</div>
								<!-- 退货处理中 -->
								<div v-if="order.order_info.status === 8">
								</div>
								<!-- 退款完成 -->
								<div v-if="order.order_info.status === 9">
								</div>
								<!-- 退货完成 -->
								<div v-if="order.order_info.status === 10">
								</div>
							</div>
						</div>
					</div>
					<!-- 缺省页 -->
					<div class="empty-tip" v-if="!orders.length">
						<img src="~assets/img/product/icon_dingdan.png">
						<p>暂无相关订单喔</p>
					</div>
				</div>
			</div>
		</div>
		<!-- 客服弹窗 -->
		<!-- 这里一定要先给selectedOrder各项初始值呢 不然会报错！因为vue一定要先注册dom吖！ -->
		<pop :pop="contactPop">
			<div id="contact_inner_container">
				<div id="contact_container">
					<div class="contact" v-for="(c,index) in selectedOrder.dealer_info.connect">
						<img src="~assets/img/order/icon_service.png">
						<span>客服{{index+1}}&nbsp;&nbsp;&nbsp; WHATS APP:&nbsp;</span>
						<span class="red">{{c}}</span>
					</div>
				</div>
				<div class="btn-container">
					<div class="btn reverse" @click="contactPop.show = false">关闭</div>
				</div>
			</div>
		</pop>
		<!-- 物流弹窗 -->
		<pop :pop="delivery.pop">
			<div id="delivery_inner_container">
				<div id="delivery_container" v-if="delivery.deliveryInfo.toString()">
					<p>托运公司: {{delivery.deliveryInfo.delivery_name}}</p>
					<p>运单号: {{delivery.deliveryInfo.delivery_no}}</p>
					<p>价格: {{delivery.deliveryInfo.delivery_price}}</p>
				</div>
				<div class="no-info" v-else>
					暂无物流信息喔！
				</div>
				<div class="btn-container">
					<div class="btn reverse" @click="delivery.pop.show = false">关闭</div>
				</div>
			</div>
		</pop>
		<!-- 评价弹窗 -->
		<pop :pop="comment.pop" :popReset="commentPopReset">
			<div id="comment_inner_container">
				<textarea v-model="comment.content"></textarea>
				<div id="comment_pic_container">
					<div v-for="pic in comment.pics" class="pic">
						<img :src="pic">
					</div>
					<input type="file" accept="image/png, image/jpeg, image/gif" @change="filechange">
					<div id="add_pic" @click="clickInput"  @drop.prevent="filechange" @dragover.prevent v-show="comment.pics.length < 5">+</div>
				</div>
				<div id="comment_star_container">
					<span class="fl">Califique este producto</span>
					<span class="fr">
						<starmark @markStar="markstar"></starmark>
					</span>
				</div>
				<div class="btn-container">
					<div class="btn" :class="{disabled:commentDisabled}" @click="uploadImg">发表评价</div>
					<div class="btn reverse" @click="confirmPop.show = false">关闭</div>
				</div>
			</div>

		</pop>
		<!-- 换货弹窗 -->
		<pop :pop="changePop" class="common-pop">
			是否提交换货申请？
			<div class="btn-container">
				<div class="btn">换货</div>
				<div class="btn reverse" @click="changePop.show = false">关闭</div>
			</div>
		</pop>
		<!-- 退货弹窗 -->
		<pop :pop="returnPop" class="common-pop">
			是否提交退货申请？
			<div class="btn-container">
				<div class="btn">退货</div>
				<div class="btn reverse" @click="returnPop.show = false">关闭</div>
			</div>
		</pop>
		<!-- 确认收货弹窗 -->
		<pop :pop="confirmPop" class="common-pop">
			请确保收到货物，确认无误后点击确认。
			<div class="btn-container">
				<div class="btn">确认收货</div>
				<div class="btn reverse" @click="confirmPop.show = false">关闭</div>
			</div>
		</pop>
		<loading v-show="showLoading"></loading>
	</div>
</template>
<script>
	import personalside from '../../components/PersonalSide.vue';
	import {timestamp} from '../../assets/js/utils.js';
	import pop from '../../components/Pop.vue';
	import starmark from '../../components/Starmark.vue';
	import loading from '../../components/Loading.vue';
	export default{
		name:'order',
		mounted(){
			this.getOrder();
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
				orders:[],
				selectedOrder: {
		            order_info: {
		                order_id: '',
		                user_id: "100093",
		                start_time: 1478168149,
		                pay_time: 0,
		                deliver_time: 0,
		                complete_time: 0,
		                ems_no: "-1",
		                status: 1,
		                address_id: "1",
		                order_no: "2016110353485253",
		                is_del: "0",
		                dealer_id: "1",
		                postage: 0,
		                shipping_id: "1",
		                invoice_id: "0",
		                order_amount: "0",
		                sum_price: 100,
		                goods_count: 1
		            },
		            dealer_info: {
		                dealer_id: 1,
		                dealer_name: "三只松鼠",
		                connect: [
		                    "948907",
		                    "540",
		                    "1231"
		                ]
		            },
		            goods_info: {
		                price: 100,
		                goods_num: 1,
		                pre_goods_id: 2,
		                description: "颜色:中卡其  尺码:S  布料:麻布  ",
		                goods_name: "JNBY_江南布衣2016夏新商场同款简洁大方圆领T恤5G561001",
		                cover_pic: "http://121.40.91.157/shopping/php/assets/img/pre_goods/cat_1/2/goods/1.png",
		                status: 0
		            }
		        },
				popStyle:{
					width:'780px',
					minHeight:'292px'
				},
				// 为什么这里style: this.popStyle就是undefined呢
				contactPop:{
					show: false,
					style: {
						width:'780px',
						minHeight:'292px',
						padding:'70px 120px 35px 120px'
					}
				},
				delivery:{
					deliveryInfo:{},
					pop:{
						show:false,
						style: {
							width:'780px',
							minHeight:'292px',
							padding:'70px 120px 35px 120px'
						}
					}
				},
				comment:{
					content:'test',
					pics:[],
					files:[],
					star:0,
					disabled:true,
					pop:{
						show:false,
						style: {
							width:'780px',
							height:'500px',
							padding:'52px 120px 35px 120px'
						}
					}
				},
				changePop:{
					show:false,
					style:{
						width:'780px',
						minHeight:'292px',
						padding:'84px 120px 35px 120px'
					}
				},
				returnPop:{
					show:false,
					style:{
						width:'780px',
						minHeight:'292px',
						padding:'84px 120px 35px 120px'
					}
				},
				confirmPop:{
					show:false,
					style:{
						width:'780px',
						minHeight:'292px',
						padding:'84px 120px 35px 120px'
					}
				},
				showLoading:false
			}
		},
		methods:{
			test(){
				this.returnPop.show = true;
			},
			getOrder(){
				this.$http.post('',{
					name:'zl.shopping.pc.order.type',
					type:this.activeNav
				}).then((response)=>{
					let data = [];
					response.body.data.forEach((e)=>{
						// 处理开始时间
						e.start_time = timestamp(e.start_time);
						// 处理description成数组
						// 需要改成数组的以后
						// e.goods_info.forEach((goods)=>{
						e.goods_info.description = e.goods_info.description.split(' ').filter((d)=>{return d});
						// })
						data.push(e);
					})
					this.orders = data;
				})
			},
			clickNav(i){
				this.activeNav = i;
				this.getOrder();
			},
			clickDelivery(){
				this.$http.post('',{
					name:'zl.shopping.sys.delivery.info',
					order_id: this.selectedOrder.order_info.order_id
				}).then((response)=>{
					this.delivery.deliveryInfo = response.body.data;
					this.delivery.pop.show = true;
				})
			},
			clickInput(){
				document.querySelector('input[type=file]').click();
			},
			filechange(e){
				var files = e.target.files || e.dataTransfer.files;
				if (!files.length) return;
				if (files.length > 4) {
					alert('最多只能上传5张图片喔');
					return;
				}
				Array.prototype.slice.call(files).forEach((e)=>{
					if(e.type.slice(0,5) !== 'image') alert(e.name+'不是图片文件喔');
					else this.displayImg(e);
				})
			},
			displayImg(file){
				this.comment.pics.push(window.URL.createObjectURL(file));
				this.comment.files.push(file);
			},
			markstar(n){
				this.comment.star = n;
			},
			uploadImg(){
				console.log(this.comment.files)
				if(this.commentDisabled) return;
				var fm = new FormData();
				fm.append('name','zl.shopping.sys.upload.multi.img');
				this.comment.files.forEach((e)=>{
					fm.append('img[]',e);
				})
				this.$http.post('',fm).then((response)=>{
					let picData = [];
					response.body.data.list.forEach((e)=>{
						picData.push(e.compress);
					});
					// 评价订单
					this.$http.post('',{
						name:'zl.shopping.sys.comment.order',
						order_id: this.selectedOrder.order_info.order_id,
						goods_id: this.selectedOrder.goods_info.pre_goods_id,
						content: this.comment.content,
						comment_picture: picData.toString(),
						star_num: this.comment.star
					}).then((response)=>{
						this.comment.pop.show = false;
						this.comment.files = [];
					})
				})
			},
			// 重置评论框
			commentPopReset(){
				this.comment.content = '';
				this.comment.pics = [];
				this.comment.star = 0;
			}
		},
		computed:{
			commentDisabled(){
				return !this.comment.val && !this.comment.star?true: false;
			}
		},
		components:{personalside,pop,starmark,loading}
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
		padding-top: 1rem;
		min-height: 500px;
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
					margin-right:20px;
					color:#666;
				}
				.fr{
					color: @baseColor;
					cursor: pointer;
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
				.goods-part12-container{
					float: left;
					width: 82%;
					height: 120px;
				}
				.goods-part1{
					width: 78%;
					img{
						width: 80px;
						height: 80px;
						margin-right:10px;
					}
					.goods-part1-inner{
						display: inline-block;
						width: 360px;
						vertical-align:top;
						position: relative;
						height: 80px;
						.goods-name{
							overflow: hidden;
							text-overflow: ellipsis;
							display: -webkit-box;
							-webkit-line-clamp: 2;
							-webkit-box-orient: vertical;
							height: 35px;
						}
						.goods-detail1{
							font-size:12px;
							color:#979797;
							display: table-cell;
							vertical-align: bottom;
							position: absolute;
							bottom: 0;
							left: 0;
							width: 300px;
							p{
								margin-top:5px;
							}
						}
						.price-container{
							float:right;
							margin-top: 30px;
							.goods-detail2{
								font-size:14px;
								color:#d0021b;
								margin-right:25px;
							}
							.goods-detail3{
								font-size:12px;
								color:#808080;
								margin-top:2px;
							}
						}
					}
				}
				.goods-part2{
					width: 22%;
					border-left:1px solid #e7e7e7;
					border-right:1px solid #e7e7e7;
					font-size:12px;
					color:#666666;
					text-align:center;
					p{
						margin-bottom:5px;
					}
					.main{
						color:#d42b1e;
						cursor:pointer;
					}
				}
				.goods-part3{
					float: right;
					width:18%;
					.btn{
						border-radius:2px;
						width:100px;
						height:30px;
						line-height:30px;
						text-align:center;
						font-size:12px;
						color:#d42b1e;
						cursor:pointer;
						margin:0 auto;
						&.main{
							background:#d42b1e;
							color:#fff;
						}
					}
				}
			}
		}
	}
	.red{
		color:#d42b1e;
	}
	#contact_inner_container{
		font-size:12px;
		color:#5c5c5c;
		text-align:left;
		#contact_container{
			min-height:97px;
		}
		.contact{
			margin:0 auto 20px 110px;
			img{
				vertical-align:middle;
			}
		}
		span{
			vertical-align:middle;
		}
		.btn-container{
			margin-top:30px;
		}
	}
	#delivery_inner_container{
		font-size:20px;
		color:#666666;
		letter-spacing:0.4px;
		#delivery_container{
			>p{
				margin-bottom:15px;
				text-align: left;
				margin-left:150px;
			}
		}
		.btn-container{
			width:100%;
			position: absolute;
			bottom:30px;
			left:0;
		}
		.no-info{
			margin-top:30px;
		}
	}
	#comment_inner_container{
		textarea{
			resize:none;
			width:544px;
			height:148px;
		}
		#comment_pic_container{
			margin-top:10px;
			text-align:left;
			input{
				display:none;
			}
			.pic{
				width:98px;
				height:98px;
				display:inline-block;
				vertical-align:middle;
				margin-right:10px;
				img{
					width:100%;
					height:100%;
				}
			}
			#add_pic{
				border:2px dashed #cbcbcb;
				width:98px;
				height:98px;
				line-height: 98px;
				text-align:center;
				color:#cbcbcb;
				font-size:30px;
				display:inline-block;
				cursor:pointer;
				vertical-align:middle;
			}
		}
		#comment_star_container{
			margin-top: 10px;
			overflow:hidden;
			.fl{
				font-size:24px;
				color:#979797;
				letter-spacing:-1.31px;
			}
			span{
				vertical-align:center;
			}
		}
		.btn-container{
			margin-top: 40px;
		}
	}
	.common-pop{
		font-size:20px;
		color:#666666;
		letter-spacing:0.4px;
		text-align:center;
		.btn-container{
			margin-top: 90px;
		}
	}
</style>