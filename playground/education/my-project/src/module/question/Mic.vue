<template>
	<div>
		<h3>在线测试麦克风功能</h3>
		<p>目前上试听课的老师，可以联系平台教务，获取试听课地址，登录平台，检测麦克风音量。</p>
		<img src="~assets/img/question/1/1.png">
		<p></br></p>
		<p><span class="r">一、在网页中进行设置</span></p>
		<p>1. 在直播页点击鼠标右键再点击设置出现以下页面：</p>
		<img src="~assets/img/question/1/2.png">
		<p>2. 点击<span class="r">允许</span>，并勾选<span class="r">记住</span>，再点击关闭，<span class="r">刷新页面</span>，看看麦克风能否使用。</p>
		<p>3. 如果麦克风依旧无法使用，再进入之前页面，点击如下按钮：</p>
		<img src="~assets/img/question/1/3.png">
		<p>在麦克风设置里面，选择是默认的，该选择可能是不可用的设置，可以主动选择能用的配置，然后点击，再刷新本页面。</p>
		<img src="~assets/img/question/1/4.png">
		<p></br></p>
		<p>二、<span class="r">在之前工作失效的基础上</span>：设置电脑的声音控制</p>
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
</template>
<script>
	export default{
		name:'mic'
	}
</script>
<style scoped lang='less'>
	h3{
		font-size: 18px;
		color:#656565;
		text-align: center;
		font-weight: bold;
		margin:10px auto;
	}
	p{
		font-size: 14px;
	}
	span.r{
		color:red;
	}
</style>