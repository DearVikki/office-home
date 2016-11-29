<template>
	<table :style="{width:tableWid}">
		<tr>
			<th v-for="col in cols" :style="{width:col.width}">
				{{col.name}}
			</th>
		</tr>
		<tr v-for="(val, td) in tds">
			<td>{{tds[td].company_name}}</td>
			<td>{{tds[td].company_taxid}}</td>
			<td>{{tds[td].company_address}}</td>
			<td>{{tds[td].company_area}}</td>
			<td>{{tds[td].company_city}}</td>
			<td>{{tds[td].company_tel}}</td>
			<td>{{tds[td].business_scope}}</td>
			<td class="action">
				<span><a @click="editar(tds[td])">editar</a><a>eliminar</a></span>
				<span :class="{active:tds[td].is_default}"></span>
			</td>
		</tr>
	</table>
</template>
<script>
	export default{
		name:'table',
		data(){
			return{
			}
		},
		mounted(){
			console.log(this.cols)
		},
		methods:{
			editar(td){
				this.$emit('editar',td);
			}
		},
		props:['tableWid','cols','tds']
	}
</script>
<style scoped lang="less">
	@baseColor: #d42b1e;
	table{
		border-collapse: collapse;
		table-layout: fixed;
		tr{
			border:1px solid #d3d3d3;
		}
		th{
			background: #f2f2f2;
			text-align: left;
			height: 50px;
			line-height: 50px;
			padding-left: 20px;
		}
		td{
			padding: 5px 0 5px 20px;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
			vertical-align: middle;
		}
		td.action{
			a{
				display: block;
				color:@baseColor;
				cursor: pointer;
			}
			span{
				display: inline-block;
				vertical-align: middle;
			}
			span:nth-of-type(2){
				width: 20px;
				height: 20px;
				display: inline-block;
				margin-left: 5px;
				&.active{
					background: url(../assets/img/personal/icon_select.png) center no-repeat;
				}
			}
		}
	}
</style>