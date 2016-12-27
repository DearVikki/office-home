<template>
	<div id="trial_container" class="user-common-container">
		<div id="class_container"
		v-show="isClass">
			<p class="title">{{title}}</p>
			<p>网址：<a target="_blank" href="./trialFrame.html">点击此处进入</a></p>
			<p class="code">
				邀请码：
				<span class="code-txt">{{code}}</span>
				<span class="copy"
				data-clipboard-target=".code-txt">
					<smartBtn
					@clickBtn="copy"
					@returnToFirstStage="returnToFirstStage"
					:stage="btnSet.stage"
					:currentStage="btnSet.currentStage"
					:style="btnSet.style">点击复制</smartBtn>
				</span>
			</p>
			<p class="start">开始时间：{{start}}</p>
			<p class="duration">时长：{{duration}}小时</p>
			<p class="checkMic"
			@click="popSet.show = true">想要测试麦克风?</p>
		</div>
		<div class="empty"
		v-show="!isClass">暂无试讲课哟！><</div>
		<!--测试麦克风弹窗-->
		<pop :pop="popSet">
			<!--<my-audio ></my-audio-->
		</pop>
	</div>
</template>
<script>
	import Clipboard from 'clipboard';
	import smartBtn from '../../components/SmartBtn.vue';
	import myAudio from '../../components/Audio';
	import pop from '../../components/Pop';
	export default{
		name:'trial',
		data(){
			return{
				user_id:'',
				title:'有一节课',
				code:'11111',
				start:'2016年12月',
				duration:3,
				checkMic:false,
				btnSet:{
					stage:{
						0:{
							txt:'点击复制',
							disabled:false,
							active:true,
							firstStage:true
						},
						1:{
							txt:'复制成功!',
							disabled:true,
							active:true,
							lastStage:true
						}
					},
					currentStage:0,
					style:{
						width:'60px',
						margin:0,
						fontSize:'12px',
						background:'#fff',
						color:'#55b7f8'
					}
				},
				popSet:{
					style:{
						width:'300px',
						height:'200px'
					},
					show:false
				},
				//是否有课
				isClass:true
			}
		},
		mounted(){
			new Clipboard('.copy');
			let user = JSON.parse(localStorage.getItem('user'));
			this.user_id = user.user_id;
			this.$http.get('?name=education.sys.duobei.code&user_id='+this.user_id).then((response)=>{
				let data = response.body.data[0];
				if(!data) {
					this.title = '我的试听课';
					this.code = '暂无邀请码';
					this.start = '暂未开始';
					this.duration = '半';
					return;
				}
				this.title = data.class_name;
				this.code = data.input_code;
				this.duration = data.duration;

				var date = new Date(parseInt(data.start_time+'000'));
				var Y = date.getFullYear() + '-';
				var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
				var D = date.getDate()+ ' ';
				var h = date.getHours() + ':';
				var m = date.getMinutes() + ':';
				var s = date.getSeconds();
				this.start = Y + M + D + h + m + s
			})
		},
		methods:{
			copy(){
				this.btnSet.currentStage = 1;
			},
			returnToFirstStage(){
				this.btnSet.currentStage = 0;
			}
		},
		components:{smartBtn,myAudio,pop}
	}
</script>
<style scoped lang='less'>
	#trial_container{
		color:#4d4d4d;
		#class_container{
			width: 400px;
			margin: 30px auto;
		}
		/*暂无试讲课*/
		.empty{
			font-size: 14px;
			color:#4d4d4d;
			margin:0;
		}
	}
	a{
		font-size: 14px;
		color: #55b7f8;
		text-decoration: underline;
	}
	p{
		font-size: 14px;
		margin:10px 0;
	}
	.title{
		font-size:16px;
		text-align: center;
		margin-bottom: 30px;
	}
	.copy{
		display: inline-block;
		margin-left: 7px;
		vertical-align: 1px;
	}
	::selection{
		background: #fff;
	}
	.checkMic{
		text-decoration: underline;
		color: #aaa;
		cursor: pointer;
		margin-top: 40px;
	}
	/*检测麦克风弹窗*/
	#checkMic_container{
		
	}
</style>