<template>
	<div class='dropdown_container'>
	<!-- 啊怎么让一个Class的name与另一个是否显示出的class共存啊 -->
		<span class='dropdown_header'
		:style='sDropdown.headerStyle'
		:class="sDropdown.headerClass"
		@click='dropdownActive=!dropdownActive'>{{sDropdown.title}}</span>
		<ul v-show='dropdownActive'>
		<!-- 这里也要再加一个active class的… -->
			<li class="dropdown-item"
			:style='sDropdown.optionStyle'
			:class="sDropdown.optionClass"
			v-for='option in sDropdown.options'
			v-show='!option.selected || sDropdown.type'              
			@click='clickOption(option)'>{{option.name}}
			</li>
		</ul>
	</div>
</template>
<script>
	export default{
		name:'simpledropdown',
		data(){
			return{
				dropdownActive:false
			}
		},
		mounted(){
			this.sDropdown.options.forEach((e)=>{
					e.selected = false;
					if(e.value === this.sDropdown.selectedValue) {
						this.sDropdown.title = e.name;
						e.selected = true;
					} else e.selected = false;
				})
		},
		methods:{
			clickOption(option){
				this.sDropdown.options.forEach((e)=>{
					e.selected = false;
				})
				option.selected = true;
				this.sDropdown.title = option.name;
				this.sDropdown.selectedValue = option.value;
				this.dropdownActive = false;
			}
		},
		computed:{
			options(){
				let o = [];
				return o;
			},
			headerClass(){
				return {
					'custom-classname?': true,
					up: false,
					down: true
				}
			}
		},
		props:{
			sDropdown:{
				type: Object,
				default:{
					// 0表示选中后下拉框再不出现该选项，1表示下拉框仍然出现该选项
					type:0,
					title:'请选择..',
					options:[{
						name:'',
						value:''
					}],
					optionStyle:'',
					optionClass:''
				}
			}
		}
	}
</script>
<style scoped lang='less'>
	@baseColor: #d42b1e;
	@backColor: #fff7f7;
	@bla: #5c5c5c;
	.dropdown_container{
		width: 100%;
		height: 100%;
	}
	.dropdown_header{
		display: inline-block;
		position: relative;
		width: 100%;
		height: 100%;
		color: @baseColor;
		font-size: 10px;
		padding-right: 7px;
		cursor: pointer;
		&:after{
			content:'';
			position:absolute;
			border:5px solid transparent;
			border-top-color: @baseColor;
			right:5px;
			top:15px;
		}
	}
	.dropdown_header{
		&.orderClass{
			height: 36px;
			line-height: 36px;
			border:1px solid #d3d3d3;
			box-shadow:inset -1px 0px 3px 0px #f2f2f2, inset 1px 0px 3px 0px #f2f2f2, inset 0px -1px 3px 0px #f2f2f2, inset 0px 1px 3px 0px #f2f2f2;
			padding:0 12px;
			color:#d3d3d3;
			background-repeat: no-repeat;
			background-position: 530px 12px;
			background-image: url(../assets/img/order/Triangle_grey.png);
			&:after{
				content:'';
				position:absolute;
				border:none;
				border-top-color: @baseColor;
				right:5px;
				top:15px;
			}
		}
	}
	.dropdown-item{
		cursor: pointer;
		&.orderClass{
			border:1px solid #e7e7e7;
			border-top:none;
			width:560px;
			height:34px;
			line-height: 34px;
			padding:0 12px;
			font-size: 14px;
			color:#5c5c5c;
			background: #fff;
			z-index: 1000;
		}
	}
</style>