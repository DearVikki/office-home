<template>
	<div id="msg_container">
		<Swipeout>
			<SwipeoutItem :right-menu-width="210" :sensitivity="15"
			v-for="msg in msgs">
				<div slot="right-menu">
					<swipeoutButton type="primary" :width="remToPx">删除</swipeoutButton>
				</div>
				<div @click="clickMsg(msg)" class="swipeout-content-inner" slot="content">
					<img :src="msg.img">
					<div class="content-info">
						<p class="c-txt6 ellipsis" :class="{read:Number(msg.is_read)}">{{msg.username}}</p>
						<p class="c-txt3 ellipsis">{{msg.content}}</p>
					</div>
					<div class="content-time">{{utcToDate(msg.addtime)}}</div>
				</div>
			</SwipeoutItem>
		</Swipeout>
	</div>
</template>
<script>
	import img from '../../assets/img/index/icon_message2.png'
	import {utcToDate, myAlert, loadMore} from '../../assets/js/utils.js'
	import { Swipeout, SwipeoutItem, SwipeoutButton } from 'vux'
	export default{
		name:'notice',
		data(){
			return{
				page:1,
				msgs:[{
					img:img,
					username:'楼二狗',
					content:'你好，啦啦啦啦',
					addtime:'1490011294',
				}]
			}
		},
		mounted(){
			this.getData();
			loadMore.config.cb = this.getData;
			loadMore.open();
		},
		methods:{
			getData(){
				this.$http.post('',{
					name:'xwlt.pc.NoticeList',
					page:this.page
				}).then((response)=>{
					let data = response.body.data.NoticeList;
					data.forEach((e)=>{
						e.img = img;
					})
					// 哇这么小的细节我都注意到了我真棒！按时间后先顺序排列
					this.msgs = this.msgs.concat(data.reverse());
					loadMore.loading = false;
					this.page++;
					if(data.length === 0){
						myAlert.small('没有更多拉!');
						loadMore.loadAll = true;
					}
				})
			},
			utcToDate(utc){
				return utcToDate(utc);
			},
			clickMsg(msg){
				this.$http.post('',{
					name:'xwlt.pc.UpdateNoticeStatus',
					notice_id:msg.notice_id
				}).then((response)=>{
					location.href = './question-detail.html?id='+msg.question_id;
				})
			}
		},
		computed:{
			remToPx(){
				let base = document.querySelector('html').style.fontSize.slice(0,-2);
				return 1.95*base;
			}
		},
		components:{Swipeout, SwipeoutItem, SwipeoutButton}
	}
</script>
<style lang='less'>
</style>
<style lang='less' scoped>
	.swipeout-content-inner{
		img{
			width:1.3rem;
			height:1.3rem;
			vertical-align:middle;
		}
		.content-info{
			display:inline-block;
			margin-left:.4rem;
			vertical-align:middle;
			.c-txt6{
				margin-bottom:0.2rem;
				max-width:4rem;
				&.read{
					color:#999;
				}
			}
			.c-txt3{
				max-width:6.67rem;
			}
		}
		.content-time{
			font-size:0.32rem;
			color:#999999;
			position:absolute;
			top:0.35rem;
			right:.4rem;
		}
	}
</style>