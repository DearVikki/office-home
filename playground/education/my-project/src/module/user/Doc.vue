<template>
	<div id="doc_container" class="user-common-container">
		<div class="doc-group"
		v-for="doc in docs">
			<div class="title"
			:class="{active:doc.active}"
			@click="doc.active=!doc.active">{{doc.grade}} {{doc.title}}</div>
			<div class="doc"
			v-show="doc.active">
				<div class="doc-item"
				v-for="list in doc.lists"
				@click="clickPpt(list)">
					<img :src="list.banner">
				</div>
			</div>
		</div>
		<galleryPop
		v-show="gallery.show"
		:imgs="gallery.imgs"
		@closePop="gallery.show=false"></galleryPop>
	</div>
</template>
<script>
	import galleryPop from '../../components/GalleryPop.vue';
	export default{
		name:'doc',
		data(){
			return{
				docs:[{
					id:100000,
					grade: "高一上",
                	title: "函数",
					/*lists:[{
		                id: 1,
		                subject_id: 100000,
		                banner: "http://www.hzchuangxiangzhe.cn/upload/banner/1.jpg",
		                ppt: ["http://www.hzchuangxiangzhe.cn/upload/banner/1.jpg","http://www.hzchuangxiangzhe.cn/upload/banner/2.jpg","http://www.hzchuangxiangzhe.cn/upload/banner/3.jpg"]
		            }],*/
					active:false
				}],
				gallery:{
					show:false,
					imgs:[]
				}
			}
		},
		mounted(){
			this.docs = [];
			this.$http.get('?name=education.sys.type.list').then((response)=>{
				response.body.data.list.forEach((e)=>{
					this.$http.get('?name=education.sys.subject.list&type='+e.type).then((response)=>{
						response.body.data.list.forEach((doc)=>{
							if(doc.is_ppt===1) {
								this.$http.get('?name=education.sys.ppt.list&subject_id='+doc.id).then((response)=>{
									console.log(response)
									doc.lists = response.body.data.list;
									doc.active = false;
									console.log(doc.lists)
									this.docs.push(doc);
								})
							}
						})
					})
				})
			})
		},
		methods:{
			clickPpt(list){
				this.gallery.show = true;
				this.gallery.imgs = list.ppt;
			}
		},
		components:{galleryPop}
	}
</script>
<style scoped lang='less'>
	@baseColor: #55b7f8;
	#doc_container{
		.doc-group{
			margin-bottom:20px;
			.title{
				width: 100%;
				height: 48px;
				line-height: 48px;
				font-size: 16px;
				color:#55b7f8;
				background: #f8f8f8;
				padding-left: 37px;
				padding-right: 60px;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				position: relative;
				cursor: pointer;
				&:before{
					content: '';
					width: 7px;
					height: 7px;
					border-radius: 100%;
					background: #55b7f8;
					position: absolute;
					top: 20px;
					left: 20px;
				}
				&:after{
					content: '';
					width: 15px;
					height: 15px;
					background: url(../../assets/img/user/icon_more.png) center no-repeat;
					background-size: auto 100%;
					position: absolute;
					top: 15px;
					right: 20px;
					transition: all .3s;
				}
				&.active:after{
					transform: rotate(90deg);
				}
			}
			.doc{
				padding: 24px 10px;
				overflow: hidden;
				.doc-item{
					width: 140px;
					height: 96px;
					float: left;
					margin-left: 15px;
					margin-bottom: 15px;
					cursor: pointer;
					border:1px solid transparent;
					&:hover{
						border-color:@baseColor;
					}
					img{
						width: 100%;
						height: 100%;
					}
				}
			}
		}
	}
</style>