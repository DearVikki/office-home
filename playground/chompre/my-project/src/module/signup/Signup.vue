<template>
	<div id='signup_container' class="account-container">
			<h3>{{lang.SIGN_UP}}</h3>
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
				<div class="account-btn" @click='register'>{{lang.REGISTER}}</div>
			</div>
		</div>
	</div>
</template>
<script>
	import { myAlert } from '../../assets/js/utils.js'
	import lang from '../../assets/js/language.js';
	export default{
		name: 'signup',
		mounted(){
			//拉取问题
			this.$http.post('',{name:'zl.shopping.sys.register.question'}).then((response)=>{
					this.fieldsB.question.options = response.body.data;
					this.fieldsB.question.options.unshift({register_question_id:'', content: lang.FILL_IN_QUESTION})
				})
		},
		data(){
			return{
				fieldsA: {
				  email: {
		            id: 'email',
		            class: 'email-field',
		            name: lang.MAIL,
		            placeholder: lang.FILL_IN_ACCOUNT,
		            validators: {
		            	required: { msg: lang.NO_EMPTY_MAIL },
		            	isEmail: { msg: lang.INVALID_MAIL }
		            },
		            error: '',
		            msg:'',
		            val:'',
		            focus: false
		          },
		          remail: {
		            id: 'remail',
		            class: 'remail-field',
		            name: lang.FILL_IN_MAIL_AGAIN,
		            placeholder: lang.FILL_IN_MAIL_AGAIN,
		            validators: {
		            	required: { msg: lang.NO_EMPTY_REPEAT_MAIL },
		            	equalTo: {
		            		msg: lang.NOT_SAME_MAIL,
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
		            name: lang.PW,
		            placeholder: lang.FILL_IN_PW,
		            validators: {
		            	required: { msg: lang.NO_EMPTY_PW },
		            	minlen: {
		            		msg: lang.PW_MIN_6,
		            		extra: { len: 6 }
		            	},
		            	maxlen: {
		            		msg: lang.PW_MAX_20,
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
		            name: lang.FILL_IN_PW_AGAIN,
		            placeholder: lang.FILL_IN_PW_AGAIN,
		            validators: {
		            	required: { msg: lang.NO_EMPTY_REPEAT_PW },
		            	equalTo: {
		            		msg: lang.NOT_SAME_PW,
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
		            name: lang.USER_NAME,
		            placeholder: lang.FILL_IN_USER_NAME,
		            validators: {
		            	required: { msg: lang.NO_EMPTY_USER_NAME }
		            },
		            error: '',
		            msg:'',
		            val:'',
		            focus: false
		          },
		          id: {
		            id: 'id',
		            class: 'id-field',
		            name: lang.ID,
		            placeholder: lang.FILL_IN_ID,
		            validators: {
		            	required: { msg: lang.NO_EMPTY_ID }
		            },
		            error: '',
		            msg:'',
		            val:'',
		            focus: false
		          },
		          question: {
		            id: 'question',
		            class: 'question-field',
		            name: lang.QUESTION,
		            placeholder: lang.FILL_IN_QUESTION,
		            validators: {
		            	required: { msg: lang.FILL_IN_QUESTION }
		            },
		            isSelect: true,
		            options:[{
		            	text: lang.FILL_IN_QUESTION,
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
		            name: lang.ANSWER,
		            placeholder: lang.FILL_IN_ANSWER,
		            validators: {
		            	required: { msg: lang.NO_EMPTY_ANSWER }
		            },
		            error: '',
		            msg:'',
		            val:'',
		            focus: false
		          }},
		          lang: lang
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
						localStorage.setItem('userInfo', JSON.stringify(response.body.data));
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
	.common-field .input-container input{
		width: 100%;
	}
	.account-btn{
		cursor: pointer;
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