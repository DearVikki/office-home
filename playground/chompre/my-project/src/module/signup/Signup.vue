<template>
	<div id='signup_container' class="account-container">
			<h3>Ingresar</h3>
			<!--大框开始-->
			<div class="form-container">
				<!--包住form表单的-->
				<div id='form_wrapper'>
					<validation name="validation1">
						<ul class="form-group">
							<li class="common-field" v-for="field in fieldsA" :class="field.class">
								<label :for="field.id">{{field.name}}</label>
								<div class="input-container" :class="{active:status[field.id].active, warn:status[field.id].result}">
									<validity :ref="field.id" :field="field.id" :validators="field.validator">
										<input :id="field.id" type="text" @blur="handleValidate" :placeholder="field.placeholder" v-model='values[field.id]' v-if="field.id === 'pw'||'repw'"><input :id="field.id" type="text" @blur="handleValidate" :placeholder="field.placeholder" v-model='values[field.id]' v-else>
									</validity>
								</div>
								<p class="error" v-if="status[field.id].result">{{status[field.id].msg}}</p>
							</li>
						</ul>
						<ul class="form-group">
							<li class="common-field" v-for="field in fieldsB" :class="field.class">
								<label :for="field.id">{{field.name}}</label>
								<div class="input-container" :class="{active:status[field.id].active, warn:status[field.id].result}">
									<validity :ref="field.id" :field="field.id" :validators="field.validator">
										<input :id="field.id" type="text" @input="handleValidate" :placeholder="field.placeholder"  v-if="!field.isSelect" v-model='values[field.id]'>
										<select :id="field.id" v-else v-model='values[field.id]'>
											<option v-for="option in field.options">{{option}}</option>
										</select>
									</validity>
								</div>
								<p class="error" v-if="status[field.id].result">{{status[field.id].msg}}</p>
							</li>
						</ul>
						<div class="clear"></div>
						<!--<pre style="font-size:12px">{{$validation}}</pre>-->
				</validation>
				<div class="account-btn">Registrarme</div>
			</div>
		</div>
	</div>
</template>
<script>
	import a from 'vue-validator';
	export default{
		name: 'signup',
		data(){
			return{
				values:{
					email:'',
					remail:'',
					pw:'',
					repw:'',
					name:'',
					id:'',
					question:'',
					answer:''
				},
				fieldsA:[{
		            id: 'email',
		            class: 'email-field',
		            name: 'Correo',
		            placeholder: '',
		            error: '',
		            validator: { required: true, email: true}
		          },{
		            id: 'remail',
		            class: 'remail-field',
		            name: 'Confimar su correo',
		            placeholder: '',
		            error: '',
		            validator: { required: true, equalTo: 'email'}
		          },{
		            id: 'pw',
		            class: 'pw-field',
		            name: 'Contraseña',
		            placeholder: 'Ingresar contraseña 6-20 letras',
		            error: '',
		            validator: { required: true}
		          },{
		            id: 'repw',
		            class: 'repw-field',
		            name: 'Confimar su contraseña',
		            placeholder: 'Confimar su contraseña',
		            error: '',
		            validator: { required: true}
		          }],
		        fieldsB:[{
		            id: 'name',
		            class: 'name-field',
		            name: 'Usuario',
		            placeholder: '请输入用户名',
		            error: '',
		            validator: { required: true}
		          },{
		            id: 'id',
		            class: 'id-field',
		            name: '身份证',
		            placeholder: '请输入身份证',
		            error: '',
		            validator: { required: true}
		          },{
		            id: 'question',
		            class: 'question-field',
		            name: '问题设置',
		            placeholder: '请选择问题',
		            error: '',
		            validator: { required: true},
		            isSelect: true,
		            options:['问题A','问题B']
		          },{
		            id: 'answer',
		            class: 'answer-field',
		            name: '答案',
		            placeholder: '请填写答案',
		            error: '',
		            validator: { required: true}
		          }]
			}
		},
		computed:{
			status(){
				var status = {};
				this.fieldsA.forEach((field)=>{
					status[field.id] = {result: false, msg: '', active:false};
				});
				this.fieldsB.forEach((field)=>{
					status[field.id] = {result: false, msg: '', active:false};
				})
				try{
					if(this.$validation.validation1.email.invalid) {
						status.email.result = true;
						var err0 = this.$validation.validation1.email.errors[0].validator;
						if(err0 === 'required') status.email.msg = '邮箱不能为空';
						else if(err0 === 'email') status.email.msg = '邮箱无效';
					}
					if(this.$validation.validation1.remail.invalid) {
						status.remail.result = true;
						var err0 = this.$validation.validation1.remail.errors[0].validator;
						if(err0 === 'required') status.remail.msg = '重复邮箱不能为空';
						else if(err0 === 'equalTo') status.remail.msg = '两次邮箱输入不一致';
						//else if(err0 === 'minlength') status.pw.msg = '密码长度最小为6位';
					}
				} catch(err) {}
				return status;
			},
			...a.mapValidation({
				emailInvalid: 'this.$validation.validation1.email.invalid',
				remailInvalid: 'this.$validation.validation1.remail.invalid',
				allPass:'$validation.validation1.valid'
			})
		},
		validators:{
			email(val){console.log(this.$refs.email[0].value)
				return /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(val);
			},
			equalTo(val, data){
				return val === this.values[data] ? true : false;
			}
		},
		methods: {
			handleValidate(e) {
				e.target.$validity.validate();
			}
		}
	}
</script>
<style scoped lang='less'>
	@baseColor: #d42b1e;
	#signup_container{
		max-width: 950px;
		width: 100%;
	}
	#form_wrapper{
		font-size:20px;
		margin:40px 60px;
		overflow: hidden;
		text-align: center;
	}
	.form-group{
		max-width: 355px;
		min-width: 180px;
    	width: 100%;
	}
	.input-container.active,.input-container.warn{
		border-bottom: 2px solid @baseColor !important;
	}
	select{
		width: 100%;
		border: none;
	}
	@media all and (min-width: 840px){
		.form-group{
			&:nth-of-type(2n){
				float: right;
			}
			&:nth-of-type(2n+1){
				float: left;
			}
		}
	}
	@media all and (max-width: 840px){
		.form-group{
			display: inline-block;
		}
	}
</style>