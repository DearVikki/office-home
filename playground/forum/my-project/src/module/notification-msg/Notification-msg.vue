<template>
	<div>
		<div id="msg_body_container">
			<!-- <div class="msg-time">2-20 21:20</div> -->
			<div v-for="msg in msgs">
				<!--分隔tip -->
				<div v-if="msg.type=='tip'" class="msg-time">{{msg.content}}</div>
				<!-- 他人 -->
				<div v-if="msg.type=='to'" class="msg-item type1">
					<div class="msg-item-inner">
						<img class="msg-head" :src="to.head">
						<div class="msg-content c-txt2">{{msg.content}}</div>
					</div>
				</div>
				<!-- 自己 -->
				<div v-if="msg.type=='from'" class="msg-item type0">
					<div class="msg-item-inner">
						<div class="msg-content c-txt2">{{msg.content}}</div>
						<img class="msg-head" :src="from.head">
					</div>
				</div>
			</div>
		</div>
		<div id="msg_footer_container" ref="footer">
			<div class="input-box c-txt2">
				<div ref="input" contenteditable="true" @focus="sizeChange" @blur="sizeChange" @input="inputWords"></div>
			</div>
			<div class="send c-txt2"
			:class="{disabled:!txt}"
			@click="send">发送</div>
		</div>
	</div>
</template>
<script>
	import WebIM from 'webim';
	import {getParameterByName} from '../../assets/js/utils.js'
	import img1 from '../../assets/img/index/icon_personal_pressed.png'
	import img2 from '../../assets/img/index/icon_personal.png'
	function scrollTopEvent(cb){
		this.cb = cb || function(){};
		this.loading = false;
		scrollTopEvent.prototype.toTop = function(){
			if(msg_body_container.scrollTop < 5) {
				if(this.loading) return;
				this.loading = true;
				this.cb();
			}
		}
		scrollTopEvent.prototype.open = function(){
			this.listener = this.toTop.bind(this);
			msg_body_container.addEventListener('scroll', this.listener, false);
		}
		scrollTopEvent.prototype.close = function(){
			msg_body_container.removeEventListener('scroll', this.listener, false);
		}
	}
	export default{
		name:'msg',
		data(){
			return{
				img1:img1,
				img2:img2,
				txt:'',
				test: false,
				height:'',
				to: {},
				from: {},
				fromId:'',
				msgs: [],
				pureMsgs:[], //除tip外的全部真实消息
				conn: '',
				page: 1,
				scrollTopObj: {}
			}
		},
		methods:{
			resizeDivs(){
				let footerHeight = this.$refs.footer.getBoundingClientRect().height;
				document.querySelector('#msg_body_container').style.height = window.innerHeight  - footerHeight + 'px';
				this.$refs.footer.style.top = window.innerHeight - footerHeight + 'px';
			},
			inputWords(){
				this.txt = this.$refs.input.textContent;
			},
			sizeChange(){
				setTimeout(()=>{
					this.resizeDivs();
				},400)
			},
			getHistory(){
				this.$http.post('',{
					name: 'xwlt.pc.HxHistoryMsgList',
					userid: this.to.user_id,
					page: this.page
				}).then((response) => {
					var list = response.body.data.list;
					this.pureMsgs = list;
					list.forEach((l)=>{
						// 因为要先取得fromId 所以要放在这里
						if(l.from == this.fromId) l.type = 'from';
						else l.type = 'to';
						l.content = l.msg;
					})
					var msgs = list.concat(this.msgs);
					this.msgs = msgs;
					// 到顶时
					if(!list.length){
						this.scrollTopObj.close();
						this.msgs.unshift({
							type:'tip',
							content: '以下为全部消息'
						})
					}
					// 第一页时
					if(this.page == 1){
						this.scrollTopObj.open();
						this.$nextTick(() => {
							msg_body_container.scrollTop = msg_body_container.scrollHeight;
						})
					}
					this.scrollTopObj.loading = false;
					this.page++;
				})
			},
			send(){
				var id = this.conn.getUniqueId();
				var msg = new WebIM.message('txt', id);
				var self = this;
				// 若之前不是好友 则需要加为好友先
				this.$http.post('',{
					name:'xwlt.pc.HxUserList'
				}).then((response) => {
					let isFriended = false;
					Object.values(response.body.data).forEach((e)=>{
						if(e.userInfo.user_id == self.to.user_id) isFriended = true;
					})
					if(!isFriended){
						this.$http.post('', {
							name: 'xwlt.pc.AddFriend',
							userid: self.to.user_id
						}).then((response) => {
						})
					}
				})
				msg.set({
				    msg: self.txt,
				    to: self.to.user_id,
				    roomType: false,
				    success: (id, serverMsgId) => {
				        console.log('send private text Success');
				        self.msgs.push({content:self.txt, type:'from'});
				        self.$nextTick(() => {
				        	msg_body_container.scrollTop = msg_body_container.scrollHeight;
				        })
				        // 添加环信私信纪录
				        this.$http.post('',{
				        	name:'xwlt.pc.hxMsgAdd',
				        	msg_id: serverMsgId,
				        	msg: self.txt,
				        	from: self.fromId,
				        	to: self.to.user_id,
				        	timestamp: Date.now().toString().slice(0,-3)
				        }).then((response) => {
				        	self.txt = '';
				        	this.$refs.input.textContent = '';
				        })
				    }
				});
				msg.body.chatType = 'singleChat';
				this.conn.send(msg.body);
			}
		},
		mounted(){
			this.resizeDivs();
			window.onresize = () => {
				// alert(window.innerHeight)
				// Mission Failed: ios下弹出keyboard并不会触发resize事件
			}
			this.to = JSON.parse(decodeURIComponent(atob(getParameterByName('ref'))));
			document.title = this.to.username;
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

				// 拉取历史纪录
				this.getHistory();
				// 实例化上滚事件
				this.scrollTopObj = new scrollTopEvent(this.getHistory);
			})
			// 更新环信私信阅读状态
			this.$http.post('',{
				name: 'xwlt.pc.UpdateHxMsg',
				userid: this.to.user_id
			}).then((response) => {

			})
		}
	}
</script>
<style lang='less'>
	html,body{
	   /* -webkit-overflow-scrolling : touch !important;
	    overflow: auto !important;
	    height: 100% !important;*/
	}
</style>
<style lang='less' scoped>
	@baseColor:#ffe857;
	body{
		padding-bottom: 0;
	}
	#msg_body_container{
		padding: .4rem;
		position: relative;
		overflow-y: scroll;
		.msg-time{
			font-size:0.32rem;
			color:#999;
			text-align:center;
		}
		.msg-item{
			overflow:hidden;
			margin-top:.4rem;
			.msg-item-inner{
				.msg-head{
					width:1.31rem;
					height:1.31rem;
					border-radius:100%;
				}
				.msg-content{
					max-width:5.7rem;
					padding:.4rem;
					display:inline-block;
					vertical-align:top;
					position:relative;
					&:before{
						content:'';
						border:0.18rem solid transparent;
						position:absolute;
						top:.29rem;
					}
				}
			}
		}
		/*from他人*/
		.msg-item.type1{
			.msg-item-inner{
				float:left;
				.msg-content{
					background:#fff;
					margin-left:0.67rem;
					&:before{
						border-right-color:#fff;
						border-right-width: .23rem;
						left:-.4rem;
					}
				}
			}
		}
		/*from自己*/
		.msg-item.type0{
			.msg-item-inner{
				float:right;
				.msg-content{
					background:@baseColor;
					margin-right:0.67rem;
					&:before{
						border-left-color:@baseColor;
						border-left-width: .23rem;
						right:-.4rem;
					}
				}
			}
		}
	}
	#msg_footer_container{
		position: absolute;
		left: 0;
		width: 100%;
		padding:0.29rem 0.16rem 0.3rem .4rem;
		border-top:1px solid #d3d3d3;
		background: #f7f7f7;
		.input-box{
			width:7.87rem;
			min-height: 0.77rem;
			max-height: 2.3rem;
			line-height:.5rem;
			padding:.15rem 0.2rem;
			border:1px solid #d3d3d3;
			background:#fff;
			float: left;
			overflow: scroll;
			position:relative;
			input{
				width:100%;
				height:100%;
				opacity:0;
				position:absolute;
				left:0;
				top:0;
			}
		}
		.send{
			border:1px solid #d3d3d3;
			border-radius:0.05rem;
			width:1.15rem;
			height:0.77rem;
			line-height: .77rem;
			text-align: center;
			position:absolute;
			right:.16rem;
			bottom:.3rem;
			background: #ffe857;
			transition:all .6s;
			&.disabled{
				color:#d3d3d3;
				background:#fff;
			}
		}
	}
	#a_page_container{

	}
</style>