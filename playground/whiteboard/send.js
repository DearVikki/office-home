// 后端能否判定pathObj.dot.length===0时储存上一条数据？
// 数据格式:
// pathObj:{
// 	style:{
// 		color:'#000',
// 		width:1
// 	},
// 	shape:{

// 	},
// 	path:{
// 		isStart:false,
// 		dot:[7,7]
// 	}
// }
// eraserObj:[7,7]
// 上传数据的type: 0写字 1擦除 2清空 3撤销 4ppt翻页 5切换ppt 6上传ppt
// localPathArr = [{color:0,width:5,shape:0,eraser:0,dots:[[7,7]]}]
function send(socket,canvasW, canvasH){
	var $body = document.querySelector('body');
	var c = document.getElementsByTagName('canvas')[0];
	var ctx = c.getContext('2d');
	var pathObj = {style:{color:'#000',width:1},path:{isStart:false, dot:[]}};
	var eraserObj = [];
	var localPathArr = [];
	var redoArr = [];
	// trigger事件
	var canvasDraw = new Event('canvasDraw');
	var canvasEraser = new Event('canvasEraser');
	function getPos(holder, mouse){
		var rect = holder.getBoundingClientRect();
		// 鼠标移出canvas外 则取消事件
		// 注意getBoundingRect基于物理像素 所以虽然scale后canvas.style.width不会变 但前者.width会变
		if(mouse.clientX - rect.left >=　rect.width) $body.removeEventListener('mousemove',drawLine,false);
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
	function drawLine(e){
		var pos = getPos(c, e);
		if(eraser){
			// 擦除时
			localPathArr[localPathArr.length - 1].dots.push([pos.x, pos.y]);
			eraserObj = [pos.x/canvasW, pos.y/canvasH];
			ctx.clearRect(pos.x,pos.y,7,7);
			socket.send(JSON.stringify({type:1, data:{eraserObj:eraserObj}}));
		} else if(circle){
			console.log('circle!')
			// 画形状时
			ctx.strokeRect(pos.x,pos.y,150,100);
		}
		else {
			// 写字时
			pathObj = {style:{color:color,width:width},path:{isStart:false,dot:[pos.x/canvasW, pos.y/canvasH]}};
			localPathArr[localPathArr.length - 1].dots.push([pos.x, pos.y]);
			ctx.lineTo(pos.x, pos.y);
			ctx.stroke();
			socket.send(JSON.stringify({type:0, data:{pathObj:pathObj}}));
		}
	}

	// 输入部分
	// 开始新的一笔
	c.addEventListener('mousedown',function(e){
		console.log('mousedown!')
		var pos = getPos(c, e);
		var msg = 'Mouse position: ' + pos.x + ',' + pos.y;
		if(eraser){
			localPathArr.push({color:color, width:width,shape:0,eraser:true, dots:[[pos.x, pos.y]]});
		}else if(circle) {
			ctx.strokeRect(pos.x,pos.y,150,100);
		}
		else{
			pathObj = {style:{color:color,width:width},path:{isStart:true,dot:[pos.x/canvasW, pos.y/canvasH]}};
			console.log('第一笔:'+pos.x+ ','+pos.y)
			localPathArr.push({color:color, width:width,shape:0, dots:[[pos.x, pos.y]]});
		}
		socket.send(JSON.stringify({type:0, data:{pathObj:pathObj}}))
		ctx.beginPath();
		ctx.moveTo(pos.x,pos.y);
		$body.addEventListener('mousemove',drawLine,false);
	},false)
	c.addEventListener('mouseup',function(){
		$body.removeEventListener('mousemove',drawLine,false);
	})

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
		socket.send(JSON.stringify({type:2, data:''}));
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

	function drawPathFromPathArr(arr){
		if(arr.shape){
		} else if(arr.eraser){
			arr.dots.forEach(function(d){
				ctx.clearRect(d[0],d[1],7,7);
			})
		} else{
			ctx.beginPath();
			ctx.lineWidth = arr.width;
			ctx.strokeStyle = arr.color;
			ctx.moveTo(arr.dots[0][0],arr.dots[0][1]);
			arr.dots.forEach(function(d){
				ctx.lineTo(d[0],d[1]);
				ctx.stroke();
			})
		}
	}
	// 点击撤销
	var $undo = document.querySelector('#undo');
	$undo.onclick = function(){
		ctx.clearRect(0,0, c.width, c.height);
		redoArr.push(localPathArr.pop());
		$redo.classList.remove('active');
		localPathArr.forEach(function(e){
			drawPathFromPathArr(e);
		})
	}

	// 点击回撤
	var $redo = document.querySelector('#redo');
	$redo.onclick = function(){
		if(!redoArr.length) return;
		var lastPathArr = redoArr.pop();
		localPathArr.push(lastPathArr);
		drawPathFromPathArr(lastPathArr);
		if(!redoArr.length) $redo.classList.add('active');
	}
}

