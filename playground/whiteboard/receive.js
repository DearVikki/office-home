var c = document.getElementsByTagName('canvas')[0],
	ctx = c.getContext('2d');
var p = {}, p0 = {};
function receive(event,canvasW, canvasH){
			try {
				var data = JSON.parse(event.data);
			} catch(e) {
				return false;
			}
			switch(data.type){
				case 0:
					// 写字
					var pathObj = data.data.pathObj;
					var pathObjDot = pathObj.path.dot,
						color = pathObj.style.color,
						width = pathObj.style.width;
						// console.log(data.data)
					ctx.strokeStyle =  color;
					ctx.lineWidth = width;
					p = {x: pathObjDot[0]*canvasW, y: pathObjDot[1]*canvasH};

					if(pathObj.path.isStart) {
						ctx.beginPath();
						ctx.moveTo(p.x, p.y);
					}
					else{
						ctx.quadraticCurveTo(p0.x, p0.y, p.x, p.y);
					}
					p0 = {x:p.x, y:p.y};
					ctx.stroke();
					break;
				case 1:
					// 擦除
					var eraserObj = data.data.eraserObj;
					ctx.clearRect(eraserObj[0]*canvasW, eraserObj[1]*canvasH, 7, 7);
					break;
				case 2:
					// 清空
					ctx.clearRect(0,0, c.width, c.height);
					break;
			}
		}
