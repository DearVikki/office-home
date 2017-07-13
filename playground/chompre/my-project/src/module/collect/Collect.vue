<template>
	<div id="collect_container">
		<div id="collect_tab_container">
			<a
			:class="{active: activeTab === 'goods'}"
			@click="clickTab('goods')">{{lang.COLLECT_GOODS}}</a>
			<a
			:class="{active: activeTab === 'shops'}"
			@click="clickTab('shops')">{{lang.COLLECT_SHOP}}</a>
		</div>
		<div class="common-goods-container"
		v-if="goods.length && activeTab == 'goods'">
			<goodsitem
			:item='item'
			v-for="item in goods"
			hasDelete=true
			@delete="cancelGoodsCollect"
			:entry="entry"></goodsitem>
			<div class="empty-space-filling-item" v-for="n in 3">{{n}}</div>
		</div>
		<div class="common-goods-container"
		v-if="shops.length  && activeTab == 'shops'">
			<a class="shop-item"
			v-for="item in shops"
			:href="'./shop.html?id='+item.dealer_id">
			    <img :src="item.dealer_logo">
			    <p>{{item.dealer_name}}</p>
			    <div class="mask delete"
			    @click.stop.prevent="cancelShopCollect(item)"></div>
			</a>
			<div class="empty-space-filling-item" v-for="n in 3">{{n}}</div>
		</div>
		<!-- 缺省页 -->
		<div class="empty-tip"
		v-if="(!goods.length  && activeTab == 'goods') || (!shops.length  && activeTab == 'shops')">
			<img src="~assets/img/product/icon_nothing.png">
			<p>{{lang.COLLECT_EMPTY_TIP}}</p>
		</div>
	</div>
</template>
<script>
	import {getParameterByName,timestamp,myAlert} from '../../assets/js/utils.js';
	import goodsitem from '../../components/GoodsItem.vue';
	import lang from '../../assets/js/language.js';
	export default{
		name: 'collect',
		data(){
			return{
				goods:[],
				shops:[],
				entry:btoa(encodeURIComponent(JSON.stringify([{name:'Misfavoritos', path:'./collect.html'}]))),
				lang:lang,
				activeTab: 'shops'
			}
		},
		mounted(){
			if(!localStorage.getItem('userInfo')) location.replace('./login.html');
			this.collectShop();
			this.collectGoods();
		},
		methods:{
			clickTab(type){
				this.activeTab = type;
			},
			cancelCollect(type, item){
				this.$http.post('',{
					name:'zl.shopping.sys.collect.cancel',
					for_id: item.pre_goods_id || item.dealer_id,
					for_type: type
				}).then((response) => {
					if(type == 'pre_goods'){
						this.goods.forEach((e,i) => {
							if(e.pre_goods_id === item.pre_goods_id) this.goods.splice(i,1);		
						})
					} else {
						this.shops.forEach((e,i) => {
							if(e.dealer_id === item.dealer_id) this.shops.splice(i,1);		
						})
					}
					myAlert(this.lang.CANCEL_COLLECT_TIP);
				})
			},
			collectGoods(){
				this.$http.post('',{
					name:'zl.shopping.sys.favorite.goods'
				}).then((response) => {
					this.goods = response.body.data.favorites_list;
				})
			},
			collectShop(){
				this.$http.post('',{
					name:'zl.shopping.sys.favorite.dealers'
				}).then((response) => {
					this.shops = response.body.data.favorites_list;
				})
			},
			cancelGoodsCollect(item){
				this.cancelCollect('pre_goods', item)
			},
			cancelShopCollect(item){
				this.cancelCollect('dealer', item)
			}
		},
		components: {goodsitem}
	}
</script>
<style lang='less' scoped>
	@baseColor: #d42b1e;
	@backColor: #fff7f7;
	@bla: #5c5c5c;
	#collect_tab_container{
		padding: 10px;
		border-bottom: 1px solid #ddd;
		a{
			font-size: 15px;
			margin-right: 20px;
			color: #555;
			&.active{
				color: #d42b1e;
				border-bottom: 2px solid #d42b1e;
			}
		}
	}
	#collect_container{
		width: 1200px;
		margin: 0 auto;
		margin-bottom: 40px;
		padding-top: .1px;
		min-height: 500px;
	}
	.shop-item {
    margin-top: 20px;
    width: 220px;
    display: inline-block;
    position: relative;
    img {
        width: 220px;
        height: 220px;
    }
    p {
        font-size: 12px;
        color: @bla;
        margin-top: 8px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }
    .mask{
        position: absolute;
        background-color: rgba(50, 50, 50, .48);
        font-size: 12px;
        color: #fff;
        text-align: center;
        opacity: 0;
        transition: all .4s;
        &.delete{
            right: 0;
            top:0;
            width: 28px;
            height: 28px;
            background-image: url(../../assets/img/product/icon_delete.png);
            background-repeat: no-repeat;
            background-position: center;
            cursor:pointer;
        }
        &.add{
            left: 0;
            top: 184px;
            height: 36px;
            line-height: 36px;
            width: 100%;
        }
    }
    &:hover .mask{
        opacity: 1;
    }
}
</style>