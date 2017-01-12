<template>
	<div id="cart_container">
		<h3>Cart</h3>
		<div id="cart_item_container">
			<!-- 商店 -->
			<div class="shop-item"
			v-for="shop in carts">
				<!-- 商店标题 -->
				<div class="shop-header">
					<!-- 选择一家店的所有商品 -->
					<label class="common-check-container">
						<input type="checkbox" @change="shopCheck(shop)" :checked="shop.dealer_info.checked">
						<span class="check-input"></span>
					</label>
					<a class="shop-name">{{shop.dealer_info.dealer_name}}</a>
				</div>
				<!-- 所含商品 -->
				<div class="goods-item-container">
					<div class="goods-item"
					v-for="goods in shop.goods_info">
						<div class="fl">
							<!-- 选择单件商品 -->
							<label class="common-check-container">
								<input type="checkbox" @change="goodsCheck(shop,goods)" :checked="goods.checked">
								<span class="check-input"></span>
							</label>
							<!-- 商品图片 -->
							<img :src="goods.cover_pic">
							<!-- 商品名字 -->
							<div class="goods-name"><div class="goods-name-inner">{{goods.goods_name}}</div></div>
							<!-- 商品选择信息 -->
							<div class="goods-des">
								<p v-for="des in goods.description">{{des}}</p>
							</div>
							<!-- 单价 -->
							<div class="goods-price">${{goods.price}}</div>
							<!-- 数量选择框 -->
							<div class="goods-num">
								<numeditor
								:numEditorStyle="goods.numEditorStyle"
								:numEditorClass="goods.numEditorClass"
								:numEditorData="goods.numEditorData"></numeditor>
							</div>
							<!-- 总价 -->
							<div class="goods-total-price">${{goods.price * goods.numEditorData.num}}</div>
						</div>
						<div class="fr">
							<!-- 移入收藏夹/删除 -->
							<div class="edit-container">
								<span>移入收藏夹</span>
								<span>删除</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- 总结条 -->
		<div id="conclu_container">
			<!-- 全选 -->
			<div class="fl">
				<label class="common-check-container">
					<input type="checkbox" @change="allCheck" :checked="allchecked">
					<span class="check-input"></span>
					<span>全选</span>
				</label>
				<span style="margin-left:20px">移入收藏夹</span>
				<span style="margin-left:20px">删除</span>
			</div>
			<div class="fr">
				<span style="margin-right:20px">已选商品<span class="amount">{{amount}}</span>件</span>
				<span style="margin-right:20px" >合计（不含运费）：<span class="price" style="margin:0 10px">${{price}}</span></span>
				<span class="pay">结算</span>
			</div>
		</div>
	</div>
</template>
<script>
	import numeditor from '../../components/NumEditor.vue';
	export default{
		name:'cart',
		data(){
			return{
				carts:[{
	                dealer_info: {
	                    dealer_id: 3,
	                    dealer_name: "智利真维斯",
	                    checked:false
	                },
	                goods_info: [
	                    {
	                        goods_id: 5,
	                        goods_num: 1,
	                        pre_goods_id: 2,
	                        stores: 467,
	                        description: ["颜色:中卡其", "尺码:S", " 布料:麻布"],
	                        goods_name: "JNBY_江南布衣2016夏新商场同款简洁大方圆领T恤5G561001",
	                        cover_pic: "http://121.40.91.157/shopping/php/assets/img/pre_goods/cat_1/2/goods/1.png",
	                        price: 100,
	                        //numEditor
	                        numEditorStyle:{
	                        	container:{
	                        		display:'inline-block', marginRight:'10px',fontSize:'0'
	                        	},
	                        	minus:{
	                        		width:'16px', height: '24px', lineHeight: '20px',
	                        		fontSize:'16px', background:'#f5f5f5', border:'1px solid #b0b0b0'
	                        	},
	                        	input:{
	                        		width:'40px', background:'#fff',
	                        		display:'inline-block', height:'24px', border:'1px solid #b0b0b0'
	                        	}
	                        },
	                        numEditorClass:{
	                        	input:[]
	                        },
	                        numEditorData:{
	                        	num:1,
	                        	max:467,
	                        	min:1
	                        },
	                        checked:false
	                    },
	                    {
	                        goods_id: 1,
	                        goods_num: 2,
	                        pre_goods_id: 2,
	                        stores: 155,
	                        description: ["颜色:中卡其", "尺码:M", " 布料:麻布"],
	                        goods_name: "JNBY_江南布衣2016夏新商场同款简洁大方圆领T恤5G561001",
	                        cover_pic: "http://121.40.91.157/shopping/php/assets/img/pre_goods/cat_1/2/goods/1.png",
	                        price: 100,
	                        //numEditor
	                        numEditorStyle:{
	                        	container:{
	                        		display:'inline-block', marginRight:'10px',fontSize:'0'
	                        	},
	                        	minus:{
	                        		width:'16px', height: '24px', lineHeight: '20px',
	                        		fontSize:'16px', background:'#f5f5f5', border:'1px solid #b0b0b0'
	                        	},
	                        	input:{
	                        		width:'40px', background:'#fff',
	                        		display:'inline-block', height:'24px', border:'1px solid #b0b0b0'
	                        	}
	                        },
	                        numEditorClass:{
	                        	input:[]
	                        },
	                        numEditorData:{
	                        	num:1,
	                        	max:5,
	                        	min:1
	                        },
	                        checked:false
	                    },
	                    {
	                        goods_id: 6,
	                        goods_num: 1,
	                        pre_goods_id: 2,
	                        stores: 124,
	                        description:["颜色:漂白", "尺码:S", " 布料:麻布"],
	                        goods_name: "JNBY_江南布衣2016夏新商场同款简洁大方圆领T恤5G561001",
	                        cover_pic: "http://121.40.91.157/shopping/php/assets/img/pre_goods/cat_1/2/goods/2.png",
	                        price: 100,
	                        //numEditor
	                        numEditorStyle:{
	                        	container:{
	                        		display:'inline-block', marginRight:'10px',fontSize:'0'
	                        	},
	                        	minus:{
	                        		width:'16px', height: '24px', lineHeight: '20px',
	                        		fontSize:'16px', background:'#f5f5f5', border:'1px solid #b0b0b0'
	                        	},
	                        	input:{
	                        		width:'40px', background:'#fff',
	                        		display:'inline-block', height:'24px', border:'1px solid #b0b0b0'
	                        	}
	                        },
	                        numEditorClass:{
	                        	input:[]
	                        },
	                        numEditorData:{
	                        	num:1,
	                        	max:5,
	                        	min:1
	                        },
	                        checked:false
	                    }
	                ]
	            },
	            {
	                dealer_info: {
	                    dealer_id: 1,
	                    dealer_name: "三只松鼠",
	                    checked:false
	                },
	                goods_info: [
	                    {
	                        goods_id: 3,
	                        goods_num: 1,
	                        pre_goods_id: 3,
	                        stores: 35,
	                        description: ["颜色:中卡其","尺码:M", "布料:麻布"],
	                        goods_name: "PANCOAT[5月新品]韩版休闲宽松插肩短袖T恤女 PPATE162257W",
	                        cover_pic: "https://gd2.alicdn.com/imgextra/i2/1691332753/TB27SS7hpXXXXXHXXXXXXXXXXXX_!!1691332753.jpg",
	                        price: 12,
	                        //numEditor
	                        numEditorStyle:{
	                        	container:{
	                        		display:'inline-block', marginRight:'10px',fontSize:'0'
	                        	},
	                        	minus:{
	                        		width:'16px', height: '24px', lineHeight: '20px',
	                        		fontSize:'16px', background:'#f5f5f5', border:'1px solid #b0b0b0'
	                        	},
	                        	input:{
	                        		width:'40px', background:'#fff',
	                        		display:'inline-block', height:'24px', border:'1px solid #b0b0b0'
	                        	}
	                        },
	                        numEditorClass:{
	                        	input:[]
	                        },
	                        numEditorData:{
	                        	num:1,
	                        	max:5,
	                        	min:1
	                        }
	                    }
	                ]
	            }],
	            allchecked:false,
	            amount:0,
	            price:0
			}
		},
		mounted(){
			// 拉取数据
			this.$http.post('',{
				name:'zl.shopping.sys.shop.cart'
			}).then((response)=>{
				console.log(response)
			})
		},
		methods:{
			// 取消店铺的勾
			shopUncheckFun(shop){
				shop.dealer_info.checked = false;
				shop.goods_info.forEach((e)=>{
					e.checked = false;
				})
			},
			// 勾选店铺向下对店铺商品的作用
			shopNegativeCheckFun(shop){
				shop.dealer_info.checked = true;
				shop.goods_info.forEach((e)=>{
					e.checked = true;
				})
			},
			// 勾选店铺向上对总商品的作用
			shopActiveCheckFun(){
				let checked = true;
				this.carts.forEach((shop)=>{
					if(!shop.dealer_info.checked) checked = false;
				})
				if(checked) this.allchecked = true;
			},
			shopCheck(shop){
				// console.log(shop.dealer_info.checked)
				if(shop.dealer_info.checked) {
					// uncheck
					this.shopUncheckFun(shop);
				} else {
					// check
					this.shopNegativeCheckFun(shop);
					this.shopActiveCheckFun(shop);
				}
			},
			goodsCheck(shop,goods){
				if(goods.checked){
					// uncheck
					goods.checked = false;
					shop.dealer_info.checked = false;
					this.allchecked = false;
				} else {
					// check
					goods.checked = true;
					let checked = true;
					shop.goods_info.forEach((e)=>{
						if(!e.checked) checked = false;
					})
					if(checked) shop.dealer_info.checked = true;
					this.shopActiveCheckFun();
				}
			},
			allCheck(){
				if(this.allchecked){
					// uncheck
					this.allchecked = false;
					this.carts.forEach((shop)=>{
						this.shopUncheckFun(shop);
					})
				} else {
					// check
					this.allchecked = true;
					this.carts.forEach((shop)=>{
						this.shopNegativeCheckFun(shop);
					})
				}
			},
			pay(){

			}
		},
		components:{numeditor}
	}
</script>
<style scoped lang='less'>
	@baseColor: #d42b1e;
	#cart_container{
		max-width: 1200px;
		min-width: 1000px;
		height: 800px;
		margin:0 auto;
		padding: .1px 0;
	}
	/*标题*/
	h3{
		color: @baseColor;
		font-size: 30px;
		font-weight: bold;
		margin: 10px 0;
	}
	#cart_item_container{
		width:100%;
	}
	/*每一家店*/
	.shop-item{
		font-size:12px;
		color:#5c5c5c;
		margin-bottom: 20px;
		.temp{
			width:12px;
			height: 12px;
			border:1px solid #b0b0b0;
			display: inline-block;
			vertical-align: middle;
		}
		/*店名包裹框*/
		.shop-header{
			padding:10px;
			.shop-name{
				color: #5c5c5c;
				margin-left: 5px;
				vertical-align: middle;
			}
		}
		/*商品包裹框*/
		.goods-item-container{
			border:1px solid #e7e7e7;
			width:100%;
			/*每条商品*/
			.goods-item{
				border-top:1px dashed #cbcbcb;
				overflow: hidden;
				padding:20px;
				background: #fbfbfb;
				&:first-of-type{
					border-top:none;
				}
				/*图片*/
				img{
					width:80px;
					height: 80px;
					vertical-align: top;
					margin-left:15px;
				}
				/*商品名字*/
				.goods-name{
					display: inline-block;
					vertical-align: top;
					width:300px;
					margin-left:10px;
					.goods-name-inner{
						width: 100%;
						overflow: hidden;
						text-overflow: ellipsis;
						/*display: -webkit-box;
						-webkit-line-clamp: 3;
						-webkit-box-orient: vertical;
						white-space: nowrap;*/
					}
				}
				/*尺码颜色*/
				.goods-des{
					display: inline-block;
					vertical-align: top;
					margin-left:40px;
					width:100px;
					p{
						color:#808080;
					}
				}
				/*价格*/
				.goods-price{
					display: inline-block;
					vertical-align: top;
					margin-left:40px;
					width: 70px;
				}
				/*数量*/
				.goods-num{
					display: inline-block;
					vertical-align: top;
					margin-left:40px;
				}
				/*总价*/
				.goods-total-price{
					display: inline-block;
					vertical-align: top;
					color:@baseColor;
					font-weight: bold;
					margin-left: 60px;
				}
				/*edit-container*/
				.edit-container{
					width: 60px;
				}
			}
		}
	}
	/*checkbox*/
	.common-check-container{
		vertical-align: middle;
	    input{
	        display: none;
	    }
	    .check-input{
	        display: inline-block;
	        width:12px;
	        height: 12px;
	        border: 1px solid #d3d3d3;
	        margin-right: 6px;
	        position: relative;
	        cursor: pointer;
	        background: #fff;
	    }
	    input[type=checkbox]:checked + .check-input:after{
	        content: '\2713';
	        position:absolute;
	        color: @baseColor;
	        font-size: 16px;
	        top: -8px;
	        left: 0;
	        font-weight: bold;
	    }
	}
	/*总结区*/
	#conclu_container{
		width: 100%;
		font-size:12px;
		letter-spacing: 1px;
		color:#5c5c5c;
		overflow: hidden;
		background: #fff0f2;
		padding-left: 10px;
		span{
			vertical-align: middle;
		}
		.fl,.fr{
			height: 40px;
			line-height: 40px;
		}
		.amount{
			color:@baseColor;
		}
		.price{
			color:@baseColor;
			font-size: 18px;
		}
		.pay{
			width: 90px;
			height: 100%;
			display: inline-block;
			text-align: center;
			background: @baseColor;
			color:#fff;
			font-size: 18px;
			letter-spacing: 5px;
		}
		input[type=checkbox]:checked + .check-input:after{
			line-height: 22px;
		}
	}
</style>