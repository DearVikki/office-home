<template>
	<div>
		<div class="answer-item" v-for="a in answers">
			<p v-if="a.is_task">已接任务</p>
			<p v-else class="ellipsis2L">我的回答：{{a.answer}}</p>
			<div class="answer-q">
				<div class="ellipsis2L">
					<span v-if="a.is_task">任务：</span>
					<span v-else>问题：</span>
					{{a.question}}
				</div>
			</div>
			<p>{{utcToDate(a.time)}}</p>
		</div>
	</div>
</template>
<script>
	import {utcToDate} from '../../assets/js/utils.js'
	export default{
		name:'answer',
		data(){
			return{
				answers:[{
					answer:'xxx',
					question:'xxxx?',
					is_task:0,
					time:1476076803
				}]
			}
		},
		methods:{
			utcToDate(time){
				return utcToDate(time);
			}
		}
	}
</script>
<style lang='less' scoped>
	.answer-item{
		background:#fff;
		padding:0.22rem .4rem;
		font-size: 0.35rem;
		color:#999;
		margin-bottom:0.13rem;
		.answer-q{
			line-height:0.48rem;
			background: #f4f4f4;
			color:#4c4c4c;
			padding:0.21rem 0.21rem;
			margin: 0.23rem auto;
		}
	}
</style>