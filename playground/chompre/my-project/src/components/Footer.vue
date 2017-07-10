<template>
	<div id='footer_container' v-show="show" :class='{onepage: onepage}'>
		<div id='footer_part1'>
			<table>
				<caption>{{lang.GUIDE}}</caption>
				<tr><td>{{lang.PAY_GUIDE}}</td><td>{{lang.INVOICE_GUIDE}}</td><td>{{lang.SERVICE_GUIDE}}</td></tr>
				<tr><td>{{lang.PLATFORM_GUIDE}}</td><td>{{lang.DELIVERY_GUIDE}}</td><td>{{lang.PROTOCOL}}</td></tr>
			</table>
		</div>
		<div id='footer_part2'>
			{{lang.RIGHT_RESERVED}}
		</div>
	</div>
</template>
<script>
	import lang from '../assets/js/language.js'
	export default{
		name:'myfooter',
		data(){
			return {
				onepage:false,
				show:false,
				lang:lang
			}
		},
		mounted(){
			setTimeout(() => {
				if(document.getElementsByTagName('html')[0].getBoundingClientRect().height + 223 <= window.innerHeight) this.onepage = true;
				this.show = true;
			}, 1000)
		}
	}
</script>
<style scoped lang='less'>
	@baseColor: #d42b1e;
	@backColor: #fff7f7;
	@bla: #5c5c5c;
	#footer_container{
		width: 100%;
		border-top:6px solid @baseColor;
		background: #fff;
		&.onepage{
			position: fixed;
			bottom: 0;
			left: 0;
		}
	}
	#footer_part1{
		width: 100%;
		max-width: 1200px;
		margin:20px auto;
	}
	table{
		caption{
			color: #808080;
			font-size: 16px;
			text-align: left;
			margin-bottom: 30px;
			font-weight: bold;
		}
		td{
			color: @bla;
			font-size: 12px;
			width: 100px;
			padding-bottom: 10px;
		}
	}
	#footer_part2{
		width: 100%;
		max-width: 827px;
		margin:20px auto;
		font-size: 12px;
		color: @bla;
		text-align: center;
	}
</style>