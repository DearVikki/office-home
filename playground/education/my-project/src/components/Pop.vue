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
<style lang='less' scoped>
	.pop-container{
		position: fixed;
	    width: 100%;
	    height: 100%;
	    left: 0;
	    top: 0;
	    background: rgba(0, 0, 0, 0.5);
	    z-index: 1000;
	    .pop{
	    	background: #fff;
	    	border-radius: 4px;
	    	position: absolute;
	    	top:50%;
	    	left: 50%;
	    	transform: translate3d(-50%,-50%,0);
	    	margin:auto;
	    	padding: 35px 78px 30px 78px;
	    	box-shadow: 0 0 8px 1px rgba(0,0,0,.3);
	    	.pop-close{
				font-size: 20px;
				position: absolute;
				right: 10px;
				top: 5px;
				cursor: pointer;
				transition: all .5s;
				z-index: 1000;
				color:#5b5b5b;
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