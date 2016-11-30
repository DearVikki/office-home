<template>
	<div>
		<div id='login_container' class="account-container">
			<h3>Ingresar</h3>
			<!--大框开始-->
			<div class="form-container">
				<!--包住form表单的-->
				<div id='form_wrapper' style="font-size:20px">
					<validation name="validation1">
						<div class="common-field" v-for="(value, field) in fields" :class="fields[field].class">
							<label :for="fields[field].id">{{fields[field].name}}</label>
							<a class="forget-pw"
							href="./forget-pw.html#/Step1"
							 v-if="fields[field].id==='pw'">Recuperar contraseña?</a>
							<div class="input-container" :class="{ warn: fields[field].error || fields[field].focus}">
								<validity :ref='fields[field].id' :field='fields[field].id' :validators="fields[field].validator">
									<input v-if="fields[field].id === 'account'" :id="fields[field].id" type="text"  :placeholder="fields[field].placeholder" @blur="handleValidate(fields[field].id)" @focus="focusing(fields[field].id)" v-model="fields[field].val">
									<input v-else :id="fields[field].id" type="password"  :placeholder="fields[field].placeholder" @blur="handleValidate(fields[field].id)" @focus="focusing(fields[field].id)" v-model="fields[field].val">
								</validity>
							</div>
							<p class="error" v-if="fields[field].error && !fields[field].focus">{{fields[field].msg}}</p>
						</div>
						<!--<pre style="font-size:12px">{{$validation}}</pre>-->
						<div class="account-btn" @click="login">Ingresar</div>
					</validation>
					<a class="signup" href="./signup.html">Registrarme</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import a from 'vue-validator';
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
			            name: 'Nombre de usuario',
			            placeholder: '请输入邮箱或身份证',
			            type: 'text',
			            error: false,
			            msg: '',
			            validator: { required: true},
			            val: '',
						focus: false
		          	},
		         	 pw: {
			            id: 'pw',
			            class: 'pw-field',
			            name: 'Contraseña',
			            placeholder: '请输入6-20位密码',
			            error: false,
			            msg:'',
			            validator: { required: true, minlength: 6, maxlength: 20},
			            val: '',
						focus: false
			          }
		        }
			}
		},
		watch:{
			$validation(){
				try{
					if(this.$validation.validation1.account.invalid) {
						this.fields.account.error = true;
						this.fields.account.msg = '账号不能为空';
					} else if(this.$validation.validation1.account.valid){
						this.fields.account.error = false;
					}
					if(this.$validation.validation1.pw.invalid) {
						this.fields.pw.error = true;
						var err0 = this.$validation.validation1.pw.errors[0].validator;
						if(err0 === 'required') this.fields.pw.msg = '密码不能为空';
						else if(err0 === 'minlength') this.fields.pw.msg = '密码长度最小为6位';
						else if(err0 === 'maxlength') this.fields.pw.msg = '密码长度最长为20位';
					} else if(this.$validation.validation1.pw.valid){
						this.fields.pw.error = false;
					}
				} catch(err) {}
			}
		},
		methods: {
			handleValidate(field) {
				this.$refs[field][0].validate();
				this.fields[field].focus = false;
				},
			focusing(field){
				this.fields[field].focus = true;
			},
			//是否接触过input框 结果有差
			login(){
				let n = 4;
				for (var validity in this.$refs){
					this.$refs[validity][0].validate(() => {
						n--;
						if(n>0) return;
						if(this.$validation.validation1.invalid) return;
						else {
							this.$http.post('',{name:'zl.shopping.sys.pc.login',account:this.fields.account.val,password:this.fields.pw.val}).then((response)=>{
								if(response.body.code === 1000){
									console.log('login success!')
								} else if(response.body.code === 1011) {
									this.fields.account.error = true;
									this.fields.account.msg = response.body.msg;
								} else if(response.body.code === 1014){
									this.fields.pw.error = true;
									this.fields.pw.msg = response.body.msg;
								}
							})
						}
					});
				}
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
	}
	.input-container.active,.input-container.warn{
		border-bottom: 2px solid @baseColor !important;
	}
</style>