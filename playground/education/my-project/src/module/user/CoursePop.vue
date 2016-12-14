<template>
	<div id="coursepop_container">
		<div id="pop_container">
			<div class="close"
			@click="$emit('close')">×</div>
			<div>
				<span >上课情况</span>
				<span class="dropdown">
					<dropdown
				:dropdownData="dropdownData"></dropdown>
				</span>
				<p class="error"
				v-show="uploadCheck.class.show">{{uploadCheck.class.msg}}</p>
			</div>
			<textarea placeholder="请输入对老师的评价..."
			v-model="comment"></textarea>
			<p class="error"
			v-show="uploadCheck.comment.show">{{uploadCheck.comment.msg}}</p>
			<starmark></starmark>
			
			<div class="btn reverse"
			@click="upload">提交</div>
		</div>
	</div>
</template>
<script>
	import dropdown from '../../components/Dropdown.vue';
	import starmark from '../../components/Starmark.vue';
	export default{
		name:'coursepop',
		data(){
			return{
				comment:'',
				dropdownData:{
					selected:{id:'',text:'请选择...'},
					options:[{id:1,text:'正常上课'},
					{id:2,text:'老师旷课'}]
				},
				uploadCheck:{
					class:{show:false, msg:'请选择上课情况喔'},
					comment:{show:false, msg:'请输入对老师的评价喔'}
				}
			}
		},
		methods:{
			upload(){
				if(!this.dropdownData.selected.id) this.uploadCheck.class.show = true;
				if(this.comment==='') this.uploadCheck.comment.show = true;
			}
		},
		components:{dropdown,starmark}
	}
</script>
<style scoped lang='less'>
	#coursepop_container{
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		display: flex;
		background: rgba(0,0,0,.5);
	}
	#pop_container{
		width:420px;
		height: 300px;
		background: #fff;
		margin:auto;
		box-shadow: 0px 0px 8px 1px rgba(0,0,0,0.3);
		border-radius: 2px;
		position: relative;
		padding: 50px 78px 30px 78px;
		font-size: 14px;
		.close{
			font-size: 20px;
			position: absolute;
			right: 10px;
			top: 3px;
			cursor: pointer;
			transition: all .5s;
			&:hover{
				transform:rotate(360deg);
			}
		}
		.dropdown{
			display: inline-block;
			width: 180px;
			margin-left: 20px;
		}
		textarea{
			margin-top: 10px;
			width: 264px;
			height: 68px;
			border-radius: 2px;
			border:1px solid #dadada;
			padding: 3px 7px;

		}
		.btn{
			width: 120px;
			height: 35px;
			line-height: 35px;
			margin: 0 auto;
		}
		p.error{
			color:red;
		}
	}
</style>