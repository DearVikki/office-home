<template>
	<div>
		<div id="index_header">
			<div id="column">
				<span :class="{active:type}" @click="type = 1">首页</span>
				<span :class="{active:!type}" @click="type = 0">分栏</span>
			</div>
			<div id="index_search"></div>
		</div>
		<!-- 主体 -->
		<homepage v-if="type"></homepage>
		<columnn v-if="!type"></columnn>
		<!-- 1签到 -->
		<div id="index_sign"></div>
		<myfooter></myfooter>
	</div>
</template>
<script>
	import myfooter from '../../components/Footer.vue'
	import homepage from './Homepage.vue'
	import columnn from './Column.vue'
	export default{
		name:'index',
		data(){
			return{
				// 1表示首页 0表示分栏
				type:1
			}
		},
		components:{myfooter,homepage,columnn}
	}
</script>
<style lang='less' scoped>
#index_header{
	width: 100%;
	height: 1.33rem;
	padding: 0.27rem;
	position: relative;
}
#column{
	width: 4rem;
	height: 0.8rem;
	border-radius: 0.13rem;
	border: 0.037rem solid #4c4c4c;
	margin: 0 auto;
	span{
		float: left;
		width: 50%;
		text-align: center;
		height: .73rem;
		line-height: .73rem;
		font-size:0.43rem;
		color:#4c4c4c;
		letter-spacing:0.64px;
		border-radius: .13rem 0 0 .13rem;
		&:nth-of-type(2){
			border-left: 0.04rem solid #4c4c4c;
			border-radius: 0 .13rem .13rem 0;
		}
		&.active{
			background: #ffe857;
		}
	}
}
#index_search{
	position: absolute;
	width: 0.53rem;
	height: 0.6rem;
	background: url(../../assets/img/index/icon_search.png) no-repeat;
	background-size: 100%;
	top:0.4rem;
	right: 0.48rem;
}
#index_sign{
	width: 1.56rem;
	height: 1.56rem;
	position: fixed;
	right: 0.4rem;
	bottom: 1.69rem;
	background: url(../../assets/img/index/icon_qiandao.png) no-repeat;
	background-size: 100% 100%;
}
</style>