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
		v-if="usertype===1">
			<div class="info-item" v-for="info in infos1">
				<span class="title">{{info.title}}</span>
				<span class="value"
				:class="{active:info.name==='subject'}">{{info.value}}</span>
			</div>
			<!--编辑按钮-->
			<div class="edit"></div>
		</div>
		<!--学生购买课程-->
		<div class="course-container"
		v-if="usertype===1">
			<div class="course-header">购买课程</div>
			<table>
				<tr>
					<th style="width:30%">任课老师</th>
					<th style="width:40%">剩余课时</th>
					<th style="width:30%"></th>
				</tr>
				<tr class="row"
				v-for="course in courses">
					<td>{{course.teacher}}</td>
					<td>{{course.left}}</td>
					<td><span class="buy">继续购买</span></td>
				</tr>
			</table>
		</div>
		<!--教师部分-->
		<!--教师展示信息-->
		<div class="table-info"
		v-if="usertype===2">
			<div class="info-item" v-for="info in infos2">
				<span class="title">{{info.title}}</span>
				<span class="value"
				:class="{active:info.name==='subject'}">{{info.value}}</span>
			</div>
			<!--编辑按钮-->
			<div class="edit"></div>
		</div>
	</div>
</template>
<script>
	export default{
		name:'userinfo',
		data(){
			return{
				usertype:1,
				user:{
					avatar:'../../static/img/icon_head.png',
					name:'我不要再叫李慧慧了!'
				},
				infos1:[{
					title:'手机',
					value: 1830877777
				},{
					title:'家长手机',
					value: 12222222
				},{
					title:'性别',
					value: '女'
				},{
					title:'补习学科',
					name:'subject',
					value: '数学 物理 化学'
				},{
					title: '年级',
					value: '高二'
				},{
					title:'学校',
					value:'xxx中学'
				}],
				infos2:[{
					title:'手机',
					value: 1830877777
				},{
					title:'性别',
					value: '男'
				},{
					title:'QQ',
					value: 11111111
				},{
					title:'收款账号',
					value: 23863784683
				},{
					title:'擅长学科',
					name:'subject',
					value: '数学 物理'
				},{
					title:'高考分数情况',
					value:'数学:140分 语文:60分'
				},{
					title:'所在学校',
					value:'xxx中学'
				},{
					title: '专业',
					value: '计算机'
				},{
					title: '年级',
					value:'大一'
				}],
				courses:[{
					teacher:'王奥',
					left:3
				},{
					teacher:'陈六',
					left:100
				}]
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
			font-size:16px;
			color:#4d4d4d;
			margin-bottom: 10px;
			span{
				display: inline-block;
			}
			.title{
				text-align: right;
				margin-right: 18px;
				width: 96px;
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
	}
</style>