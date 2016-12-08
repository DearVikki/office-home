<template>
	<div>
		<div>Index</div>
		<div class="swiper-container dhc" style="margin-top:100px">
			<div class="swiper-wrapper">
				<div class="swiper-slide" v-for="i in 7">
					<div class="item">{{i}}</div>
				</div>
			</div>
		</div>
		<div class="part part2" ref="part2"
		:class="{active:tops.part2.active}"></div>
		<div class="part part3" ref="part3"
		></div>
		<div class="part" ref="part4" style="background:purple"
		:class="{active:tops.part4.active}"></div>
		<div class="part" style="background:green"></div>
	</div>
</template>
<script>
	import Swiper from '../../assets/swiper.js';;
	export default{
		name:'index',
		mounted(){
			this.$nextTick(()=>{
				new Swiper('.dhc', {
			        loop:true,
			        spaceBetween:20
			    });
			});
			Object.keys(this.tops).forEach((e)=>{
				console.log(this.$refs[e])
				this.tops[e].top = this.$refs[e].getBoundingClientRect().top;
			})
			window.onscroll = ()=>{
				console.log(window.scrollY);
				Object.keys(this.tops).forEach((e)=>{
					console.log(this.tops[e].top)
					if(window.scrollY >= this.tops[e].top && !this.tops[e].active){
						this.tops[e].active = true;
					}
				})

			}
		},
		data(){
			return{
				tops:{
					part2:{ref:'part2',top:0,active:false},
					part3:{ref:'part3',top:0,active:false},
					part4:{ref:'part4',top:0,active:false}
				}
			}
		},
		computed:{
			windowHeight(){
				return window.innerHeight;
			}
		}
	}
</script>
<style scoped>
	@import '../../assets/swiper.min.css';
	.swiper-container{
		height: 120px;
		background: pink;
	}
	.swiper-slide{
		width: 100px;
		height: 30px;
		line-height: 30px;
		text-align: center;
		background: skyblue;
	}
	.swiper-slide-active {
		background: tomato;
		font-size: 30px;
	}
	.swiper-container.wq{
		height: 300px;
	}
	.part{
		width: 100%;
		height: 400px;
	}
	.part.active{
		background: black;
	}
	.part2{
		background: pink;
	}
	.part3{
		background: skyblue;
	}
</style>