<template>
	<div id="easteregg_go">
		<div class="row" v-for="row in imgs">
			<div class="row1"><img v-for="img in row" :src="img"></div>
			<div class="row2"><img v-for="img in row" :src="img"></div>
		</div>
	</div>
</template>
<script>
	import go1 from '../../assets/img/index/go/go(1).jpg';
	import go2 from '../../assets/img/index/go/go(2).jpg';
	import go3 from '../../assets/img/index/go/go(3).jpg';
	import go4 from '../../assets/img/index/go/go(4).jpg';
	import go5 from '../../assets/img/index/go/go(5).jpg';
	import go6 from '../../assets/img/index/go/go(6).jpg';
	import go7 from '../../assets/img/index/go/go(7).jpg';
	import go8 from '../../assets/img/index/go/go(8).jpg';
	import go9 from '../../assets/img/index/go/go(9).jpg';
	import go10 from '../../assets/img/index/go/go(10).jpg';
	import go11 from '../../assets/img/index/go/go(11).jpg';
	import go12 from '../../assets/img/index/go/go(12).jpg';
	export default{
		name:'easterEggGo',
		data(){
			return{
				imgs:[
				[go1,go2,go3,go4,go5,go6,go7,go8,go9,go10,go11,go12,go1,go2,go3],
				[go1,go2,go3,go4,go5,go6,go7,go8,go9,go10,go11,go12,go1,go2,go3],
				[go1,go2,go3,go4,go5,go6,go7,go8,go9,go10,go11,go12,go1,go2,go3],
				[go1,go2,go3,go4,go5,go6,go7,go8,go9,go10,go11,go12,go1,go2,go3],
				[go1,go2,go3,go4,go5,go6,go7,go8,go9,go10,go11,go12,go1,go2,go3],
				[go1,go2,go3,go4,go5,go6,go7,go8,go9,go10,go11,go12,go1,go2,go3],
				[go1,go2,go3,go4,go5,go6,go7,go8,go9,go10,go11,go12,go1,go2,go3],
				[go1,go2,go3,go4,go5,go6,go7,go8,go9,go10,go11,go12,go1,go2,go3]
				]
			}
		},
		mounted(){
			
		}
	}
</script>
<style lang='less' scoped>
	#easteregg_go{
		position: fixed;
		width: 100%;
		height: 100%;
		overflow: hidden;
		top:0;
		left:0;
		z-index: 100000;
		.row{
			height: 150px;
			white-space: nowrap;
			position: relative;
			.row1,.row2{
				position: absolute;
				left: -2000px;
				top:0;
				width:2000px;
			}
			.row1{
				/*transform: translate3d(-100%,0,0);*/
				animation:goRight linear infinite;
			}
			.row2{
				/*transform: translate3d(-200%,0,0);*/
				animation:goRight linear infinite;
			}
			&:nth-of-type(1),&:nth-of-type(7){
				.row1{
					animation-duration: 8s;
					animation-delay: 3s;
				}
				.row2{
					animation-duration: 8s;
					animation-delay: 7s;
				}
			}
			&:nth-of-type(2),&:nth-of-type(5){
				.row1{
					animation-duration: 16s;
					animation-delay: 1.5s
				}
				.row2{
					animation-duration: 16s;
					animation-delay: 9.5s;
				}
			}
			&:nth-of-type(3),&:nth-of-type(8){
				.row1{
					animation-duration: 17s;
					animation-delay: 0s
				}
				.row2{
					animation-duration: 17s;
					animation-delay: 8.5s;
				}
			}
			&:nth-of-type(4){
				.row1{
					animation-duration: 10s;
					animation-delay: 1s
				}
				.row2{
					animation-duration: 10s;
					animation-delay: 6s;
				}
			}
			&:nth-of-type(6){
				.row1{
					animation-duration: 15s;
					animation-delay: 0s
				}
				.row2{
					animation-duration: 15s;
					animation-delay: 7.5s;
				}
			}
			img{
				margin-left: 33px;
				width: 100px;
				height: 100px;
			}
		}
	}
	@keyframes goRight{
		to{
			left:2000px;
		}
	}
	/*@keyframes goRight1{
		to{
			transform: translate3d(100%,0,0);
		}
	}
	@keyframes goRight2{
		to{
			transform: translate3d(0,0,0);
		}
	}*/
</style>