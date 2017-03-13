<template>
	<div id="question_detail_q_container">
		<div id="q_header">
			<div id="q_header_left" class="c-head">
				<img :src="question.head">
				<span class="c-txt2">{{question.username}}</span>
			</div>
			<div id="q_header_right" class="c-praise">{{question.praisenum}}</div>
		</div>
		<div id="q_main">
			<p id="q_title">{{question.question}}</p>
			<p id="q_des" :class="{isOpen:isOpen}"
			@click="isOpen = true">{{describeContent}}</p>
		</div>
		<div id="q_footer">
			<div class="q-footer-left fl">
				<span class="q-money ellipsis">{{Number(question.money).toFixed()}}</span>
				<span class="q-time">{{utcToDate(question.addtime)}}</span>
			</div>
			<div class="q-footer-right fr c-yellow-btn">回答</div>
			<div class="clear"></div>
			<!-- 跑腿抢任务 -->
			<div v-if="type===1" class="c-btn">抢任务</div>
			<div v-if="type===2" class="c-btn disabled">已被抢</div>
			<div v-if="type===3" class="c-btn">取消任务</div>
			<div v-if="type===4" class="c-btn">带被抢</div>
			<div v-if="type===5" class="c-btn">确认完成</div>
			<div v-if="type===6" class="c-btn">已完成</div>
		</div>
	</div>
</template>
<script>
	import {utcToDate} from '../../assets/js/utils.js'
	export default{
		name:'questionDetailQ',
		data(){
			return{
				isOpen:false
			}
		},
		methods:{
			utcToDate(time){
				return utcToDate(time);
			}
		},
		computed:{
			describeContent(){
				let d = this.question.question_describe;
				if(this.isOpen) return d;
				else return d.length < 73 ? d: d.slice(0,73)+'...';
			}
		},
		// type:　０问题详情页　
		// 他人看到：１跑腿抢任务 2跑腿已被抢 3跑腿取消任务
		// 自己看到：4跑腿待被抢 5跑腿确认完成 6跑腿已完成
		props:['question','type']
	}
</script>
<style lang='less' scoped>
	.vertical{
		vertical-align: middle;
		display: inline-block;
	}
	#question_detail_q_container{
		padding: 0.27rem .4rem;
		background: #fff;
		#q_header{
			overflow: hidden;
			#q_header_left{
				float: left;
			}
			#q_header_right{
				float: right;
				margin-top: .5rem;
			}
		}
		#q_main{
			padding-top:0.2rem;
			padding-bottom:.2rem;
			#q_title{
				font-size:0.4rem;
				color:#5c5c5c;
				line-height:0.64rem;
				font-weight:bold;
			}
			#q_des{
				font-size:0.35rem;
				color:#999;
				max-height:1000px;
				word-wrap:break-word;
				position:relative;
				&:before{
					content:'显示全部';
					font-size:0.32rem;
					color:#f9c13a;
					position: absolute;
					right:0;
					bottom:0
				}
				&.isOpen:before{
					content:'';
				}
			}
		}
		#q_footer{
			overflow:hidden;
			border-top:1px solid #d3d3d3;
			text-align:center;
			.q-money{
				width:1.4rem;
				height: 0.48rem;
				line-height:.48rem;
				padding-left:0.61rem;
				background:url(../../assets/img/index/icon_score.png) left no-repeat;
				background-size: 0.47rem 0.48rem;
				font-size:0.37rem;
				color:#4c4c4c;
				margin-top:0.24rem;
				.vertical;
			}
			.q-time{
				padding-left:0.13rem;
				border-left: 1px solid #d3d3d3;
				font-size:0.35rem;
				color: #d3d3d3;
				height:0.32rem;
				line-height:.32rem;
				margin-top:0.29rem;
				.vertical;
			}
			.c-yellow-btn{
				margin-top:0.2rem;
			}
			.c-btn{
				margin-top:0.27rem;
			}
		}
	}
</style>