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
	export default{
		name:'about',
		data(){
			return{
				file0: '',
				file: '',
				src: '',
				base64: ''
			}
		},
		mounted(){
			this.base64 = Base64.Base64;
		},
		http:{
			root: '192.168.1.249'
		},
		methods:{
			changeFile(){
				var file = this.$refs.file.files[0];
				this.file0 = file;
				alert('INITIAL name:'+file.name+',type:'+file.type+',size:'+file.size)
				var src = window.URL.createObjectURL(file);
				var img = new Image();
				img.src = src;
				img.onload = () => {
					file = compressImg(img, file.type);
					alert('COMPRESSED name:'+file.name+',type:'+file.type+',size:'+file.size)
					this.file = file;
				}
			},
			showPic(){
				var src = window.URL.createObjectURL(this.file);
				console.log(src)
				this.src = src;
				var fm = new FormData();
				fm.append('img', this.file);
				fm.append('type','compressed img');
				this.$http.post('',fm).then((response)=>{
				})
				var fm0 = new FormData();
				fm0.append('img', this.file0);
				fm0.append('type','original img');
				this.$http.post('',fm0).then((response)=>{
				})
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