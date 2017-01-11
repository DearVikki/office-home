<template>
	<div>
		<iframe src="https://xue.duobeiyun.com/" id="myframe"></iframe>
	</div>
</template>
<script>
	export default{
		name:'trialFrame',
		mounted(){
		}
	}
</script>
<style scoped lang='less'>
	div{
		height: ~'calc(100% - 53px)';
		margin-top: -30px;
	}
	iframe{
		width: 100%;
		height: 100%;
	}
</style>