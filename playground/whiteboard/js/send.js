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
	var $body = document.querySelector('body');
	var $pl = document.getElementById('part_left');
	var $pf = document.getElementById('pl_f');
	var c = document.getElementsByTagName('canvas')[0];
	var ctx = c.getContext('2d');
	var eraserObj = [];
	var localPathArr = [];
	var redoPathArr = [];
	// trigger事件
	var canvasDraw = new Event('canvasDraw');
	var canvasEraser = new Event('canvasEraser');
	function getPos(holder, mouse){
		var rect = holder.getBoundingClientRect();
		// 鼠标移出canvas外 则取消事件
		// 注意getBoundingRect基于物理像素 所以虽然scale后canvas.style.width不会变 但前者.width会变
		if(mouse.clientX - rect.left >=　rect.width) $body.removeEventListener('mousemove',render,false);
		// 判断canvas是否有被scale
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
	function render(e){
		var pos = getPos(c, e);
		var dotObj = {style:{color:color,width:width},dot:{isStart:false,coord:[pos.x/canvasW, pos.y/canvasH]}};
		var localDotObj = {style:{color:color,width:width},dot:{isStart:false,coord:[pos.x/canvasW, pos.y/canvasH]}};
		if(eraser){
			// 擦除
			dotObj.eraser = true;
			localDotObj.eraser = true;
			ctx.clearRect(pos.x/canvasW*canvasW,pos.y/canvasH*canvasH,7,7);
		} else if(circle) {
			console.log('circle!')
			// 画形状时
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

	function wander(e){
		if($pl.full){
			var distanceToBottom = window.innerHeight - e.clientY;
			if(distanceToBottom < 60) $pf.addClass('active');
			else $pf.removeClass('active');
		}
	}

	// 开始新的一笔
	c.addEventListener('mousedown',function(e){
		var pos = getPos(c, e);
		var msg = 'Mouse position: ' + pos.x + ',' + pos.y;
		var dotObj = {style:{color:color,width:width},dot:{isStart:true,coord:[pos.x/canvasW, pos.y/canvasH]}};
		var localDotObj = {style:{color:color,width:width},dot:{isStart:true,coord:[pos.x/canvasW, pos.y/canvasH]}};
		if(eraser){
			// 橡皮
			dotObj.eraser = true;
			localDotObj.eraser = true;
		}else if(circle) {
			ctx.strokeRect(pos.x/canvasW*canvasW,pos.y,150,100);
		}
		else{
			// 写字
			ctx.beginPath();
			ctx.moveTo(pos.x/canvasW*canvasW,pos.y/canvasH*canvasH);
		}
		socket.send(JSON.stringify({type:0, data:{dotObj:dotObj}}));
		localPathArr.push([localDotObj]);
		$body.removeEventListener('mousemove',wander,false);
		$body.addEventListener('mousemove',render,false);
	},false)
	c.addEventListener('mouseup',function(){
		$body.removeEventListener('mousemove',render,false);
		$body.addEventListener('mousemove',wander,false);
	})
	// 默认鼠标wander模式
	$body.addEventListener('mousemove',wander,false);

	// 点击橡皮
	var eraser = false;
	var $eraser = document.querySelector('#eraser');
	$eraser.onclick = function(){
		if(!eraser){
			eraser = true;
			$eraser.classList.add('active');
			c.classList.add('eraser');
		} else {
			eraser = false;
			$eraser.classList.remove('active');
			c.classList.remove('eraser');
		}
	}
	// 点击清屏
	var $clear = document.querySelector('#clear');
	$clear.onclick = function(){
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
		// 此时localPathArr的该值为object而非array
		localPathArr=[{clear:true,content:localPathArr_cp}];
	}
	// 点击颜色
	var color = '#000';
	var $black = document.querySelector('#black');
	var $pink = document.querySelector('#pink');
	$black.onclick = function(){
		document.querySelector('.color.active').classList.remove('active');
		$black.classList.add('active');
		ctx.strokeStyle = '#000';
		color = '#000'
		// socket.send(JSON.stringify({type:3, color:color}));
	}
	$pink.onclick = function(){
		document.querySelector('.color.active').classList.remove('active');
		$pink.classList.add('active');
		ctx.strokeStyle = '#ffc0cb';
		color = '#ffc0cb';
		// socket.send(JSON.stringify({type:3, color:color}));
	}
	// 点击笔触
	var width = 1;
	var $line1 = document.querySelector('#line1');
	var $line5 = document.querySelector('#line5');
	$line1.onclick = function(){
		document.querySelector('.line.active').classList.remove('active');
		$line1.classList.add('active');
		ctx.lineWidth = 1;
		width = 1;
		// socket.send(JSON.stringify({type:4, width:width}));
	}
	$line5.onclick = function(){
		document.querySelector('.line.active').classList.remove('active');
		$line5.classList.add('active');
		ctx.lineWidth = 5;
		width = 5;
		// socket.send(JSON.stringify({type:4, width:width}));
	}

	// 点击画圆
	var circle = false;
	var $circle = document.querySelector('#circle');
	$circle.onclick = function(){
		if(!circle){
			circle = true;
			$circle.classList.add('active');
			c.classList.add('circle');
		} else {
			circle = false;
			$circle.classList.remove('active');
			c.classList.remove('circle');
		}
	}

	// 点击撤销
	var $undo = document.querySelector('#undo');
	$undo.onclick = function(){
		if(!localPathArr.length) return;
		ctx.clearRect(0,0, c.width, c.height);
		redoPathArr.push(localPathArr.pop());
		$redo.classList.remove('active');

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

	// 点击回撤
	var $redo = document.querySelector('#redo');
	$redo.onclick = function(){
		if(!redoPathArr.length) return;
		var lastPathArr = redoPathArr.pop();
		localPathArr.push(lastPathArr);

		// 回撤清空test
		if(lastPathArr.clear){
			localPathArr = [lastPathArr];
		}
		drawFromPathArr(ctx,lastPathArr,canvasW,canvasH);
		if(!redoPathArr.length) $redo.classList.add('active');
		socket.send(JSON.stringify({type:3}));
	}
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

