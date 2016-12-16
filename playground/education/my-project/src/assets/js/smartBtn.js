function initial(el,color) {
	let cover = document.createElement('div');
	cover.classList.add('smartBtn');
	console.log(el)
	cover.style.background = 'red';
	el.appendChild(cover);
	//看起来似乎没有效果阿
}
function loading(e) {
	console.log('loading!')
}

function success() {
	console.log('success')
}

export default{
	loading,
	success,
	initial
}