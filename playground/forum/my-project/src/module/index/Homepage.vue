<template>
	<div id="homepage_container">
		<!-- banner条 -->
		<div id="homepage_banner" class="swiper-container">
			<div class="swiper-wrapper">
               <a class='swiper-slide' v-for="b in banners">
               		<img :src="b.path">
               </a>
          	</div>
          	<div class="swiper-pagination"></div>
		</div>
		<!-- nav条 -->
		<div id="homepage_nav">
			<div v-for="(n,index) in nav.items" class="nav"
			:class="{active:index === nav.activeNav}"
			@click="clickNav(index)">
				{{n.name}}
			</div>
		</div>
		<div id="homepage_main">
			<!-- 热度榜/赏金榜/积分榜 -->
			<div v-show="nav.activeNav < 3">
				<questionitem v-if="questionTop.question_id"
				:question="questionTop"
				:type="nav.activeNav"
				:index=-1></questionitem>
				<questionitem v-for="(d,index) in questionData"
				:question="d"
				:type="nav.activeNav"
				:index="index"></questionitem>
			</div>
			<!-- 个人榜 -->
			<div v-show="nav.activeNav == 3">
				<personal></personal>
			</div>
		</div>
	</div>
</template>
<script>
	import Swiper from '../../assets/lib/swiper.js';
	import questionitem from '../../components/QuestionItem.vue'
	import personal from './Homepage-personal.vue'
	export default{
		name:'homepage',
		data(){
			return{
				banners:[{
					path: ''
				}],
				nav:{
					// 0:热度 1:赏金 2:积分 3:个人
					activeNav: 3,
					items:[{
						name:'热度榜',
						id:1
					},{
						name:'赏金榜',
						id:1
					},{
						name:'积分榜',
						id:1
					},{
						name:'个人榜',
						id:1
					}]
				},
				question:{
					type:3,
					data:[{
						question_id:'',
						question:'',
						question_describe:'',
						money:'',
						hot:'',
						browse_num:'',
						replynum:'',
						praisenum:''
					}]
				},
				hotlist:[],
				hotlistTop:{}
			}
		},
		mounted(){
			// 拉取轮播图数据
			this.$http.post('',{
				name:'xwlt.pc.banner'
			}).then((response)=>{
				this.banners = response.body.data.banner_homepage;
				this.$nextTick(()=>{
					  new Swiper('#homepage_banner',{
				          pagination: '#homepage_banner .swiper-pagination',
				          slidesPerView: 1,
				          paginationClickable:false,
				          autoplay: 5000,
				          loop:true
				      })
				})
			})
			// 拉取热度榜
			this.$http.post('',{
				name:'xwlt.pc.hotlist'
			}).then((response)=>{
				this.hotlist = response.body.data.hotlist;
			})
			// 拉取热度榜置顶
			this.$http.post('',{
				name:'xwlt.pc.toplist',
				type:'hot_top'
			}).then((response)=>{
				let hotlistTop = response.body.data.TopList;
				if(hotlistTop.question_id) this.hotlistTop = hotlistTop;
			})
		},
		methods:{
			clickNav(index){
				this.nav.activeNav = index;
				this.question.type = index;
			}
		},
		computed:{
			questionData(){
				let questionData;
				switch(this.nav.activeNav){
					case 0:
						questionData = this.hotlist;
						break;
					case 1:
						break;
					case 2:
						break;
					default:
						questionData = [];
						return;
				}
				return questionData;
			},
			questionTop(){
				let questionTop;
				switch(this.nav.activeNav){
					case 0:
						questionTop = this.hotlistTop;
						break;
					case 1:
						break;
					case 2:
						break;
					default:
						questionTop = {};
						break;
				}
				return questionTop;
			}
		},
		components:{questionitem,personal}
	}
</script>
<style scoped lang='less'>
	@import '../../assets/lib/swiper.min.css';
	@baseColor: #ffe857;
	@subColor: #f9c13a;
	#homepage_container{
	}
	#homepage_banner{
		width: 100%;
		height: 3.73rem;
		.swiper-slide img{
			width: 10rem;
			height: 3.73rem;
		}
	}
	#homepage_main{
		margin-top: .16rem;
	}
	#homepage_nav{
		border-top:1px solid #bbb;
		display:flex;
		justify-content:space-around;
		background:#fff;
		.nav{
			font-size:0.37rem;
			color:#4c4c4c;
			letter-spacing:-0.07px;
			text-align:center;
			width: 1.97rem;
			height:0.96rem;
			line-height:.96rem;
			border-bottom: 0.05rem solid transparent;
			&.active{
				color: @subColor;
				border-color: @subColor;
			}
		}
	}
</style>