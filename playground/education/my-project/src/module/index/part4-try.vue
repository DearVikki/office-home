<template>
	<div id="try_container">
		<div id="try">
			<div id="try_btn"></div>
			<div class="hand"
			:class="{animated:active, tada:active}"
			@mouseenter="addClass"
			@mouseleave="removeClass"></div>
		</div>
	</div>
</template>
<script>
	export default{
		name:'part4Try',
		data(){
			return{
				active:false
			}
		},
		methods:{
			addClass(){
				this.active = true;
			},
			removeClass(){
				this.active = false;
			}
		}
	}
</script>
<style scoped lang='less'>
	#try_container{
		width: 100%;
		height: 500px;
		position: relative;
		background: url(../../assets/img/index/banner12.png) center no-repeat;
		#try{
			position: absolute;
			right: 30%;
			bottom: 130px;
			cursor: pointer;
			#try_btn{
				width: 136px;
				height: 42px;
				background: url(../../assets/img/index/try.png) no-repeat;
				position: absolute;
				top: 0;
				left: 0;
			}
			.hand{
				width: 123px;
				height: 117px;
				background: url(../../assets/img/index/hand.png) no-repeat;
				top: 20px;
				left: 100px;
				position: absolute;
				z-index: 2;
			}
		}
	}
</style>