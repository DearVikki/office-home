<template>
	<div>
		<questionitem v-for="list in lists"
		:question="list"
		:type="list.type"
		:index=4></questionitem>
	</div>
</template>
<script>
	import questionitem from '../../components/QuestionItem.vue'
	export default{
		name:'history',
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
				name:'xwlt.pc.MyBrowseLog',
				page:this.page
			}).then((response)=>{
				var lists = [];
				response.body.data.BrowseList.forEach((e)=>{
					if(e.reward_type==='money') e.type = 1;
					else e.type = 2;
					lists.push(e);
				})
				this.lists = lists;
			})
		},
		components:{questionitem}
	}
</script>