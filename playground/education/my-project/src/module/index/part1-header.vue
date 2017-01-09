<template>
	<div>
		<!--第一部分注册账号header条-->
		<div id="header_container">
			<div id="header_inner">
				<!--左侧咨询-->
				<div id="header_inner_left">
					<a class="header-left-group" target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=2291908972&site=qq&menu=yes">
						<span class="icon icon1"></span>
						<span class="text">QQ咨询</span>
					</a>
					<span class="header-left-group">
						<span class="icon icon2"></span>
						<span class="text">咨询热线: 13588800203</span>
					</span>
				</div>
				<!--右侧注册登录-->
				<div id="header_inner_right">
					<div v-show="!user.name">
						<a href="./login.html#signup" class="btn">注册账号</a>
						<a href="./login.html#login" class="btn reverse">立即登录</a>
					</div>
					<div class="user-name-container" v-show="user.name"
					@mouseenter="logoutshow = true"
					@mouseleave="logoutshow = false">
						<a href="./user.html" class="user-name">{{user.name}}</a>
						<div class="log-out"
						v-show="logoutshow"
						@click="logout">退出登录</div>
					</div>
				</div>
			</div>
		</div>
		<!--第二部分真正的header条-->
		<div id="big_header_container">
			<div id="big_header_inner">
				<!--左侧logo-->
				<span id="big_header_left"></span>
				<!--右侧三行按钮-->
				<div id="nav_collapse"
				@click="media.navActive = !media.navActive">
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
				</div>
				<!--右侧navbar-->
				<span id="big_header_right"
				:class="{active:media.navActive}">
					<span class="nav"
					v-for="nav in navs"
					:class="{active:nav.active}"
					@click="clickNav(nav)">{{nav.name}}</span>
					<!--<router-link class="nav" to="/syllabus">教学大纲</router-link>-->
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
				user:{
					type:0,
					name:''
				},
				logoutshow:false,
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
				}],
				media:{
					navActive:false
				}
			}
		},
		mounted(){
			this.$http.get('?name=education.sys.islogin').then((response)=>{
				if(response.body.code===1004) return;
				else {
					this.user.type = response.body.data.user_type;
					this.user.name = response.body.data.user_name;
				}
			})
		},
		methods:{
			//点击nav
			clickNav(nav){
				this.navs.forEach((e)=>{
					e.active = false;
				})
				nav.active = true;
				//如果是小窗口须折叠起来
				this.media.navActive = false;
				scrollTo(nav.to,0);
			},
			logout(){
				this.$http.get('?name=education.sys.login.out').then((response)=>{
						localStorage.removeItem('user');
						this.user.type = 0;
						this.user.name = '';
				})
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
		height: 60px;
		border-bottom: 1px solid #dadada;
		padding-top: .1px;
		#header_inner{
			max-width: 1240px;
			width: 100%;
			margin:15px auto 0 auto;
			padding: 0 40px;
			#header_inner_left{
				float: left;
				.header-left-group{
					span{
						vertical-align: middle;
					}
					.icon{
						display: inline-block;
						width: 35px;
						height: 35px;
						margin-right:10px;
						background-size: 100% 100%;
						border-radius: 100%;
						&.icon1{
							background: url(../../assets/img/index/Share_qq.png) center no-repeat;
						}
						&.icon2{
							background: url(../../assets/img/index/Share_phone.png) center no-repeat;
						}
					}
					.text{
						font-size: 16px;
						color: #8a8a8a;
						margin-right: 36px;
					}
				}
			}
			#header_inner_right{
				float: right;
				.btn{
					font-size: 16px;
					display: inline-block;
					width: 110px;
					height: 30px;
					line-height: 30px;
					&.reverse{
						margin-left: 40px;
					}
				}
				.user-name-container{
					position: relative;
					margin-top: 10px;
					height: 50px;
					.user-name{
						color: @baseColor;
						font-size: 14px;
						cursor: pointer;
					}
					.log-out{
						color: @baseColor;
						font-size: 14px;
						border:1px solid @baseColor;
						border-radius: 4px;
						padding: 0 2px;
						text-align: center;
						position: absolute;
						width: 70px;
						display: inline-block;
						top: 25px;
						left: 50%;
						margin-left: -35px;
						background: #fff;
						cursor: pointer;
						&:after{
							content:'';
							width:0;
							height:0;
							border:7px solid transparent;
							border-bottom-color: @baseColor;
							position: absolute;
							top: -14px;
							left: 25px;
						}
						&:before{
							content:'';
							width:0;
							height:0;
							border:6px solid transparent;
							border-bottom-color: #fff;
							position: absolute;
							top: -12px;
							left: 26px;
							z-index: 3;
						}
					}
				}
			}
		}
	}
	/*第二部分导航栏大header*/
	#big_header_container{
		width: 100%;
		padding-top: .1px;
		position: relative;
		#big_header_inner{
			max-width: 1240px;
			width: 100%;
			height: 50px;
			margin: 22px auto;
			padding: 0 40px;
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
					font-size: 18px;
					font-weight: bolder;
					color: #5c5c5c;
					padding: 5px 10px;
					border-bottom: 2px solid transparent;
					margin-left: 30px;
					cursor: pointer;
					line-height: 38px;
					&.active{
						color: @baseColor;
						border-bottom-color: @baseColor;
					}
				}
			}
			/*折叠区*/
			#nav_collapse{
				float: right;
				width: 35px;
				height: 35px;
				text-align: center;
				padding-top:4px;
				cursor: pointer;
				border-radius: 2px;
				margin-top: 10px;
				display: none;
				.icon-bar{
					width: 20px;
					height: 3px;
					background: @baseColor;
					margin-top:5px;
					display: inline-block;
				}
			}
		}
	}
	@media screen and (max-width: 1020px){
		/*qq咨询的字样*/
		#header_container #header_inner #header_inner_left .header-left-group .text{
			display: none;
		}
		/*navbar*/
		#big_header_container #big_header_inner #big_header_right{
			    position: absolute;
			    top: 80px;
			    left: 0;
			    width: 100%;
			    background: #fff;
			    z-index: 10;
			    height: auto;
			    padding: 0 40px;
			    display: none;
		}
		#big_header_container #big_header_inner #big_header_right.active{
			display: block;
		}
		#big_header_container #big_header_inner #big_header_right .nav{
			   	float: none;
			   	display: block;
			   	width: 100%;
			    margin: 0 auto;
    			border-bottom: 1px solid #eee;
    			font-size: 18px;
		}
		#big_header_container #big_header_inner #nav_collapse{
			display: block;
		}
	}
</style>