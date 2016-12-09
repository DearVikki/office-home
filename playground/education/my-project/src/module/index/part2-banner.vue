<template>
	<div id="banner_container" class="swiper-container">
		<div class="swiper-wrapper">
			<div class="swiper-slide" v-for="i in 4">
			</div>
		</div>
		<div class="swiper-pagination"></div>
	</div>
</template>
<script>
	import Swiper from '../../assets/lib/swiper.js';
	export default{
		name:'part2Banner',
		mounted(){
			this.$nextTick(()=>{
				new Swiper('.swiper-container', {
			        loop:true,
			        pagination: '.swiper-pagination',
        			paginationClickable: true
			    });
			})
		}
	}
</script>
<style scoped lang='less'>
	@import '../../assets/lib/swiper.min.css';
	@baseColor: #55b7f8;
	#banner_container{
		width: 100%;
		height: 487px;
		.swiper-slide{
			background: url(../../assets/img/index/banner1.png) center;
			font-size: 30px;
		}
		.swiper-pagination-bullet-active{
			background: @baseColor !important;
		}
	}
</style>