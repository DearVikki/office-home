<template>
	<div id="question_edit_container">
		<!-- <p class="c-txt5">补充描述：</p> -->
		<textarea class="c-txt4" placeholder="补充描述..."
		v-model="des"></textarea>
		<!-- <p class="c-txt5">增加悬赏：</p> -->
		<input class="c-txt4" :placeholder = "type==='money'?'增加悬赏(元)...':'增加悬赏(积分)...'"
		v-model="money">
		<p class="c-txt5" v-if="type!=='money'">当前积分：<span class="red">163874</span></p>
		<div class="c-big-btn" @click="save">发布</div>
	</div>
</template>
<script>
	import {myAlert,getParameterByName} from '../../assets/js/utils.js';
	import pingpp from 'pingpp-js';
	export default{
		name:'questionedit',
		data(){
			return{
				questionId:'',
				des:'',
				money:'',
				type:'money'
			}
		},
		mounted(){
			this.questionId = getParameterByName('id');
			// 获取悬赏类型
			this.$http.post('',{
				name:'xwlt.pc.Reward_Type',
				question_id:this.questionId
			}).then((response)=>{
				this.type = response.body.data.reward_type;
			})
		},
		methods:{
			save(){
				if(isNaN(this.money)) {
					let tip = this.type === 'money'? '金额':'积分';
					myAlert.big('悬赏'+tip+'必须为数字喔!');
					this.money = '';
					return;
				}
				this.$http.post('',{
					name:'xwlt.pc.QuestionDescribe',
					question_id: this.questionId,
					question_describe:this.des
				}).then((response)=>{
					if(this.money === '') return;
					// 追加积分
					if(this.type==='积分') {
						this.money = Math.round(this.money);
						this.$http.post('',{
							name:'xwlt.pc.Add_Reward',
							question_id: this.questionId,
							reward_type: this.type,
							num: Number(this.money) ? this.money : 0
						}).then((response)=>{
							location.replace('./user-question.html');
						})
					} else {
						// 追加资金
						this.$http.post('',{
							name:'xwlt.pc.UpdatePay',
							channel:'wx_pub',
							amount:this.money+'000',
							order_no:new Date().getTime()+Math.ceil(Math.random())*1000,
							description:JSON.stringify({
								type:'reward',
								question_id:this.questionId
							})
						}).then((response)=>{
							if(response.body.code === 1000){
								this.createPayment(response.body.data.charge);
							}
						})
					}
				})
			},
			createPayment(charge){
				pingpp.createPayment(charge, function(result, err){
				    console.log(result);
				    console.log(err.msg);
				    console.log(err.extra);
				    if (result == "success") {
				        location.replace('./user-question.html');
				    } else if (result == "fail") {
				         myAlert.small('支付遇到问题了!');
				    } else if (result == "cancel") {
				        myAlert.small('支付被取消了!');
				    }
				});
			}
		},
		components:{}
	}
</script>
<style lang='less' scoped>
	#question_edit_container{
		padding: .4rem;
	}
	textarea,input{
		width: 9.2rem;
		background: #fff;
		border:1px solid #979797;
		border-radius: 0.11rem;
		margin:0 auto;
		display: block;
	}
	textarea{
		height: 4.27rem;
		padding: .4rem;
		margin-bottom: 0.8rem;
	}
	::-webkit-input-placeholder{
		font-size: 0.37rem;
		color:#979797;
	}
	input{
		height: 1.04rem;
		line-height: 1.04rem;
		padding-left:.4rem;
		position: relative;
		margin-bottom: 0.2rem;
	}
	.c-big-btn{
		margin-top: .8rem;
	}
</style>