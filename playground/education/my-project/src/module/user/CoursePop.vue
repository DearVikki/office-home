<template>
	<div class="pop-inner">
		<!--星星-->
		<div>
			<span class="label"
			:class="{error:uploadCheck.star.error,
			animated:uploadCheck.star.anima,
			shake:uploadCheck.star.anima}"
			@animationend="animaend(uploadCheck.star)">请点星星</span>
			<span class="star-box">
				<starmark @markStar="markStar"></starmark>
			</span>
		</div>
			<!--上课情况-->
			<!--<div style="margin:13px auto 10px auto">
				<span class="label"
				:class="{error:uploadCheck.class.error,
						animated:uploadCheck.class.anima,
						shake:uploadCheck.class.anima}"
				@animationend="animaend(uploadCheck.class)">上课情况</span>
				<span class="dropdown">
					<dropdown :dropdownData="dropdownData"
					@clickOption="clickOption"></dropdown>
				</span>
			</div>-->
		<!--文本框-->
		<textarea placeholder="请输入对老师的评价..."
		v-model="comment"
		:class="{error:uploadCheck.comment.error,
		animated:uploadCheck.comment.anima,
		shake:uploadCheck.comment.anima}"
		@animationend="animaend(uploadCheck.comment)"
		@focus="uploadCheck.comment.error=false"></textarea>
		<div class="btn reverse"
		@click="upload">提 交</div>
	</div>
</template>
<script>
	import dropdown from '../../components/Dropdown.vue';
	import starmark from '../../components/Starmark.vue';
	export default{
		name:'coursepop',
		data(){
			return{
				usertype:0,
				userid:'',
				comment:'',
				star:0,
				dropdownData:{
					selected:{id:'',text:'请选择...'},
					options:[{id:1,text:'正常上课'},
					{id:2,text:'老师旷课'}]
				},
				uploadCheck:{
					star:{error:false, msg:'', anima:false},
					class:{error:false, msg:'请选择上课情况喔', anima:false},
					comment:{error:false, msg:'请输入对老师的评价喔', anima:false},
					allCheck: true
				}
			}
		},
		mounted(){
			let user = JSON.parse(localStorage.getItem('user'));
			this.usertype = user.user_type;
			this.userid = user.user_id;
		},
		methods:{
			closePop(){
				this.$emit('close');
				this.comment = '';
				this.star = 0;
				this.dropdownData.selected = {id:'',text:'请选择...'};
			},
			animaend(e){
				e.anima = false;
			},
			markStar(n){
				this.star = n;
				this.uploadCheck.star.error = false;
			},
			clickOption(){
				this.uploadCheck.class.error = false;
			},
			upload(){
				/*if(!this.dropdownData.selected.id) {
					this.uploadCheck.class.error= true;
					this.uploadCheck.class.anima = true;
					this.uploadCheck.allCheck = false;
				}*/
				if(this.comment==='') {
					this.uploadCheck.comment.error = true;
					this.uploadCheck.comment.anima = true;
					this.uploadCheck.allCheck = false;
				}
				if(this.star === 0) {
					this.uploadCheck.star.error = true;
					this.uploadCheck.star.anima = true;
					this.uploadCheck.allCheck = false;
				}
				if(!this.uploadCheck.allCheck) return;
				let type = this.usertype===0 ? 1 :2;
				this.$http.get('?name=education.student.judge&user_id='+this.userid+'&id='+this.id+'&type='+type+'&judge='+this.star+'&comment='+this.comment).then((response)=>{
					this.closePop();
					// location.reload();
				})
			}
		},
		props:['id'],
		components:{dropdown,starmark}
	}
</script>
<style scoped lang='less'>
	@baseColor: #55b7f8;
	@warn: #f12323;
	.pop-inner{
		.label{
			display: inline-block;
			font-size: 14px;
		}
		.star-box{
			display: inline-block;
    		margin-left: 13px;
    		width: 190px;
		}
		.dropdown{
			display: inline-block;
			width: 180px;
			margin-left: 20px;
		}
		textarea{
			margin-top: 30px;
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
			position: absolute;
			bottom: 40px;
			left: 160px;
		}
		.error{
			color: @warn;
		}
		textarea.error{
			border:1px solid @warn;
		}
	}
</style>