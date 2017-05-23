<template>
	<div id="pagination_container">
		<!-- 上一页 -->
		<span class="pagination-item prev"
		:class="{disabled:currentPage === 1}"
		@click="clickPage(currentPage-1)">Anterior</span>
		<!-- 第一页 -->
		<span class="pagination-item"
		:class="{active:1===currentPage}"
		@click="clickPage(1)">1</span>
		<!-- 第一个省略号 -->
		<span class="ellipsis" v-show="firstEllipsis">...</span>
		<!-- 主体部分 -->
		<span class="pagination-item"
		v-for="p in displayPage"
		:class="{active:p===currentPage}"
		@click="clickPage(p)">{{p}}</span>
		<!-- 第二个省略号 -->
		<span class="ellipsis" v-show="secondEllipsis">...</span>
		<!-- 最后一页 -->
		<span class="pagination-item"
		v-show="allPage !== 1"
		:class="{active:allPage===currentPage}"
		@click="clickPage(allPage)">{{allPage}}</span>
		<!-- 下一页 -->
		<span class="pagination-item next"
		:class="{disabled:currentPage === allPage}"
		@click="clickPage(currentPage+1)">Siguiente</span>
	</div>
</template>
<script>
	export default{
		name:'pagination',
		data(){
			return{
				firstEllipsis:true,
				secondEllipsis:true,
				currentPage:1,
				displayPage:[]
			}
		},
		mounted(){
			this.showPage();
		},
		watch:{
			allPage(){
				this.showPage();
			},
			reset(){
				this.currentPage = 1;
			}
		},
		methods:{
			clickPage(p){
				if(p<1 || p>this.allPage) return;
				this.currentPage = p;
				this.showPage();
				this.$emit('clickPagination',this.currentPage);
			},
			showPage(){
				let allPage = this.allPage;
				let currentPage = this.currentPage;
				this.displayPage = [];
				if(allPage <= 8){
					this.firstEllipsis = this.secondEllipsis = false;
					for(let i=2; i<allPage; i++) this.displayPage.push(i);
				}
				else if(allPage > 8){
					if(this.currentPage < 6){
						let start = currentPage - 3;
						if(start<=1) start = 2;
						this.firstEllipsis = false;
						this.secondEllipsis = true;
						for(let i=start; i<=currentPage+3; i++) this.displayPage.push(i);
					}
					else if(this.currentPage >= 6 && this.currentPage<allPage-4){
						this.firstEllipsis = true;
						this.secondEllipsis = true;
						for(let i=currentPage-3; i<=currentPage+3; i++) this.displayPage.push(i);
					}
					else if(this.currentPage >= allPage -4){
						this.firstEllipsis = true;
						this.secondEllipsis = false;
						for(let i=allPage-7; i<allPage; i++) this.displayPage.push(i);
					}
				}
			}
		},
		props:['allPage','reset']
	}
</script>
<style scoped lang="less">
	@bla:#5c5c5c;
	@baseColor: #d42b1e;
	#pagination_container{
		display:inline-block;
		margin-top: 100px;
	    margin-left: 50%;
	    transform: translate3d(-50%,0,0);
	}
	.ellipsis{
		font-size: 16px;
		color: @bla;
		display: inline-block;
		width: 36px;
		height: 36px;
		line-height: 36px;
		text-align: center;
	}
	.pagination-item{
		display: inline-block;
		position: relative;
		font-size:12px;
		color: @bla;
		width: 36px;
		height: 36px;
		line-height: 36px;
		text-align: center;
		cursor: pointer;
		border: 1px solid #e7e7e7;
		&:hover,&.active{
			color: #fff;
			background: @baseColor;
			border-color: @baseColor;
		}
	}
	.pagination-item.prev{
		width: auto;
		padding-left: 20px;
		padding-right: 10px;
		margin-right: 10px;
		&:after{
			content:"<";
			font-weight: bold;
			position: absolute;
			top: 0px;
			left: 5px
		}
	}
	.pagination-item.next{
		width: auto;
		padding-right: 20px;
		padding-left: 10px;
		margin-left: 10px;
		&:after{
			content:">";
			font-weight: bold;
			position: absolute;
			top: 0px;
			right: 5px
		}
	}
	.pagination-item.prev.disabled,.pagination-item.next.disabled{
		cursor: default;
		opacity: .5;
		&:hover{
			color: @bla;
			border-color: #e7e7e7;
			background: #fff;
		}
	}
</style>