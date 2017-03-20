var localPathArr_r = [], redoPathArr_r = [];
var p = {}, p0 = {};
function receive(event,canvasW, canvasH){
			try {
				var data = JSON.parse(event.data);
			} catch(e) {
				return false;
			}
			switch(data.type){
				case 0:
					var dotObj = data.data.dotObj;
					var dotCoord = dotObj.dot.coord,
						eraser = dotObj.eraser,
						shape = dotObj.shape,
						color = dotObj.style.color,
						width = dotObj.style.width;
					ctx.strokeStyle =  color;
					ctx.lineWidth = width;
					p = {x: dotCoord[0]*canvasW, y: dotCoord[1]*canvasH};

					if(dotObj.dot.isStart) localPathArr_r.push([dotObj]);
					else localPathArr_r[localPathArr_r.length - 1].push(dotObj);

					if(eraser){
						// 擦除
						ctx.clearRect(p.x, p.y, 7, 7);
					} else if(shape){

					} else{
						// 绘制
						if(dotObj.dot.isStart) {
							ctx.beginPath();
							ctx.moveTo(p.x, p.y);
						}
						else{
							ctx.quadraticCurveTo(p0.x, p0.y, p.x, p.y);
						}
						p0 = {x:p.x, y:p.y};
						ctx.stroke();
					}
					break;
				case 1:
					// 清空
					ctx.clearRect(0,0, c.width, c.height);
					// 扩展：清屏撤回
					var localPathArr_r_cp = [];
					localPathArr_r.forEach(function(e){
						localPathArr_r_cp.push(e);
					});
					localPathArr_r=[{clear:true,content:localPathArr_r_cp}];
					break;
				case 2:
					// 撤销
					ctx.clearRect(0,0, c.width, c.height);
					redoPathArr_r.push(localPathArr_r.pop());
					//撤销清空
					if(redoPathArr_r[redoPathArr_r.length-1].clear){
						redoPathArr_r[redoPathArr_r.length-1].content.forEach(function(r){
							localPathArr_r.push(r);
						})
					}
					localPathArr_r.forEach(function(e){
						drawFromPathArr(ctx,e,canvasW,canvasH);
					})
					break;
				case 3:
					// 反撤销
					var lastPathArr_r = redoPathArr_r.pop();
					localPathArr_r.push(lastPathArr_r);
					// 回撤清空
					if(lastPathArr_r.clear){
						localPathArr_r = [lastPathArr_r];
					}
					drawFromPathArr(ctx,lastPathArr_r,canvasW,canvasH);
					break;
				case 4:
					// PPT翻页
				case 7:
				console.log('hey')
					// 发消息
					var msg = data.msg;
					console.log(msg)
					var div = document.createElement('div');
					div.addClass('msg-container');
					div.innerHTML = '<div class="msg msg-to">'+msg+'</div>';
					$msgMainWrapper.appendChild(div);
				case 10:
					// 登陆
					console.log(tip)
					var tip = data.user.user_name;
					if(data.user.user_type===1) tip += '老师';
					else tip += '同学';
					tip += '已上线';
					var div = document.createElement('div');
					div.addClass('msg-container');
					div.innerHTML = '<div class="msg-tip">'+tip+'</div>';
					$msgMainWrapper.appendChild(div);
			}
		}
