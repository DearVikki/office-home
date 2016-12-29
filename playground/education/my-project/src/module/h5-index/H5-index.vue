<template>
	<div>
		<div id="header_container">
			<div id="header_logo"></div>
			<a id="phone_container" href="tel:0571-56077158">0571-56077158</a>
		</div>
		<img id="banner1" src="~assets/img/h5/index/banner1.png">
		<div id="book_container">
			<div id="book_title"></div>
			<div id="input_container">
				<input v-for="input in inputs"
				:placeholder="input.placeholder"
				v-model="input.val"
				@keyup="checkAll">
				<select
				v-model="grade">
					<option v-for="o in options[0]"
					:value="o.value">{{o.title}}</option>
				</select>
				<select
				v-model="subject">
					<option v-for="o in options[1]"
					:value="o.value">{{o.title}}</option>
				</select>
				<div class="clear"></div>
			</div>
			<div id="book_slogan">已有多名同学在名校昇获得提升！</div>
			<div id="book_btn"
			:class="{disabled:!allchecked}"
			@click="register">{{btnText}}</div>
		</div>
		<!--第二张banner2-->
		<div id="banner2-container">
			<img src="~assets/img/h5/index/banner2.png">
		</div>
		<!--五边形部分-->
		<div id="flip_container">
			<div id="flip_title"></div>
			<div id="flip_main">
				<div class="flip-item"
				v-for="flip in flips">
					<!--翻转区-->
					<div class="flip">
						<img :src="flip.back">
					</div>
					<!--线-->
					<div class="flip-line"></div>
					<!--点-->
					<div class="flip-dot"></div>
					<!--文字-->
					<p class="flip-text">{{flip.text}}</p>
				</div>
			</div>
		</div>
		<!--最后一张banner-->
		<img id="banner3" src="~assets/img/h5/index/banner4.png">
	</div>
</template>
<script>
	import 'animate.css';
	import f21 from '../../assets/img/index/21.png';
	import f22 from '../../assets/img/index/22.png';
	import f23 from '../../assets/img/index/23.png';
	import f24 from '../../assets/img/index/24.png';
	import f25 from '../../assets/img/index/25.png';
	export default{
		name:'h5index',
		data(){
			return{
				inputs:[{
					name:'name',
					placeholder:'姓名',
					validator:{required:{msg:''}},
					val:''
				},{
					name:'phone',
					placeholder:'手机号',
					validator:{isPhone:{msg:''}},
					val:''
				}],
				options:[[{
					value:'高一',
					title:'高一'
				},{
					value:'高二',
					title:'高二'
				},{
					value:'高三',
					title:'高三'
				}],[{
					value:'数学',
					title:'数学'
				},{
					value:'物理',
					title:'物理'
				},{
					value:'化学',
					title:'化学'
				},{
					value:'英语',
					title:'英语'
				},{
					value:'语文',
					title:'语文'
				},{
					value:'生物',
					title:'生物'
				},{
					value:'地理',
					title:'地理'
				},{
					value:'政治',
					title:'政治'
				},{
					value:'历史',
					title:'历史'
				}]],
				grade:'高一',
				subject:'数学',
				//全部检查
				allchecked:false,
				btnText:'立即预约',
				flips:[{
					back: f21,
					text:'听课'
				},{
					back: f22,
					text:'师资'
				},{
					back: f23,
					text:'评估'
				},{
					back: f24,
					text:'学习'
				},{
					back: f25,
					text:'收费'
				}]
			}
		},
		mounted(){
		},
		methods:{
			isPhone(val){
				return /^1[34578]\d{9}$/.test(val);
			},
			required(val){
				return val!=='';
			},
			handleValidate(field) {
				let checked = true;
				for(var rule in field.validator){
					if(!this[rule](field.val) && checked) {
						checked = false;
						break;
					}
				}
				return checked?true:false;
			},
			checkAll(){
				for(var input in this.inputs){
					if(this.handleValidate(this.inputs[0]) && this.handleValidate(this.inputs[1]))
						this.allchecked = true;
					else this.allchecked = false;
				}
			},
			register(){
				console.log(this.inputs[0].val)
				if(!this.allchecked) return;
				let name = this.inputs[0].val,mobile = this.inputs[1].val,grade = this.grade,subject=this.subject;
				this.$http.get('?name=education.sys.h5.add.connect&username='+name+'&mobile='+mobile+'&subject='+subject+'&grade='+grade).then((response)=>{
					console.log(response);
					this.inputs[0].val=this.inputs[1].val='';
					this.btnText = '预约成功!';
					setTimeout(()=>{
						this.btnText = '立即预约'
					},1500)
				})
			}
		}
	}
</script>
<style scoped lang='less'>
	@baseColor:#55b7f8;
	@subColor:#9ca7fe;
	/*header*/
	#header_container{
		width: 100%;
		height: 1rem;
		padding:.248rem .3rem;
		#header_logo{
			width: 2.348rem;
			height: .472rem;
			background: url(../../assets/img/index/logo.png) center no-repeat;
			background-size: 100% 100%;
			float: left;
		}
		#phone_container{
			float: right;
			width: 2.8rem;
			height: .59rem;
			line-height: .59rem;
			padding-left:.7rem;
			background:url(../../assets/img/h5/phone.png) .18rem center no-repeat;
			background-size: .4rem;
			background-color: @baseColor;
			font-size: .248rem;
			color:#fff;
			box-shadow:0px 2px 4px 0px rgba(0,0,0,0.12), inset -2px -3px 1px 0px rgba(0,0,0,0.11);
			border-radius:2px;
			margin-top: -.05rem;
		}
	}
	/*第一张banner*/
	#banner1,#banner3{
		width: 100%;
	}
	/*试听报名部分*/
	#book_container{
		width: 9.3rem;
		box-shadow: 0px 0px 3px 2px rgba(0, 0, 0, 0.1);
        border-radius: 5px;
        position: relative;
        margin:.5rem auto;
        padding: .1px 0;
        &:before{
            content:'';
            width: 30px;
            height: 30px;
            position: absolute;
            top:0;
            right:0;
            background: url(../../assets/img/index/mini.png) no-repeat;
        }
        #book_title{
        	width: 2.4rem;
        	height: .74rem;
        	background: url(../../assets/img/h5/index/book.png) center no-repeat;
        	background-size: contain;
        	margin: .3rem auto;
        }
        #input_container{
        	width: 8rem;
        	margin:0 auto;
			input{
	        	width: 8rem;
	        	height: .9rem;
	        	border-radius: .05rem;
	        	border:1px solid #bbb;
	        	margin-bottom: .24rem;
	        }
	        input,select,option{
	        	font-size: .3rem;
	        	color:#949494;
	        	padding-left: .24rem;
	        }
	        select{
	        	width: 3.5rem;
	        	height: .9rem;
	        	border-radius: .05rem;
	        	border:1px solid #bbb;
	        	background-position: 3rem center;
	        	&:first-of-type{
		        	float: left;
		        }
		        &:nth-of-type(2){
		        	float:right;
		        }
	        }
        }
        #book_slogan{
        	font-size: .25rem;
        	color: @subColor;
        	text-align: center;
        	margin-top:.5rem;
        }
        #book_btn{
        	width: 3rem;
        	height: .7rem;
        	line-height: .7rem;
        	color: #fff;
        	font-size: .3rem;
        	background: @subColor;
        	border-radius: 1rem;
        	text-align: center;
        	margin:.2rem auto .4rem auto;
        	&.disabled{
        		opacity: .5;
        	}
        }
	}
	/*第二张banner*/
	#banner2-container{
		img{
			width: 100%;
		}
	}
	/*五边形区*/
	#flip_container{
		padding: .6rem 0;
		#flip_title{
			width: 5.3rem;
			height: 1.2rem;
			background: pink;
			margin: 0 auto;
			background: url(../../assets/img/index/flip_title.png) center no-repeat;
			background-size: contain;
		}
				#flip_main{
				width: 9rem;
				margin-top:.5rem;
				margin: .5rem auto;
				.flip-item{
					display: inline-block;
					width: 20%;
					/*翻转区*/
					.flip{
						width: 100%;
						height: 2.2rem;
						position: relative;
						img{
						    width: 100%;
						}
					}
					/*线*/
					.flip-line{
						width: 2px;
						height: .6rem;
						margin:-14px auto 0 auto;
					}
					/*点*/
					.flip-dot{
						width: 8px;
						height: 8px;
						border-radius: 100%;
						margin:0 auto;
					}
					/*文字*/
					.flip-text{
						font-size: .3rem;
						text-align: center;
					}
					&:first-of-type{
						.flip-line,.flip-dot{
							background: #fcde8b;
						}
						.flip-dot{
							box-shadow: 0px 0px 2px 1px #fcde8b;
						}
						.flip-text{
							color: #fcde8b;
							text-shadow: 0px 0px 10px #fcde8b;
						}
					}
					&:nth-of-type(2){
						.flip-line,.flip-dot{
							background: #fb957c;
						}
						.flip-dot{
							box-shadow: 0px 0px 2px 1px #fdd5cb;
						}
						.flip-text{
							color: #eb7a5e;
							text-shadow: 0px 0px 10px #fdd5cb;
						}
					}
					&:nth-of-type(3){
						.flip-line,.flip-dot{
							background: #abb4ff;
						}
						.flip-dot{
							box-shadow: 0px 0px 2px 1px #dce0ff;
						}
						.flip-text{
							color: #8794ff;
							text-shadow: 0px 0px 10px #dce0ff;
						}
					}
					&:nth-of-type(4){
						.flip-line,.flip-dot{
							background: #71c6ff;
						}
						.flip-dot{
							box-shadow: 0px 0px 2px 1px #c3e7ff;
						}
						.flip-text{
							color: #57b8fa;
							text-shadow: 0px 0px 10px #c3e7ff;
						}
					}
					&:nth-of-type(5){
						.flip-line,.flip-dot{
							background: #6dd9ab;
						}
						.flip-dot{
							box-shadow: 0px 0px 2px 1px #c2efdc;
						}
						.flip-text{
							color: #37d793;
							text-shadow: 0px 0px 10px #c2efdc;
						}
					}
				}
			}
	}
</style>