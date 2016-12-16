<template>
	<div class="reverse btn smart-btn text loading"
	:style="style"
	:class="{disabled:disabled}"
	@click="clickBtn">{{stage.txt}}</div>
</template>
<script>
	export default{
		name:'smartBtn',
		data(){
			return{
			}
		},
		methods:{
			clickBtn(){
				if(this.stage.type === 1) {
					return;
				} else if(this.stage.type === 2){
					return;
				}
				this.$emit('clickBtn');
			}
		},
		computed:{
			disabled(){
				if(this.stage.type === 1) return true;
				else return false;
			}
		},
		props:['stage','style']
	}
</script>
<style scoped lang='less'>
	.disabled{
		opacity: .7;
		cursor:not-allowed;
	}
</style>