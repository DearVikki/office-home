<template>
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
				@keyup.enter="login"
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
		<!--登录-->
		<div class="smartBtn-container">
			<smartBtn
			@clickBtn="login"
			@returnToFirstStage="returnToFirstStage"
			:stage="btnSet.stage"
			:currentStage="btnSet.currentStage"
			:style="btnSet.style"></smartBtn>
		</div>
	</div>
</template>
<script>
	import sendCode from '../../components/sendCode.vue';
	import smartBtn from '../../components/SmartBtn.vue';
	export default{
		name:'loginform',
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
				btnSet:{
					//disabled表示是否可以点击 acive表示是否opacity .5
					stage:{
						0:{
							txt:'登 录',
							disabled:false,
							active:true,
							firstStage:true
						},
						1:{
							txt: '登录中..',
							disabled:true,
							active:false
						},
						2:{
							txt:'登录成功!',
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
		mounted(){
			if(location.hash === '#signup') {
				this.btnSet.stage['0'].txt = '注 册';
				this.btnSet.stage['1'].txt = '注册中';
				this.btnSet.stage['2'].txt = '注册成功';
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
			//登录
			login(){
				// 嘿嘿只是用来重置sendCode的一行
				// this.sendCode.reset = Math.random();
				this.checkphone();
				this.checkcode();
				if(this.phone.error || this.code.error) return;
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
	/*登录*/
	/*.login-btn{
		width:300px;
		height: 48px;
		line-height: 48px;
		color: #fff;
		background: @baseColor;
		text-align: center;
		font-size: 18px;
		border-radius: 2px;
		margin: 40px auto;
		cursor: pointer;
		position: relative;
	}*/
	.smartBtn-container{
		width:300px;
		height: 48px;
		margin: 40px auto;
		cursor: pointer;
		position: relative;
	}
</style>