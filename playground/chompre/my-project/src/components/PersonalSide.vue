<template>
	<div id="personal_side" class="fl">
		<p class="text">我的Chompres</p>
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
			return{
					items:[{
					name:'我的订单',
					href:'../order.html',
					id:1
				},{
					name:'收货地址管理',
					href:'../address.html',
					id:2
				},{
					name:'发票管理',
					href:'../receipt.html',
					id:3
				},{
					name:'修改密码',
					href:'../reset-pw.html',
					id:4
				},{
					name:'个人安全信息完善',
					href:'../info.html',
					id:5
				}]
			}
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