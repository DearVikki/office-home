<template>
	<div id="personal_side" class="fl">
		<p class="text">Mi Chompre</p>
		<a class="text"
		v-for="item in items"
		:href="item.href"
		:class="{active:activeId === item.id}">
			{{item.name}}
		</a>
	</div>
</template>
<script>
	export default{
		name:'personalSide',
		data(){
			// 我的订单收货地址管理发票管理修改密码个人信息完善
			return{
					items:[{
					name:'Mis pedidos',
					href:'./order.html',
					id:1
				},{
					name:'Gestión de direcciones de envío',
					href:'./address.html',
					id:2
				},{
					name:'Gestión de las Facturas',
					href:'./receipt.html',
					id:3
				},{
					name:'Cambiar contraseña',
					href:'',
					// href:'./reset-pw.html',
					id:4
				},{
					name:'completa la información',
					href:'',
					// href:'./info.html',
					id:5
				}]
			}
		},
		mounted(){
			if(!localStorage.getItem('userInfo')) location.replace('./login.html');
		},
		props:['activeId']
	}
</script>
<style scoped lang="less">
	@baseColor: #d42b1e;
	@bla: #d3d3d3;
	#personal_side{
		width: 212px;
		border: 2px solid @bla;
		background: #fff;
		padding: 10px;
		.text{
			font-size: 14px;
			color:#666;
			display: block;
			line-height: 25px;
			&.active{
				color: @baseColor;
			}
		}
	}
</style>