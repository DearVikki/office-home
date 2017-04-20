<template>
 	<transition name="fade">
		<div class="pop-container" v-if="pop.show"
		@click="closePop">
			<div class="pop"
			:style="pop.style"
			@click.stop>
				<slot></slot>
			</div>
		</div>
	</transition>
</template>
<script>
	export default{
		name:'pop',
		data(){
			return {
				test: 'I can read it from pop.vue.'
			}
		},
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
				else {
					this.popReset();
				}
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
<!-- 哇我当时就这么有先见之明写了个common粗来真是太腻害了！ -->
<style lang='less'>
	@baseColor:#ffe857;
	.pop-container{
		font-size:0.37rem;
		color:#333;
		letter-spacing:0.4px;
		text-align: center;
		position: relative;
		.btn{
			background:@baseColor;
			border-radius:0.08rem;
			width:2.4rem;
			height:0.67rem;
			line-height:0.62rem;
			letter-spacing:0.56px;
			text-align:center;
			border:1px solid #4c4c4c;
			margin:0 auto;
			&.reverse{
				border:1px solid #d3d3d3;
				background: none;
				color:#979797;
			}
			&.disabled{
				background: #e7e7e7;
				color: #fff;
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
	    /*display:flex;*/
	    .pop{
	    	background: #fff;
	    	margin:50% auto;
	    	background:#ffffff;
	    	box-shadow:0 0.03rem 0.11rem 0 rgba(0,0,0,0.36);
	    	border-radius:0.32rem;
	    }
	}
	.fade-enter-active, .fade-leave-active {
	  transition: opacity .5s
	}
	.fade-enter, .fade-leave-to, .fade-leave-active {
	  opacity: 0
	}
</style>