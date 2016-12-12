export function scrollTo(to, from){
	//指定- speed:n秒一轮 time:一共运行n秒
	//round:一共运行次数 roundLen:一次上升距离
	let speed = 10;
	let time = 300;
	let round = Math.ceil(time/speed);
	let roundLen = Math.abs(to-from)/round;
	let goScroll = setInterval(()=>{
		round--;
		//由下至上
		let top;
		if(from > to) {top = to + roundLen*round}
		//由上至下
		else {top = to - roundLen*round;}
		window.scrollTo(0,top);
		if(round === 0) clearInterval(goScroll);
	},speed)
}