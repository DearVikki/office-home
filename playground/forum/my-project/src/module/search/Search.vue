<template>
	<div>
		<div id="search_box">
			<div id="go_back" @click="goBackPage"></div>
			<input v-model="keywords" placeholder="搜索..." @keyup="search">
			<transition name="fade">
				<div id="clear_words" v-show="keywords" @click="keywords=''"></div>
			</transition>
		</div>
		<div id="search_history" v-show="!keywords">
			<a class="c-line ellipsis"
			v-for="s in searchHistory"
			:href="'./question-detail.html?id='+s.question_id"
			>{{s.question}}</a>
			<div id="clear_history" v-show="searchHistory.length"
			@click="historyPop.show = true">清除历史记录</div>
			<!-- 缺省页 -->
			<div class="c-empty" v-show="!searchHistory.length">
				<p>暂无搜索历史</p>
				<a href="./ask.html">去搜索啦!</a>
			</div>
		</div>
		<div id="search_result" v-show="keywords">
			<div class="c-line"
			v-for="s in searchResult"
			@click="goToPage(s)"
			>
				<div class="ellipsis2L" v-html="s.highlightQuestion"></div>
				<div class="detail">{{s.replynum}}回答&nbsp;&nbsp;{{s.praisenum}}赞</div>
			</div>
			<!-- 缺省页 -->
			<div class="c-empty" v-show="!searchResult.length">
				<p>未搜索到相关内容</p>
				<a href="./ask.html">去提问啦!</a>
			</div>
		</div>
		<!-- 清除历史记录弹窗 -->
		<pop :pop="historyPop">
			<div id="history_pop">
				<p>
					确定要清除所有历史记录吗？
				</p>
				<div class="btn-container">
					<span class="c-yellow-btn" @click="historyPop.show = false">不要！</span>
					<span class="c-yellow-btn" @click="clearHistory">要！</span>
				</div>
			</div>
		</pop>
	</div>
</template>
<script>
	import pop from '../../components/Pop.vue'
	export default{
		name:'search',
		data(){
			return{
				keywords:'',
				searchHistory:[],
				searchResult:[],
				historyPop: {
					show: false,
					style: {
						width:'6rem',
						height:'3rem',
						padding:'.7rem .6rem'
					}
				},
			}
		},
		mounted(){
			this.getHistory();
		},
		methods:{
			getHistory(){
				this.searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
			},
			clearHistory(){
				localStorage.removeItem('searchHistory');
				this.getHistory();
			},
			addHistory(q){
				this.searchHistory.push(q);
				localStorage.setItem('searchHistory',JSON.stringify(this.searchHistory));
			},
			search(){
				this.$http.post('',{
					name:'xwlt.pc.QuestionSearch',
					question: this.keywords
				}).then((response)=>{
					let list = [];
					response.body.data.SearchList.forEach((e)=>{
						let index = e.question.indexOf(this.keywords);
						let arr = e.question.split(this.keywords), str=arr[0];
						arr.forEach((a,i)=>{
							if(i!==0) str += '<span>'+this.keywords+'</span>' + arr[i];
						})
						e.highlightQuestion = str;
					})
					this.searchResult = response.body.data.SearchList;
				})
			},
			goToPage(q){
				this.addHistory(q);
				location.replace('./question-detail.html?id='+q.question_id);
			},
			goBackPage(){
				history.back();
			}
		},
		components:{pop}
	}
</script>
<style lang='less'>
	#search_result .c-line span{
		color:#f9c13a;
	}
</style>
<style lang='less' scoped>
	@baseColor:#f9c13a;
	/*#searchbox_container{
		width: 100%;
		height: 1.2rem;
		background: @baseColor;
		padding-top: .1rem;
	}*/
	#search_box{
		overflow: hidden;
		margin: .5rem auto 0 auto;
		width: 9rem;
		height: .9rem;
		border:.02rem solid @baseColor;
		background: #fff;
		border-radius: .5rem;
		padding: 0 .2rem;
		#go_back{
			float: left;
			width: .5rem;
			height: .4rem;
			margin-top: .25rem;
			background: url(../../assets/img/index/arr.png) no-repeat;
			background-size: 100% 100%;
		}
		input{
			height: .65rem;
			width: 7rem;
			margin: 0.1rem .25rem;
			display: block;
			font-size: .35rem;
			color: #333;
			float: left;
		}
		#clear_words{
			float: right;
			width: .3rem;
			height: .3rem;
			margin-top: .3rem;
			margin-right: .15rem;
			background: url(../../assets/img/index/cross.png) center no-repeat;
		}
	}
	#search_history{
		width: 9rem;
		margin: 0 auto;
		text-align: center;
		.c-line{
			width: 100%;
			font-size: .4rem;
			color: #5c5c5c;
			text-align: left;
			padding: .2rem 0;
			display: block;
			height: 1rem;
			line-height: .8rem;
		}
		#clear_history{
			font-size: .35rem;
			color: @baseColor;
			border:1px solid @baseColor;
			display: inline-block;
			padding:.1rem;
			border-radius: .08rem;
			margin-top: .5rem;
		}
	}
	#search_result{
		width: 9rem;
		margin: 0 auto;
		text-align: center;
		.c-line{
			width: 100%;
			font-size: .4rem;
			color: #5c5c5c;
			text-align: left;
			padding: .2rem 0;
			height: auto;
			line-height: inherit;
			display: inline-block;
		}
		.detail{
			color: #d3d3d3;
			margin-top: .1rem;
		}
	}
	#history_pop{
		.btn-container{
			margin-top:.2rem;
			display: flex;
			justify-content: space-around;
		}
	}
</style>