<template>
	<div class="empty-container">
		{{lang.NO_RESULT_TIP}}
	</div>
</template>
<script>
	import lang from '../assets/js/language.js'
	export default{
		name: 'empty',
		data(){
			return {
				lang: lang
			}
		}
	}
</script>
<style lang='less' scoped>
	.empty-container{
		font-size: 24px;
		color: #ccc;
		position: absolute;
		top: 250px;
		left: 50%;
		transform: translate3d(-50%, 0, 0);
	}
</style>