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
		<div class="account-btn" @click="setPW">下一步</div>
	</div>
</template>
<script>
	import {getParameterByName,timestamp,myAlert} from '../../assets/js/utils.js';
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
		            name: 'Contraseña',
		            placeholder: '输入6-20位密码',
		            error: '',
		            val:'',
		            validators: {
		            	required: {
		            		msg: '密码不能为空'
		            	},
		            	minlen: {
		            		msg: '密码长度最短为6位',
		            		extra: { len: 6 }
		            	},
		            	maxlen: {
		            		msg: '密码长度最长为20位',
		            		extra: { len: 20 }
		            	}
		            }
		          }, {
		            id: 'repw',
		            class: 'repw-field',
		            name: '重复密码',
		            placeholder: '请再次输入6-20位密码',
		            error: '',
		            val:'',
		            validators: {
		            	required: { msg: '重复密码不能为空' },
		            	equalTo: {
		            		msg: '两次密码输入不一致',
		            		extra: { to: 0 }
		            	}
		            }
		          }]
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
						myAlert('重置密码成功', () => {
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