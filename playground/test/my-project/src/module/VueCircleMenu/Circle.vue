<template>
	<div>
		<CircleMenu type="middle" animate="animated jello" mask='white' circle>
		    <button type="button" slot="item_btn"></button>
		    <a slot="item_1" class="fa fa-twitter fa-lg"></a>
		    <a slot="item_2" class="fa fa-weixin fa-lg"></a>
		    <a slot="item_3" class="fa fa-weibo fa-lg"></a>
		    <a slot="item_4" class="fa fa-github fa-lg"></a>
		  </CircleMenu>
	</div>
</template>
<script>
	import 'animate.css';
	import CircleMenu from 'vue-circle-menu';
	export default{
		name:'vueCircle',
		components:{
			CircleMenu
		}
	}
</script>
<style scoped lang='less'>
	div{
		font-size: 1.07rem;
	}
</style>