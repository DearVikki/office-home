<template>
	<div>
		<div id='login_container' class="account-container">
			<h3>Ingresar</h3>
			<!--大框开始-->
			<div class="form-container">
				<!--包住form表单的-->
				<div id='form_wrapper' style="font-size:20px">
					<validation name="validation1">
						<div class="common-field" v-for="field in fields" :class="field.class">
							<label :for="field.id">{{field.name}}</label>
							<div class="input-container" :class="{active:status[field.id].active, warn:status[field.id].result}">
								<validity :ref="field.id" :field="field.id" :validators="field.validator">
									<input :id="field.id" type="text"  :placeholder="field.placeholder" @blur="handleValidate(field.id)" @focus="hideMsg">
								</validity>
							</div>
							<p class="error" v-if="status[field.id].result">{{status[field.id].msg}}</p>
						</div>
						<!--<pre style="font-size:12px">{{$validation}}</pre>-->
						<div class="account-btn" @click="login">Ingresar</div>
					</validation>
					<a class="login-opt">找回密码</a>
					<a class="login-opt">Registrarme</a>
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
				fields:[{
		            id: 'account',
		            class: 'account-field',
		            name: '账号',
		            placeholder: '请输入邮箱或身份证',
		            error: this.accErr,
		            msg: this.accMsg,
		            validator: { required: true}
		          }, {
		            id: 'pw',
		            class: 'pw-field',
		            name: '密码',
		            placeholder: '请输入6-20位密码',
		            error: '',
		            validator: { required: true, minlength: 6, maxlength: 20}
		          }]
			}
		},
		computed: {
			status(){
				var status = {};
				this.fields.forEach((field)=>{
					status[field.id] = {result: false, msg: '', active:false};
				})
				try{
					if(this.$validation.validation1.account.invalid) {
						status.account.result = true;
						status.account.msg = '账号不能为空';
					}
					if(this.$validation.validation1.pw.invalid) {
						status.pw.result = true;
						var err0 = this.$validation.validation1.pw.errors[0].validator;
						if(err0 === 'required') status.pw.msg = '密码不能为空';
						else if(err0 === 'minlength') status.pw.msg = '密码长度最小为6位';
					}
				} catch(err) {}
				return status;
			},
			...a.mapValidation({
				accountInvalid: 'this.$validation.validation1.account.invalid',
				pwInvalid: 'this.$validation.validation1.pw.invalid',
				allPass:'$validation.validation1.valid'
			})
		},
		methods: {
			handleValidate(validity) {
				this.$refs[validity][0].validate();

			},
			hideMsg(e){
				var field = e.target.id;
				this.status[field].result = false;
				this.status[field].active = true;
				console.log(this.status.pw)
			},
			//是否接触过input框 结果有差
			login(){
				for (var validity in this.$refs){
					this.$refs[validity][0].validate();
				}
				console.log(this.$validation.validation1)
				if(this.$validation.validation1.invalid) return;
				else console.log('hey')
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
	}
	.login-opt{
		font-size: 20px;
		position: absolute;
		right: 87px;
		color: @baseColor;
		bottom:144px;
		&:nth-of-type(2){
			bottom: 52px;
		}
	}
	.account-btn{
		display: block;
		max-width: 173px;
	}
	.input-container.active,.input-container.warn{
		border-bottom: 2px solid @baseColor !important;
	}
</style>