<template>
	<div id="buyCourse_container" class="user-common-container">
		<!--切换时间线-->
		<div class="time-nav"
		:class="{active:!history}"
		@click="history = false">课程列表</div>
		<div class="time-nav"
		:class="{active:history}"
		@click="history = true">已购记录</div>
		<ul id="course_container" v-show="!history">
			<li v-for="list in lists">
				<p class="stage">{{list.stage}}</p>
				<p class="hour">{{list.class_hour}}课时</p>
				<p class="price">现价：{{list.actual_price}}元</p>
				<p class="price0">原价：{{list.original_price}}元</p>
				<div class="tag-container">
					<span v-for="tag in list.tags">{{tag}}</span>
				</div>
				<a class="buy" target="_blank" :href="'https://www.hzchuangxiangzhe.cn/php/alipay/action?goods_id='+list.id">我要购买</a>
			</li>
		</ul>
		<ul id="course_container" v-show="history">
			<li v-for="list in history_lists">
				<p class="stage">{{list.stage}}</p>
				<p class="hour">{{list.class_hour}}课时</p>
				<p class="price">现价：{{list.actual_price}}元</p>
				<p class="price0">原价：{{list.original_price}}元</p>
				<div class="tag-container">
					<span v-for="tag in list.tags">{{tag}}</span>
				</div>
				<a class="buy" target="_blank" :href="'https://www.hzchuangxiangzhe.cn/php/alipay/action?goods_id='+list.id">我要购买</a>
			</li>
		</ul>
	</div>
</template>
<script>
	export default{
		name:'buycourse',
		data(){
			return{
				lists:[],
				history_lists:[],
				history:false
			}
		},
		mounted(){
			this.$http.get('?name=education.sys.goods.list').then((response)=>{
				response.body.data.list.forEach((e)=>{
					e.tags = ['全科通用',e.stage+'通用'];
					this.lists.push(e);
				})
			})
			this.$http.get('?name=education.sys.goods.payed.list').then((response)=>{
				response.body.data.list.forEach((e)=>{
					e.tags = ['全科通用',e.stage+'通用'];
					this.lists.push(e);
				})
			})
		},
		methods:{
			pay(){

			}
		}
	}
</script>
<style scoped lang='less'>
	@baseColor:#55b7f8;
	/*切换时间线*/
	.time-nav{
		width: 150px;
		height: 30px;
		font-size: 16px;
		border-bottom:1px solid #ebebeb;
		display: inline-block;
		text-align: center;
		position: relative;
		cursor:pointer;
		margin-bottom: 30px;
		&.active{
			border-bottom-color: @baseColor;
			color: @baseColor;
			&:after{
				content:'';
				position: absolute;
				border: 5px solid transparent;
				border-bottom-color:#fff;
				right:68.5px;
				bottom:-.5px;
			}
			&:before{
				content:'';
				position: absolute;
				border: 6px solid transparent;
				border-bottom-color: @baseColor;
				right:67.5px;
				bottom:-.4px;
			}
		}
	}
	#course_container{
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}
	li{
		width: 200px;
		height: 300px;
		padding: .1px;
		background: url(../../assets/img/user/card.png) center no-repeat;
		background-size: 100%;
		text-align: center;
		color: #fff;
		.stage{
			font-size:24px;
			letter-spacing:0.47px;
			margin-top: 30px;
		}
		.hour{
			font-size: 16px;
			letter-spacing: .31px;
			margin-top: 15px;
		}
		.price{
			font-size: 14px;
			letter-spacing: .27px;
			margin-top: 30px;
		}
		.price0{
			font-size: 10px;
			letter-spacing: .19px;
			color: #d5e1ff;
			text-decoration: line-through;
		}
		.tag-container{
			display: flex;
			justify-content: space-around;
			margin: 40px auto 10px auto;
			width: 170px;
			/*用了scale来使字体相对为10px*/
			span{
				color: #fff;
				font-size: 12px;
				width: 75px;
				height: 30px;
				line-height: 30px;
				text-align: center;
				background-repeat: no-repeat;
				background-size: 100% 100%;
				transform: scale(.8);
				padding-left: 8px;
				&:nth-of-type(1){
					background-image: url(../../assets/img/user/tip1.png);
				}
				&:nth-of-type(2){
					background-image: url(../../assets/img/user/tip2.png);
				}
			}
		}
		.buy{
			display: inline-block;
			background-image:linear-gradient(-180deg, #88a9ff 0%, #517ae5 100%);
			box-shadow:0px 1px 4px 0px rgba(0,0,0,0.26);
			border-radius:2px;
			width:108px;
			height:30px;
			text-align: center;
			line-height: 30px;
			font-size: 12px;
			color: #fff;
			cursor: pointer;
		}
	}
</style>