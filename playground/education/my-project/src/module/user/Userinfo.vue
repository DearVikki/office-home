<template>
	<div id="userinfo_container" class="user-common-container">
		<!--头像-->
		<div id="avatar_container" class="user-common-avatar-container">
			<img :src="user.avatar">
			<p>{{user.name}}</p>
		</div>
		<!--学生部分-->
		<!--学生展示信息-->
		<div class="table-info"
		v-if="usertype===0">
			<div class="info-item"
			v-for="info in infos1"
			v-if="info.show">
				<span class="title">{{info.title}}</span>
				<span class="value">{{info.value}}</span>
			</div>
			<!--编辑按钮-->
			<router-link class="edit" to="/usercenterEdit"></router-link>
		</div>
		<!--学生购买课程-->
		<div class="course-container"
		v-if="usertype===0">
			<div class="course-header">购买课程</div>
			<table v-show="courses.length!==0">
				<tr>
					<th style="width:30%">任课老师</th>
					<th style="width:40%">剩余课时</th>
					<!--<th style="width:30%"></th>-->
				</tr>
				<tr class="row"
				v-for="course in courses">
					<td>{{course.teacher_name}}</td>
					<td>{{course.left_hour}}</td>
					<!--<td><span class="buy">继续购买</span></td>-->
				</tr>
			</table>
			<div class="empty-data"
			v-show="courses.length===0">暂无剩余课时!>.<</div>
		</div>
		<!--教师部分-->
		<!--教师展示信息-->
		<div class="table-info"
		v-if="usertype===1">
			<div class="info-item"
			v-for="info in infos2"
			v-if="info.show">
				<span class="title">{{info.title}}</span>
				<span class="value">
					<span v-if="info.title!=='高考分数' && info.title!=='擅长学科'">
						{{info.value}}
					</span>
					<!-- 高考分数与擅长学科需要调整间距 -->
					<span v-else>
						<span class="score-value"
						v-for="v in info.value"
						:class="{active: info.title==='擅长学科'}"
						>{{v}}</span>
					</span>
				</span>
			</div>
			<!--编辑按钮-->
			<router-link class="edit" to="/usercenterEdit"></router-link>
		</div>
	</div>
</template>
<script>
	import Bus from '../../assets/js/bus.js';
	import avaImg from '../../assets/img/index/icon_head.png';
	export default{
		name:'userinfo',
		data(){
			return{
				usertype:1,
				user:{
					avatar:avaImg,
					name:'我不要再叫李慧慧了!'
				},
				infos1:[{
					title:'姓名',
					value: '',
					show:false
				},{
					title:'性别',
					value: '',
					show:false
				},{
					title:'QQ',
					value: '',
					show:false
				},/*{
					title:'补习学科',
					name:'subject',
					value: '数学 物理 化学'
				},*/{
					title: '年级',
					value: '',
					show:false
				},{
					title:'学科',
					value:'',
					show:false
				},{
					title:'所在学校',
					value:'',
					show:false
				}],

				infos2:[{
					title:'姓名',
					value: '',
					show:false
				},{
					title:'性别',
					value: '',
					show:false
				},{
					title:'QQ',
					value: '',
					show:false
				},{
					title:'擅长学科',
					value:[],
					show:false
				},{
					title:'高考分数',
					value:[],
					show:false
				},{
					title:'所在学校',
					value:'',
					show:false
				},{
					title: '专业',
					value: '',
					show:false
				},{
					title: '年级',
					value:'',
					show:false
				}],
				courses:[{
					teacher_name:'王奥',
					left_hour:3
				}]
			}
		},
		mounted(){
			let user = JSON.parse(localStorage.getItem('user'));
			this.usertype = user.user_type;
			this.$http.get('?name=education.sys.user.info').then((response)=>{
				let info = response.body.data.info;
				this.user.name = info.user_name;
				this.user.avatar = info.head;
				//再重新更新一次localStorage
				//localStorage.setItem('user',JSON.stringify(response.body.data.info));
				//学生个人信息
				if(this.usertype===0){
					if(info.user_name) {
						this.infos1[0].show = true;
						this.infos1[0].value = info.user_name;
					}
					if(info.sex) {
						this.infos1[1].show = true;
						this.infos1[1].value = info.sex;
					}
					if(info.qq) {
						this.infos1[2].show = true;
						this.infos1[2].value = info.qq;
					}
					if(info.grade) {
						this.infos1[3].show = true;
						this.infos1[3].value = info.grade;
					}
					if(info.learning_type) {
						this.infos1[4].show = true;
						this.infos1[4].value = info.learning_type;
					}
					if(info.school) {
						this.infos1[5].show = true;
						this.infos1[5].value = info.school;
					}
					//剩余课程部分
					this.courses = info.teacher_info;
				}
				//老师个人信息
				else{
					if(info.user_name) {
						this.infos2[0].show = true;
						this.infos2[0].value = info.user_name;
					}
					if(info.sex) {
						this.infos2[1].show = true;
						this.infos2[1].value = info.sex;
					}
					if(info.qq) {
						this.infos2[2].qq = true;
						this.infos2[2].value = info.qq;
					}
					if(info.subject){
						this.infos2[3].show = true;
						this.infos2[3].value = JSON.parse(info.subject);
						console.log(this.infos2[3].value)
					}
					if((Number(info.chinese) || Number(info.math)) || (Number(info.english) || Number(info.multiple_l)) || Number(info.multiple_w)) {
						this.infos2[4].show = true;
						let scoreStr='';
						if(Number(info.chinese)) this.infos2[4].value.push('语文:'+ info.chinese);
						if(Number(info.math)) this.infos2[4].value.push('数学:'+ info.math);
						if(Number(info.english)) this.infos2[4].value.push('英语:'+ info.english);
						if(Number(info.multiple_l)) this.infos2[4].value.push('理综:'+ info.multiple_l);
						if(Number(info.multiple_w)) this.infos2[4].value.push('文综:'+ info.multiple_w);
					}
					if(info.university) {
						this.infos2[5].show = true;
						this.infos2[5].value = info.university;
					}
					if(info.major) {
						this.infos2[6].show = true;
						this.infos2[6].value = info.major;
					}
					if(info.grade) {
						this.infos2[7].show = true;
						this.infos2[7].value = info.grade;
					}
				}
			})
			//加入bus
			Bus.$on('changeName',text => {
				let user = JSON.parse(localStorage.getItem('user'));
				user.user_name = text;
				this.user.name = text;
				localStorage.setItem('user',JSON.stringify(user));
			})
		},
		methods:{
			editInfo(){
				//this.$router.push('usercenter/edit')
				this.$router.push('usercenterEdit');
			}
		}
	}
</script>
<style scoped lang='less'>
	@baseColor: #55b7f8;
	#userinfo_container{
		/*已移至public.less*/
	}
	/*头像*/
	#avatar_container{
		/*已移至public.less*/
	}
	/*个人信息展示*/
	.table-info{
		margin-top: 60px;
    	padding-left: 70px;
    	position: relative;
		.info-item{
			font-size:15px;
			margin-bottom: 25px;
			span{
				display: inline-block;
			}
			.title{
				text-align: right;
				margin-right: 20px;
				width: 96px;
				color:#949494;
			}
			.value{
				color:#4d4d4d;
				width: 380px;
				vertical-align: middle;
				.score-value{
					margin-right: 15px;
					&.active{
						color:@baseColor;
					}
				}
			}
			.value.active{
				color: @baseColor;
			}
		}
		.edit{
			position: absolute;
			right:48px;
			top:1px;
			width:20px;
			height:20px;
			cursor:pointer;
			background: url(../../assets/img/user/icon_edit.png) center no-repeat;
		}
	}
	/*已购课程*/
	.course-container{
		width:100%;
		margin-top: 50px;
		.course-header{
			width:100%;
			height: 48px;
			line-height: 48px;
			padding-left: 30px;
			font-size:20px;
			color:#4d4d4d;
			background: #f8f8f8;
			border-top:1px dashed #bbb;
		}
		table{
			border-collapse: collapse;
			table-layout: fixed;
			width:480px;
			margin:28px auto;
			font-size:16px;
			th{
				background: @baseColor;
				color:#fff;
				height: 40px;
				line-height: 40px;
				text-align: center;
			}
			.row{
				border:1px solid #f1f1f1;
				border-top:none;
				td{
					color:#4d4d4d;
					height: 46px;
					line-height: 50px;
					text-align: center;
					.buy{
						width:72px;
						height: 26px;
						line-height: 26px;
						text-align: center;
						color: @baseColor;
						border:1px solid @baseColor;
						border-radius: 4px;
						cursor:pointer;
						font-size: 14px;
						display: inline-block;
					}
				}
			}
		}
		/*暂无课程数据时*/
		.empty-data{
			color: #555;
		    font-size: 16px;
		    margin: 30px;
		}
	}
</style>