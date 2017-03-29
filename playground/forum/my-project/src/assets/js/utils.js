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
    loadMore(){
        let scrollTop = document.body.scrollTop;
        let windowH = window.innerHeight;
        let pageH = document.body.getBoundingClientRect().height;
        console.log(scrollTop+windowH)
        console.log(pageH)
        if(scrollTop + windowH > pageH - 5){
            if(this.loading) return;
            this.config.cb();
            this.loading = true;
        }
    },
    open(){
        window.addEventListener('scroll',this.loadMore.bind(this),false);
    },
    close(){
        window.removeEventListener('scroll',this.loadMore);
    },
    reset(cb){
        this.close();
        this.config.cb = cb;
    }
}