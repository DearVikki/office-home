
// document.onload为什么不触发
window.onload = function(){
	var $main = document.getElementById('main'),
		$pm = document.getElementById('pl_m'),
		$ph = document.getElementById('pl_h'),
		$pf = document.getElementById('pl_f'),
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
	}

	function fullSize(){
		var scaleTime = winH/canvasH;
		$c.style.transform = 'scale('+scaleTime+')';
		$c.scaleTime = scaleTime;
		$pl.style.width = $ph.style.width = $pf.style.width=$pm.style.width = $pl.style.width = scaleTime*canvasW + 'px';
		$pm.style.height = winH + 'px';
		$pr.style.display = 'none';
		$pr.removeClass('slideOut');
		$pl.addClass('fullsize');
		$pl.full=true;
	}

	initialSize();
	// 点击全屏
	document.getElementById('full').onclick = fullSize;
	// 退出全屏
	document.getElementById('half').onclick = function(){
		initialSize();
		$pr.addClass('slideOut');
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