<template>
	<div>
		<div>
			<div id="threshold_container" class="teacher-container">
				<div class="inner">
					<div class="teacher-title">
						<div>
							<img src="~assets/img/index/teacher/t1.png">
						</div>
						<div>
							<img src="~assets/img/index/teacher/t2.png">
						</div>
					</div>
					<div id="threshold_main">
						<div id="threshold_left">
							<img src="~assets/img/index/teacher/a1.png">
						</div>
						<ul id="threshold_right">
							<li v-for="t in thresholds"
							v-html="t.content"
							:style="t.style"></li>
						</ul>
					</div>
				</div>
			</div>
			<div id="quality_container" class="teacher-container">
				<div class="inner">
					<div class="teacher-title">
						<div>
							<img src="~assets/img/index/teacher/t3.png">
						</div>
						<div>
							<img src="~assets/img/index/teacher/t4.png">
						</div>
					</div>
					<div id="quality_main">
						<div id="quality_left">
							<img src="~assets/img/index/teacher/a2.png">
						</div>
						<!-- 小球球区 -->
						<div id="quality_right">
							<div v-for='c in circles' :id="c.id">
								<img class="arr" :src="c.img">
								<div class="circle-container">
									<div class="circle">{{c.title}}</div>
									<div class="des">{{c.des}}</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- 教师库 -->
			<div id="profile_container" class="teacher-container">
				<div class="inner">
					<img src="~assets/img/index/teacher/head.png">
					<ul>
						<li v-for="t in teachers">
							<img :src="t.img">
							<div class="layer">
								<p>{{t.name}}</p>
								<p>{{t.school}}</p>
								<p>{{t.class}}</p>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import a1 from '../../assets/img/index/teacher/arrow1.png';
	import a2 from '../../assets/img/index/teacher/arrow3.png';
	import a3 from '../../assets/img/index/teacher/arrow2.png';
	import p1 from '../../assets/img/index/teacher/p1.png';
	import p2 from '../../assets/img/index/teacher/p2.png';
	import p3 from '../../assets/img/index/teacher/p3.png';
	import p4 from '../../assets/img/index/teacher/p4.png';
	import p5 from '../../assets/img/index/teacher/p5.png';
	import p6 from '../../assets/img/index/teacher/p6.png';
	import p7 from '../../assets/img/index/teacher/p7.png';
	import p8 from '../../assets/img/index/teacher/p8.png';
	export default{
		name:'teacher',
		data(){
			return{
				thresholds:[{
					content:'1.本科学校需属于国家<span class="impo">985/211</span>工程',
					style:'background:#fd7a6f'
				},{
					content:'2.大学学习期间专业排名前<span class="impo">20%</span>',
					style:'background:#fb8c63'
				},{
					content:'3.所教学科知识通过笔试环节',
					style:'background:#fbc563'
				},{
					content:'4.经过电话/视频面试合格',
					style:'background:#1ecf83'
				},{
					content:'5.参与名校昇组织的教学能力培训并通过',
					style:'background:#55b7f8'
				},{
					content:'6.线上试讲通过教研组审核',
					style:'background:#9ca7fe'
				}],
				circles:[{
					id:'c1',
					img:a1,
					title:'升级考核',
					des:'会根据每位教师的教学表现进行晋升考核'
				},{
					id:'c2',
					img:a2,
					title:'教学培训',
					des:'每位名校昇的老师还需要接受教研团队的质量把关'
				},{
					id:'c3',
					img:a3,
					title:'中期抽查',
					des:'教师上课期间我们教研团队会不定时抽查'
				}],
				teachers:[{
					img:p1,
					name:'xxx',
					school:'xx',
					class:'xxx'
				},{
					img:p2,
					name:'xxx',
					school:'xx',
					class:'xxx'
				},{
					img:p3,
					name:'xxx',
					school:'xx',
					class:'xxx'
				},{
					img:p4,
					name:'xxx',
					school:'xx',
					class:'xxx'
				},{
					img:p5,
					name:'xxx',
					school:'xx',
					class:'xxx'
				},{
					img:p6,
					name:'xxx',
					school:'xx',
					class:'xxx'
				},{
					img:p7,
					name:'xxx',
					school:'xx',
					class:'xxx'
				},{
					img:p8,
					name:'xxx',
					school:'xx',
					class:'xxx'
				}]
			}
		}
	}
</script>
<style lang="less">
.impo{
	color:#ffc761;
}
#threshold_right li:hover{
	.impo{
		font-weight: bold;
	}
}
</style>
<style lang='less' scoped>
	.teacher-container{
		width: 100%;
		padding: .1px 0;
	}
	.inner{
		width: 100%;
		max-width: 1240px;
		margin: 0 auto;
		.teacher-title{
			margin-top: 50px;
			div{
				text-align: center;
			}
			div:nth-of-type(1){
				width: 400px;
				margin: 0 auto;
			}
			div:nth-of-type(2){
				width:1000px;
				margin: 0px auto 40px auto;
			}
		}
	}
	#threshold_container{
		background: #efeff4;
		#threshold_main{
			overflow: hidden;
			#threshold_left{
				float: left;
				width: 328px;
				position: relative;
				/*根据右侧条条计算而来*/
				height: 660px;
				img{
					position: absolute;
					width: 100%;
					bottom: 0;
					left: 0;
				}
			}
			#threshold_right{
				float: right;
				width: 780px;
				li{
					font-size: 32px;
					color:#fff;
					border-radius: 100px;
					height: 80px;
					line-height: 80px;
					padding: 0 36px;
					box-shadow: 0 4px 10px 0 rgba(0,0,0,.25);
					margin-bottom: 30px;
					.impo{
						color:#ffc761;
						&:hover{
							transform:scale(1.2);
						}
					}
				}
			}
		}
	}
	#quality_container{
		background: url(../../assets/img/index/teacher/arrow.png) no-repeat center;
		background-size: contain;
		#quality_main{
			overflow: hidden;
			#quality_left{
				float: left;
				width: 456px;
				position: relative;
				/*根据右侧条条计算而来*/
				height: 660px;
				img{
					position: absolute;
					width: 100%;
					bottom: 0;
					left: 0;
				}
			}
			#quality_right{
				float: right;
				width: 780px;
				/*小球球*/
				.circle-container{
					width: 224px;
					position: absolute;
					.circle{
						width: 224px;
						height: 224px;
						border-radius: 100%;
						box-shadow: 0 6px 16px 0 rgba(0,0,0,.2);
						font-size: 36px;
						text-align: center;
						line-height: 224px;
						font-weight: bold;
						color: #fff;
						background-image: url(../../assets/img/index/teacher/light.png);
						background-repeat: no-repeat;
						background-position: 130px 20px;
					}
					.des{
						width: 194px;
						margin: 10px auto;
						font-size: 20px;
						color:#8a8a8a;
					}
				}
				.arr{
					position: absolute;
					opacity: 0;
					animation:arrShine 6s infinite;
				}
				#c1,#c2,#c3{
					position: relative;
					float: left;
				}
				#c1{
					width: 224px;
					height: 670px;
					.arr{
						left: 70px;
						top: 170px;
					}
					.circle-container{
						bottom:0;
						.circle{
							background-color:#f5c776;
						}
					}
				}
				#c2{
					width: 490px;
					height: 335px;
					.arr{
						left: 300px;
						top: 190px;
						animation-delay: 2s;
					}
					.circle-container{
						left: 30px;
						top: 0px;
						.circle{
							background-color:#47df9e;
						}
					}
				}
				#c3{
					width: 490px;
					height: 335px;
					.arr{
						top: 230px;
						left: 60px;
						animation-delay: 4s;
					}
					.circle-container{
						left: 267px;
						top: 40px;
						.circle{
							background-color:#ffa173;
						}
					}
				}
			}
		}
	}
	#profile_container{
		.inner>img{
			display: block;
			margin: 60px auto 40px auto;
		}
		ul{
			display: flex;
			width:100%;
			justify-content: space-around;
			flex-wrap: wrap;
			li{
				box-shadow:0px 6px 12px 0px rgba(0,0,0,0.34);
				border-radius:24px;
				width:258px;
				height:336px;
				margin-bottom: 42px;
				position: relative;
				img{
					border-radius: 24px;
				}
				.layer{
					display: none;
					border-radius: 0 0 24px 24px;
					position: absolute;
					bottom:0;
					left: 0;
					width: 100%;
					color: #fff;
					text-align: center;
					font-size: 12px;
					background: rgba(0,0,0,.36);
					padding-bottom: 5px;
					p:nth-of-type(1){
						font-size: 16px;
					}
				}
				&:hover .layer{
					display: block;
				}
			}
		}
	}
	@keyframes arrShine{
		0%{
			opacity: 1;
		}
		32%{
			opacity: 1;
		}
		33%{
			opacity: 0;
		}
		100%{
			opacity: 0;
		}
	}
</style>