<template>
	<div id="incre">
		{{n}}
		<button @click="plus">+</button>
		<div>{{computedaA}}</div>
		<slot name="slot2"></slot>
		<input :id="randomId" v-model="value" />
		<slot name="slot1"></slot>
	</div>
</template>
<script type="text/javascript">
	export default {
			name:'incre',
			data(){
				return {
					n:0,
					randomId:'input-'+Math.random(),
					value:'3'
				}
			},
			methods:{
				plus(){
					this.n++;
				}
			},
			computed:{
				computedaA(){
					return this.aA+2;
				}
			},
			props:['aA']
		}
</script>