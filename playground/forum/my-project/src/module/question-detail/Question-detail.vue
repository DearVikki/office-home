<template>
	<div>
		<questionDetailQ :question="question" :type=1></questionDetailQ>
		<questionDetailA :answer="answer" :type=1></questionDetailA>
		<myfooter></myfooter>
	</div>
</template>
<script>
	import myfooter from '../../components/Footer.vue'
	import questionDetailQ from './question-detail-q.vue'
	import questionDetailA from './question-detail-a.vue'
	export default{
		name:'questiondetail',
		data(){
			return{
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
				answer:{
					content:'地址帮忙送个外卖帮忙送个外卖帮帮忙地址帮忙送个外卖帮忙送个外卖帮帮忙地址帮忙送个外卖帮忙送个外卖帮帮忙地址帮忙送个外卖帮忙送个外卖帮帮忙地址帮忙送个外卖帮忙送个外卖帮帮忙地址帮忙送个外卖帮忙送个外卖帮帮忙',
					username:'楼二学长',
					head:"http:\/\/wx.qlogo.cn\/",
					addtime:1476076833,
					praisenum:20
				}
			}
		},
		components:{myfooter,questionDetailQ,questionDetailA}
	}
</script>
<style lang='less' scoped>
	
</style>