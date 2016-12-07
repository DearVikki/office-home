<template>
	<div id='signup_container' class="account-container">
			<h3>Ingresar</h3>
			<!--大框开始-->
			<div class="form-container">
				<!--包住form表单的-->
				<div id='form_wrapper'>
					<validation name="validation1">
						<ul class="form-group">
							<li class="common-field" v-for="(value, field) in fieldsA" :class="fieldsA[field].class">
								<label :for="fieldsA[field].id">{{fieldsA[field].name}}</label>
								<div class="input-container" :class="{ warn: fieldsA[field].error || fieldsA[field].focus}">
									<validity
									:ref='fieldsA[field].id'
									:field='fieldsA[field].id'
									:validators="fieldsA[field].validator">
										<input
										type="password"
										:id="fieldsA[field].id"
										:placeholder="fieldsA[field].placeholder"
										@blur="handleValidate(fieldsA[field].id)"
										@focus="focusing(fieldsA[field].id)"
										v-model="fieldsA[field].val"
										v-if="(fieldsA[field].id === 'pw') ||(fieldsA[field].id === 'repw')">
										<input
										 type="text"
										:id="fieldsA[field].id"
										:placeholder="fieldsA[field].placeholder"
										@blur="handleValidate(fieldsA[field].id)"
										@focus="focusing(fieldsA[field].id)"
										v-model="fieldsA[field].val"
										v-else>
									</validity>
								</div>
								<p class="error" v-show="fieldsA[field].error && !fieldsA[field].focus">{{fieldsA[field].msg}}</p>
							</li>
						</ul>
						<ul class="form-group">
							<li class="common-field" v-for="(value, field) in fieldsB" :class="fieldsB[field].class">
								<label :for="fieldsB[field].id">{{fieldsB[field].name}}</label>
								<div class="input-container" :class="{ warn: fieldsB[field].error || fieldsB[field].focus}">
									<validity :ref='fieldsB[field].id' :field='fieldsB[field].id' :validators="fieldsB[field].validator">
										<input
										type="text"
										:id="fieldsB[field].id"
										:placeholder="fieldsB[field].placeholder"
										@blur="handleValidate(fieldsB[field].id)"
										@focus="focusing(fieldsB[field].id)"
										v-model="fieldsB[field].val"
										v-if="!fieldsB[field].isSelect">
										<select
										:id="field.id"
										v-model='fieldsB[field].val'
										@click="handleValidate(fieldsB[field].id)"
										v-else>
											<option v-for="option in fieldsB[field].options" :value="option.register_question_id">{{option.content}}</option>
										</select>
									</validity>
								</div>
								<p class="error" v-if="fieldsB[field].error && !fieldsB[field].focus">{{fieldsB[field].msg}}</p>
							</li>
						</ul>
						<div class="clear"></div>
						<!--<pre style="font-size:12px">{{$validation}}</pre>-->
				</validation>
				<div class="account-btn" @click='register'>Registrarme</div>
			</div>
		</div>
	</div>
</template>
<script>
	import a from 'vue-validator';
	export default{
		name: 'signup',
		mounted(){
			//拉取问题
			this.$http.post('',{name:'zl.shopping.sys.register.question'}).then((response)=>{
					this.fieldsB.question.options = response.body.data;
					this.fieldsB.question.options.unshift({register_question_id:'', content: '嘿！请选择一个问题'})
				})
		},
		data(){
			return{
				fieldsA: {
					email: {
		            id: 'email',
		            class: 'email-field',
		            name: 'Correo',
		            placeholder: '',
		            validator: { required: true, isEmail: true},
		            error: '',
		            msg:'',
		            val:'',
		            focus: false
		          },
		          remail: {
		            id: 'remail',
		            class: 'remail-field',
		            name: 'Confimar su correo',
		            placeholder: '',
		            validator: { required: true, equalTo: 'email'},
		            error: '',
		            msg:'',
		            val:'',
		            focus: false
		          },
		          pw: {
		            id: 'pw',
		            class: 'pw-field',
		            name: 'Contraseña',
		            placeholder: 'Ingresar contraseña 6-20 letras',
		            validator: { required: true, minlength:6, maxlength:20},
		            error: '',
		            msg:'',
		            val:'',
		            focus: false
		          },
		          repw: {
		            id: 'repw',
		            class: 'repw-field',
		            name: 'Confimar su contraseña',
		            placeholder: 'Confimar su contraseña',
		            validator: { required: true, equalTo: 'pw'},
		            error: '',
		            msg:'',
		            val:'',
		            focus: false
		          }
		       },
		        fieldsB:{
		        	name: {
		            id: 'name',
		            class: 'name-field',
		            name: 'Usuario',
		            placeholder: '请输入用户名',
		            validator: { required: true},
		            error: '',
		            msg:'',
		            val:'',
		            focus: false
		          },
		          id: {
		            id: 'id',
		            class: 'id-field',
		            name: '身份证',
		            placeholder: '请输入身份证',
		            validator: { required: true},
		            error: '',
		            msg:'',
		            val:'',
		            focus: false
		          },
		          question: {
		            id: 'question',
		            class: 'question-field',
		            name: '问题设置',
		            placeholder: '请选择问题',
		            validator: { required: true},
		            isSelect: true,
		            options:[{
		            	text: '请选择一个问题',
		            	val: ''
		            }],
		            error: '',
		            msg:'',
		            val:'',
		            focus: false
		          },
		          answer: {
		            id: 'answer',
		            class: 'answer-field',
		            name: '答案',
		            placeholder: '请填写答案',
		            validator: { required: true},
		            error: '',
		            msg:'',
		            val:'',
		            focus: false
		          }}
			}
		},
		watch:{
			$validation(){
				var va1 = this.$validation.validation1;
				try{
					if(va1.email.invalid) {
						this.fieldsA.email.error = true;
						var err0 = va1.email.errors[0].validator;
						if(err0 === 'required') this.fieldsA.email.msg = '邮箱不能为空';
						else if(err0 === 'isEmail') this.fieldsA.email.msg = '邮箱无效';
					} else {
						this.fieldsA.email.error = false;
					}
					if(va1.remail.invalid) {
						this.fieldsA.remail.error = true;
						var err0 = va1.remail.errors[0].validator;
						if(err0 === 'required') this.fieldsA.remail.msg = '重复邮箱不能为空';
						else if(err0 === 'equalTo') this.fieldsA.remail.msg = '两次邮箱输入不一致';
					} else {
						this.fieldsA.remail.error = false;
					}
					if(va1.pw.invalid){
						this.fieldsA.pw.error = true;
						var err0 = va1.pw.errors[0].validator;
						if(err0 === 'required') this.fieldsA.pw.msg = '密码不能为空';
						else if(err0 === 'minlength') this.fieldsA.pw.msg = '密码长度最小为6位';
						else if(err0 === 'maxlength') this.fieldsA.pw.msg = '密码长度最长为20位'
					} else {
						this.fieldsA.pw.error = false;
					}
					if(va1.repw.invalid){
						this.fieldsA.repw.error = true;
						var err0 = va1.repw.errors[0].validator;
						if(err0 === 'required') this.fieldsA.repw.msg = '重复密码不能为空';
						else if(err0 === 'equalTo') this.fieldsA.repw.msg = '两次密码输入不一致';
					} else {
						this.fieldsA.repw.error = false;
					}
					if(va1.name.invalid){
						this.fieldsB.name.error = true;
						this.fieldsB.name.msg = '用户名不能为空';
					} else {
						this.fieldsB.name.error = false;
					}
					if(va1.id.invalid){
						this.fieldsB.id.error = true;
						var err0 = va1.id.errors[0].validator;
						if(err0 === 'required') this.fieldsB.id.msg = '身份证不能为空';
						else this.fieldsB.id.msg = '身份证不合法';
					} else {
						this.fieldsB.id.error = false;
					}
					if(va1.question.invalid){
						this.fieldsB.question.error = true;
						this.fieldsB.question.msg = '请选择一个问题';
					} else {
						this.fieldsB.question.error = false;
					}
					if(va1.answer.invalid){
						this.fieldsB.answer.error = true;
						this.fieldsB.answer.msg = '答案不能为空';
					} else {
						this.fieldsB.answer.error = false;
					}
				} catch(err) {}
			}
		},
		validators:{
			isEmail(val){
				return /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(val);
			},
			equalTo(val, data){
				if(this.fieldsA[data]) var val0 = this.fieldsA[data].val;
				else var val0 = this.fieldsB[data].val;
				return val === val0 ? true : false;
			}
		},
		methods: {
			handleValidate(field) {
				this.$refs[field][0].validate();
				if(this.fieldsA[field]) this.fieldsA[field].focus = false;
				else this.fieldsB[field].focus = false;
				},
			focusing(field){
				if(this.fieldsA[field]) this.fieldsA[field].focus = true;
				else this.fieldsB[field].focus = true;
			},
			register(){
				let n = 13;
				for (var validity in this.$refs){
					this.$refs[validity][0].validate(() => {
						n--;
						if(n>0) return;
						if(this.$validation.validation1.invalid) {
							console.log(this.fieldsB.question.val)
							return;}
						else {
							let request = {
								name: 'zl.shopping.sys.pc.register',
								mail: this.fieldsA.email.val,
								password: this.fieldsA.pw.val,
								nickname: this.fieldsB.name.val,
								idcard: this.fieldsB.id.val,
								register_question_id: this.fieldsB.question.val,
								answer: this.fieldsB.answer.val
							}
							this.$http.post('',request).then((response)=>{
								if(response.body.code === 1000){
									console.log('signup success!')
								} else {
									let field, key;
									console.log(response.body)
									switch(response.body.code){
										case 1008:
											field = 'fieldsB';
											key = 'id';
											break;
										case 1010:
											field = 'fieldsA';
											key = 'email';
											break;
									}
									this[field][key].error = true;
									this[field][key].msg = response.body.msg;
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
		font-size: 20px;
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