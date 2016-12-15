<template>
	<div class="starmark-container">
		<div class="star"
		v-for="n in 5"
		:class="{active:n<=activeIndex}"
		@click="clickStar(n)"></div>
	</div>
</template>
<script>
	export default{
		name:'starmark',
		data(){
			return{
				activeIndex:0
			}
		},
		methods:{
			clickStar(n){
				this.activeIndex = n;
				this.$emit('markStar',n);
			}
		}
	}
</script>
<style scoped lang='less'>
	@baseColor:#55b7f8;
	.starmark-container{
		display: flex;
		margin:0 auto;
		padding: 5px;
		justify-content: space-around;
		.star{
			width: 20px;
			height: 20px;
			background: url(../assets/img/user/Star_null.png) center no-repeat;
			background-size:100% 100%;
			cursor: pointer;
			&.active{
				background-image: url(../assets/img/user/Star.png);
			}
		}
	}
</style>