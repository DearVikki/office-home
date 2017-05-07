<template>
	<div id='signup_container' class="account-container">
			<h3>Ingresar</h3>
			<!--大框开始-->
			<div class="form-container">
				<!--包住form表单的-->
				<div id='form_wrapper'>
						<ul class="form-group">
							<li class="common-field" v-for="field in fieldsA" :class="field.class">
								<label :for="field.id">{{field.name}}</label>
								<div class="input-container" :class="{ warn: field.error || field.focus}">
										<input
										type="password"
										:id="field.id"
										:placeholder="field.placeholder"
										@blur="fieldBlur(field)"
										@focus="fieldFocus(field)"
										v-model="field.val"
										v-if="(field.id === 'pw') ||(field.id === 'repw')">
										<input
										 type="text"
										:id="field.id"
										:placeholder="field.placeholder"
										@blur="fieldBlur(field)"
										@focus="fieldFocus(field)"
										v-model="field.val"
										v-else>
								</div>
								<p class="error" v-show="field.error && !field.focus">{{field.msg}}</p>
							</li>
						</ul>
						<ul class="form-group">
							<li class="common-field" v-for="field in fieldsB" :class="field.class">
								<label :for="field.id">{{field.name}}</label>
								<div class="input-container" :class="{ warn: field.error || field.focus}">
										<input
										type="text"
										:id="field.id"
										:placeholder="field.placeholder"
										@blur="fieldBlur(field)"
										@focus="fieldFocus(field)"
										v-model="field.val"
										v-if="!field.isSelect">
										<select
										:id="field.id"
										v-model='field.val'
										@click="fieldBlur(field)"
										v-else>
											<option v-for="option in field.options" :value="option.register_question_id">{{option.content}}</option>
										</select>
								</div>
								<p class="error" v-if="field.error && !field.focus">{{field.msg}}</p>
							</li>
						</ul>
						<div class="clear"></div>
				<div class="account-btn" @click='register'>Registrarme</div>
			</div>
		</div>
	</div>
</template>
<script>
	import { myAlert } from '../../assets/js/utils.js'
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
		            validators: {
		            	required: { msg: '邮箱不能为空' },
		            	isEmail: { msg: '邮箱无效' }
		            },
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
		            validators: {
		            	required: { msg: '重复邮箱不能为空' },
		            	equalTo: {
		            		msg: '两次邮箱输入不一致',
		            		extra: { to: 'email' }
		            	}
		            },
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
		            validators: {
		            	required: { msg: '密码不能为空' },
		            	minlen: {
		            		msg: '密码长度最小为6位',
		            		extra: { len: 6 }
		            	},
		            	maxlen: {
		            		msg: '密码长度最长为20位',
		            		extra: { len: 20 }
		            	}
		            },
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
		            validators: {
		            	required: { msg: '重复密码不能为空' },
		            	equalTo: {
		            		msg: '两次密码输入不一致',
		            		extra: { to: 'pw' }
		            	}
		            },
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
		            validators: {
		            	required: { msg: '用户名不能为空' }
		            },
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
		            validators: {
		            	required: { msg: '身份证不能为空' }
		            },
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
		            validators: {
		            	required: { msg: '请选择一个问题' }
		            },
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
		            validators: {
		            	required: { msg: '答案不能为空' }
		            },
		            error: '',
		            msg:'',
		            val:'',
		            focus: false
		          }}
			}
		},
		methods: {
			equalTo(val, extra) {
				return val === this.fieldsA[extra.to].val;
			},
			register(){
				let fieldsACheck = this.checkAll(this.fieldsA),
					fieldsBCheck = this.checkAll(this.fieldsB);
				if(!fieldsACheck || !fieldsBCheck) return;
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
						myAlert('signup success!', () => {
							location.replace('./index.html');
						})
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