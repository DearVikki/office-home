// 后端能否判定coordObj.dot.length===0时储存上一条数据？
// 数据格式:
// dotObj:{
// 	style:{
// 		color:'#000',
// 		width:1
// 	},
// 	shape:{

// 	},
//  eraser:false,
// 	dot:{
// 		isStart:false,
// 		dot:[7,7]
// 	}
// }
// eraserObj:[7,7]
// 上传数据的type: 0写字/擦除 2清空 3撤销 4ppt翻页 5切换ppt 6上传ppt
// localPathArr = [[dotObj,dotObj][dotObj,dotObj,dotObj]]
function send(socket,canvasW, canvasH){
	var $body = document.querySelector('body'),
		$pl = document.getElementById('part_left'),
		$pf = document.getElementById('pl_f');
	var $color = document.querySelector('#select_color');
	var $shape = document.querySelector('#shape');
	var $eraser = document.querySelector('#eraser');
	var $pen = document.querySelector('#pen');
	var $clear = document.querySelector('#clear');
	var $undo = document.querySelector('#undo');
	var $redo = document.querySelector('#redo');
	var c = document.getElementsByTagName('canvas')[0];
	var ctx = c.getContext('2d');
	var eraserObj = [];
	var localPathArr = [];
	var redoPathArr = [];

	var eraserMode = false;
	var shapeMode = false;
	var width = 1;
	var color = '#000';
	var colorObj = {red:'#ff0000',orange:'#fa8247',yellow:'#fece4d',blue:'#3fb4ff',
	green:'#06ca77',grey:'#d0d0d0',black:'#232323',white:'#fff'};

	function getPos(holder, mouse){
		var rect = holder.getBoundingClientRect();
		// 鼠标移出canvas外 则取消事件
		// 注意getBoundingRect基于物理像素 所以虽然scale后canvas.style.width不会变 但前者.width会变
		if(mouse.clientX - rect.left >=　rect.width) renderToWander();
		if(c.scaleTime) {
			return{
				x: (mouse.clientX - rect.left)/c.scaleTime,
				y: (mouse.clientY - rect.top)/c.scaleTime
			}
		}
		else {
			return {
				x: mouse.clientX - rect.left,
				y: mouse.clientY - rect.top
			}
		}
	}

	function startPath(e){
		var pos = getPos(c, e);
		var msg = 'Mouse position: ' + pos.x + ',' + pos.y;
		var dotObj = {mode:0,style:{color:color,width:width},dot:{isStart:true,coord:[pos.x/canvasW, pos.y/canvasH]}};
		var localDotObj = {mode:0,style:{color:color,width:width},dot:{isStart:true,coord:[pos.x/canvasW, pos.y/canvasH]}};
		if(eraserMode){
			// 橡皮
			dotObj.mode = 1;
			localDotObj.mode = 1;
		} else if(shapeMode) {
			// 形状
			ctx.strokeRect(pos.x/canvasW*canvasW,pos.y,150,100);
		}
		else{
			// 写字
			ctx.beginPath();
			ctx.moveTo(pos.x/canvasW*canvasW,pos.y/canvasH*canvasH);
		}
		socket.send(JSON.stringify({type:0, data:{dotObj:dotObj}}));
		localPathArr.push([localDotObj]);
		$redo.addClass('disabled');
		$undo.removeClass('disabled');
		$body.addEventListener('mousemove',renderMode,false);
	}

	function renderMode(e){
		var pos = getPos(c, e);
		var dotObj = {mode:0,style:{color:color,width:width},dot:{isStart:false,coord:[pos.x/canvasW, pos.y/canvasH]}};
		var localDotObj = {mode:0,style:{color:color,width:width},dot:{isStart:false,coord:[pos.x/canvasW, pos.y/canvasH]}};
		if(eraserMode){
			// 橡皮
			dotObj.mode = 1;
			localDotObj.mode = 1;
			ctx.clearRect(pos.x/canvasW*canvasW,pos.y/canvasH*canvasH,7,7);
		} else if(shapeMode) {
			// 形状
			ctx.strokeRect(pos.x/canvasW*canvasW,pos.y/canvasH*canvasH,150,100);
		}
		else {
			// 写字
			ctx.lineTo(pos.x/canvasW*canvasW, pos.y/canvasH*canvasH);
			ctx.stroke();
		}
		socket.send(JSON.stringify({type:0, data:{dotObj:dotObj}}));
		localPathArr[localPathArr.length-1].push(localDotObj);
	}

	function wanderMode(e){
		if($pl.full){
			var distanceToBottom = window.innerHeight - e.clientY;
			if(distanceToBottom < 60) $pf.addClass('active');
			else $pf.removeClass('active');
		}
	}

	function renderToWander(){
		$body.removeEventListener('mousemove',renderMode,false);
		$body.addEventListener('mousemove',wanderMode,false);
	}

	function eraser(){
		$eraser.addClass('active');
		$pen.removeClass('active');
		eraserMode = !eraserMode;
		shapeMode = true;
	}

	function pen(){
		$eraser.removeClass('active');
		$shape.removeClass('active');
		$pen.addClass('active');
		eraserMode = false;
		shapeMode = false;
	}

	function clear(){
		// 以防万一点击清空时eraser按钮还是active状态
		eraser = false;
		$eraser.classList.remove('active');
		c.classList.remove('eraser');

		ctx.clearRect(0,0, c.width, c.height);
		socket.send(JSON.stringify({type:1, data:''}));
		// 扩展：清屏后也可以撤回
		var localPathArr_cp = [];
		localPathArr.forEach(function(e){
			localPathArr_cp.push(e);
		});
		localPathArr=[{clear:true,content:localPathArr_cp}];
	}

	function selectColor(e){
		var t = e.target;
		if(!t.hasClass('item')) return;
		var colorSelected = t.getAttribute('color');
		var colorSelectedRGB = colorObj[colorSelected];
		ctx.strokeStyle = color = colorSelectedRGB;
		$color.setAttribute('color',colorSelected);
		document.querySelector('#select_color .item.active').removeClass('active');
		t.addClass('active');
	}

	function selectWidth(e){
		var t = e.target;
		if(!t.hasClass('item')) return;
		var widthSelected = t.getAttribute('width');
		ctx.lineWidth = widthSelected;
		width = widthSelected;
		document.querySelector('#select_width .item.active').removeClass('active');
		t.addClass('active');
	}


	function shape(){
		if(!shape){
			shape = true;
			$shape.addClass('active');
		} else {
			shape = false;
			$shape.removeClass('active');
		}
	}

	function undo(){
		if(!localPathArr.length) return;
		ctx.clearRect(0,0, c.width, c.height);
		redoPathArr.push(localPathArr.pop());
		$redo.removeClass('disabled');
		if(!localPathArr.length) $undo.addClass('disabled');

		//撤销清空test
		if(redoPathArr[redoPathArr.length-1].clear){
			redoPathArr[redoPathArr.length-1].content.forEach(function(r){
				localPathArr.push(r);
			})
		}
		// console.log(localPathArr)
		localPathArr.forEach(function(e){
			drawFromPathArr(ctx,e,canvasW,canvasH);
		})
		socket.send(JSON.stringify({type:2}));
	}

	function redo(){
		if(!redoPathArr.length) return;
		var lastPathArr = redoPathArr.pop();
		localPathArr.push(lastPathArr);
		$undo.removeClass('disabled');
		if(!redoPathArr.length) $undo.addClass('disabled');

		if(lastPathArr.clear){
			localPathArr = [lastPathArr];
		}
		drawFromPathArr(ctx,lastPathArr,canvasW,canvasH);
		if(!redoPathArr.length) $redo.classList.add('active');
		socket.send(JSON.stringify({type:3}));
	}

	

	$shape.onclick = shape;
	$eraser.onclick = eraser;
	$pen.onclick = pen;
	$clear.onclick = clear;
	$undo.onclick = undo;
	$redo.onclick = redo;
	document.querySelector('#select_color .select-pop').onclick = selectColor;
	document.querySelector('#select_width .select-pop').onclick = selectWidth;
	$body.addEventListener('mousemove',wanderMode,false);
	c.addEventListener('mousedown', startPath, false);
	c.addEventListener('mouseup', renderToWander, false);
}

function drawFromPathArr(ctx,arr,canvasW,canvasH){
	canvasW = canvasW||1;
	canvasH = canvasH||1;
	if(arr.clear) {
		ctx.clearRect(0,0,canvasW,canvasH);
		return;
	}
	if(arr[0].shape){
	} else if(arr[0].eraser){
		arr.forEach(function(d){
			ctx.clearRect(d.dot.coord[0]*canvasW,d.dot.coord[1]*canvasH,7,7);
		})
	} else {
		ctx.beginPath();
		ctx.lineWidth = arr[0].style.width;
		ctx.strokeStyle = arr[0].style.color;
		ctx.moveTo(arr[0].dot.coord[0]*canvasW,arr[0].dot.coord[1]*canvasH);
		arr.forEach(function(d){
			ctx.lineTo(d.dot.coord[0]*canvasW,d.dot.coord[1]*canvasH);
			ctx.stroke();
		})
	}
}

