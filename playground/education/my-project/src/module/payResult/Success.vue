<template>
	<div id="success_container">
		<img src="~assets/img/pay/icon_success.png">
		<p class="p1">支付成功</p>
		<p class="p2">好成绩在向你招手咯~</p>
		<a href="./user.html#/usercenter">查看课时</a>
	</div>
</template>
<script>
	export default{
		name:'success'
	}
</script>
<style lang='less'>
	#success_container{
		text-align: center;
	}
	.p1{
		font-size:18px;
		color:#3b5665;
		letter-spacing:0.36px;
		margin-top: 10px;
	}
	.p2{
		font-size:14px;
		color:#909090;
		letter-spacing:0.28px;
		margin-top: 5px;
	}
	a{
		font-size:14px;
		color:#55b7f8;
		letter-spacing:0px;
		margin-top:5px;
		display: inline-block;
	}
</style>