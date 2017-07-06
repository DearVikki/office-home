<template>
	<!--包住form表单的-->
	<div id='form_wrapper' style="font-size:20px">
		<div class="common-field" v-for="field in fields" :class="field.class">
			<label :for="field.id">{{field.name}}</label>
			<div class="input-container" :class="{ warn: field.error || field.focus}">
				<input :id="field.id"
				type="password"
				:placeholder="field.placeholder"
				@blur="fieldBlur(field)"
				@focus="fieldFocus(field)"
				v-model="field.val">
			</div>
			<p class="error" v-if="field.error && !field.focus">{{field.msg}}</p>
		</div>
		<div class="account-btn" @click="setPW">{{lang.NEXT_STEP}}</div>
	</div>
</template>
<script>
	import {getParameterByName,timestamp,myAlert} from '../../assets/js/utils.js';
	import lang from '../../assets/js/language.js';
	export default{
		name:'Vali',
		mounted(){
			if(!localStorage.getItem('email')) this.$router.push('/step1');
		},
		data(){
			return{
				fields:[{
		            id: 'pw',
		            class: 'pw-field',
		            name: lang.PW,
		            placeholder: lang.FILL_IN_PW,
		            error: '',
		            val:'',
		            validators: {
		            	required: {
		            		msg: lang.NO_EMPTY_PW
		            	},
		            	minlen: {
		            		msg: lang.PW_MIN_6,
		            		extra: { len: 6 }
		            	},
		            	maxlen: {
		            		msg: lang.PW_MAX_20,
		            		extra: { len: 20 }
		            	}
		            }
		          }, {
		            id: 'repw',
		            class: 'repw-field',
		            name: lang.REAPEAT_PW,
		            placeholder: lang.FILL_IN_PW_AGAIN,
		            error: '',
		            val:'',
		            validators: {
		            	required: { msg: lang. NO_EMPTY_REPEAT_PW},
		            	equalTo: {
		            		msg: lang.NOT_SAME_PW,
		            		extra: { to: 0 }
		            	}
		            }
		          }],
		         lang: lang
			}
		},
		methods:{
			equalTo(val, extra) {
				return val === this.fields[extra.to].val;
			},
			setPW(){
				if(!this.checkAll(this.fields)) return;
				this.$http.post('',{
					name: 'zl.shopping.sys.forget.pwd',
					mail:  localStorage.getItem('email'),
					password: this.fields[0].val
				}).then((response) => {
					if(response.body.code === 1000){
						myAlert(lang.RESET_PW_SUCCESS, () => {
							localStorage.removeItem('email');
							location.href = ('./login.html');
						})
					}
					else alert(response.body.msg);
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
	    margin-top: 45px;
	    margin-bottom: 40px;
	    width:100%;
	    min-width: 300px;
	}
	.common-field{
		margin: 6px auto;
	}
</style>