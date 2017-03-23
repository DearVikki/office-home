<template>
	<div style="margin-bottom:2rem">
		<questionDetailQ :question="question" :type="question_type"
		@answerQuestion="answerQuestion"></questionDetailQ>
		<questionDetailA v-for="answer in answers"
		:answer="answer" :type=answer.type
		@askMore="askMore"></questionDetailA>
		<!-- <questionDetailA :answer="answer1" :type=1
		@askMore="askMore(answer1)"></questionDetailA>
		<myfooter v-show="!inputStatus"></myfooter> -->
		<!-- 弹出打字框的透明蒙版 -->
		<div v-if="inputStatus" @click="inputStatus = false"
		id="trans_mask"></div>
		<transition name="custom-classes-transition"
		enter-active-class="animated slideInUp"
		leave-active-class="animated slideOutDown">
			<multiinput v-if="inputStatus" @send="newComment"></multiinput>
		</transition>
		<transition name="custom-classes-transition"
		enter-active-class="animated slideInUp"
		leave-active-class="animated slideOutDown">
			<multiinput v-if="textareaStatus" @send="newAnswer"></multiinput>
		</transition>
	</div>
</template>
<script>
	import myfooter from '../../components/Footer.vue'
	import multiinput from '../../components/multiinput.vue';
	import questionDetailQ from './question-detail-q.vue'
	import questionDetailA from './question-detail-a.vue'
	import {getParameterByName} from '../../assets/js/utils.js'
	export default{
		name:'questiondetail',
		data(){
			return{
				inputStatus:false,
				textareaStatus:false,
				question_id:'',
				question_type:1,
				page:1,
				question:{
					"question_id":"2",
		            "type_id":"4",
		            "type_label_id":"0",
		            "reward_type":"money",
		            "integral":"0",
		            "money":"10.00",
		            "question":"帮忙送个外卖",
		            "question_describe":
		            // 
		            "地址帮忙送个外卖帮忙送个外卖帮帮忙地址帮忙送个外卖帮忙送个外卖帮帮忙地址帮忙送个外卖帮忙送个外卖帮帮忙地址帮忙送个外卖帮忙送个外卖帮帮忙地址帮忙送个外卖帮忙送个外卖帮帮忙地址帮忙送个外卖帮忙送个外卖帮帮忙",
		            "path":null,
		            "userid":"1",
		            "addtime":"1476076803",
		            "browse_num":"0",
		            "is_task":"1",
		            "task_status":"1",
		            "endtime":"0",
		            "status":"0",
		            "solvetime":"0",
		            "hottime":"1488441415",
		            "hot":"10",
		            "head":"http:\/\/wx.qlogo.cn\/",
		            "username":"狐狸的味道",
		            "replynum":0,
		            "praisenum":0
				},
				answers:[],
				answer1:{
					content:'地址帮忙送个外卖帮忙送个外卖帮帮忙地址帮忙送个外卖帮忙送个外卖帮帮忙地址帮忙送个外卖帮忙送个外卖帮帮忙地址帮忙送个外卖帮忙送个外卖帮帮忙地址帮忙送个外卖帮忙送个外卖帮帮忙地址帮忙送个外卖帮忙送个外卖帮帮忙',
					username:'楼二学长',
					head:"http:\/\/wx.qlogo.cn\/",
					addtime:1476076833,
					praisenum:20,
					// 已采纳
					isAccepted:true,
					// 已点赞
					isPraised:true,
					comment:[{name:'不知道要说什么',content:'回答的非常好！'},{name:'不知道要说什么',content:'回答的非常好！'},{name:'不知道要说什么',content:'回答的非常好！'},{name:'不知道要说什么',content:'回答的非常好！'}]
				},
				activeAnswer:'',
				activeComment:'',
				userInfo:''
			}
		},
		mounted(){
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
				let answers = response.body.data.ReplyRList;
				answers.forEach((a)=>{
					a.isAccepted = Number(a.adopt);
					a.isPraised = Number(a.is_ReplyPraise);
					if(!Number(question.oneself)) a.type = 0;
					else if(!question.is_adopt) a.type = 1;
					else a.type = 2;
					a.comment = [];
					a.TowReplyList.forEach((r)=>{
						r.name = r.username;
						a.comment.push(r);
					})
				})
				this.answers = answers;
			})
		},
		methods:{
			closeInput(){
				this.inputStatus = false;
				document.querySelector('body').removeEventListener('click',this.closeInput,false);
			},
			askMore(answer,comment){
				this.inputStatus = true;
				this.activeAnswer = answer;
				this.activeComment = comment;
			},
			newComment(){
				var txt =  document.querySelector('.input-box').textContent;
				this.inputStatus = false;
				this.$http.post('',{
					name:'xwlt.pc.questionReply',
					questionid:this.question_id,
					b_user_id:this.activeComment.h_user_id,
					top_reply_id:this.activeAnswer.reply_id,
					reply_id:this.activeComment.reply_id,
					content: txt
				}).then((response)=>{
					if(response.body.success){
						this.activeAnswer.comment.push({name:this.userInfo.username,content:txt});
					} else alert(response.body.msg);
				})
			},
			answerQuestion(){
				this.textareaStatus = 
			}
		},
		components:{myfooter,multiinput,questionDetailQ,questionDetailA}
	}
</script>
<style lang='less' scoped>
	#trans_mask{
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
	}
</style>