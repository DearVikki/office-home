<template>
	<div id="book_container">
		<div id="book_inner">
			<img id="book_rocket" src="~assets/img/index/rocket.png">
			<img id="book_title" src="~assets/img/index/title3.png">
			<input placeholder="请输入您的姓名">
			<input placeholder="请输入您的手机">
			<div id="book_btn">
				立即预约
				<div id="book_img_container">
					<img src="~assets/img/index/hand.png">
					<img class="star" src="~assets/img/index/star1.png">
					<img class="star" src="~assets/img/index/star1.png">
					<img class="star" src="~assets/img/index/star1.png">
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		name:"part11Book"
	}
</script>
<style scoped lang='less'>
	#book_container{
		width: 100%;
		padding-top:.1px;
		position: fixed;
		bottom: 0;
		left: 0;
		height: 152px;
		background: rgba(0,0,0,.48);
		z-index: 1000;
		#book_inner{
			width: 100%;
			max-width: 1170px;
			margin:0 auto;
			#book_rocket{
				margin-top: -20px;
			}
			#book_title{
				vertical-align: top;
    			margin-top: 27px;
			}
			input{
				width: 188px;
			    height: 50px;
			    border-radius: 6px;
			    vertical-align: 70px;
			    margin-left: 30px;
			    padding-left: 20px;
			    font-size: 18px;
			    color: #5e5e5e;
			}
			#book_btn{
				display: inline-block;
				width: 188px;
				height: 50px;
				background: #fb7273;
				text-align: center;
				line-height: 50px;
				font-size: 20px;
				color:#fff;
				border-radius: 6px;
				vertical-align: 68px;
				margin-left: 30px;
				position: relative;
				cursor: pointer;
				#book_img_container{
					position: absolute;
					right: -40px;
    				top: 10px;
    				.star{
    					position: absolute;
    					animation: shine 2s infinite;
    					&:nth-of-type(2){
    						top: 0;
    						right: -5px;
    					}
    					&:nth-of-type(3){
    						top: -10px;
    						right: 10px;
    					}
    					&:nth-of-type(4){
    						bottom: 5px;
    						left: 0;
    					}
    				}
				}
			}
		}
	}
	@keyframes shine{
		50%{
			transform:scale(.8);
		}
		100%{
			transform: scale(1.2);
		}
	}
</style>