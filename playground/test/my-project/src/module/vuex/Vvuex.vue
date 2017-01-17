<template>
	<div>This is vvuex</div>
</template>
<script>
	export default{
		name:'vvuex',
		mounted(){
			this.$store.commit('increment')
			console.log(this.$store.state.count)
		},
		computed:{
			
		}
	}
</script>
<style></style>