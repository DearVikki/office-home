<template>
	<div id="teacher_container">
		<div id="teacher_inner" class="swiper-container">
			<div class="swiper-wrapper">
				<div class="swiper-slide" v-for="teacher in teachers">
					<!--头像部分-->
					<img class="teacher-head"
					:src="teacher.head">
					<!--飞升指数-->
					<div class="teacher-point">
						<!--<p>{{teacher.point}}</p>
						<p>飞升指数</p>-->
					</div>
					<!--bottom部分-->
					<div class="teacher-bottom">
						<!--名字-->
						<div class="teacher-name fl">{{teacher.name}}</div>
						<!--title-->
						<div class="teacher-title fr">{{teacher.title}}</div>
						<div class="clear"></div>
						<!--学校专业-->
						<div class="teacher-school">{{teacher.school}} | {{teacher.major}}</div>
						<!--标签-->
						<div class="teacher-tag-container">
							<span class="teacher-tag"
							v-for="tag in teacher.tags">{{tag}}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
		</div>
	</div>
</template>
<script>
	import Swiper from '../../assets/lib/swiper.js';
	import ww from '../../assets/img/index/ww.jpg';
	import wjw from '../../assets/img/index/wjw.jpg';
	import xy from '../../assets/img/index/xy.jpg';
	import zjh from '../../assets/img/index/zjh.jpg';
	export default{
		name:'part7Teacher',
		data(){
			return{
				teachers:[{
					head:xy,
					point:72.1,
					name:'王铭钰',
					title:'三年经验',
					school:'浙江大学',
					major:'经济系',
					tags:['语文','历史','政治']
				},{
					head:zjh,
					name:'朱佳慧',
					point:80.1,
					title:'单科状元',
					school:'浙江大学',
					major:'国际经贸系',
					tags:['语文','英语']
				},{
					head:ww,
					point:87.1,
					name:'王奥',
					title:'数学竞赛金奖',
					school:'浙江大学',
					major:'计算机系',
					tags:['数学','化学','物理']
				},{
					head:wjw,
					point:85,
					name:'王景文',
					title:'高考状元',
					school:'浙江大学',
					major:'计算机系',
					tags:['数学','物理']
				}]
			}
		},
		mounted(){
			this.$nextTick(()=>{
				new Swiper('#teacher_inner', {
			     	slidesPerView:3,
			     	spaceBetween:60,
			     	loop:true,
			     	autoplay:2500,
			     	autoplayDisableOnInteraction:false
			    });
			})
		}
	}
</script>
<style scoped lang='less'>
	#teacher_container{
		width:100%;
		background: #eee;
		padding-top:.1px;
		padding-bottom: .1px;
		#teacher_inner{
			width:100%;
			max-width: 1170px;
			margin:110px auto 80px auto;
			.swiper-slide{
				height: 493px;
				background: url(../../assets/img/index/card.png) center no-repeat;
				background-size:100% 100%;
				position: relative;
				text-align: center;
				transition: all .3s;
				&:not(.swiper-slide-next){
					transform:scale(.85);
				}
				/*头像部分*/
				.teacher-head{
					width: 185px;
					height: 185px;
					border-radius: 100%;
					margin-top:90px;
				}
				/*飞升指数*/
				.teacher-point{
					margin-top: 5px;
					p:first-child{
						font-size: 22px;
						color:#fff;
					}
					p:nth-child(2){
						font-size: 12px;
						color:#a1bcff;
					}
				}
				/*bottom部分*/
				.teacher-bottom{
					width: 100%;
					height: 140px;
					position: absolute;
					bottom: 0;
					left: 0;
					padding: 13px 15%;
					text-align: left;
					/*名字*/
					.teacher-name{
						display: inline-block;
						padding-left:32px;
						width: 100px;
						background: url(../../assets/img/index/metal.png) left no-repeat;
						background-size:26px 26px;
						font-size: 22px;
						color:#4d4d4d;
					}
					/*title*/
					.teacher-title{
						display: inline-block;
						max-width: 94px;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						border:1px solid #a6b0f1;
						font-size: 12px;
						color:#a6b0f1;
						border-radius: 30px;
					    padding: 1px 4px;
					    margin-top: 5px;
					}
					/*学校专业*/
					.teacher-school{
						padding-left: 32px;
						font-size: 15px;
						color: #bbb;
					}
					/*tags*/
					.teacher-tag-container{
						display: flex;
						justify-content: space-around;
						margin-top: 10px;
						.teacher-tag{
							display: inline-block;
							background-size: 100% 100%;
							background-repeat: no-repeat;
							max-width: 65px;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
							font-size: 14px;
							padding: 2px 10px 2px 12px;
							color:#fff;
							&:first-of-type{
								background-image:url(../../assets/img/index/tap1.png);
							}
							&:nth-of-type(2){
								background-image:url(../../assets/img/index/tap2.png);
							}
							&:nth-of-type(3){
								background-image:url(../../assets/img/index/tap3.png);
							}
						}
					}
				}

			}
		}
	}
</style>