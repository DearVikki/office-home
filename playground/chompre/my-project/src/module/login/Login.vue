<template>
	<div>
		<div id='login_container' class="account-container">
			<h3>{{lang.LOGIN}}</h3>
			<!--大框开始-->
			<div class="form-container">
				<!--包住form表单的-->
				<div id='form_wrapper' style="font-size:20px">
						<div class="common-field" v-for="field in fields" :class="field.class">
							<label :for="field.id">{{field.name}}</label>
							<a class="forget-pw"
							href="./forget-pw.html#/Step1"
							 v-if="field.id==='pw'">{{lang.FORGET_PW}}?</a>
							<div class="input-container"
							:class="{ warn: field.error || field.focus}">
									<input v-if="field.id === 'account'"
									:name="field.id"
									:placeholder="field.placeholder"
									@blur="fieldBlur(field)"
									@focus="fieldFocus(field)"
									v-model="field.val">
									<input v-else
									:name="field.id"
									type="password"
									@blur="fieldBlur(field)"
									@focus="fieldFocus(field)"
									v-model="field.val">
							</div>
							<p class="error" v-if="field.error && !field.focus">{{field.msg}}</p>
						</div>
						<!--<pre style="font-size:12px">{{$validation}}</pre>-->
						<div class="account-btn" @click="login">{{lang.LOGIN}}</div>
					<a class="signup" href="./signup.html">{{lang.REGISTER}}</a>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import { myAlert } from '../../assets/js/utils.js'
	import lang from '../../assets/js/language.js';
	export default{
		name:'Vali',
		mounted(){
		},
		data(){
			return{
				notFocus: true,
				fields:{
					account: {
			            id: 'account',
			            class: 'account-field',
			            name: lang.ACCOUNT,
			            placeholder: lang.FILL_IN_ACCOUNT,
			            type: 'text',
			            error: false,
			            msg: '',
			            validators: {
			            	required: { msg:lang.NO_EMPTY_MAIL}
			            },
			            val: '',
						focus: false
		          	},
		         	pw: {
			           id: 'pw',
			           class: 'pw-field',
			           name: lang.PW,
			           placeholder: lang.FILL_IN_PW,
			           error: false,
			           msg:'',
			           validators: {
			            	required: {msg: lang.NO_EMPTY_PW},
			            	minlen: {
			            		msg: lang.PW_MIN_6,
			            		extra: { len: 6 }
			            	},
			            	maxlen: {
			            		msg: lang.PW_MAX_20,
			            		extra: { len: 20 }
			            	}
			            },
			            val: '',
						focus: false
			        }
		        },
		        lang:lang
			}
		},
		methods: {
			login(){
				if(!this.checkAll(this.fields)) return;
				this.$http.post('',{name:'zl.shopping.sys.pc.login',account:this.fields.account.val,password:this.fields.pw.val}).then((response)=>{
					if(response.body.code === 1000){
						localStorage.setItem('userInfo', JSON.stringify(response.body.data));
						myAlert('login success!', ()=>{
							let referrer = document.referrer;
							if(referrer.slice(-10) === 'login.html' || referrer.slice(-11) === 'signup.html' || referrer.slice(-14) === 'forget-pw.html')
								referrer = './index.html';
							location.replace(referrer);
						})
					} else if(response.body.code === 1011) {
						this.fields.account.error = true;
						this.fields.account.msg = response.body.msg;
					} else if(response.body.code === 1014){
						this.fields.pw.error = true;
						this.fields.pw.msg = response.body.msg;
					}
				})
			}
		}
	}
</script>
<style scoped lang='less'>
	@baseColor: #d42b1e;
	#login_container{
		max-width: 714px;
	}
	#form_wrapper{
		margin:40px 84px;
		.common-field{
			margin:6px auto;
			max-width: 400px;
		}
	}
	.forget-pw{
		font-size: 14px;
		position: absolute;
		right: 0;
		top: 11px;
		color: @baseColor;
	}
	.signup{
		font-size: 20px;
		position: absolute;
		right: 57px;
		color: @baseColor;
		bottom:52px;
	}
	.account-btn{
		display: block;
		max-width: 173px;
		cursor: pointer;
		margin: 38px auto;
	}
	.input-container.active,.input-container.warn{
		border-bottom: 2px solid @baseColor !important;
	}
</style>