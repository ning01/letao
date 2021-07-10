//需求:在第一个ajax请求完,开启进度条
//在所有的ajax请求都回来后,关闭进度条
$(document).ajaxStart(function () {
  NProgress.start();

})
$(document).ajaxStart(function () {
  NProgress.done()
  
})