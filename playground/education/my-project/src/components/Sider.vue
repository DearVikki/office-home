<template>
	<div id="sider_container">
		<div class="item"
		v-for="item in sideItems"
		:class="{active:sideType === item.type}"
		@click="clickItem(item)"
		v-if="((item.type !== 4 && item.type !== 5) && userType === 0) || ((item.type !== 2 && item.type !== 6)&& userType === 1)">{{item.name}}</div>
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
					link:'course',
					name:'我的课程'
				},{
					type:2,
					link:'buycourse',
					name:'购买课程'
				},{
					type:3,
					link:'freetime',
					name:'空余时间'
				},{
					type:4,
					link:'doc',
					name:'课件中心'
				},
				{
					type:5,
					link:'salary',
					name:'课时结算'
				},
				// {
				// 	// type:6,
					// link:'trial',
					// name:'我的试听课'
				//},
				{
					type:7,
					link:'usercenter',
					name:'个人中心'
				},{
					type:8,
					link:'question',
					name:'注意事项'
				}],
				sideType:1
			}
		},
		mounted(){
			this.userType = JSON.parse(localStorage.getItem('user')).user_type;
			this.highlightNav();
		},
		methods:{
			highlightNav(){
				//要做些什么来匹配对应的nav呢？要自己用location.href取尾数吗？
				for(var i = 0; i<this.sideItems.length; i++){
					if( '#/'+this.sideItems[i].link === location.hash) {
						this.sideType = this.sideItems[i].type;
						return;
					}
				}
				//直接打开时
				if(location.hash === '#/') this.sideType = 1;
				//编辑个人信息时
				else this.sideType = 7;
			},
			clickItem(item){
				this.sideType = item.type;
				this.$router.push(item.link);
			}
		},
		watch:{
			$route(){
				this.highlightNav();
			}
		},
		beforeRouteEnter (to, from, next) {
		    console.log('enter')
		  },
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
			display: block;
			&:hover{
				background:#dae5ec;
			}
			&.active{
				background: @baseColor;
				color:#fff;
			}

		}
	}
</style>