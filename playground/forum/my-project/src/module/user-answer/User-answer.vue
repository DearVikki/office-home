<template>
	<div>
		<a class="answer-item" v-for="a in answers" :href="'./question-detail.html?id='+a.question_id">
			<p v-if="a.status === 1">已接任务</p>
			<p v-if="a.status === 3">任务完成</p>
			<p v-if="a.status === 0" class="ellipsis2L">我的回答：{{a.content}}</p>
			<div class="answer-q">
				<div class="ellipsis2L">
					<span v-if="a.is_task">任务：</span>
					<span v-else>问题：</span>
					{{a.question}}
				</div>
			</div>
			<p>{{utcToDate(a.time)}}</p>
		</a>
		<!-- 缺省页 -->
		<div class="c-empty-bg" v-if="answers.length === 0">
			<div class="c-empty">
				<p>你还没有回答过问题</p>
				<a href="./index.html">去回答!</a>
			</div>
		</div>
		<!-- 到底部 -->
		<div class="c-end" v-if="loadAll && answers.length">都被你看完拉吼!</div>
	</div>
</template>
<script>
	import {utcToDate, myAlert, loadMore} from '../../assets/js/utils.js'
	export default{
		name:'answer',
		data(){
			return{
				page:1,
				answers:[],
				loadAll:false,
				answersDemo:[{
					content:'xxx',
					question:'xxxx?',
					is_task:0,
					time:1476076803
				}]
			}
		},
		mounted(){
			this.getData();
			loadMore.config.cb = this.getData;
			loadMore.open();
		},
		methods:{
			getData(){
				this.$http.post('',{
					name:'xwlt.pc.MyAnswer',
					page:this.page
				}).then((response)=>{
					let answers = [];
					response.body.data.Answer_list.forEach((e)=>{
						e.status = Number(e.status);
						e.time = e.addtime1? e.addtime1 : e.addtime2;
						answers.push(e);
					})
					this.answers = this.answers.concat(answers);
					loadMore.loading = false;
					this.page++;
					if(!answers.length && this.answers.length){
						myAlert.small('没有更多拉!');
						loadMore.loadAll = this.loadAll = true;
					}
				})
			},
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
		display: block;
		.answer-q{
			line-height:0.48rem;
			background: #f4f4f4;
			color:#4c4c4c;
			padding:0.21rem 0.21rem;
			margin: 0.23rem auto;
		}
	}
</style>