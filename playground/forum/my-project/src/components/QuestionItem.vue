<template>
	<div class="question-item">
		<div class="question-inner">
			<!-- 右上角label -1表示置顶 0,1,2表示top 1,2,3 -->
			<div class="question-label" :class="{toppest:index==-1}"
			v-if="index==-1">置顶</div>
			<div class="question-label" :class="{top:index>=0 && index<3}"
			v-if="index>=0 && index<3">top{{index+1}}</div>
			<div class="question-header">
				<img :src="question.head">
				<span class="question-name">{{question.username}}</span>
			</div>
			<div class="question-main">
				<div class="question-content ellipsis2L">{{question.question}}</div>
				<div class="question-des ellipsis2L">{{question.question_describe}}</div>
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
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		name:'questionitem',
		mounted(){
		},
		watch:{
		},
		props:['question','type','index']
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
		padding: 0.27rem 0.4rem;
		position: relative;
		margin-top: 0.16rem;
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
				}
			}

		}
	}
</style>