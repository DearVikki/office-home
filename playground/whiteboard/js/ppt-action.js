var localPPTArr = [{
	id:1,
	content:["http://tangguyan.vicp.net/upload/2017_03_18/img1489842115wumRmipT.jpg",
"http://tangguyan.vicp.net/upload/2017_03_18/img1489842115hrYkF1pc.jpg",
"http://tangguyan.vicp.net/upload/2017_03_18/img1489842115MwVsWZXy.jpg",
"http://tangguyan.vicp.net/upload/2017_03_18/img1489842115Fj6pP442.jpg"]
}]

function emptyPPT(){
	$pptHolder.empty();
	$pptHolder.style.transform = 'translateY(0px)';
}
function renderPPT(pptArr){
	pptArr.forEach(function(e){
		var img = new Image();
		img.src = e;
		img.addClass('ppt-item');
		$pptHolder.appendChild(img);
	})
	pptSize();
	$prevPPT.addClass('disabled');
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
	ctx.clearRect(0,0,c.width,c.height);
}

function nextPage(e){
	var t = e.target;
	if(t.hasClass('disabled')) return;
	$pptCurrentPg.textContent = ++currentPg;
	positionPPT();
	resetCanvas();
	$prevPPT.removeClass('disabled');
	if(currentPg === allPg) $nextPPT.addClass('disabled');
	socket.send(JSON.stringify({type:4,page:currentPg}));
}

function prevPage(e){
	var t = e.target;
	if(t.hasClass('disabled')) return;
	$pptCurrentPg.textContent = --currentPg;
	positionPPT();
	resetCanvas();
	$nextPPT.removeClass('disabled');
	if(currentPg === 1) $prevPPT.addClass('disabled');
	socket.send(JSON.stringify({type:4,page:currentPg}));
}

function switchPPT(e){
	var t = e.target;
	if(!t.hasClass('nav')) return;
	var index = t.index('.nav');
	if(t.hasClass('nav')) {
		document.querySelector('.active.nav').removeClass('active');
		t.addClass('active');
	}
	emptyPPT();
	renderPPT(localPPTArr[index].content);
	resetCanvas();
}

function pptUpload(){
	var file = $pptInput.files[0];
	if(!file) return;
	var pptItem = document.createElement('div');
	pptItem.addClass('ppt-modal-item');
	pptItem.innerHTML =
					'<div class="ppt-modal-progress"></div>' +
					'<div class="ppt-modal-name fl">'+file.name+'</div>' +
					'<div class="ppt-modal-size fl">上传中..</div>' +
					'<div class="ppt-modal-delete fl">删除</div>';
	var $pptItem = $pptContainer.appendChild(pptItem);
	var $pptProgress = $pptItem.querySelector('.ppt-modal-progress');
	var $pptSize = $pptItem.querySelector('.ppt-modal-size');
	pptMaxNum();
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
		    	$pptItem.remove();
		    	pptMaxNum();
		    	alert(data.msg);
		    }
		    else {
		    	$pptProgress.style.width = 0;
		    	$pptSize.innerHTML = fileSizeConverter(file.size);
		    	var div = document.createElement('div');
		    	div.addClass('nav');
		    	div.textContent = file.name;
		    	$navContainer.appendChild(div);
		    	localPPTArr.push({id:'',content:data.data.list});
		    	// 若刚刚无PPT 则显示该份PPT
		    	if(localPPTArr.length === 1){
		    		resetCanvas();
		    		renderPPT(localPPTArr[0].content);
		    		$pptTip.removeClass('active');
		    	}
		    }
		}
	}
	xhr.send(fm);
}

function deletePPT(e){
	var t = e.target;
	if(!t.hasClass('ppt-modal-delete')) return;
	var $pptItem = t.parentElement;
	var index = $pptItem.index();
	var $allNav = document.querySelectorAll('.nav');
	var $activeNav = document.querySelector('.nav.active');
	var activeIndex = $activeNav.index();
	$allNav[index].remove();
	document.querySelectorAll('.ppt-modal-item')[index].remove();
	localPPTArr.splice(index,1);
	pptMaxNum();
	if(activeIndex===index){
		emptyPPT();
		if(localPPTArr.length===0){
			$pptTip.addClass('active');
		} else if(activeIndex===0) {
			document.querySelector('.nav').addClass('active');
			renderPPT(localPPTArr[0].content);
		} else {
			document.querySelectorAll('.nav')[activeIndex-1].addClass('active');
			renderPPT(localPPTArr[index-1].content);
		}
		resetCanvas();
	}
}

function pptMaxNum(){
	var $pptItems = $pptContainer.querySelectorAll('.ppt-modal-item');
	if($pptItems.length >= 3) $pptBtn.addClass('disabled');
	else $pptBtn.removeClass('disabled');
}

function pptUploadBtn(e){
	var t = e.target;
	if(t.hasClass('disabled')) return;
	$pptInput.click();
}