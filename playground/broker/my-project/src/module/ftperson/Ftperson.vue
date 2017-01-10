<template>
	<div>
		<download></download>
		<div class="header-pic">
			<img :src="cover">
		</div>
		<mynav :navs="navs"
		@clickNav="clickNav"></mynav>
		<!--基本信息-->
		<div id="basicInfo_container"
		v-show="activeNav===0">
			<basicInfo
			:infos="infos"></basicInfo>
			<div class="broker-info">
				<span>影视人联系方式</span>
				<span>点击查看</span>
			</div>
			<div class="intro" v-if="intro">
				<span class="grey">个人简介</span>
				<span class="bla">{{intro}}</span>
			</div>
		</div>
		<!--作品情况-->
		<div id="work_container"
		v-show="activeNav===1">
			<div class="work-item"
			v-if="works.length!==0"
			v-for="work in works">
				<img :src="work.plot_pic">
				<div class="work-name">{{work.plot_name}}</div>
				<div class="work-position">
					<span v-for="po in work.position">{{po}}</span>
				</div>
			</div>
			<div class="empty-tip" v-else>
				暂无作品情况喔
			</div>
		</div>
	</div>
</template>
<script>
	import {getParameterByName} from '../../assets/js/queryString.js'
	import mynav from '../../components/nav.vue'
	import basicInfo from '../../components/basicInfo.vue'
	import download from '../../components/download.vue'
	export default{
		name:'ftperson',
		data(){
			return{
				id:6,
				cover:'',
				navs:[{
					name:'基本信息',
					active:true
				},{
					name:'作品情况',
					active:false
				}],
				activeNav:0,
				infos:[{
					key:'姓名',
					content:''
				},{
					key:'性别',
					content:''
				},{
					key:'常驻城市',
					content:''
				},{
					key:'职位',
					content:''
				}],
				intro:'',
				works:[]
			}
		},
		mounted(){
			// get id
			this.id = getParameterByName('id')||0;
			//主要板块的最低高度
			document.querySelector('body').style.minHeight = window.innerHeight+'px';
			//影视人图片
			this.$http.post('',{
				name:'broker.sys.ftperson.cover.pic',
				film_tv_person_id:this.id
			}).then((response)=>{
				this.cover = response.body.data.cover_pic;
			})
			//影视人信息
			this.$http.post('',{
				name:'broker.sys.ftperson.info',
				film_tv_person_id:this.id
			}).then((response)=>{
				let data = response.body.data;
				console.log(data)
				this.infos[0].content = data.name;
				this.infos[1].content = data.sex?'女':'男';
				this.infos[2].content = data.city;
				this.infos[3].content = data.position;
				this.intro = data.description;
			})
			//影视人作品列表
			this.$http.post('',{
				name:'broker.sys.ftperson.works',
				film_tv_person_id:this.id
			}).then((response)=>{
				response.body.data.forEach((e)=>{
					let work = {
						plot_pic:e.plot_pic,
						plot_name:'《'+ e.plot_name + '》',
						position:e.plot_position.split(',')
					}
					this.works.push(work);
				})
			})
		},
		methods:{
			clickNav(i){
				this.activeNav = i;
			}
		},
		components:{mynav,basicInfo,download}
	}
</script>
<style lang='less' scoped>
	#work_container{
		width: 9.2rem;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		margin:0 auto;
		.work-item{
			width: 4.4rem;
			border-radius: 0.1rem 0.1rem 0 0;
			background: #fff;
			margin-bottom: .2rem;
			img{
				width: 4.4rem;
				height: 4.4rem;
			}
			.work-name{
				font-size: 0.27rem;
				color: #8995ff;
				text-align: center;
				height: .8rem;
				line-height: .8rem;
			}
			.work-position{
				width: 4rem;
				height: 1rem;
				margin: 0 auto;
				border-top: 2px solid #f3f3f3;
				display: flex;
				justify-content: space-between;
				span{
					font-size: 0.02rem;
					color:#878787;
					display: inline-block;
					background: #f3f3f3;
					padding: .05rem .1rem;
					margin-top: .2rem;
					height: .6rem;
				}
			}

		}
	}
</style>