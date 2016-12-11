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
	export default{
		name:'part6Flip',
		data(){
			return{
				flips:[{
					front:'../../../static/img/11.png',
					back:'../../../static/img/21.png',
					text:'听课'
				},{
					front:'../../../static/img/12.png',
					back:'../../../static/img/22.png',
					text:'师资'
				},{
					front:'../../../static/img/13.png',
					back:'../../../static/img/23.png',
					text:'评估'
				},{
					front:'../../../static/img/14.png',
					back:'../../../static/img/24.png',
					text:'学习'
				},{
					front:'../../../static/img/15.png',
					back:'../../../static/img/25.png',
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
    					webkit-perspective: 1000;
    					transform-style: preserve-3d;
    					transition: 0.6s;
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