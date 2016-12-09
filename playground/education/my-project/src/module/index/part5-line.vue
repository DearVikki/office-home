<template>
	<div id="line_container">
		<div id="line_inner">
			<div id="line_title"></div>
			<div id="line">
				<div class="dot dot1"></div>
				<div class="dot dot2"></div>
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		name:'part5Line'
	}
</script>
<style scoped lang='less'>
	#line_container{
		width: 100%;
		height: 703px;
		padding-top: .1px;
		#line_inner{
			width: 1083px;
			height: 500px;
			background: pink;
			margin: 124px auto;
			position: relative;
			#line_title{
				width: 300px;
				height: 70px;
				background: url(../../assets/img/index/line/title.png) no-repeat;
			}
			#line{
				width: 100%;
				height: 300px;
				background: skyblue;
				background-image:url(../../assets/img/index/line/line.png);
				background-repeat: no-repeat;
				background-size: 100%;
				position: absolute;
				bottom: 0;
				left: 0;
				.dot{
					width: 218px;
					height: 64px;
					position: absolute;
				}
				.dot1{
					background: url(../../assets/img/index/line/01.png);
				}
			}
		}
	}
</style>