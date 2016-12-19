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
			<div class="no-data"
			v-show="now.tableData.trs.length===0">本周暂无课程>.<</div>
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
			<div class="no-data"
			v-show="history.tableData.trs.length===0">历史暂无课程!</div>
		</div>
		<!--弹窗-->
		<coursepop
		v-show="popShow"
		@close="popShow = false"></coursepop>
	</div>
</template>
<script>
	import Mock from 'mockjs';
	import 'animate.css';
	import courseform from './CourseForm.vue';
	import pagination from '../../components/Pagination.vue';
	import coursepop from './CoursePop.vue';
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
							{name:'chapter',title:'章节内容',width:'20%'}],
						trs:[{
							date:{content:'2016/11/28'},
							time:{content:'9:00-10:00'},
							amount:{content:'2'},
							teacher:{content:'王王'},
							student:{content:'学生'},
							subject:{content:'数学'},
							chapter:{content:'线代'}
						}]
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
						trs:[{
							date:{content:'2016/11/28'},
							time:{content:'9:00-10:00'},
							amount:{content:'2'},
							teacher:{content:'王王'},
							student:{content:'学生'},
							subject:{content:'数学'},
							chapter:{content:'线代'},
							action:{content:'评价', class:'active'}
						}]
					},
					allData:[],
					allPage:1,
					currentPage:1,
					start:0,
					end:0
				},
				popShow:false
			}
		},
		mounted(){
			this.usertype = JSON.parse(localStorage.getItem('user')).user_type;
			//本周数据
			this.$http.get('?name=education.sys.this.week.course.list').then((response)=>{
				response.body.data.list.forEach((e)=>{
					let rowData = '';
					this.now.allData.push({
						id:e.id,
						date:{content:e.date},
						time:{content:e.plan_start_time+'-'+e.plan_end_time},
						amount:{content:e.plan_hour},
						teacher:{content:e.teacher_name},
						student:{content:e.student_name},
						subject:{content:e.subject},
						chapter:{content:e.subject_content}
					})
				})
				this.now.allPage = Math.ceil(this.now.allData.length/15);
				this.now.start = (this.now.currentPage-1)*15;
				this.now.end = this.now.currentPage*15
				this.now.tableData.trs = this.now.allData.slice(this.now.start, this.now.end);
			})
			//历史数据
			this.$http.get('?name=education.sys.history.week.course.list').then((response)=>{
				response.body.data.list.forEach((e)=>{
					let rowData = {
						id:e.id,
						date:{content:e.date},
						time:{content:e.plan_start_time+'-'+e.plan_end_time},
						amount:{content:e.plan_hour},
						teacher:{content:e.teacher_name},
						student:{content:e.student_name},
						subject:{content:e.subject},
						chapter:{content:e.subject_content}
					}
					//评价 已评价 与回看录像
					if(e.judge === -1) {
						rowData.action = {
							content:'评价',
							class:'active',
							actionType:1
						}
					} else if(this.usertype === 0){
						rowData.action = {
							content:'回看录像',
							class:'active',
							actionType:1
						}
					} else {
						rowData.action = {
							content:'已评价',
							class:'disabled'
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
			formCb(td){
				if(td.actionType === 1) this.popShow = true;
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
		components:{courseform,pagination,coursepop}
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