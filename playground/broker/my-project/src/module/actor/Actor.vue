<template>
	<div>
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
				<span>点击查看</span>
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
		<div id="pic_container"></div>
	</div>
</template>
<script>
	import mynav from '../../components/nav.vue'
	import basicInfo from '../../components/basicInfo.vue'
	export default{
		name:'actor',
		data(){
			return {
				id:1,
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
				intro:''
			}
		},
		mounted(){
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
				this.infos[1].content = data.sex;
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

			})
		},
		methods:{
			clickNav(i){
				this.activeNav = i;
			}
		},
		components:{mynav,basicInfo}
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

	}
</style>