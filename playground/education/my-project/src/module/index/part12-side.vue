<template>
	<div id="side_container">
		<div class="side-item" @click="toTop">
			<img src="~assets/img/index/side_top.png">
		</div>
		<a class="side-item" target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=965562425&site=qq&menu=yes">
			<img src="~assets/img/index/side_qq.png">
		</a>
		<div class="side-item">
			<img src="~assets/img/index/side_phone.png">
		</div>
	</div>
</template>
<script>
	import {scrollTo} from '../../assets/js/scrollTo.js';
	export default{
		name:'part12Side',
		methods:{
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
		.side-item{
			display: flex;
			width: 72px;
			height: 72px;
			position: relative;
			img{
				margin:auto;
			}
			&:nth-child(1) img{
				position: absolute;
				bottom: 0;
				left: 0;
			}
			&:nth-child(2),&:nth-child(3){
				background: rgba(160,160,160,.4);
			}
			&:nth-child(2):hover img,&:nth-child(3):hover img{
				transform: rotate(-30deg);
			}
		}
	}
</style>