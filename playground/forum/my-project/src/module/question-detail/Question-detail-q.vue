<template>
	<div id="question_detail_q_container">
		<div id="q_header">
			<div id="q_header_left" class="c-head">
				<img :src="question.head" @click="$emit('popShow', question.userid)">
				<span class="c-txt2">{{question.username}}</span>
			</div>
			<div id="q_header_right" class="c-praise" :class="{active:Number(question.is_Praise)}"
			@click="praise">{{question.praisenum}}</div>
		</div>
		<div id="q_main">
			<p id="q_title">{{question.question}}</p>
			<p id="q_des" :class="{tooLong: question.question_describe.length>=73, isOpen:isOpen}"
			@click="isOpen = true">{{describeContent}}</p>
			<img v-for="img in question.path" :src="img" @click="expandImg(img)">
			<!-- 大图弹窗 -->
			<pop :pop="imgPop">
				<img id="img_pop" :src="activeImg">
			</pop>
		</div>
		<div id="q_footer">
			<div class="q-footer-left fl">
				<span class="q-money ellipsis" v-if="question.reward_type==='money'">{{question.money}}</span>
				<span class="q-credit ellipsis" v-else>{{Number(question.integral).toFixed()}}</span>
				<span class="q-time">{{utcToDate(question.addtime)}}</span>
			</div>
			<div class="q-footer-right fr c-yellow-btn" @click="$emit('answerQuestion')">回答</div>
			<div class="clear"></div>
			<!-- 跑腿抢任务 -->
			<div v-if="type===1" class="c-btn" @click="takeTask">抢任务</div>
			<div v-if="type===2" class="c-btn disabled">已被抢</div>
			<div v-if="type===3" class="c-btn" @click="cancelTask">取消任务</div>
			<div v-if="type===4" class="c-btn">待被抢</div>
			<div v-if="type===5" class="c-btn" @click="completeTask">确认完成</div>
			<div v-if="type===6" class="c-btn">已完成</div>
			<div v-if="type===7" class="c-btn">任务过期</div>
			<!-- 取消任务弹窗 -->
			<pop :pop="cancelPop">
				<div id="cancel_pop">
					<p>
						取消任务将会扣除 <b class="c-color">{{cancelCredit}}</b> 积分，确定要取消任务吗？
					</p>
					<div class="btn-container">
						<span class="c-yellow-btn" @click="cancelPop.show = false">去做任务</span>
						<span class="c-yellow-btn" @click="confirmCancelTask">坚决取消</span>
					</div>
				</div>
			</pop>
		</div>
	</div>
</template>
<script>
	import {utcToDate} from '../../assets/js/utils.js'
	import {myAlert} from '../../assets/js/utils.js';
	import pop from '../../components/Pop.vue'
	import userpop from '../../components/UserPop.vue';
	export default{
		name:'questionDetailQ',
		data(){
			return{
				isOpen:false,
				cancelPop:{
					show:false,
					style:{
						width:'6rem',
						height:'3rem',
						padding:'.5rem'
					}
				},
				imgPop:{
					show:false,
					style:{
						background:'transparent',
						boxShadow:'none',
						transform: 'translate3d(-50%,-50%,0)',
						position: 'absolute',
						left: '50%',
						top: '50%',
						margin: 'auto'
					}
				},
				activeImg:'',
				cancelCredit:0,
				userpop:{},
				userpopshow:false
			}
		},
		methods:{
			utcToDate(time){
				return utcToDate(time);
			},
			popShow(id){
				this.$http.post('',{
					name:'xwlt.pc.UserInfo',
					userid:id
				}).then((response)=>{
					this.userpop = response.body.data.userinfo;
					this.userpopshow = true;
				})
			},
			praise(){
				this.$http.post('',{
					name:'xwlt.pc.Praise',
					question_id: this.question.question_id
				}).then((response)=>{
					if(!response.loveU) return;
					if(this.question.is_Praise) {
						myAlert.small('取消点赞成功');
						this.question.praisenum--;
					}
					else {
						myAlert.small('点赞成功');
						this.question.praisenum++;
					}
					this.question.is_Praise = !this.question.is_Praise;
				})
			},
			// 抢任务
			takeTask(){
				this.$http.post('',{
					name:'xwlt.pc.GrabTask',
					question_id: this.question.question_id
				}).then((response)=>{
					if(!response.loveU) return;
					myAlert.small('耶!成功抢到任务!');
					this.$emit('changeQuestionType',3);
				})
			},
			// 取消任务
			cancelTask(){
				this.$http.post('',{
					name:'xwlt.pc.CancelTask',
					question_id: this.question.question_id,
					type:'click'
				}).then((response)=>{
					if(!response.loveU) return;
					this.cancelCredit = Number(response.body.data.is_deduction)?5:0;
					this.cancelPop.show = true;
				})
			},
			// 确认取消任务
			confirmCancelTask(){
				this.cancelPop.show = false;
				this.$http.post('',{
					name:'xwlt.pc.CancelTask',
					question_id: this.question.question_id,
					type:'operation'
				}).then((response)=>{
					if(!response.loveU) return;
					myAlert.small('已取消任务!');
					this.$emit('changeQuestionType',4);
				})
			},
			completeTask(){
				this.$http.post('',{
					name:'xwlt.pc.CompleteTask',
					question_id: this.question.question_id
				}).then((response)=>{
					if(!response.loveU) return;
					myAlert.small('已确认任务完成!');
					this.$emit('changeQuestionType',6);
				})
			},
			expandImg(img){
				this.activeImg = img.slice(0,-9);
				this.imgPop.show = true;
			}
		},
		computed:{
			describeContent(){
				let d = this.question.question_describe;
				if(this.isOpen) return d;
				else return d.length < 73 ? d: d.slice(0,73)+'...';
			}
		},
		mounted(){
		},
		// type:　０问题详情页　
		// 他人看到：１跑腿抢任务 2跑腿已被抢 3跑腿取消任务
		// 自己看到：4跑腿待被抢 5跑腿确认完成 6跑腿已完成
		props:['question','type'],
		components:{pop,userpop}
	}
</script>
<style lang='less' scoped>
	.vertical{
		vertical-align: middle;
		display: inline-block;
	}
	#question_detail_q_container{
		padding: 0.27rem .4rem;
		background: #fff;
		#q_header{
			overflow: hidden;
			#q_header_left{
				float: left;
			}
			#q_header_right{
				float: right;
				margin-top: .5rem;
			}
		}
		#q_main{
			padding-top:0.2rem;
			padding-bottom:.2rem;
			#q_title{
				font-size:0.4rem;
				color:#5c5c5c;
				line-height:0.64rem;
				font-weight:bold;
			}
			#q_des{
				font-size:0.35rem;
				color:#999;
				max-height:1000px;
				word-wrap:break-word;
				position:relative;
				&.tooLong:before{
					content:'显示全部';
					font-size:0.32rem;
					color:#f9c13a;
					position: absolute;
					right:0;
					bottom:0
				}
				&.isOpen:before{
					content:'';
				}
			}
			img{
				margin-right: .2rem;
			}
		}
		#q_footer{
			overflow:hidden;
			border-top:1px solid #d3d3d3;
			text-align:center;
			.q-money,.q-credit{
				min-width: 1.4rem;
				padding-right: .2rem;
				height: 0.48rem;
				line-height:.48rem;
				padding-left:0.61rem;
				background:url(../../assets/img/index/icon_money.png) left no-repeat;
				background-size: 0.47rem 0.48rem;
				font-size:0.37rem;
				color:#4c4c4c;
				margin-top:0.24rem;
				.vertical;
			}
			.q-credit{
				background-image: url(../../assets/img/index/icon_score.png);
			}
			.q-time{
				padding-left:0.13rem;
				border-left: 1px solid #d3d3d3;
				font-size:0.35rem;
				color: #d3d3d3;
				height:0.32rem;
				line-height:.32rem;
				margin-top:0.29rem;
				.vertical;
			}
			.c-yellow-btn{
				margin-top:0.2rem;
			}
			.c-btn{
				margin-top:0.27rem;
			}
		}
	}
	#cancel_pop{
		.btn-container{
			margin-top:.5rem;
			margin-top: .2rem;
			display: flex;
			justify-content: space-around;
		}
	}
	#img_pop{
		max-width:7.5rem;
	}
</style>