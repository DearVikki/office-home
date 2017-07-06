<template>
	<!--包住form表单的-->
	<div id='form_wrapper' style="font-size:20px">
			<div class="common-field account-field">
				<label for="account">{{lang.USER}}</label>
				<div class="input-container" :class="{warn: account.error || account.focus}">
						<input
						id="account"
						type="text"
						:placeholder="lang.FILL_IN_ACCOUNT"
						v-model="account.val"
						@blur="fieldBlur(account)"
						@focus="fieldFocus(account)">
				</div>
				<p class="error" v-if="account.error && !account.focus">{{account.msg}}</p>
			</div>
		<div class="account-btn" @click="nextStep">{{lang.NEXT_STEP}}</div>
	</div>
</template>
<script>
	import lang from '../../assets/js/language.js';
	export default{
		name: 'step1',
		data(){
			return{
				account:{
					id: 'account',
					error: false,
					focus: false,
					val:'',
					validators: {
						required: { msg: lang.NO_EMPTY_ACCOUNT_TIP }
					}
				},
				lang: lang
			}
		},
		methods: {
			nextStep(){
				if(!this.handleValidate(this.account)) return;
				this.$http.post('',{
					name:'zl.shopping.sys.pc.user.question',
					account:this.account.val
				}).then((response)=>{
					if(response.body.code === 1000) {
						localStorage.setItem('email', this.account.val);
						this.$router.push({path: 'Step2'});
					}
					else{
						this.account.error = true;
						this.account.msg = response.body.msg;
					}
				})
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