<template>
	<div id="personal_side" class="fl">
		<p class="text">Mi Chompre</p>
		<router-link class="text"
		v-for="item in items"
		:class="{active:activeid === item.id}"
		:to="item.href">
			{{item.name}}
		</router-link>
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
					href:'/order',
					id:1
				},{
					name:'Gestión de direcciones de envío',
					href:'/address',
					id:2
				},{
					name:'Gestión de las Facturas',
					href:'/receipt',
					id:3
				},{
					name:'Cambiar contraseña',
					href:'/pw',
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
		props:['activeid']
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