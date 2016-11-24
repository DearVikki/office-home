<template>
	<!--包住form表单的-->
	<div id='form_wrapper' style="font-size:20px">
		<validation name="validation1">
			<div class="common-field account-field">
				<label for="account">账号</label>
				<div class="input-container" :class="{warn: account.error || account.focus}">
					<validity ref="account" field="account" :validators="{required:true}">
						<input
						id="account"
						type="text"
						placeholder="请输入邮箱或者身份证号"
						v-model="account.val"
						@blur="handleValidate"
						@focus="focusing">
					</validity>
				</div>
				<p class="error" v-if="account.error && !account.focus">{{account.msg}}</p>
			</div>
			<!--<pre style="font-size:12px">{{$validation}}</pre>-->
		</validation>
		<div class="account-btn" @click="nextStep">下一步</div>
	</div>
</template>
<script>
    import a from 'vue-validator';
	export default{
		name: 'step1',
		data(){
			return{
				account:{
					id: 'account',
					error: false,
					focus: false,
					msg: '账号不能为空',
					val:''
				}
			}
		},
		watch:{
			$validation(){
				var va1 = this.$validation.validation1;
				try{
					if(va1.account.invalid){
						this.account.error = true;
					} else{
						this.account.error = false;
					}
				}catch(e){}
			}
		},
		methods: {
			handleValidate() {
				this.$refs.account.validate();
				this.account.focus = false;
			},
			focusing(){
				this.account.focus = true;
			},
			nextStep(){
				this.$refs.account.validate(()=>{
					if(!this.$validation.validation1.valid) return;
					this.$http.post('',{name:'zl.shopping.sys.pc.user.question',account:this.account.val}).then((response)=>{
						if(response.body.code === 1000) this.$router.push({path: 'Step2'});
						else{
							this.account.error = true;
							this.account.msg = response.body.msg;
						}
					})
				});
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
	    width: 100%;
	    max-width: 355px;
	}
</style>