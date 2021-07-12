//需求:在第一个ajax请求完,开启进度条
//在所有的ajax请求都回来后,关闭进度条
$(document).ajaxStart(function () {
  NProgress.start();

})
$(document).ajaxStart(function () {
  NProgress.done()
  
});


//左侧菜单切换和导航切换效果
//jquery入口函数,等待dom结构加载完成后执行
$(function () {
  //公共的功能
  //1功能1:导航点击切换功能
  $(".lt_aside .category").click(function () {
    //让下一个兄弟元素切换显示隐藏
    $(this).next().stop().slideToggle();
  
  });
})
//功能2:左侧菜单列表切换功能
$(".lt_topbar .icon_left").click(function () {
  
  $(".lt_aside").toggleClass("hidemenu");
  $(".lt_main").toggleClass("hidemenu");
  $(".lt_topbar").toggleClass("hidemenu");
})


//功能3:退出功能
$('.lt_topbar .icon_right').click(function () {
  $('#logoutModal').modal("show");

  //公共退出功能完成
  //模态框的按钮点击事件
  $("#logoutBtn").click(function () {

    $.ajax({
      type:"get",
      url:"/employee/employeeLogout",
      dataTape: "json",
      
      success: function (info) {
        console.log(info);
        if (info.success) {
          //退出成功
          location.href = "login.html";
        }
      }
     })







  })
})