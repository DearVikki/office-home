<template>
	<div id='container'>
		<!--条件过滤框-->
		<div id="filter_container" class="fl">
			<!--二级分类-->
			<div v-if="types.length">
				<h5>{{cate.name}}</h5>
				<p class="text"
				v-for="type in types"
				:class="{active:type.id===subcate.id}"
				@click="clickSub(type)">{{type.name}}</p>
				<div class="divider"></div>
			</div>
			<!--品牌-->
			<div v-if="brands.length">
				<h5>品牌</h5>
				<label v-for="brand in brands">
					<input type="checkbox"
					:value="brand.brand_id"
					@click="clickBrand(1)">
					<span class="radio-input"></span>
					<!-- 本来这儿是brand name的 -->
					<span class="text">{{brand.brand}}</span>
				</label>
				<div class="divider"></div>
			</div>
			<!--价格区间-->
			<div style="overflow:hidden">
				<h5 style="margin-bottom:10px">价格</h5>
				<input type="text" placeholder="min"
				v-model="filter.min"
				@input="checkPrice">
				<div class="vertical-divider"></div>
				<input type="text" placeholder="max"
				v-model="filter.max"
				@input="checkPrice">
				<span class="text" id="all_price" @click="allPrice">全部价格</span>
				<div id="filter_price" class="fr"
				:class="{active:filterPriceActive}"
				@click="clickPrice">GO</div>
				<div class="divider"></div>
			</div>
			<!--评分区间-->
			<div>
				<h5>评分</h5>
				<label class="star" v-for="star in stars">
					<input name="star" type="radio"
					:value="star.num"
					v-model="filter.star"
					@change="clickStar">
					<span class="radio-input"></span>
					<star :activeNum="star.num"></star>
					<span class="star-size">（{{star.size}}）</span>
				</label>
				<!-- <p class="text">{{filter.star}}</p> -->
				<!-- <span class="text" id="all_stars" @click="clickStar('all')">全部评分</span> -->
			</div>
		</div>
		<!--商品展示框-->
		<div id="display_container" class="fr">
			<div id="display_header">
				<span>共{{items.goods_count}}件商品</span>
				<span v-if="!search">{{cate.name}}/{{subcate.name}}</span>
				<span v-else>{{search}}</span>
				<div class="order-container fr">
					<span style="vertical-align:top">排序方式:</span>
					<div style="display:inline-block; position:relative;">
						<div class="order-header"
						@click="orderShow = !orderShow">{{filter.order.name}}</div>
						<ul v-show="orderShow">
							<li class="order-option"
								v-for="order in orders"
								v-show="order.id !== filter.order.id"
								@click="selectOrder(order)">{{order.name}}
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div id="display_body" v-show="items.goods_list.length">
				<goodsitem :item='item' v-for="item in items.goods_list"></goodsitem>
				<div class="empty-space-filling-item" v-for="n in 3">{{n}}</div>
			</div>
			<pagination v-show="allPage>1"
			:allPage="allPage"
			:reset="pageReset"
			@clickPagination="clickPagination"></pagination>
			<div class="empty-tip" v-show="!items.goods_list.length">
				<img src="~assets/img/product/icon_nothing.png">
				<p>暂无符合条件的商品</p>
			</div>
		</div>
		<icontop></icontop>
	</div>
</template>
<script>
    import {getParameterByName} from '../../assets/js/utils.js';
    import star from '../../components/Stars.vue';
    import goodsitem from '../../components/GoodsItem.vue';
    import icontop from '../../components/ScrollToTop.vue';
    import pagination from '../../components/Pagination.vue';
	export default{
		name:'category',
		data(){
			return{
				search: false,
				subcate: {},
				cate: {},
				types:[],
				brands:[],
				filterPriceActive: false,
				stars:[
				{
					num:5,
					size:0,
					defaultChecked: false,
					checked: false
				},{
					num:4,
					size:0,
					defaultChecked: true,
					checked: false
				},{
					num:3,
					size:0,
					defaultChecked: false,
					checked: false
				},{
					num:2,
					size:0,
					defaultChecked: false,
					checked: false
				},{
					num:1,
					size:0,
					defaultChecked: false,
					checked: false
				}],
				orders:[{
					name:'销量',
					id:2
				},{
					name:'价格从低到高',
					id:3
				},{
					name:'价格从高到低',
					id:4
				}],
				orderShow:false,
				//保存过滤条件的value们
				filter:{
					min:'',
					max:'',
					brand:[],
					star:0,
					order:{
						name:'销量',
						id:2
					}
				},
				items:{
					goods_count:0,
					goods_list:[],
					goods_num:{}
				},
				allPage:1,
				page:1,
				pageReset:1
			}
		},
		mounted(){
			this.search = getParameterByName('search');
			this.subcate = JSON.parse(getParameterByName('subcate'));
			this.cate =  JSON.parse(getParameterByName('cate'));
			if(!this.search){
				this.title = this.cate.name + '-' +this.subcate.name;
				//拉取所有二级分类
				this.$http.post('',{name:'zl.shopping.sys.subcatalog.info', class_id:this.cate.id}).then((response)=>{
					let types = [];
					response.body.data.forEach((e)=>{
						types.push({
							name: e.class_name,
							id: e.class_append_id
						})
					})
					this.types = types;
				})
				//拉取品牌
				this.$http.post('',{name:'zl.shopping.sys.subcatalog.brand',  class_append_id:this.subcate.id}).then((response)=>{
					//如果我不用brand_img的话就还是不会下下来吧？
					this.brands = response.body.data;
				})
			} else document.title = 'search-'+ this.search;
			//拉取该分类下的商品
			this.getProducts();
		},
		methods:{
			//检测价格区间
			checkPrice(){
				let min = this.filter.min;
				let max = this.filter.max;
				if(Number(min) === 'NaN' || Number(max) === 'NaN') return;
				if(Number(min) < 0 || Number(max) < 0) return;
				if(Number(min)<Number(max))
					this.filterPriceActive = true;
				else this.filterPriceActive = false;
			},
			//选择排序方式
			selectOrder(order){
				this.filter.order.name = order.name;
				this.filter.order.id = order.id;
				this.orderShow = false;
				this.getProducts();
			},
			//拉取商品数据
			getProducts(){
				let obj;
				if(!this.search)
					obj = {
						name:'zl.shopping.sys.pc.category.goods',
						class_append_id:this.subcate.id,
						page: this.page,
						type: this.filter.order.id,
						brand_id: this.filter.brand.toString(),
						min_price: this.filter.min||-1,
						max_price: this.filter.max||-1,
						star_num:this.filter.star
					}
				else
					obj = {
						name:'zl.shopping.sys.search.goods',
						search:this.search,
						page: this.page,
						type: this.filter.order.id,
						brand_id: this.filter.brand.toString(),
						min_price: this.filter.min||-1,
						max_price: this.filter.max||-1,
						star_num:this.filter.star,
						limit:20
					}
				this.$http.post('',obj).then((response)=>{
					this.items = response.body.data;
					//总页数
					this.allPage = Math.ceil(response.body.data.goods_count/20);
					//各小星星的size
					let stars = response.body.data.goods_num;
					let starNumArr = [];
					for(var i in stars)
						starNumArr.unshift(stars[i]);
					for(let j = 0; j<5; j++)
						this.stars[j].size = starNumArr[j];
					// 针对search的品牌
					if(this.search) this.brands = response.body.data.brand_info;
				})
			},
			//点击其他二级分类条目
			clickSub(sub){
				let cate = {name:this.cate.name, id:this.cate.id},
					subcate = {name: sub.name, id: sub.id}
				history.pushState({}, '', './category.html?cate='+ JSON.stringify(cate) +'&subcate='+ JSON.stringify(subcate));
				this.cate = cate;
				this.subcate = subcate;
				// 请求页数回到1
				this.page = 1;
				// pagination组件页数回到1
				this.pageReset = Math.random();
				this.getProducts();
			},
			//点击品牌
			clickBrand(id){
				let index = this.filter.brand.indexOf(id);
				// 加入品牌或删除品牌
				if(index === -1) this.filter.brand.push(id);
				else this.filter.brand.splice(index,1);
				this.page = 1;
				this.pageReset = Math.random();
				this.getProducts();
			},
			//点击价格
			clickPrice(){
				if(!this.filterPriceActive) return;
				this.page = 1;
				this.pageReset = Math.random();
				this.getProducts();
			},
			//全部价格
			allPrice(){
				this.filter.min = this.filter.max = '';
				this.page = 1;
				this.pageReset = Math.random();
				this.getProducts();
			},
			//点击星星
			clickStar(a){
				if(a === 'all') this.filter.star = 0;
				this.page = 1;
				this.pageReset = Math.random();
				this.getProducts();
			},
			// 点击某一页
			clickPagination(page){
				this.page = page;
				this.getProducts();
			}
		},
		watch:{
			filter(){
				console.log('filter有变!')
				console.log(this.filter.star)
			}
		},
		components:{star,goodsitem,pagination,icontop}
	}
</script>
<style scoped lang='less'>
	@baseColor: #d42b1e;
	@bla: #d3d3d3;
	#container{
		max-width: 1200px;
		width: 100%;
		margin: 0 auto;
		overflow: hidden;
	}
	/*分类筛选区*/
	#filter_container{
		width: 212px;
		border: 2px solid @bla;
		border-top:none;
		padding: 10px 15px;
		h5{
			font-size: 14px;
			color: #666;
			font-weight: bold;
			margin-top: 5px;
			margin-bottom: 5px;
		}
		.text{
			font-size: 14px;
			color: #666;
			line-height: 22px;
			cursor: pointer;
			&.active{
				color: @baseColor;
			}
			&:hover{
				color: @baseColor;
			}
		}
		.divider{
			width:100%;
			height: 2px;
			background: @bla;
			margin: 10px auto;
		}
		/*伪多/单选框*/
		label{
			display: block;
			&.star{
				margin-top: 6px;
			}
			input[type=checkbox],input[type=radio]{
				display: none;
			}
			.radio-input{
				display: inline-block;
				width:10px;
				height: 10px;
				border: 1px solid @bla;
				margin-right: 6px;
				position: relative;
				cursor: pointer;
			}
			input[type=radio]+.radio-input{
				vertical-align: 4px;
			}
			input[type=checkbox]:checked + .radio-input:after,input[type=radio]:checked + .radio-input:after{
				content: '\2713';
				position:absolute;
				color: @baseColor;
				font-size: 16px;
				top: -8px;
				left: 0;
				font-weight: bold;
			}
		}
		/*价格区间*/
		input[type=text]{
			width: 100%;
			height: 30px;
			padding-left: 10px;
			border: 1px solid @bla;
			border-radius: 2px;
			font-size: 14px;
		}
		.vertical-divider{
			width: 2px;
			height: 16px;
			background: @bla;
			margin: 4px auto;
		}
		#all_price{
			margin-top: 20px;
			cursor: pointer;
			display: inline-block;
		}
		#filter_price{
			width: 36px;
			height: 30px;
			line-height: 30px;
			text-align: center;
			background: @bla;
			color: #fff;
			border-radius: 2px;
			font-size: 14px;
			margin-top:15px;
			&.active{
				background: @baseColor;
				cursor: pointer;
			}
		}
		/*小星星商品数*/
		.star-size{
			color: @baseColor;
			font-size: 14px;
			vertical-align: 3px;
		}
		#all_stars{
			margin-top: 10px;
			cursor: pointer;
			display: inline-block;
		}
	}
	/*商品展示区*/
	#display_container{
		max-width: 960px;
		width:~'calc(100% - 212px)';
		min-height: 1000px;
		#display_header{
			width: 100%;
			height: 38px;
			line-height: 38px;
			border: 1px solid @bla;
			border-top: none;
			border-radius: 4px;
			padding: 0 10px;
			span:first-child{
				color:#666;
				font-size: 14px;
			}
			span:nth-child(2){
				color:@baseColor;
				font-size: 14px;
				margin-left: 60px;
			}
			/*排序方式*/
			.order-container{
				font-size: 12px;
				color: #666;
				position: relative;
				.order-header,.order-option{
					border:2px solid #eee;
					width: 100px;
					height: 25px;
					line-height: 23px;
					padding-left: 5px;
					background: #fff;
					cursor:pointer;
				}
				.order-header{
					display: inline-block;
					position: relative;
					color: @baseColor;
					&:after{
						content:'';
						position: absolute;
						border: 5px solid transparent;
						border-top-color: #979797;
						right: 3px;
						top: 8px;
					}
				}
				ul{
					margin-top:-8px;
					position: absolute;
					top: 40px;
					left: 0;
					.order-option{
						border-top: none;
					}
				}
			}
		}
		#display_body{
			display: flex;
		    width: 100%;
		    flex-flow: row wrap;
		    justify-content: space-between;
		    &:after{
		    	    content: '';
			    	flex: auto;
			}
			.item{
				/*flex-grow: 1;
				max-width: 25%;
				min-width: 20%;*/
			}
			.empty-space-filling-item{
				width: 220px;
				height: 0;
			}
		}
	}
</style>