<template>
	<div id="banner_container" class="swiper-container">
		<div class="swiper-wrapper">
			<div class="swiper-slide" v-for="img in imgs"
			:style="{backgroundImage: img}">
			</div>
		</div>
		<div class="swiper-pagination"></div>
	</div>
</template>
<script>
	import Swiper from '../../assets/lib/swiper.js';
	import banner1 from '../../assets/img/index/banner1.png'
	import banner2 from '../../assets/img/index/banner2.png'
	export default{
		name:'part2Banner',
		data(){
			return{
				imgs:['url('+banner1+')','url('+banner2+')']
			}
		},
		mounted(){
			this.$nextTick(()=>{
				new Swiper('#banner_container', {
			        loop:true,
			        pagination: '.swiper-pagination',
        			paginationClickable: true,
        			autoplay:5000
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
			background-position: center;
			font-size: 30px;
		}
		.swiper-pagination-bullet-active{
			background: @baseColor !important;
		}
	}
</style>