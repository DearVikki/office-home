<template>
	<table :style="{width:tableWid}">
		<tr>
			<th v-for="col in cols" :style="{width:col.width}">
				{{col.name}}
			</th>
		</tr>
		<!-- td代表每一条地址列表 -->
		<tr v-for="td in tds">
			<!-- 也就是取到每一个项目的值 -->
			<td v-for="sCol in spliceCols">
				{{td[sCol.key]}}
			</td>
			<td class="action">
				<span>
					<a @click="editar(td)">editar</a>
					<a @click="deletar(td)">eliminar</a>
				</span>
				<!-- td.selected -->
				<span :class="{active:td[cols[cols.length-1].key]}"></span>
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
		},
		methods:{
			editar(td){
				this.$emit('editar',td);
			},
			deletar(id){
				this.$emit('deletar',id);
			}
		},
		computed:{
			// 这不就是取到了除了操作以外的内容
			spliceCols(){
				return this.cols.slice(0,-1);
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
					background: url(../../assets/img/personal/icon_select.png) center no-repeat;
				}
			}
		}
	}
</style>