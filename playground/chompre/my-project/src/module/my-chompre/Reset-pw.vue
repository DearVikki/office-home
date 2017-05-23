<template>
	<div id="personal_right_container">
		<step2 v-if="step === 2"
		@nextStep="step = 3"></step2>
		<step3 v-if="step === 3"
		@nextStep="step = 4"></step3>
		<success v-if="step === 4"></success>
	</div>
</template>
<script>
	import step2 from './Step2'
	import step3 from './Step3'
	import success from './Step4'
	export default{
		name:'pw',
		data(){
			return{
				step: 2
			}
		},
		components:{step2, step3, success}
	}
</script>
<style lang='less' scoped>
	#personal_right_container{
		padding:0;
		max-width: 900px;
	}
</style>