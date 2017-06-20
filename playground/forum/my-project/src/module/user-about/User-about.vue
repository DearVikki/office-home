<template>
	<div>
		<input type="file" name="" @change="changeFile" ref="file">
		<button @click="showPic">Show Pic</button>
		<img :src="src">
	</div>
</template>
<script>
	import compressImg from '../../assets/js/compressImg.js'
	export default{
		name:'about',
		data(){
			return{
				file: [],
				src: ''
			}
		},
		methods:{
			changeFile(){
				var file = this.$refs.file.files[0];
				var src = window.URL.createObjectURL(file);
				var img = new Image();
				img.src = src;
				img.onload = () => {
					file = compressImg(img, file.type);
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