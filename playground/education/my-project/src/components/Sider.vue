<template>
	<div id="sider_container">
		<router-link class="item"
		v-for="item in sideItems"
		:class="{active:sideType === item.type}"
		:to="item.link"
		v-if="item.type !== 3 || userType === 2">{{item.name}}</router-link>
	</div>
</template>
<script>
	export default{
		name:'sider',
		data(){
			return{
				userType:2,
				sideItems:[{
					type:1,
					link:'/course',
					name:'我的课程'
				},{
					type:2,
					link:'/freetime',
					name:'空余时间'
				},{
					type:3,
					link:'/doc',
					name:'课件中心'
				},{
					type:4,
					link:'/usercenter',
					name:'个人中心'
				}],
				sideType:1
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