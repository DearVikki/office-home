<template>
	<!--header-->
	<div class='emptyheader_container'>
		<a class="img-container" href="./index.html">
			<img src="../assets/img/index/index_logo.png" />
		</a>
	</div>
</template>
<script>
	export default{
		name:'emptyheader'
	}
</script>
<style scoped lang='less'>
	@baseColor: #d42b1e;
	@backColor: #fff7f7;
	@bla: #5c5c5c;
	.emptyheader_container{
		width: 100%;
		height: 96px;
		padding-top: 36px;
		border-bottom: 2px solid @baseColor;
		background: #fff;
	}
	.img-container{
		width: 100%;
		max-width: 1200px;
		margin:0 auto;
	}
</style>