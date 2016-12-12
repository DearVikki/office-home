<template>
	<div id="doc_container" class="user-common-container">
		<div class="doc-group"
		v-for="doc in docs">
			<div class="title"
			:class="{active:doc.active}"
			@click="doc.active=!doc.active">{{doc.name}}</div>
			<div class="doc"
			v-show="doc.active">
				<div class="doc-item"
				v-for="img in doc.imgs"></div>
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		name:'doc',
		data(){
			return{
				docs:[{
					name:'高二 物理 力',
					imgs:['','','','','',''],
					active:false
				},{
					name:'高一 数学 函数',
					imgs:['',''],
					active:false
				}]
			}
		}
	}
</script>
<style scoped lang='less'>
	#doc_container{
		.doc-group{
			margin-bottom:20px;
			.title{
				width: 100%;
				height: 48px;
				line-height: 48px;
				font-size: 18px;
				color:#55b7f8;
				background: #f8f8f8;
				padding-left: 37px;
				padding-right: 60px;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				position: relative;
				cursor: pointer;
				&:before{
					content: '';
					width: 7px;
					height: 7px;
					border-radius: 100%;
					background: #55b7f8;
					position: absolute;
					top: 20px;
					left: 20px;
				}
				&:after{
					content: '';
					width: 20px;
					height: 20px;
					background: url(../../assets/img/user/icon_more.png) center no-repeat;
					position: absolute;
					top: 15px;
					right: 20px;
					transition: all .3s;
				}
				&.active:after{
					transform: rotate(90deg);
				}
			}
			.doc{
				padding: 24px 10px;
				overflow: hidden;
				.doc-item{
					width: 140px;
					height: 96px;
					float: left;
					margin-left: 15px;
					margin-bottom: 15px;
					background: pink;
				}
			}
		}
	}
</style>