<template>
	<div>
		<questionitem v-for="list in lists"
		:question="list"
		:type="list.type"
		:index=4></questionitem>
		<!-- 缺省页 -->
		<div class="c-empty-bg" v-if="lists.length === 0">
			<div class="c-empty">
				<p>你还没有任何浏览历史</p>
				<a href="./index.html">去浏览!</a>
			</div>
		</div>
		<!-- 到底部 -->
		<div class="c-end" v-if="loadAll && lists.length">都被你看完拉!</div>
	</div>
</template>
<script>
	import questionitem from '../../components/QuestionItem.vue'
	import {utcToDate, myAlert, loadMore} from '../../assets/js/utils.js'
	export default{
		name:'history',
		data(){
			return{
				page:1,
				lists:[],
				loadAll:false,
				listsDemo:[{
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
			this.getData();
			loadMore.config.cb = this.getData;
			loadMore.open();
		},
		methods:{
			getData(){
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
					this.lists = this.lists.concat(lists);
					loadMore.loading = false;
					this.page++;
					if(!lists.length && this.lists.length){
						myAlert.small('没有更多拉!');
						loadMore.loadAll = this.loadAll = true;
					}
				})
			}
		},
		components:{questionitem}
	}
</script>