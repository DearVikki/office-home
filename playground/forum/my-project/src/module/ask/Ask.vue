<template>
	<div>
		<div class="c-line">问题类别
		<select v-model="type">
			<option value=1>生活</option>
			<option value=2>跑腿</option>
		</select>
		</div>
	</div>
</template>
<script>
	export default{
		name:'ask',
		data(){
			return {
				type:1
			}
		},
		mounted(){
		}
	}
</script>
<style lang='less' scoped>
	.c-line{
		font-size: 0.43rem;
		color:#545454;
	}
	select{
		float: right;
		font-size: 0.43rem;
		color:#545454;
		margin-top: 0.35rem;
		border: none;
		appearance: none;
		padding-right:0.48rem;
	}
</style>