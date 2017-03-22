<template>
	<div class="question-item">
		<div class="question-inner">
			<div class="question-label" :class="{toppest:index==-1}"
			v-if="index==-1">置顶</div>
			<div class="question-label" :class="{top:index>=0 && index<3}"
			v-if="index>=0 && index<3">top{{index+1}}</div>
			<div class="question-header">
				<img :src="question.head"
				@click="pop.show=true">
				<span class="question-name"
				@click="pop.show=true">{{question.username}}</span>
			</div>
			<div class="question-main">
				<div class="question-content ellipsis2L">{{question.question}}</div>
				<div class="question-des ellipsis3L">{{question.question_describe}}</div>
			</div>
			<div class="question-footer">
				<div class="question-info">
					<div>{{question.browse_num}}</div>
					<div>{{question.praisenum}}</div>
					<div>{{question.replynum}}</div>
				</div>
				<!-- 热度 -->
				<div class="question-info-right fire" v-if="type===0">{{question.hot}}</div>
				<!-- 赏金 -->
				<div class="question-info-right gold" v-if="type===1"></div>
				<!-- 积分 -->
				<div class="question-info-right coin" v-if="type===2"></div>
				<!-- 待抢任务 -->
				<div class="question-info-right task-to" v-if="type===3">待被抢</div>
				<!-- 已抢任务 -->
				<div class="question-info-right task-done"  v-if="type===4">已被抢</div>
				<!-- 已完成 -->
				<div class="question-info-right task-done"  v-if="type===5">已完成</div>
			</div>
		</div>
		<!-- 用户信息弹窗 -->
		<pop :pop="pop">
			<div class="question-item-pop">
				<img class="pop-head" :src="img">
				<div class="pop-name">
					<span>花花学长</span>
					<span class="pop-label" v-if="label">{{label}}</span>
				</div>
				<div class="pop-info">
					<div class="pop-info-item">
						<span>积分</span><span>200</span>
					</div>
					<div class="pop-info-item">
						<span>回答</span><span>233</span>
					</div>
					<div class="pop-info-item">
						<span>获赞</span><span>209</span>
					</div>
				</div>
				<div class="btn">私信</div>
			</div>
		</pop>
	</div>
</template>
<script>
	import img from '../assets/img/index/icon_personal_pressed.png'
	import pop from './Pop.vue'
	export default{
		name:'questionitem',
		data(){
			return{
				img:img,
				label:'飞毛腿',
				pop:{
					show:false,
					style:{
						width:'7.87rem',
						height:'3.83rem'
					}
				}
			}
		},
		// type:0表示热度 1表示赏金 2表示积分 3表示待被抢任务 4表示已被抢任务
		// index:-1表示置顶 1~3表示top1~3 4以上表示label无特殊显示
		props:['question','type','index'],
		components:{pop}
	}
</script>
<style lang='less' scoped>
	.vertical{
		display: inline-block;
		vertical-align: middle;
	}
	.mainTxt{
		font-size:0.4rem;
		color:#4c4c4c;
	}
	.subTxt{
		font-size: 0.37rem;
		color: #4c4c4c;
	}
	.question-item{
		padding: 0.27rem 0.4rem 0 .4rem;
		position: relative;
		margin-bottom: 0.16rem;
		background:#fff;
		.question-label{
			font-size:0.27rem;
			color:#ffffff;
			position:absolute;
			right:0;
			top:0;
			border-radius:0 0 0 0.88rem;
			width:0.88rem;
			height:0.79rem;
			text-align:right;
			line-height:.6rem;
			padding-right:0.08rem;
			&.toppest{
				background:#ffd345;
				box-shadow:-0.03rem 0.03rem 0.08rem 0 rgba(218,188,58,.7);
			}
			&.top{
				background: #ff545a;
				box-shadow:-0.03rem 0.03rem 0.08rem 0 rgba(207,67,72,.7);
			}
		}
		.question-inner{
			.question-header{
				img{
					width: 1.31rem;
					height: 1.31rem;
					border-radius: 100%;
					.vertical;
				}
				.question-name{
					margin-left: 0.4rem;
					.vertical;
					.mainTxt;
				}
			}
			.question-main{
				padding: 0.27rem 0;
				.question-content{
					.mainTxt;
				}
				.question-des{
					font-size:0.37rem;
					color:#999999;
					letter-spacing:0px;
					line-height:0.48rem;
					margin-top: 0.13rem;
				}
			}
			.question-footer{
				border-top: 1px solid #d3d3d3;
				padding:.27rem 0;
				overflow: hidden;
				.question-info{
					display: flex;
					justify-content: left;
					float: left;
					div{
						width:1.2rem;
						height: .53rem;
						line-height: .53rem;
						padding-left: 0.53rem;
						background-repeat: no-repeat;
						background-position: 0 center;
						background-size: 0.37rem;
						margin-right: .4rem;
						.subTxt;
						&:nth-of-type(1){
							background-image: url(../assets/img/index/icon_eye.png);
							background-size: 0.47rem 0.28rem;
							padding-left: 0.63rem;
						}
						&:nth-of-type(2){
							background-image: url(../assets/img/index/icon_zan.png);
						}
						&:nth-of-type(3){
							background-image: url(../assets/img/index/icon_pinglun.png);
						}
					}
				}
				.question-info-right{
					float:right;
					width:1.07rem;
					height: 0.53rem;
					padding-left: 0.56rem;
					background-repeat: no-repeat;
					background-position: 0 center;
					margin-right: 0.1rem;
					.subTxt;
					&.fire{
						background-image: url(../assets/img/index/icon_fire.png);
						background-size: 0.39rem .48rem;
					}
					&.coin{
						background-image: url(../assets/img/index/icon_score.png);
						background-size: 0.47rem 0.48rem;
					}
					&.gold{
						background-image: url(../assets/img/index/icon_money.png);
						background-size: 0.45rem 0.49rem;
					}
					&.task-to,&.task-done{
						padding-left: 0;
						border:1px solid #1e8ae8;
						border-radius:0.08rem;
						width:1.57rem;
						height:0.61rem;
						line-height: .61rem;
						text-align: center;
						color:#1e8ae8;
					}
					&.task-done{
						border-color:#d3d3d3;
						color:#d3d3d3;
					}
				}
			}

		}
	}
	.question-item-pop{
		position:relative;
		padding:0.93rem 0 .4rem 0;
		.pop-head{
			position:absolute;
			left:3.07rem;
			top:-0.85rem;
			border:0.05rem solid #ffffff;
			box-shadow:0 0.05rem 0.11rem 0 rgba(0,0,0,0.22);
			width:1.6rem;
			height:1.6rem;
			border-radius:100%;
			background:#fff;
		}
		.pop-name{
			text-align:center;
			font-size:0.37rem;
			color:#333;
			padding-bottom:0.29rem;
			border-bottom:1px solid #d3d3d3;
			span{
				.vertical;
			}
			.pop-label{
				background:#ffe857;
				border:1px solid #4c4c4c;
				border-radius:100px;
				padding:0 0.07rem;
				margin-left:0.1rem;
				font-size:0.27rem;			
			}
		}
		.pop-info{
			padding-top:.29rem;
			margin-bottom:0.38rem;
			display:flex;
			justify-content:space-around;
			font-size:0.32rem;
			color:#999;
			.pop-info-item span:nth-of-type(2){
				color:#333;
				margin-left:0.11rem;
			}
		}
	}
</style>