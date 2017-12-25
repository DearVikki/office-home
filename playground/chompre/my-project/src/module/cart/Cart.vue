<template>
	<div id="cart_container">
		<h3>{{lang.CART}}</h3>
		<div id="cart_item_container">
			<!-- 商店 -->
			<div class="shop-item"
			v-for="(shop,shopIndex) in carts">
				<!-- 商店标题 -->
				<div class="shop-header">
					<!-- 选择一家店的所有商品 -->
					<label class="common-check-container">
						<input type="checkbox" @change="shopCheck(shop)" :checked="shop.dealer_info.checked">
						<span class="check-input"></span>
					</label>
					<a class="shop-name" :href='"./shop.html?id="+shop.dealer_info.dealer_id'>{{shop.dealer_info.dealer_name}}</a>
				</div>
				<!-- 所含商品 -->
				<div class="goods-item-container">
					<div class="goods-item"
					v-for="(goods,goodsIndex) in shop.goods_info">
						<div class="fl">
							<!-- 选择单件商品 -->
							<label class="common-check-container">
								<input type="checkbox" @change="goodsCheck(shop,goods)" :checked="goods.checked">
								<span class="check-input"></span>
							</label>
							<a :href="'product.html?id='+goods.pre_goods_id+'&ref='+entry">
							<!-- 商品图片 -->
							<img :src="goods.cover_pic">
							<!-- 商品名字 -->
							<div class="goods-name"><div class="goods-name-inner">{{goods.goods_name}}</div></div>
							</a>
							<!-- 商品选择信息 -->
							<div class="goods-des">
								<p v-for="des in goods.description">{{des}}</p>
							</div>
							<!-- 单价 -->
							<div class="goods-price">${{goods.price}}</div>
							<!-- 数量选择框 -->
							<div class="goods-num">
								<numeditor
								:numEditorStyle="numEditorStyle"
								:numEditorClass="numEditorClass"
								:numEditorData="goods.numEditorData"></numeditor>
							</div>
							<!-- 总价 -->
							<div class="goods-total-price">${{goods.price * goods.numEditorData.num}}</div>
						</div>
						<div class="fr">
							<!-- 移入收藏夹/删除 -->
							<div class="edit-container">
								<span @click="collectGoods(shopIndex,goodsIndex)">{{lang.ADD_COLLECT}}</span>
								<span @click="deleteGoodsPop(shopIndex,goodsIndex)">{{lang.DELETE}}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- 总结条 -->
		<div id="conclu_container" v-if="carts.length">
			<!-- 全选 -->
			<div class="fl">
				<label class="common-check-container">
					<input type="checkbox" @change="allCheck" :checked="allchecked">
					<span class="check-input"></span>
					<span class="cp">{{lang.SELECT_ALL}}</span>
				</label>
				<span class="cp" @click="collectMultiGoods" style="margin-left:20px">{{lang.ADD_COLLECT}}</span>
				<span class="cp" @click="deleteMultiGoodsPop" style="margin-left:20px">{{lang.DELETE}}</span>
			</div>
			<div class="fr">
				<span style="margin-right:20px">{{lang.SELECTED}}: <span class="amount">{{goodsArr.length}}</span></span>
				<span style="margin-right:20px" >{{lang.TOTAL}} ({{lang.WITHOUT_DELIVERY}}):<span class="price" style="margin:0 10px">${{totalPrice}}</span></span>
				<span class="pay"
				:class="{disabled:goodsArr.length === 0}"
				@click="pay">{{lang.PAY}}</span>
			</div>
		</div>
		<pop :pop="pop">
			<p class="pop-txt">{{popTxt}}</p>
			<div class="btn-container">
				<div class="btn" @click="confirmDeleteGoods">{{lang.CONFIRM_DELETE}}</div>
				<div class="btn reverse" @click="pop.show = false">{{lang.CLOSE}}</div>
			</div>
		</pop>
		<!-- 缺省页 -->
		<div class="empty-tip" v-if="!carts.length">
			<img src="~assets/img/product/icon_cart_null.png">
			<p>{{lang.CART_EMPTY_TIP}}</p>
		</div>
	</div>
</template>
<script>
	import numeditor from '../../components/NumEditor.vue';
	import pop from '../../components/Pop.vue';
	import lang from '../../assets/js/language.js';
	export default{
		name:'cart',
		data(){
			return{
				carts:[
					// {
		   //              dealer_info: {
		   //                  dealer_id: '',
		   //                  dealer_name: '',
		   //                  checked:false
		   //              },
		   //              goods_info: [
		   //                  {
		   //                      goods_id: '',
		   //                      goods_num: '',
		   //                      pre_goods_id: '',
		   //                      stores: '',
		   //                      description: [],
		   //                      goods_name: '',
		   //                      cover_pic: '',
		   //                      price: '',
		   //                      numEditorData:{
		   //                      	num:1,
		   //                      	max:1,
		   //                      	min:1
		   //                      },
		   //                      checked:false
		   //                  }
		   //              ]
		   //          }
	            ],
	            // 所有已选商品
	            goodsArr:[],
	            // 所有需要删除或收藏的商品id
	            actionGoods:[],
	            allchecked:false,
	            amount:0,
	            price:0,
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
	            pop:{
	            	show:false,
	            	style:{width:'780px',height:'292px'}
	            },
	            popTxt:'确认删除该商品吗？',
	            entry: btoa(JSON.stringify([{name:'Carro', path:location.href}])),
	            lang: lang
			}
		},
		mounted(){
			if(!localStorage.getItem('userInfo')) location.replace('./login.html');
			// 拉取数据
			this.$http.post('', {
				name: 'zl.shopping.sys.shop.cart'
			}).then((response)=>{
				let data = response.body.data.shop_cart_info;
				data.forEach((e)=>{
					e.dealer_info.checked = false;
					e.goods_info.forEach((g)=>{
						g.numEditorData = {
							num: g.goods_num,
							max: g.stores,
							min: 1
						},
						// "xx  xx " => "['xx','xx']"
						g.description = g.description.split(" ").filter((d)=>{return d});
					})
				})
				this.carts = data;
			})
		},
		methods:{
			// 所有被选中的物品 为什么放在computed里时第二家店铺的商品会触发不了computed事件？
			goodsArrFun(){
				let goodsArr = [];
				this.carts.forEach((shop,shopIndex)=>{
					shop.goods_info.forEach((goods,goodsIndex)=>{
						if(goods.checked) {
							// 让goodsIndex以从大到小顺序排列
							goodsArr.unshift({
								shopIndex: shopIndex,
								goodsIndex: goodsIndex
							});
						}
					})
				})
				this.goodsArr = goodsArr;
			},
			// 取消店铺的勾
			shopUncheckFun(shop){
				shop.dealer_info.checked = false;
				shop.goods_info.forEach((e)=>{
					e.checked = false;
					this.allchecked = false;
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
				this.goodsArrFun();
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
				this.goodsArrFun();
			},
			// 全部选中
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
				this.goodsArrFun();
			},
			// 点击删除单件商品
			deleteGoodsPop(shopIndex,goodsIndex){
				this.popTxt = lang.REMOVE_PRODUCT;
				this.actionGoods = [];
				this.actionGoods.push({
					shopIndex: shopIndex,
					goodsIndex: goodsIndex
				});
				this.pop.show = true;
			},
			// 点击删除多件商品
			deleteMultiGoodsPop(){
				this.popTxt = lang.REMOVE_ALL_PRODUCT;
				this.actionGoods = [];
				this.goodsArr.forEach((obj)=>{
					this.actionGoods.push(obj);
				})
				this.pop.show = true;
			},
			// 删除商品
			confirmDeleteGoods(){
				let deleteGoodsId = [];
				this.actionGoods.forEach((obj)=>{
					deleteGoodsId.unshift(this.carts[obj.shopIndex].goods_info[obj.goodsIndex].goods_id);
				})
				this.$http.post('',{
					name:'zl.shopping.sys.del.goods',
					goods_id: deleteGoodsId.toString(),
					is_selected:0
				}).then((response)=>{
					if(response.body.code === 1000) console.log('删除成功');
					this.pop.show = false;
					location.reload();
					this.actionGoods.forEach((obj)=>{
						console.log(obj.shopIndex)
						console.log(this.carts[obj.shopIndex]);
						console.log(obj.goodsIndex)
						console.log(this.carts[obj.shopIndex].goods_info[obj.goodsIndex])
						// this.carts[obj.shopIndex].goods_info.splice(obj.goodsIndex,1);
						// console.log(this.carts[obj.shopIndex].goods_info)
						// 若该店铺无商品 也一并删除店铺
						// if(this.carts[obj.shopIndex].goods_info.length === 0)
						// 	this.carts.splice(obj.shopIndex,1);
					})
				})
			},
			// 点击收藏单价商品
			collectGoods(shopIndex, goodsIndex){
				this.actionGoods = [];
				this.actionGoods.push({
					shopIndex: shopIndex,
					goodsIndex: goodsIndex
				});
				this.confirmCollectGoods();
			},
			// 点击收藏多件商品
			collectMultiGoods(){
				this.actionGoods = [];
				this.goodsArr.forEach((obj)=>{
					this.actionGoods.push(obj);
				});
				this.confirmCollectGoods();
			},
			// 收藏商品的ajax
			confirmCollectGoods(){
				let collectGoodsId = [], collectGoodsForId = [];
				this.actionGoods.forEach((obj)=>{
					collectGoodsId.unshift(this.carts[obj.shopIndex].goods_info[obj.goodsIndex].goods_id);
					collectGoodsForId.unshift(this.carts[obj.shopIndex].goods_info[obj.goodsIndex].pre_goods_id);
				})
				this.$http.post('',{
					name: 'zl.shopping.sys.array.collect',
					for_id: collectGoodsForId.toString(),
					goods_id: collectGoodsId.toString(),
					for_type: 'pre_goods'
				}).then((response)=>{
					if(response.body.code === 1000) console.log('收藏成功');
				})
			},
			// 购物车去结算
			pay(){
				let payGoodsId = [];
				this.goodsArr.forEach((obj)=>{
					payGoodsId.unshift(this.carts[obj.shopIndex].goods_info[obj.goodsIndex].goods_id);
				})
				localStorage.setItem('goodsIdOrder',payGoodsId.toString());
				location = './create-order.html';
			}
		},
		computed:{
			totalPrice(){
				let price = 0;
				this.goodsArr.forEach((obj)=>{
					let goods = this.carts[obj.shopIndex].goods_info[obj.goodsIndex];
					price += goods.numEditorData.num * goods.price;
				})
				return price;
			}
		},
		components:{numeditor,pop}
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
    margin-bottom: 150px;
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
		&:last-of-type{
			margin-bottom:0;
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
						display: -webkit-box;
						-webkit-line-clamp: 3;
						-webkit-box-orient: vertical;
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
					width: 110px;
					span{
						cursor: pointer;
					}
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
		label{
			height: 10px;
			display: inline-block;
			span{
				vertical-align: top;
				display: inline-block;
				line-height: 10px;
			}
		}
		.fl,.fr{
			height: 40px;
			line-height: 40px;
		}
		.amount{
			color:@baseColor;
			vertical-align: 0;
		}
		.price{
			color:@baseColor;
			font-size: 18px;
			vertical-align: top;
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
			vertical-align: top;
			cursor: pointer;
			&.disabled{
				opacity: .5;
				cursor: not-allowed;
			}
		}
		input[type=checkbox]:checked + .check-input:after{
			line-height: 22px;
		}
	}
	/*删除弹窗*/
	.pop-txt{
		margin-top: 30px;
	}
	.btn-container{
		margin-top: 100px;
	}
</style>
