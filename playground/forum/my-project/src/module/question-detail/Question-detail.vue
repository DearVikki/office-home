<template>
<div>
	<div id="question_main" ref="main">
		<questionDetailQ :question="question" :type="question_type"
		@answerQuestion="answerQuestion"
		@changeQuestionType="changeQuestionType"
		@popShow="popShow"></questionDetailQ>
		<questionDetailA v-for="answer in answers"
		:answer="answer"
		:type=answer.type
		@askMore="askMore"
		@adoptAnswer="adoptAnswer"
		@popShow="popShow"></questionDetailA>
		<!-- 缺省页 -->
		<div class="c-empty" v-if="answers.length === 0">
			<p>还没有人回答过这个问题</p>
			<a @click="answerQuestion">我来回答!</a>
		</div>
		<!-- 到底部 -->
		<div class="c-end" v-if="loadAll && answers.length">加载完成啦</div>
		<!-- 弹出打字框的透明蒙版 -->
		<div v-if="inputStatus || textareaStatus" @click="cancelComment"
		id="trans_mask"></div>
		<!-- scrollTop -->
		<scrollTop></scrollTop>
		<userpop :userpop="userpop"></userpop>
	</div>
	<div id="question_footer" ref="footer">
		<!-- <transition name="custom-classes-transition"
		enter-active-class="animated slideInUp"
		leave-active-class="animated slideOutDown"> -->
			<multiinput v-if="inputStatus" @send="newComment" @sizeChange="sizeChange"></multiinput>
		<!-- </transition>
		<transition name="custom-classes-transition"
		enter-active-class="animated slideInUp"
		leave-active-class="animated slideOutDown"> -->
			<multitextarea v-if="textareaStatus" @send="newAnswer" @sizeChange="sizeChange"></multitextarea>
		<!-- </transition> -->
	</div>
</div>
</template>
<script>
	import myfooter from '../../components/Footer.vue'
	import multiinput from '../../components/multiinput.vue';
	import multitextarea from '../../components/multitextarea.vue';
	import scrollTop from '../../components/scrollTop.vue'
	import userpop from '../../components/UserPop.vue'
	import questionDetailQ from './question-detail-q.vue'
	import questionDetailA from './question-detail-a.vue'
	import {getParameterByName} from '../../assets/js/utils.js'
	import {myAlert, loadMoreUpdate} from '../../assets/js/utils.js';
	export default{
		name:'questiondetail',
		data(){
			return{
				inputStatus:false,
				textareaStatus:false,
				question_id:'',
				question_type:1,
				page:1,
				question:{},
				answers:[],
				loadAll:false,
				activeAnswer:'',
				activeComment:'',
				userInfo:'',
				userpop:'',
				loadMoreUpdate:''
			}
		},
		mounted(){
			this.getData(() => {
				this.$nextTick(() => {
					// 注意这里是main的内里包裹着滚动条喔 不是body的滚动条
					let main = document.getElementById('question_main');
					// 页面不足一页时(即无滚动条) 直接给出加载完成的toast
					if(main.scrollHeight === Math.round(main.getBoundingClientRect().height)) this.loadAll = true;
					// 页面高于一页时 绑到下拉加载
					else {
						this.loadMoreUpdate = new loadMoreUpdate({
							el: document.getElementById('question_main'),
							cb: this.getData
						});
						this.loadMoreUpdate.open();
					}
				})
			});
			this.resizeDivs();
		},
		methods:{
			resizeDivs(){
				let footerHeight = this.$refs.footer.getBoundingClientRect().height;
				this.$refs.main.style.height = window.innerHeight  - footerHeight + 'px';
				this.$refs.footer.style.top = window.innerHeight - footerHeight + 'px';
			},
			sizeChange(){
				// setTimeout(()=>{
				// 	this.resizeDivs();
				// }, 300)
			},
			scrollBottom(){

			},
			getData(cb){
				cb = cb || function(){};
				this.$http.post('',{
					name:'xwlt.pc.PersonalInfo'
				}).then((response)=>{
					this.userInfo = response.body.data.userInfo;
				})
				this.question_id = getParameterByName('id');
				this.$http.post('',{
					name:'xwlt.pc.questionView',
					questionid: this.question_id,
					page: this.page
				}).then((response)=>{
					let type, question = response.body.data.MoneyRList;
					if(this.page === 1) {
						question.is_Praise = Number(question.is_Praise);
						if(question.path) question.path = question.path.split(',');
						this.question = question;
						switch(Number(question.task_status)){
							// 抢任务
							case 1:
								if(Number(question.oneself)) type = 4;
								else type = 1;
								break;
							// 已被抢
							case 2:
								if(Number(question.oneself)) type = 5;
								else if(Number(question.taskuser)) type = 3;
								else type = 2;
								break;
							// 任务完成
							case 3:
								type = 6;
								break;
							// 任务过期
							case 4:
								type = 7;
								break;
						}
						this.question_type = type;
					}
					let answers = response.body.data.ReplyRList || [];
					if(!answers.length && this.answers.length){
						this.loadMoreUpdate.close();
						this.loadAll = true;
						myAlert.small('没有更多拉!');
					} else {
						answers.forEach((a)=>{
							a.isAccepted = Number(a.adopt);
							a.isPraised = Number(a.is_ReplyPraise);
							if(!Number(question.oneself)) a.type = 0;
							else if(!Number(question.is_adopt)) a.type = 1;
							else a.type = 2;
							a.comment = [];
							a.TowReplyList.forEach((r)=>{
								r.name = r.username;
								a.comment.push(r);
							})
						})
						this.answers = this.answers.concat(answers);
					}
					if(this.page > 1) this.loadMoreUpdate.loading = false;
					this.page++;
					cb();
				})
			},
			// 点击新增二级回复
			askMore(answer,comment){
				this.inputStatus = true;
				this.$nextTick(() => {
					this.resizeDivs();
				})
				this.activeAnswer = answer;
				this.activeComment = comment;
			},
			// 新增二级回复
			newComment(txt){
				this.inputStatus = false;
				setTimeout(() => {
					this.resizeDivs();
				}, 100)
				this.$http.post('',{
					name:'xwlt.pc.questionReply',
					questionid:this.question_id,
					b_user_id:this.activeComment.h_user_id||this.activeAnswer.h_user_id,
					top_reply_id:this.activeAnswer.reply_id,
					// 二级回复 || 追问
					reply_id:this.activeComment.reply_id ||this.activeAnswer.reply_id,
					content: txt
				}).then((response)=>{
					if(!response.loveU) return;
					this.activeAnswer.comment.push({name:this.userInfo.username,content:txt});
					myAlert.small('回复成功');
				})
			},
			// 点击新增一级回答
			answerQuestion(){
				this.textareaStatus = true;
				this.$nextTick(() => {
					this.resizeDivs();
				})
			},
			// 新增一级回答
			newAnswer(txt){
				this.textareaStatus = false;
				this.$nextTick(() => {
					this.resizeDivs();
				})
				this.$http.post('',{
					name:'xwlt.pc.questionReply',
					questionid:this.question_id,
					b_user_id:this.question.userid,
					top_reply_id:'',
					reply_id:'',
					content: txt
				}).then((response)=>{
					if(!response.loveU) return;
					// 需要返回其他信息！
					var answer = response.body.data.OneReply;
					answer.type = 0;
					answer.comment = [];
					this.answers.push(answer);
					myAlert.small('回答成功');
				})
			},
			// 点击蒙版取消回答
			cancelComment(){
				this.inputStatus = this.textareaStatus = false;
				this.$nextTick(() => {
					this.resizeDivs();
				})
			},
			// 作者采纳回答
			adoptAnswer(answer){
				this.$http.post('',{
					name:'xwlt.pc.Adopt',
					question_id:this.question_id,
					reply_id: answer.reply_id
				}).then((response)=>{
					if(!response.loveU) return;
					answer.isAccepted = true;
					myAlert.small('采纳成功');
				})
			},
			// 改变question type
			changeQuestionType(type){
				this.question_type = type;
			},
			// 用户小头像弹框
			popShow(id){
				this.$http.post('',{
					name:'xwlt.pc.UserInfo',
					userid:id
				}).then((response)=>{
					this.userpop = response.body.data.userinfo;
					this.userpop.show = true;
				})
			}
		},
		components:{myfooter,multiinput,multitextarea,scrollTop,questionDetailQ,questionDetailA, userpop}
	}
</script>
<style lang='less' scoped>
	#question_main{
		padding-bottom:0rem;
		overflow-y: scroll;
	}
	#trans_mask{
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
	}
	#question_footer{
		position: absolute;
		left: 0;
		width: 100%;
	}
</style>