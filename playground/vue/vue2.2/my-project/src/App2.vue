<template>
	<div id="a-input">
		<input type="" name="" v-model="msg" />
		<div>{{msg}}</div>
		<incre :aA="msg" v-model="msg" ref="profile"><p slot="slot2">about slot</p></incre>
		<component :is="hello"></component>
	</div>
</template>

<script type="text/javascript">
	import Incre from './components/Incre'
	import Hello from './components/Hello'
	export default{
		name:'aInput',
		data(){
			return{
				msg:'hh',
				hello:'hello'
			}
		},
		components:{
			Incre, Hello
		}
	}
</script>
<style type="text/css">
	#a-input{
		text-align: center;
	}
</style>