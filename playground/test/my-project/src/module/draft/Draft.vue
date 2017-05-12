<template>
	<div>
		<p>KEYDOWN: {{text1}}</p>
		<p>KEYPRESS: {{text2}}</p>
		<input type="" name="">
	</div>
</template>
<script>
	export default{
		name:'draft',
		data(){
			return {
				text1:'',
				text2:'',
			}
		},
		mounted(){
			document.body.onkeydown = (e)=>{
				console.log('KEYDOWN keycode:'+e.keyCode+',key:'+String.fromCharCode(e.keyCode)+',e.which:'+e.which+',targetValue:');
				this.text1 = 'keycode:'+e.keyCode+',key:'+String.fromCharCode(e.keyCode)+',e.which:'+e.which;
			}
			document.body.onkeypress = (e)=>{
				console.log('KEYPRESS keycode:'+e.keyCode+',key:'+String.fromCharCode(e.keyCode)+',e.which:'+e.which);
				this.text2 = 'keycode:'+e.keyCode+',key:'+String.fromCharCode(e.keyCode)+',e.which:'+e.which;
			}
		},
		methods:{
			}
	}
</script>