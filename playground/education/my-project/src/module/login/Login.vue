<template>
	<div id="login_page">
		<!--背景-->
		<a href="./index.html" id="back_logo"></a>
		<div id="back">
			<div id="img1"></div>
			<div id="img2"></div>
			<div id="img3"></div>
			<div id="img4"></div>
			<div id="img5"></div>
		</div>
		<div id="hem"></div>
		<div id="login_container">
			<!--切换用户-->
			<div class="login-nav"
			:class="{active:!isTeacher}"
			@click="isTeacher = false">学生{{state}}</div>
			<div class="login-nav"
			:class="{active:isTeacher}"
			@click="isTeacher = true">教师{{state}}</div>
			<!--表单部分-->
			<loginform2
			v-show="isTeacher === false"
			:userType=1></loginform2>
			<loginform
			v-show="isTeacher === true"
			:userType=2></loginform>
		</div>
	</div>
</template>
<script>
	import loginform from './Loginform.vue';
	import loginform2 from './Loginform2.vue';
	import {getParameterByName} from '../../assets/js/utils.js';
	export default{
		name:'login',
		data(){
			return{
				isTeacher:true,
				state:'登录'
			}
		},
		mounted(){
			if(location.hash === '#signup') {
				this.state = '注册';
			}
			console.log(getParameterByName('type'))
			if(getParameterByName('type') == 0){
				console.log('hey')
				this.isTeacher = false;
			}
		},
		components:{loginform,loginform2}
	}
</script>
<style scoped lang='less'>
	@baseColor:#55b7f8;
	#login_page{
		width: 100%;
		height: 100%;
		position: relative;
		padding-top: .1px;
		overflow: hidden;
	}
	/*背景*/
	#back_logo{
		width: 250px;
		height: 54px;
		margin-top: 79px;
		margin-left: 122px;
		background: url(../../assets/img/login/logo.png) no-repeat;
		z-index: 5;
		position: relative;
		display: inline-block;
	}
	#back{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		min-width: 1920px;
		height: 556px;
		background: @baseColor;
		#img1,#img2,#img3,#img4,#img5{
			position: absolute;
			bottom: 0;
			background-repeat: no-repeat;
			background-position: bottom;
		}
		#img1{
			width: 147px;
			height: 189px;
			background-image: url(../../assets/img/login/2.png);
			left: 100px;
		}
		#img2{
			width: 147px;
			height: 300px;
			background-image: url(../../assets/img/login/1.png);
			left: 300px;
		}
		#img3{
			width: 134px;
			height: 137px;
			background-image: url(../../assets/img/login/plane.png);
			right: 390px;
			bottom: 400px;
		}
		#img4{
			width: 700px;
			height: 400px;
			background-image: url(../../assets/img/login/line.png);
			right: 170px;
    		bottom: 40px;
		}
		#img5{
			width: 212px;
			height: 286px;
			background-image: url(../../assets/img/login/coco.png);
			right: 50px;
		}
	}
	#hem{
		width: 100%;
		height: 6px;
		position: absolute;
		top: 550px;
		left: 0;
		background: url(../../assets/img/login/oval.png);
		background-repeat: round;
	}
	#login_container{
		width: 504px;
		height: 453px;
		position: absolute;
		top: 50%;
		left: 50%;
		margin-left:-250px;
		margin-top: -280px;
		border-radius: 5px;
		background: url(../../assets/img/index/bg.png) center;
		background-size:100%;
		padding: 50px 100px;
	}
	/*
	#login_container{
        width: 515px;
        height: 461px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate3d(-50%,-60%,0);
        border:1px solid rgba(0, 0, 0, 0.1);
        box-shadow: 0px 0px 3px 2px rgba(0, 0, 0, 0.1);
        border-radius: 5px;
        background: #fff;
        &:before{
            content:'';
            width: 30px;
            height: 30px;
            position: absolute;
            top:0;
            right:0;
            background: url(../../assets/img/index/mini.png) no-repeat;
        }
    }*/

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
				bottom:-1px;
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