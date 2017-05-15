<template>
	<div id='footer_container' v-show="show" :class='{onepage: onepage}'>
		<div id='footer_part1'>
			<table>
				<!-- <caption>Chompre用户指南</caption>
				<tr><td>支付说明</td><td>发票说明</td><td>售后说明</td></tr>
				<tr><td>平台介绍</td><td>配送说明</td><td>用户协议</td></tr> -->
				<caption>Guía de Chompre</caption>
				<tr><td>Descripción de pago</td><td>Descripción de factura</td><td>Descripción de venta</td></tr>
				<tr><td>Introducción de Chompre</td><td>Descripción de transporte</td><td>Condiciones de usuario</td></tr>
			</table>
		</div>
		<div id='footer_part2'>
			<!-- 版权所有 -->
			Todos Los Derechos Reservados
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
				if(document.getElementsByTagName('html')[0].getBoundingClientRect().height + 223 <= window.innerHeight) this.onepage = true;
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
		text-align: center;
	}
</style>