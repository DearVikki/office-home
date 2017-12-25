//取queryString
export function getParameterByName(name, url) {
    if (!url) {
      url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

//顶部提示栏
export function myAlert(txt, cb) {
    cb = cb || function(){};
	let div = document.createElement('div');
	div.innerHTML = txt;
	div.classList.add('my-alert');
    document.querySelector('body').appendChild(div);
    setTimeout(()=>{
        document.querySelector('body').removeChild(div);
    },1000)
    setTimeout(cb, 700);
}

//处理时间到日期
export function timestamp(date){
    var date = new Date(parseInt(date+'000'));
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    var D = date.getDate()+ ' ';
    var h = date.getHours() + ':';
    var m = date.getMinutes() + ':';
    var s = date.getSeconds();
    return Y+M+D;
}
