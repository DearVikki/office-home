<template>
	<div @click="toTop"></div>
</template>
<script>
	export default{
		name:'icon-top',
		methods:{
			toTop(){
				window.scrollTo(0,0);
			}
		}
	}
</script>
<style scoped>
	div{
		width: 48px;
		height: 48px;
		position: fixed;
		bottom: 100px;
		left: 50%;
		margin-left: 700px;
		background: url(../assets/img/index/icon_top.png);
		cursor: pointer;
		z-index: 5;
	}
</style>