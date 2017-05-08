<template>
	<div id='footer_container' v-show="show" :class='{onepage: onepage}'>
		<div id='footer_part1'>
			<table>
				<caption>Chompre用户指南</caption>
				<tr><td>支付说明</td><td>发票说明</td><td>售后说明</td></tr>
				<tr><td>平台介绍</td><td>配送说明</td><td>用户协议</td></tr>
			</table>
		</div>
		<div id='footer_part2'>
		浙公网安备 110000020055650088号  |  浙ICP证4454333号  |  互联网药品信息服务资格证编号(京)-经营性-2017-0006  |  新出发浙零 字第大120007号互联网出版许可证编号新出网证(浙)字150号  |  出版物经营许可证  |  网络文化经营许可证折网文[2017]2548-448号  |  违法和不良信息举报电话：40061155Copyright © 2016 - 2017 chompre.com 版权所有  |  消费者维权热线：4008066744
		</div>
	</div>
</template>
<script>
	export default{
		name:'myfooter',
		data(){
			return {
				onepage:false,
				show:false
			}
		},
		mounted(){
			setTimeout(() => {
				if(document.getElementsByTagName('html')[0].getBoundingClientRect().height <= window.innerHeight) this.onepage = true;
				this.show = true;
			}, 1000)
		}
	}
</script>
<style scoped lang='less'>
	@baseColor: #d42b1e;
	@backColor: #fff7f7;
	@bla: #5c5c5c;
	#footer_container{
		width: 100%;
		border-top:6px solid @baseColor;
		background: #fff;
		&.onepage{
			position: fixed;
			bottom: 0;
			left: 0;
		}
	}
	#footer_part1{
		width: 100%;
		max-width: 1200px;
		margin:20px auto;
	}
	table{
		caption{
			color: #808080;
			font-size: 16px;
			text-align: left;
			margin-bottom: 30px;
			font-weight: bold;
		}
		td{
			color: @bla;
			font-size: 12px;
			width: 100px;
			padding-bottom: 10px;
		}
	}
	#footer_part2{
		width: 100%;
		max-width: 827px;
		margin:20px auto;
		font-size: 12px;
		color: @bla;
	}
</style>