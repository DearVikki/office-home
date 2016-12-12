<template>
	<div id="lastBanner">
		<img id="lastBanner_back" src="~assets/img/index/banner3.png">
		<div id="lastBanner_inner">
			<img id="lastBanner_title1" src="~assets/img/index/title1.png"
			:class="{animated:img1, slideInDown:img1}">
			<img id="lastBanner_title2" src="~assets/img/index/title2.png"
			:class="{animated:img2, slideInUp:img2}">
		</div>
	</div>
</template>
<script>
	export default{
		name:'part8lastBanner',
		data(){
			return{
				img1:false,
				img2:false
			}
		},
		mounted(){
		},
		watch:{
			animaStart(){
				this.img1 = true;
				this.img2 = true;
			}
		},
		props:['animaStart']
	}
</script>
<style scoped lang='less'>
	#lastBanner{
		width: 100%;
		position: relative;
		/*background: url(../../assets/img/index/banner3.png) no-repeat;*/
		#lastBanner_back{
			width: 100%;
		}
		#lastBanner_inner{
			position: absolute;
			width: 30.7%;
			left: 20%;
			top: 17.5%;
		}
		#lastBanner_title1{
			width: 60%;
			display: none;
			&.animated{
				display: block;
			}
		}
		#lastBanner_title2{
			width: 100%;
			margin-top: 40px;
			display: none;
			&.animated{
				display: block;
			}
		}
	}
</style>