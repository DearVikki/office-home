<template>
	<div class="dropdown-container"
	@click="optionShow = !optionShow">
		<div class="selected" ref="xxx">{{dropdownData.selected.text}}</div>
		<div class="option-container">
			<div class="option"
			v-show="optionShow"
			v-for="option in dropdownData.options"
			:class="{active:dropdownData.selected.id === option.id}"
			@click.stop="clickOption(option)">{{option.text}}</div>
		</div>
	</div>
</template>
<script>
	export default{
		name:'dropdown',
		data(){
			return{
				optionShow:false
			}
		},
		mounted(){
			document.body.onclick = (e)=>{
				//console.log(e)
			}
		},
		methods:{
			clickOption(option){
				this.dropdownData.selected.id = option.id;
				this.dropdownData.selected.text = option.text;
				this.optionShow = false;
				this.$emit('clickOption',option)
			}
		},
		props:['dropdownData']
	}
</script>
<style scoped lang='less'>
	@baseColor:#55b7f8;
	.dropdown-container{
		width: 100%;
		position: relative;
		height: 30px;
		font-size: 14px;
		cursor: pointer;
		z-index: 100;
		.selected,.option{
			position: relative;
			padding-left: 10px;
			width: 100%;
			background: #fff;
			height: 30px;
			line-height: 30px;
			border:1px solid #dadada;
		}
		.selected{
			border-radius: 2px;
			&:after{
				content:'';
				position: absolute;
				right: 5px;
				top: 10px;
				width: 12px;
				height: 10px;
				background: url(../assets/img/user/path2.png) center no-repeat;
				background-size: 100%;
			}
		}
		.option-container{
			width: 100%;
			position: absolute;
			top: 30px;
			.option{
				border-top: none;
				&.active{
					background: @baseColor;
					color:#fff;
				}
			}
		}
	}
</style>