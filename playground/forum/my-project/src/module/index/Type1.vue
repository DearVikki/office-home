<template>
	<div id="typ1_container">
		<div id="type1_banner" class="swiper-container">
			<div class="swiper-wrapper">
               <a class='swiper-slide' v-for="b in banners">
               		<img :src="b.path">
               </a>
          	</div>
          	<div class="swiper-pagination"></div>
		</div>
	</div>
</template>
<script>
	import Swiper from '../../assets/lib/swiper.js';
	import test1 from '../../assets/img/index/test1.png'
	import test2 from '../../assets/img/index/test2.png'
	import test3 from '../../assets/img/index/test3.png'
	export default{
		name:'type1',
		data(){
			return{
				banners:[{
					path: test1
				},{
					path: test2
				},{
					path: test3
				}]
			}
		},
		mounted(){
			// 初始化banner板块
			this.$nextTick(()=>{
				  new Swiper('#type1_banner',{
			          pagination: '#type1_banner .swiper-pagination',
			          slidesPerView: 1,
			          paginationClickable:false,
			          autoplay: 5000,
			          loop:true
			          /*paginationBulletRender: function (swiper, index, clssName) {
					      return '<span class="' + className + '">' + (index + 1) + '</span>';
					  }*/
			      })
			})
		}
	}
</script>
<style scoped lang='less'>
	@import '../../assets/lib/swiper.min.css';
	#type1_banner{
		width: 100%;
		height: 3.73rem;
	}
</style>