var mainpath = location.protocol + '//' + location.hostname; //'http://dict.youdao.com';
var path = location.pathname; // '/w/formidable/'
var pathArray = path.split('/');
var breadcrumbTrail = '<p>';
pathArray.forEach(function(e, i) {
	//判断是不是最后一个/后面的空格
    if (e.length == 0) return;
    mainpath += ('/' + e);
    console.log(i)
    console.log(pathArray) // 'w','formidable',''
    breadcrumbTrail += '<a href="' + mainpath + '">' + e + (i == pathArray.length - 2 ? '' : '-\>') + '</a>';
})
breadcrumbTrail += '</p>';
document.querySelector('body').innerHTML = breadcrumbTrail;