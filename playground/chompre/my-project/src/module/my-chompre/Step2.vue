<template>
	<!--包住form表单的-->
	<div id='form_wrapper' style="font-size:20px">
		<!--选择问题/邮箱找回密码-->
		<div id='method_header'>
			<div :class="{active: !emailActive, disabled: qDisabled}" @click="clickQ">{{lang.FIND_PW_VIA_QUESTION}}</div>
			<div :class="{active: emailActive}" @click="emailActive = true">{{lang.FIND_PW_VIA_MAIL}}</div>
		</div>
		<!--问题找回密码-->
		<div id='q_body' v-show='!emailActive'>
				<div class="common-field" v-for="field in fieldsA" :class="field.class">
					<label :for="field.id">{{field.name}}</label>
					<div class="input-container" :class="{ warn: field.error || field.focus}">								<input
							type="text"
							:id="field.id"
							:placeholder="field.placeholder"
							@blur="fieldBlur(field)"
							@focus="fieldFocus(field)"
							v-model="field.val"
							v-if="field.id === 'answer'">
							<p class="grey20" v-else>{{field.val}}</p>
					</div>
					<p class="error" v-if="field.error && !field.focus">{{field.msg}}</p>
				</div>
		</div>
		<!--邮箱找回密码-->
		<div id='e_body' v-show='emailActive'>
				<div class="common-field" v-for="field in fieldsB" :class="field.class">
					<label :for="field.id">{{field.name}}</label>
					<div class="input-container" :class="{ warn: field.error || field.focus}">
							<input
							type="text"
							:id="field.id"
							:placeholder="field.placeholder"
							@blur="fieldBlur(field)"
							@focus="fieldFocus(field)"
							v-model="field.val" />
					</div>
					<p class="send-code"
					:class="{disabled: scDisabled}"
					v-if="field.id === 'email'"
					@click='sendCode'>{{countdown}}</p>
					<p class="error" v-if="field.error && !field.focus">{{field.msg}}</p>
				</div>
		</div>
		<div class="account-btn" @click="nextStep">{{lang.NEXT_STEP}}</div>
	</div>
</template>
<script>
	import lang from '../../assets/js/language.js'
	export default{
		name: 'step2',
		data(){
			return{
				emailActive: true,
				qDisabled: true,
				question_id:'',
				scDisabled: false,
				countdown: lang.SEND_CODE,
				fieldsA:{
					question: {
			            id: 'question',
			            class: 'question-field',
			            validators: {
			            	required: { msg:'' }
			            },
			            name: lang.QUESTION,
			            val:'你好吗'
			        },
					answer: {
			            id: 'answer',
			            class: 'answer-field',
			            name: lang.ANSWER,
			            placeholder: '',
			            validators: {
			            	required: { msg: lang.NO_EMPTY_ANSWER }
			            },
			            error: false,
			            msg:'',
			            val:'',
			            focus: false
			        }
				},
			    fieldsB: {
			    	email:{
			    	  id: 'email',
			          class: 'email-field',
			          name: lang.ACCOUNT,
			          placeholder: '',
			          validators: {
			          	required: { msg: lang.NO_EMPTY_MAIL },
			          	isEmail: { msg: lang.INVALID_MAIL }
			          },
			          error: '',
			          msg:'',
			          val:'',
			          focus: false
			    	},
			    	code:{
			    	  id: 'code',
			          class: 'code-field',
			          name: lang.CODE,
			          placeholder: '',
			          validators: {
			          	required: { msg: lang.NO_EMPTY_CODE}
			          },
			          error: '',
			          msg:'',
			          val:'',
			          focus: false
			    	}
			    },
		      lang:lang
			}
		},
		mounted(){
			this.$http.post('',{
				name:'zl.shopping.sys.pc.user.question',
				account: JSON.parse(localStorage.getItem('userInfo')).mail
			}).then((response) => {
				if(response.body.code === 1000) {
					this.qDisabled = false;
					this.fieldsA.question.val = response.body.data.question;
					this.question_id = response.body.data.question_id;
				}
			})
		},
		methods: {
			//点击问题找回密码
			clickQ(){
				if(this.qDisabled) return;
				this.emailActive = false;
			},
			sendCode(){
				if(this.scDisabled) return;
				if(!this.fieldsB.email.val) {
					this.fieldsB.email.msg = lang.NO_EMPTY_MAIL;
					this.fieldsB.email.error = true;
					return;
				} else if(this.fieldsB.email.val !== JSON.parse(localStorage.getItem('userInfo')).mail) {
					this.fieldsB.email.msg = lang.UNREGISTERED_MAIL;
					this.fieldsB.email.error = true;
					return;
				}
				this.$http.post('',{name:'zl.shopping.sys.forget.sms.send',mail:this.fieldsB.email.val}).then((response)=>{
					if(response.body.code === 1000) {
						let t = 60;
						this.countdown = t+'s'+lang.RESEND;
						let cd = setInterval(() => {
							t--;
							this.countdown = t+'s'+lang.RESEND;
							this.scDisabled = true;
							if(t <= 1){
								clearInterval(cd);
								this.scDisabled = false;
								this.countdown = lang.RESEND;
							}
						},1000)
					} else {
						this.fieldsB.email.msg = response.body.msg;
						this.fieldsB.email.error = true;
					}
				})
			},
			nextStep(){
				if(this.emailActive){
					// 邮箱找回密码
					if(!this.fieldsB.code.val) {
						this.fieldsB.code.msg = lang.NO_EMPTY_CODE;
						this.fieldsB.code.error = true;
						return;
					}
					this.$http.post('',{
						name:'zl.shopping.sys.forget.sms.confirm',
						mail: this.fieldsB.email.val,
						code: this.fieldsB.code.val
					}).then((response) => {
						if(response.body.code === 1000) this.$emit('nextStep');
						else {
							this.fieldsB.code.msg = response.body.msg;
							this.fieldsB.code.error = true;
						}
					})
				} else {
					// 问题找回密码
					if(!this.fieldsA.answer.val) {
						this.fieldsA.answer.msg = lang.NO_EMPTY_ANSWER;
						this.fieldsA.answer.error = true;
						return;
					}
					this.$http.post('',{
						name:'zl.shopping.pc.check.question',
						mail:localStorage.getItem('email'),
						register_question_id:this.question_id,
						answer:this.fieldsA.answer.val
					}).then((response) => {
						if(response.body.code === 1000) this.$emit('nextStep');
						else {
							this.fieldsA.answer.msg = response.body.msg;
							this.fieldsA.answer.error = true;
						}
					})

				}
			}
		}
	}
</script>
<style scoped lang='less'>
	@baseColor: #d42b1e;
	#form_wrapper{
		font-size: 20px;
	    display: inline-block;
	    margin-bottom: 40px;
	    width:100%;
	    min-width: 300px;
	    text-align: center;
	}
	#method_header{
		width: 100%;
		border-bottom: 1px solid #d3d3d3;
		overflow: hidden;
		div{
			font-size: 24px;
			color: @baseColor;
			text-align: center;
			float: left;
			width: 50%;
			height: 60px;
			line-height: 60px;
			cursor: pointer;
			&.active{
				color: #fff;
				background: @baseColor;
			}
			&.disabled{
				opacity: .5;
				cursor:normal;
			}
		}
	}
	#q_body{
		max-width: 355px;
    	margin: 46px auto 0 auto;
	}
	#e_body{
		max-width: 355px;
    	margin: 45px 180px 0;
    	display: relative;
    	.send-code{
    		color: @baseColor;
    		cursor: pointer;
    		&.disabled{
    			opacity: .5;
    			cursor: default;
    		}
    	}
	}
	.common-field{
		display: inline-block;
	}
	@media all and (min-width: 570px){
		.send-code{
    		position: absolute;
		    right: -130px;
		    bottom: 20px;
    	}
	}
	/*@media all and (max-width: 570px){
		.send-code{
    		position: absolute;
		    right: -130px;
		    bottom: 20px;
    	}
	}*/
</style>