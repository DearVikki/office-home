<template>
	<div id="incre">
	{{n}}
	<button @click="plus">+</button>
	<div>{{computedaA}}</div>
	<input :id="randomId" :value="value" @input="onInput" />
	</div>
</template>
<script type="text/javascript">
	export default{
		name:'incre',
		data(){
			return {
				n:0,
				randomId:'input-'+Math.random()
			}
		},
		methods:{
			plus(){
				this.n++;
				this.$emit('toParent');
			},
			onInput(event){
				this.$emit('input',event.target.value);
			}
		},
		computed:{
			computedaA(){
				return this.aA+2;
			}
		},
		props:['aA','value']
	}
</script>