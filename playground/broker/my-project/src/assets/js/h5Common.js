var viewport = document.querySelector("meta[name=viewport]");
var winWidths=window.innerWidth;
var densityDpi=640/winWidths;
  densityDpi= densityDpi>1?300*640*densityDpi/640:densityDpi;
if(isWeixin()){
  viewport.setAttribute('content', 'width=640,initial-scale=.5,maximum-scale=.5, minimum-scale=.5,user-scalable=no, target-densityDpi='+densityDpi);
}
function isWeixin(){
  var ua = navigator.userAgent.toLowerCase();
  if(ua.match(/MicroMessenger/i)=="micromessenger") {
  return true;
  } else {
  return false;
  }
}
document.getElementsByTagName('html')[0].style.fontSize = window.innerWidth / 10 + 'px';

document.getElementById('app').style.minHeight = window.innerHeight + 'px';
