<template>
	<div id="side_container">
		<div @click="toTop">
			<img src="~assets/img/index/side_top.png">
		</div>
		<a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=965562425&site=qq&menu=yes">
			<img src="~assets/img/index/side_qq.png">
		</a>
		<div>
			<img src="~assets/img/index/side_phone.png">
		</div>
	</div>
</template>
<script>
	import {scrollTo} from '../../assets/js/scrollTo.js';
	export default{
		name:'part12Side',
		methods:{
			//指定- speed:n秒一轮 time:一共运行n秒
			//run:一共运行次数 runLen:一次上升距离
			toTop(){
				scrollTo(0, window.scrollY);
			}
		}
	}
</script>
<style scoped lang='less'>
	#side_container{
		width: 72px;
		height: 216px;
		cursor: pointer;
		position: fixed;
		right: 0;
		top:50%;
		z-index: 1000;
	}
</style>