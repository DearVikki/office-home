<template>
	<pop :pop="pop">
		<div class="question-item-pop">
			<img class="pop-head" :src="userpop.head">
			<div class="pop-name">
				<span>{{userpop.username}}</span>
				<span class="pop-label" v-if="userpop.label">{{userpop.label}}</span>
			</div>
			<div class="pop-info">
				<div class="pop-info-item">
					<span>积分</span><span>{{userpop.total_integral}}</span>
				</div>
				<div class="pop-info-item">
					<span>回答</span><span>{{userpop.ReplyNum}}</span>
				</div>
				<div class="pop-info-item">
					<span>获赞</span><span>{{userpop.PraiseNum}}</span>
				</div>
			</div>
			<div class="btn">私信</div>
		</div>
	</pop>
</template>
<script>
	import pop from './Pop.vue'
	export default{
		name:'userpop',
		data(){
			return{
				pop:{
					show:false,
					style:{
						width:'7.87rem',
						height:'3.83rem'
					}
				}
			}
		},
		watch:{
			userpopshow(u){
				if(u) this.pop.show = true;
			}
		},
		props:['userpop','userpopshow'],
		components:{pop}
	}
</script>
<style lang='less' scoped>
	.question-item-pop{
		position:relative;
		padding:0.93rem 0 .4rem 0;
		.pop-head{
			position:absolute;
			left:3.07rem;
			top:-0.85rem;
			border:0.05rem solid #ffffff;
			box-shadow:0 0.05rem 0.11rem 0 rgba(0,0,0,0.22);
			width:1.6rem;
			height:1.6rem;
			border-radius:100%;
			background:#fff;
		}
		.pop-name{
			text-align:center;
			font-size:0.37rem;
			color:#333;
			padding-bottom:0.29rem;
			border-bottom:1px solid #d3d3d3;
			span{
				display: inline-block;
				vertical-align: middle;
			}
			.pop-label{
				background:#ffe857;
				border:1px solid #4c4c4c;
				border-radius:100px;
				padding:0 0.07rem;
				margin-left:0.1rem;
				font-size:0.27rem;
			}
		}
		.pop-info{
			padding-top:.29rem;
			margin-bottom:0.38rem;
			display:flex;
			justify-content:space-around;
			font-size:0.32rem;
			color:#999;
			.pop-info-item span:nth-of-type(2){
				color:#333;
				margin-left:0.11rem;
			}
		}
	}
</style>