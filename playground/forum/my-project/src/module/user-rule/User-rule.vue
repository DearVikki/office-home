<template>
	<div class="c-txt4">
		<p style="text-align: center">有问必答版规</p>
		<p v-html="content"></p>
	</div>
</template>
<script>
	export default{
		name:'rule',
		data(){
			return{
				content:''
			}
		},
		mounted(){
			this.$http.post('',{
				name: 'xwlt.pc.About',
				id: 2
			}).then((response) => {
				this.content = response.body.data.list.content;
			})
		},
		methods:{
		}
	}
</script>
<style lang='less' scoped>
	.c-txt4{
		padding:0.4rem 0.67rem;
		word-wrap: break-word;
	}
</style>