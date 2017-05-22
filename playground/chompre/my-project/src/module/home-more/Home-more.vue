<template>
	<div id="more_container">
		<div class="common-goods-container"
		v-if="type==1&&saleGoods.length || type==2&&hotGoods.length">
			<goodsitem v-if="type == 1"
			:item='item' v-for="item in saleGoods"></goodsitem>
			<goodsitem v-if="type == 2"
			:item='item' v-for="item in hotGoods"></goodsitem>
			<div class="empty-space-filling-item" v-for="n in 3">{{n}}</div>
		</div>
		<!-- 缺省页 -->
		<div class="empty-tip" v-else>
			<img src="~assets/img/product/icon_nothing.png">
			<p>Tu carro de la compra está vacía</p>
		</div>
	</div>
</template>
<script>
	import {getParameterByName,timestamp,myAlert} from '../../assets/js/utils.js';
	import goodsitem from '../../components/GoodsItem.vue';
	export default{
		name: 'more',
		data(){
			return{
				type:1,
				saleGoods:[],
				hotGoods:[]
			}
		},
		mounted(){
			if(location.hash === '#sale') {
				this.type = 1;
				document.title = 'Promociones';
			} else {
				this.type = 2;
				document.title = 'Recomendaciónes';
			}
			this.$http.post('',{name:'zl.shopping.sys.homepage.info'}).then((response) => {
				this.hotGoods = response.body.data.hot_goods;
				this.$http.post('',{name:'zl.shopping.sys.banner.info',banner_homepage_id:response.body.data.sale_banner.banner_homepage_id,type:1}).then((response) => {
					this.saleGoods = response.body.data.goods_list;
				})
			})
		},
		components:{goodsitem}
	}
</script>
<style lang='less' scoped>
	#more_container{
		width: 1200px;
		margin: 0 auto;
		margin-bottom: 40px;
	}
</style>