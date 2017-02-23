<template>
	<div class="reverse btn smart-btn text loading"
	:style="style"
	:class="{disabled:!stage[currentStage].active}"
	@click="clickBtn">{{stage[currentStage].txt}}</div>
</template>
<script>
	export default{
		name:'smartBtn',
		data(){
			return{
				firstStage:'',
				lastStage:''
			}
		},
		mounted(){
			//console.log(this.stage);

		},
		methods:{
			clickBtn(){
				if(this.stage[this.currentStage].disabled) {
					return;
				}
				this.$emit('clickBtn');
			}
		},
		watch:{
			currentStage(){
				//console.log(this.currentStage)
				if(this.stage[this.currentStage].lastStage){
					setTimeout(()=>{
						this.$emit('returnToFirstStage');
						// this.currentStage = 0;
					},1000)
				}
			}
		},
		props:['stage','style','currentStage']
	}
</script>
<style scoped lang='less'>
	.disabled{
		opacity: .7;
		cursor:not-allowed;
	}
</style>