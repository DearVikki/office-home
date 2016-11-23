<template>
	<div id='container'>
		<div id="filter_container" class="fl">
			<h5>{{cateName}}</h5>
			<!--二级分类-->
			<p class="text"
			v-for="(value, type) in types" :class="{active:types[type].id===subid}">{{types[type].name}}</p>
			<div class="divider"></div>
			<!--品牌-->
			<h5>品牌</h5>
			<label v-for="brand in brands">
				<input type="checkbox">
				<span class="radio-input"></span>
				<span class="text">{{brand.brand_name}}</span>
			</label>
			<div class="divider"></div>
			<!--价格区间-->
			<h5>价格</h5>
		</div>
		<div id="display_container" class="fr"></div>
	</div>
</template>
<script>
    import {getParameterByName} from '../../assets/js/queryString.js';
	export default{
		name:'category',
		data(){
			return{
				types:{
					1:{
						name:'',
						id:''
					}
				},
				brands:[{
					brand_name:'',
					brand_id:''
				}],
				brandActive:''
			}
		},
		mounted(){
			//拉取所有二级分类
			this.$http.post('',{name:'zl.shopping.sys.subcatalog.info', class_id:this.id}).then((response)=>{
				let types = {};
				response.body.data.forEach((e)=>{
					types[e.class_append_id] = {
						name: e.class_name,
						id: e.class_append_id
					}
				})
				this.types = types;
			})
			//拉取品牌
			this.$http.post('',{name:'zl.shopping.sys.subcatalog.brand',  class_append_id:this.subid}).then((response)=>{
				//如果我不用brand_img的话就还是不会下下来吧？
				this.brands = response.body.data;
			})
		},
		computed:{
			id(){
				return Number(getParameterByName('id'));
			},
			subid(){
				return Number(getParameterByName('subid'));
			},
			cateName(){
				return getParameterByName('name');
			}
		}
	}
</script>
<style scoped lang='less'>
	@baseColor: #d42b1e;
	#container{
		max-width: 1200px;
		width: 100%;
		margin: 0 auto;
		overflow: hidden;
	}
	#filter_container{
		width: 212px;
		border: 2px solid #d3d3d3;
		padding: 10px 5px;
		h5{
			font-size: 14px;
			color: #666;
			font-weight: bold;
		}
		.text{
			font-size: 14px;
			color: #666;
			line-height: 22px;
			cursor: pointer;
			&.active{
				color: @baseColor;
			}
		}
		.divider{
			width:100%;
			height: 2px;
			background: #d3d3d3;
			margin: 5px auto;
		}
		/*伪多选框*/
		label{
			input[type=checkbox]{
				display: none;
			}
			.radio-input{
				display: inline-block;
				width:10px;
				height: 10px;
				border: 1px solid #d3d3d3;
				margin-right: 6px;
				position: relative;
			}
			input[type=checkbox]:checked + .radio-input:after{
				content: '\2713';
				position:absolute;
				color: @baseColor;
				font-size: 16px;
				top: -8px;
				left: 0;
				font-weight: bold;
			}
		}
	}
	#display_container{
		max-width: 960px;
		width:~'calc(100% - 212px)';
		height: 200px;
		background: orange;
	}
</style>