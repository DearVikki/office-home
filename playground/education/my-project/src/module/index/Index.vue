<template>
	<div>
		<!--顶部条与navbar-->
		<part1Header :navActive="navActive"></part1Header>
		<!--banner-->
		<part2Banner></part2Banner>
		<!--教学优势circle-->
		<part3Circle></part3Circle>
		<!--我要试看-->
		<part4Try></part4Try>
		<!--线线培养方案-->
		<part5Line :animaStart="part5Anima"></part5Line>
		<!--翻转部分-->
		<part6Flip></part6Flip>
		<!--教师部分-->
		<part7Teacher></part7Teacher>
		<!--最后一张banner-->
		<part8lastBanner :animaStart="part8Anima"></part8lastBanner>
		<!--关于我们-->
		<part9About></part9About>
		<!--页脚-->
		<part10Footer></part10Footer>
		<!--预约-->
		<part11Book></part11Book>
		<!--侧边条-->
		<part12Side></part12Side>
	</div>
</template>
<script>
	import 'animate.css';
	import part1Header from './part1-header.vue';
	import part2Banner from './part2-banner.vue';
	import part3Circle from './part3-circle.vue';
	import part4Try from './part4-try.vue';
	import part5Line from './part5-line.vue';
	import part6Flip from './part6-flip.vue';
	import part7Teacher from './part7-teacher.vue';
	import part8lastBanner from './part8-lastBanner.vue';
	import part9About from './part9-aboutUs.vue';
	import part10Footer from './part10-footer.vue';
	import part11Book from './part11-book.vue';
	import part12Side from './part12-side.vue';
	export default{
		name:'index',
		data(){
			return{
				navActive:0,
				part5Anima:false,
				part8Anima:false,
				phase:[false,false,false,false,false]
			}
		},
		mounted(){
			window.onscroll = (()=>{
				let top = window.scrollY;
				if(top<600 && !this.phase[0]) {
					//首页
					this.phase = [false,false,false,false,false];
					this.navActive = 0;
					this.phase[0] = true;
				}
				else if((top>600 && top<1390) && !this.phase[1]) {
					//教学优势
					this.phase = [false,false,false,false,false];
					this.navActive = 1;
					this.phase[1] = true;
				}
				else if((top>1390 && top<2490) && !this.phase[2]) {
					//曲线动画
					this.phase = [false,false,false,false,false];
					this.phase[2] = true;
					this.part5Anima = true;
				}
				else if((top>3268 && top<3668) && !this.phase[3]) {
					//教师风采
					this.phase = [false,false,false,false,false];
					this.navActive = 2;
					this.phase[3] = true;
				}
				else if ((top>3668 && top<4122) && !this.phase[4]) {
					this.phase = [false,false,false,false,false];
					//lastBanner动画
					//关于我们
					this.navActive = 3;
					this.phase[4] = true;
					this.part8Anima = true;
				}
			})
		},
		methods:{
		},
		components:{part1Header,part2Banner,part3Circle,
			part4Try,part5Line,part6Flip,part7Teacher,
			part8lastBanner,part9About,part10Footer,
			part11Book,part12Side}
	}
</script>
<style scoped lang='less'>

</style>