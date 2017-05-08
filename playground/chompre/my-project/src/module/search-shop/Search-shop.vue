<template>
	<div id="searchshop_container">
		<a v-for="shop in dealer_info" class="shop"
		:href="'./shop.html?id='+shop.dealer_id">
			<img :src="shop.dealer_logo">
			<span class="name-container">
				<p class="name">{{shop.dealer_name}}</p>
				<p class="city">{{shop.city}}</p>
			</span>
			<div class="enter">进入店铺 >></div>
		</a>
	</div>
</template>
<script>
	import {getParameterByName} from '../../assets/js/utils.js';
	import pagination from '../../components/Pagination.vue';
	export default{
		name:'searchshop',
		data(){
			return{
				keyword:'',
				page:1,
				dealer_info:[{
					city:'',
					collect_num:'',
					dealer_id:0,
					dealer_logo:'',
					dealer_name:''
				}]
			}
		},
		mounted(){
			this.keyword = getParameterByName('search')||'';
			document.title = '店铺搜索-' + this.keyword;
			this.$http.post('',{
				name:'zl.shopping.sys.search.dealer',
				search:this.keyword,
				page:this.page
			}).then((response)=>{
				this.dealer_info = response.body.data.dealer_info;
			})
		}
	}
</script>
<style lang='less' scoped>
	#searchshop_container{
		max-width: 1200px;
		width: 100%;
		margin:40px auto;
	}
	.shop{
		width: 100%;
		padding: 10px;
		height: 118px;
		border:1px solid #e7e7e7;
		font-size:12px;
		color:#5c5c5c;
		position: relative;
		display: block;
		>img{
			width: 100px;
			height: 100%;
			vertical-align: middle;
		}
		.name-container{
			width: 380px;
			padding: 10px;
			vertical-align: middle;
			display: inline-block;
			height: 100%;
			.name{
				font-weight: bold;
				margin-bottom: 40px;
			}
		}
		.enter{
			font-size:14px;
			color:#d0021b;
			position: absolute;
			right: 30px;
			bottom: 18px;
		}
	}
</style>