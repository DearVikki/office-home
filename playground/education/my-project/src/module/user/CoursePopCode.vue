<template>
	<div class="pop-inner">
		<div>
			<span class="txt">邀请码</span>
			<span id="pop_code">{{code||'暂无邀请码'}}</span>
			<span id="copy"
			data-clipboard-target="#pop_code">
				<smartBtn
				@clickBtn="copy"
				@returnToFirstStage="returnToFirstStage"
				:stage="btnSet.stage"
				:currentStage="btnSet.currentStage"
				:style="btnSet.style">点击复制</smartBtn>
			</span>
		</div>
		<div style="margin-top:20px">
			<span class="txt">网址：</span>
			<a href="xue.duobeiyun.com" target="_blank">点击此处进入</a>
		</div>
	</div>
</template>
<script>
	import Clipboard from 'clipboard';
	import smartBtn from '../../components/SmartBtn.vue';
	export default{
		name:'coursePopCode',
		data(){
			return{
				btnSet:{
					stage:{
							0:{
								txt:'点击复制',
								disabled:false,
								active:true,
								firstStage:true
							},
							1:{
								txt:'复制成功!',
								disabled:true,
								active:true,
								lastStage:true
							}
						},
						currentStage:0,
						style:{
							width:'75px',
							height:'28px',
							lineHeight:'28px',
							margin:0,
							fontSize:'12px',
							background:'#55b7f8',
							color:'#fff'
						}
				}
			}
		},
		mounted(){
			console.log(this.code)
			var clipboard = new Clipboard('#copy');
			clipboard.on('success', function(e) {
			    console.info('Action:', e.action);
			    console.info('Text:', e.text);
			    console.info('Trigger:', e.trigger);

			    e.clearSelection();
			});
			this.isCopy();
		},
		methods:{
			closePop(){
				this.$emit('close');
			},
			copy(){
				this.btnSet.currentStage = 1;
			},
			returnToFirstStage(){
				this.btnSet.currentStage = 0;
			},
			// 是否已生成邀请码 可以点击复制
			isCopy(){
				if(this.code===0){
					this.btnSet.stage['0'].disabled = true;
					this.btnSet.stage['0'].active = false;
				}
			}
		},
		watch:{
			code(){
				this.isCopy();
			}
		},
		props:['code'],
		components:{smartBtn}
	}
</script>
<style scoped lang='less'>
	@baseColor: #55b7f8;
	@warn: #f12323;
	.pop-inner{
		font-size: 14px;
		.txt{
			color: #8a8a8a;
		}
		/*邀请码*/
		#pop_code{
			display: inline-block;
			width: 120px;
			height: 27px;
			line-height: 27px;
			padding: 0 8px;
			border-radius: 4px;
			color: #8a8a8a;
			border:1px solid #dadada;
			margin-left: 10px;
		}
		/*点击复制*/
		#copy{
			display: inline-block;
			margin-left: 10px;
		}
		/*网址*/
		a{
			color: @baseColor;
		}
	}
</style>