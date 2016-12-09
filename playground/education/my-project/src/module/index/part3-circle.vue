<template>
	<div id="circle_container">
		<div id="circle_slogan"></div>
		<div id="circle_inner">
			<div class="item"
			v-for="item in items"
			:class="{animated:item.active, rubberBand:item.active}"
			@mouseenter="addClass(item)"
			@mouseleave="removeClass(item)">{{item.name}}</div>
		</div>
	</div>
</template>
<script>
	export default{
		name:'part3Circle',
		data(){
			return{
				items:[{
				name:'浙大学霸面对面',
				active:false
			},{
				name:'一对一专属辅导',
				active:false
			},{
				name:'个性定制 教学模式',
				active:false
			},{
				name:'线上教学 随时随地',
				active:false
			},{
				name:'数理化专属课堂',
				active:false
			}]
			}
		},
		methods:{
			addClass(item){
				item.active = true;
			},
			removeClass(item){
				item.active = false;
			}
		}
	}
</script>
<style scoped lang='less'>
	#circle_container{
		width: 100%;
		height: 670px;
		padding-top:.1px;
		#circle_slogan{
			width: 554px;
			height: 37px;
			background: url(../../assets/img/index/slogan.png) no-repeat;
			margin: 120px auto 90px auto;
		}
		#circle_inner{
			max-width: 1200px;
			width: 100%;
			height: 300px;
			margin: 0 auto;
			display: flex;
			justify-content: space-between;
			.item{
				width: 170px;
				height: 160px;
				font-size: 20px;
				color:#5c5c5c;
				background-position: top center;
				background-repeat: no-repeat;
				text-align: center;
				padding-top: 150px;
				&:first-child{
					background-image: url(../../assets/img/index/1.png);
				}
				&:nth-child(2){
					background-image: url(../../assets/img/index/2.png);
					margin-top: 80px;
				}
				&:nth-child(3){
					background-image: url(../../assets/img/index/3.png);
					margin-top: 140px;
				}
				&:nth-child(4){
					background-image: url(../../assets/img/index/4.png);
					margin-top: 80px;
				}
				&:nth-child(5){
					background-image: url(../../assets/img/index/5.png);
				}
			}
		}
	}
</style>