<template>
	<div id="book_container">
		<div id="book_inner">
			<img id="book_rocket" src="~assets/img/index/rocket.png">
			<img id="book_title" src="~assets/img/index/title3.png">
			<div class="input-wrapper">
				<input placeholder="请输入您的姓名"
				v-model="name">
			</div>
			<div class="input-wrapper">
				<input placeholder="请输入您的手机"
				v-model="phone"
				@focus="error = false">
				<p class="error"
				v-show="error">手机格式不对喔</p>
			</div>
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
	</div>
</template>
<script>
	export default{
		name:"part11Book",
		data(){
			return{
				name:'',
				phone:'',
				error:false
			}
		},
		methods:{
			bookNow(){
				if(!/^1[34578]\d{9}$/.test(this.phone)){
					this.error = true;
					return;
				}
				this.$http.get('?name=education.sys.add.connect&username='+this.name+'&mobile='+this.phone).then((response)=>{
					console.log(response);
					this.name = this.phone = '';
				})
			}
		}
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
			    padding-left: 20px;
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
</style>