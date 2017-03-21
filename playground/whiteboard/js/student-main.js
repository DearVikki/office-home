var $body,$main,
	$pm,
	$pptHolder,
	$nextPPT,
	$prevPPT,
	$pptCurrentPg,
	$pptAllPg,
	$ph,
	$navContainer,$actionBtn,
	$pf,
	$pf_r,
	c,
	$pl,
	$pr,
	$body,
	$undo,
	$redo,
	$navAdd,
	$pptTip,
	$pptBtn,
	$pptInput,
	$pptContainer,
	$msgMainContainer,
	$msgMainWrapper,
	$msgInput,
	$msgBtn,
	$videoTip;
var winH,winW;
var canvasH,canvasW, ctx;
var currentPg = 1,
	allPg;
var $color, $width, $shape, $eraser, $pen, $clear, $undo, $redo;
var socket;
var user = {user_type:0,user_name:'七七'}
var devicePermission = true;
// 0:等待老师上线 1:确认开课 2:等待老师开课 3:老师开课
var classStatus = 0;
window.onload = function(){
	$body = document.querySelector('body');
	$main = document.getElementById('main');
	$pm = document.getElementById('pl_m');
	$pptHolder = document.getElementById('ppt_holder');
	$nextPPT = document.querySelector('#page_container .next');
	$prevPPT = document.querySelector('#page_container .prev');
	$pptCurrentPg = document.querySelector('#page_container .current-page');
	$pptAllPg = document.querySelector('#page_container .all-page');
	$ph = document.getElementById('pl_h');
	$navContainer = document.getElementById('nav_container');
	$actionBtn = document.getElementById('action_btn');
	$pf = document.getElementById('pl_f');
	$pf_r = document.querySelector('#pl_f_r');
	c = document.getElementsByTagName('canvas')[0];
	$pl = document.getElementById('part_left');
	$pr = document.getElementById('part_right');
	$body = document.querySelector('body');
	$undo = document.querySelector('#undo');
	$redo = document.querySelector('#redo');
	$navAdd = document.querySelector('#nav_add');
	$pptTip = document.getElementById('ppt_tip');
	$msgMainContainer = document.querySelector('#msg_main_container');
	$msgMainWrapper = document.querySelector('#msg_main_wrapper');
	$msgInput = document.querySelector('#msg_input');
	$msgBtn = document.querySelector('#msg_btn');
	$videoTip = document.getElementById('video_tip');
	winH = window.innerHeight;
	winW = window.innerWidth;
	canvasH = winH - 110;
	canvasW = (winH-200)*16/9;
	ctx = c.getContext('2d');

	c.height = c.style.height = canvasH;
	c.width = c.style.width = canvasW;

	$color = document.querySelector('#select_color');
	$width = document.querySelector('#select_width');
	$shape = document.querySelector('#shape');
	$eraser = document.querySelector('#eraser');
	$pen = document.querySelector('#pen');
	$clear = document.querySelector('#clear');
	$undo = document.querySelector('#undo');
	$redo = document.querySelector('#redo');

	audioSelect = document.querySelector('select#audioSource');
	videoSelect = document.querySelector('select#videoSource');

	// websocket
	socket = new WebSocket('ws://121.40.91.157:8282');
	socket.onopen = function(){
		socket.send(JSON.stringify({type:10,user:user}));
		socket.onmessage = function(event){
			if(typeof receive === 'function') receive(event,canvasW, canvasH);
		}
		socket.onclose = function(){
			console.log('socket关闭');
		}
	}
	// 右上角倒计时
	// new Countdown('#pl_h_r .countdown',120);

	initialSize();
	// renderPPT(localPPTArr[0].content,0);
	// size控制部分
	FullScreen.onfullscreenchange(fullSize, initialSize);
	document.getElementById('full').onclick = enterFull;
	document.getElementById('half').onclick = exitFull;
	// canvas作图部分
	$shape.onclick = shape;
	$eraser.onclick = eraser;
	$pen.onclick = pen;
	$clear.onclick = clear;
	$undo.onclick = undo;
	$redo.onclick = redo;
	$color.querySelector('.select-pop').onclick = selectColor;
	$width.querySelector('.select-pop').onclick = selectWidth;
	document.querySelector('#switch').onclick = toggleCanvas;
	$body.addEventListener('mousemove',wanderMode,false);
	c.addEventListener('mousedown', startPath, false);
	c.addEventListener('mouseup', renderToWander, false);
	// 聊天部分
	$msgInput.oninput = inputMsg;
	$msgInput.onfocus = bindEnter;
	$msgInput.onblur = unbindEnter;
	$msgBtn.onclick = sendMsg;
	// 检测设备及视频部分
	var deviceDetect = '';
	setTimeout(function(){
		if(!hasWebcam) {
			document.querySelector('#video').checked = false;
		}
		// if(!hasMicrophone) {
		// 	deviceDetect += '未检测到麦克风！';
		// 	devicePermission = false;
		// }
		if(!devicePermission) {
			deviceDetect += '学生不可正常开课喔！';
			$actionBtn.addClass('disabled');
			alert(deviceDetect);
		} else {
			$actionBtn.onclick = activeChangeClassStatus;
		}
	},0)
}
