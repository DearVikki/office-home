<template>
	<!--包住form表单的-->
	<div id='form_wrapper' style="font-size:20px">
		<div id='method_header'>
			<div :class="{active: !emailActive, disabled: qDisabled}" @click="clickQ">问题找回密码</div>
			<div :class="{active: emailActive}" @click="emailActive = true">邮箱找回密码</div>
		</div>
		<div id='q_body' v-if='!emailActive'><div class="common-field account">
				<label for="answer">问题</label>
				<div class="input-container">
					<div>你喜欢什么颜色</div>
				</div>
				<p class="error" v-if="accountRequire">xxx</p>
			</div>
			<div class="common-field account">
				<label for="answer">答案</label>
				<div class="input-container">
					<validity field="answer" validators="{required: true}">
						<input id="answer" type="text" @input="handleValidate">
					</validity>
				</div>
				<p class="error" v-if="accountRequire">xxx</p>
			</div>
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
				qDisabled: false
			}
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
	}
	#method_header{
		width: 100%;
		border-bottom: 1px solid #d3d3d3;
		div{
			font-size: 24px;
			color: @baseColor;
			text-align: center;
			display: inline-block;
			width: 49.5%;
			height: 60px;
			line-height: 60px;
			cursor: pointer;
			&.active{
				color: #fff;
				background: @baseColor;
			}
			&.disabled{
				opacity: .5;
				cursor:not-allowed;
			}
		}
	}
	.common-field{
		display: inline-block;
	}
</style>