<template>
	<div id="salary_container" class="user-common-container">
		<div id="week_container">
			<span class="prev"
			:class="{disabled:weekFromNow === weeks.length}"
			@click="prev"></span>
			{{weeks[weeks.length - weekFromNow]}}
			<span class="next"
			:class="{disabled:weekFromNow === 1}"
			@click="next"></span>
		</div>
		<table>
			<tr>
				<th style="width:35%">上课种类</th><th style="width:20%">课时单价</th><th style="width:20%">已上课时数</th><th style="width:25%">合计 (元)</th>
			</tr>
			<tr>
				<td>正式课程</td><td>80/时</td><td>12.5</td><td>1000</td>
			</tr>
			<tr>
				<td>已成功的试听课</td><td>50/时</td><td>6</td><td>300</td>
			</tr>
			<tr>
				<td>未成功的试听课</td><td>30/时</td><td>1.5</td><td>45</td>
			</tr>
			<tr>
				<td style="color:#55b7f8">合计</td><td></td><td></td><td>1345</td>
			</tr>
		</table>
	</div>
</template>
<script>
	export default{
		name:'salary',
		data(){
			return{
				weeks:['01.23-01.29','本周(待结算)'],
				weekFromNow:1
			}
		},
		methods:{
			prev(){
				if(this.weekFromNow === this.weeks.length) return;
				this.weekFromNow++;
			},
			next(){
				if(this.weekFromNow === 1) return;
				this.weekFromNow--;
			}
		}
	}
</script>
<style scoped lang='less'>
	#week_container{
		background:#f1faff;
		border-radius:100px;
		width:240px;
		height:50px;
		line-height: 50px;
		margin:0 auto;
		font-size:18px;
		color:#55b7f8;
		letter-spacing:-0.03px;
		text-align:center;
		position: relative;
		.prev,.next{
			position: absolute;
			width: 11px;
			height: 17px;
			top: 17px;
			cursor: pointer
		}
		.prev{
			left: 20px;
			background-image: url(../../assets/img/user/left.png);
			&.disabled{
				background-image: url(../../assets/img/user/left_disable.png);
				cursor: default;
			}
		}
		.next{
			right: 20px;
			background-image: url(../../assets/img/user/right.png);
			&.disabled{
				background-image: url(../../assets/img/user/right_disable.png);
				cursor: default;
			}
		}
	}
	table{
		font-size: 18px;
		table-layout: fixed;
		border-collapse: collapse;
		width: 640px;
		margin: 30px auto;
		tr{
			height: 50px;
			line-height: 50px;
			text-align: center;
			border:1px solid #ececec;
		}
		td{
			padding: 0 20px;
		}
		th{
			color:#ffffff;
			letter-spacing:-0.03px;
			background: #55b7f8;
			font-weight: normal;
		}
		td:first-child{
			text-align:left;
		}
		td:first-child,td:nth-child(2){
			color: #4d4d4d;
		}
		td:nth-child(3),td:nth-child(4){
			color: #55b7f8;
		}
	}
</style>