<template>
	<div id='index_container'>
		<div id='activity_banner_container' class="swiper-container">
		   <div class="swiper-wrapper">
               <router-link class='banner swiper-slide' to='' v-for="activityItem in activityItems">
               		<img :src="activityItem.path"/>
               </router-link>
          </div>
          <div class="banner swiper-pagination">
          </div>
		</div>
		<div id='sale_container'>
			<div class="sub-header">促销商品<span class="more fr">更多 ></span></div>
			<div id='sale' class="swiper-container">
			 	<div class="swiper-wrapper">
					<router-link class='banner swiper-slide' to='' v-for="saleItem in saleItems">
	               		<img :src="saleItem.path"/>
	                </router-link>
	            </div>
                <div class="swiper-button-next"></div>
        		<div class="swiper-button-prev"></div>
			</div>
		</div>
	</div>
</template>
<script>
	import Mock from 'mockjs';
	const Random = Mock.Random;
	const data = Mock.mock(/\.json/,{
		'list1|5':[{
			'path':Random.image('720x300', '#e2b3c2', '♥')
		}],
		'list2|10':[{
			'path':Random.image('125x125', '#e2b3c2', '♥')
		}],
	})
	import Swiper from './assets/lib/swiper.js';
	export default{
		name:'Index',
		data(){
			return{
				activityItems:[],
				saleItems:[]
			}
		},
		mounted(){
			this.$http.get('sss.json').then((response)=>{
				this.activityItems = JSON.parse(response.data).list1;
				this.saleItems = JSON.parse(response.data).list2;
				this.$nextTick(()=>{
		          new Swiper('#activity_banner_container',{
			          pagination: '#activity_banner_container .swiper-pagination',
			          slidesPerView: 1,
			          paginationClickable: true,
			          loop:true
			      })
			      new Swiper('#sale_container',{
			          nextButton: '#sale_container .swiper-button-next',
				      prevButton: '#sale_container .swiper-button-prev',
				      slidesPerView:5
			      })
		      })
			},(response)=>{

			})
		}
	}
</script>
<style scoped lang='less'>
	@import './assets/lib/swiper.min.css';
	@baseColor: #d42b1e;
	@backColor: #fff7f7;
	@bla: #5c5c5c;
	#index_container{
		width: 100%;
		max-width: 1200px;
		margin:0 auto;
	}
	#activity_banner_container{
		width: 100%;
		height: 370px;
		img{
			width: 100%;
			height: 100%;
		}
		.swiper-pagination.swiper-pagination-bullets{
			background: rgba(255,255,255,0.1);
		    width: auto;
		    left: 50%;
		    transform: translate3d(-50%,0,0);
		    padding: 3px 2px;
		    border-radius: 30px;
		}
		.swiper-pagination-bullet{
			background: #fff;
			opacity: .5;
		}
		.swiper-pagination-bullet.swiper-pagination-bullet-active{
			background: @baseColor !important;
		}
	}
	#sale_container{
		width: 100%;
		margin-top: 70px;
		height: 304px;
		#sale{
			img{
				width: 220px;
				height: 220px;
			}
			.swiper-slide{
				width:220px;
				height: 300px;
			}
		}
	}
	.sub-header{
		width: 100%;
		color: @baseColor;
		font-size: 20px;
		font-weight: bold;
		padding-bottom: 10px;
		border-bottom: 2px solid @baseColor;
		.more{
			font-size: 14px;
			margin-top:10px;
		}
	}
</style>