//加入的适配部分
var winWidths=window.innerWidth;
var densityDpi=640/winWidths;
densityDpi= densityDpi>1?300*640*densityDpi/640:densityDpi;
//if(isWeixin()){
  document.querySelector("meta[name=viewport]").setAttribute('content', 'width=640, target-densityDpi='+densityDpi);
//}
/*function isWeixin(){
  var ua = navigator.userAgent.toLowerCase();
  if(ua.match(/MicroMessenger/i)=="micromessenger") {
  return true;
  } else {
  return false;
  }
}*/
