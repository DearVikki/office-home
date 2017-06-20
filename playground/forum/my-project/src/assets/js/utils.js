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
    // today指今天0点时间戳
    let today = new Date().setDate(new Date().getDate());
    today = new Date(today).setHours(0);
    today = new Date(today).setMinutes(0);
    today = new Date(today).setSeconds(0);
    let y = new Date(timestamp).getFullYear(),
        m = new Date(timestamp).getMonth()+1,
        d = new Date(timestamp).getDate(),
        h = new Date(timestamp).getHours(),
        mm = new Date(timestamp).getMinutes();
    mm = mm >= 10 ? mm : '0'+mm;
    let difftime = timestamp - today;
    if (difftime > 0) return h+':'+mm;
    else if(difftime >= -1000*60*60*24) return '昨天';
    else if(difftime >= -2*1000*60*60*24) return '前天';
    else return y+'年'+m+'月'+d+'日';
}

// myalert
export let myAlert = {
    big: function(txt){
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
    },
    small: function(txt){
        let div0 = document.createElement('div'),
            div = document.createElement('div');
        div.innerHTML = txt;
        div.classList.add('my-alert');
        div.classList.add('small');
        div0.appendChild(div);
        div0.classList.add('my-alert-container');
        document.querySelector('body').appendChild(div0);
        setTimeout(()=>{
            document.querySelector('body').removeChild(div0);
        },1500)
    }
}

export let loadMore = {
    config:{
        cb:function(){}
    },
    loading:false,
    loadAll:false,
    loadMore(){
        let scrollTop = document.body.scrollTop;
        let windowH = window.innerHeight;
        let pageH = document.body.getBoundingClientRect().height;
        if(scrollTop + windowH > pageH - 5){
            if(this.loadAll || this.loading) return;
            this.loading = true;
            this.config.cb();
        }
    },
    open(){
        window.addEventListener('scroll',this.loadMore.bind(this),false);
    },
    close(){
        console.log('remove掉了啊 为什么还是会触发loadmore事件')
        window.removeEventListener('scroll',this.loadMore,false);
    },
    reset(cb){
        this.close();
        this.config.cb = cb;
        this.loading = false;
        this.loadAll = false;
    }
}