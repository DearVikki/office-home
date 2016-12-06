<template>
	<div id="sider_container">
		<div class="item"
		v-for="item in sideItems"
		:class="{active:sideType === item.type}"
		v-if="item.type !== 1 || userType === 2">{{item.name}}</div>
	</div>
</template>
<script>
	export default{
		name:'sider',
		data(){
			return{
				userType:1,
				sideItems:[{
					type:1,
					name:'我的课程'
				},{
					type:2,
					name:'空余时间'
				},{
					type:3,
					name:'课件中心'
				},{
					type:4,
					name:'个人中心'
				}],
				sideType:4
			}
		}
	}
</script>
<style scoped lang='less'>
	@baseColor: #55b7f8;
	#sider_container{
		float: left;
		.item{
			width:230px;
			height: 50px;
			line-height: 50px;
			background: #f8f8f8;
			color:#4d4d4d;
			font-size:14px;
			padding-left: 47px;
			cursor: pointer;
			&.active{
				background: @baseColor;
				color:#fff;
			}
		}
	}
</style>