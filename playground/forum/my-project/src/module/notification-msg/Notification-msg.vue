<template>
	<div>
		<div id="msg_body_container">
			<div class="msg-time">2-20 21:20</div>
			<!-- from他人 -->
			<div class="msg-item type1">
				<div class="msg-item-inner">
					<img class="msg-head" :src="img1">
					<div class="msg-content c-txt2">曾经沧海难为水，除去巫山不是云</div>
				</div>
			</div>
			<!-- from自己 -->
			<div class="msg-item type0">
				<div class="msg-item-inner">
					<div class="msg-content c-txt2">喔</div>
					<img class="msg-head" :src="img2">
				</div>
			</div>
		</div>
		<div id="msg_footer_container">
			<div class="input-box c-txt2">
				<p>{{txt}}</p>
				<input v-model="txt">
			</div>
			<div class="send c-txt2"
			:class="{disabled:!txt}">发送</div>
		</div>
	</div>
</template>
<script>
	import img1 from '../../assets/img/index/icon_personal_pressed.png'
	import img2 from '../../assets/img/index/icon_personal.png'
	export default{
		name:'msg',
		data(){
			return{
				img1:img1,
				img2:img2,
				txt:''
			}
		}
	}
</script>
<style lang='less' scoped>
	@baseColor:#ffe857;
	#msg_body_container{
		padding: .4rem;
		.msg-time{
			font-size:0.32rem;
			color:#999;
			text-align:center;
		}
		.msg-item{
			overflow:hidden;
			margin-top:.4rem;
			.msg-item-inner{
				.msg-head{
					width:1.31rem;
					height:1.31rem;
					border-radius:100%;
				}
				.msg-content{
					max-width:5.7rem;
					padding:.4rem;
					display:inline-block;
					vertical-align:top;
					position:relative;
					&:before{
						content:'';
						border:0.18rem solid transparent;
						position:absolute;
						top:.29rem;
					}
				}
			}
		}
		/*from他人*/
		.msg-item.type1{
			.msg-item-inner{
				float:left;
				.msg-content{
					background:#fff;
					margin-left:0.67rem;
					&:before{
						border-right-color:#fff;
						border-right-width: .23rem;
						left:-.4rem;
					}
				}
			}
		}
		/*from自己*/
		.msg-item.type0{
			.msg-item-inner{
				float:right;
				.msg-content{
					background:@baseColor;
					margin-right:0.67rem;
					&:before{
						border-left-color:@baseColor;
						border-left-width: .23rem;
						right:-.4rem;
					}
				}
			}
		}
	}
	#msg_footer_container{
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		padding:0.29rem 0.16rem 0.3rem .4rem;
		border-top:1px solid #d3d3d3;
		background: #f7f7f7;
		/*伪输入框*/
		.input-box{
			width:7.87rem;
			min-height: 0.77rem;
			max-height: 2.3rem;
			line-height:.5rem;
			padding:.15rem 0.2rem;
			border:1px solid #d3d3d3;
			background:#fff;
			float: left;
			overflow: scroll;
			position:relative;
			p:after{
				content:'|';
				margin-left:0.03rem;
				vertical-align:top;
				font-size:.34rem;
				font-weight:lighter;
				color:#aaa;
				animation:fakeCursor 1.5s infinite;
			}
			input{
				width:100%;
				height:100%;
				opacity:0;
				position:absolute;
				left:0;
				top:0;
			}
		}
		.send{
			border:1px solid #d3d3d3;
			border-radius:0.05rem;
			width:1.15rem;
			height:0.77rem;
			line-height: .77rem;
			text-align: center;
			position:absolute;
			right:.16rem;
			bottom:.3rem;
			background: #ffe857;
			transition:all .6s;
			&.disabled{
				color:#d3d3d3;
				background:#fff;
			}
		}
	}
	@keyframes fakeCursor{
		1%{
			opacity:0;
		}
		50%{
			opacity:0;
		}
		51%{
			opacity:1;
		}
		100%{
			opacity:1;
		}
	}
</style>