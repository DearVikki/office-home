<template>
	<div id="change_avatar">
		<div id="avatar_container">
			<div class="btn" id="upload">本地上传</div>
			<div id="img_holder"></div>
		</div>
	</div>
</template>
<script>
	export default{
		name:'change-avatar'
	}
</script>
<style scoped lang='less'>
	#change_avatar{
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 1000;
		background: rgba(0,0,0,0.2);
	}
	#avatar_container{
		width: 480px;
		height: 360px;
		background: #fff;
		margin: 80px auto;
		padding-top: .1px;
		#upload{
			width: 80px;
			height: 26px;
			line-height: 26px;
			margin: 24px;
		}
		#img_holder{
			width: 240px;
			height: 180px;
			background: skyblue;
			margin:20px auto;
		}
	}
</style>