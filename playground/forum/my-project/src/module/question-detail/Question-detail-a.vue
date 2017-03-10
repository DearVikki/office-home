<template>
	<div class="answer-item">
		<!-- 已采纳label -->
		<div class="answer-label">已采纳</div>
		<div class="a-head c-head">
			<img :src="answer.head">
			<span class="c-txt2">{{answer.username}}</span>
		</div>
		<div class="answer-content">
			<div class="answer-main"
			:class="{long:answer.content>73}">{{answerContent}}</div>
		</div>
	</div>
</template>
<script>
	export default{
		name:'questionDetailA',
		data(){
			return{
				isOpen:false
			}
		},
		computed:{
			answerContent(){
				let a = this.answer.content;
				if(this.isOpen) return a;
				else return a.length < 73 ? a: a.slice(0,73)+'...';
			}
		},
		props:['answer']
	}
</script>
<style lang='less' scoped>
	.answer-item{
		padding:0.31rem .4rem;
		position: relative;
		background: #fff;
		margin-top: 0.16rem;
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
		.answer-main{
			font-size:0.35rem;
			color:#5c5c5c;
			letter-spacing:-1.86px;
			line-height:0.64rem;
			position: relative;
			&.long:before{
				content:'显示全部';
				font-size:0.35rem;
				color:#f9c13a;
				position: absolute;
				right: 0;
				bottom:0;
			}
		}
	}
</style>
