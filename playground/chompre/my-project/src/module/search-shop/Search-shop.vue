<template>
	<div id="searchshop_container">
		<div v-for="shop in dealer_info" class="shop">
			<img :src="shop.dealer_logo">
			<span class="name-container">
				<div class="name">{{shop.dealer_name}}</div>
				<p>{{shop.city}}</p>
			</span>
		</div>
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
			this.keyword = getParameterByName('key')||'';
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
		border-top:1px solid #e7e7e7;
		>img{
			width: 100%;
			height: 100%;
		}
		.name-container{
			width: 380px;
			padding: 10px;
		}
	}
</style>