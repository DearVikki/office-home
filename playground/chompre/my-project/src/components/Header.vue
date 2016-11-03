<template>
	<!--header-->
	<div id='header_container'>
		<div id='header_part1'>
			<img src="../assets/img/index/index_logo.png" />
			<!--搜索框-->
			<div id='header_search_container'>
				<div id='header_search_type'>
					<simpleDropdown id=''>Productos</simpleDropdown>
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
	import SimpleDropdown from './SimpleDropdown'
	export default{
		name:'myheader',
		data(){
			return{
				logged:false
			}
		},
		props:['value'],
		methods: {
			onInput(event) {
				this.$emit('input', event.target.value)
			}
		},
		components:{SimpleDropdown}
	}
</script>
<style scoped lang='less'>
	@baseColor: #d42b1e;
	@backColor: #fff7f7;
	@bla: #5c5c5c;
	#header_container{
		width: 100%;
		border-bottom: 2px solid @baseColor;
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
				width: 82px;
				height: 100%;
				border-right:1px solid @baseColor;
				text-align: center;
				vertical-align: middle;
				color: @baseColor;
				background: @backColor;
			}
			input{
				vertical-align: middle;
				border: none;
				padding-left: 10px;
			}
			#header_search_btn{
				width: 44px;
				height:35px;
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