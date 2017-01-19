<template>
	<div class="course-form-container">
		<table>
			<tr>
				<th v-for="th in tableData.ths"
				v-if="(th.name!=='student'||userType===1) && (th.name!=='teacher'||userType===0)"
				:style="{width:th.width}">{{th.title}}</th>
			</tr>
			<tr class="row"
			:class="{try: Number(tr.type) === 2 }"
			v-for="tr in tableData.trs">
				<td v-for="th in tableData.ths"
				v-if="(th.name!=='student'||userType===1) && (th.name!=='teacher'||userType===0)"
				:title="tr[th.name].title">
					<span :class="tr[th.name].class"
					@click="clickTd(tr, tr[th.name],tr.id)">{{tr[th.name].content}}</span>
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
		},
		methods:{
			clickTd(tr,td,id){
				console.log(tr)
				if(td.actionType === 3 || !td.actionType) return;
				this.$emit('formCb',tr,td, id);
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
			&.try td:first-child:before {
				content:'试';
				font-weight: bold;
				color: @baseColor;
				font-size: 12px;
				transform: scale(.8);
				position: absolute;
				left:2px;
				/*left: -20px;*/
				border:1.5px solid @baseColor;
				padding: 0 2px 1px 2px;
				border-radius: 2px;
			}
			td{
				text-align: center;
				height: 35px;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				vertical-align: middle;
				position: relative;
				/*挪出位置给试字- -*/
				&:first-child{
					padding-left: 9px;
					overflow: initial;
				}
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