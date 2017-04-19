<template>
	<div>
		<div id="fake_user_back" v-if="myRank.pm"></div>
		<table>
			<thead>
				<th style="width:13%">排名</th>
				<th style="width:18%">头像</th>
				<th style="width:26%;text-align:left">昵称</th>
				<th style="width:18%">现有积分</th>
				<th style="width:25%">累计积分</th>
			</thead>
			<tr class="user-rank" v-if="myRank.pm">
				<td>{{myRank.pm}}</td>
				<td><img :src="myRank.head"></td>
				<td class="ellipsis">{{myRank.username}}</td>
				<td class="ellipsis">{{myRank.existing_integral}}</td>
				<td class="ellipsis">{{myRank.total_integral}}</td>
			</tr>
			<tr v-for="(r,i) in ranks">
				<td>
					<img v-if="i===0" src="../../assets/img/index/icon_1.png">
					<img v-if="i===1" src="../../assets/img/index/icon_2.png">
					<img v-if="i===2" src="../../assets/img/index/icon_3.png">
					<span v-if="i > 2">{{i+1}}</span>
				</td>
				<td><img :src="r.head"></td>
				<td class="ellipsis">{{r.username}}</td>
				<td class="ellipsis">{{r.existing_integral}}</td>
				<td class="ellipsis">{{r.total_integral}}</td>
			</tr>
		</table>
	</div>
</template>
<script>
	export default{
		name:'personal',
		mounted(){
			this.$http.post('',{
				name:'xwlt.pc.PersonalList'
			}).then((response)=>{
				let data = response.body.data;
				this.ranks = data.PersonalList || {};
				this.myRank = data.PersonalOne || {};
			})
		},
		data(){
			return{
				ranks:[],
				myRank:{}
			}
		}
	}
</script>
<style lang='less' scoped>
	#fake_user_back{
		width: 100%;
		height: 1.71rem;
		background: url(../../assets/img/index/mine_bg.png);
		position: absolute;
		top: .78rem;
		left: 0;
	}
	table{
		width: 100%;
		table-layout: fixed;
		border-collapse: collapse;
		position: relative;
		thead{
			height: 0.67rem;
			line-height: .67rem;
		}
		th{
			font-size:0.32rem;
			color:#999999;
			letter-spacing:-0.06px;
		}
		tr{
			height: 1.71rem;
			text-align: center;
			background: #fff;
			border-top: 1px solid #f2f2f2;
			&.user-rank{
				border-bottom: 0.1rem solid #f2f2f2;
				background: transparent;
				/*background: linear-gradient(45deg, #fb3 25%, #58a 0, #58a 50%, #fb3 0 ,#fb3 75%, #58a 0);
				background-size: 150px 150px ;*/
				/*background: url(../../assets/img/index/mine_bg.png);*/
			}
			td{
				vertical-align: middle;
			}
			td:nth-of-type(1){
				font-size:0.48rem;
				color:#999999;
				img{
					width: 0.67rem;
					height: 0.8rem;
				}
			}
			td:nth-of-type(2) img{
				width: 1.31rem;
				height: 1.31rem;
				border-radius: 100%;
			}
			td:nth-of-type(3){
				font-size:0.4rem;
				color:#4c4c4c;
				text-align:left;
			}
			td:nth-of-type(4),td:nth-of-type(5){
				font-size:0.4rem;
				color:#f9c13a;
			}
		}
	}
</style>