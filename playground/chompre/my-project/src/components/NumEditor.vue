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
		mounted(){
			// 奇怪的是在这里写 刷新网页时不会触发 但是vue热更新时会喔
			this.initial();
		},
		methods:{
			initial(){
				// 库存突然为0
				if(this.numEditorData.max <= this.numEditorData.min) {
					this.numEditorData.min = this.numEditorData.num = this.numEditorData.max;
				}
				// 库存不足
				else if(this.numEditorData.max < this.numEditorData.num) {
					this.numEditorData.num = this.numEditorData.max;
				}
			},
			plus(){
				if(this.numEditorData.num >= this.numEditorData.max) return;
				this.numEditorData.num++;
			},
			minus(){
				if(this.numEditorData.num <= this.numEditorData.min) return;
				this.numEditorData.num--;
			},
			inputNum(){
				// 现在数字：Number(this.numEditorData.num)
				if(isNaN(this.numEditorData.num)) this.numEditorData.num = 1;
				else if(this.numEditorData.num > this.numEditorData.max) this.numEditorData.num = this.numEditorData.max;
        else if(this.numEditorData.num < this.numEditorData.min) this.numEditorData.num = this.numEditorData.min;
        this.numEditorData.num = Math.round(this.numEditorData.num);
			}
		},
		watch:{
			'numEditorData.max'(){
				this.initial();
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
		font-size: 14px;
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
