<template>
	<div @click="toTop"></div>
</template>
<script>
	export default{
		name:'icon-top',
		methods:{
			toTop(){
				let speed = 10;
				let time = 300;
				let run = Math.ceil(time/speed);
				let start = window.scrollY;
				let runLen = start/run;
				let goScroll = setInterval(()=>{
					run--;
					let top = runLen*run;
					window.scrollTo(0,top);
					if(run === 0) clearInterval(goScroll);
				},speed)
			}
		}
	}
</script>
<style scoped>
	div{
		width: 48px;
		height: 48px;
		position: fixed;
		bottom: 100px;
		left: 50%;
		margin-left: 700px;
		background: url(../assets/img/index/icon_top.png);
		cursor: pointer;
		z-index: 5;
	}
</style>