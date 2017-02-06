//加入的适配部分
var winWidths=window.innerWidth;
var densityDpi=640/winWidths;
// 除了平板 densityDpi=300*640与屏幕的比 否则desensityDpi就直接=640与屏幕的比
densityDpi= densityDpi>1?300*densityDpi:densityDpi;
if(isWeixin()){
  // document.querySelector("meta[name=viewport]").setAttribute('content', 'width=640, target-densityDpi='+densityDpi);
  document.querySelector("meta[name=viewport]").setAttribute('content', 'width=640');
}
function isWeixin(){
  var ua = navigator.userAgent.toLowerCase();
  if(ua.match(/MicroMessenger/i)=="micromessenger") {
  return true;
  } else {
  return false;
  }
}
