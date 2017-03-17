
// document.onload为什么不触发
window.onload = function(){
	var $main = document.getElementById('main'),
		$pm = document.getElementById('pl_m'),
		$ph = document.getElementById('pl_h'),
		$pf = document.getElementById('pl_f'),
		$pfBtn = document.querySelector('#pl_f_r'),
		$c = document.getElementsByTagName('canvas')[0],
		$pl = document.getElementById('part_left'),
		$pr = document.getElementById('part_right'),
		$body = document.querySelector('body');
	var winH = window.innerHeight,
		winW = window.innerWidth;
	var canvasW, canvasH;
	canvasH = winH - 110, canvasW = (winH-200)*16/9;
	$c.height = $c.style.height = canvasH;
		$c.width = $c.style.width = canvasW;

	function initialSize(){
		$c.style.transform = 'scale(1)';
		$c.scaleTime = 1;
		$pm.style.height = canvasH + 'px';
		$pl.style.width = $ph.style.width = $pf.style.width = $pm.style.width = canvasW + 'px';
		$pr.style.height = winH + 'px';
		$main.style.width = $c.width + 252 + 'px';
		$body.style.width = winW;
		$pl.removeClass('fullsize');
		$pl.full=false;
		$pr.style.display = 'block';
		$pr.addClass('slideOut');
	}

	function fullSize(){
		// change的时候其实页面高宽还没有变完
		setTimeout(function(){
			var winH = window.innerHeight;
			var scaleTime = winH/canvasH;
			console.log(winH)
			$c.style.transform = 'scale('+scaleTime+')';
			$c.scaleTime = scaleTime;
			$main.style.width = $pl.style.width = $ph.style.width = $pf.style.width=$pm.style.width = $pl.style.width = scaleTime*canvasW + 'px';
			$pm.style.height = winH + 'px';
			$pr.style.display = 'none';
			$pr.removeClass('slideOut');
			$pl.addClass('fullsize');
			$pl.full=true;
		},100)
	}

	function enterFull(){
		if(!FullScreen.goFullScreen(document.documentElement)) fullSize();
	}
	function exitFull(){
		if(!FullScreen.exitFullScreen()) initialSize();
	}
	initialSize();
	FullScreen.onfullscreenchange(fullSize, initialSize);
	document.getElementById('full').onclick = enterFull;
	document.getElementById('half').onclick = exitFull;

	// 底部条部分
	function activateCanvas(){
		$c.style.display = 'block';
		$pfBtn.removeClass('disabled');
	}
	function disableCanvas(){
		$c.style.display = 'none';
		$pfBtn.addClass('disabled');
	}
	document.querySelector('#switch').onclick = function(){
		var active = this.hasClass('active')
		if(active){
			this.removeClass('active');
			disableCanvas();
		} else {
			this.addClass('active');
			activateCanvas();
		}
	}
	// 拉取数据
	// var xhr = new XMLHttpRequest();
	// xhr.open('get','http://192.168.1.124/pcApi',false);
	// xhr.send({name:'education.sys.ppt'})
	// websocket
	var socket = new WebSocket('ws://121.40.91.157:8282');
	socket.onopen = function(){
		socket.send('接通啦socket啦');
		socket.onmessage = function(event){
			if(typeof receive === 'function') receive(event,canvasW, canvasH);
		}
		socket.onclose = function(){
			console.log('socket关闭')
		}
		send(socket,canvasW, canvasH);
	}
}