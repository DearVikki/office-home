<template>
	<div id="msg_container">
		<Swipeout>
			<SwipeoutItem :right-menu-width="210" :sensitivity="15"
			v-for="msg in msgs">
				<div slot="right-menu">
					<swipeoutButton  type="primary" :width="remToPx">删除</swipeoutButton>
				</div>
				<a href="./notification-msg.html" class="swipeout-content-inner" slot="content">
					<img :src="msg.img">
					<div class="content-info">
						<p class="c-txt6 ellipsis">{{msg.name}}</p>
						<p class="c-txt3 ellipsis">{{msg.content}}</p>
					</div>
					<div class="content-time">{{msg.time}}</div>
				</a>
			</SwipeoutItem>
		</Swipeout>
	</div>
</template>
<script>
	import img from '../../assets/img/index/icon_personal_pressed.png'
	import { Swipeout, SwipeoutItem, SwipeoutButton } from 'vux'
	export default{
		name:'msg',
		data(){
			return{
				msgs:[{
					img:img,
					name:'楼二狗',
					content:'你好，啦啦啦啦',
					time:'17:32'
				}]
			}
		},
		computed:{
			remToPx(){
				let base = document.querySelector('html').style.fontSize.slice(0,-2);
				return 1.95*base;
			}
		},
		components:{Swipeout, SwipeoutItem, SwipeoutButton}
	}
</script>
<style lang='less'>
	#msg_container{
		font-size: 30px;
		.vux-swipeout-item{
			height: 1.87rem;
			display: block;
		}
		.vux-swipeout-content{
			height: 1.87rem;
		}
		.swipeout-content-inner{
			border-bottom:1px solid #bbb;
			width: 100%;
			height: 100%;
			padding: 0.23rem 0.4rem;
			display: block;
			position:relative;
		}
		.vux-swipeout-button-primary{
			font-size:0.37rem;
			color:#4c4c4c;
			background: #ffe857;
		}
	}
</style>
<style lang='less' scoped>
	.swipeout-content-inner{
		img{
			width:1.41rem;
			height:1.41rem;
			border-radius:100%;
			vertical-align:middle;
		}
		.content-info{
			display:inline-block;
			margin-left:.4rem;
			vertical-align:middle;
			.c-txt6{
				margin-bottom:0.2rem;
				max-width:4rem;
			}
			.c-txt3{
				max-width:6.67rem;
			}
		}
		.content-time{
			font-size:0.32rem;
			color:#999999;
			position:absolute;
			top:0.35rem;
			right:.4rem;
		}
	}
</style>