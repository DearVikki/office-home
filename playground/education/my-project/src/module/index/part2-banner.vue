<template>
	<div id="banner_container" class="swiper-container">
		<div class="swiper-wrapper">
			<div class="swiper-slide" v-for="img in imgs"
			v-if="!easterEggPost"
			:style="{backgroundImage: img}">
			</div>
			<div class="swiper-slide easter-egg" v-for="easterEgg in easterEggs"
			v-if="easterEggPost">{{easterEgg}}
			</div>
		</div>
		<div v-if="!easterEggPost" class="swiper-pagination"></div>
	</div>

</template>
<script>
	import Swiper from '../../assets/lib/swiper.js';
	import banner1 from '../../assets/img/index/banner1.png'
	import banner2 from '../../assets/img/index/banner2.png'
	import test1 from '../../assets/img/index/rocket.png'
	import test2 from '../../assets/img/index/post.jpg'
	import Bus from '../../assets/js/bus.js';
	export default{
		name:'part2Banner',
		data(){
			return{
				swiper:'',
				imgs:['url('+banner1+')'],
				easterEggs:['你知道吗','我喜欢你。','才怪咧! :P'],
				easterEggPost:false
			}
		},
		mounted(){
			this.$nextTick(()=>{
				this.swiper = new Swiper('#banner_container', {
			        loop:true,
			        pagination: '.swiper-pagination',
        			paginationClickable: true,
        			autoplay:5000
			    });
			    this.swiper.on('destroy',()=>{
			    	this.$nextTick(()=>{
				    	this.imgs = ['url('+test1+')','url('+test2+')'];
				    	this.$nextTick(()=>{
							this.swiper = new Swiper('#banner_container', {
								loop:true,
						        autoplay:2000
							});
						})
					})
				})
				Bus.$on('easterEgg4', text => {
					this.easterEggPost = true;
					this.swiper.destroy();
					// var div = document.createElement('div');
					// div.innerHTML = 'yoxi';
					// document.querySelector('#banner_container').appendChild(div);
				})
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
			/*彩蛋部分*/
			&.easter-egg{
				background: black;
				color:#fff;
				width: 862px;
				font-size: 90px;
				text-align: center;
				line-height: 487px;
			}
		}
		.swiper-pagination-bullet-active{
			background: @baseColor !important;
		}
	}
</style>