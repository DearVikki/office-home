<template>
	<div class="gallery-pop-container">
		<div class="gallery-pop">
			<div class="close"
			@click="$emit('closePop')">×</div>
			<div class="swiper-container">
				<div class="swiper-wrapper">
					<img class="swiper-slide"
					v-for="img in imgs"
					:src="img">
				</div>
				<div class="swiper-pagination"></div>
				<div class="swiper-button-next"></div>
        		<div class="swiper-button-prev"></div>
			</div>
		</div>
	</div>
</template>
<script>
	import Swiper from '../assets/lib/swiper.js';
	export default{
		name:'galleryPop',
		data(){
			return{
				mySwiper:''
			}
		},
		mounted(){
			this.$nextTick(()=>{
				this.mySwiper = new Swiper('.gallery-pop .swiper-container', {
			        loop:true,
			        pagination: '.swiper-pagination',
        			paginationClickable: true
			    });
			})
		},
		watch:{
			imgs(){
				console.log(this.imgs)
				this.mySwiper.destroy();
				this.$nextTick(()=>{

					this.mySwiper = new Swiper('.gallery-pop .swiper-container', {
				        pagination: '.swiper-pagination',
	        			paginationClickable: true,
	        			keyboardControl: true,
				        nextButton: '.swiper-button-next',
				        prevButton: '.swiper-button-prev'
				    });
				})
			}
		},
		props:['imgs']
	}
</script>
<style scoped lang='less'>
	@import '../assets/lib/swiper.min.css';
	.gallery-pop-container{
		width: 100%;
		height: 100%;
		position: fixed;
		display: flex;
		background: rgba(0,0,0,.4);
		top: 0;
		left: 0;
		.gallery-pop{
			width: 800px;
			height: 600px;
			margin:auto;
			position: relative;
			.close{
				font-size: 40px;
				position: absolute;
				right: 10px;
				top: 10px;
				cursor: pointer;
				transition: all .5s;
				z-index: 1000;
				color:#5b5b5b;
				&:hover{
					transform:rotate(360deg);
				}
			}
			.swiper-container{
				width: 100%;
				height: 550px;
				margin-top: 20px;
			}
		}
	}
</style>