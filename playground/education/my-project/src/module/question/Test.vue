<template>
	<div>
		<iframe src="http://help.duobeiyun.com/ittest/content.html"></iframe>
	</div>
</template>
<script>
	export default{
		name:'test',
		mounted(){
			document.querySelector('.question-container').style.padding = '45px 0';
		}
	}
</script>
<style scoped lang='less'>
	iframe{
		width: 100%;
		height: 800px;
	}
</style>