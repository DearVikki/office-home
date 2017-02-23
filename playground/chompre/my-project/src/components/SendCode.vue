<template>
	<div class="sendcode-module"
	:class="{disabled: disabled}"
	:style="style"
	@click="sendCode">{{txt}}</div>
</template>
<script>
	export default{
		name:'sendCode',
		data(){
			return{
				txt:'发送验证码',
				counting:false,
				countdown:''
			}
		},
		computed:{
			disabled(){
				return this.counting || (!this.checked && this.type===1) ? true: false;
			}
		},
		methods:{
			sendCode(){
				if(!this.before()) return;
				if(this.disabled) return;
				this.send(()=>{
					let i = 60;
					this.counting = true;
					this.countdown = setInterval(()=>{
						i--;
						this.txt = i + '秒重新发送';
						if(i===1) {
							this.txt = '重新发送';
							this.counting = false;
							clearInterval(this.countdown);
						}
					},1000)
				});
			}
		},
		watch:{
			reset(){
				this.txt = '发送验证码';
				this.counting = false;
				clearInterval(this.countdown);
			}
		},
		props:{
			before: {
				type: Function,
				default: ()=>{return true}
			},
			send: Function,
			reset:Number,
			style:Object,
			checked:{
				type: Boolean,
				default: false
			},
			type:{
				type: Number,
				default: 0
			}
		}
	}
</script>
<style scoped lang='less'>
	.sendcode-module.disabled{
		opacity: .5;
		cursor: not-allowed;
	}
</style>