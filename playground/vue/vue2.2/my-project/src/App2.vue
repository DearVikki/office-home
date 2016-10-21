<template>
	<div id="a-input">
		<input type="" name="" v-model="msg" />
		<div>{{msg}}</div>
		<incre :aA="msg" v-model="msg"></incre>
		<incre :aA='11'></incre>
	</div>
</template>

<script type="text/javascript">
	import Incre from './components/Incre'
	export default{
		name:'aInput',
		data(){
			return{
				msg:'hh',
				hello:'hello'
			}
		},
		components:{
			Incre
		},
		methods:{
			toParent(){
				this.msg = 'get it!';
			}
		}
	}
</script>
<style type="text/css">
	#a-input{
		text-align: center;
	}
</style>