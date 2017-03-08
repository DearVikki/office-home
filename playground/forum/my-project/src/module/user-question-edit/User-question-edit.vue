<template>
	<div id="question_edit_container">
		<!-- <p class="c-txt5">补充描述：</p> -->
		<textarea class="c-txt4" placeholder="补充描述..."
		v-model="des"></textarea>
		<!-- <p class="c-txt5">增加悬赏：</p> -->
		<input class="c-txt4" placeholder="增加悬赏..."
		v-model="money">
		<p class="c-txt5">当前积分：<span class="red">163874</span></p>
		<div class="c-big-btn" @click="save">发布</div>
	</div>
</template>
<script>
	import {myAlert} from '../../assets/js/utils.js';
	export default{
		name:'questionedit',
		data(){
			return{
				des:'',
				money:''
			}
		},
		methods:{
			save(){
				if(isNaN(this.money)) {
					myAlert('悬赏积分必须为整数喔!');
					this.money = '';
					return;
				}
			}
		},
		components:{}
	}
</script>
<style lang='less' scoped>
	#question_edit_container{
		padding: .4rem;
	}
	textarea,input{
		width: 9.2rem;
		background: #fff;
		border:1px solid #979797;
		border-radius: 0.11rem;
		margin:0 auto;
		display: block;
	}
	textarea{
		height: 4.27rem;
		padding: .4rem;
		margin-bottom: 0.8rem;
	}
	::-webkit-input-placeholder{
		font-size: 0.37rem;
		color:#979797;
	}
	input{
		height: 1.04rem;
		line-height: 1.04rem;
		padding-left:.4rem;
		position: relative;
		margin-bottom: 0.2rem;
	}
	.c-big-btn{
		margin-top: .8rem;
	}
</style>