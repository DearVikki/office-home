<template>
	<div id="freeTime_container" class="user-common-container">
		<table>
			<caption>空余时间（未来七天）</caption>
			<tr>
				<th style="width:16%"></th>
				<th style="width:12%"
				v-for="th in ths">{{th.date}}日</th>
			</tr>
			<tr v-for="tr in trs">
				<td>{{tr.time}}</td>
				<td v-for="th in ths"
				:class="{free:tr.schedule[th.day].free, full:tr.schedule[th.day].full}"
				@click="changeFree(tr.schedule[th.day])"></td>
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
		<div class="btn reverse"
		@click="updateFreetime">保存</div>
	</div>
</template>
<script>
	export default{
		name:'freeTime',
		data(){
			return{
				ths:[],
				trs:{
					1:{time:'8:00-9:00',
					   schedule:{1:{free:false,full:false},2:{free:false, full:false},3:{free:false, full:false},4:{free:false,full:false},5:{free:false,full:false},6:{free:false,full:true},7:{free:false,full:true}}
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
					   schedule:{1:{free:false,full:false},2:{free:false,full:false},3:{free:false,full:false},4:{free:false,full:false},5:{free:false,full:false},6:{free:false,full:true},7:{free:false,full:true}}
					},
					13:{time:'20:00-21:00',
					   schedule:{1:{free:false,full:false},2:{free:false,full:false},3:{free:false,full:false},4:{free:false,full:false},5:{free:false,full:false},6:{free:false,full:true},7:{free:false,full:true}}
					}
				},
				daySwitcher:{Mon:1, Tues:2, Wed:3, Thurs:4, Fri:5, Sat:6, Sun:7}
			}
		},
		mounted(){
			let today = new Date().getDay(); //周几
			let todate = new Date().getDate(); //几号
			for(var i = 0; i<7; i++){
				let day = (today + i)>7 ? (today+i-7) : (today+i);
				this.ths.push({
					date: todate+i,
					day: day
				})
			}
			this.$http.get('?name=education.sys.free.time').then((response)=>{
				if(response.body.code === 1000){
					let data = response.body.data.list;
					data.forEach((e)=>{
						let day = this.daySwitcher[e.day];
						this.trs[e.stage+1].schedule[day].free = e.is_free;
						this.trs[e.stage+1].schedule[day].full = e.having_class;
					})
					console.log(this.trs)
				}
				else if(response.body.code===1004){
					location.href='./login.html';
				}
			})
		},
		methods:{
			changeFree(td){
				td.free = !td.free;
			},
			updateFreetime(){
				let updateData = {
					Mon:{stage:[],is_free:[]},
					Tues:{stage:[],is_free:[]},
					Wed:{stage:[],is_free:[]},
					Thurs:{stage:[],is_free:[]},
					Fri:{stage:[],is_free:[]},
					Sat:{stage:[],is_free:[]},
					Sun:{stage:[],is_free:[]}
				};
				for(var day in updateData){
					console.log(day)
					for(var stage in this.trs){
						updateData[day].stage.push(stage-1);
						updateData[day].is_free.push(this.trs[stage].schedule[this.daySwitcher[day]].free);
					}
				}
				console.log(updateData)
				//this.$http.get('?name=education.sys.update.free.time&')
			}
		}
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
			font-size: 16px;
			caption{
				font-size: 20px;
				color: #4d4d4d;
				text-align: center;
				width: 500px;
				height: 48px;
				line-height: 48px;
				border-bottom: 1px solid #ebebeb;
				margin:0 auto;
			}
			th,td{
				height: 54px;
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
			float: left;
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
		}
	}
</style>