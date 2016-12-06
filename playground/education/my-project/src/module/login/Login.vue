<template>
	<div id="login_page">
		<div id="login_container">
			<!--切换用户-->
			<div class="login-nav"
			:class="{active:!isTeacher}"
			@click="isTeacher = false">学生</div>
			<div class="login-nav"
			:class="{active:isTeacher}"
			@click="isTeacher = true">老师</div>
			<!--表单部分-->
			<loginform
			v-show="isTeacher === false"
			:userType=1></loginform>
			<loginform
			v-show="isTeacher === true"
			:userType=2></loginform>
		</div>
	</div>
</template>
<script>
	import loginform from './Loginform.vue';
	export default{
		name:'login',
		data(){
			return{
				isTeacher:true
			}
		},
		components:{loginform}
	}
</script>
<style scoped lang='less'>
	@baseColor:#55b7f8;
	#login_page{
		width: 100%;
		height: 100%;
		position: relative;
	}
	#login_container{
		width: 504px;
		height: 453px;
		position: absolute;
		top: 50%;
		left: 50%;
		margin-left:-250px;
		margin-top: -280px;
		/*transform: translate3d(-50%,-60%,0);*/
	 	/*border:1px solid rgba(0, 0, 0, 0.1);
		box-shadow: 0px 0px 3px 2px rgba(0, 0, 0, 0.1);*/
		border-radius: 5px;
		background: url(../../assets/img/index/bg.png) center;
		background-size:100%;
		padding: 50px 100px;
		/*&:before{
			content:'';
			width: 30px;
			height: 30px;
			position: absolute;
			top:0;
			right:0;
			background: url(../../assets/img/index/mini.png) no-repeat;
		}*/
	}
	/*切换用户*/
	.login-nav{
		width: 150px;
		height: 30px;
		font-size: 16px;
		border-bottom:1px solid #ebebeb;
		display: inline-block;
		text-align: center;
		position: relative;
		cursor:pointer;
		margin-bottom: 50px;
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
</style>