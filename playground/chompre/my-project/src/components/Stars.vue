<template>
	<div class="star-container">
		<span v-for="s in activeStar" class="star active"></span>
		<span v-for="s in emptyStar" class="star"></span>
	</div>
</template>
<script>
	export default{
		name:'star',
		computed:{
			activeStar(){
				let s = [];
				for(let i = this.activeNum; i--; i<1){
					s.push('s');
				}
				return s;
			},
			emptyStar(){
				let s = [];
				for(let i = 5 - this.activeNum; i--; i<1){
					s.push('s');
				}
				return s;
			}
		},
		props:{activeNum:{
			default: 5
		}}
	}
</script>
<style scoped lang="less">
	.star-container{
		margin-top: 6px;
		display: inline-block;
	}
	.star{
		width: 18px;
		height: 18px;
		display: inline-block;
		background: url('../assets/img/product/Star_null.png') center no-repeat;
		margin-right: 3px;
		cursor:pointer;
		&.active{
			background-image: url('../assets/img/product/Star.png');
		}
	}
</style>