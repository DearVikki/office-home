<template>
	<div id="banner_container">
		<img id="banner_img"
		v-show="banner.banner_homepage_id"
		:src="banner.path">
		<div class="common-goods-container" v-if="goods.length">
			<goodsitem :item='item' v-for="item in goods"
			:entry="entry"></goodsitem>
			<div class="empty-space-filling-item" v-for="n in 3">{{n}}</div>
		</div>
		<!-- 缺省页 -->
		<div class="empty-tip" v-if="!goods.length">
			<img src="~assets/img/product/icon_nothing.png">
			<p>{{lang.NO_PRODUCT_TIP}}</p>
		</div>
	</div>
</template>
<script>
	import {getParameterByName,timestamp,myAlert} from '../../assets/js/utils.js';
	import goodsitem from '../../components/GoodsItem.vue';
	import empty from '../../components/Empty.vue';
	import lang from '../../assets/js/language.js';
	export default{
		name: 'banner',
		data(){
			return {
				banner:{},
				goods:[],
				entry: '',
				lang: lang
			}
		},
		mounted(){
			if(!localStorage.getItem('banner')) {
				location.replace('./index.html');
			}
			this.banner = JSON.parse(localStorage.getItem('banner'));
			let title = this.banner.banner_name;
			document.title = title;
			this.entry = btoa(encodeURIComponent(JSON.stringify([{name:title, path:'./home-banner.html'}])));
			this.$http.post('',{
				name:'zl.shopping.sys.banner.info',
				banner_homepage_id: this.banner.banner_homepage_id,
				type: 2
			}).then((response) => {
				this.goods = response.body.data.goods_list;
			})
			// 商品入口路径
			let path = [];
			path.push({name:this.banner.banner_name, href: location.href});
			localStorage.setItem('entryPath', JSON.stringify(path));
		},
		components:{goodsitem}
	}
</script>
<style lang='less' scoped>
	@baseColor: #d42b1e;
	@bla: #666;
	#banner_container{
		width: 1200px;
		margin: 0 auto;
		margin-bottom: 40px;
	}
	#banner_img{
		width: 100%;
		max-height: 380px;
	}
	#common_goods_container{
		margin-top: 50px;
	}
	.empty-tip{
		margin-bottom: 200px;
	}
</style>