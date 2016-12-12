<template>
	<div id="line_container">
		<div id="line_inner">
			<div id="line_title"></div>
			<!--line0主要是用来遮住文字的白层-->
			<div id="line0">
				<div class="dot"
				v-for="n in 5"
				:id="'dot'+n"
				:class="{active:dotActive}"></div>
			</div>
			<div id="line">
			</div>
			<div id="line_cover"
			:class="{active:lineCoverActive}"></div>
		</div>
	</div>
</template>
<script>
	export default{
		name:'part5Line',
		data(){
			return {
				dotActive:false,
				lineCoverActive:false
			}
		},
		mounted(){
		},
		computed:{
		},
		watch:{
			animaStart(val){
				this.dotActive = this.lineCoverActive = true;
			}
		},
		props:['animaStart']
	}
</script>
<style scoped lang='less'>
	#line_container{
		width: 100%;
		height: 703px;
		padding-top: .1px;
		#line_inner{
			max-width: 1083px;
			width: 100%;
			height: 500px;
			margin: 124px auto;
			position: relative;
			overflow: hidden;
			#line_title{
				width: 300px;
				height: 70px;
				background: url(../../assets/img/index/line/title.png) no-repeat;
			}
			#line,#line0{
				width: 100%;
				height: 135px;
				background-color:#fff;
				background-image:url(../../assets/img/index/line/line.png);
				background-repeat: no-repeat;
				background-size: 100% 100%;
				position: absolute;
				bottom: 150px;
				left: 0;
				.dot{
					max-width: 218px;
					width:100%;
					height: 64px;
					position: absolute;
					top: 0px;
					transition: all .5s cubic-bezier(.27,-0.05,.29,1.43);
				}
				#dot1{
					background: url(../../assets/img/index/line/01.png);
					left: ~'calc(16.6% - 50px)';
					transition-delay: 1s;
					&.active{
						top:-84px;
					}
				}
				#dot2{
					background: url(../../assets/img/index/line/02.png);
					left: ~'calc(33.2% - 50px)';
					transition-delay: 2s;
					&.active{
						top:144px;
					}
				}
				#dot3{
					background: url(../../assets/img/index/line/03.png);
					left: ~'calc(49.8% - 50px)';
					transition-delay: 3s;
					&.active{
						top:-84px;
					}
				}
				#dot4{
					background: url(../../assets/img/index/line/04.png);
					left: ~'calc(66.4% - 50px)';
					transition-delay: 3.75s;
					&.active{
						top:144px;
					}
				}
				#dot5{
					background: url(../../assets/img/index/line/05.png);
					left: ~'calc(83% - 50px)';
					transition-delay: 4.5s;
					&.active{
						top:-84px;
					}
				}
			}
			#line_cover{
				width: 100%;
				height: 135px;
				background: #fff;
				position: absolute;
				bottom: 150px;
				left: 0;
				transition: all 5s;
				&.active{
					left:100%;
				}
			}
		}
	}
</style>