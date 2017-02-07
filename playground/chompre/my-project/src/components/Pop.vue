<template>
 	<transition name="fade">
		<div class="pop-container" v-if="pop.show"
		@click="closePop">
			<div class="pop"
			:style="pop.style"
			@click.stop>
				<div class="pop-close"
				@click="closePop">×</div>
				<slot></slot>
			</div>
		</div>
	</transition>
</template>
<script>
	export default{
		name:'pop',
		mounted(){
		},
		methods:{
			closePop(){
				this.pop.show = false;
			}
		},
		watch:{
			'pop.show'(val){
				if(val) {
					this.$nextTick(()=>{
						this.popMounted();
					})
				}
				else this.popReset();
			}
		},
		props:{
			pop:{
				type: Object,
				default: {
					show:false,
					style:''
				}
			},
			popReset:{
				type: Function,
				default: ()=>{}
			},
			popMounted:{
				type: Function,
				default: ()=>{}
			}
		}
	}
</script>
<style lang='less'>
	@baseColor:#d42b1e;
	.pop-container{
		font-size:20px;
		color:#666666;
		letter-spacing:0.4px;
		text-align: center;
		.btn-container{
			display: flex;
			justify-content: space-around;
		}
		.btn{
			background:@baseColor;
			border-radius:4px;
			width:172px;
			height:49px;
			line-height: 49px;
			font-size:24px;
			color:#ffffff;
			letter-spacing:0.48px;
			text-align:center;
			cursor: pointer;
			&.reverse{
				border:1px solid #d3d3d3;
				background: none;
				color:#979797;
			}
		}
	}
</style>
<style lang='less' scoped>
	.pop-container{
		position: fixed;
	    width: 100%;
	    height: 100%;
	    left: 0;
	    top: 0;
	    background: rgba(0, 0, 0, 0.2);
	    z-index: 100;
	    .pop{
	    	background: #fff;
	    	position: absolute;
	    	top:50%;
	    	left: 50%;
	    	transform: translate3d(-50%,-50%,0);
	    	margin:auto;
	    	padding: 50px 120px;
	    	border:1px solid #e7e7e7;
	    	box-shadow:0px 4px 6px 0px rgba(0,0,0,0.25);
	    	.pop-close{
				font-size: 20px;
				position: absolute;
				right: 10px;
				top: 5px;
				cursor: pointer;
				transition: all .5s;
				z-index: 1000;
				color:#5b5b5b;
				display: none;
				&:hover{
					transform:rotate(360deg);
				}
			}
	    }
	}
	.fade-enter-active, .fade-leave-active {
	  transition: opacity .5s
	}
	.fade-enter, .fade-leave-to, .fade-leave-active {
	  opacity: 0
	}
</style>