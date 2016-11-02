<template>
	<div id='header_container'>
		<div id='header_part1'>
			<img src="../assets/img/index/index_logo.png" />
			<div id='header_search_container'>
				<div id='header_search_type'></div>
				<input type="text" :value='value' @input="onInput"/>
				<span id='header_search_btn'></span>
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		name:'myheader',
		props:['value'],
		methods: {
			onInput(event) {
				this.$emit('input', event.target.value)
			}
		}
	}
</script>
<style scoped lang='less'>
	@baseColor: #d42b1e;
	#header_container{
		width: 100%;
		border-bottom: 2px solid @baseColor;
	}
	#header_container_part1{
		max-width: 1200px;
	}
	/*#header_search_container{
		width:100%;
		#header_search_type:{
			max-width:100%;
		};
	}*/
</style>