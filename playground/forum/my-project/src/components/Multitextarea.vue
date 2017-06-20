<template>
	<div id="multiinput_container" @click.stop>
		<textarea ref="textarea" class="c-txt2" v-model="txt" @input="textInput"
		@focus="$emit('sizeChange')">
		</textarea>
		<div class="send c-txt2"
		:class="{disabled:!txt}"
		@click="send">回答</div>
	</div>
</template>
<script>
	export default{
		name:'multitextarea',
		data(){
			return {
				txt:'',
			}
		},
		methods:{
			textInput(){
				this.$refs.textarea.style.height = '2.3rem';
				this.$refs.textarea.style.height = this.$refs.textarea.scrollHeight + 'px';
			},
			send(){
				this.$emit('send',this.txt);
			}
		}
	}
</script>
<style lang='less' scoped>
	#multiinput_container{
		overflow: hidden;
		width: 100%;
		padding:0.29rem 0.16rem 0.3rem .4rem;
		border-top:1px solid #d3d3d3;
		background: #f7f7f7;
		z-index: 100;
		textarea{
			width:7.87rem;
			height: 2.3rem;
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