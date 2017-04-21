<template>
	<div id="market_container">
		<div id="product_container" class="swiper-container">
			<div class="swiper-wrapper">
				<div class="swiper-slide" v-for="s in ShoppingList">
					<div class="s-inner">
						<div class="s-inner-top">
							<img :src="s.path">
							{{s.title}}
						</div>
						<div class="s-inner-bottom">
							<div class="c-yellow-btn" :class="{disabled:!Number(s.exchange)}" @click="exchangeStep1(s.goods_id,s.content)">兑换</div>
						</div>
					</div>
				</div>
			</div>
			<a id="view_history" href="./market-history.html">查看兑换历史</a>
			<div id="page_container">
				<span>{{currentPage}}</span>
				<span>/{{ShoppingList.length}}</span>
			</div>
		</div>
		<!-- 兑换弹窗 -->
		<pop :pop="pop">
			<div id="exchange_pop">
				<div id="exchange_pop_part1">{{exchangeMethod.content}}</div>
				<div id="exchange_pop_part2">
					<div>兑换方式: 
						<span class="credit" v-show="exchangeMethod.integral">{{exchangeMethod.integral}}</span>
						<span class="plus" v-show="exchangeMethod.integral&&exchangeMethod.money"> + </span>
						<span class="money" v-show="exchangeMethod.money">{{exchangeMethod.money}}</span>
					</div>
					<div>
						剩余积分: 
						<span class="credit">{{existingCredit}}</span>
					</div>
				</div>
				<div class="c-yellow-btn" @click="exchangeStep2">兑换</div>
			</div>
		</pop>
		<!-- 兑换成功弹窗 -->
		<pop :pop="successPop">
			<div id="success_pop">
				<p>兑换成功!</p>
				<p>凭兑换记录到<span>{{exchangeAddress}}</span>领取</p>
				<div class="c-yellow-btn" @click="successPop.show = false">确定</div>
			</div>
		</pop>
	</div>
</template>
<script>
	import Swiper from '../../assets/lib/swiper.js';
	import pop from '../../components/Pop.vue';
	import {myAlert} from '../../assets/js/utils.js';
	import pingpp from 'pingpp-js';
	export default{
		name:'market',
		data(){
			return{
				ShoppingList:[{
		            goods_id:"1",
		            path:"https://ss0.bdstatic.com",
		            title:"测试商品大礼包",
		            content:"测试商品各种商品",
		            sort:"99",
		            addtime:"3442343",
		            is_del:"1",
		            exchange:1
		        }],
		        currentPage:1,
		        pop:{
		        	show:false,
		        	style:{
		        		width:'7.8rem'
		        	}
		        },
		        successPop:{
		        	show:false,
		        	style:{
		        		width:'7.8rem'
		        	}
		        },
		        exchangeMethod:{
		        	content:'测试商品各种商品',
		        	mode_id:"1",
		        	integral:10,
		        	money:50.00,
		        	goods_id:"1"
		        },
		        existingCredit:0,
		        exchangeAddress:''
			}
		},
		mounted(){
			let self = this;
			// 获取兑换商品列表
			this.$http.post('',{
				name:'xwlt.pc.ShoppingList'
			}).then((response)=>{
				this.ShoppingList = response.body.data.shoppingList;
				this.$nextTick(()=>{
					let s = new Swiper('#product_container',{
					    slidesPerView: 1,
					    onSlideChangeStart: function(swiper,event){
					    	self.currentPage = swiper.realIndex + 1;
					    }
					})
				})
			})
			// 获取用户积分
			this.$http.post('',{
				name:'xwlt.pc.GetNowIntegral'
			}).then((response)=>{
				this.existingCredit = response.body.data.existing_integral;
			})
		},
		methods:{
			exchangeStep1(id,content){
				this.$http.post('',{
					name:'xwlt.pc.GetShoppingMode',
					goods_id: id
				}).then((response)=>{
					let mode = response.body.data.Mode;
					mode.integral = Number(mode.integral);
					mode.money = Number(mode.money);
					mode.content = content;
					this.exchangeMethod = mode;
					this.pop.show = true;
				})
			},
			exchangeStep2(){
				this.$http.post('',{
					name:'xwlt.pc.ShoppingMode',
					goods_id: this.exchangeMethod.goods_id
				}).then((response) => {
					if(response.body.code !== 1000){
						myAlert(response.body.msg);
					}
					this.exchangeAddress = response.body.data.address;
					if(!this.exchangeMethod.money) {
						this.exchangeSuccess();
					} else {
						// 转到支付
						this.$http.post('',{
							name:'xwlt.pc.UpdatePay',
							channel:'wx_pub',
							amount:Number(this.exchangeMethod.money)*100,
							order_no:new Date().getTime()+Math.ceil(Math.random())*1000,
							description:JSON.stringify({
								type:'shopping',
								question_id:this.exchangeMethod.goods_id
							})
						}).then((response)=>{
							if(response.body.code === 1000){
								this.createPayment(response.body.data.charge);
							}
						})
					}
				})
			},
			createPayment(charge){
				pingpp.createPayment(charge, (result, err)=>{
				    console.log(result);
				    console.log(err.msg);
				    console.log(err.extra);
				    if (result == "success") {
				       this.exchangeSuccess();
				    } else if (result == "fail") {
				         myAlert.small('支付遇到问题了!');
				    } else if (result == "cancel") {
				        myAlert.small('支付被取消了!');
				    }
				});
			},
			exchangeSuccess(){
				this.pop.show = false;
				this.successPop.show = true;
			}
		},
		components:{pop}
	}
</script>
<style lang='less' scoped>
	@import '../../assets/lib/swiper.min.css';
	@baseColor: #ffe857;
	#market_container{
		width:100%;
		height:100%;
		background:url(../../assets/img/index/bg.png) center no-repeat;
		background-size:100% 100%;
		position: relative;
		#page_container{
			position:absolute;
			right:.67rem;
			bottom:.2rem;
			color:#999;
			font-size:.5rem;
			span:nth-of-type(1){
				font-size:.7rem;
			}
			span:nth-of-type(2){
				margin-left: -.1rem;
				vertical-align: -.05rem;
			}
		}
		#view_history{
			position:absolute;
			left:.67rem;
			bottom:.2rem;
			color:#F9C13A;
			font-size: .35rem;
			text-decoration: underline;
		}
	}
	#product_container{
		.swiper-slide{
			.s-inner{
				width:7.5rem;
				height: 11.56rem;
				margin: 1.4rem auto;
				background: #fff;
				box-shadow: 0px 0px 8px 1px rgba(0,0,0,0.3);
				.s-inner-top{
					font-size:.45rem;
					color:#69696b;
					letter-spacing:0.72px;
					text-align:center;
					line-height: 1rem;
					padding-bottom: .5rem;
					img{
						width:100%;
						height:7.8rem;
						background:pink;
					}
				}
				.s-inner-bottom{
					border-top:2px dashed #c1c2c2;
				}
			}
		}
	}
	.c-yellow-btn{
		width: 2.2rem;
		height: .9rem;
		line-height: .9rem;
		font-size: .4rem;
		margin: .5rem auto .5rem auto;
		&.disabled{
			background:#e6e6e6;
			border-color:transparent;
			color:#fff;
		}
	}
	#exchange_pop{
		padding-bottom: .1rem;
		#exchange_pop_part1{
			min-height: 3rem;
			border-bottom: 2px dashed #d3d3d3;
			padding: .8rem .4rem .2rem .4rem;
		}
		#exchange_pop_part2{
			width:5.5rem;
			background: #f9f9f9;
			padding:0 .5rem;
			font-size: .32rem;
			color:#4c4c4c;
			margin:.3rem auto;
			>div{
				height: .8rem;
				line-height: .8rem;
				text-align: left;
				&:nth-of-type(1){
					border-bottom: 2px dashed #d3d3d3;
				}
			}
			.credit,.money{
				display:inline-block;
				padding-left:.5rem;
				background:url(../../assets/img/index/icon_score.png) left no-repeat;
				background-size: .45rem .45rem;
			}
			.money{
				background-image: url(../../assets/img/index/icon_money.png);
			}
			.plus{
				color:#979797;
			}
		}
	}
	#success_pop{
		padding: .5rem 0 .1rem 0;
		p:nth-of-type(1){
			font-size: .48rem;
			margin-bottom: .2rem;
		}
		p:nth-of-type(2){
			border-bottom: 2px dashed #bbb;
			padding: 0 .2rem .5rem .2rem;
			span{
				color: #F9C13A;
			}
		}
	}
</style>