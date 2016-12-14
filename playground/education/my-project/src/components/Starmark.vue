<template>
	<div class="starmark-container">
		<div class="star"
		v-for="n in 5"
		:class="{active:n<=activeIndex}"
		@click="activeIndex = n"></div>
	</div>
</template>
<script>
	export default{
		name:'starmark',
		data(){
			return{
				activeIndex:0
			}
		}
	}
</script>
<style scoped lang='less'>
	@baseColor:#55b7f8;
	.starmark-container{
		width: 220px;
		display: flex;
		margin:0 auto;
		padding: 5px;
		justify-content: space-around;
		.star{
			width: 20px;
			height: 20px;
			border:1px solid @baseColor;
			cursor: pointer;
			&.active{
				background: @baseColor;
			}
		}
	}
</style>