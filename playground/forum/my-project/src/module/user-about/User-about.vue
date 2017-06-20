<template>
	<div>
		<input type="file" name="" @change="changeFile" ref="file">
		<button @click="showPic">Show Pic</button>
		<canvas></canvas>
		<img :src="src">
	</div>
</template>
<script>
	import compressImg from '../../assets/js/compressImg.js'
	import Base64 from 'js-base64'
	export default{
		name:'about',
		data(){
			return{
				file: [],
				src: '',
				base64: ''
			}
		},
		mounted(){
			this.base64 = Base64.Base64;
		},
		methods:{
			changeFile(){
				var file = this.$refs.file.files[0];
				console.log('initial size:'+file.size)
				var src = window.URL.createObjectURL(file);
				var img = new Image();
				img.src = src;
				img.onload = () => {
					file = compressImg(img, file.type, this.base64);
					console.log('after compressed:'+file.size)
					this.file.push(file);
				}
			},
			showPic(){
				console.log(this.file)
				var src = window.URL.createObjectURL(this.file[0]);
				console.log(src)
				this.src = src;
			}
		}
	}
</script>
<style>
	input[type=file]{
		font-size: .5rem;
		display: block;
	}
	button{
		font-size: .5rem;
	}
</style>