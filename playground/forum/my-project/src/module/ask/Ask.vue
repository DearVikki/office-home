<template>
	<div id="ask_container">
		<div class="c-line">问题类别
		<select v-model="type" @change="typeChange">
			<option value=1>生活</option>
			<option value=2>学习</option>
			<option value=3>跑腿</option>
			<option value=4>拼拼</option>
			<option value=5>失物</option>
		</select>
		</div>
		<div class="c-line" v-show="(type==1 && type1Option.length!==0) || (type==4 && type4Option.length!==0)">
			<label for="subtype">问题子类别</label>
				<select name="subtype" v-model="subtype">
					<option v-if="type==1" v-for="(o,i) in type1Option"
					:value=o.type_id>{{o.type_name}}</option>
					<option v-else v-for="(o,i) in type4Option"
					:value=o.type_id>{{o.type_name}}</option>
				</select>
		</div>
		<div class="c-line" id="deadline" v-if="type==3">请选择截至日期
			<Group>
			     <Datetime v-model="deadline.val" @on-change="timeChange" title="截止时间" :start-date="deadline.today"
			     confirm-text="确定" cancel-text="取消"></Datetime>
			 </Group>
			 <span id="deadline_time">{{deadline.val}}</span>
		</div>
		<div class="c-line">
			悬赏类型
			<select v-model="reward_type">
				<option value="integral">积分悬赏</option>
				<option value="money">金钱悬赏</option>
			</select>
		</div>
		<div class="c-line reward-container" v-show="reward_type==='integral'">积分悬赏 <span class="c-color">(当前积分:{{existingCredit}}分)</span>
			<input placeholder="(单位:分)" v-model="credit">
		</div>
		<div class="c-line reward-container" v-show="reward_type==='money'">金钱悬赏 <span class="c-color">(微信支付)</span>
			<input placeholder="最低1元起(单位:元)" v-model="money">
		</div>
		<div id="ask_question_container">
			<div class="c-line"><input placeholder="请写下你的问题，以问号结尾" v-model="question"></div>
			<textarea class="c-line" placeholder="请填写问题相关描述 (选填)"
			v-model="questionDescibe"></textarea>
		</div>
		<div id="ask_img_container" class="c-line">
			<input type="file"
			ref="file"
			@change="fileChange">
			<div class="img-holder" v-for="(img, i) in imgs">
				<div class="delete" @click="deleteImg(i)"
				v-show="img.file">×</div>
				<img :src="img.path">
			</div>
			<div class="img-holder" @click="$refs.file.click()"
			v-show="imgs.length<2">+</div>
			<span class="c-color">(最多可上传2张)</span>
		</div>
		<div class="c-big-btn"
		:class="{disabled: uploading}"
		@click="clickPost">发布<span v-if="uploading">中..</span></div>
	</div>
</template>
<script>
	import {Group, Datetime} from 'vux';
	import {getParameterByName, myAlert} from '../../assets/js/utils.js'
	import compressImg from '../../assets/js/compressImg.js'
	import pingpp from 'pingpp-js';
	export default{
		name:'ask',
		data(){
			return {
				type:1,
				subtype:'',
				type1Option:[{
					type_id:'1',
					type_name:'jj'
				},{
					type_id:'2',
					type_name:'def'
				}],
				type4Option:[],
				deadline:{
					today:'',
					val:'',
					utc:''
				},
				reward_type:'integral',
				existingCredit:'',
				credit:'',
				money:'',
				question:'',
				questionDescibe:'',
				imgs:[],
				compressed: true,
				uploading: false,
				userpost:false, //新增 表面用户是否已点击post
				questionId: ''
			}
		},
		mounted(){
			// 获取入口类别
			this.type = Number(getParameterByName('type')) || 1;
			// 拉取生活和拼拼的子类别
			this.$http.post('',{
				name:'xwlt.pc.type'
			}).then((response)=>{
				let type = response.body.data.type;
				this.type1Option = type[0].ToWtype;
				this.type4Option = type[3].ToWtype;
				// 匹配入口子类别
				if(this.type == 1) this.subtype = Number(getParameterByName('subtype')) || this.type1Option[0].type_id;
				else if(this.type == 4 && this.type4Option.length !== 0) this.subtype = getParameterByName('subtype') || this.type4Option[0].type_id;
			})
			this.setToday();
			// 获取用户积分
			this.$http.post('',{
				name:'xwlt.pc.GetNowIntegral'
			}).then((response)=>{
				this.existingCredit = Number(response.body.data.existing_integral);
			})
		},
		methods:{
			setToday (value) {
			    let now = new Date()
			    let cmonth = now.getMonth() + 1
			    let day = now.getDate()
			    if (cmonth < 10) cmonth = '0' + cmonth
			    if (day < 10) day = '0' + day
			    this.deadline.today = now.getFullYear() + '-' + cmonth + '-' + day;
			    console.log(this.deadline.today)
			},
			typeChange(){
				if(this.type == 1) this.subtype = this.type1Option[0].type_id;
				else if(this.type == 4 && this.type4Option.length !== 0) this.subtype = this.type4Option[0].type_id;
			},
			timeChange(val){
				if(isNaN(new Date(val).getTime())) this.deadline.utc = '';
				else this.deadline.utc = new Date(val).getTime() + '1000';
			},
			fileChange(){
				var file = this.$refs.file.files[0];
				var name = file.name;
				if(!name.match(/.(jpg|jpeg|png|gif)$/i)){
					myAlert.small('请选择图片文件!');
					return;
				}
				name = 'picture' + Date.now();
				this.compressed = false;
				console.log('INITIAL name:'+file.name+',type:'+file.type+',size:'+file.size)
				alert('INITIAL name:'+file.name+',type:'+file.type+',size:'+file.size)
				var src = window.URL.createObjectURL(file);
				this.imgs.push({path:src, file:'', name: name});
				var img = new Image();
				img.src = src;
				img.onload = () => {
					file = compressImg(img, file.type);
					console.log('COMPRESSED name:'+file.name+',type:'+file.type+',size:'+file.size);
					this.imgs.forEach((e) => {
						if(e.name === name) e.file = file;
					})
					this.compressed = true;
					// 压缩完尝试自动调用回调的post
					this.post();
				}
			},
			deleteImg(i){
				this.imgs.splice(i,1);
			},
			allCheck(){
				if(this.type == 3 && !this.deadline.utc) {
					myAlert.small('别忘了截止日期喔');
					return false;
				}
				if(this.reward_type === 'money'){
					if(isNaN(this.money)){
						myAlert.small('悬赏金额须为数字喔');
						return false;
					}
					else if(!Number(this.money)) {
						myAlert.small('别忘了悬赏金额喔');
						return false;
					}
					else if(!Number(this.money) < 1) {
						myAlert.small('悬赏金额最低为1元喔');
						return false;
					}
				}
				else if(this.reward_type === 'integral'){
					if(isNaN(this.credit)){
						myAlert.small('悬赏积分须为数字喔');
						return false;
					}
					else if(!Number(this.credit)) {
						myAlert.small('别忘了悬赏积分喔');
						return false;
					}
					else if(Number(this.credit) > Number(this.existingCredit)) {
						myAlert.small('哎呀 积分不足喔');
						return false;
					}
				}
				if(!this.question){
					myAlert.small('别忘了标题喔');
					return false;
				}
				return true;
			},
			clickPost(){
				this.userpost = true;
				this.post();
			},
			post(){
				if(!this.allCheck() || this.uploading) return;
				if(!this.userpost || !this.compressed) return;
				this.uploading = true;
				let fm = new FormData();
				this.imgs.forEach((f)=>{
					fm.append('img[]',f.file, f.name+'.jpg');
				})
				fm.append('name','xwlt.pc.AddQuestion');
				fm.append('type_id',this.type);
				fm.append('type_label_id',this.subtype);
				fm.append('reward_type',this.reward_type);
				fm.append('integral',this.credit);
				fm.append('money',this.money);
				fm.append('question',this.question);
				fm.append('question_describe',this.questionDescibe);
				fm.append('endtime',this.deadline.utc);
				this.$http.post('',fm).then((response)=>{
					if(response.body.code === 1000) {
						this.questionId = response.body.data.id;
						// 金额悬赏
						if(this.reward_type==='money'){
							this.$http.post('',{
								name:'xwlt.pc.UpdatePay',
								channel:'wx_pub',
								amount:this.money*100,
								order_no:new Date().getTime()+Math.ceil(Math.random())*1000,
								description:JSON.stringify({
									type:'question',
									question_id:response.body.data.id
								})
							}).then((response)=>{
								if(response.body.code === 1000){
									this.createPayment(response.body.data.charge);
								}
							})
						} else this.publishSuccess();
					} else {
						this.uploading = false;
						this.userpost = false;
						myAlert.small(response.body.msg);
					}
				})
			},
			createPayment(charge){
				pingpp.createPayment(charge, (result, err)=>{
				    console.log(result);
				    console.log(err.msg);
				    console.log(err.extra);
				    if (result == "success") {
				       this.publishSuccess();
				    } else if (result == "fail") {
				         myAlert.small('支付遇到问题了!');
				    } else if (result == "cancel") {
				        myAlert.small('支付被取消了!');
				    }
				});
			},
			publishSuccess(){
				myAlert.big('发布成功拉!');
				setTimeout(()=>{
					location.replace('./question-detail.html?id='+ this.questionId);
				},1000)
			}
		},
		computed:{
			// allCheck(){
			// 	if(this.type == 3 && this.deadline.utc==='NaN1000') return false;
			// 	else if(this.reward_type === 'money'){
			// 		console.log(isNaN(this.money))
			// 		if(!this.money) return false;
			// 		else if(isNaN(this.money)) return false;
			// 	}
			// 	else if(this.reward_type === 'integral'){
			// 		if(!this.credit) return false;
			// 		else if(isNaN(this.credit)) return false;
			// 	}
			// 	else if(!this.question) return false;
			// }
		},
		components:{Group, Datetime}
	}
</script>
<style lang='less'>
	.dp-header .dp-item{
		font-size: .4rem !important;
		height: .85rem !important;
		line-height: .85rem !important;
		color:#ffe857 !important;
	}
	.scroller-item{
		font-size: .4rem !important;
	}
</style>
<style lang='less' scoped>
	.c-line{
		font-size: 0.43rem;
		color:#545454;
		select,input{
			float: right;
			font-size: 0.43rem;
			color:#545454;
			margin-top: 0.4rem;
			border: none;
			appearance: none;
			background: transparent;
		}
		select{
			background-image:url(../../assets/img/index/icon_next.png);
			background-position:right .2rem;
			background-size: .2rem .3rem;
			background-repeat:no-repeat;
			padding-right:0.38rem;
		}
		input{
			width: 2.2rem;
		}
	}
	.reward-container input{
		text-align: right;
		width: 4rem;
	}
	/*设置截至日期的插件*/
	#deadline > div{
		width: 100%;
		height: 100%;
		position: absolute;
		right: 0;
		bottom: 0;
		opacity: 0;
	}
	#deadline_time{
		float: right;
		background-image:url(../../assets/img/index/icon_next.png);
		background-position:right center;
		background-size: .2rem .3rem;
		background-repeat:no-repeat;
		padding-right:0.38rem;
		height: 1.3rem;
	}
	#ask_question_container{
		margin-top: .26rem;
		input{
			float: left;
			width: 100%;
		}
		textarea{
			padding-top:.2rem;
			padding-bottom: .2rem;
			height: 2.9rem;
			width: 100%;
			font-size: .27rem;
			line-height: .43rem;
		}
	}
	#ask_img_container{
		margin-top:.26rem;
		padding-top:.4rem;
		height:2.9rem;
		input{
			display:none;
		}
		.img-holder{
			width:2.1rem;
			height: 2.1rem;
			border:2px dashed #d3d3d3;
			margin-right:.2rem;
			display: inline-block;
			text-align:center;
			font-size:1rem;
			font-weight:lighter;
			color:#d3d3d3;
			line-height:2.1rem;
			vertical-align:middle;
			position: relative;
			img{
				width:100%;
				height:100%;
			}
			.delete{
				position: absolute;
				font-size: .35rem;
				line-height: .35rem;
				width: .4rem;
				height: .4rem;
				right: 0;
				top: 0;
				background: #ffe857;
				border-radius: 100%;
				color: #fff;
			}
		}
		.c-color{
			vertical-align:bottom;
			line-height:.7rem;
		}
	}
	.c-big-btn{
		margin-top:1rem;
	}
</style>