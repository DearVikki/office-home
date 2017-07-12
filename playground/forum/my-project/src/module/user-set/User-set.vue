<template>
	<div id="set_container">
		<Group labelAlign="right">
			<x-switch title="被回答提醒" :value="question"
			@on-change="change1"></x-switch>
			<x-switch title="被追问提醒" :value="reply"
			@on-change="change2"></x-switch>
			<x-switch title="已采纳提醒" :value="adopt"
			@on-change="change3"></x-switch>
			<x-switch title="私信提醒" :value="letter"
			@on-change="change4"></x-switch>
		</Group>
		<div class="c-contact">客服连线：0989-09808788</div>
	</div>
</template>
<script>
	import {Group,XSwitch} from 'vux';
	export default{
		name:'set',
		data(){
			return{
				question:true,
				reply:true,
				adopt:true,
				letter:true
			}
		},
		mounted(){
			this.$http.post('',{
				name:'xwlt.pc.UserSetupList'
			}).then((response) => {
				let d = response.body.data.UserSetupList;
				this.question = Boolean(Number(d.question));
				this.reply = Boolean(Number(d.reply));
				this.adopt = Boolean(Number(d.adopt));
				this.letter = Boolean(Number(d.letter));
			})
		},
		methods:{
			request(type, val){
				this.$http.post('',{
					name: 'xwlt.pc.UserSetupSz',
					type: type,
					typeid: val
				}).then((response) => {

				})
			},
			change1(val){
				this.request('question', Number(val));
			},
			change2(val){
				this.request('reply', Number(val));
			},
			change3(val){
				this.request('adopt', Number(val));
			},
			change4(val){
				this.request('letter', Number(val));
			}
		},
		components:{Group,XSwitch}
	}
</script>
<style lang='less'>
	@baseColor:#ffe857;
	#set_container{
		.weui-cells{
			font-size:0.4rem;
			margin-top:0;
		}
		.vux-x-switch.weui-cell_switch{
			padding: 0.31rem .4rem;
		}
		.weui-label{
			color:#4c4c4c;
		}
		.weui-switch, .weui-switch-cp__box{
			width: 1.31rem;
			height: 0.69rem;
			border-radius: 1.33rem;
		}
		.weui-switch:before, .weui-switch-cp__box:before{
			width: 1.31rem;
			height: 0.69rem;
		}
		.weui-switch:after, .weui-switch-cp__box:after{
			width:0.59rem;
			height:.59rem;
			border-radius: 100%;
			left: 0.02rem;
			top:0.04rem;
		}
		.weui-switch, .weui-switch-cp__input ~ .weui-switch-cp__box{
			background: #999;
			border-color: #999;
		}
		.weui-switch:before, .weui-switch-cp__box:before{
			background: #999;
			border-radius: 1.33rem;
		}
		.weui-switch:checked, .weui-switch-cp__input:checked ~ .weui-switch-cp__box{
			background: @baseColor;
			border-color: @baseColor;
		}
		.weui-switch:checked:after, .weui-switch-cp__input:checked ~ .weui-switch-cp__box:after{
			transform: translateX(0.64rem);
		}
	}
	
</style>