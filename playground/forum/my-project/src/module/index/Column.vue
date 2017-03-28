<template>
	<div id="column_container">
		<div id="column_nav_container">
			<div id="column_nav_main_container">
				<div v-for="(nav,index) in navs"
				class="column-nav"
				:style="{backgroundImage: activeNav===index?'url('+nav.labelActive+')':'url('+nav.label+')'}"
				@click="clickNav(nav,index)">{{nav.txt}}</div>
			</div>
			<div class="column-nav-sub-container"
			v-for="(nav,index) in navs"
			v-show="activeNav===index">
				<!-- 生活/拼拼子模块 -->
				<div class="sub-container2"
				v-if="activeNav===1 || activeNav===4"
				:class="{opened:nav.opened}"
				@click="nav.opened = !nav.opened">
					<span v-for="(sub,subindex) in nav.subs"
					:class="{active:nav.activeSub===subindex}"
					@click="clickSub2(nav,sub,subindex)">{{sub.type_name}}</span>
				</div>
				<!-- 其余子模块 -->
				<div class="sub-container"
				v-if="activeNav!==1 && activeNav!==4">
					{{nav.sub}}
				</div>
			</div>
		</div>
		<div id="column_main_container">
			<questionitem v-for="q in questions"
			:question="q"
			:type="q.type"
			:index="q.index"></questionitem>
			<!-- 缺省页 -->
			<div class="c-empty" v-if="questions.length === 0">
				<p>这里空空如也诶</p>
				<a href="./ask.html">我来添砖加瓦!</a>
			</div>
		</div>
	</div>
</template>
<script>
	import icon_all_pressed from '../../assets/img/index/icon_all.png'
	import icon_life_pressed from '../../assets/img/index/icon_life.png'
	import icon_pencil_pressed from '../../assets/img/index/icon_pencil.png'
	import icon_puttogether_pressed from '../../assets/img/index/icon_puttogether.png'
	import icon_lost_pressed from '../../assets/img/index/icon_lost.png'
	import icon_help_pressed from '../../assets/img/index/icon_help.png'
	import icon_all from '../../assets/img/index/icon_all (1).png'
	import icon_life from '../../assets/img/index/icon_life (1).png'
	import icon_pencil from '../../assets/img/index/icon_pencil (1).png'
	import icon_puttogether from '../../assets/img/index/icon_puttogether (1).png'
	import icon_lost from '../../assets/img/index/icon_lost (1).png'
	import icon_help from '../../assets/img/index/icon_help (1).png'
	import questionitem from '../../components/QuestionItem.vue'
	import {getParameterByName, pullToRefresh} from '../../assets/js/utils.js'
	export default{
		name:'columnn',
		data(){
			return{
				// opened表示子模块是否打开 activeSub表示当前选中的子模块
				navs:[{
					type_id:'',
					txt:'全部',
					label:icon_all,
					labelActive:icon_all_pressed,
					sub:'啦啦啦这里有一句话！'
				},{
					txt:'生活',
					label:icon_life,
					labelActive:icon_life_pressed,
					subs:['求书','拼车','家教','拥抱','神奇','哈哈','less','组团学车','落','great','电脑维修','电脑重装','其他','全部'],
					activeSub:0,
					opened:false
				},{
					txt:'学习',
					label:icon_pencil,
					labelActive:icon_pencil_pressed
				},{
					txt:'跑腿',
					label:icon_help,
					labelActive:icon_help_pressed
				},{
					txt:'拼拼',
					label:icon_puttogether,
					labelActive:icon_puttogether_pressed
				},{
					txt:'失物',
					label:icon_lost,
					labelActive:icon_lost_pressed
				}],
				activeNav:0,
				test:{
					question:{ "question_id":"2",
		            "type_id":"4",
		            "type_label_id":"0",
		            "reward_type":"money",
		            "integral":"0",
		            "money":"10.00",
		            "question":"帮忙送个外卖",
		            "question_describe":"地址帮忙送个外卖帮忙送个外卖帮帮忙",
		            "path":null,
		            "userid":"1",
		            "addtime":"1476076803",
		            "browse_num":"0",
		            "is_task":"1",
		            "task_status":"1",
		            "endtime":"0",
		            "status":"0",
		            "solvetime":"0",
		            "hottime":"1488441415",
		            "hot":"10",
		            "head":"http:\/\/wx.qlogo.cn\/",
		            "username":"狐狸的味道",
		            "replynum":0,
		            "praisenum":0},
		            index:4,
            		type:3
				},
				questions:[]
			}
		},
		mounted(){
			// this.navs.activeNav = location.hash.slice(-1) || 0;
			this.$http.post('',{
				name:'xwlt.pc.type'
			}).then((response)=>{
				response.body.data.type.forEach((e,i)=>{
					let nav = this.navs[i+1];
					nav.type_id = e.type_id;
					nav.subs = e.ToWtype;
					nav.subs.push({
						type_name:'全部',
						type_id:''
					})
					nav.activeSub = nav.subs.length-1;
					nav.sub = e.content;
				})
			})
			this.getData('','',1,false);
			pullToRefresh(this.getData);
		},
		methods:{
			getData(type_id,type_label_id,page,clearOldData){
				this.$http.post('',{
					name:'xwlt.pc.questionList',
					type_id:type_id,
					type_label_id:type_label_id,
					page:page
				}).then((response)=>{
					if(clearOldData) this.questions = [];
					response.body.data.Question_list.forEach((e)=>{
						e.index = 4;
						if(Number(e.task_status)) e.type = Number(e.task_status) + 2;
						this.questions.push(e);
					})
				})
			},
			clickNav(nav,index){
				this.activeNav = index;
				this.getData(nav.type_id,'',1,true);
				// location.hash = index;
			},
			clickSub2(nav,sub,subindex){
				nav.activeSub = subindex;
				this.getData(nav.type_id,sub.type_id,1,true);
			}
		},
		components:{questionitem}
	}
</script>
<style scoped lang='less'>
	#column_nav_main_container{
		border-top:1px solid #bbb;
		display:flex;
		justify-content:space-around;
		padding: 0.13rem 0 0.2rem 0;
		background:#fff;
		.column-nav{
			font-size:0.37rem;
			color:#4c4c4c;
			background-repeat:no-repeat;
			background-position:center 0;
			background-size: auto 0.47rem;
			height:0.93rem;
			padding-top:0.53rem;
		}
	}
	.column-nav-sub-container{
		.sub-container{
			padding:.2rem 0.4rem;
			font-size:0.37rem;
			color:#5c5c5c;
		}
		.sub-container2{
			padding-bottom:.27rem;
			padding-left: .5rem;
			padding-right:.1rem;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
			position:relative;
			transition:all .5s;
			&:before{
				content:'';
				position:absolute;
				font-size:20px;
				right:.3rem;
				bottom:.27rem;
				width: .2rem;
				height: .2rem;
				background:url(../../assets/img/index/icon_zhankai.png) center no-repeat;
				background-size:100% 100%;
			}
			&.opened{
				-webkit-line-clamp: 1000;
				&:before{
					background-image: url(../../assets/img/index/icon_up.png);
				}
			}
			span{
				font-size:0.32rem;
				color:#999;
				display:inline-block;
				padding:0.08rem 0.11rem;
				border:1px solid #999;
				border-radius:0.05rem;
				margin-right:0.4rem;
				margin-top:0.27rem;
				&.active{
					color:#4c4c4c;
					border-color:#4c4c4c;
					background:#ffdc45;
				}
			}
		}
	}
</style>