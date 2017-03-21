function passiveChangeClassStatus(){
	if(user.user_type === 0){
		switch(classStatus){
			// 等待老师上线
			case 0:
				$actionBtn.textContent = '确认开课';
				classStatus = 1;
				break;
			case 2:
				$actionBtn.style.display = 'none';
				classStatus = 3;
				join();
				if(!hasWebcam) socket.send(JSON.stringify({type:20,data:'no webcam!'}));
				break;
			case 3:
				document.getElementById('agora_local').style.display='none';
				if(document.querySelector('.agora-remote'))
					document.querySelector('.agora-remote').style.display='none';
				leave();
				$videoTip.textContent = '课程已结束';
		}
	} else {
		switch(classStatus){
			// 等待学生上线
			case 0:
				$actionBtn.textContent = '等待学生确认';
				classStatus = 1;
				break;
			case 1:
				$actionBtn.textContent = '开始课程';
				$actionBtn.removeClass('yellow').addClass('orange');
				classStatus = 2;
				break;
		}
	}
}

function activeChangeClassStatus(){
	if(user.user_type === 0){
		switch(classStatus){
			// 确认开课
			case 1:
				$actionBtn.textContent = '等待老师开课';
				classStatus = 2;
				$actionBtn.removeClass('yellow').addClass('orange');
				socket.send(JSON.stringify({type:12}));
				break;
		}
	} else {
		switch(classStatus){
			case 2:
				join();
				socket.send(JSON.stringify({type:13}));
				$actionBtn.textContent = '结束课程';
				classStatus = 3;
				break;
			case 3:
				document.getElementById('agora_local').style.display='none';
				if(document.querySelector('.agora-remote'))
					document.querySelector('.agora-remote').style.display='none';
				leave();
				socket.send(JSON.stringify({type:14}));
				$actionBtn.addClass('disabled');
				$videoTip.textContent = '课程已结束';
		}
	}
}