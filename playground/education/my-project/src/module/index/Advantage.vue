<template>
	<div>
		<div class="a-container" id="a_container1">
			<div class="a-inner">
				<p class="title1">流程介绍</p>
				<img src="~assets/img/index/advantage/img.png">
			</div>
		</div>
		<div class="a-container" id="a_container2">
			<div class="a-inner">
				<p class="title2">课时优势</p>
				<div id="a2_content">
					<div>改变学习方法、状态，缩短学习效率差距，提升综合素质，更有效的投入到学校学习及生活中来卓邦教育，提高效率，让学习事半功倍！</div>
				</div>
			</div>
		</div>
		<div class="a-container" id="a_container3">
			<div class="a-inner">
				<div class="a3-container">
					<div class="yellow">对成绩拔尖的学生</div>
					<ul>
						<li v-for="(l,index) in list1">
							<span class="yellow">{{index+1}}</span>
							<span>{{l}}</span>
						</li>
					</ul>
				</div>
				<div class="a3-container">
					<div class="blue">对学习普通的学生</div>
					<ul>
						<li v-for="(l,index) in list2">
							<span class="blue">{{index+1}}</span>
							<span>{{l}}</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="a-container" id="a_container4">
			<div class="a-inner">
				<p class="title2">教学研究及教学资源</p>
				<div id="a4_content">
					<div class="a4-ball" v-for="l in list3" :style="{borderColor:l.color}">
						<div :style="{backgroundColor:l.color}">
							<p>{{l.txt}}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="a-container" id="a_container5">
			<div class="a-inner">
				<p class="title1">为何不选择线下培训</p>
				<ul id="a5_content">
					<li v-for="(l,index) in list4" :style="{ backgroundImage: 'url(' + l.img + ')' , backgroundPosition: l.style}">
						<span><p>{{l.txt}}<p></span>
						<span>0{{index+1}}</span>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
	import home from '../../assets/img/index/advantage/icon_home.png';
	import internet from '../../assets/img/index/advantage/icon_internet.png';
	import quality from '../../assets/img/index/advantage/icon_quality.png';
	import personality from '../../assets/img/index/advantage/icon_personality.png';
	export default{
		name:'advantage',
		data(){
			return{
				list1:['高手之间的对决，就是看谁失误的少，讲授易错点，学习误区','更高的学习榜样，更好的学习伙伴',
				'调整学习心态，以更好的状态进去到学习中去','师徒式教学，能有更强的归属感'],
				list2:['同龄人教学，更具有耐心和共鸣','更愿意向优秀的学长和学姐请教，没有思想上的负担',
				'很多人都有学习波折和起伏经历，可以提供更好的精神鼓励，给予强大的信心','拥有优秀的学习伙伴，耳濡目染，改善自己学习状态'],
				list3:[{txt:'来自浙大优秀团队丰富的校内资源',color:'#55b7f8'},{txt:'严格的筛选制度筛选优秀的老师',color:'#ffbe10'},{txt:'新东方，学而思的师资力量成熟的培训授课模式',color:'#55b7f8'},{txt:'及时跟进与反馈确保学习的提升',color:'#ff958f'}],
				list4:[{txt:'在家就可以学习，让学生以一种放松的状态学习',img:home},{txt:'利用互联网优势，享受全中国最优秀的教学资源',img:internet},{txt:'更强大的师资力量，不是单一的培训机构和平台，而是大数据分析完整的教学体系，质量保证',img:quality, style:'36px'},{txt:'更人性化，高度定制化，让学生从里到外，都得到巨大提升',img:personality, style:'40px'}]
			}
		}
	}
</script>
<style scoped lang='less'>
	.a-container{
		width: 100%;
		padding: .1px 0;
	}
	.a-inner{
		max-width: 1240px;
		margin: 0 auto;
		padding: 0 20px;
		width: 100%;
	}
	.title1{
		font-size:50px;
		color:#6d9de2;
		letter-spacing:1px;
		margin-top: 90px;
		text-align: center;
	}
	.title2{
		font-size:50px;
		color:#ffffff;
		text-align:center;
		margin-top: 90px;
	}
	#a_container1{
		text-align:center;
		img{
			width: 100%;
			margin-top: 100px;
			margin-bottom: 180px;
		}
	}
	#a_container2{
		background: url(../../assets/img/index/advantage/back.png) center no-repeat;
		background-size:100% 100%;
		min-height: 780px;
		padding: .1px 30px 170px 30px;
		.a-inner{
			#a2_content{
				width: 800px;
				border:7px solid #ffffff;
				max-width:976px;
				min-height:262px;
				margin: 82px auto 0 auto;
				padding:30px;
				>div{
					font-size:24px;
					color:#000000;
					letter-spacing:0.48px;
					line-height:40px;
					width: 100%;
					height: 100%;
					background: #fff;
					padding: 60px 40px;
				}
			}
		}
	}
	#a_container3{
		padding-top: 80px;
		.a-inner{
			max-width: 990px;
			/*有个问题 就是在页面过小时会有滚动条*/
			/*margin-left:20%;*/
		}
		.yellow{
			background: #ffbe10;
		}
		.blue{
			background: #55b7f8;
		}
		/*两个列表*/
		.a3-container{
			margin-bottom: 85px;
			/*小标题部分*/
			>div{
				width: 317px;
				height: 68px;
				line-height: 68px;
				text-align: center;
				font-size: 30px;
				letter-spacing: .6px;
				color: #fff;
			}
			li{
				font-size: 24px;
				overflow: hidden;
				margin-top: 20px;
				width: 100%;
				span:first-of-type{
					width:34px;
					height: 34px;
					line-height: 34px;
					text-align: center;
					color: #fff;
					vertical-align: top;
					display: inline-block;
				}
				span:nth-of-type(2){
					color:#525252;
					letter-spacing:0.48px;
					vertical-align: middle;
					display: inline-block;
					max-width: ~'calc(100% - 70px)';
					margin-left: 20px;
				}
			}
		}
	}
	#a_container4{
		background: url(../../assets/img/index/advantage/bg.png) center no-repeat;
		background-size: 100% 100%;
		.a-inner{
			max-width: 1450px;
		}
		#a4_content{
			display: flex;
			flex-wrap: wrap;
			justify-content: space-around;
			margin-top: 150px;
			margin-bottom: 190px;
			.a4-ball{
				width: 294px;
				height: 294px;
				border: 7px solid transparent;
				padding: 13px;
				border-radius: 100%;
				>div{
					width: 100%;
					height: 100%;
					border-radius: 100%;
					font-size:24px;
					color:#ffffff;
					letter-spacing:0.48px;
					text-align:center;
					display: flex;
					p{
						max-width: 172px;
						margin:auto;
					}
				}
			}
		}
	}
	#a_container5{
		.a-inner{
			max-width:960px;
		}
		#a5_content{
			width: 100%;
			max-width: 1048px;
			margin:90px auto;
			li{
				width: 100%;
				height: 126px;;
				padding:18px 18px 18px 140px;
				background-color: #55b7f8;
				background-position: 30px center;
				background-repeat: no-repeat;
				position: relative;
				border-radius: 0 100px 100px 0;
				margin-bottom: 50px;
				/*文字部分*/
				span:nth-of-type(1){
					border-left: 4px solid #fff;
					color:#fff;
					padding: 0 45px;
					vertical-align: middle;
					display: flex;
					width:~'calc(100% - 110px)';
					height: 80px;
					margin-top: 5px;
					p{
						margin:auto;
						font-size:24px;
						color:#ffffff;
						letter-spacing:0.6px;
						text-align:center;
					}
				}
				/*序号部分*/
				span:nth-of-type(2){
					position: absolute;
					right: 18px;
					top:18px;
					background:#ffffff;
					width:95px;
					height:95px;
					border-radius:100%;
					font-size: 36px;
					line-height: 95px;
					text-align: center;
					color: #55b7f8;
				}
			}
		}
	}
</style>