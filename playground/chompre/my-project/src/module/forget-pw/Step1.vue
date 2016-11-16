<template>
	<!--包住form表单的-->
	<div id='form_wrapper' style="font-size:20px">
		<validation name="validation1">
			<div class="common-field account">
				<label for="account">账号</label>
				<div class="input-container">
					<validity field="account" validators="{required: true}">
						<input id="account" type="text" @input="handleValidate" placeholder="请输入邮箱或者身份证号">
					</validity>
				</div>
				<p class="error" v-if="accountRequire">xxx</p>
			</div>
			<!--<pre style="font-size:12px">{{$validation}}</pre>-->
		</validation>
		<div class="account-btn">下一步</div>
	</div>
</template>
<script>
    import a from 'vue-validator';
	export default{
		name: 'step1',
		data(){
			return{

			}
		},
		computed: a.mapValidation({
			accountRequire: '$validation.validation1.account.required'
		}),
		methods: {
			handleValidate: function (e) {
				e.target.$validity.validate()
			}
		}
	}
</script>
<style scoped lang='less'>
	#forget_container{
		max-width: 726px;
		width: 100%;
	}
	#form_wrapper{
		font-size: 20px;
	    display: inline-block;
	    margin: 40px auto;
	}
</style>