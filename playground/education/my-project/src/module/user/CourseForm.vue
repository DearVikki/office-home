<template>
	<div class="course-form-container">
		<table>
			<tr>
				<th v-for="th in tableData.ths"
				v-if="(th.name!=='student'||userType===1) && (th.name!=='teacher'||userType===0)"
				:style="{width:th.width}">{{th.title}}</th>
			</tr>
			<tr class="row"
			v-for="tr in tableData.trs">
				<td v-for="th in tableData.ths"
				v-if="(th.name!=='student'||userType===1) && (th.name!=='teacher'||userType===0)"
				:title="tr[th.name].content">
					<span :class="tr[th.name].class"
					@click="clickTd(tr[th.name])">{{tr[th.name].content}}</span>
				</td>
			</tr>
		</table>
	</div>
</template>
<script>
	export default{
		name:'courseForm',
		data(){
			return{
				userType:0
			}
		},
		mounted(){
			let user = JSON.parse(localStorage.getItem('user'));
			this.userType = user.user_type;
			console.log(this.tableData)
		},
		methods:{
			clickTd(td){
				if(td.actionType === 3 || !td.actionType) return;
				this.$emit('formCb',td);
			}
		},
		props:['tableData']
	}
</script>
<style scoped lang='less'>
	@baseColor:#55b7f8;
	table{
		border-collapse: collapse;
		table-layout: fixed;
		width:100%;
		font-size: 16px;
		th{
			background: @baseColor;
			color: #fff;
			height: 40px;
			line-height: 40px;
		}
		.row{
			border:1px solid #fff;
			background: #f8f8f8;
			font-size: 14px;
			td{
				text-align: center;
				height: 35px;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				vertical-align: middle;
				span.active,span.disabled{
					width: 65px;
					height: 25px;
					line-height: 25px;
					display: inline-block;
					border-radius: 4px;
					color:@baseColor;
					border:1px solid @baseColor;
				}
				span.active{
					cursor: pointer;
					&:hover{
						background:@baseColor;
						color: #fff;
					}
				}
				span.disabled{
					opacity: .5;
				}
			}
		}
	}
</style>