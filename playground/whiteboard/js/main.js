
// document.onload为什么不触发
window.onload = function(){
	var $main = document.getElementById('main'),
		$pm = document.getElementById('pl_m'),
		$pptHolder = document.getElementById('ppt_holder'),
		$nextPPT = document.querySelector('#page_container .next'),
		$prevPPT = document.querySelector('#page_container .prev'),
		$pptCurrentPg = document.querySelector('#page_container .current-page'),
		$pptAllPg = document.querySelector('#page_container .all-page'),
		$ph = document.getElementById('pl_h'),
		$pf = document.getElementById('pl_f'),
		$pf_r = document.querySelector('#pl_f_r'),
		$c = document.getElementsByTagName('canvas')[0],
		$pl = document.getElementById('part_left'),
		$pr = document.getElementById('part_right'),
		$body = document.querySelector('body'),
		$undo = document.querySelector('#undo'),
		$redo = document.querySelector('#redo'),
		$navAdd = document.querySelector('#nav_add'),
		$pptBtn = document.querySelector('#ppt_modal .c-btn'),
		$pptInput = document.querySelector('#ppt_modal input'),
		$pptContainer = document.querySelector('#ppt_modal_container');
	var winH = window.innerHeight,
		winW = window.innerWidth;
	var canvasH = winH - 110, canvasW = (winH-200)*16/9;
	var currentPg = 1,
		allPg;
	var ctx = $c.getContext('2d');

	$c.height = $c.style.height = canvasH;
	$c.width = $c.style.width = canvasW;

	function initialSize(){
		var $pptItems = $pptHolder.querySelectorAll('.ppt-item');
		$c.style.transform = 'scale(1)';
		$c.scaleTime = 1;
		$pm.style.height = canvasH + 'px';
		$pptHolder.style.width = $pl.style.width = $ph.style.width = $pf.style.width = $pm.style.width = canvasW + 'px';
		$pr.style.height = winH + 'px';
		$main.style.width = $c.width + 302 + 'px';
		$body.style.width = winW;
		$pl.removeClass('fullsize');
		$pr.style.display = 'block';
		$pr.addClass('slideOut');
		if(!$pptItems.length) return;
		pptSize();
		positionPPT();
	}

	function fullSize(){
		var $pptItems = $pptHolder.querySelectorAll('.ppt-item');
		// change的时候其实页面高宽还没有变完
		setTimeout(function(){
			var winH = window.innerHeight;
			var scaleTime = winH/canvasH;
			$c.style.transform = 'scale('+scaleTime+')';
			$c.scaleTime = scaleTime;
			$main.style.width = $pptHolder.style.width = $pl.style.width = $ph.style.width = $pf.style.width=$pm.style.width = scaleTime*canvasW + 'px';
			$pm.style.height = winH + 'px';
			$pr.style.display = 'none';
			$pr.removeClass('slideOut');
			$pl.addClass('fullsize');
			if(!$pptItems.length) return;
			pptSize();
			positionPPT();
		},300)
	}

	function pptSize(){
		var $pptItems = $pptHolder.querySelectorAll('.ppt-item');
		if(!$pl.hasClass('fullsize')){
			for(var i = $pptItems.length; i > 0; i--){
				$pptItems[i-1].style.width = canvasW + 'px';
				$pptItems[i-1].style.height = canvasH + 'px';
			}
		}
		else {
			var winH = window.innerHeight;
			for(var i = $pptItems.length; i > 0; i--){
				$pptItems[i-1].style.width = winH/canvasH*canvasW + 'px';
				$pptItems[i-1].style.height =  winH + 'px';
			}
		}
	}

	function enterFull(){
		if(!FullScreen.goFullScreen(document.documentElement)) fullSize();
	}
	function exitFull(){
		if(!FullScreen.exitFullScreen()) initialSize();
	}

	function renderPPT(pptArr){
		$pptHolder.empty();
		pptArr.forEach(function(e){
			var img = new Image();
			img.src = e;
			img.addClass('ppt-item');
			$pptHolder.appendChild(img);
		})
		pptSize();
		$pptCurrentPg.textContent = currentPg = 1;
		$pptAllPg.textContent = allPg = pptArr.length;
	}

	function positionPPT(){
		var pageH = $pptHolder.querySelector('.ppt-item').style.height.slice(0,-2);
		$pptHolder.style.transform = 'translateY(-'+ (currentPg-1)*pageH +'px)';
	}

	function resetCanvas(){
		localPathArr = [];
		redoPathArr = [];
		$undo.addClass('disabled');
		$redo.addClass('disabled');
		ctx.clearRect(0,0,$c.width,$c.height);
	}

	function nextPage(e){
		var t = e.target;
		if(t.hasClass('disabled')) return;
		$pptCurrentPg.textContent = ++currentPg;
		positionPPT();
		resetCanvas();
		$prevPPT.removeClass('disabled');
		if(currentPg === allPg) $nextPPT.addClass('disabled');
	}

	function prevPage(e){
		var t = e.target;
		if(t.hasClass('disabled')) return;
		$pptCurrentPg.textContent = --currentPg;
		positionPPT();
		resetCanvas();
		$nextPPT.removeClass('disabled');
		if(currentPg === 1) $prevPPT.addClass('disabled');
	}

	function pptUpload(){
		var file = $pptInput.files[0];
		if(!file) return;
		var pptItem = document.createElement('div');
		pptItem.addClass('ppt-modal-item');
		pptItem.innerHTML =
					'<div class="ppt-modal-item">' +
						'<div class="ppt-modal-progress"></div>' +
						'<div class="ppt-modal-name fl">'+file.name+'</div>' +
						'<div class="ppt-modal-size fl">上传中</div>' +
						'<div class="ppt-modal-delete fl">删除</div>' +
					'</div>';
		var $pptItem = $pptContainer.appendChild(pptItem);
		var $pptProgress = $pptItem.querySelector('.ppt-modal-progress');
		var $pptSize = $pptItem.querySelector('.ppt-modal-size');
		var fm = new FormData();
		fm.append('ppt',file);
		var xhr = new XMLHttpRequest();
		xhr.open('post','http://tangguyan.vicp.net/pcapi?name=education.sys.ppt.upload',true);
		xhr.upload.onprogress = function(event){
		    var percentage = (event.loaded/event.total)*100;
		    $pptProgress.style.width = percentage + '%';
		};
		xhr.onreadystatechange = function(){
			if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
			    var data = JSON.parse(xhr.responseText);
			    if(!data.success) {
			    	$pptSize.remove();
			    	alert(data.msg);
			    }
			    else {
			    	$pptSize.innerHTML = fileSizeConverter(file.size);

			    }
			}
		}
		xhr.send(fm);
	}

	function pptUploadBtn(e){
		var t = e.target;
		if(t.hasClass('disabled')) return;
		$pptInput.click();
	}

	initialSize();
	renderPPT(localPPTArr[0].content);
	// size控制部分
	FullScreen.onfullscreenchange(fullSize, initialSize);
	document.getElementById('full').onclick = enterFull;
	document.getElementById('half').onclick = exitFull;
	// 切換PPT頁碼部分
	$nextPPT.onclick = nextPage;
	$prevPPT.onclick = prevPage;
	// 上傳PPT部分
	var pptModal = new Modal({
		el:'#ppt_modal'
	})
	$pptInput.onchange = pptUpload;
	$pptBtn.onclick = pptUploadBtn;
	$navAdd.onclick = pptModal.open;
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
		teacher(socket);
	}

	// 視頻部分
	DetectRTC.load(function(){
		console.log(DetectRTC.hasWebcam);
	})
}