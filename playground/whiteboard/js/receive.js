var localPathArr_r = [], redoPathArr_r = [];
var p = {}, p0 = {};
function addTitle(user){
	var title = user.user_name;
	title += user.user_type===0? '同学':'老师';
	return title;
}
function addTip(tip){
	var div = document.createElement('div');
	div.addClass('msg-container');
	div.innerHTML = '<div class="msg-tip">'+tip+'</div>';
	$msgMainWrapper.appendChild(div);
}
function receive(event,canvasW, canvasH){
			try {
				var data = JSON.parse(event.data);
			} catch(e) {
				return false;
			}
			switch(data.type){
				// 笔绘
				case 0:
					var dotObj = data.data.dotObj;
					var dotCoord = dotObj.dot.coord,
						mode_r = dotObj.mode,
						color = dotObj.style.color,
						width = dotObj.style.width;
					ctx.strokeStyle =  color;
					ctx.lineWidth = width;
					p = {x: dotCoord[0]*canvasW, y: dotCoord[1]*canvasH};

					if(dotObj.dot.isStart) {
						localPathArr_r.push([dotObj]);
						canvasReceivingData = true;
					}
					else localPathArr_r[localPathArr_r.length - 1].push(dotObj);

					if(dotObj.dot.isEnd) {
						canvasReceivingData = false;
						return;
					}

					if(mode_r==1){
						// 擦除
						ctx.clearRect(p.x, p.y, 7, 7);
					} else if(mode_r==2){

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
				// 清空
				case 1:
					ctx.clearRect(0,0, c.width, c.height);
					// 扩展：清屏撤回
					var localPathArr_r_cp = [];
					localPathArr_r.forEach(function(e){
						localPathArr_r_cp.push(e);
					});
					localPathArr_r=[{clear:true,content:localPathArr_r_cp}];
					break;
				// 撤销
				case 2:
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
				// 反撤销
				case 3:
					var lastPathArr_r = redoPathArr_r.pop();
					localPathArr_r.push(lastPathArr_r);
					// 回撤清空
					if(lastPathArr_r.clear){
						localPathArr_r = [lastPathArr_r];
					}
					drawFromPathArr(ctx,lastPathArr_r,canvasW,canvasH);
					break;
				// PPT翻页
				case 4:
					var page = data.page;
					$pptCurrentPg.textContent = currentPg = page + 1;
					positionPPT();
					resetCanvas();
					break;
				// 切换渲染PPT
				case 5:
					var index = data.pptIndex;
					// 此时无PPT情况
					if(index==-1){
						$pptTip.addClass('active');
						renderPPT('',-1);
					}
					else renderPPT(localPPTArr[index].content,index);
					break;
				// 上传ppt
				case 6:
					console.log(data)
					var ppt = data.ppt;
					localPPTArr.push(ppt);
					console.log(localPPTArr)
					break;
				// 删除ppt
				case 7:
					var index = data.pptIndex;
					console.log(index)
					console.log(localPathArr)
					localPPTArr.splice(index,1);
					console.log(localPPTArr)
					break;
				// 对方发消息
				case 8:
					var msg = data.msg;
					var div = document.createElement('div');
					div.addClass('msg-container');
					div.innerHTML = '<div class="msg msg-to">'+msg+'</div>';
					$msgMainWrapper.appendChild(div);
					break;
				// 对方登陆
				case 10:
					var tip = addTitle(data.user);
					tip += '已上线';
					addTip(tip);
					passiveChangeClassStatus();
					// 自己同时也得发送一条‘我已经在啦’的消息
					socket.send(JSON.stringify({type:11,user:user}));
					break;
				// 对方确认已在线
				case 11:
					var tip = addTitle(data.user);
					tip += '已等你一会了喔';
					addTip(tip);
					passiveChangeClassStatus();
					break;
				// 学生确认开课 以下是老师操作
				case 12:
					passiveChangeClassStatus();
					break;
				// 老师正式开始上课 以下是学生开启视频
				case 13:
					passiveChangeClassStatus();
					break;
				// 老师结束课程
				case 14:
					passiveChangeClassStatus();
					break;
				// 一方离线
				case 15:
					var tip = addTitle(data.user);
					tip += '已离线';
					addTip(tip);
					classStatus = 0;
					break;
				// 学生无摄像头
				case 20:
					// document.getElementById('agora_local').addClass('big');
					break;
			}
		}
