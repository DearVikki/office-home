<template>
	<div id="freeTime_container" class="user-common-container">
		<!--切换时间线-->
		<div class="time-nav"
		:class="{active:isNow}"
		@click="isNow = true">本周课程</div>
		<div class="time-nav"
		:class="{active:!isNow}"
		@click="isNow = false">历史课程</div>
		<!--本周课程-->
		<div v-show="isNow === true">
			<div class="courseform-wrapper"
			v-show="now.tableData.trs.length!==0">
				<courseform
				:tableData="now.tableData"
				@formCb="formCb"></courseform>
			</div>
			<pagination
			v-if="now.allPage>1"
			:allPage="now.allPage"></pagination>
			<div class="empty-tip"
			v-show="now.tableData.trs.length===0">
				<img src="~assets/img/user/no_class.png">
				<p>本周暂无课程>.<</p>
			</div>
		</div>
		<!--历史课程-->
		<div v-show="isNow === false">
			<div class="courseform-wrapper"
			v-show="history.tableData.trs.length!==0">
				<courseform
				:tableData="history.tableData"
				@formCb="formCb"></courseform>
			</div>
			<pagination
			v-if="history.allPage>1"
			:allPage="history.allPage"
			@clickPagination="clickPagination"></pagination>
			<div class="empty-tip"
			v-show="history.tableData.trs.length===0">
				<img src="~assets/img/user/no_class.png">
				<p>历史暂无课程>.<</p>
			</div>
		</div>
		<!-- 课程评价弹窗 -->
		<pop :pop="commentPop">
			<coursepop :id="popId"></coursepop>
		</pop>
		<!-- 邀请码 -->
		<pop :pop="invitePop">
			<coursepopcode :code="popCode"></coursepopcode>
		</pop>
	</div>
</template>
<script>
	import pop from '../../components/Pop.vue'
	import Mock from 'mockjs';
	import 'animate.css';
	import courseform from './CourseForm.vue';
	import pagination from '../../components/Pagination.vue';
	import coursepop from './CoursePop.vue';
	import coursepopcode from './CoursePopCode.vue';
	//actionType:1 评价; 2 回看录像; 3 已评价
	var data = Mock.mock({
		'ths':[{name:'date',title:'上课日期',width:'20%'},
				{name:'time',title:'上课时间',width:'15%'},
				{name:'amount',title:'课时数量',width:'10%'},
				{name:'teacher',title:'任课老师',width:'15%'},
				{name:'subject',title:'科目',width:'10%'},
				{name:'chapter',title:'章节内容',width:'15%'},
				{name:'action',title:'',width:'15%'}],
		'trs|20':[{
			date:{content:'2016/11/28'},
			time:{content:'9:00-10:00'},
			amount:{content:'2'},
			teacher:{content:'王王'},
			student:{conetn:'xx'},
			subject:{content:'数学'},
			chapter:{content:'线代'},
			action:{content:'评价', class:'active', actionType:1}
		}
	]
})
	export default{
		name:'course',
		data(){
			return{
				isNow:true,
				usertype:0,
				tableDataT:data,
				now:{
					tableData:{
						ths:[{name:'date',title:'上课日期',width:'20%'},
							{name:'time',title:'上课时间',width:'20%'},
							{name:'amount',title:'课时数量',width:'15%'},
							{name:'teacher',title:'任课老师',width:'15%'},
							{name:'student',title:'学生姓名',width:'15%'},
							{name:'subject',title:'科目',width:'10%'},
							{name:'chapter',title:'章节内容',width:'20%'},
							{name:'action',title:'',width:'15%'}],
						trs:[
						// {
						// 	date:{content:'2016/11/28'},
						// 	time:{content:'9:00-10:00'},
						// 	amount:{content:'2'},
						// 	teacher:{content:'王王'},
						// 	student:{content:'学生'},
						// 	subject:{content:'数学'},
						// 	chapter:{content:'线代'},
						// 	action:{content:'我要上课', class:'active'},
						// 	type:1
						// }
						]
					},
					allData:[],
					allPage:1,
					currentPage:1,
					start:0,
					end:0
				},
				history:{
					tableData: {
						ths:[{name:'date',title:'上课日期',width:'20%'},
							{name:'time',title:'上课时间',width:'15%'},
							{name:'amount',title:'课时数量',width:'10%'},
							{name:'teacher',title:'任课老师',width:'15%'},
							{name:'student',title:'学生姓名',width:'15%'},
							{name:'subject',title:'科目',width:'10%'},
							{name:'chapter',title:'章节内容',width:'15%'},
							{name:'action',title:'',width:'15%'}],
						trs:[
						// {
						// 	date:{content:'2016/11/28'},
						// 	time:{content:'9:00-10:00'},
						// 	amount:{content:'2'},
						// 	teacher:{content:'王王'},
						// 	student:{content:'学生'},
						// 	subject:{content:'数学'},
						// 	chapter:{content:'线代'},
						// 	action:{content:'评价', class:'active'}
						// }
						]
					},
					allData:[],
					allPage:1,
					currentPage:1,
					start:0,
					end:0
				},
				popId:'',
				popCode:0,
				// 课程评价弹窗
				commentPop:{
					show:false,
					style:{
						width:'420px',
						height:'300px'
					}
				},
				// 课程邀请码弹窗
				invitePop:{
					show:false,
					style:{
						width:'440px',
						height:'150px'
					}
				}
				// testPop:{show:true,style:{width:'500px', height:'300px'}}
			}
		},
		mounted(){
			this.usertype = JSON.parse(localStorage.getItem('user')).user_type;
			//本周数据
			this.$http.get('?name=education.sys.this.week.course.list').then((response)=>{
				if(response.body.code === 1004) return;
				response.body.data.list.forEach((e)=>{
					let rowData = '';
					this.now.allData.push({
						id:e.id,
						date:{content:e.date},
						time:{content:e.plan_start_time.slice(0,-3)+'-'+e.plan_end_time.slice(0,-3)},
						amount:{content:e.plan_hour},
						teacher:{content:e.teacher_name},
						student:{content:e.student_name},
						subject:{content:e.subject},
						chapter:{content:e.subject_content},
						action:{content:'我要上课',class:'active',actionType:4},
						code:e.input_code,
						type:e.type
					})
				})
				this.now.allPage = Math.ceil(this.now.allData.length/15);
				this.now.start = (this.now.currentPage-1)*15;
				this.now.end = this.now.currentPage*15
				this.now.tableData.trs = this.now.allData.slice(this.now.start, this.now.end);
			})
			//历史数据
			this.$http.get('?name=education.sys.history.week.course.list').then((response)=>{
				if(response.body.code === 1004) return;
				response.body.data.list.forEach((e)=>{
					let rowData = {
						id:e.id,
						date:{content:e.date},
						time:{content:e.plan_start_time.slice(0,-3)+'-'+e.plan_end_time.slice(0,-3)},
						amount:{content:e.plan_hour},
						teacher:{content:e.teacher_name},
						student:{content:e.student_name},
						subject:{content:e.subject},
						chapter:{content:e.subject_content}
					}
					//评价 已评价 与回看录像
					if(this.usertype === 0){
						if(Number(e.s2t_judge) === -1) {
							rowData.action = {
								content:'评价',
								class:'active',
								actionType:1,
								title:'评价完才可回看录像喔!'
							}
						} else {
								rowData.action = {
								content:'回看录像',
								class:'active',
								actionType:2,
								title:'点我回看录像'
							}
						}
					} else {
						if(Number(e.t2s_judge) === -1){
							rowData.action = {
								content:'评价',
								class:'active',
								actionType:1,
								title:'评价'
							}
						} else {
							rowData.action = {
								content:'已评价',
								class:'disabled',
								actionType:3
							}
						}
					}
					this.history.allData.push(rowData);
				})
				this.history.allPage = Math.ceil(this.history.allData.length/15);
				this.history.start = (this.history.currentPage-1)*15;
				this.history.end = this.history.currentPage*15
				this.history.tableData.trs = this.history.allData.slice(this.history.start, this.history.end);
			})
		},
		methods:{
			formCb(tr, td,id){
				//tr是一行数据的所有资料 td是点击的action框
				// 评论
				if(td.actionType === 1) {
					this.popId = id;
					this.commentPop.show = true;
				}
				// 我要上课与回看录像
				else if(td.actionType === 4 || td.actionType === 2){
					// 注释掉的邀请码框
					// this.popCode = tr.code;
					// this.invitePop.show = true;
					window.open('https://www.hzchuangxiangzhe.cn/php/PcApi/?name=education.sys.course.visit&course_id='+id);
				}
			},
			dataPage(){
				if(this.isNow) {
					this.now.start = (this.now.currentPage-1)*15;
					this.now.end = this.now.currentPage*15
					this.now.tableData.trs = this.now.allData.slice(this.now.start, this.now.end);
				} else {
					this.history.start = (this.history.currentPage-1)*15;
					this.history.end = this.history.currentPage*15
					this.history.tableData.trs = this.tableDataT.trs.slice(this.history.start, this.history.end);
				}
			},
			clickPagination(page){
				if(this.isNow) this.now.currentPage = page;
				else this.history.currentPage = page;
				this.dataPage();
			}
		},
		components:{courseform,pagination,coursepop,coursepopcode, pop}
	}
</script>
<style scoped lang='less'>
	@baseColor:#55b7f8;
	/*切换时间线*/
	.time-nav{
		width: 150px;
		height: 30px;
		font-size: 16px;
		border-bottom:1px solid #ebebeb;
		display: inline-block;
		text-align: center;
		position: relative;
		cursor:pointer;
		margin-bottom: 30px;
		&.active{
			border-bottom-color: @baseColor;
			color: @baseColor;
			&:after{
				content:'';
				position: absolute;
				border: 5px solid transparent;
				border-bottom-color:#fff;
				right:68.5px;
				bottom:-.5px;
			}
			&:before{
				content:'';
				position: absolute;
				border: 6px solid transparent;
				border-bottom-color: @baseColor;
				right:67.5px;
				bottom:-.4px;
			}
		}
	}
	.courseform-wrapper{
		height: 600px;
	}
	.no-data{
		font-size: 16px;
    	color: #444;
	}
</style>