<template>
	<div id="change_avatar">
		<div id="avatar_container">
			<input type="file" accept="image/*"
			ref="file"
			@change="fileChange($event)">
			<div class="btn" id="avatar_upload"
			@click="$refs.file.click()">本地上传</div>
			<div id="avatar_img_holder">
				<img :src="img.src">
			</div>
			<div id="avatar_btn_container">
				<div class="btn disabled fl"
				@click="$emit('cancleChangeAva')">取消</div>
				<div class="btn fr"
				:class="{disabled: saveDisabled}"
				@click="saveAva">保存</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		name:'change-avatar',
		data(){
			return{
				img:{
					file:'',
					src:''
				},
				saveDisabled:true
			}
		},
		methods:{
			fileChange(e){
				var files = e.target.files || e.dataTransfer.files;
      			if (!files.length) return;
      			this.img.file = files[0];
      			var reader = new FileReader();
      			reader.readAsDataURL(files[0]);
      			reader.onload = (e)=> {
      				this.img.src = e.srcElement.result;
      				this.saveDisabled = false;
      			}
      		},
      		saveAva(){
      			if(this.saveDisabled) return;
      			this.$emit('saveAva',this.img);
      		}
		}
	}
</script>
<style scoped lang='less'>
	#change_avatar{
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 1000;
		background: rgba(0,0,0,0.2);
	}
	#avatar_container{
		width: 480px;
		height: 360px;
		background: #fff;
		margin: 80px auto;
		padding-top: .1px;
		position: relative;
		#avatar_upload{
			width: 80px;
			height: 26px;
			line-height: 26px;
			margin: 24px;
		}
		#avatar_img_holder{
			width: 240px;
			height: 180px;
			background: skyblue;
			margin:20px auto;
			img{
				width: 100%;
				height: 100%;
			}
		}
		#avatar_btn_container{
			width: 100%;
			height: 80px;
			padding: 24px 84px;
			border-top: 1px solid #f1f1f1;
			position: absolute;
		    bottom: 0;
		    left: 0;
			.btn{
				width: 72px;
				height: 30px;
				line-height: 30px;
				&.fr.disabled{
					cursor: not-allowed;
				}
			}
		}
	}
</style>