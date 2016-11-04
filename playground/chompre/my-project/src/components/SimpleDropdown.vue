<template>
	<div class='dropdown_container'>
		<span class='dropdown_header' :style='sDropdown.headerStyle' @click='dropdownActive=!dropdownActive'>{{sDropdown.title}}</span>
		<ul v-show='dropdownActive'>
			<li :style='sDropdown.optionStyle' v-for='option in sDropdown.options' v-show='!option.selected' @click='clickOption(option)'>{{option.name}}
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
						console.log(e.name)
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
			}
		},
		props:['sDropdown']
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
		&:after{
			content:'';
			position:absolute;
			border:5px solid transparent;
			border-top-color: @baseColor;
			right:5px;
			top:15px;
		}
	}
</style>