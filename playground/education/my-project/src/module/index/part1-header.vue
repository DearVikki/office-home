<template>
	<div>
		<!--第一部分注册账号header条-->
		<div id="header_container">
			<div id="header_inner">
				<!--左侧咨询-->
				<div id="header_inner_left">
					<a class="header-left-group" target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=965562425&site=qq&menu=yes">
						<span class="icon icon1"></span>
						<span class="text">QQ咨询</span>
					</a>
					<span class="header-left-group">
						<span class="icon icon2"></span>
						<span class="text">咨询热线: 82882828</span>
					</span>
				</div>
				<!--右侧注册登录-->
				<div id="header_inner_right">
					<span class="btn">注册账号</span>
					<span class="btn reverse">立即登录</span>
				</div>
			</div>
		</div>
		<!--第二部分真正的header条-->
		<div id="big_header_container">
			<div id="big_header_inner">
				<!--左侧logo-->
				<span id="big_header_left"></span>
				<!--右侧navbar-->
				<span id="big_header_right">
					<span class="nav"
					v-for="nav in navs"
					:class="{active:nav.active}"
					@click="clickNav(nav)">{{nav.name}}</span>
				</span>
			</div>
		</div>
	</div>
</template>
<script>
	import {scrollTo} from '../../assets/js/scrollTo.js';
	export default{
		name:'part1Header',
		data(){
			return{
				navs:[{
					name:'首页',
					active:true,
					to:0
				},{
					name:'教学优势',
					active:false,
					to:700
				},{
					name:'名师风采',
					active:false,
					to:3274
				},{
					name:'关于我们',
					active:false,
					to:4122
				}]
			}
		},
		methods:{
			//点击nav
			clickNav(nav){
				this.navs.forEach((e)=>{
					e.active = false;
				})
				nav.active = true;
				scrollTo(nav.to,0);
			}
		},
		watch:{
			navActive(val){
				this.navs.forEach((e)=>{
					e.active = false;
				})
				return this.navs[val].active = true;
			}
		},
		props:['navActive']
	}
</script>
<style scoped lang='less'>
	@baseColor: #55b7f8;
	/*第一部分注册账号header条*/
	#header_container{
		width: 100%;
		height: 80px;
		border-bottom: 1px solid #dadada;
		padding-top: .1px;
		#header_inner{
			max-width: 1196px;
			width: 100%;
			overflow: hidden;
			margin:18px auto 0 auto;
			#header_inner_left{
				float: left;
				.header-left-group{
					span{
						vertical-align: middle;
					}
					.icon{
						display: inline-block;
						width: 45px;
						height: 45px;
						margin-right:10px;
						&.icon1{
							background: url(../../assets/img/index/Share_qq.png) center no-repeat;
						}
						&.icon2{
							background: url(../../assets/img/index/Share_phone.png) center no-repeat;
						}
					}
					.text{
						font-size: 20px;
						color: #8a8a8a;
						margin-right: 36px;
					}
				}
			}
			#header_inner_right{
				float: right;
				.btn{
					font-size: 20px;
					display: inline-block;
					width: 138px;
					height: 42px;
					line-height: 42px;
					&.reverse{
						margin-left: 40px;
					}
				}
			}
		}
	}
	/*第二部分导航栏大header*/
	#big_header_container{
		width: 100%;
		height: 134px;
		padding-top: .1px;
		#big_header_inner{
			max-width: 1196px;
			width: 100%;
			height: 50px;
			margin: 42px auto;
			#big_header_left{
				width: 248px;
				height: 50px;
				background: url(../../assets/img/index/logo.png) center no-repeat;
				float: left;
			}
			#big_header_right{
				height: 50px;
				line-height: 50px;
				display: flex;
				float: right;
				justify-content:flex-end;
				.nav{
					font-size: 24px;
					color: #5c5c5c;
					padding: 5px 10px;
					border-bottom: 2px solid transparent;
					margin-left: 80px;
					cursor: pointer;
					line-height: 38px;
					&.active{
						color: @baseColor;
						border-bottom-color: @baseColor;
					}
				}
			}
		}
	}
</style>