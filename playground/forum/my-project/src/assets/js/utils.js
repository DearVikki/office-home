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

//DateTransformer
export function utcToDate(timestamp) {
    timestamp = Number(timestamp+'000');
    let y = new Date(timestamp).getFullYear(),
        m = new Date(timestamp).getMonth()+1,
        d = new Date(timestamp).getDate();
    return y+'年'+m+'月'+d+'日';
}

// myalert
export function myAlert(txt){
    let div0 = document.createElement('div'),
        div = document.createElement('div');
    div.innerHTML = txt;
    div.classList.add('my-alert');
    div0.appendChild(div);
    div0.classList.add('my-alert-container');
    document.querySelector('body').appendChild(div0);
    setTimeout(()=>{
        document.querySelector('body').removeChild(div0);
    },1500)
}