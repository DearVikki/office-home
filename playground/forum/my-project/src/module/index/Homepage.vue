<template>
	<div id="homepage_container">
		<!-- banner条 -->
		<div id="homepage_banner" class="swiper-container">
			<div class="swiper-wrapper">
               <a class='swiper-slide' v-for="b in banners"
               :href="b.url">
               		<img :src="b.path">
               </a>
          	</div>
          	<div class="swiper-pagination"></div>
		</div>
		<!-- nav条 -->
		<div id="homepage_nav">
			<span v-for="(n,index) in nav.items" class="nav"
			:class="{active:index === nav.activeNav}"
			@click="clickNav(index)">
				{{n.name}}
			</span>
		</div>
		<div id="homepage_main">
			<div v-show="nav.activeNav != 3">
				<questionitem v-if="questionTop.question_id"
				:question="questionTop"
				:type="nav.activeNav"
				:index=-1></questionitem>
				<questionitem v-for="(d,index) in questionData"
				:question="d"
				:type="nav.activeNav"
				:index="index"></questionitem>
				<div class="c-empty" v-if="nav.activeNav != 3 && !questionTop.question_id && !questionData.length">
					<p>这里空空如也诶</p>
				</div>
			</div>
			<personal v-show="nav.activeNav == 3"></personal>
		</div>
	</div>
</template>
<script>
	import Swiper from '../../assets/lib/swiper.js';
	import questionitem from '../../components/QuestionItem.vue'
	import personal from './Homepage-personal.vue'
	import {getParameterByName, loadMore, myAlert} from '../../assets/js/utils.js'
	export default{
		name:'homepage',
		data(){
			return{
				banners:[{
					path: ''
				}],
				nav:{
					// 0:热度 1:赏金 2:积分 3:个人
					activeNav: '',
					items:[{
						name:'热度榜',
						router:'board/hot'
					},{
						name:'赏金榜',
						router:'board/money'
					},{
						name:'积分榜',
						router:'board/credit'
					},{
						name:'个人榜',
						router:'rank'
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
				hotlistTop:{},
				money:{
					list:[],
					top:[],
					page:1
				},
				credit:{
					list:[],
					top:[],
					page:1
				}
			}
		},
		mounted(){
			let type = Number(getParameterByName('type')) || 1,
				subtype = Number(getParameterByName('subtype')) || 0;
			if(type === 1) this.clickNav(subtype);
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
			}),
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
				hotlistTop = hotlistTop ? hotlistTop : {};
				this.hotlistTop = hotlistTop;
			})
			// 拉取悬赏榜
			// this.getMoneyData();
			// 拉取悬赏榜置顶
			this.$http.post('',{
				name:'xwlt.pc.toplist',
				type:'money_top'
			}).then((response)=>{
				let moneyTop = response.body.data.TopList;
				moneyTop = moneyTop ? moneyTop : {};
				this.money.top = moneyTop;
			})
			// 拉取积分榜
			// this.getCreditData();
			// 拉取积分榜置顶
			this.$http.post('',{
				name:'xwlt.pc.toplist',
				type:'integral_top'
			}).then((response)=>{
				let creditTop = response.body.data.TopList;
				creditTop = creditTop ? creditTop : {};
				this.credit.top = creditTop;
			})
		},
		methods:{
			getMoneyData(){
				this.$http.post('',{
					name:'xwlt.pc.MoneyRList',
					types:'money',
					page:this.money.page
				}).then((response)=>{
					let lists = response.body.data.MoneyRList;
					if(!lists.length) {
						loadMore.loadAll = true;
						loadMore.close();
					}
					this.money.list = this.money.list.concat(lists);
					this.money.page++;
					loadMore.loading = false;
				})
			},
			getCreditData(){
				this.$http.post('',{
					name:'xwlt.pc.MoneyRList',
					types:'integral',
					page:this.credit.page
				}).then((response)=>{
					let lists = response.body.data.MoneyRList;
					if(!lists.length) myAlert.small('全部加载完啦！');
					this.credit.list = this.credit.list.concat(lists);
					this.credit.page++;
					loadMore.loading = false;
				})
			},
			clickNav(index){
				history.pushState({},'','./index.html?type=1&subtype=' + index);
				loadMore.loading = true;
				this.money.list = this.credit.list = [];
				this.money.page = this.credit.page = 1;
				this.nav.activeNav = index;
				this.question.type = index;
				// 点击赏金榜
				if(index===1){
					loadMore.close();
					loadMore.config.cb = this.getMoneyData;
					this.getMoneyData();
					loadMore.open();
				}
				// 点击积分榜
				else if(index===2){
					loadMore.close();
					loadMore.config.cb = this.getCreditData;
					this.getCreditData();
					loadMore.open();
				}
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
						questionData = this.money.list;
						break;
					case 2:
						questionData = this.credit.list;
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
						questionTop = this.money.top;
						break;
					case 2:
						questionTop = this.credit.top;
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
		position: relative;
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