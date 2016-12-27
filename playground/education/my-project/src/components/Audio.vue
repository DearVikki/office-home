<template>
	<div>
		<div id="controls">
			<span class="tip step1">Step1: 点击下面的小磁带录音。</span>
			<div id="record" onclick="toggleRecording(this);">
			</div>
			<a id="save" href="#">保存</a>
		</div>
		<div id="audio_part2" style="display:none">
			<p class="tip"
			@click="hey">Step3: 请播放你的录音并确认录音效果。</p>
			<audio id="" src="" controls="controls">
			你的浏览器暂不支持
			</audio>
		</div>
	</div>
</template>
<script>
	//import '../assets/js/main.js';
	//import '../assets/js/recorder.js';
	export default{
		name:'my-audio',
		mounted(){
			//this.initAudio();
			console.log('why..')
		},
		methods:{
			hey(){
				this.$emit('hey')
			}
		}
	}
</script>
<style scoped lang='less'>
	#controls{
		margin:30px auto;
		text-align: center;
	}
	#record{
		font-size: 12px;
		cursor: pointer;
		width: 200px;
		height: 50px;
		background: url(../assets/img/user/cutie.png) center no-repeat;
		margin:30px auto;
	}
	#record.recording{
		animation: recording .7s infinite;
	}
	#save, #save img { height: 10vh; display: none;}
	#save { opacity: 0.25;}
	#save[download] { opacity: 1;}
	.tip{
		font-size: 14px;
	}
	#audio_part2{
		margin-top: 30px;
		text-align: center;
		audio{
			width: 200px;
			margin-top: 30px;
		}
	}
	@keyframes recording{
		50%{
			transform:translate3d(0,3px,0);
		}
		100%{
			transform:translate3d(0,0px,0);
		}
	}
</style>