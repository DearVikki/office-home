<template>
	<a id="download_container">
		<a id="download_btn" href="http://a.app.qq.com/o/simple.jsp?pkgname=com.example.cxz.shadowpro">下载App</a>
	</a>
</template>
<script>
	export default{
		name:'download'
	}
</script>
<style lang='less' scoped>
	#download_container{
		position: fixed;
		width: 100%;
		height: 1.2rem;
		background: rgba(255,255,255,.85);
		font-size: .3rem;
	}
	#download_btn{
		width: 1.8rem;
		height: 0.63rem;
		line-height: .63rem;
		border:1px solid #8995ff;
		border-radius: 0.04rem;
		text-align: center;
		color: #8995ff;
		display: inline-block;
		float: right;
		margin-right: .4rem;
		margin-top: .3rem;
	}
</style>