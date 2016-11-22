<template>
	<!--header-->
	<div id='header_container'>
		<div id='header_part1'>
			<img src="../assets/img/index/index_logo.png" />
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
				<input type="text" :value='value' @input="onInput"/>
				<span id='header_search_btn'></span>
			</div>
			<div id='login_container' v-if='!logged'>
				<span id='login'>ingresar</span>
				<span id='signup'>crear cuenta</span>
			</div>
			<div id='name_container' v-if='logged'>DearVikki</div>
		</div>
		<div id='header_part2'>
			<div id='cate_container'>商品分类</div>
			<ul id='user_container'>
				<li>mi chompres</li>
				<li>购物车</li>
				<li>misfavoritos</li>
				<li>我的店铺</li>
			</ul>
		</div>
	</div>
</template>
<script>
	export default{
		name:'myheader',
		data(){
			return{
				logged:false,
				headerDpActive: false,
				searchOptions:{
					Productos: {
					name: 'Productos',
					type: 1,
					active: true
					},
					Tiendas: {
					name: 'Tiendas',
					type: 2,
					active: false
					}
				},
				searchActive:{
					name: 'Productos',
					type: 1
				}
			}
		},
		props:['value'],
		computed:{
		},
		methods: {
			onInput(event) {
				this.$emit('input', event.target.value)
			},
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
				console.log(this.headerDpActive )
			}
		}
	}
</script>
<style scoped lang='less'>
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
			width: 800px;
			height: 35px;
			border:1px solid @baseColor;
			margin-left:45px;
			border-radius: 2px;
			#header_search_type{
				display: inline-block;
				width: 105px;
				height: 34px;
				position: relative;
				border-right:1px solid @baseColor;
				border-bottom: 1px solid @baseColor;
				text-align: center;
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
					border: 5px solid transparent;
					border-top-color: @baseColor;
					right: 5px;
					top:15px;
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
			}
			#header_search_btn{
				width: 44px;
				height:33px;
				float: right;
				background: url(../assets/img/index/index_search.png) center no-repeat;
				background-color: @baseColor;
			}
		}
		#login_container{
			font-size: 12px;
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
			font-size: 12px;
			position: absolute;
			right: 0;
			bottom: 0;
			color: @baseColor;
		}
	}
	#header_part2{
		width:100%;
		max-width: 1200px;
		overflow: hidden;
		margin:42px auto 16px auto;
		font-weight: bold;
		#cate_container{
			font-size: 16px;
			color: @baseColor;
			float: left;
		}
		#user_container{
			float: right;
			li{
				color: @bla;
				font-size: 12px;
				margin-left: 30px;
				display: inline-block;
			}
		}
	}
</style>