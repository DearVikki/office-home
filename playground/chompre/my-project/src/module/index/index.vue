<template>
	<div id='index_container'>
		<!--首页banner开始-->
		<div id='activity_banner_container' class="swiper-container">
		   <div class="swiper-wrapper">
               <a class='swiper-slide' v-for="activityItem in activityItems"
               @click="clickBanner(activityItem)">
               		<img :src="activityItem.path"/>
               </a>
          </div>
          <div class="swiper-pagination">
          </div>
		</div>
		<!--促销商品开始-->
		<div id='sale_container'>
			<div class="sub-header">Promociones<a href="./home-more.html#sale" class="more fr">Ver más ></a></div>
			<div class="swiper-container">
			 	<div class="swiper-wrapper">
					<div class='swiper-slide' v-for="saleItem in saleItems">
	               		<goodsitem :item='saleItem'></goodsitem>
	                </div>
	            </div>
			</div>
			<div class="swiper-button-next"></div>
        	<div class="swiper-button-prev"></div>
		</div>
		<!--热门商品开始-->
		<div id='hot_goods_container'>
			<div class="sub-header">Recomendaciónes<a href="./home-more.html#hot" class="more fr">Ver más ></a></div>
			<div class="swiper-container">
			 	<div class="swiper-wrapper">
					<div class='swiper-slide' v-for="hotgoodsItem in hotgoodsItems">
	               		<goodsitem :item='hotgoodsItem'></goodsitem>
	                </div>
	            </div>
			</div>
			<div class="swiper-button-next"></div>
        	<div class="swiper-button-prev"></div>
		</div>
		<!--优秀商家开始-->
		<div id='hot_shop_container'>
			<div class="sub-header">Mejores tiendas
</div>
			<ul>
				<a class='hot-shop' v-for='hotshopItem in hotshopItems'
				:href="'./shop.html?id='+hotshopItem.dealer_id">
					<img :src="hotshopItem.dealer_logo">
					<p>{{hotshopItem.dealer_name}}</p>
				</a>
			</ul>
		</div>
		<icontop></icontop>
	</div>
</template>
<script>
	// import Swiper from '../../assets/lib/swiper.js';
	import goodsitem from '../../components/GoodsItem.vue';
	import icontop from '../../components/ScrollToTop.vue';
	export default{
		name:'Index',
		data(){
			return{
				activityItems:[],
				saleItems:[],
				hotgoodsItems:[],
				hotshopItems:[]
			}
		},
		mounted(){
			this.$http.post('',{name:'zl.shopping.sys.homepage.info'}).then((response)=>{
				this.activityItems = response.body.data.other_banner;
				this.hotgoodsItems = response.body.data.hot_goods;
				this.hotshopItems = response.body.data.hot_dealer;
				console.log(response.body.data.hot_dealer)
				//const className = 'mypagi';
				// this.$nextTick(()=>{
				//   	 //初始化第一部分banner板块
		  //         new Swiper('#activity_banner_container',{
			 //          pagination: '#activity_banner_container .swiper-pagination',
			 //          slidesPerView: 1,
			 //          paginationClickable: true,
			 //          autoplay: 5000,
			 //          loop:true
			 //      })
			 //      //初始化第三部分推荐商品板块
			 //      new Swiper('#hot_goods_container > .swiper-container',{
			 //          nextButton: '#hot_goods_container .swiper-button-next',
				//       prevButton: '#hot_goods_container .swiper-button-prev',
				//       slidesPerView:5,
				//       slidesPerGroup:5,
				//       spaceBetween:25
			 //      })
		  //     })
			  //初始化第二部分促销商品板块
			  this.$http.post('',{name:'zl.shopping.sys.banner.info',banner_homepage_id:response.body.data.sale_banner.banner_homepage_id,type:1}).then((response)=>{
				  this.saleItems = response.body.data.goods_list;
				  this.$nextTick(()=>{
				  // new Swiper('#sale_container > .swiper-container',{
			   //        nextButton: '#sale_container .swiper-button-next',
				  //     prevButton: '#sale_container .swiper-button-prev',
				  //     slidesPerView:5,
				  //     slidesPerGroup:5,
				  //     spaceBetween:25
			   //    })
				})
			})
			},(response)=>{

			})
		},
		methods:{
			clickBanner(banner){
				localStorage.setItem('banner',JSON.stringify(banner));
				location.href = './home-banner.html'
			},
			clickMore(){

			}
		},
		components:{goodsitem, icontop}
	}
</script>
<style scoped lang='less'>
	@import '../../assets/lib/swiper.min.css';
	@baseColor: #d42b1e;
	@backColor: #fff7f7;
	@bla: #5c5c5c;
	#index_container{
		width: 100%;
		max-width: 1200px;
		margin:0 auto;
	}
	/*第一部分banner板块*/
	#activity_banner_container{
		width: 100%;
		height: 370px;
		margin-top: 20px;
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
	/*第二三部分促销板块 热门商品板块*/
	#sale_container,#hot_goods_container{
		width: 100%;
		margin-top: 70px;
		position: relative;
		min-height: 347px;
		.swiper-slide{
			width:220px;
			margin-right: 20px;
		}
		.swiper-button-prev, .swiper-container-rtl .swiper-button-next{
			background: url(../../assets/img/index/icon_left.png) no-repeat center;
			left:-30px;
			margin-top: -6px;
		}
		.swiper-button-next, .swiper-container-rtl .swiper-button-prev{
			background: url(../../assets/img/index/icon_right.png) no-repeat center;
			right:-30px;
			margin-top:-6px;
		}
	}
	/*第四部分优秀商家板块*/
	#hot_shop_container{
		margin-top: 70px;
		margin-bottom: 100px;
		min-height: 277px;
		ul{
			margin-top:24px;
			display: flex;
		    flex-flow: row wrap;
		    justify-content: space-between;
		}
		.hot-shop{
			width:384px;
			text-align: center;
			font-size: 16px;
			color: @bla;
			display: inline-block;
			margin-bottom: 20px;
			max-width: 384px;
			min-width: 200px;
    		width: 32%;
			img{
				width:100%;
				height: 170px;
				border-radius: 3px;
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
			color: @baseColor;
		}
	}
</style>