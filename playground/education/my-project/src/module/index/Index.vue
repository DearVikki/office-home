<template>
	<div>
		<!--顶部条与navbar-->
		<part1Header></part1Header>
		<!--banner-->
		<part2Banner></part2Banner>
		<!--教学优势circle-->
		<part3Circle></part3Circle>
		<!--我要试看-->
		<part4Try></part4Try>
		<!--线线培养方案-->
		<part5Line></part5Line>
		<!--翻转部分-->
		<part6Flip></part6Flip>
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
	export default{
		name:'index',
		data(){
			return{
			
			}
		},
		methods:{
			 
		},
		components:{part1Header,part2Banner,part3Circle,
			part4Try,part5Line,part6Flip}
	}
</script>
<style scoped lang='less'>

</style>