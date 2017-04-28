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
				<span>经纪人联系方式</span>
				<span @click="myAlert">点击查看</span>
			</div>
			<div class="schedule" v-if="schedules">
				<p>艺人档期</p>
				<div class="schedule-item"
				v-for="schedule in schedules">
					<p class="des">{{schedule.description}}</p>
					<p class="time">{{schedule.time}}</p>
					<div class="sider">
						<div class="dot"></div>
						<div class="line"></div>
					</div>
				</div>
			</div>
			<div class="intro" v-if="intro">
				<span class="grey">个人简介</span>
				<span class="bla">{{intro}}</span>
			</div>
		</div>
		<!--照片-->
		<div id="pic_container"
		v-show="activeNav===1">
			<div id="columns">
				<img class="pic-item"
				v-for="img in imgs"
				:src="img">
			</div>
			<!-- <div style="width: 500px; background: pink; -moz-columns: 100px 6; -webkit-columns:100px 6; columns: 100px 6;"> <img src="http://www.seejs.com/imgserv/?size=100x100">
				<img src="http://www.seejs.com/imgserv/?size=100x300">
				<img src="http://www.seejs.com/imgserv/?size=100x200">
				<img src="http://www.seejs.com/imgserv/?size=100x200">
				<img src="http://www.seejs.com/imgserv/?size=100x300">
			</div> -->
			<div class="empty-container"
			v-show="imgs.length===0">
				<img src="~assets/img/no_pic.png">
				<p>暂无照片喔</p>
			</div>
		</div>
		<!--演艺经历-->
		<div id="experience_container"
		v-show="activeNav===2">
			<div class="experience-item"
			v-if="experiences.length!==0"
			v-for="ex in experiences">
				{{ex.experience}}
			</div>
			<div class="empty-tip"
			v-else>暂无相关信息喔</div>
		</div>
		<info></info>
	</div>
</template>
<script>
	import {getParameterByName} from '../../assets/js/queryString.js'
	import mynav from '../../components/nav.vue'
	import info from '../../components/info.vue'
	import basicInfo from '../../components/basicInfo.vue'
	import download from '../../components/download.vue'
	export default{
		name:'actor',
		data(){
			return {
				id:0,
				cover:'',
				navs:[{
					name:'基本信息',
					active:true
				},{
					name:'照片',
					active:false
				},{
					name:'演艺经历',
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
					key:'身高',
					content:''
				},{
					key:'体重',
					content:''
				},{
					key:'饰演年龄段',
					content:''
				},{
					key:'常驻城市',
					content:''
				},{
					key:'毕业院校',
					content:''
				},{
					key:'专业',
					content:''
				},{
					key:'特长',
					content:''
				}],
				schedules:[{
					description:'宣传',
					time:'2017-1-11'
				},{
					description:'过年',
					time:'2017-1-28'
				}],
				intro:'',
				imgs:[],
				experiences:[]
			}
		},
		mounted(){
			// get id
			this.id = getParameterByName('id')||0;
			//主要板块的最低高度
			document.querySelector('body').style.minHeight = window.innerHeight+'px';
			//艺人id
			this.$http.post('',{
				name:'broker.sys.actor.cover.pic',
				actor_id:this.id
			}).then((response)=>{
				this.cover = response.body.data.cover_pic;
			})
			//艺人信息
			this.$http.post('',{
				name:'broker.sys.actor.info',
				actor_id:this.id
			}).then((response)=>{
				let data = response.body.data;
				this.infos[0].content = data.name;
				this.infos[1].content = Number(data.sex)?'女':'男';
				this.infos[2].content = data.stature;
				this.infos[3].content = data.weight;
				this.infos[4].content = data.act_range;
				this.infos[5].content = data.city;
				this.infos[6].content = data.school;
				this.infos[7].content = data.major;
				this.infos[8].content = data.strong_point;
				this.intro = data.description;
			})
			//艺人档期
			this.$http.post('',{
				name:'broker.sys.action.calendar',
				actor_id:this.id
			}).then((response)=>{
				if(response.data.length === 0){
					this.schedules = [];
				}
				this.schedules = response.body.data;
			})
			//艺人图片
			this.$http.post('',{
				name:'broker.sys.actor.pic.video',
				actor_id:this.id,
				page:1,
				for_type:1
			}).then((response)=>{
				response.body.data.forEach((e)=>{
					this.imgs.push(e.path);
				})
			})
			//演艺经历
			this.$http.post('',{
				name:'broker.sys.actor.experience',
				actor_id:this.id
			}).then((response)=>{
				this.experiences = response.body.data;
			})
		},
		methods:{
			clickNav(i){
				this.activeNav = i;
			},
			myAlert(){
				alert('点击顶部下载APP查看更多喔！');
			}
		},
		components:{mynav,basicInfo,download,info}
	}
</script>
<style scoped lang='less'>
	.schedule{
		padding-left: .53rem;
		padding-top: .32rem;
    	background: #fff;
		>p{
			font-size: .43rem;
			color:#858585;
			margin-top: .32rem;
			margin-bottom: .4rem;
		}
		.schedule-item{
			padding-left: 1rem;
			position: relative;
			padding-bottom: .5rem;
			.des{
				font-size: .43rem;
			}
			.time{
				font-size: .32rem;
				color:#858585;
			}
			.sider{
				position: absolute;
				top: .28rem;
				left: 0;
				height: 100%;
				.dot{
					width: .15rem;
					height: .15rem;
					background: #858585;
					border-radius: .1rem;
					display: inline-block;
				}
				.line{
					width: 1px;
					height: 100%;
					background: #858585;
					margin-left: .075rem;
				}
			}
			&:last-of-type{
				.line{
					height: 0;
				}
			}
		}
	}
	#pic_container{
		width: 9.5rem;
		margin:0 auto;
		#columns{
			-webkit-column-count: 2;
			-webkit-column-gap: .20rem;
			-webkit-column-fill: auto;
			-moz-column-count: 2;
			-moz-column-gap: .20rem;
			-moz-column-fill: auto;
			column-count: 2;
			column-gap: .20rem;
			column-fill: auto;
		}
		.pic-item{
			width: 4.66rem;
			display: inline-block;
			margin-bottom: .2rem;
			float: left;
		}
		.empty-container{
			text-align: center;
			margin-top: 2rem;
			img{
				width: 3rem;
			}
			p{
				font-size: .16rem;
				color:#a29c9c;
				margin-top: .2rem;
			}
		}
	}
	#experience_container{
		.experience-item{
			font-size: .4rem;
			padding: .3rem .53rem;
			background: #fff;
			line-height: .8rem;
		}
	}
</style>