<template>
	<div id="userinfoEdit_container" class="user-common-container">
		<!--头像-->
		<div class="user-common-avatar-container">
			<img :src="user.avatar">
			<div class="btn"
			@click="changeAva = true">编辑头像</div>
		</div>
		<!--学生表单-->
		<!--哈哈哈以下是诡异命名的部分 checkAll代表告诉组件去检查 allCheck代表组件返回全部通过-->
		<!--本来用的是v-if v-if又有问题唉!-->
		<studentUserinfoEdit
		v-show="usertype === 0"
		:checkAll = "studentcheckAll"
		@allCheck = "allCheck"></studentUserinfoEdit>
		<!--教师表单-->
		<teacherUserinfoEdit
		v-show="usertype === 1"
		:checkAll = "teachercheckAll"
		@allCheck = "allCheck"></teacherUserinfoEdit>
		<div class="btn-container">
			<div class="btn cancle"
			@click="cancle">取消保存</div>
			<div class="btn save"
			@click="save">保存</div>
		</div>
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
				studentcheckAll: false,
				teachercheckAll:false
			}
		},
		mounted(){
			let user = JSON.parse(localStorage.getItem('user'));
			this.usertype = user.user_type;
			this.user.avatar = user.head;
			this.user.name = user.user_name;
		},
		methods: {
			/*保存头像*/
			saveAva(img){
				this.user.avatar = img.src || this.user.avatar;
				this.changeAva = false;
				/*this.$http.get('?name=education.sys.upload.img&img='+img.file).then((response)=>{
					let user = JSON.parse(localStorage.getItem('user'));
					user.head = img.src;
					localStorage.setItem('user',JSON.stringify(user));
				})*/
				var formData = new FormData();
				formData.append('img', img.file);
				formData.append('name','education.sys.upload.img')
				this.$http.post('',formData).then((response)=>{
					console.log(response)
					let user = JSON.parse(localStorage.getItem('user'));
					user.head = img.src;
					localStorage.setItem('user',JSON.stringify(user));
				})
			},
			/*提交*/
			save(){
				if(this.usertype ===0) this.studentcheckAll = Math.random();
				else this.teachercheckAll = Math.random();
			},
			/*取消保存*/
			cancle(){
				this.$router.push('usercenter');
			},
			allCheck(fields){
				let updateData = {
					user_name:fields.name.val,
					sex:fields.sex.val,
					qq:fields.qq.val,
					learning_type:fields.learningType.val,
					chinese:fields.scores.subs[0].val || 0,
					math:fields.scores.subs[1].val || 0,
					english:fields.scores.subs[2].val || 0,
					multiple_l:0,
					multiple_w:0,
					grade:fields.grade.val
				};
				//理综/文综成绩
				if(fields.scores.subs[3].id==='D') updateData.multiple_l = fields.scores.subs[3].val || 0;
				else updateData.multiple_w = fields.scores.subs[3].val || 0;
			  	//学生
			  	if(this.usertype === 0) {
			  		updateData.school = fields.school.val;
			  		updateData.name = 'education.student.update.info';
			  		this.$http.get('?name='+updateData.name+'&user_name='+updateData.user_name+'&sex='+updateData.sex+'&qq='+updateData.qq+'&learning_type='+updateData.learning_type+'&chinese='+updateData.chinese+'&math='+updateData.math+'&english='+updateData.english+'&multiple_l='+updateData.multiple_l+'&multiple_w='+updateData.multiple_w+'&school='+updateData.school+'&grade='+updateData.grade).then((response)=>{
							if(response.body.code === 1000) this.$router.push('usercenter');
					})
			  	}
			  	//老师
			  	else {
			  		updateData.alipay = fields.alipay.val;
					updateData.major = fields.major.val;
					updateData.university = fields.school.val;
					updateData.subject = [];
					let checkboxes = document.querySelectorAll('.subject-field input');
					for (var i=0; i<checkboxes.length; i++) {
					     if (checkboxes[i].checked) {
					        updateData.subject.push(checkboxes[i].value);
					     }
				  	}
				  	updateData.subject = updateData.subject.length===0?['数学']:updateData.subject;
			  		updateData.name = 'education.teacher.update.info'
				  	this.$http.post('',updateData).then((response)=>{
						if(response.body.code === 1000) this.$router.push('usercenter');
					})
			   }
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
	/*取消保存/保存*/
	.btn-container{
		float: right;
	    margin-top: 50px;
	    .btn{
			width: 72px;
		    height: 30px;
		    line-height: 30px;
		    display: inline-block;
		    margin-left: 20px;
		    &.save:hover{
				background: @baseColor;
				color:#fff;
		    }
		    &.cancle{
		    	border-color:#ccc;
		    	color:#ccc;
		    }
		}
	}
</style>