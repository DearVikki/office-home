<template>
	<div class="c-txt4">
		<p style="text-align: center">有问必答版规</p>
		<p>1. xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</p>
		<p>2. xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</p>
		<div class="c-txt4" @click="pay">支付测试</div>
	</div>
</template>
<script>
	import pingpp from 'pingpp-js';
	export default{
		name:'rule',
		methods:{
			pay(){
				this.$http.post('',{
					name:'xwlt.pc.UpdatePay',
					channel:'wx_pub',
					amount:2,
					order_no:new Date().getTime()+Math.ceil(Math.random())*1000,
					description:JSON.stringify({
						type:'question',
						question_id:8
					})
				}).then((response)=>{
					if(response.body.code === 1000){
						this.createPayment(response.body.data.charge);
					}
				})
			},
			createPayment(charge){
				pingpp.createPayment(charge, function(result, err){
				    console.log(result);
				    console.log(err.msg);
				    console.log(err.extra);
				    if (result == "success") {
				        // 只有微信公众账号 wx_pub 支付成功的结果会在这里返回，其他的支付结果都会跳转到 extra 中对应的 URL。
				    } else if (result == "fail") {
				        // charge 不正确或者微信公众账号支付失败时会在此处返回
				    } else if (result == "cancel") {
				        // 微信公众账号支付取消支付
				    }
				});
			}
		}
	}
</script>
<style lang='less' scoped>
	.c-txt4{
		padding:0.4rem 0.67rem;
		word-wrap: break-word;
	}
</style>