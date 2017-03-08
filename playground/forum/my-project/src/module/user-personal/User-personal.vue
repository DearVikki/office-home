<template>
	<div>
		<div id="avatar_container" class="c-line">
			<span class="c-txt1 fl">头像</span>
			<input type="file" accept="image/png, image/jpeg, image/gif" v-show=false @change="handleFile">
			<img class="fr" :src="img" @click="clickInput">
		</div>
		<div id="others_container">
			<div class="c-line">
				<span class="c-txt1 fl">昵称</span>
				<span class="c-txt2 fr" @click="pop.show=true">{{name}}</span>
			</div>
			<div class="c-line">
				<span class="c-txt1 fl">手机号码</span>
				<span class="c-txt2 fr">13984875788</span>
			</div>
		</div>
		<div class="c-contact">客服连线：0989-09808788</div>
		<!-- 换名字弹框 -->
		<pop :pop="pop" :popReset="popReset">
			<input type="text" v-model="inputName" maxlength="20" class="c-txt2">
			<div class="btn" @click="saveName">保存</div>
		</pop>
	</div>
</template>
<script>
	import a from '../../assets/img/index/icon_personal_pressed.png'
	import pop from '../../components/Pop.vue'
	export default{
		name:'personalinfo',
		data(){
			return{
				img:a,
				name:'楼二',
				inputName:'',
				pop:{
					show:false,
					style:{
						width:'7rem',
						height:'3.2rem'
					}
				}
			}
		},
		mounted(){
			this.inputName = this.name;
		},
		methods:{
			clickInput(){
				document.querySelector('input[type=file]').click();
			},
			handleFile(e){
				let files = e.target.files;
				if(!files.length) return;
				this.img = window.URL.createObjectURL(files[0]);
			},
			// 考虑到如果input的v-model也=this.name的话 改变input内容再点击弹层背景弹层消失 显示的name也会跟着改变 所以索性不连接同一个数据好了
			saveName(){
				this.name = this.inputName;
				this.pop.show = false;
			},
			popReset(){
				this.inputName = this.name;
			}
		},
		components:{pop}
	}
</script>
<style lang='less' scoped>
	#avatar_container{
		height: 1.84rem;
		line-height: 1.84rem;
		img{
			width: 1.31rem;
			height: 1.31rem;
			border-radius: 100%;
			margin-top: .25rem;
		}
	}
	#others_container{
		margin-top: 0.13rem;
	}
	/*弹窗*/
	input[type=text]{
		border:none;
		width: 4rem;
		border-bottom: 0.03rem solid #ffe857;
		margin-top: .9rem;
		margin-bottom: .5rem;
		padding-bottom: .1rem;
	}
</style>