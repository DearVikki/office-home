<template>
	<div id="try_container">
		<div id="try">
			<div id="try_btn" @click="pop.show = true"></div>
			<div class="hand"
			:class="{animated:active, tada:active}"
			@mouseenter="addClass"
			@mouseleave="removeClass">
				<img class="star" src="~assets/img/index/star1.png">
				<img class="star" src="~assets/img/index/star1.png">
				<img class="star" src="~assets/img/index/star1.png">
			</div>
		</div>
		<!-- 视频弹窗 -->
		<pop :pop="pop">
			<video src="http://www.hzchuangxiangzhe.cn/php/upload/video/video_example.mp4" controls="controls" preload="preload"></video>
		</pop>
	</div>
</template>
<script>
	import pop from '../../components/Pop.vue';
	export default{
		name:'part4Try',
		data(){
			return{
				active:true,
				pop:{
					show:false,
					style:{
						padding:0,
						width:'80%',
						maxWidth:'800px',
					}
				}
			}
		},
		methods:{
			addClass(){
				this.active = true;
			},
			removeClass(){
				this.active = false;
			}
		},
		components:{pop}
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
				.star{
    				position: absolute;
    				animation: shine 2s infinite;
    				&:nth-of-type(1){
    					top: 0;
    					right: 25px;
    				}
    				&:nth-of-type(2){
    					top: -10px;
    					right: 40px;
    				}
    				&:nth-of-type(3){
	    				bottom: 15px;
    					left: 5px;
    				}
    			}
			}
		}
	}
	video{
		margin:0 auto;
		width: 100%;
	}
</style>