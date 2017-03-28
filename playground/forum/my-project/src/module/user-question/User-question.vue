<template>
	<div>
		<a v-for="q in lists" class="user-question-item" :href="'./question-detail.html?id='+ q.question_id">
			<div class="q-title ellipsis2L">{{q.question}}</div>
			<div class="q-describe ellipsis3L">{{q.question_describe}}</div>
			<div class="q-footer">
				<div class="q-footer-left fl">
					<span class="q-money ellipsis" v-if="q.reward_type==='money'">{{Number(q.money).toFixed()}}</span>
					<span class="q-credit ellipsis" v-else>{{Number(q.integral).toFixed()}}</span>
					<span class="q-time">{{utcToDate(q.addtime)}}</span>
				</div>
				<div class="q-footer-right fr" v-if="!q.is_cn">
					<a class="c-btn" :href="'./user-question-edit.html?id='+q.question_id">增加悬赏</a>
					<a class="c-btn" :href="'./user-question-edit.html?id='+q.question_id">补充描述</a>
				</div>
				<div class="q-footer-right fr" v-else>
					<div class="c-btn disabled" v-if="q.is_cn===1">已采纳</div>
					<div class="c-btn disabled" v-if="q.is_cn===2">已完成</div>
					<div class="c-btn disabled" v-if="q.is_cn===3">已被抢</div>
					<div class="c-btn disabled" v-if="q.is_cn===4">已失效</div>
				</div>
			</div>
		</a>
		<!-- 缺省页 -->
		<div class="c-empty" v-if="lists.length === 0">
			<p>你还没有发起过提问</p>
			<a href="./ask.html">去做个问题宝宝!</a>
		</div>
	</div>
</template>
<script>
	import {utcToDate} from '../../assets/js/utils.js'
	export default{
		name:'question',
		data(){
			return{
				page:1,
				lists:[{
					"question_id":"2",
					"type_id":"4",
					"type_label_id":"0",
					"reward_type":"money",
					"integral":"0",
					"money":"10.00",
					"question":"帮忙送个外卖",
					"question_describe":"地址帮忙送个外卖帮忙送个外卖帮帮忙",
					"path":null,
					"userid":"1",
					"addtime":"1476076803",
					"browse_num":"0",
					// 是否是跑腿任务
					"is_task":0,
					"task_status":"1",
					"endtime":"0",
					// 暂定：1表示已采纳或已接任务
					"status":1,
					"solvetime":"0",
					"hottime":"1488441415",
					"hot":"10",
					"head":"http:\/\/wx.qlogo.cn\/",
					"username":"狐狸的味道",
					"replynum":0,
					"praisenum":0
				}]
			}
		},
		mounted(){
			this.$http.post('',{
				name:'xwlt.pc.MyQuestion',
				page:this.page
			}).then((response)=>{
				let question = [];
				response.body.data.question.forEach((e)=>{
					e.is_cn = Number(e.is_cn);
					question.push(e);
				})
				this.lists = question;
			})
		},
		methods:{
			utcToDate(time){
				return utcToDate(time);
			}
		}
	}
</script>
<style lang='less' scoped>
	.vertical{
		display:inline-block;
		vertical-align:middle;
	}
	.user-question-item{
		padding:0.27rem 0.44rem;
		background:#fff;
		margin-bottom:0.13rem;
		display: block;
		.q-title{
			font-size:.4rem;
			color:#5c5c5c;
			line-height:0.64rem;
		}
		.q-describe{
			font-size: 0.35rem;
			color:#999;
			line-height:0.48rem;
		}
		.q-footer{
			height:1rem;
			line-height:1rem;
			border-top:1px solid #d3d3d3;
			margin-top:0.27rem;
			.q-money,.q-credit{
				width:1.4rem;
				height: 0.48rem;
				line-height:.48rem;
				padding-left:0.61rem;
				background:url(../../assets/img/index/icon_money.png) left no-repeat;
				background-size: 0.47rem 0.48rem;
				font-size:0.37rem;
				color:#4c4c4c;
				margin-top:0.24rem;
				.vertical;
			}
			.q-credit{
				background-image: url(../../assets/img/index/icon_score.png);
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
			.c-btn{
				margin-left:.4rem;
				margin-top:0.2rem;
				.vertical;
			}
		}
	}
</style>