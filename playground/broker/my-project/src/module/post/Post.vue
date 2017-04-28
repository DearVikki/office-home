<template>
	<div>
		<download></download>
		<!-- 主帖 -->
		<div id="post_container">
			<!-- 发帖人信息 -->
			<div class="post-header">
				<div class="header-left">
					<img :src="post_info.head_pic">
					<span class="info-container">
						<p><span class="name">{{post_info.nickname}}</span><span class="label">楼主</span></p>
						<p><span class="floor">第1楼</span><span class="time">{{post_info.time}}</span></p>
					</span>
				</div>
				<div class="header-right"></div>
			</div>
			<!-- 帖子内容 -->
			<div id="post_title">{{post_info.title}}</div>
			<div id="post_content" v-if="post_info.content">{{post_info.content}}</div>
			<div id="post_img" v-if="post_info.content_pic">
				<img v-for="img in post_info.content_pic" :src="img">
			</div>
		</div>
		<!-- 评论 -->
		<div id="comment_container">
			<div class="comment" v-for="comment in comment_info">
				<!-- 头部 -->
				<div class="post-header">
					<div class="header-left">
						<img :src="comment.head_pic" @click="myAlert">
						<span class="info-container">
							<p>
								<span class="name">{{comment.nickname}}</span>
								<span class="label" v-if="comment.is_hoster">楼主</span>
							</p>
							<p><span class="floor">第{{comment.floor}}楼</span><span class="time">{{timestamp(comment.comment_time)}}</span></p>
						</span>
					</div>
					<div class="header-right">
						<img src="~assets/img/icon_collection_mini.png" @click="myAlert">
						<img src="~assets/img/icon_reply.png" @click="myAlert">
					</div>
				</div>
				<!-- 主要内容 -->
				<div class="comment-main">
					<!-- 评论主体 -->
					<div class="comment-content">
						<p v-if="comment.content">{{comment.content}}</p>
						<img v-for="img in comment.content_pic" :src="img"
						v-if="img">
					</div>
					<!-- 评论的评论 -->
					<div class="reply-container" v-if="comment.reply_num">
						<p class="reply" v-for="reply in get3(comment.reply_info)">
							<span class="reply-name">{{reply.nickname}}：</span>
							<span v-if="reply.to_nickname">回复@{{reply.to_nickname}}：</span>
							<span>{{reply.content}}</span>
						</p>
						<p class="more" v-if="comment.reply_num>3"
						@click="myAlert">更多{{comment.reply_num - 3}}条回复...</p>
					</div>
				</div>
			</div>
		</div>
		<info></info>
	</div>
</template>
<script>
	import {getParameterByName} from '../../assets/js/queryString.js';
	import info from '../../components/info.vue'
	import download from '../../components/download.vue'
	export default{
		name:'post',
		data(){
			return{
				post_info:{},
				comment_info:[],
				page:1,
				id:0
			}
		},
		mounted(){
			this.id = getParameterByName('id')||0;
			// 绑定下拉加载事件
			document.body.onscroll = this.scrollEnd;
			this.getPost();
		},
		methods:{
			timestamp(date){
			    var date = new Date(parseInt(date+'000'));
			    var Y = date.getFullYear() + '-';
			    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
			    var D = date.getDate()+ ' ';
			    var h = date.getHours() + ':';
			    var m = date.getMinutes() + ':';
			    var s = date.getSeconds();
			    return Y+M+D;
			},
			get3(arr){
				return arr.slice(0,2);
			},
			getPost(){
				this.$http.post('',{
					name:'broker.sys.posts.detail',
					posts_id:this.id,
					page:this.page
				},{
					before(){
						document.body.removeEventListener('scroll',this.scrollEnd);
					}
				}).then((response)=>{
					if(response.body.code===1013){
						// 帖子已被删除
					} else {
						let post_info = response.body.data.posts_info;
						this.post_info = {
							content: post_info.content,
							content_pic: post_info.content_pic,
							head_pic: post_info.head_pic,
							nickname: post_info.nickname,
							time: this.timestamp(post_info.publish_time),
							title: post_info.title
						}
						response.body.data.comment_info.forEach((e)=>{
							this.comment_info.push(e);
						})
					}
					if(response.body.data.comment_info === []) return;
					this.page++;
					document.body.onscroll = this.scrollEnd;
				})
			},
			scrollEnd(){
				let top = document.body.scrollTop;
				let windowH = window.innerHeight;
				let pageH = document.body.getBoundingClientRect().height;
				if(top + windowH > pageH - 5){
					this.getPost();
				}
			},
			myAlert(){
				alert('点击顶部下载APP查看更多喔！')
			}
		},
		components:{download,info}
	}
</script>
<style scoped lang='less'>
	@baseColor:#8995ff;
	#post_container{
		background: #fff;
	}
	.post-header{
		overflow: hidden;
		padding: 0.31rem 0.4rem 0 0.4rem;
		width: 100%;
		.header-left{
			float: left;
			img{
				width: 1.1rem;
				vertical-align: middle;
				border-radius: 100%;
			}
			.info-container{
				vertical-align: middle;
				display: inline-block;
				margin-left: 0.21rem;
				.name{
					font-size: .37rem;
					color:#696969;
				}
				.label{
					display: inline-block;
					color: #fff;
					background: @baseColor;
					font-size: 0.2rem;
					margin-left: .21rem;
					padding: 0 .1rem;
				}
				.floor,.time{
					font-size: 0.37rem;
					color: #bfbfbf;
				}
				.time{
					font-size: 0.32rem;
					margin-left: .21rem;
				}
			}
		}
		.header-right{
			float: right;
			img{
				width:0.63rem;
			}
		}
	}
	/*发帖标题 内容*/
	#post_title{
		padding:0.3rem 0.4rem;
		color:#2d2d2d;
		font-size: 0.59rem;
	}
	#post_content{
		padding: 0 .4rem 0.3rem .4rem;
		font-size: .43rem;
		color: #d2d2d2;
	}
	#post_img{
		padding-bottom: 0.67rem;
		img{
			width: 100%;
		}
	}
	/*评论部分*/
	#comment_container{
		overflow: hidden;
		.comment-main{
			float: right;
			width: 8.31rem;
			border-bottom: 1px solid #d3d3d3;
			.comment-content{
				color: #545454;
				font-size: 0.48rem;
				margin-top: .3rem;
				p{
					font-size:.42rem;
					margin-bottom: .2rem;
				}
				img{
					width: 100%;
				}
			}
			.reply-container{
				width: 100%;
				padding-top: .3rem;
				padding-bottom: .3rem;
				border-top: 1px solid #d3d3d3;
				.reply{
					font-size: 0.35rem;
					color: #858585;
					margin-bottom: .3rem;
					.reply-name{
						color:@baseColor;
					}
				}
				.more{
					color:@baseColor;
					font-size: 0.27rem;
					text-align: center;
				}
			}
		}
	}
</style>