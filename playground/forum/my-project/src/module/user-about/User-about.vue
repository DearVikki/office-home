<template>
	<div class="c-txt4">
		<p style="text-align: center">关于问我</p>
		<p v-html="content"></p>
	</div>
</template>
<script>
	export default{
		name:'about',
		data(){
			return{
				content:''
			}
		},
		mounted(){
			this.$http.post('',{
				name: 'xwlt.pc.About',
				id: 1
			}).then((response) => {
				this.content = response.body.data.list.content;
			})
		},
	}
</script>
<style>
	.c-txt4{
		padding:0.4rem 0.67rem;
		word-wrap: break-word;
	}
</style>