<template>
	<div class="empty-container">
		暂无更多结果
	</div>
</template>
<script>
	export default{
		name: 'empty'
	}
</script>
<style lang='less' scoped>
	.empty-container{
		font-size: 24px;
		color: #ccc;
		position: absolute;
		top: 250px;
		left: 50%;
		transform: translate3d(-50%, 0, 0);
	}
</style>