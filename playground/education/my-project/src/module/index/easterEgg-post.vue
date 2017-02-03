<template>
	<div id="easteregg_post" class="bounceInDown2">
		<img src="~assets/img/index/post.jpg">
	</div>
</template>
<script type="text/javascript">
	export default{
		name:'easterEggPost'
	}
</script>
<style lang='less' scoped>
	#easteregg_post{
		position: fixed;
		top:50%;
		left: 50%;
		margin-top: -220px;
		margin-left: -220px;
		z-index: 1000;
		img{
			box-shadow: 0px 0px 100px 10px yellow;
			animation:postShine 3s infinite;
			border-radius: 30px;
		}
	}
	.bounceInDown2 {
	  animation-name: bounceInDown2;
	  animation-duration: 1s;
	  animation-fill-mode: both;
	}
	@keyframes postShine{
		50%{
			box-shadow: 0px 0px 1px 1px yellow;
		}
		to{
			box-shadow: 0px 0px 100px 10px yellow;
		}
	}
	@keyframes bounceInDown2 {
	  from, 60%, 75%, 90%, to {
	    -webkit-animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
	    animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
	  }

	  0% {
	    opacity: 0;
	    -webkit-transform: translate3d(0, -3000px, 0);
	    transform: translate3d(0, -3000px, 0);
	  }

	  60% {
	    opacity: 1;
	    -webkit-transform: translate3d(0, 25px, 0);
	    transform: translate3d(0, 25px, 0);
	  }

	  70% {
	    -webkit-transform: translate3d(0, -20px, 0);
	    transform: translate3d(0, -10px, 0);
	  }

	  78% {
	    -webkit-transform: translate3d(0, 15px, 0);
	    transform: translate3d(0, -10px, 0);
	  }

	  84% {
	    -webkit-transform: translate3d(0, -10px, 0);
	    transform: translate3d(0, -10px, 0);
	  }

	  90% {
	    -webkit-transform: translate3d(0, 5px, 0);
	    transform: translate3d(0, 5px, 0);
	  }

	  to {
	    -webkit-transform: none;
	    transform: none;
	  }
	}
</style>