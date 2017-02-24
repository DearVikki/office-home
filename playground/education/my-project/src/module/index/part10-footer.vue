<template>
	<div id="footer_container">
		<div id="footer_inner">
			<!--<div id="footer_guide">
				<p>名校昇用户指南</p>
				<a href="">支付说明</a><a href="">发票说明</a><a href="">售后说明</a></br>
				<a href="">平台介绍</a><a href="">配送说明</a><a href="">用户协议</a>
			</div>-->
			<div id="footer_copyright">
				<p>Copyright © 2016-  Tada~ All Rights Reserved</p>
				<p>卓邦教育 版权所有</p>
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		name:'part10Footer'
	}
</script>
<style scoped lang='less'>
	#footer_container{
		width: 100%;
		max-width: 1720px;
		margin:0 auto;
		border-top:4px solid #5bb1f4;
		#footer_inner{
			width: 100%;
			max-width: 1170px;
			margin:0 auto;
			#footer_guide{
				>p{
					font-size: 16px;
				    color: #7e7e7e;
				    font-weight: bold;
				    margin: 20px 0;
				}
				a{
					font-size: 12px;
				    color: #b0b0b0;
				    margin: 0 60px 10px 0;
				    display: inline-block;
				}
			}
			#footer_copyright{
				margin: 50px 0 70px 0;
				width: 100%;
				text-align: center;
				font-size: 12px;
				color: #b0b0b0;
			}
		}
	}
</style>