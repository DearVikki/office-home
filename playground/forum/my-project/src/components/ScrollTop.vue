<template>
	<transition name="fade">
		<div id="scroll_top" @click="scrollTop" v-show="show">♥</div>
	</transition>
</template>
<script>
	export default{
		name:'scrollTop',
		data(){
			return {
				show:false,
				top:''
			}
		},
		mounted(){
			window.addEventListener('scroll', this.checkScrollTop, false);
		},
		methods:{
			checkScrollTop(){
				this.show = document.body.scrollTop > 700 ? true : false;
			},
			scrollTop(){
				this.top = document.body.scrollTop;
				this.animaFrame();
			},
			animaFrame(){
				this.top -= 50;
				window.scrollTo(0, top);
				if(top > 0){
				    window.requestAnimationFrame(this.animaFrame);
				}
			}
		}
	}
</script>
<style lang='less' scoped>
	#scroll_top{
		position: fixed;
		right: .5rem;
		bottom: 2rem;
		font-size: 1.5rem;
		color: #F9C13A;
	}
</style>