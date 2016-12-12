<template>
	<div id="flip_container">
		<div id="flip_inner">
			<div id="flip_title"></div>
			<div id="flip_main">
				<div class="flip-item"
				v-for="flip in flips">
					<!--翻转区-->
					<div class="flip">
						<div class="front">
							<img :src="flip.front">
						</div>
						<div class="back">
							<img :src="flip.back">
						</div>
					</div>
					<!--线-->
					<div class="flip-line"></div>
					<!--点-->
					<div class="flip-dot"></div>
					<!--文字-->
					<p class="flip-text">{{flip.text}}</p>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import f11 from 'assets/img/index/11.png';
	import f21 from 'assets/img/index/21.png';
	import f12 from 'assets/img/index/12.png';
	import f22 from 'assets/img/index/22.png';
	import f13 from 'assets/img/index/13.png';
	import f23 from 'assets/img/index/23.png';
	import f14 from 'assets/img/index/14.png';
	import f24 from 'assets/img/index/24.png';
	import f15 from 'assets/img/index/15.png';
	import f25 from 'assets/img/index/25.png';
	export default{
		name:'part6Flip',
		data(){
			return{
				flips:[{
					front: f11,
					back: f21,
					text:'听课'
				},{
					front: f12,
					back: f22,
					text:'师资'
				},{
					front: f13,
					back: f23,
					text:'评估'
				},{
					front: f14,
					back: f24,
					text:'学习'
				},{
					front: f15,
					back: f25,
					text:'收费'
				}]
			}
		}
	}
</script>
<style scoped lang='less'>
	#flip_container{
		width: 100%;
		height: 700px;
		padding-top: .1px;
		#flip_inner{
			max-width: 1170px;
			width: 100%;
			margin:20px auto;
			#flip_title{
				max-width: 640px;
				width: 100%;
				height: 134px;
				background: url(../../assets/img/index/flip_title.png) center no-repeat;
				background-size: 100%;
				margin: 0 auto;
			}
			#flip_main{
				width: 100%;
				margin-top:80px;
				.flip-item{
					display: inline-block;
					width: 20%;
					height: 390px;
					/*翻转区*/
					.flip{
						width: 100%;
						height: 269px;
						position: relative;
						perspective: 1000;
    					-webkit-perspective: 1000;
    					-moz-perspective: 1000;
    					transform-style: preserve-3d;
    					transition: 1s;
    					cursor: pointer;
    					&:hover{
    						transform:rotateY(-180deg);
    					}
    					.front,.back{
							width: 100%;
						    backface-visibility: hidden;
						    position: absolute;
						    top: 0;
						    left: 0;
						    img{
						    	width: 100%;
						    }
    					}
    					.front{
						    z-index: 2;
						}
						.back{
						    transform:rotateY(-180deg);
						}

					}
					/*线*/
					.flip-line{
						width: 2px;
						height: 68px;
						margin:-14px auto 0 auto;
					}
					/*点*/
					.flip-dot{
						width: 8px;
						height: 8px;
						border-radius: 100%;
						margin:0 auto;
					}
					/*文字*/
					.flip-text{
						font-size: 42px;
						text-align: center;
					}
					&:first-of-type{
						.flip-line,.flip-dot{
							background: #fcde8b;
						}
						.flip-dot{
							box-shadow: 0px 0px 2px 1px #fcde8b;
						}
						.flip-text{
							color: #fcde8b;
							text-shadow: 0px 0px 10px #fcde8b;
						}
					}
					&:nth-of-type(2){
						.flip-line,.flip-dot{
							background: #fb957c;
						}
						.flip-dot{
							box-shadow: 0px 0px 2px 1px #fdd5cb;
						}
						.flip-text{
							color: #eb7a5e;
							text-shadow: 0px 0px 10px #fdd5cb;
						}
					}
					&:nth-of-type(3){
						.flip-line,.flip-dot{
							background: #abb4ff;
						}
						.flip-dot{
							box-shadow: 0px 0px 2px 1px #dce0ff;
						}
						.flip-text{
							color: #8794ff;
							text-shadow: 0px 0px 10px #dce0ff;
						}
					}
					&:nth-of-type(4){
						.flip-line,.flip-dot{
							background: #71c6ff;
						}
						.flip-dot{
							box-shadow: 0px 0px 2px 1px #c3e7ff;
						}
						.flip-text{
							color: #57b8fa;
							text-shadow: 0px 0px 10px #c3e7ff;
						}
					}
					&:nth-of-type(5){
						.flip-line,.flip-dot{
							background: #6dd9ab;
						}
						.flip-dot{
							box-shadow: 0px 0px 2px 1px #c2efdc;
						}
						.flip-text{
							color: #37d793;
							text-shadow: 0px 0px 10px #c2efdc;
						}
					}
				}
			}
		}
	}
</style>