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
export function myAlert(txt) {
    let div = document.createElement('div');
    div.innerHTML = txt;
    div.classList.add('my-alert');
    document.querySelector('body').appendChild(div);
    setTimeout(()=>{
        document.querySelector('body').removeChild(div);
    },1000)
}