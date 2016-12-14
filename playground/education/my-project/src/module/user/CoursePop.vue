<template>
	<div id="coursepop_container">
		<div id="pop_container">
			<div class="close">×</div>
		</div>
	</div>
</template>
<script>
	export default{
		name:'coursepop'
	}
</script>
<style scoped lang='less'>
	#coursepop_container{
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		display: flex;
		background: rgba(0,0,0,.5);
	}
	#pop_container{
		width:420px;
		height: 300px;
		background: #fff;
		margin:auto;
		box-shadow: 0px 0px 8px 1px rgba(0,0,0,0.3);
		border-radius: 2px;
		position: relative;
		.close{
			font-size: 20px;
			position: absolute;
			right: 10px;
			top: 3px;
			cursor: pointer;
			&:hover{
				
			}
		}
	}
</style>