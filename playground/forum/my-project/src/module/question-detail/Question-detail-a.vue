<template>
	<div class="answer-item">
		<!-- 已采纳label -->
		<div class="answer-label" v-if="answer.isAccepted&&type">已采纳</div>
		<div class="answer-label" v-if="answer.isAccepted&&!type">被采纳</div>
		<!-- 仅提问者可见：评字按钮 -->
		<div class="answer-action" v-if="type"
		@click="actionPop = !actionPop">
			<div class="action-pop type1" v-if="type===1"
			v-show="actionPop">
				<span @click="askMore">追问</span>
				<span>采纳</span>
			</div>
			<div class="action-pop type2" v-if="type===2"
			v-show="actionPop">
				<span @click="askMore">追问</span>
			</div>
		</div>
		<div class="answer-head c-head">
			<img :src="answer.head">
			<span class="c-txt2">{{answer.username}}</span>
		</div>
		<div class="answer-content">
			<div class="answer-main"
			:class="{isOpen:isOpen,short:answer.content.length<78}"
			@click="isOpen = !isOpen">{{answerContent}}</div>
			<div class="comment-main" v-if="answer.comment.length>0">
				<div class="comment-item" v-for="c in commentContent"
				@click="askMore(c)">
					<span class="c-name">{{c.name}}:</span>
					<span class="c-content">{{c.content}}</span>
				</div>
				<div class="more-comment" v-show="moreComment>0"
				@click="commentOpenLayer++">还有{{moreComment}}条追问...</div>
				<div class="close-comment" v-show="commentOpenLayer>0"
				@click="commentOpenLayer=0">收起</div>
			</div>
		</div>
		<div class="answer-footer">
			<div class="answer-time">{{utcToDate(answer.addtime)}}</div>
			<div class="c-praise" :class="{active:answer.isPraised}">{{answer.replyPraiseNum}}</div>
		</div>
		<!-- <transition name="custom-classes-transition"
		enter-active-class="animated slideInUp"
		leave-active-class="animated slideOutDown">
			<multiinput v-if="inputStatus" @send="newComment"></multiinput>
		</transition> -->
	</div>
</template>
<script>
	import {utcToDate} from '../../assets/js/utils.js';
	import multiinput from '../../components/multiinput.vue';
	import 'animate.css';
	export default{
		name:'questionDetailA',
		data(){
			return{
				// 评字弹窗
				actionPop:false,
				// 回答主体是否打开
				isOpen:false,
				// 评论打开层数
				commentOpenLayer:0,
				// 是否在追问状态
				inputStatus:false
			}
		},
		mounted(){
		},
		computed:{
			answerContent(){
				let a = this.answer.content;
				if(this.isOpen) return a;
				else return a.length < 78 ? a: a.slice(0,78)+'...';
			},
			commentContent(){
				let c = this.answer.comment;
				return c.slice(0,2+this.commentOpenLayer*5);
			},
			moreComment(){
				return this.answer.comment.length - (2 + this.commentOpenLayer*5);
			}
		},
		methods:{
			utcToDate(time){
				return utcToDate(time);
			},
			askMore(comment){
				this.$emit('askMore',this.answer,comment);
			}
		},
		// type: 0无关人 1提问者自己且未采纳答案 2提问者自己且已采纳答案
		props:['answer','type'],
		components:{multiinput}
	}
</script>
<style lang='less' scoped>
	@baseColor:#f9c13a;
	.max{
		max-height:1000px;
	}
	.answer-item{
		padding:0.31rem .4rem;
		position: relative;
		background: #fff;
		margin-top: 0.16rem;
		.max;
		.answer-label{
			font-size:0.27rem;
			color:#ffffff;
			position:absolute;
			right:0;
			top:0;
			border-radius:0 0 0 0.88rem;
			width:1.16rem;
			height:1.07rem;
			text-align:right;
			line-height:.9rem;
			padding-right:0.08rem;
			background:#6bacf8;
			box-shadow:-2px 2px 6px 0px rgba(83,131,186,0.55);
		}
		.answer-action{
			width:0.56rem;
			height:.56rem;
			position:absolute;
			right:0.56rem;
			top:0.69rem;
			background:url(../../assets/img/index/icon_ping.png) center no-repeat;
			background-size:100%;
			.action-pop{
				position:absolute;
				top:-1.1rem;
				right:-.15rem;
				font-size:0.37rem;
				color:#fff;
				&:before{
					content:'';
					border:.2rem solid transparent;
					border-top-width:.18rem;
					border-top-color:rgba(0,0,0,.64);
					position:absolute;
					right:0.27rem;
					bottom:-.37rem;
				}
				span{
					width:1.85rem;
					height:0.8rem;
					line-height:0.8rem;
					float:left;
					text-align:center;
					background:rgba(0,0,0,.64);
				}
				&.type1{
					width:3.5rem;
					span{
						width:50%;
						&:nth-of-type(1){
							border-radius:.15rem 0 0 .15rem;
							border-right:1px solid #fff;
						}
						&:nth-of-type(2){
							border-radius:0 .15rem .15rem 0;
						}
					}
				}
				&.type2 span{
					border-radius:.15rem;
				}
			}
		}
		.answer-main{
			font-size:0.35rem;
			color:#5c5c5c;
			letter-spacing:-1.86px;
			line-height:0.64rem;
			position: relative;
			padding:.2rem 0;
			.max;
			&:before{
				content:'显示全部';
				font-size:0.35rem;
				color:#f9c13a;
				position: absolute;
				right: 0;
				bottom:.2rem;
			}
			&.isOpen:before{
				content:'收起全部';
			}
			&.short:before{
				content:'';
			}
		}
		.comment-main{
			font-size:0.32rem;
			color:#4c4c4c;
			padding:0.2rem 0;
			line-height:.5rem;
			position:relative;
			border-top:1px solid #d3d3d3;
			.max;
			.c-name,.more-comment,.close-comment{
				color:@baseColor;
			}
			.more-comment{
				margin-top: .1rem;
				font-weight:bold;
				display:inline-block;
			}
			.close-comment{
				position:absolute;
				right:0;
				bottom:.2rem;
				padding-left:28px;
				font-weight:bold;
				background:url(../../assets/img/index/icon_up.png) left center no-repeat;
				background-size:0.25rem 0.16rem;
			}
		}
		.answer-footer{
			overflow:hidden;
			.answer-time{
				font-size:0.35rem;
				color:#d3d3d3;
				float:left;
			}
			.c-praise{
				float:right;
			}
		}
	}
</style>
