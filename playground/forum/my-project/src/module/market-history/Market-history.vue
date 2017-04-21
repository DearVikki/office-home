<template>
	<div>
		<div class="exchange-item" v-for="item in ModeLogList">
			<div class="item-main">
				<img :src="item.path">
				<div class="item-right">
					<p class="item-title">{{item.title}}</p>
					<p class="item-des">
						<span class="credit" v-show="item.integral">{{item.integral}}</span>
						<span class="plus" v-show="item.integral&&item.money"> + </span>
						<span class="money" v-show="item.money">{{item.money}}</span>
					</p>
				</div>
			</div>
			<div class="item-footer">
				<div class="fl">{{utcToDate(item.addtime)}}</div>
				<div class="c-yellow-btn fr" v-if="item.status == 1" @click="clickAddress(item)">兑换地址</div>
				<div class="c-yellow-btn disabled fr" v-else>已领取</div>
			</div>
		</div>
		<pop :pop="pop">
			<div id="address_pop">
				<p>兑换地址</p>
				<p>凭兑换记录到<span>{{address}}</span>领取</p>
				<div class="c-yellow-btn" @click="pop.show = false">确定</div>
			</div>
		</pop>
		<!-- 缺省页 -->
		<div class="c-empty" v-if="ModeLogList.length === 0">
			<p>你还没有任何兑换历史</p>
			<a href="./market.html">去兑换!</a>
		</div>
	</div>
</template>
<script>
	import pop from '../../components/Pop.vue';
	import {myAlert, utcToDate} from '../../assets/js/utils.js';
	export default{
		name:'markethistory',
		data(){
			return{
				"ModeLogList":[{
				    "path":"https:\/\/ss0.bdstatic.com",
				    "title":"测试商品大礼包",
				    "content":"测试商品各种商品",
				    "addtime":"1489731516",
				    "status":"1",
				    "integral":10,
				    "money":0,
				    "address":''
				}],
				pop:{
					show:false,
					style:{
						width:'7.8rem'
					}
				},
				address:''
			}
		},
		mounted(){
			this.$http.post('',{
				name:'xwlt.pc.ShoppingModeLog'
			}).then((response) => {
				response.body.data.ModeLogList.forEach((e) => {
					e.integral = Number(e.integral);
					e.money = Number(e.money);
				})
				this.ModeLogList = response.body.data.ModeLogList || [];
				if(this.ModeLogList.length === 0) document.getElementsByTagName('html')[0].style.background = '#fff';
			})
		},
		methods:{
			utcToDate(t){
				return utcToDate(t);
			},
			clickAddress(item){
				this.address = item.address;
				this.pop.show = true;
			}
		},
		components:{pop}
	}
</script>
<style lang='less' scoped>
	.exchange-item{
		background: #fff;
		margin-bottom: .21rem;
		padding: .48rem .48rem 0;
		.item-main{
			border-bottom:1px solid rgba(211,211,211,0.50);
			padding-bottom: .48rem;
			img{
				width: 1.89rem;
				height: 2.13rem;
				margin-right: .48rem;
				vertical-align: middle;
			}
			.item-right{
				display: inline-block;
				vertical-align: middle;
				.item-title{
					font-size:.37rem;
					color:#242424;
					letter-spacing:-0.05px;
				}
				.item-des{
					margin-top: .5rem;
					.credit,.money{
						font-size: .32rem;
						color:#4c4c4c;
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
		}
		.item-footer{
			overflow: hidden;
			height: 1.14rem;
			.fl{
				font-size:.34rem;
				color:#5c5c5c;
				letter-spacing:-0.05px;
				margin-top: .3rem;
			}
			.fr{
				margin-top: .3rem;
				&.disabled{
					border: 1px solid #d3d3d3;
					color: #d3d3d3;
					background: #fff;
				}
			}
		}
	}
	#address_pop{
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
		.c-yellow-btn{
			width: 2.2rem;
			height: .9rem;
			line-height: .9rem;
			font-size: .4rem;
			margin: .5rem auto .5rem auto;
		}
	}
	
</style>