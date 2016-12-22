<template>
	<div id="freeTime_container" class="user-common-container">
		<table>
			<caption>本学期空余时间</caption>
			<caption style="font-size:12px">（小提示: 请按照你的空余时间妥善安排，方便我们长期排课喔!❀）</caption>
			<tr>
				<th style="width:16%"></th>
				<th style="width:12%"
				v-for="th in ths">{{th}}</th>
			</tr>
			<tr v-for="tr in trs">
				<td>{{tr.time}}</td>
				<td v-for="s in tr.schedule"
				:class="{free:s.free, full:s.full}"
				@click="changeFree(s)"></td>
			</tr>
		</table>
		<div id="freeTime_note">
			<div>
				<span class="color" style="background:#55b7f8"></span>
				<span class="text">空闲时段</span>
			</div>
			<div>
				<span class="color" style="background:#dadada"></span>
				<span class="text">已安排课程时段</span>
			</div>
		</div>
		<div class="reverse">
			<smartBtn
			@clickBtn="updateFreetime"
			@returnToFirstStage="returnToFirstStage"
			:stage="btnSet.stage"
			:currentStage="btnSet.currentStage"
			:style="btnSet.style"></smartBtn>
		</div>
	</div>
</template>
<script>
	import smartBtn from '../../components/SmartBtn.vue';
	export default{
		name:'freeTime',
		data(){
			return{
				ths:['周一','周二','周三','周四','周五','周六','周日'],
				trs:{
					1:{time:'8:00-9:00',
					   schedule:{1:{free:true,full:false},2:{free:false, full:false},3:{free:false, full:false},4:{free:false,full:false},5:{free:false,full:false},6:{free:false,full:false},7:{free:false,full:false}}
					},
					2:{time:'9:00-10:00',
					   schedule:{1:{free:false,full:false},2:{free:false,full:false},3:{free:false,full:false},4:{free:false,full:false},5:{free:false,full:false},6:{free:false,full:false},7:{free:false,full:false}}
					},
					3:{time:'10:00-11:00',
					   schedule:{1:{free:false,full:false},2:{free:false,full:false},3:{free:false,full:false},4:{free:false,full:false},5:{free:false,full:false},6:{free:false,full:false},7:{free:false,full:false}}
					},
					4:{time:'11:00-12:00',
					   schedule:{1:{free:false,full:false},2:{free:false,full:false},3:{free:false,full:false},4:{free:false,full:false},5:{free:false,full:false},6:{free:false,full:false},7:{free:false,full:false}}
					},
					5:{time:'12:00-13:00',
					   schedule:{1:{free:false,full:false},2:{free:false,full:false},3:{free:false,full:false},4:{free:false,full:false},5:{free:false,full:false},6:{free:false,full:false},7:{free:false,full:false}}
					},
					6:{time:'13:00-14:00',
					   schedule:{1:{free:false,full:false},2:{free:false,full:false},3:{free:false,full:false},4:{free:false,full:false},5:{free:false,full:false},6:{free:false,full:false},7:{free:false,full:false}}
					},
					7:{time:'14:00-15:00',
					   schedule:{1:{free:false,full:false},2:{free:false,full:false},3:{free:false,full:false},4:{free:false,full:false},5:{free:false,full:false},6:{free:false,full:false},7:{free:false,full:false}}
					},
					8:{time:'15:00-16:00',
					   schedule:{1:{free:false,full:false},2:{free:false,full:false},3:{free:false,full:false},4:{free:false,full:false},5:{free:false,full:false},6:{free:false,full:false},7:{free:false,full:false}}
					},
					9:{time:'16:00-17:00',
					   schedule:{1:{free:false,full:false},2:{free:false,full:false},3:{free:false,full:false},4:{free:false,full:false},5:{free:false,full:false},6:{free:false,full:false},7:{free:false,full:false}}
					},
					10:{time:'17:00-18:00',
					   schedule:{1:{free:false,full:false},2:{free:false,full:false},3:{free:false,full:false},4:{free:false,full:false},5:{free:false,full:false},6:{free:false,full:false},7:{free:false,full:false}}
					},
					11:{time:'18:00-19:00',
					   schedule:{1:{free:false,full:false},2:{free:false,full:false},3:{free:false,full:false},4:{free:false,full:false},5:{free:false,full:false},6:{free:false,full:false},7:{free:false,full:false}}
					},
					12:{time:'19:00-20:00',
					   schedule:{1:{free:false,full:false},2:{free:false,full:false},3:{free:false,full:false},4:{free:false,full:false},5:{free:false,full:false},6:{free:false,full:false},7:{free:false,full:false}}
					},
					13:{time:'20:00-21:00',
					   schedule:{1:{free:false,full:false},2:{free:false,full:false},3:{free:false,full:false},4:{free:false,full:false},5:{free:false,full:false},6:{free:false,full:false},7:{free:false,full:false}}
					}
				},
				daySwitcher:{Mon:1, Tues:2, Wed:3, Thur:4, Fri:5, Sat:6, Sun:7},
				btnSet:{
					//disabled表示是否可以点击 acive表示是否opacity .5
					stage:{
						0:{
							txt:'保存',
							disabled:false,
							active:true,
							firstStage:true
						},
						1:{
							txt: '保存中..',
							disabled:true,
							active:false
						},
						2:{
							txt:'保存成功!',
							disabled:true,
							active:true,
							lastStage:true
						}
					},
					style:{
						height: '40px',
						lineHeight: '40px'
					},
					currentStage:0
				}
			}
		},
		mounted(){
			//如果是按日期的话就是th.day;
			/*let today = new Date().getDay(); //周几
			let todate = new Date().getDate(); //几号
			for(var i = 0; i<7; i++){
				let day = (today + i)>7 ? (today+i-7) : (today+i);
				this.ths.push({
					date: todate+i,
					day: day
				})
			}*/
			this.$http.get('?name=education.sys.free.time').then((response)=>{
				if(response.body.code === 1000){
					let data = response.body.data.list;
					data.forEach((e)=>{
						//let day = this.daySwitcher[e.day];
						//this.trs[e.stage+1].schedule[day].free = e.is_free;
						//this.trs[e.stage+1].schedule[day].full = e.having_class;
						//console.log(this.trs[e.stage+1].schedule[this.daySwitcher[e.day]])
						this.trs[e.stage+1].schedule[this.daySwitcher[e.day]].free = e.is_free;
						this.trs[e.stage+1].schedule[this.daySwitcher[e.day]].full = e.having_class;
					})
				}
				else if(response.body.code===1004){
					location.href='./login.html';
				}
			})
		},
		methods:{
			changeFree(td){
				if(td.full) return;
				td.free = !td.free;
			},
			updateFreetime(){
				let updateData = {
					Mon:{stage:[],is_free:[]},
					Tues:{stage:[],is_free:[]},
					Wed:{stage:[],is_free:[]},
					Thur:{stage:[],is_free:[]},
					Fri:{stage:[],is_free:[]},
					Sat:{stage:[],is_free:[]},
					Sun:{stage:[],is_free:[]}
				};
				for(var day in updateData){
					for(var stage in this.trs){
						updateData[day].stage.push(stage-1);
						updateData[day].is_free.push(Number(this.trs[stage].schedule[this.daySwitcher[day]].free));
					}
					this.$http.post('',{
						name:'education.sys.update.free.time',
						stage:updateData[day].stage,
						day:day,
						is_free:updateData[day].is_free
					},{
						timeout:30000,
						before: function() {
							this.btnSet.cuurentStage = 1;
						}
					}).then((response)=>{
						this.btnSet.currentStage = 2;
					})
				}
				console.log(updateData);
			},
			returnToFirstStage(){
				this.btnSet.currentStage = 0;
			}
		},
		components:{smartBtn}
	}
</script>
<style scoped lang='less'>
	#freeTime_container{
		table{
			width: 646px;
			margin:0 auto 24px auto;
			border-collapse: collapse;
			table-layout: fixed;
			color: #4d4d4d;
			font-size: 14px;
			caption{
				font-size: 20px;
				color: #4d4d4d;
				text-align: center;
				margin: -10px auto 15px auto;
			}
			th,td{
				height: 38px;
				text-align: center;
				vertical-align: middle;
				border:2px solid #f1f1f1;
				&.free{
					background: #55b7f8;
				}
				&.full{
					background: #ececec;
				}
			}
			td{cursor: pointer;}
		}
		#freeTime_note{
			div:nth-of-type(2){
				margin-top: 10px;
			}
			span{
				vertical-align: middle;
			}
			.color{
				display: inline-block;
				width: 36px;
				height: 20px;
				border-radius: 2px;
				margin-right: 10px;
			}
			.text{
				font-size: 16px;
				color:#4d4d4d;
			}
		}
		.btn{
			float: right;
			width: 120px;
			height: 40px;
			line-height: 40px;
			margin-top:20px;
		}
	}
</style>