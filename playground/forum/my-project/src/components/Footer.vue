<template>
	<div id="footer_container">
		<div id="footer_half"></div>
		<a id="footer_add" href="./ask.html"></a>
		<div id="footer_cover"></div>
		<div id="footer_inner">
			<a class="item" v-for="(item,index) in logos"
			:href="item.href"
			:style="{backgroundImage: type === index ? 'url('+item.labelActive+')' :'url('+item.label+')'}">
				<span class="txt">{{item.txt}}</span>
			</a>
		</div>
	</div>
</template>
<script>
	import icon_index from '../assets/img/index/icon_index.png';
	import icon_index_pressed from '../assets/img/index/icon_index_pressed.png';
	import icon_shop from '../assets/img/index/icon_shop.png';
	import icon_shop_pressed from '../assets/img/index/icon_shop_pressed.png';
	import icon_message from '../assets/img/index/icon_message.png';
	import icon_message_pressed from '../assets/img/index/icon_message_pressed.png';
	import icon_personal from '../assets/img/index/icon_personal.png';
	import icon_personal_pressed from '../assets/img/index/icon_personal_pressed.png';
	export default{
		name:'footer',
		mounted(){
		},
		data(){
			return{
				logos:[{
					label:icon_index,
					labelActive:icon_index_pressed,
					txt:'首页',
					href:'./index.html'
				},{
					label:icon_message,
					labelActive:icon_message_pressed,
					txt:'通知',
					href:'./notification.html#notice'
				},{
					label:'',
					labelActive:'',
					txt:'问我',
					href:'./ask.html'
				},{
					label:icon_shop,
					labelActive:icon_shop_pressed,
					txt:'商城',
					href:'./market.html'
				},{
					label:icon_personal,
					labelActive:icon_personal_pressed,
					txt:'我的',
					href:'./user.html'
				}]
			}
		},
		// type:0首页 1通知 2问我 3商城 4我的
		props:{type:{
			type:Number,
			default:0
		}}
	}
</script>
<style scoped lang='less'>
	#footer_container{
		width: 100%;
		position: fixed;
		bottom: 0;
		left: 0;
		#footer_half{
			width: 1.52rem;
			height: 1.52rem;
			position: absolute;
			left: 4.2rem;
			top: -0.67rem;
			background:#fff;
			box-shadow: 0px 0px 0.2rem 0.03rem rgba(0,0,0,0.4);
			border-radius: 100%;
			z-index: 3;
		}
		#footer_add{
			width: 1.31rem;
			height: 1.31rem;
			background: url(../assets/img/index/add.png) center no-repeat;
			background-size: 0.61rem .61rem;
			background-color: #ffe857;
			margin-bottom: 0.13rem;
			border-radius: 100%;
			position: absolute;
			left: 4.3rem;
			top: -0.57rem;
			z-index: 6;
		}
		#footer_cover{
			top: -.1rem;
			width: 1.48rem;
			height: 0.13rem;
			background: #fff;
			z-index: 5;
			left: 4.22rem;
			position: absolute;
		}
		#footer_inner{
			display:flex;
			justify-content: space-around;
			box-shadow: 0px -0.05rem 0.2rem -0.03rem rgba(0,0,0,0.4);
			background:#fff;
			height: 1.33rem;
			position: relative;
			z-index: 4;
			padding-top: .11rem;
			.item{
				width: 0.72rem;
				height: 1.2rem;
				font-size: 0.27rem;
				color:#4c4c4c;
				letter-spacing:0.4px;
				text-align:center;
				background-size: 100%;
				background-repeat: no-repeat;
				padding-top: 0.73rem;
			}
		}
		
	}
</style>