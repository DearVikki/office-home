<template>
	<div id="shop_container">
		<!-- 店铺抬头 -->
		<div id="shop_header">
			<div id="shop_header_inner">
				<img id="home_pic" :src="dealer_info.home_pic">
				<div id="shop_header_fr">
					<div id="contact_container" @click="contactPop.show = true">
						<img src="~assets/img/product/icon_service.png">
						{{lang.CONTACT_SERVICE}}
					</div>
					<div id="collect_container" :class="{active:is_collect}" @click="collect">
						<span v-if="is_collect">{{lang.UNCOLLECT}}</span>
						<span v-else>{{lang.COLLECT_SHOP}}</span>
					</div>
				</div>
			</div>
		</div>
		<div id="shop_main">
			<!-- 店铺搜索 -->
			<div id="search_container">
				<span id="search_txt">{{lang.SEARCH_IN_SHOP}}</span>
				<input v-model="searchKey">
				<span id="search_btn" @click="search">{{lang.LL_PRODUCTS}}</span>
			</div>
			<!-- 全部商品 -->
			<span id="shop_all" @click="getAll"></span>
			<!-- 店铺商品内容 -->
			<div id="goods_container">
				<goodsitem :item='item' v-for="item in pre_goods_info"
				:entry="entry"></goodsitem>
				<div class="empty-space-filling-item" v-for="n in 3">{{n}}</div>
				<empty v-if="!pre_goods_info.length"></empty>
			</div>
			<!-- 分页 -->
			<pagination :allPage="allPage"
			v-show="allPage>1"></pagination>
		</div>
		<!-- 客服弹窗 -->
		<pop :pop="contactPop">
			<div id="contact_inner_container">
				<div id="contact_container">
					<div class="contact" v-for="(c,index) in dealer_info.connect">
						<img src="~assets/img/order/icon_service.png">
						<span>{{lang.SERVICE}}{{index+1}}&nbsp;&nbsp;&nbsp; WHATS APP:&nbsp;</span>
						<span class="red">{{c}}</span>
					</div>
				</div>
				<div class="btn-container">
					<div class="btn reverse" @click="contactPop.show = false">{{lang.CLOSE}}</div>
				</div>
			</div>
		</pop>
	</div>
</template>
<script>
	import {getParameterByName} from '../../assets/js/utils.js';
	import {myAlert} from '../../assets/js/utils.js';
	import pop from '../../components/Pop.vue';
	import goodsitem from '../../components/GoodsItem.vue';
	import pagination from '../../components/Pagination.vue';
	import lang from '../../assets/js/language.js'
	import empty from '../../components/Empty.vue';
	export default{
		name:'shop',
		data(){
			return{
				id:'',
				searchKey:'',
				dealer_info:{
					dealer_id: 1,
					dealer_name: '',
					connect: [],
					collect_num: 9,
					home_pic: ''
				},
				is_collect:0,
				pre_goods_info:[{
					pre_goods_id:'',
					cover_pic:'',
					scores:'',
					price:'',
					description:''
				}],
				contactPop:{
					show: false,
					style: {
						width:'780px',
						minHeight:'292px',
						padding:'70px 120px 35px 120px'
					}
				},
				allPage:1,
				page: 1,
				entry:'',
				lang:lang
			}
		},
		mounted(){
			this.id = getParameterByName('id');
			this.getProducts();
		},
		methods:{
			getAll(){
				this.page = 1;
				this.getProducts();
			},
			getProducts(){
				this.$http.post('',{
					name:'zl.shopping.sys.dealer.info',
					dealer_id:this.id,
					page:this.page
				}).then((response)=>{
					let dealer_info = response.body.data.dealer_info;
					dealer_info.connect = dealer_info.connect.split(',');
					this.dealer_info = dealer_info;
					this.is_collect = response.body.data.is_collect;
					this.pre_goods_info = response.body.data.pre_goods_info;
					// 改变title
					document.title = dealer_info.dealer_name + ' - Chompre';
					this.entry = btoa(encodeURIComponent(JSON.stringify([{name:dealer_info.dealer_name, path:location.href}])));
				})
			},
			search(){
				if(!this.searchKey) return;
				this.$http.post('',{
					name:'zl.shopping.sys.search.dealer.goods',
					dealer_id: this.id,
					page: this.page,
					search: this.searchKey
				}).then((response)=>{
					this.pre_goods_info = response.body.data.goods_info;
					// 为什么会无限啊！
					// console.log(this.pre_goods_info)
					this.searchKey = '';
				})
			},
			collect(){
				if(this.is_collect){
					// 取消收藏
					this.$http.post('',{
						name:'zl.shopping.sys.collect.cancel',
						for_id: this.id,
						for_type: 'dealer'
					}).then((response)=>{
						if(response.body.code === 1000){
							myAlert(lang.CANCEL_COLLECT_TIP);
							this.is_collect = 0;
						}
						else myAlert(response.body.msg);
					})
				} else {
					// 收藏
					this.$http.post('',{
						name:'zl.shopping.sys.collect',
						for_id: this.id,
						for_type: 'dealer'
					}).then((response)=>{
						if(response.body.code === 1000){
							myAlert(lang.COLLECT_TIP);
							this.is_collect = 1;
						}
						else myAlert(response.body.msg);
					})
				}
			}
		},
		watch:{
			'$router'(){
				this.getProducts();
			}
		},
		components:{pop,goodsitem,pagination,empty}
	}
</script>
<style lang='less' scoped>
	@baseColor: #d42b1e;
	.center{
		width:100%;
		max-width:1200px;
		margin:0 auto;
	}
	#shop_container{
	}
	#shop_header{
		margin-top:36px;
		border-bottom: 2px solid #e7e7e7;
		overflow:hidden;
		#shop_header_inner{
			.center
		}
		#home_pic{
			border-radius:4px;
			width:204px;
			height:90px;
			float:left;
		}
		#shop_header_fr{
			float:right;
			height: 90px;
    		line-height: 90px;
		}
		#contact_container,#collect_container{
			margin-right: 20px;
			padding-left:25px;
			font-size:18px;
			color:#d42b1e;
			display:inline-block;
			vertical-align:center;
			cursor:pointer;
			img{
				vertical-align:center;
			}
		}
		#collect_container{
			width:200px;
			background:url(../../assets/img/product/Star_null.png) no-repeat left;
			&.active{
				background-image: url(../../assets/img/product/Star.png);
			}
		}
	}
	#shop_main{
		.center;
	}
	/*商铺搜索*/
	#search_container{
		border:1px solid @baseColor;
		font-size:14px;
		color:#d42b1e;
		height:34px;
		line-height:34px;
		width:100%;
		max-width:600px;
		margin-top:24px;
		display: inline-block;
		#search_txt{
			padding: 0 12px;
			display:inline-block;
			vertical-align:middle;
		}
		input{
			height:30px;
			margin-top:-4px;
			border:none;
			border-left:1px solid @baseColor;
			vertical-align:middle;
			font-size: 14px;
			padding-left: 10px;
			cursor: text;
		}
		#search_btn{
			width:44px;
			height:33px;
			cursor:pointer;
			display:inline-block;
			float:right;
			background:url(../../assets/img/index/index_search.png) center no-repeat;
			background-color:@baseColor;
		}
	}
	#shop_all{
		font-size: 14px;
		margin-left: 50px;
		color: @baseColor;
		cursor: pointer;
	}
	/*店铺商品*/
	#goods_container{
			display: flex;
		    width: 100%;
		    flex-flow: row wrap;
		    justify-content: space-between;
		    min-height: 700px;
		    position: relative;
		    &:after{
		    	content: '';
			    flex: auto;
			}
	}
	/*客服弹窗*/
	.red{
		color:#d42b1e;
	}
	#contact_inner_container{
		font-size:12px;
		color:#5c5c5c;
		text-align:left;
		#contact_container{
			min-height:97px;
		}
		.contact{
			margin:0 auto 20px 110px;
			img{
				vertical-align:middle;
			}
		}
		span{
			vertical-align:middle;
		}
		.btn-container{
			margin-top:30px;
		}
	}
</style>