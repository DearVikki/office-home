<template>
	<div class="switchtab_container">
		<span v-for="(t,i) in tabs" class="switchtab"
		:class="{active:activeTab===i}"
		@click="clickTab(i)">
			{{t.content}}
		</span>
	</div>
</template>
<script>
	export default{
		name:'switchtab',
		data(){
			return{
				activeTab:0
			}
		},
		mounted(){
			this.activeTab = this.initialTab;
		},
		methods:{
			clickTab(i){
				this.activeTab = i;
				this.$emit('clickTab',i);
			}
		},
		props:{
			tabs:{},
			initialTab:{
				default:0
			}
		}
	}
</script>
<style lang='less' scoped>
	.switchtab_container{
		height: 0.8rem;
		border-radius: 0.13rem;
		border: 0.037rem solid #4c4c4c;
		margin: 0 auto;
		display: inline-block;
		.switchtab{
			width: 1.97rem;
			text-align: center;
			height: .73rem;
			line-height: .73rem;
			font-size:0.43rem;
			color:#4c4c4c;
			letter-spacing:0.64px;
			border-radius: .13rem 0 0 .13rem;
			display: inline-block;
			&:nth-of-type(2){
				border-left: 0.04rem solid #4c4c4c;
				border-radius: 0 .13rem .13rem 0;
			}
			&.active{
				background: #ffe857;
			}
		}
	}
</style>