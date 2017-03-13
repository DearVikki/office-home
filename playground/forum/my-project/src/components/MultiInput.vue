<template>
	<div id="multiinput_container">
		<div class="input-box c-txt2" contenteditable=true @input="input">
		</div>
		<div class="send c-txt2"
		:class="{disabled:!txt}"
		@click="send">发送</div>
	</div>
</template>
<script>
	export default{
		name:'multiinput',
		data(){
			return{
				txt:''
			}
		},
		methods:{
			input(){
				this.txt = document.querySelector('.input-box').innerText;
			},
			send(){
				this.$emit('send',this.txt);
			}
		}
	}
</script>
<style lang='less' scoped>
	#multiinput_container{
			position: fixed;
			left: 0;
			bottom: 0;
			width: 100%;
			padding:0.29rem 0.16rem 0.3rem .4rem;
			border-top:1px solid #d3d3d3;
			background: #f7f7f7;
			z-index: 100;
			/*伪输入框*/
			.input-box{
				width:7.87rem;
				min-height: 0.77rem;
				max-height: 2.3rem;
				overflow: scroll;
				line-height:.5rem;
				padding:.15rem 0.2rem;
				border:1px solid #d3d3d3;
				background:#fff;
				float: left;
				position:relative;
			}
			.send{
				border:1px solid #d3d3d3;
				border-radius:0.05rem;
				width:1.15rem;
				height:0.77rem;
				line-height: .77rem;
				text-align: center;
				position:absolute;
				right:.16rem;
				bottom:.3rem;
				background: #ffe857;
				transition:all .6s;
				&.disabled{
					color:#d3d3d3;
					background:#fff;
				}
			}
	}
</style>