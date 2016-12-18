<template>
	<div id="header_container">
		<div id="header_main">
			<div id="header_logo"></div>
			<div id="header_nav">
				<a>留言反馈</a>
				<a>联系教务</a>
				<a>{{user.name}}</a>
				<a @click="exit">退出</a>
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		name:'myHeader',
		data(){
			return{
				user:{
					name:'李慧慧'
				}
			}
		},
		mounted(){
			let user = JSON.parse(localStorage.getItem('user'));
			this.user.name = user.user_name;
		},
		methods:{
			exit(){
				this.$http.get('?name=').then((response)=>{
					location.href = './login.html';
				})
			}
		}
	}
</script>
<style scoped lang='less'>
	@baseColor: #55b7f8;
	#header_container{
		width:100%;
		height: 53px;
		background: #f8f8f8;
		border-bottom: 1px solid #ebebeb;
		margin-bottom: 30px;
	}
	#header_main{
		width:1026px;
		height: 100%;
		margin:0 auto;
		#header_logo{
			width:140px;
			height: 100%;
			background: url(../assets/img/index/logo.png) center no-repeat;
			background-size: contain;
			float: left;
		}
		#header_nav{
			float: right;
			height: 100%;
			line-height: 53px;
			a{
				margin-left:30px;
				font-size:16px;
				color:#4d4d4d;
				&:nth-of-type(3){
					color: @baseColor;
				}
				&:nth-of-type(4){
					cursor:pointer;
				}
			}
		}
	}
</style>