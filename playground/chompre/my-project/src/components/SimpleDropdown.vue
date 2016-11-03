<template>
	<div id='dropdown_container'>
		<span id='dropdown_header'><slot></slot></span>
		<ul>
			<li>1</li>
			<li>2</li>
			<li>3</li>
		</ul>
	</div>
</template>
<script>
	export default{
		name:'simpledropdown'
	}
</script>
<style scoped lang='less'>
	@baseColor: #d42b1e;
	@backColor: #fff7f7;
	@bla: #5c5c5c;
	#dropdown_container{
		width: 100%;
		height: 100%;
	}
	#dropdown_header{
		display: inline-block;
		width: 100%;
		height: 100%;
		text-align: center;
		color: @baseColor;
		font-size: 10px;
	}
</style>