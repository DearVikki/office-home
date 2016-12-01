<template>
	<div id="product_container">
		<!--第一部分-->
		<div id="product_part1">
			<!--一级分类/二级分类-->
			<div id="referrer_container">
				一级分类/二级分类
			</div>
			<!--左侧图片展示部分-->
			<div id="product_part1_left_container">
				<!--大图-->
				<div id="big_box">
					<img :src="pre_goods_info.banner_pic[activeImg] || goods_info.picture">
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
						<label class="option"
						v-for="o in s.list">
							<input type="radio"
							:name="s.name"
							@change="selectAttr(s,o.attribute_id)">
							<span class="check-input">{{o.attribute_value}}</span>
						</label>
					</div>
					<!--选择数量-->
					<div class="select-item">
						<span class="name">数量选择</span>
						<!--数量框-->
						<numeditor
						:numEditorStyle="numEditorStyle"
						:numEditorData="numEditorData"></numeditor>
						<span class="name">数量: {{stock}}件</span>
					</div>
				</div>
				<!--立即购买与加入购物车-->
				<div class="add">立即购买</div>
				<div class="add">加入购物车</div>
			</div>
		</div>
		<!--第二部分-->
		<div id="product_part2">
			<!--左侧店铺信息-->
			<div id="product_part2_left_container">
				<div id="shop_name">{{dealer_info.dealer_name}}</div>
				<a class="dealer-info">进入店铺</a>
				<div class="dealer-info"
				v-for="(c,i) in dealer_info.connect">客服{{i+1}}</div>
			</div>
			<!--右侧主要内容-->
			<div id="product_part2_main_container">
				<!--navbar-->
				<div id="part2_nav_container">
					<div class="part2-nav"
					:class="{active:!isComment}"
					@click="isComment=false">商品详情</div>
					<div class="part2-nav"
					:class="{active:isComment}"
					@click="isComment=true">商品评价</div>
				</div>
				<!--商品详情-->
				<div id="product_container"
				v-show="!isComment">
					<img v-for="pic in detail_pic" :src="pic">
				</div>
				<!--商品评价-->
				<div id="comment_container"
				v-show="isComment"></div>
			</div>
		</div>
	</div>
</template>
<script>
    import {getParameterByName} from '../../assets/js/utils.js';
    import numeditor from '../../components/NumEditor.vue';
	export default{
		name:'product',
		data(){
			return {
				comment_info:'',
				dealer_info:{
					dealer_name:'',
					connect:[]
				},
				pre_goods_info:{
					banner_pic:[],
					description:''
				},
				//被点开的大图,
				activeImg:0,
				price_info:[],
				//商品属性信息
				attribute_info:[],
				stock:'',
				//商品属性下具体信息
				goods_info:{
					goods_id:'',
					picture:'',
					price:'',
					stores:''
				},
				//numEditor
				numEditorStyle:{
					container:{
						display:'inline-block', marginRight:'10px'
					},
					minus:{
						width:'33px', height: '30px', lineHeight: '25px',
						fontSize:'28px', background:'#f5f5f5', border:'1px solid #808080'
					},
					input:{
						width:'50px', background:'#f5f5f5',
						display:'inline-block', height:'30px', border:'1px solid #808080'
					}
				},
				numEditorData:{
					num:1,
					max:5,
					min:1
				},
				//有无点开商品评价
				isComment:false,
				//商品详情の大图
				detail_pic:[]
			}
		},
		computed:{
			pre_goods_id(){
				return getParameterByName('id');
			}
		},
		mounted(){
			//拉取商品详情页-上半部分
			this.$http.post('',{name:'zl.shopping.sys.goods.info', pre_goods_id:this.pre_goods_id})
			.then((response)=>{
				console.log(response.body)
				this.comment_info = response.body.data.comment_info;
				this.dealer_info = response.body.data.dealer_info;
				this.pre_goods_info = response.body.data.pre_goods_info;
				this.price_info = response.body.data.price_info;
				this.stock = response.body.data.pre_goods_info.stock;
			})
			//拉取商品详细属性
			this.$http.post('',{name:'zl.shopping.sys.goods.attribute',pre_goods_id:this.pre_goods_id})
			.then((response)=>{
				console.log(response.body)
				this.attribute_info = response.body.data.attribute_info;
			})
			//拉取商品详情大图
			this.$http.post('',{name:'zl.shopping.sys.goods.detail.pic',pre_goods_id:this.pre_goods_id})
			.then((response)=>{
				this.detail_pic = response.body.data.detail_pic;
			})
		},
		methods:{
			//选择商品属性
			selectAttr(s,id){
				s.id = id;
				//检测是否所有选项都已选择
				let allSelect = true;
				let idArray = [];
				this.attribute_info.forEach((e)=>{
					if(!e.id) {
						allSelect = false;
						return;
					} else idArray.push(e.id);
				})
				if(!allSelect) return;
				console.log(idArray)
				//发送商品详细属性 获得对应图片库存
				this.$http.post('',{name:'zl.shopping.sys.goods.detail',
					pre_goods_id:this.pre_goods_id,
					attribute:idArray.sort().toString()}).
				then((response)=>{
					console.log(response)
					this.activeImg = -1;
					this.goods_info = response.body.data.goods_info;
					this.stock = response.body.data.goods_info.stores;
					this.numEditorData.max = this.stock;
				})
			}
		},
		watch:{
			numEditorData(){
				console.log('hey')
			}
		},
		components:{numeditor}
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
						margin-right: 10px;
    					input{
    						display: none;
    					}
    					.check-input{
    						border:1px solid #808080;
    						padding: 1px 4px;
    						border-radius: 1px;
    						cursor: pointer;
    					}
    					input:checked + .check-input{
							border-color:@baseColor;
							color:@baseColor;
    					}
					}
				}
			}
			/*立即购买与加入购物车*/
			.add{
				padding: 10px 20px;
				background: @baseColor;
				display: inline-block;
				font-size: 18px;
				color:#fff;
				margin-top:50px;
				margin-right: 30px;
				cursor:pointer;
			}
		}
	}
	#product_part2{
		overflow: hidden;
		margin-top: 80px;
		#product_part2_left_container{
			width: 220px;
			float: left;
			#shop_name{
				width: 100%;
				height: 60px;
				line-height: 60px;
				background: #f2f2f2;
				text-align: center;
				color: #666;
				font-size: 20px;
			}
			.dealer-info{
				display: block;
				margin: 16px auto;
				width: 120px;
				height: 40px;
				line-height: 40px;
				color: @baseColor;
				font-size: 14px;
				text-align: center;
				padding-left: 10px;
				background: url(../../assets/img/product/icon_service.png) 10px center no-repeat;
			}
			a.dealer-info{
				background-image: url(../../assets/img/product/icon_shop.png);
				border:1px solid @baseColor;
				border-radius: 2px;
			}

		}
		#product_part2_main_container{
			width: 960px;
			float: right;
			#part2_nav_container{
				width: 100%;
				background: #f5f5f5;
				height: 60px;
				line-height: 60px;
				.part2-nav{
					font-size: 20px;
					color: #666;
					text-align: center;
					width: 140px;
					cursor: pointer;
					display: inline-block;
					&.active{
						background: @baseColor;
						color: #fff;
					}
				}
			}
		}
	}
</style>