<template>
	<div>
		<div>Index</div>
		<div class="swiper-container wq">
			<div class="swiper-wrapper">
				<div class="swiper-slide" v-for="i in 7">
					{{i}}
				</div>
			</div>
		</div>
		<div class="swiper-container dhc" style="margin-top:100px">
			<div class="swiper-wrapper">
				<div class="swiper-slide" v-for="i in 7">
					<div class="item">{{i}}</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import Swiper from '../../assets/swiper.js';
	export default{
		name:'index',
		mounted(){
			this.$nextTick(()=>{
				new Swiper('.wq', {
			        direction: 'vertical',
			        loop:true,
			        spaceBetween:10,
			        slidesPerView:6,
			        freeModeMomentumRatio:1,
			        freeModeMomentumVelocityRatio:1,
			        centeredSlides:true,
			        speed:10,
			        freeMode:true
			    });
			})
			this.$nextTick(()=>{
				new Swiper('.dhc', {
			        loop:true,
			        spaceBetween:20
			    });
			})
		}
	}
</script>
<style scoped>
	@import '../../assets/swiper.min.css';
	.swiper-container{
		height: 120px;
		background: pink;
	}
	.swiper-slide{
		width: 100px;
		height: 30px;
		line-height: 30px;
		text-align: center;
		background: skyblue;
	}
	.swiper-slide-active {
		background: tomato;
		font-size: 30px;
	}
	.swiper-container.wq{
		height: 300px;
	}
</style>