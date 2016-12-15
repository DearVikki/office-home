<template>
	<div id="userinfoEdit_container" class="user-common-container">
		<!--头像-->
		<div class="user-common-avatar-container">
			<img :src="user.avatar">
			<div class="btn"
			@click="changeAva = true">编辑头像</div>
		</div>
		<!--学生表单-->
		<studentUserinfoEdit
		v-if="usertype === 0"
		:checkAll = "checkAll"></studentUserinfoEdit>
		<!--教师表单-->
		<teacherUserinfoEdit
		v-else
		:checkAll = "checkAll"></teacherUserinfoEdit>
		<div class="btn save"
		@click="save">保存</div>
		<!--上传头像-->
		<changeavatar v-show="changeAva"
		@cancleChangeAva="changeAva = false"
		@saveAva="saveAva"></changeavatar>
	</div>
</template>
<script>
	import avaImg from '../../assets/img/index/icon_head.png';
	import changeavatar from '../../components/Avatar.vue';
	import studentUserinfoEdit from '../../components/StudentUserinfoEdit.vue';
	import teacherUserinfoEdit from '../../components/teacherUserinfoEdit.vue';
	export default{
		name:'userinfoedit',
		data(){
			return{
				usertype:1,
				user:{
					avatar:avaImg,
					name:'我不要再叫李慧慧了!'
				},
				changeAva: false,
				checkAll: false
			}
		},
		mounted(){
			let user = JSON.parse(localStorage.getItem('user'));
			this.userType = user.user_type;
			this.user.avatar = user.head;
			this.user.name = user.user_name;
		},
		methods: {
			/*保存头像*/
			saveAva(img){
				this.user.avatar = img.src || this.user.avatar;
				this.changeAva = false;
			},
			/*提交*/
			save(){
				this.checkAll = Math.random();
			}
		},
		components:{changeavatar,studentUserinfoEdit,teacherUserinfoEdit}
	}
</script>
<style scoped lang='less'>
	@baseColor: #55b7f8;
	@warn: #f12323;
	/*编辑头像*/
	.user-common-avatar-container .btn {
	    width: 80px;
	    height: 26px;
	    line-height: 26px;
	    margin: 0 auto;
	}
	/*保存*/
	.btn.save{
		width: 72px;
	    height: 30px;
	    line-height: 30px;
	    float: right;
	    margin-top: 50px;
	}
</style>