<template>
	<div id="side_container">
		<div class="side-item" @click="toTop">
			<img src="~assets/img/index/side_top.png">
		</div>
		<a class="side-item" target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=2291908972&site=qq&menu=yes">
			<img class="rotate" src="~assets/img/index/side_qq.png">
		</a>
		<div class="side-item">
			<img class="rotate" src="~assets/img/index/side_code.png" style="width:30px">
			<div id="side_code_container">
				<img src="~assets/img/index/code1.png">
				<img src="~assets/img/index/code2.png">
			</div>
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
		top:40%;
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
			&:nth-child(2):hover .rotate,&:nth-child(3):hover .rotate{
				transform: rotate(-30deg);
			}
			&:nth-child(3):hover #side_code_container{
				display: flex;
			}
		}
		/*后面补充的二维码*/
		#side_code_container{
			position: absolute;
			left: -100px;
			width: 100px;
			background: rgba(160, 160, 160, 0.4);
			display: none;
			height: 200px;
			justify-content: space-around;
			flex-direction: column;
			img{
				width: 90px;
			}
		}
	}
</style>