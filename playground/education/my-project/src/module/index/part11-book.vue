<template>
	<div id="book_container">
		<div id="book_inner">
			<img id="book_rocket" src="~assets/img/index/rocket.png">
			<img id="book_title" src="~assets/img/index/title3.png">
			<input placeholder="请输入您的姓名">
			<input placeholder="请输入您的手机">
			<div id="book_btn">
				立即预约
				<img src="~assets/img/index/hand.png">
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
				img{
					position: absolute;
					right: -40px;
    				top: 10px;
				}
			}
		}
	}
</style>