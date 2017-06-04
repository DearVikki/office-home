<template>
	<div id="collect_container">
		<div class="common-goods-container"
		v-if="goods.length">
			<goodsitem
			:item='item'
			v-for="item in goods"
			hasDelete=true
			@delete="cancelCollect"
			@add="addCart"
			:entry="entry"></goodsitem>
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
		name: 'collect',
		data(){
			return{
				goods:[],
				entry:btoa(encodeURIComponent(JSON.stringify([{name:'Misfavoritos', path:'./collect.html'}])))
			}
		},
		mounted(){
			if(!localStorage.getItem('userInfo')) location.replace('./login.html');
			this.$http.post('',{
				name:'zl.shopping.sys.favorite.goods'
			}).then((response) => {
				this.goods = response.body.data.favorites_list;
			})
		},
		methods:{
			cancelCollect(item){
				this.$http.post('',{
					name:'zl.shopping.sys.collect.cancel',
					for_id: item.pre_goods_id,
					for_type: 'pre_goods'
				}).then((response) => {
					this.goods.forEach((e,i) => {
						if(e.pre_goods_id === item.pre_goods_id) this.goods.splice(i,1);
						myAlert('已取消收藏');
					})
				})
			},
			addCart(item){

			}
		},
		components: {goodsitem}
	}
</script>
<style lang='less' scoped>
	#collect_container{
		width: 1200px;
		margin: 0 auto;
		margin-bottom: 40px;
		padding-top: .1px;
		min-height: 500px;
	}
</style>