function initialSize(){
	var $pptItems = $pptHolder.querySelectorAll('.ppt-item');
	c.style.transform = 'scale(1)';
	c.scaleTime = 1;
	$pm.style.height = canvasH + 'px';
	$pptHolder.style.width = $pl.style.width = $ph.style.width = $pf.style.width = $pm.style.width = canvasW + 'px';
	$pr.style.height = winH + 'px';
	$main.style.width = c.width + 302 + 'px';
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
		c.style.transform = 'scale('+scaleTime+')';
		c.scaleTime = scaleTime;
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