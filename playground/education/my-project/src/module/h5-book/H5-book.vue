<template>
	<div id="book_container">
		<div id="book_container_title"></div>
		<div v-show="!complete">
			<div class="input-container animated"
			v-for="input in inputs"
			:class="input.animation">
				<img :src="input.icon">
				<input :placeholder="input.placeholder"
				v-model="input.val"
				@keyup="checkAll">
			</div>
			<div class="btn"
			:class="{disabled:!allchecked}"
			@click="register">立即报名</div>
		</div>
		<div class="success" v-show="complete">
			<p>预约成功!</p>
			<p>请耐心等待我们的回复!</p>
		</div>
	</div>
</template>
<script>
	import 'animate.css';
	import head from '../../assets/img/h5/icon_student.png';
	import phone from '../../assets/img/h5/icon_phone.png';
	export default{
		name:'h5book',
		data(){
			return{
				inputs:[{
					name:'name',
					placeholder:'请填写参与家长姓名',
					validator:{required:{msg:''}},
					icon:head,
					animation:'fadeInLeft',
					val:''
				},{
					name:'phone',
					placeholder:'请填写手机号码',
					validator:{isPhone:{msg:''}},
					icon:phone,
					animation:'fadeInRight',
					val:''
				}],
				//全部检查
				allchecked:false,
				//完成预约
				complete:false
			}
		},
		mounted(){
			document.querySelector('#book_container').style.minHeight = window.innerHeight+'px';
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
				if(!this.allchecked) return;
				let name = this.inputs[0].val;
				let phone = this.inputs[1].val;
				this.$http.get('?name=education.sys.add.connect&username='+name+'&mobile='+phone).then((response)=>{
					console.log(response);
					this.complete = true;
				})
			}
		}
	}
</script>
<style scoped lang='less'>
	#book_container{
		width:100%;
		background: url(../../assets/img/h5/bg.png) center no-repeat;
		background-size: cover;
		background-size:100% 100%;
		padding-top: .1px;
		padding-bottom: 1rem;
	}
	#book_container_title{
		width: 10rem;
		height: 5rem;
		margin-top: 2.5rem;
    	margin-bottom: 2rem;
		background: url(../../assets/img/h5/book.png) center no-repeat;
		background-size: contain;
	}
	.input-container{
		width: 8rem;
		height: 1rem;
		background: #fff;
		margin: .8rem auto;
		border-radius: 1rem;
		text-align: center;
		position: relative;
		input{
			border: none;
			line-height: .9rem;
			font-size: .4rem;
			height: 100%;
		}
		img{
			width: 1rem;
			position: absolute;
			left: 0;
			top:0;
		}
	}
	.btn{
		width: 8rem;
		height: 1rem;
		line-height: 1rem;
		background: #55b7f8;
		border-radius: 1rem;
		color:#fff;
		margin:0 auto;
		cursor: pointer;
		animation:wqFadeIn 2s backwards;
		font-size: .5rem;
		&.disabled{
			opacity: .5;
			cursor:not-allowed;
		}
	}
	.success{
		font-size: .5rem;
		color: #fff;
		text-align: center;
	}
	@keyframes wqFadeIn {
	  from {
	    opacity: 0;
	  }
	  50%{
	  	opacity: 0;
	  }
	  100% {
	    opacity:.5;
	  }
	}

</style>