<template>
	<div>
		<div id="controls">
			<div id="record" onclick="toggleRecording(this);">
				<span class="tip">step1: 点击此处开始录音</span>
				<span class="red"></span>
			</div>
			<a id="save" href="#">保存</a>
		</div>
		<p style="font-size:12px">step2: 请播放你的录音，确认录音效果</p>
		<audio id="" src="" controls="controls">
		你的浏览器暂不支持
		</audio>
	</div>
</template>
<script>
	//import '../assets/js/main.js';
	//import '../assets/js/recorder.js';
	export default{
		name:'my-audio',
		mounted(){
			//this.initAudio();
		},
		methods:{
		}
	}
</script>
<style scoped lang='less'>
	#record{
		font-size: 12px;
		cursor: pointer;
		span.red{
			display: inline-block;
			width: 10px;
			height: 10px;
			border-radius: 100%;
			margin-left: 5px;
			border:1px solid #444;
		}
	}
	#record.recording span.red{
		border-color:none;
		background: red;
		background: -webkit-radial-gradient(center, ellipse cover, #ff0000 0%,lightgrey 75%,lightgrey 100%,#7db9e8 100%); 
		background: -moz-radial-gradient(center, ellipse cover, #ff0000 0%,lightgrey 75%,lightgrey 100%,#7db9e8 100%); 
		background: radial-gradient(center, ellipse cover, #ff0000 0%,lightgrey 75%,lightgrey 100%,#7db9e8 100%); 
	}
	#save, #save img { height: 10vh; display: none;}
	#save { opacity: 0.25;}
	#save[download] { opacity: 1;}
</style>