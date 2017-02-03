<template>
	<div id="boom_container">
	<div id="boom_container_inner">
		<div id="boom"></div>
		<p>这个网站要炸了！快跑！</p>
	</div>
	</div>
</template>
<script>
	export default{
		name:'easterEggBoom'
	}
</script>
<style scoped lang='less'>
	#boom_container{
		position: fixed;
		width: 100%;
		height: 100%;
		top:0;
		left:0;
		background: #000;
		z-index: 999999;
		#boom_container_inner{
			text-align: center;
		}
		#boom{
			width: 729px;
			height: 320px;
			background: url(../../assets/img/index/boom.png);
			margin:100px auto;
		}
		p{
			color: #fff;
			font-size: 30px;
		}
	}
</style>