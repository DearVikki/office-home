<template>
	<div id='container'>
		<div id="filter_container" class="fl">
			<h5>{{cateName}}</h5>
			<!--二级分类-->
			<span class="text"
			v-for=""></span>
		</div>
		<div id="display_container" class="fr"></div>
	</div>
</template>
<script>
    import {getParameterByName} from '../../assets/js/queryString.js';
	export default{
		name:'category',
		mounted(){
			this.$http.post('',{name:'zl.shopping.sys.subcatalog.info', class_id:this.id}).then((response)=>{
				console.log(response.body)
			})
		},
		computed:{
			id(){
				return getParameterByName('id');
			},
			subid(){
				return getParameterByName('subid');
			},
			cateName(){
				return getParameterByName('name');
			}
		}
	}
</script>
<style scoped lang='less'>
	#container{
		max-width: 1200px;
		width: 100%;
		margin: 0 auto;
		overflow: hidden;
	}
	#filter_container{
		width: 212px;
		height: 200px;
		border: 1px solid #d3d3d3;
		padding: 10px 5px;
		h5{
			font-size: 14px;
			color: #666;
			font-weight: bold;
		}
	}
	#display_container{
		max-width: 960px;
		width:~'calc(100% - 212px)';
		height: 200px;
		background: orange;
	}
</style>