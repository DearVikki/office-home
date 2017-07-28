<template>
	<div id="msg_container">
		<Swipeout>
			<SwipeoutItem :right-menu-width="210" :sensitivity="15"
			v-for="(msg,i) in msgs"
			>
				<div slot="right-menu" @touchstart="clickDelete(msg,i)">
					<swipeoutButton  type="primary" :width="remToPx">删除</swipeoutButton>
				</div>
				<a class="swipeout-content-inner"
					slot="content"
					:href="msg.href">
					<div class="unread-num" v-if="Number(msg.LastMsgCount.num)">
						{{msg.LastMsgCount.num}}
					</div>
					<img :src="msg.head">
					<div class="content-info">
						<p class="c-txt6 ellipsis">{{msg.username}}</p>
						<p class="c-txt3 ellipsis" v-if="msg.LastMsg">{{msg.LastMsg.msg}}</p>
					</div>
					<div class="content-time" v-if="msg.LastMsg">{{msg.time}}</div>
				</a>
			</SwipeoutItem>
		</Swipeout>
		<div class="c-empty" v-if="!msgs.length">
			<p>暂无新私信喔</p>
		</div>
		<pop :pop="pop">
			<div id="delete_pop">
				<p>确定删除<span class="c-color">{{deleteMsg.username}}</span>吗?</p>
				<div class="btn-container">
					<div class="c-yellow-btn" @click="confirmDelete">确定</div>
					<div class="c-yellow-btn" @click="pop.show = false">取消</div>
				</div>
			</div>
		</pop>
	</div>
</template>
<script>
	import WebIM from 'webim';
	import img from '../../assets/img/index/icon_personal_pressed.png'
	import pop from '../../components/Pop.vue';
	import { Swipeout, SwipeoutItem, SwipeoutButton } from 'vux'
	import { utcToDate, myAlert } from '../../assets/js/utils.js'
	export default{
		name:'msg',
		data(){
			return{
				conn:'',
				msgs:[],
				deleteMsg:{},
				deleteMsgIndex: '',
				pop:{
					show: false,
					style:{
						width:'5.8rem'
					}
				},
				move:{
					activeMsgDom:'',
					base:{x:0, y:0}
				}
			}
		},
		mounted(){
			this.$http.post('',{
				name:'xwlt.pc.HxUserList'
			}).then((response) => {
				let msgs = [];
				Object.values(response.body.data).forEach((e)=>{
					if(e.userInfo.LastMsg)
						e.userInfo.time = utcToDate(e.userInfo.LastMsg.timestamp);
					e.userInfo.href = './notification-msg.html?ref='+ btoa(encodeURIComponent(JSON.stringify(e.userInfo)));
					msgs.push(e.userInfo);
				})
				msgs.sort(function(a,b) {
					a.LastMsg = a.LastMsg || {timestamp: 0};
					b.LastMsg = b.LastMsg || {timestamp: 0};
					return Number(b.LastMsg.timestamp) - Number(a.LastMsg.timestamp);
				});
				this.msgs = msgs;
			})
			this.$http.post('',{
				name:'xwlt.pc.PersonalInfo'
			}).then((response)=>{
				this.from = response.body.data.userInfo;
				this.fromId = response.body.data.user_id;
				var self = this;
				var conn = new WebIM.connection({
				    https: WebIM.config.https,
				    url: WebIM.config.xmppURL,
				    isAutoLogin: WebIM.config.isAutoLogin,
				    isMultiLoginSessions: WebIM.config.isMultiLoginSessions
				})
				conn.listen({
				    onOpened: function ( message ) {
				        console.log('已连接')
				        conn.setPresence();
				    },
				    onClosed: function ( message ) {},
				    onTextMessage: function ( message ) {
				    	console.log(message);
				    	if(message.from == self.to.user_id) {
				    		self.msgs.push({content:message.data, type:'to'});
				    	}
				    },    //收到文本消息
				    onPresence: function ( message ) {},       //收到联系人订阅请求、处理群组、聊天室被踢解散等消息
				    onRoster: function ( message ) {},         //处理好友申请
				    onInviteMessage: function ( message ) {},  //处理群组邀请
				    onOnline: function () {},                  //本机网络连接成功
				    onOffline: function () {},                 //本机网络掉线
				    onError: function ( message ) {},          //失败回调
				    onBlacklistUpdate: function (list) {       //黑名单变动
				        // 查询黑名单，将好友拉黑，将好友从黑名单移除都会回调这个函数，list则是黑名单现有的所有好友信息
				        console.log(list);
				    }
				})
				var options = {
				  apiUrl: WebIM.config.apiURL,
				  user: this.fromId,
				  pwd: '123456',
				  appKey: WebIM.config.appkey
				};
				conn.open(options);
				this.conn = conn;
			})
		},
		methods:{
			clickDelete(msg,i){
				this.deleteMsg = msg;
				this.deleteMsgIndex = i;
				this.pop.show = true;
			},
			confirmDelete(){
				var self = this;
				this.conn.removeRoster({
				       to: self.deleteMsg.user_id,
				       success: function () {  // 删除成功
				           this.conn.unsubscribed({
				               to: self.deleteMsg.user_id
				           });
				       },
				       error: function(){
				       		myAlert.small('删除失败！');
				       }
				   });
				self.msgs.splice(this.deleteMsgIndex, 1);
				// 为了修复下一条总是莫名呈打开状态的问题…
				this.$nextTick(()=>{
					document.querySelectorAll('.vux-swipeout-content')[this.deleteMsgIndex].style.transform = 'translate3d(0,0,0)';
				});
				self.pop.show = false;
			}
		},
		computed:{
			remToPx(){
				let base = document.querySelector('html').style.fontSize.slice(0,-2);
				return 1.95*base;
			}
		},
		components:{ Swipeout, SwipeoutItem, SwipeoutButton, pop}
		// components:{pop}
	}
</script>
<style lang='less'>
	#msg_container{
		font-size: 30px;
		.vux-swipeout-item{
			height: 1.87rem;
			display: block;
		}
		.vux-swipeout-content{
			height: 1.87rem;
		}
		.swipeout-content-inner{
			border-bottom:1px solid #bbb;
			width: 100%;
			height: 100%;
			padding: 0.23rem 0.4rem;
			display: block;
			position:relative;
		}
		.vux-swipeout-button-primary{
			font-size:0.37rem;
			color:#4c4c4c;
			background: #ffe857;
		}
	}
</style>
<style lang='less' scoped>
	.swipeout-content-inner{
		.unread-num{
			left: 1.45rem;
			top: .2rem;
		}
		img{
			width:1.41rem;
			height:1.41rem;
			border-radius:100%;
			vertical-align:middle;
		}
		.content-info{
			display:inline-block;
			margin-left:.4rem;
			vertical-align:middle;
			.c-txt6{
				margin-bottom:0.2rem;
				max-width:4rem;
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
	#delete_pop{
		padding: .4rem;
		.c-color{
			color: #ECD01F;
		}
	    .btn-container{
	    	display: flex;
		    width: 100%;
		    justify-content: space-around;
		    margin-top: .5rem;
	    }
	}
</style>