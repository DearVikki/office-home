<template>
	<div class="pop-container" v-if="pop.show">
		<div class="pop"
		:style="pop.style">
			<div class="pop-close"
			@click="pop.show = false">×</div>
			<!--<slot @hey="hey"></slot>-->
			<myaudio></myaudio>
		</div>
	</div>
</template>
<script>
	import myaudio from './Audio';
	export default{
		name:'pop',
		methods:{
			hey(){
				console.log('hey')
			}
		},
		props:['pop'],
		components:{myaudio}
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
	    .pop{
	    	background: #fff;
	    	border-radius: 4px;
	    	position: absolute;
	    	top:0;
	    	left: 0;
	    	right: 0;
	    	bottom: 0;
	    	margin:auto;
	    	padding: 20px;
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
</style>