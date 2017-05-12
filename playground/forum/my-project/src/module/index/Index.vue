	<template>
	<div>
		<div id="index_header">
			<div id="column">
				<span :class="{active:type == 1}" @click="clickNav(1)">首页</span>
				<span :class="{active:type == 2}" @click="clickNav(2)">分栏</span>
			</div>
			<a id="index_search" href="./search.html"></a>
		</div>
		<!-- 主体 -->
		<homepage v-if="type == 1"></homepage>
		<columnn v-if="type == 2"></columnn>
		<!-- 1签到 -->
		<transition name="shrink">
			<div id="index_sign" v-if="!is_sign" @click="sign"></div>
		</transition>
		<myfooter></myfooter>
	</div>
</template>
<script>
	import myfooter from '../../components/Footer.vue'
	import homepage from './Homepage.vue'
	import columnn from './Column.vue'
	import {getParameterByName, myAlert} from '../../assets/js/utils.js'
	export default{
		name:'index',
		data(){
			return{
				// 1表示首页 2表示分栏
				type:1,
				is_sign:1,
				iosVersion: 10
			}
		},
		mounted(){
			// this.$http.post('selectSession').then((response) => {
			// 	console.log(response.body.user_id)
			// 	if(!response.body.user_id)  window.location.href="http://www.bmwenwo.com/index.php/PcApi/login";
			// })
			// 测试是否支持webview
			// alert(navigator.userAgent)
			// alert('window.__wxjs_is_wkwebview:'+window.__wxjs_is_wkwebview);
			// 测试iosversion
			if(!!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
				var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
				this.iosVersion = parseInt(v[1], 10);  
			}

			this.type = getParameterByName('type') || 1;
			// console.log(this.type)

			window.onpopstate = function(){
				// 为什么此时不会重新渲染页面呢？
				this.type = getParameterByName('type') || 1;
				console.log(this.type)
			}
			this.$http.post('',{
				name:'xwlt.pc.Sign'
			}).then((response)=>{
				this.is_sign = Number(response.body.data.Sign);
			})
		},
		methods:{
			clickNav(type){
				this.type = type;
				// alert(type)
				history.pushState({},'','./index.html?type=' + type);
				// if(this.iosVersion < 10) location.reload();
			},
			sign(){
				this.$http.post('',{
					name:'xwlt.pc.AddSign'
				}).then((response)=>{
					if(response.body.code === 1000){
						let day = response.body.data.signNum;
						let credit = response.body.data.sign_integral;
						this.is_sign = 1;
						myAlert.big('<p>签到成功获得'+ credit +'积分！</p><p>您已连续签到'+ day +'天！</p><p>保持喔~</p>')
					} else myAlert.small(response.body.msg);
				})
			}
		},
		components:{myfooter,homepage,columnn}
	}
</script>
<style lang='less' scoped>
#index_header{
	width: 100%;
	height: 1.33rem;
	padding: 0.27rem;
	position: relative;
}
#column{
	width: 4rem;
	height: 0.8rem;
	border-radius: 0.13rem;
	border: 0.037rem solid #4c4c4c;
	margin: 0 auto;
	span{
		float: left;
		width: 50%;
		text-align: center;
		height: .73rem;
		line-height: .73rem;
		font-size:0.43rem;
		color:#4c4c4c;
		letter-spacing:0.64px;
		border-radius: .13rem 0 0 .13rem;
		&:nth-of-type(2){
			border-left: 0.04rem solid #4c4c4c;
			border-radius: 0 .13rem .13rem 0;
		}
		&.active{
			background: #ffe857;
		}
	}
}
#index_search{
	position: absolute;
	width: 0.53rem;
	height: 0.6rem;
	background: url(../../assets/img/index/icon_search.png) no-repeat;
	background-size: 100%;
	top:0.4rem;
	right: 0.48rem;
}
#index_sign{
	width: 1.56rem;
	height: 1.56rem;
	position: fixed;
	right: 0.4rem;
	bottom: 1.69rem;
	background: url(../../assets/img/index/icon_qiandao.png) no-repeat;
	background-size: 100% 100%;
}
.shrink-leave-active{
	transition: all .8s cubic-bezier(.6,.01,.82,.86);
	transform: scale(0);
}
</style>