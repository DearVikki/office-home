<template>
	<!--header-->
	<div id='header_container'>
		<div id='header_part1'>
			<a href="./index.html"><img src="../assets/img/index/index_logo.png"></a>
			<!--搜索框-->
			<div id='header_search_container'>
				<div id='header_search_type' @click='clickHeaderType'>
					{{searchActive.name}}
					<div id='header_search_dropdown' v-show='headerDpActive'>
						<div
						v-for="(value, option) in searchOptions"
						class="dropdown-item"
						:class="{active: searchOptions[option].active}"
						@click.stop="clickHeaderDp(searchOptions[option].name)">{{searchOptions[option].name}}</div>
					</div>
				</div>
				<input type="text" v-model="searchKey" @enter="search">
				<span id='header_search_btn' @click="search"></span>
			</div>
			<!--非登录状态-->
			<div id='login_container' v-if='!logged'>
				<a id='login' href="./login.html">{{lang.LOGIN}}</a>
				<a id='signup' href="./signup.html">{{lang.SIGN_UP}}</a>
			</div>
			<!--登录状态-->
			<div id='name_container' v-else>{{nickname}}</div>
			<div id="logout" style="display: none">{{lang.LOGOUT}}</div>
		</div>
		<div id='header_part2'>
			<div id='cate_container'
			@mouseenter='enterLevel0'
			@mouseleave='cateHide'
			>
				{{lang.TYPE}}
				<!--一级分类-->
				<ul id='cate_ul'
				v-show='productTypeActive.status'>
					<li class="cate-item"
					v-for="(value, cate) in productType"
					@mouseenter="enterCate(productType[cate].id)">
						<span>{{productType[cate].name}}</span>
						<!--二级分类-->
						<ul class="subcate-ul" v-show="productType[cate].active">
							<div class="cate-item"
							v-for="subcate in productType[cate].sub">
								<a v-if="subcate.type"
								:href="'./category.html?cate='+subcate.type.cate+'&subcate='+subcate.type.subcate">
									{{subcate.name}}
								</a>
							</div>
						</ul>
					</li>
				</ul>
			</div>
			<ul id='user_container'>
				<li><a :href="logged? './my-chompre.html' : './login.html'">{{lang.MY_CHOMPRE}}</a></li>
				<li><a :href="logged ? './cart.html' : './login.html'">{{lang.CART}}</a></li>
				<li><a :href="logged ? './collect.html': './login.html'">{{lang.FAV}}</a></li>
				<!-- <li>Mitienda</li> -->
			</ul>
			<div class="clear"></div>
		</div>
	</div>
</template>
<script>
	import lang from '../assets/js/language.js';
	export default{
		name:'myheader',
		data(){
			return{
				logged:false,
				nickname:'',
				headerDpActive: false,
				productType:{
					1:{	name: '一级1',
						id: 1,
						active: false,
						sub:[{
							name: 'Chalecos',
							id:12
						},{
							name: 'Tapados'
						},{
							name: 'Chaquedas'
						}]
					}
				},
				productTypeActive:{
					first:'',
					sub:'',
					status: false
				},
				searchKey: '',
				lang: {},
				timeout:''
			}
		},
		methods: {
			clickHeaderType(){
				this.headerDpActive = true;
			},
			clickHeaderDp(name){
				for (var i in this.searchOptions){
					this.searchOptions[i].active = false;
				}
				this.searchOptions[name].active = true;
				this.searchActive.name = name;
				this.searchActive.type = this.searchOptions[name].type;
				this.headerDpActive = false;
			},
			cateHide(){
				this.timeout = setTimeout(()=>{
					this.productTypeActive.status=false;
				},700)
			},
			clearCateHide(){
				clearTimeout(this.timeout);
			},
			enterLevel0(){
				this.clearCateHide();
				this.productTypeActive.status = true;
			},
			enterCate(cateId){
				Object.values(this.productType).forEach((e) => {
					e.active = false;
				})
				this.productType[cateId].active = true;
			},
			clickCate(cate, subcate){
				let ca = {
					id: cate.id,
					name: cate.name
				}
				location.href = './category.html?cate=' + btoa(JSON.stringify(ca)) + '&subcate=' + btoa(JSON.stringify(subcate));
			},
			search(){
				if(!this.searchKey) return;
				// 搜索商品
				if(this.searchActive.type === 1)
					location.href = './category.html?search='+this.searchKey;
				// 搜索店铺
				else location.href = './search-shop.html?search='+this.searchKey;
			},
			logout(){
        alert('hey')
				this.$http.post('',{
					name: 'zl.shopping.sys.pc.login.out'
				}).then((response) => {
					localStorage.removeItem('userInfo');
					location.href = './login.html'
				})
			}
		},
		mounted(){
			this.lang = lang;
			// 是否是登录状态
			this.$http.post('',{
			    name:'zl.shopping.sys.shop.cart'
			}).then((response) => {
			    if(response.body.code === 1004) {
			        this.logged = false;
              localStorage.removeItem('userInfo');
              location.href="./login.html";
			    } else {
			    	this.logged = true;
			    	this.nickname = JSON.parse(localStorage.getItem('userInfo')).nickname;
			    }
			})
			//拉取一级分类
			this.$http.post('',{name:'zl.shopping.sys.category.info'}).then((response)=>{
				let data = response.body.data.CategoryInfo;
				let productType = {};
				//拉取二级分类
				data.forEach((e)=>{
					let cate = {
						id: e.class_id,
						name: e.class_name
					}
					cate = btoa(JSON.stringify(cate));
					productType[e.class_id] = {
						id: e.class_id,
						name: e.class_name,
						active: false,
						sub:[]
					}
					this.$http.post('',{name:'zl.shopping.sys.subcatalog.info', class_id:e.class_id}).then((response)=>{
						response.body.data.forEach((g)=>{
							let subcate  = {
								id: g.class_append_id,
								name: g.class_name
							}
							subcate = btoa(JSON.stringify(subcate));
							productType[e.class_id].sub.push({
								id: g.class_append_id,
								name: g.class_name,
								type: {
									cate,
									subcate
								}
							})
						})
						this.productType = productType;
					})
				})
			})
			//拉取分类结束
		},
		computed:{
			searchOptions(){
				return{
					[this.lang.PRODUCT]: {
						name: this.lang.PRODUCT,
						type: 1,
						active: true
					},
					[this.lang.SHOP]: {
						name: this.lang.SHOP,
						type: 2,
						active: false
					}
				}
			},
			searchActive(){
				return{
					name: this.lang.PRODUCT,
					type: 1
				}
			}
		}
	}
</script>
<style scoped lang='less'>
	@import '../assets/lib/tippy.css';
	@baseColor: #d42b1e;
	@backColor: #fff7f7;
	@bla: #5c5c5c;
	#header_container{
		width: 100%;
		border-bottom: 2px solid @baseColor;
		background: #fff;
	}
	#header_part1{
		width:100%;
		max-width: 1200px;
		margin: 0 auto;
		margin-top: 37px;
		position: relative;
		img{
			vertical-align: middle;
		}
		#header_search_container{
			display: inline-block;
			width: 750px;
			height: 35px;
			border:1px solid @baseColor;
			margin-left:45px;
			border-radius: 2px;
			#header_search_type{
				display: inline-block;
				width: 95px;
				height: 34px;
				position: relative;
				border-right:1px solid @baseColor;
				border-bottom: 1px solid @baseColor;
				text-align: center;
				padding-right: 12px;
				vertical-align: middle;
				color: @baseColor;
				background: @backColor;
				font-size: 12px;
				line-height: 34px;
				cursor: pointer;
				/*小下拉三角*/
				&:after{
					content:'';
					position: absolute;
					border: 4px solid transparent;
					border-top-color: @baseColor;
					right: 8px;
					top:16px;
					z-index: 1;
				};
				#header_search_dropdown{
					position: absolute;
					width: 103%;
					right: -2px;
					top: -2px;
					background: #fff;
					z-index: 2;
					.dropdown-item{
						text-align: right;
						font-size: 12px;
						padding: 0 14px;
						border: 1px solid #eee;
						height: 26px;
						line-height: 26px;
						cursor: pointer;
						position: relative;
						/*下拉菜单的勾*/
						&.active:after{
							content: '\2713';
							color: @baseColor;
							position: absolute;
							top: 0px;
							left: 10px;
							font-weight: bold;
						}
					}
				}
			}
			input{
				vertical-align: middle;
				border: none;
				padding-left: 10px;
				width: 500px;
				height: 30px;
				font-size: 14px;
			}
			#header_search_btn{
				width: 44px;
				height:33px;
				float: right;
				background: url(../assets/img/index/index_search.png) center no-repeat;
				background-color: @baseColor;
				cursor: pointer;
			}
		}
		#login_container{
			font-size: 17px;
			position: absolute;
			right: 0;
			bottom: 0;
			#login{
				color: @baseColor;
				margin-right: 20px;
			}
			#signup{
				color: @bla;
			}
		}
		#name_container{
			font-size: 17px;
			position: absolute;
			right: 0;
			bottom: 0;
			color: @baseColor;
			width: 168px;
			overflow: hidden;
			text-overflow: ellipsis;
		}
		#logout{

		}
	}
	#header_part2{
		width:100%;
		max-width: 1200px;
		margin:42px auto 16px auto;
		margin-bottom: 0;
		font-weight: bold;
		#cate_container{
			font-size: 16px;
			color: #fff;
			background: @baseColor;
			float: left;
			width: 220px;
		    height: 40px;
		    line-height: 40px;
		    padding-left: 10px;
		    border-radius: 4px 4px 0 0;
		    position: relative;
		    /*一级分类ul*/
		    #cate_ul{
		    	position: absolute;
		    	z-index: 3;
			    left: 0;
			    top: 40px;
    			padding-top: 1px;
			    width: 100%;
			    background: #fff;
		    }
		    /*分类条目*/
		    .cate-item{
		    	color: #fff;
				background: @baseColor;
				height: 30px;
				line-height: 30px;
				padding-left: 10px;
				font-weight: normal;
				margin-top: 1px;
				position: relative;
				cursor: pointer;
				/*display: inline-block;会出现莫名白条 为什么?!*/
				float: left;
				width: 100%;
				&:hover{
					background: #a62116;
				}
				&:first-child{
					margin-top:0;
				};
				span,a{
					display: inline-block;
					width: 100%;
					height: 100%;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					color: #fff;
				}
		    }
		    /*二级分类ul*/
		    .subcate-ul{
		    	position: absolute;
			    top: 0;
			    left: 100%;
			    padding-left: 1px;
			    width: 100%;
			    background: #fff;
		    }
		}
		#user_container{
			float: right;
			margin-top: 10px;
			color: @bla;
			li{
				font-size: 14px;
				margin-left: 30px;
				display: inline-block;
			}
			a {
				color: @bla;
			}
		}
	}
</style>
<style lang='less'>
	.tippy-tooltip[data-template-id="#logout"] {
	  cursor: pointer;
	  color: #666 !important;
	}
</style>
