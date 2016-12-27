<template>
	<div id="book_container">
		<div v-show="!complete">
			<div class="input-container"
		v-for="input in inputs">
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
	import head from '../../assets/img/h5/icon_student.png';
	import phone from '../../assets/img/h5/icon_phone.png';
	export default{
		name:'h5book',
		data(){
			return{
				inputs:[{
					name:'name',
					placeholder:'请填写试听学生姓名',
					validator:{required:{msg:''}},
					icon:head,
					val:''
				},{
					name:'phone',
					placeholder:'请填写手机号码',
					validator:{isPhone:{msg:''}},
					icon:phone,
					val:''
				}],
				allchecked:false,
				complete:false
			}
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
				this.$http.get('?name=education.sys.add.connect&username='+this.name+'&mobile='+this.phone).then((response)=>{
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
		height:100%;
		background: url(../../assets/img/h5/bg.png) center no-repeat;
		background-size:100% 100%;
		padding-top: .1px;
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
			font-size: .3rem;
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
</style>