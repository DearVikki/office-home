<template>
	<div id="signup_page">
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
			<div class="login-nav">找回密码</div>
			<!--表单部分-->
			<div class="loginform">
				<div class="field">
					<div class="input-container"
					:class="{active:phone.inputActive,error:phone.error}"
					:style="phone.style">
						<input :placeholder="phone.placeholder"
						@focus="inputFocus(phone)"
						@blur="inputBlur(phone)"
						@keyup.enter="clickSendCode"
						v-model="phone.val"
						maxlength="11">
					</div>
					<p class="error" v-show="phone.error">{{phone.msg}}</p>
				</div>
				<div class="field fl">
					<div class="input-container"
					:class="{active:code.inputActive,error:code.error}"
					:style="code.style">
						<input :placeholder="code.placeholder"
						@focus="inputFocus(code)"
						@blur="inputBlur(code)"
						v-model="code.val">
					</div>
					<p class="error" v-show="code.error">{{code.msg}}</p>
				</div>
				<!--发送验证码-->
				<div class="send-code">
					<sendCode
					:before="checkphone"
					:send="send"
					:reset="sendCode.reset"
					:style="sendCode.style"
					></sendCode>
				</div>
				<div class="clear"></div>
				<div class="field">
					<div class="input-container"
					:class="{active:pw.inputActive,error:pw.error}"
					:style="pw.style">
						<input :placeholder="pw.placeholder"
						@focus="inputFocus(pw)"
						@blur="inputBlur(pw)"
						@keyup.enter="reset"
						v-model="pw.val"
						maxlength="11">
					</div>
					<p class="error" v-show="pw.error">{{pw.msg}}</p>
				</div>
				<!--提交-->
				<div class="smartBtn-container">
					<smartBtn
					@clickBtn="reset"
					@returnToFirstStage="returnToFirstStage"
					:stage="btnSet.stage"
					:currentStage="btnSet.currentStage"
					:style="btnSet.style"></smartBtn>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import sendCode from '../../components/sendCode.vue';
	import smartBtn from '../../components/SmartBtn.vue';
	export default{
		name:'resetPw',
		data(){
			return{
					phone:{
						name:'phone',
						inputActive:false,
						placeholder:'请输入手机号',
						error:false,
						msg:'',
						val:'',
						style:{
							width:'300px'
						}
					},
					code:{
						name:'code',
						inputActive:false,
						placeholder:'请输入验证码',
						error:false,
						msg:'',
						val:'',
						style:{
							width:'168px',
							display:'inline-block'
						}
					},
					pw:{
						name:'pw',
						inputActive:false,
						placeholder:'请输入新密码',
						error:false,
						msg:'',
						val:'',
						style:{
							width:'300px'
						}
					},
					btnSet:{
						//disabled表示是否可以点击 acive表示是否opacity .5
						stage:{
							0:{
								txt:'重置密码',
								disabled:false,
								active:true,
								firstStage:true
							},
							1:{
								txt: '重置中..',
								disabled:true,
								active:false
							},
							2:{
								txt:'重置成功!',
								disabled:true,
								active:true,
								lastStage:true
							}
						},
						style:{
							height: '48px',
							lineHeight: '48px',
							color: '#fff',
							fontSize:'18px'
						},
						currentStage:0
					},
					sendCode:{
						reset:1
					}
				}
			},
		methods:{
			checkphone(){
				if(this.phone.val === ''){
					this.phone.msg = '手机号不能为空';
					this.phone.error = true;
					return;
				}
				else if(!(/^1[34578]\d{9}$/.test(this.phone.val))){
					this.phone.msg = '手机号不合法';
					this.phone.error = true;
					return;
				}
				return true;
			},
			checkcode(){
				if(this.code.val === ''){
					this.code.msg = '验证码不能为空';
					this.code.error = true;
					return;
				}
				return true;
			},
			checkpw(){
				if(this.pw.val === ''){
					this.pw.msg = '新密码不能为空';
					this.pw.error = true;
					return;
				} else if (this.pw.val.length < 6){
					this.pw.msg = '新密码长度不能少于6位数';
					this.pw.error = true;
					return;
				}
				return true;
			},
			inputFocus(field){
				this[field.name].inputActive = true;
				this[field.name].error = false;
			},
			inputBlur(field){
				this[field.name].inputActive = false;
				this['check'+field.name]();
			},
			send(before){
				this.$http.get('?name=education.sys.reg.login.sms.send&mobile='+this.phone.val,{
					before: before
				}).then((response)=>{
					if(response.body.code === 1000){
					}
					else {
						this.phone.error = true;
						this.phone.msg = response.body.msg;
					}
				})
			},
			//重置密码
			reset(){
				// 嘿嘿只是用来重置sendCode的一行
				// this.sendCode.reset = Math.random();
				this.checkphone();
				this.checkcode();
				this.checkpw();
				if(this.phone.error || this.code.error || this.pw.error) return;
				let name;
				if(this.userType === 1) name='education.student.register.login';
				else name='education.teacher.register.login';
				this.$http.get('?name='+name+'&mobile='+this.phone.val+'&code='+this.code.val,{
					timeout:30000,
					before: function() {
						this.btnSet.currentStage = 1;
					}
				}).then((response)=>{
						if(response.body.code === 1000){
							//登录成功
							localStorage.setItem('user',JSON.stringify(response.body.data));
							location.href='./user.html';
							this.btnSet.currentStage = 2;
						}
						else {
							this.code.error = true;
							this.code.msg = response.body.msg;
							this.btnSet.currentStage = 0;
						}
				})
			},
			returnToFirstStage(){
				this.btnSet.currentStage = 0;
			}
		},
		props:['userType'],
		components:{smartBtn,sendCode}
	}
</script>
<style scoped lang='less'>
	@baseColor:#55b7f8;
	#signup_page{
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
		background: url(../../assets/img/login/oval.png) no-repeat;
		background-repeat: round;
	}
	#login_container{
		width: 504px;
		min-height: 453px;
		position: absolute;
		top: 50%;
		left: 50%;
		margin-left:-250px;
		margin-top: -280px;
		border-radius: 5px;
		background: url(../../assets/img/index/bg.png) center no-repeat;
		background-size:100% 100%;
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
		width: 300px;
		height: 30px;
		font-size: 16px;
		display: inline-block;
		text-align: center;
		position: relative;
		margin-bottom: 50px;
		border-bottom: 1px solid @baseColor;
		color: @baseColor;
	}
	.loginform{
		width:300px;
		margin:0 auto;
	}
	.field{
		margin-bottom: 20px;
	}
	.input-container{
		height: 48px;
		line-height: 48px;
		padding-left: 16px;
		background: #f8f8f8;
		border:1px solid transparent;
		font-size:14px;
		border-radius: 2px;
		&.active{
			border-color:@baseColor;
		}
		&.error{
			border-color:red;
		}
		input{
			border:none;
			background: transparent;
		}
	}
	/*发送验证码*/
	.send-code{
		width:122px;
		height: 48px;
		line-height: 48px;
		text-align: center;
		font-size: 14px;
		background: @baseColor;
		color:#fff;
		display: inline-block;
		border-radius: 2px;
		float: right;
		cursor: pointer;
		&.disabled{
			background: #f8f8f8;
			color:#dadada;
			cursor: not-allowed;
		}
	}
	/*填写错误提示*/
	.error{
		font-size: 12px;
		color:red;
	}
	.smartBtn-container{
		width:300px;
		height: 48px;
		margin: 40px auto;
		cursor: pointer;
		position: relative;
	}
</style>