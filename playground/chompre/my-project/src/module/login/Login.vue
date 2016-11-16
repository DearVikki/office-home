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
							<div class="input-container">
								<validity :ref="field.id" :field="field.id" :validators="field.validator">
									<input id="account" type="text" @blur="handleValidate" :placeholder="field.placeholder">
								</validity>
							</div>
							<p class="error" v-if="accErr">xxx</p>
						</div>
						<pre style="font-size:12px">{{$validation}}</pre>
						<div class="account-btn" @click="login">Ingresar</div>
					</validation>
				<!--<a class="login-opt">找回密码</a>
				<a class="login-opt">Registrarme</a>-->
				<p>{{accErr}}</p>
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
		            error: '',
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
			accErr(){
				try {
					console.log(this.$validation.validation1.account.errors[0].validator)
					if(!this.$validation.validation1.account.valid) return '账号不能为空';
				}catch(err) {}
			},
			...a.mapValidation({
				accountRequire: '$validation.validation1.account.required',
				pwInvalid: '$validation.validation1.pw.invalid',
				pwShort: '$validation.validation1.pw.minlength',
				pwLong: '$validation.validation1.pw.maxlength',
				allPass:'$validation.validation1.valid'
			})
		},
		methods: {
			handleValidate(e) {
				e.target.$validity.validate();
			},
			login(e){
				this.$validation.activateValidator();
				var self = this;
				console.log(this);
			      this.$validate(true, function () {
			        if (self.$validation.invalid) {
			          e.preventDefault()
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
</style>