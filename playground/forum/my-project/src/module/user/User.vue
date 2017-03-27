<template>
	<div id="user_container">
		<a id="user_info" href="./user-personal.html">
			<img :src="img">
			<span id="user_info_right">
				<p id="user_name">{{username}}</p>
				<p id="user_praise">累计获赞数: {{userpraise}}</p>
			</span>
		</a>
		<div class="user-part">
			<a v-for="item in items1"
			:href="item.path"
			class="item-container">
				<div class="item" :style="{backgroundImage:'url('+item.img+')'}">{{item.txt}}</div>
			</a>
		</div>
		<div class="user-part">
			<a :href="item2.path"
			class="item-container">
				<div class="item" :style="{backgroundImage:'url('+item2.img+')'}">{{item2.txt}}</div>
			</a>
		</div>
		<div class="user-part">
			<a :href="item3.path"
			class="item-container">
				<div class="item" :style="{backgroundImage:'url('+item3.img+')'}">{{item3.txt}}</div>
			</a>
		</div>
		<div id="user_contact">客服连线：0989-09808788</div>
	</div>
</template>
<script>
	import a from '../../assets/img/index/icon_personal_pressed.png'
	import answer from '../../assets/img/user/icon_answer.png'
	import ask from '../../assets/img/user/icon_ask.png'
	import about from '../../assets/img/user/icon_about.png'
	import browse from '../../assets/img/user/icon_browse.png'
	import customservice from '../../assets/img/user/icon_customservice.png'
	import recommend from '../../assets/img/user/icon_recommend.png'
	import rule from '../../assets/img/user/icon_rule.png'
	import set from '../../assets/img/user/icon_set.png'
	export default{
		name:'user',
		data(){
			return{
				img:a,
				username:'',
				userpraise:0,
				items1:[{
					txt:'我的提问',
					path:'./user-question.html',
					img: ask
				},{
					txt:'我的回答',
					path:'./user-answer.html',
					img:answer
				},{
					txt:'最新浏览',
					path:'./user-history.html',
					img:browse
				},{
					txt:'推荐问题',
					path:'./user-recommend.html',
					img:recommend
				},{
					txt:'版规',
					path:'./user-rule.html',
					img:rule
				},{
					txt:'关于问我',
					path:'./user-about.html',
					img:ask
				}],
				item2:{
					txt:'微信提醒',
					path:'./user-set.html',
					img:set
				},
				item3:{
					txt:'在线联系客服',
					img:customservice
				}
			}
		},
		mounted(){
			this.$http.post('',{
				name:'xwlt.pc.PersonalInfo'
			}).then((response)=>{
				this.img = response.body.data.userInfo.head;
				this.username = response.body.data.userInfo.username;
				this.userpraise = response.body.data.userInfo.PraiseNum;
			})
		}
	}
</script>
<style lang='less' scoped>
	#user_info{
		padding:0.27rem 0.4rem;
		background: #fff;
		display: block;
		img{
			vertical-align: middle;
			width: 1.49rem;
			height: 1.49rem;
			border-radius: 100%;
			margin-right: 0.4rem;
		}
		#user_info_right{
			display: inline-block;
			vertical-align: middle;
			#user_name{
				font-size:0.43rem;
				color:#4c4c4c;
			}
			#user_praise{
				background:#ffe857;
				border:1px solid #4c4c4c;
				border-radius:0.07rem;
				width:2.96rem;
				height:0.53rem;
				line-height:0.53rem;
				text-align: center;
				font-size:0.32rem;
				color:#4c4c4c;
				margin-top: 0.2rem;
			}
		}
	}
	.item-container{
		display:block;
		line-height:1.31rem;
		padding-left:.4rem;
		background:#fff;
		.item{
			border-bottom: 1px solid #bbb;
			padding-left:0.99rem;
			font-size:0.37rem;
			color:#4c4c4c;
			background-repeat:no-repeat;
			background-position:left;
			background-size: 0.72rem;
		}
	}
	.user-part{
		margin-top:0.13rem;
		.item-container:last-of-type{
			border-bottom:1px solid #bbb;
			.item{
				border-bottom:none;
			}
		}
	}
	#user_contact{
		font-size:0.37rem;
		color:#999999;
		text-align:center;
		margin:0.53rem auto;
	}
</style>