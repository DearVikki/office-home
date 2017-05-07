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
						:numEditorClass="numEditorClass"
						:numEditorData="numEditorData"></numeditor>
						<span class="name">库存: {{stock}}件</span>
					</div>
				</div>
				<div id="product_select_tip">
					<p v-show="selectTip.show">{{selectTip.msg}}</p>
				</div>
				<!--立即购买与加入购物车-->
				<div class="add" @click="toBuy">立即购买</div>
				<div class="add" @click="toAdd">加入购物车</div>
			</div>
		</div>
		<!--第二部分-->
		<div id="product_part2">
			<!--左侧店铺信息-->
			<div id="product_part2_left_container">
				<div id="shop_name">{{dealer_info.dealer_name}}</div>
				<a class="dealer-info"
				:href=" './shop.html?id=' +dealer_info.dealer_id ">进入店铺</a>
				<div class="dealer-info"
				v-for="(c,i) in dealer_info.connect"
				:title=" 'WHATS APP: ' + c"
				@click="connectShow = true">客服{{i+1}}</div>
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
				v-show="isComment">
					<div id="comment_header">
						<!--全部评价-->
						<label>
							<input name="star" type="radio" checked
							@click="clickStar(0)">
							<span class="radio-input"></span>
							<span class="radio-tip">全部评价</span>
						</label>
						<label v-for="n in 5">
							<input name="star" type="radio" value=n
							@click="clickStar(6-n)">
							<span class="radio-input"></span>
							<span class="radio-tip star">
								<star :activeNum="6-n" :starType=0></star>
							</span>
						</label>
					</div>
					<ul id="comment_main">
						<li class="comment-item"
						v-for="comment in comment.comment_info">
							<div class="commemt-part1">
								<star :activeNum=comment.star_num></star>
								<span class="fr comment-user">{{comment.comment_user_nickname}}</span>
								<!-- 评论内容 -->
								<p class="comment-content">{{comment.content}}</p>
								<!-- 评论图片 -->
								<div class="comment-img-container"
								v-if="comment.is_picture">
									<img class="comment-small-img"
									v-for="(pic,index) in comment.comment_pic"
									:class="{active:comment.active_pic === index}"
									:src="pic"
									@click="clickCommentImg(comment,index)">
									<div class="comment-big-img"
									v-show="comment.active_pic!==-1">
										<p>{{comment.active_pic}}</p>
										<img :src="comment.comment_pic[comment.active_pic]">
									</div>
								</div>
								<!-- 评论回复 -->
								<div class="comment-reply-container"
								v-if="comment.is_reply">
									商家回复：{{comment.reply_comment.content}}
								</div>
								<!-- 评论时间 -->
								<div class="comment-time">{{comment.time}}</div>
							</div>
						</li>
					</ul>
					<!-- 页码 -->
					<pagination
					v-show="comment.allPage>1"
					:allPage="comment.allPage"
					:reset="comment.resetPage"
					@clickPagination="clickPagination"></pagination>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
    import {getParameterByName,timestamp} from '../../assets/js/utils.js';
    import numeditor from '../../components/NumEditor.vue';
    import star from '../../components/Stars.vue';
    import pagination from '../../components/Pagination.vue';
	export default{
		name:'product',
		data(){
			return {
				connectShow: false,
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
				numEditorClass:{
					input:[]
				},
				numEditorData:{
					num:1,
					max:5,
					min:1
				},
				//选择提示
				selectTip:{
					show:false,
					msg:''
				},
				//有无点开商品评价（默认false）
				isComment:false,
				//商品详情の大图
				detail_pic:[],
				//评论部分
				comment:{
					star_num:0,
					page:1,
					allPage:0,
					resetPage:1,
					comment_info:[
						{
		                comment_id: "151",
		                user_id: "100093",
		                content: "这是一件好好好好好好好好好好好产品",
		                comment_pic: [
		                    "http://121.40.91.157/shopping/php/assets/test/3.jpg","http://121.40.91.157/shopping/php/assets/test/3.jpg"
		                ],
		                star_num: 1,
		                time: timestamp(1477627108),
		                is_reply: 1,
		                comment_user_nickname: "9**************m",
		                comment_user_head: "http://121.40.91.157/upload/pic/default_avatar_rectangle-1.jpg",
		                is_picture: 1,
		                reply_comment: {
		                    content: "哈哈哈哈"
		                },
		                active_pic:-1
		            },{
		                comment_id: "151",
		                user_id: "100093",
		                content: "这是一件好好好好好好好好好好好产品",
		                comment_pic: [
		                    "http://121.40.91.157/shopping/php/assets/test/3.jpg","http://121.40.91.157/shopping/php/assets/test/3.jpg"
		                ],
		                star_num: 1,
		                time: timestamp(1477627108),
		                is_reply: 1,
		                comment_user_nickname: "9**************m",
		                comment_user_head: "http://121.40.91.157/upload/pic/default_avatar_rectangle-1.jpg",
		                is_picture: 1,
		                reply_comment: {
		                    content: "哈哈哈哈"
		                },
		                active_pic:-1
		            }]
				}
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
			//拉取商品评论
			this.getComment();
		},
		methods:{
			//检测是否所有选项都已选择
			checkAttr(){
				let allSelect = true;
				let idArray = [];
				this.attribute_info.forEach((e)=>{
					if(!e.id) {
						allSelect = false;
						return;
					} else idArray.push(e.id);
				})
				if(!allSelect) return false;
				else return idArray;
			},
			//选择商品属性
			selectAttr(s,id){
				s.id = id;
				this.selectTip.show = false;
				let idArray = this.checkAttr();
				if(!idArray) return;
				//发送商品详细属性 获得对应图片库存
				this.$http.post('',{name:'zl.shopping.sys.goods.detail',
					pre_goods_id:this.pre_goods_id,
					attribute:idArray.sort().toString()}).
				then((response)=>{
					this.activeImg = -1;
					this.goods_info = response.body.data.goods_info;
					this.stock = response.body.data.goods_info.stores;
					this.numEditorData.max = this.stock;
				})
			},
			//立即购买or加入购物车前的检测
			beforeBuy(){
				let idArray = this.checkAttr();
				if(!idArray) {
					this.selectTip.show = true;
					this.selectTip.msg = '请选择商品属性';
					return false;
				}
				if(this.numEditorData.num === 0){
					this.selectTip.show = true;
					this.selectTip.msg = '商品暂无库存';
					return false;
				}
				return true;
			},
			//立即购买
			toBuy(){
				if(!this.beforeBuy()) return;
			},
			//加入购物车
			toAdd(){
				if(!this.beforeBuy()) return;
				this.$http.post('',{
					name:'zl.shopping.sys.add.goods',
					goods_id: this.goods_info.goods_id,
					goods_num: this.numEditorData.num
			}).then((response)=>{
				console.log('加入购物车成功')
			})
			},
			//点击小星星
			clickStar(n){
				this.comment.star_num = n;
				this.getComment();
			},
			//拉取商品评论
			getComment(){
				let data = {
					name: 'zl.shopping.sys.goods.comment',
					pre_goods_id: this.pre_goods_id,
					star_num:this.comment.star_num,
					page:this.comment.page
				}
				this.$http.post('',data).then((response)=>{
					// 清空当页评论数据
					this.comment.comment_info = [];
					this.comment.allPage = Math.ceil(response.body.data.comment_num/10);
					//console.log(this.allPage)
					response.body.data.comment_info.forEach((e)=>{
						e.time = timestamp(e.time);
						e.active_pic = -1;
						this.comment.comment_info.push(e);
						// 视窗滚到评论区
						document.querySelector('#product_part2').scrollIntoView();
					})
				})
			},
			//点击评论图片
			clickCommentImg(comment,index){
				if(comment.active_pic ===index) comment.active_pic = -1;
				else comment.active_pic = index;
				console.log(comment.active_pic)
			},
			// 点击评论跳页
			clickPagination(page){
				this.comment.page = page;
				this.getComment();
			}
		},
		watch:{
			['numEditorData.max'](){
				if(this.numEditorData.num === 0) {
					this.numEditorData.num = 1;
					this.numEditorClass.input = [];}
				if(this.numEditorData.num > this.numEditorData.max) this.numEditorData.num = this.numEditorData.max;
				if(this.numEditorData.num === 0) this.numEditorClass.input = ['disabled'];
			}
		},
		components:{numeditor,star,pagination}
	}
</script>
<style scoped lang='less'>
	@baseColor: #d42b1e;
	@bla: #666;
	#product_container{
		width: 1200px;
		margin: 0 auto;
		margin-bottom: 40px;
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
			/*选择部分的提示*/
			#product_select_tip{
				color: @baseColor;
				font-size: 14px;
				margin-top: 10px;
				width: 100%;
				height: 19px;
			}
			/*立即购买与加入购物车*/
			.add{
				padding: 10px 20px;
				background: @baseColor;
				display: inline-block;
				font-size: 18px;
				color:#fff;
				margin-top:30px;
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
			/*商品详情/商品评价navbar*/
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
			/*评价部分*/
			#comment_container{
				width: 100%;
				/*选择星星部分*/
				#comment_header{
					width: 100%;
					height: 40px;
					line-height: 40px;
					border-bottom: 1px solid #cbcbcb;
					label{
						margin-right: 15px;
						input{
							display: none;
						}
						.radio-input{
							width: 12px;
							height: 12px;
							border-radius:100%;
							border:1px solid #cbcbcb;
							display: inline-block;
							vertical-align: middle;
							margin-right: 5px;
							cursor: pointer;
							position: relative;
						}
						input:checked+.radio-input{
							background: @baseColor;
							border-color: @baseColor;
							&:after{
								content:'';
								width:4px;
								height: 4px;
								border-radius: 100%;
								background: #fff;
								position: absolute;
								left: 50%;
								top: 50%;
								transform: translate3d(-50%,-50%,0);
							}
						}
						.radio-tip{
							font-size: 12px;
							color: @baseColor;
							vertical-align: middle;
							cursor: pointer;
							&.star{
								padding-top: 3px;
								display: inline-block;
							}
						}
					}
				}
				/*评论主体*/
				#comment_main{
					.comment-item{
						padding: 10px 15px;
						border-bottom:1px dashed #cbcbcb;
						.comment-user{
							font-size: 12px;
							color: #5c5c5c;
						}
						.comment-content{
							font-size: 12px;
							color:#808080;
							margin-top: 10px;
						}
						/*评论图片*/
						.comment-img-container{
							margin-top: 10px;
							.comment-small-img{
								width: 50px;
								height: 50px;
								border:1px solid transparent;
								margin-right: 5px;
								cursor: pointer;
								&:hover{
									border-color: #d2554b;
								}
								&.active{
									border-color: @baseColor;
								}
							}
							.comment-big-img{
								margin-top: 5px;
								img{
									width: 250px;
									height: 250px;
								}
							}
						}
						/*商家评论*/
						.comment-reply-container{
							width: 700px;
							background: #f0f1f2;
							font-size: 12px;
							color:#858585;
							padding: 12px 28px;
							border-radius: 4px;
							position: relative;
							margin-top: 15px;
							&:before{
								content:'';
								position: absolute;
								border:5px solid transparent;
								border-width: 7px 8px;
								border-bottom-color: #f0f1f2;
								left: 20px;
								top:-13px;
							}
						}
						/*评论时间*/
						.comment-time{
							font-size: 12px;
							color:#b0b0b0;
							margin-top:6px;
						}
					}
				}
			}
		}
	}
</style>