<template>
	<!--包住form表单的-->
	<div id='form_wrapper' style="font-size:20px">
		<!--选择问题/邮箱找回密码-->
		<div id='method_header'>
			<div :class="{active: !emailActive, disabled: qDisabled}" @click="clickQ">问题找回密码</div>
			<div :class="{active: emailActive}" @click="emailActive = true">邮箱找回密码</div>
		</div>
		<!--问题找回密码-->
		<div id='q_body' v-if='!emailActive'>
			 
				<div class="common-field account">
					<label for="answer">问题</label>
					<div class="input-container">
						<p class="grey20">{{question}}</p>
					</div>
				</div>
				<div class="common-field account">
					<label for="answer">答案</label>
					<div class="input-container">
						<validity field="answer" validators="{required: true}">
							<input id="answer" type="text" @input="handleValidate">
						</validity>
					</div>
					<p class="error" v-if="xx">xxx</p>
				</div>
		 
		</div>
		<!--邮箱找回密码-->
		<div id='e_body' v-if='emailActive'>
		 
				<div class="common-field account">
					<label for="email">邮箱</label>
					<div class="input-container">
						<validity field="email" validators="{required: true}">
							<input id="email" type="text" @input="handleValidate">
						</validity>
					</div>
					<p class="send-code" :class='{disabled: scDisabled}'>发送验证码</p>
					<p class="error" v-if="xx">xxx</p>
				</div>
				<div class="common-field account">
					<label for="code">验证码</label>
					<div class="input-container">
						<validity field="code" validators="{required: true}">
							<input id="code" type="text" @input="handleValidate">
						</validity>
					</div>
					<p class="error" v-if="xx">xxx</p>
				</div>
			 
		</div>
		<div class="account-btn">下一步</div>
	</div>
</template>
<script>
    import a from 'vue-validator';
    import countdown from '../../assets/js/countdown.js'
	export default{
		name: 'step1',
		data(){
			return{
				emailActive: true,
				qDisabled: false,
				scDisabled: true,
				question:'你喜欢什么颜色',
				xx: false
			}
		},
		mounted(){
			countdown({text: '.send-code', time:60});
		},
		methods: {
			handleValidate: function (e) {
				e.target.$validity.validate()
			},
			clickQ(){
				if(this.qDisabled) return;
				this.emailActive = false;
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