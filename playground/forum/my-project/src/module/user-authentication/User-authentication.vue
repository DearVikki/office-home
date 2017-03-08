<template>
	<div>
		<div class="c-line" v-for="f in fields">
			<input :placeholder="f.placeholder"
			v-model="f.val"
			@change="handleValidate(f.val)">
		</div>
		<div class="c-line" id="code">
			<input :placeholder="code.placeholder" class="fl"
			v-model="code.val">
			<div id="send_code" class="fr"
			:class="{disabled:!handleValidate(fields[2])}"
			@click="sendCode">{{code.txt}}</div>
		</div>
		<div class="c-big-btn" :class="{disabled:!allCheck}">
			<sendCode :before=""></sendCode>
		</div>
	</div>
</template>
<script>
	import sendCode from '../../components/SendCode.vue'
	export default{
		name:'authentication',
		data(){
			return{
				fields:[{
					id:'name',
					placeholder:'请输入姓名',
					val:'',
					validators:{required:{msg:''}}
				},{
					id:'cardNo',
					placeholder:'请输入学号/教职工号',
					val:'',
					validators:{required:{msg:''}}
				},{
					id:'name',
					placeholder:'请输入手机号码',
					val:'',
					validators:{required:{msg:''},isPhone:{msg:''}}
				}],
				code:{
					id:'code',
					placeholder:'请输入短信验证码',
					val:'',
					validators:{required:{msg:''}},
					txt:'获取验证码'
				}
			}
		},
		methods:{
		},
		computed:{

			sendCode(){

			},
			allCheck(){
				let allCheck = true;
				this.fields.forEach((f)=>{
					if(!this.handleValidate(f)) allCheck = false;
				})
				 if(!this.handleValidate(this.code)) allCheck = false;
				 return allCheck;
			}
		},
		components:{sendCode}
	}
</script>
<style lang='less' scoped>
	.c-line{
		line-height: auto;
	}
	input{
		width: 50%;
		height: 0.43rem;
		font-size: 0.4rem;
		color:#4c4c4c;
		margin-top: 0.37rem;
	}
	#code{
		margin-top: 0.27rem;
		margin-bottom: 0.8rem;
	}
	#send_code{
		border:1px solid #deb400;
		border-radius:0.08rem;
		width:2.11rem;
		height:0.61rem;
		line-height:0.61rem;
		text-align:center;
		font-size: 0.32rem;
		color:#f9c13a;
		margin-top: 0.35rem;
		&.disabled{
			opacity:.5;
		}
	}
</style>