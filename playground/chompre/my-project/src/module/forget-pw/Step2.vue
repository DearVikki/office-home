<template>
	<!--包住form表单的-->
	<div id='form_wrapper' style="font-size:20px">
		<!--选择问题/邮箱找回密码-->
		<div id='method_header'>
			<div :class="{active: !emailActive, disabled: qDisabled}" @click="clickQ">问题找回密码</div>
			<div :class="{active: emailActive}" @click="emailActive = true">邮箱找回密码</div>
		</div>
		<!--问题找回密码-->
		<div id='q_body' v-show='!emailActive'>
			<validation name="validation1">
				<div class="common-field" v-for="(value, field) in fieldsA" :class="fieldsA[field].class">
					<label :for="fieldsA[field].id">{{fieldsA[field].name}}</label>
					<div class="input-container" :class="{ warn: fieldsA[field].error || fieldsA[field].focus}">
						<validity
						:ref='fieldsA[field].id'
						:field='fieldsA[field].id'
						:validators="fieldsA[field].validator">
							<input
							type="text"
							:id="fieldsA[field].id"
							:placeholder="fieldsA[field].placeholder"
							@blur="handleValidate(fieldsA[field].id)"
							@focus="focusing(fieldsA[field].id)"
							v-model="fieldsA[field].val"
							v-if="fieldsA[field].id === 'answer'">
							<p class="grey20" v-else>{{fieldsA[field].val}}</p>
						</validity>
					</div>
					<p class="error" v-if="fieldsA[field].error && !fieldsA[field].focus">{{fieldsA[field].msg}}</p>
				</div>
		   </validation>
		</div>
		<!--邮箱找回密码-->
		<div id='e_body' v-if='emailActive'>
		 	<validation name="validation2">
				<div class="common-field" v-for="(value, field) in fieldsB" :class="fieldsB[field].class">
					<label :for="fieldsB[field].id">{{fieldsB[field].name}}</label>
					<div class="input-container" :class="{ warn: fieldsB[field].error || fieldsB[field].focus}">
						<validity
						:ref='fieldsB[field].id'
						:field='fieldsB[field].id'
						:validators="fieldsB[field].validator">
							<input
							type="text"
							:id="fieldsB[field].id"
							:placeholder="fieldsB[field].placeholder"
							@blur="handleValidate(fieldsB[field].id)"
							@focus="focusing(fieldsB[field].id)"
							v-model="fieldsB[field].val" />
						</validity>
					</div>
					<p class="send-code" :class="{disabled: scDisabled}" v-if="fieldsB[field].id === 'email'" @click='sendCode'>{{countdown}}</p>
					<p class="error" v-if="fieldsB[field].error && !fieldsB[field].focus">{{fieldsB[field].msg}}</p>
				</div>
			</validation>
		</div>
		<div class="account-btn">下一步</div>
	</div>
</template>
<script>
    import a from 'vue-validator';
	export default{
		name: 'step1',
		data(){
			return{
				emailActive: true,
				qDisabled: false,
				scDisabled: false,
				countdown: '发送验证码',
				fieldsA: {
					question: {
		            id: 'question',
		            class: 'question-field',
		            validator: {required: true},
		            name: '问题',
		            val:'你好吗'
		         },
				answer: {
		            id: 'answer',
		            class: 'answer-field',
		            name: '答案',
		            placeholder: '',
		            validator: {required: true},
		            error: '',
		            msg:'',
		            val:'',
		            focus: false
		        }
		      },
		      fieldsB: {
		      	email:{
		      		id: 'email',
		            class: 'email-field',
		            name: '邮箱',
		            placeholder: '',
		            validator: {required: true, isEmail:true},
		            error: '',
		            msg:'',
		            val:'',
		            focus: false
		      	},
		      	code:{
		      		id: 'code',
		            class: 'code-field',
		            name: '验证码',
		            placeholder: '',
		            validator: {required: true},
		            error: '',
		            msg:'',
		            val:'',
		            focus: false
		      	}
		      }
			}
		},
		validators:{
			isEmail(val){
				return /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(val);
			}
		},
		watch:{
			$validation(){
				var va1 = this.$validation.validation1;
				var va2 = this.$validation.validation2;
				try{
					if(va1.answer.invalid){
						this.fieldsA.answer.error = true;
						this.fieldsA.answer.msg = '答案不能为空';
					} else {
						this.fieldsA.answer.error = false;
					}
					if(va2.email.invalid){
						this.fieldsB.email.error = true;
						var err0 = va2.email.errors[0].validator;
						if(err0 === 'required') this.fieldsB.email.msg = '邮箱不能为空';
						else this.fieldsB.email.msg = '邮箱不合法';
					} else {
						this.fieldsB.email.error = false;
					}
					if(va2.code.invalid){
						this.fieldsB.code.error = true;
						this.fieldsB.code.msg = '验证码不能为空';
					} else {
						this.fieldsA.code.error = false;
					}
				} catch(e){}
			}
		},
		mounted(){
			console.log('mounted')
			/*setTimeout(function() {
				location.reload();
			},100)*/
			//countdown({text: '.send-code', time:60});
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
			//点击问题找回密码
			clickQ(){
				if(this.qDisabled) return;
				this.emailActive = false;
			},
			sendCode(){
				var i = 2;
				if(this.scDisabled) return;
				this.$refs.email[0].validate(()=>{
					i--;
					//if(this.$validation.validation2.email.invalid || i > 0) return;
					if(i>0) return;
					let t = 60;
					let cd = setTimeout(() => {
						console.log(t)
						t--;
						this.countdown = t;
						this.scDisabled = true;
						if(t <= 1){
							console.log('hey')
							clearTimeout(cd);
							this.scDisabled = false;
						}
					},1000)
				})
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
    	margin: 45px 80px 0;
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