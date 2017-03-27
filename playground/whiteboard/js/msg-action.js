/* Copyright (C) DearVikki - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by DearVikki <wanqicn@qq.com>, March 2017
 */
function sendMsg(){
	var msg = $msgInput.value;
	if(!msg.length) return;
	var div = document.createElement('div');
	div.addClass('msg-container');
	div.innerHTML = '<div class="msg msg-from">'+ msg +'</div>';
	$msgMainWrapper.appendChild(div);
	$msgMainWrapper.scrollTop = $msgMainWrapper.scrollHeight;
	$msgInput.value = '';
	$msgBtn.addClass('disabled');
	socket.send(JSON.stringify({type:8,msg:msg}));
}

function enterToSendMsg(e){
	if(e.keyCode === 13) sendMsg();
}

function bindEnter(){
	document.addEventListener('keydown',enterToSendMsg,false);
}

function unbindEnter(){
	document.removeEventListener('keydown',enterToSendMsg,false);
}

function inputMsg(){
	var msg = $msgInput.value;
	if(msg.length) $msgBtn.removeClass('disabled');
	else $msgBtn.addClass('disabled');
}