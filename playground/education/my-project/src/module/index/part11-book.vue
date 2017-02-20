<template>
	<div id="book_container">
		<div id="book_inner">
			<img id="book_rocket" src="~assets/img/index/rocket.png">
			<img id="book_title" src="~assets/img/index/title3.png">
			<div class="input-wrapper">
				<input placeholder="请输入您的姓名"
				v-model="name"
				@focus="nameError = false">
				<p class="error"
				v-show="nameError">请输入姓名喔</p>
			</div>
			<div class="input-wrapper">
				<input placeholder="请输入您的手机"
				maxlength="11"
				v-model="phone"
				@focus="phoneError = false"
				@keyup.enter = "bookNow">
				<p class="error"
				v-show="phoneError">手机格式不对喔</p>
			</div>
			<!-- 预约第一步按钮：发送验证码+触发弹窗 -->
			<div id="book_btn"
			@click="bookNow">
				立即预约
				<div id="book_img_container">
					<img class="hand" src="~assets/img/index/hand.png">
					<img class="star" src="~assets/img/index/star1.png">
					<img class="star" src="~assets/img/index/star1.png">
					<img class="star" src="~assets/img/index/star1.png">
				</div>
			</div>
		</div>
		<!-- 弹窗：接受验证码+选择科目 -->
		<pop
		:pop="pop"
		:popMounted="popMounted">
			<div>
				<div v-show="!bookSuccess">
					<p class="pop-title">免费试听</p>
					<div class="pop-input-container">
						<input id="code" placeholder="请输入您收到的验证码" autofocus
						v-model="code"
						@focus="codeWarn=false"
						:class="{warn:codeWarn}">
					</div>
					<!-- <div class="pop-input-container">
						<input id="school" placeholder="请输入所在学校"
						v-model="school"
						@focus="schoolWarn=false"
						:class="{warn:schoolWarn}">
					</div> -->
					<div class="pop-input-container" id="pop_user_container">
						<select v-model="user" :class="{warn:userWarn}">
							<option value="" style="display:none">----请选择您的身份----</option>
							<option value="家长">家长</option>
							<option value="学生">学生</option>
						</select>
					</div>
					<div id="pop_select_container">
						<select v-model="grade">
							<option value="高一">高一</option>
							<option value="高二">高二</option>
							<option value="高三">高三</option>
							<option value="初一">初一</option>
							<option value="初二">初二</option>
							<option value="初三">初三</option>
						</select>
						<select v-model="subject">
							<option value="数学">数学</option>
							<option value="英语">英语</option>
							<option value="语文">语文</option>
							<option value="物理">物理</option>
							<option value="化学">化学</option>
							<option value="生物">生物</option>
							<option value="政治">政治</option>
							<option value="历史">历史</option>
							<option value="地理">地理</option>
						</select>
						<!-- <select v-model="level">
							<option value="薄弱">薄弱</option>
							<option value="中等">中等</option>
							<option value="良好">良好</option>
						</select> -->
					</div>
					<p class="pop-txt">已有多名学生在名校昇获得提升！</p>
					<div id="pop_btn"
					@click="bookNow2">{{txt}}</div>
				</div>
				<div v-show="bookSuccess" class="book-success">
					预约成功啦！:D<br>
					请静候客服联系喔！
				</div>
			</div>
		</pop>
	</div>
</template>
<script>
	import pop from '../../components/Pop.vue';
	export default{
		name:"part11Book",
		data(){
			return{
				name:'',
				phone:'',
				school:'',
				user:'',
				grade:'高一',
				subject:'数学',
				level:'薄弱',
				code:'',
				nameError:false,
				phoneError:false,
				schoolWarn:false,
				userWarn:false,
				codeWarn:false,
				txt:'立即预约',
				pop:{
					show:false,
					style:{
						width:'350px',
						height:'300px',
						padding: '35px 50px 30px 50px'
					},
					popReset(){
						this.txt = '立即预约';
						this.bookSuccess = false;
					}
				},
				// 预约成功的v-show
				bookSuccess:false
			}
		},
		methods:{
			// 清空弹窗
			resetPop(){
				this.bookSuccess = false;
				this.code = '';
			},
			// mounted: 移焦点入input框
			popMounted(){
				document.querySelector('#code').focus();
			},
			// 预约第一步
			bookNow(){
				if(this.name === ''){
					this.nameError = true;
					return;
				}
				if(!/^1[34578]\d{9}$/.test(this.phone)){
					this.phoneError = true;
					return;
				}
				this.$http.get('?name=education.sys.send.msg&type=connect&mobile='+this.phone).then((response)=>{
					this.pop.show = true;
				})
			},
			// 预约第二步 真正发请求:D
			bookNow2(){
				if(this.code.length<4) {
					this.codeWarn = true;
					return;
				}
				if(!this.user){
					this.userWarn = true;
					return;
				}
				// if(!this.school) {
				// 	this.schoolWarn = true;
				// 	return;
				// }
				this.$http.get('?name=education.sys.h5.add.connect&username='+this.name+'&mobile='+this.phone+'&subject='+this.subject+'&grade='+this.grade+'&source_token=&code='+this.code+'&school='+'&situation='+'&user_type='+this.user).then((response)=>{
					if(response.body.code === 1000){
						this.name = this.phone = this.code = '';
						this.bookSuccess = true;
						// setTimeout(()=>{
						// 	this.txt = '立即预约';
						// 	// this.pop.show = false;
						// },1000)
					} else if(response.body.code === 1067){
						this.name = this.phone = this.code = '';
						this.txt = '您已报名!';
						setTimeout(()=>{
							this.txt = '立即预约';
							this.pop.show = false;
						},2000)
					} else {
						this.code = '';
						this.txt = 'response.body.msg';
						setTimeout(()=>{
							this.txt = '立即预约';
						},2000)
					}
				})
			}
		},
		components:{pop}
	}
</script>
<style scoped lang='less'>
	#book_container{
		width: 100%;
		padding-top:.1px;
		position: fixed;
		bottom: 0;
		left: 0;
		height: 102px;
		background: rgba(0,0,0,.48);
		z-index: 1000;
		#book_inner{
			width: 100%;
			max-width: 1170px;
			margin:0 auto;
			#book_rocket{
				margin-top: -20px;
				margin-left: 100px;
				width: 210px;
			}
			#book_title{
				vertical-align: top;
    			margin-top: 15px;
    			width: 140px;
			}
			.input-wrapper{
				display: inline-block;
				position: relative;
				width: 150px;
				 margin-left: 30px;
				p{
					font-size: 12px;
					color:#fff;
					position: absolute;
					bottom: 10px;
					left: 0;
				}
			}
			input{
				width: 150px;
			    height: 35px;
			    border-radius: 6px;
			    vertical-align: 40px;
			    padding:10px;
			    font-size: 14px;
			    color: #5e5e5e;
			}
			#book_btn{
				display: inline-block;
				width: 148px;
				height: 40px;
				background: #fb7273;
				text-align: center;
				line-height: 40px;
				font-size: 16px;
				color:#fff;
				border-radius: 6px;
				vertical-align: 38px;
				margin-left: 30px;
				position: relative;
				cursor: pointer;
				#book_img_container{
					position: absolute;
					right: -40px;
    				top: 10px;
    				.hand{
    					width: 50px;
    					&:hover{
    						animation: shake .2s 5;
    					}
    				}
    				.star{
    					position: absolute;
    					width: 20px;
    					animation: shine 2s infinite;
    					&:nth-of-type(2){
    						top: 0;
    						right: -10px;
    					}
    					&:nth-of-type(3){
    						top: -15px;
    						right: 15px;
    					}
    					&:nth-of-type(4){
    						bottom: 5px;
    						left: -10px;
    					}
    				}
				}
			}
		}
	}
	@keyframes shine{
		50%{
			transform:scale(.8);
		}
		100%{
			transform: scale(1.2);
		}
	}
	@keyframes shake{
		50%{
			transform:rotate(10deg);
		}
		100%{
			transform:rotate(-10deg);
		}
	}
	/*弹窗部分*/
	.pop-title{
		color: #fb7273;
		font-size: 20px;
		font-weight: bold;
		text-align: center;
		margin-bottom: 10px;
	}
	.pop-input-container{
		text-align: center;
		margin-top: 20px;
		/*新加入的code*/
		input{
			width: 220px;
			padding-left: 5px;
			border-radius: 3px;
			border: 1px solid #a9a9a9;
			height: 25px;
			color: #5c5c5c;
			&.warn{
				border-color:#fb7273;
			}
		}
	}
	select{
		font-size: 12px;
		background-size: 10px 5px;
		font-size: 12px;
		background-size: 10px 5px;
		width: 100px;
		height: 25px;
		background-position: 80px;
		border-radius: 3px;
		padding-left: 5px;
		color: #5c5c5c;
		&.warn{
			border-color:#fb7273;
		}
	}
	/*新加入的身份*/
	#pop_user_container select{
		width:220px;
		background-position: 200px;
	}
	#pop_select_container{
		width: 220px;
		margin: 20px auto;
		display: flex;
		justify-content: space-between;
	}
	.pop-txt{
		color: #fb7273;
		font-size: 12px;
		text-align: center;
	}
	#pop_btn{
		width: 140px;
		height: 30px;
		line-height: 30px;
		background: #fb7273;
		border-radius: 4px;
		color: #fff;
		font-size: 14px;
		text-align: center;
		margin:5px auto;
		cursor: pointer;
	}
	/*新加入预约成功*/
	.book-success{
		color: #fb7273;
		font-size: 20px;
		font-weight: bold;
		text-align: center;
		margin-top: 60px;
		line-height: 40px;
	}
</style>