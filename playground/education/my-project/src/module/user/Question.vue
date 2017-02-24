<template>
	<div id="question_container" class="user-common-container">
		<ul>
			<a class="question-item"
		v-for="q in questions"
		:href="'./question.html?id='+q.id">{{q.title}}</a>
		</ul>
	</div>
</template>
<script>
	export default{
		name:'question',
		data(){
			return{
				questions:[{
				// 	id:1,
				// 	title:'如何调试麦克风'
				// },{
					id:2,
					title:'在线测试硬件设备'
				}]
			}
		}
	}
</script>
<style scoped lang='less'>
	ul{
		margin: 20px;
	}
	.question-item{
		font-size: 15px;
		color:#656565;
		width: 100%;
		height: 50px;
		line-height: 50px;
		cursor: pointer;
		padding-left: 16px;
		margin-bottom: 1px;
		display: inline-block;
		&:nth-of-type(2n){
			background: #fff6ef;
		}
		&:nth-of-type(2n+1){
			background: #fff4f4;
		}
		&:hover{
			color:#55b7f8;
		}
	}
</style>