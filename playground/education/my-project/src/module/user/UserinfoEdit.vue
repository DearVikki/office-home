<template>
	<div id="userinfoEdit_container" class="user-common-container">
		<!--头像-->
		<div class="user-common-avatar-container">
			<img :src="user.avatar">
			<div class="btn"
			@click="changeAva = true">编辑头像</div>
		</div>
		<!--学生表单-->
		<!--哈哈哈以下是诡异的部分 checkAll代表告诉组件去检查 allCheck代表组件返回全部通过-->
		<studentUserinfoEdit
		v-if="usertype === 0"
		:checkAll = "checkAll"
		@allCheck = "allCheck"></studentUserinfoEdit>
		<!--教师表单-->
		<teacherUserinfoEdit
		v-else
		:checkAll = "checkAll"
		@allCheck = "allCheck"></teacherUserinfoEdit>
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
			this.usertype = user.user_type;
			console.log(this.usertype)
			this.user.avatar = user.head;
			this.user.name = user.user_name;
		},
		methods: {
			/*保存头像*/
			saveAva(img){
				this.user.avatar = img.src || this.user.avatar;
				this.changeAva = false;
				this.$http.get('?name=education.sys.upload.img&img='+img.file).then((response)=>{
					console.log(response)
				})
			},
			/*提交*/
			save(){
				this.checkAll = Math.random();
			},
			allCheck(fields){
				let updateData = {
					user_name:fields.name.val,
					sex:fields.sex.val,
					qq:fields.qq.val,
					alipay:fields.alipay.val,
					learning_type:fields.learningType.val,
					subject:[],
					chinese:fields.scores.subs[0].val || 0,
					math:fields.scores.subs[1].val || 0,
					english:fields.scores.subs[2].val || 0,
					multiple_l:0,
					multiple_w:0,
					university:fields.school.val,
					major:fields.major.val,
					grade:fields.grade.val
				};
				//理综/文综成绩
				if(fields.scores.subs[3].id==='D') updateData.multiple_l = fields.scores.subs[3].val || 0;
				else updateData.multiple_w = fields.scores.subs[3].val || 0;
				//擅长科目
				let checkboxes = document.querySelectorAll('.subject-field input');
				for (var i=0; i<checkboxes.length; i++) {
				     if (checkboxes[i].checked) {
				        updateData.subject.push(checkboxes[i].value);
				     }
			  	}
			  	console.log(updateData)
			  	if(this.userType === 0) {
			  		updateData.name = 'education.student.update.info';
			  	}
			  	else {
			  		updateData.name = 'education.teacher.update.info'
				  	this.$http.get('?name='+updateData.name+'&user_name='+updateData.user_name+'&sex='+updateData.sex+'&qq='+updateData.qq+'&alipay='+updateData.alipay+'&learning_type='+updateData.learning_type+'&subject='+updateData.subject+'&chinese='+updateData.chinese+'&math='+updateData.math+'&english='+updateData.english+'&multiple_l='+updateData.multiple_l+'&multiple_w='+updateData.multiple_w+'&university='+updateData.university+'&major='+updateData.major+'&grade='+updateData.grade).then((response)=>{
							console.log(response)
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
	/*保存*/
	.btn.save{
		width: 72px;
	    height: 30px;
	    line-height: 30px;
	    float: right;
	    margin-top: 50px;
	}
</style>