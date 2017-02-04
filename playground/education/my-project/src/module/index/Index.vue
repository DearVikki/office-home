<template>
	<div>
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
		<!-- <part7Teacher></part7Teacher> -->
		<!--最后一张banner-->
		<part8lastBanner :animaStart="part8Anima"></part8lastBanner>
		<!--关于我们-->
		<part9About></part9About>
		<!--预约-->
		<part11Book></part11Book>
		<!--侧边条-->
		<part12Side></part12Side>
		<!-- 爆炸彩蛋 -->
		<easterEggBoom v-if="easterEggBoom"></easterEggBoom>
		<!-- 鸡年大吉彩蛋 -->
		<easterEggPost v-if="easterEggPost"></easterEggPost>
		<!-- 我们走彩蛋 -->
		<easterEggGo v-if="easterEggGo"></easterEggGo>
	</div>
</template>
<script>
	import 'animate.css';
	import part2Banner from './part2-banner.vue';
	import part3Circle from './part3-circle.vue';
	import part4Try from './part4-try.vue';
	import part5Line from './part5-line.vue';
	import part6Flip from './part6-flip.vue';
	import part7Teacher from './part7-teacher.vue';
	import part8lastBanner from './part8-lastBanner.vue';
	import part9About from './part9-aboutUs.vue';
	import part11Book from './part11-book.vue';
	import part12Side from './part12-side.vue';
	import easterEggBoom from './easterEgg-boom.vue';
	import easterEggPost from './easterEgg-post.vue';
	import easterEggGo from './easterEgg-go.vue';
	import Bus from '../../assets/js/bus.js';
	export default{
		name:'index',
		data(){
			return{
				navActive:0,
				part5Anima:false,
				part8Anima:false,
				phase:[false,false,false,false,false],
				easterEggBoom:false,
				easterEggPost:false,
				easterEggGo:false
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
				// else if ((top>3668 && top<4122) && !this.phase[4]) {
				else if ((top>2700 && top<4122) && !this.phase[4]) {
					this.phase = [false,false,false,false,false];
					//lastBanner动画
					//关于我们
					this.navActive = 3;
					this.phase[4] = true;
					this.part8Anima = true;
				}
			})
			//加入bus
			Bus.$on('easterEgg1', text => {
				document.querySelector('#big_header_left').classList.add('animated');
				document.querySelector('#big_header_left').classList.add('hinge');
				// document.querySelector('#big_header_left').classList.add('easterEgg1-1');
				// setTimeout(()=>{
				// 	document.querySelector('#big_header_left').classList.add('easterEgg1-2');
				// },1000)
				// setTimeout(()=>{
				// 	document.querySelector('#big_header_left').style.display = 'none';
				// },1500)
			})
			Bus.$on('easterEgg2', text => {
				this.easterEggBoom = true;
			})
			Bus.$on('easterEgg3', text => {
				this.easterEggPost = true;
			})
			Bus.$on('easterEgg5', text => {
				this.easterEggGo = true;
			})
		},
		methods:{
		},
		components:{part2Banner,part3Circle,
			part4Try,part5Line,part6Flip,part7Teacher,
			part8lastBanner,part9About,
			part11Book,part12Side,
			easterEggBoom,easterEggPost,easterEggGo}
	}
</script>
<style scoped lang='less'>

</style>