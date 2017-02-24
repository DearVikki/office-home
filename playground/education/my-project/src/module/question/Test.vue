<template>
	<div id="container">
		<!--切换时间线-->
		<div class="time-nav"
		:class="{active:type===0}"
		@click="type=0">课前须知</div>
		<div class="time-nav"
		:class="{active:type===1}"
		@click="type=1">设备测试</div>
		<div class="time-nav"
		:class="{active:type===2}"
		@click="type=2">调整设置</div>
		<div v-show="type===0">
			<p>完成以下两步，我们的老师才能和孩子视频语音交流哟~</p>
			<p class="p1">第一步 课前准备：摄像头、麦克风、耳机</p>
			<p class="p2" @click="type=1">点击可前往进行设备可用性测试</p>
			<p class="p1">第二步 开始上课：进入在线教学页面时，务必点击<img src="~assets/img/question/2/u22.jpg" alt="允许" style="width:80px">使用</p>
			<p class="p2" @click="type=2">如果你不小心点到了拒绝，请点击前往设置教程</p>
			<img src="~assets/img/question/2/u36.png" style="width:900px">
			<img src="~assets/img/question/2/u38.png">
		</div>
		<div v-show="type===1">
			<iframe src="https://help.duobeiyun.com/ittest/content.html"></iframe>
		</div>
		<div v-show="type===2">
			<p>如果您的摄像头、麦克风、耳机无法正常使用，可以参照下述内容进行调整设置</p>
			<p class="p1">老师听不到你的声音<p>
			<p>页面左下角可以查看麦克风音量，说话即可看见声音的高低波动</p>
			<img src="~assets/img/question/2/u84.png">
			<p>如果声音无法传递给老师/或在页面刚打开时，你拒绝了设置</p>
			<p>①请将鼠标放在页面<span class="r">任意位置，右键点击，选择设置</span>，出现以下页面</p>
			<img src="~assets/img/question/1/2.png">
			<p>②请选择允许，关闭，并<span class="red">刷新页面</span></p>
			<p>③如果你的<span class="red">声音很小或仍然无法使用</span>，在上图设置页面中，请选择麦克风的图案（下图<span class="red">红圈框选</span>的对象）</p>
			<img src="~assets/img/question/1/3.png">
			<p>④调高音量，直到合适为止；或点击上图<span class="red">红色长方形框选的位置</span></p>
			<img src="~assets/img/question/1/4.png">
			<p>⑤选择能用的正确配置，点击，关闭该弹窗，刷新页面即可</p>
			<p class="p1">如果上述的页面端调整无效</p>
			<p>1. 右击右脑右下角音量按钮<img src="~assets/img/question/1/5.png"></p>
			<p>选择音量混合器：</p>
			<img src="~assets/img/question/1/6.png">
			<p>确认浏览器音量是否设置为正常水平。</p>
			<p>2. 右击右脑右下角音量按钮<img src="~assets/img/question/1/5.png">，并选择<span class="r">录音设备</span>。</p>
			<p>点击<span class="r">录制</span>选项：</p>
			<img src="~assets/img/question/1/6.png">
			<p>右击空白区域，点击<span class="r">显示禁用的设备</span>：</p>
			<img src="~assets/img/question/1/7.png">
			<p><span class="r">右击禁用的录制设备，并将其启用</span>。</p>
			<p>3. 打开控制面板，查看方式改为大图标。</p>
			<img src="~assets/img/question/1/8.png">
			<p>点击<img src="~assets/img/question/1/9.png">，（如果没有，请安装flash player）。</p>
			<p>（ps: 不同电脑上，可能名称有所不同，请视具体情况而定）。</p>
			<p>按以下操作选择：</p>
			<img src="~assets/img/question/1/10.png">
			<img src="~assets/img/question/1/11.png">
			<img src="~assets/img/question/1/12.png">
			<p>选择好这些以后，再次进入直播页面，刷新页面，看看能否使用麦克风。</p>
			<p>4. 如果以上方法不成功，请更新电脑上的flash player的版本至最新。</p>
			<p>如果以上操作失效，请提前联系平台工作人员，我们会指导解决问题。</p>
		</div>
	</div>
</template>
<script>
	export default{
		name:'test',
		data(){
			return{
				type:0
			}
			
		},
		mounted(){
			document.querySelector('.question-container').style.padding = '45px 0';
		}
	}
</script>
<style scoped lang='less'>
	iframe{
		width: 100%;
		height: 800px;
	}
	@baseColor:#55b7f8;
	/*切换时间线*/
	.time-nav{
		width: 150px;
		height: 30px;
		font-size: 16px;
		border-bottom:1px solid #ebebeb;
		display: inline-block;
		text-align: center;
		position: relative;
		cursor:pointer;
		margin-bottom: 30px;
		&.active{
			border-bottom-color: @baseColor;
			color: @baseColor;
			&:after{
				content:'';
				position: absolute;
				border: 5px solid transparent;
				border-bottom-color:#fff;
				right:68.5px;
				bottom:-.5px;
			}
			&:before{
				content:'';
				position: absolute;
				border: 6px solid transparent;
				border-bottom-color: @baseColor;
				right:67.5px;
				bottom:-.4px;
			}
		}
	}
	#container{
		padding:0 50px;
		/*text-align: center;*/
	}
	/*文字的style*/
	p{
		font-size: 16px;
		color: #333333;
		line-height:30px;
		margin:5px 0;
		text-align: left;
	}
	.p1{
		font-size: 18px;
		font-weight: bold;
	}
	.p2{
		text-decoration: underline;
		background: rgba(228, 228, 228, 1);
		display:inline-block;
		padding:0 5px;
		text-align: left;
	}
	.r{
		color:red;
	}
	img{
		margin: 5px 0;
		vertical-align: middle;
	}
</style>