<template>
	<div class="num-editor"
	:style="numEditorStyle.container">
		<span class="minus"
		:class="{disabled:numEditorData.num<=numEditorData.min}"
		:style="numEditorStyle.minus"
		@click="minus">-</span>
		<input
		:class="numEditorClass.input"
		:style="numEditorStyle.input"
		v-model="numEditorData.num"
		@blur="inputNum">
		<span class="plus"
		:class="{disabled:numEditorData.num>=numEditorData.max}"
		:style="numEditorStyle.minus"
		@click="plus">+</span>
	</div>
</template>
<script>
	export default{
		name:'num-editor',
		methods:{
			plus(){
				if(this.numEditorData.num >= this.numEditorData.max) return;
				this.numEditorData.num++;
			},
			minus(){
				if(this.numEditorData.num <= this.numEditorData.min) return;
				this.numEditorData.num--;
			},
			inputNum(){
				console.log(Number(this.numEditorData.num))
				if(isNaN(this.numEditorData.num)) this.numEditorData.num = 1;
				else if(this.numEditorData.num > this.numEditorData.max) this.numEditorData.num = this.numEditorData.max;
				else if(this.numEditorData.num < this.numEditorData.min) this.numEditorData.num = this.numEditorData.min;
			}
		},
		props:['numEditorStyle','numEditorData','numEditorClass']
	}
</script>
<style lang='less' scoped>
	.minus,.plus,input{
		text-align: center;
		vertical-align: middle;
		display: inline-block;
	}
	.minus,.plus{
		cursor: pointer;
	}
	.minus.disabled,.plus.disabled,input.disabled{
		opacity: .5;
		border-style: dashed !important;
		cursor: not-allowed;
	}
</style>