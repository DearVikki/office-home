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
	import WebIM from 'webim';
	// var a = require('../../assets/lib/websdk-1.4.10.js')
	import img from '../../assets/img/index/icon_message2.png'
	import {utcToDate, myAlert, loadMore} from '../../assets/js/utils.js'
	import { Swipeout, SwipeoutItem, SwipeoutButton } from 'vux'
	// var WebIM = require('../../assets/lib/websdk-1.4.10.js');
	export default{
		name:'notice',
		data(){
			return{
				page:1,
				msgs:[]
			}
		},
		mounted(){
			this.getData();
			loadMore.config.cb = this.getData;
			loadMore.open();

			var conn = new WebIM.connection({
			    https: WebIM.config.https,
			    url: WebIM.config.xmppURL,
			    isAutoLogin: WebIM.config.isAutoLogin,
			    isMultiLoginSessions: WebIM.config.isMultiLoginSessions
			});
			console.log(WebIM.config);
			console.log(conn);
			conn.listen({
			    onOpened: function ( message ) {          //连接成功回调
			        // 如果isAutoLogin设置为false，那么必须手动设置上线，否则无法收消息
			        // 手动上线指的是调用conn.setPresence(); 如果conn初始化时已将isAutoLogin设置为true
			        // 则无需调用conn.setPresence();  
			        console.log('已连接')          
			    },  
			    onClosed: function ( message ) {},         //连接关闭回调
			    onTextMessage: function ( message ) {},    //收到文本消息
			    onEmojiMessage: function ( message ) {},   //收到表情消息
			    onPictureMessage: function ( message ) {}, //收到图片消息
			    onCmdMessage: function ( message ) {},     //收到命令消息
			    onAudioMessage: function ( message ) {},   //收到音频消息
			    onLocationMessage: function ( message ) {},//收到位置消息
			    onFileMessage: function ( message ) {},    //收到文件消息
			    onVideoMessage: function (message) {
			        var node = document.getElementById('privateVideo');
			        var option = {
			            url: message.url,
			            headers: {
			              'Accept': 'audio/mp4'
			            },
			            onFileDownloadComplete: function (response) {
			                var objectURL = WebIM.utils.parseDownloadResponse.call(conn, response);
			                node.src = objectURL;
			            },
			            onFileDownloadError: function () {
			                console.log('File down load error.')
			            }
			        };
			        WebIM.utils.download.call(conn, option);
			    },   //收到视频消息
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
			  user: '777',
			  pwd: '123456',
			  appKey: WebIM.config.appkey
			};
			conn.open(options);
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