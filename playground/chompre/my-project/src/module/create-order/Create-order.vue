<template>
	<div id="createOrder_container">
		<!-- 确认收货地址 -->
		<div id="address_container">
			<div class="title">确认收货地址<span>使用新地址</span></div>
		</div>
	</div>
</template>
<script>
	export default{
		name:'createorder',
		data(){
			address:[]
		},
		mounted(){
			// 拉取要结算商品信息
			this.$http.post('',{
				name: 'zl.shopping.sys.settle.account',
				goods_id: localStorage.getItem('goodsIdOrder')
			}).then((response)=>{
				// 此时商品还留在购物车中
			})
			// 拉取地址
			this.$http.post('',{
				name:'zl.shopping.sys.address.list'
			}).then((response)=>{

			})
		}
	}
</script>
<style scoped lang='less'>
	#createOrder_container{
		margin:20px auto;
		max-width: 1200px;
		width: 100%;
		min-width: 1000px;
	}
	#address_container{
		.title{
			font-size:20px;
			color:#5c5c5c;
			border-bottom: 2px solid #cbcbcb;
			height: 35px;
			line-height: 35px;
			span{
				font-size:12px;
				color:#437cd9;
				float:right;
				margin-top: 5px;
			}
		}
	}
</style>