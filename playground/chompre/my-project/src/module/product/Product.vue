<template>
	<div id="product_container">
		<div id="product_part1">
			<!--一级分类/二级分类-->
			<div id="referrer_container">
				一级分类/二级分类
			</div>
			<!--左侧图片展示部分-->
			<div id="product_part1_left_container">
				<!--大图-->
				<div id="big_box">
					<img :src="pre_goods_info.banner_pic[activeImg]">
				</div>
				<!--小图-->
				<ul id="small_box">
					<li class="small-box-item"
					v-for="(pic,index) in pre_goods_info.banner_pic"
					:class="{active: index===activeImg}"
					@mouseenter="activeImg = index">
						<img :src="pic">
					</li>
				</ul>
			</div>
			<!--右侧选择部分-->
			<div id="product_part1_right_container">
				<!--标题-->
				<div id="product_title">{{pre_goods_info.description}}</div>
				<!--价格-->
				<ul id="product_price_container">
					<li class="product-price"
					v-for="p in price_info">
						<p>${{p.price}}</p>
						<p>数量>{{p.salesnum_low}}</p>
					</li>
				</ul>
				<!--销量与收藏-->
				<div id="product_sale_container">
					<div class="fl sale">总销量: {{pre_goods_info.sales_num}}</div>
					<div class="fr collect">收藏商品</div>
				</div>
				<!--最重头的选择框!-->
				<div id="product_select_container">
					<div class="select-item"
					v-for="s in attribute_info">
						<span class="name">{{s.name}}</span>
						<span class="option"
						v-for="o in s.list"
						:class="{active:inline-block}">{{o.attribute_value}}</span>
					</div>
				</div>
			</div>
		</div>
		<div id="product_part2"></div>
	</div>
</template>
<script>
    import {getParameterByName} from '../../assets/js/utils.js';
	export default{
		name:'product',
		data(){
			return {
				comment_info:'',
				dealer_info:'',
				pre_goods_info:{
					banner_pic:[],
					description:''
				},
				activeImg:0,
				price_info:[],
				attribute_info:[],
				stock:''
			}
		},
		mounted(){
			//拉取商品详情页-上半部分
			this.$http.post('',{name:'zl.shopping.sys.goods.info', pre_goods_id:getParameterByName('id')})
			.then((response)=>{
				console.log(response.body)
				this.comment_info = response.body.data.comment_info;
				this.dealer_info = response.body.data.dealer_info;
				this.pre_goods_info = response.body.data.pre_goods_info;
				this.price_info = response.body.data.price_info;
			})
			//拉取商品详细属性
			this.$http.post('',{name:'zl.shopping.sys.goods.attribute',pre_goods_id:getParameterByName('id')})
			.then((response)=>{
				console.log(response.body)
				this.attribute_info = response.body.data.attribute_info;
				this.stock = response.body.data.stock;
			})
		}
	}
</script>
<style scoped lang='less'>
	@baseColor: #d42b1e;
	@bla: #666;
	#product_container{
		width: 1200px;
		margin: 0 auto;
	}
	#product_part1{
		overflow: hidden;
		#referrer_container{
			width:100%;
			color:#666;
			font-size: 14px;
			margin: 15px 0;
		}
		/*一部分左侧*/
		#product_part1_left_container{
			width:400px;
			float: left;
			#big_box{
				width: 400px;
				height: 400px;
				background: skyblue;
				img{
					width: 100%;
					height: 100%;
				}
			}
			#small_box{
				margin-top: 35px;
				.small-box-item{
					width: 50px;
					height: 50px;
					margin-right: 10px;
					display: inline-block;
					cursor: pointer;
					border:2px solid transparent;
					&.active{
						border-color:@baseColor;
					}
					img{
						width: 100%;
						height: 100%;
					}
				}
			}
		}
		/*一部分右侧*/
		#product_part1_right_container{
			width: 736px;
			float: right;
			/*标题*/
			#product_title{
				color:#5c5c5c;
				font-size: 20px;overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
				max-height: 54px;
			}
			/*售价*/
			#product_price_container{
				.product-price{
					display: inline-block;
					margin-right: 90px;
					margin-top: 25px;
					p:first-child{
						color: @baseColor;
						font-size: 24px;
					}
					p:nth-child(2){
						color:#979797;
						font-size: 18px;
						margin-top: 25px;
					}
				}
			}
			/*销量与收藏*/
			#product_sale_container{
				overflow: hidden;
				margin-top: 25px;
			    padding-bottom: 10px;
			    border-bottom: 2px dashed #cbcbcb;
				.sale{
					font-size: 20px;
					color: #808080;
				}
				.collect{
					font-size: 18px;
					color:@baseColor;
					cursor: pointer;
					padding-left: 24px;
					background: url(../../assets/img/product/Star_null.png) left center no-repeat;
				}
			}
			/*选择部分*/
			#product_select_container{
				.select-item{
					margin-top: 24px;
					font-size: 16px;
					color:#808080;
					.name{
						margin-right: 16px;
					}
					.option{
						display: inline-block;
						border:1px solid #808080;
						margin-right: 10px;
    					padding: 1px 4px;
    					border-radius: 1px;
    					cursor: pointer;
					}
				}
			}
		}
	}
</style>