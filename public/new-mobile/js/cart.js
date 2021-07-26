$(function () {
  //一进入页面,发送ajax请求,获取购物车列表信息,进行渲染
  // (1)当前用户未登录,后台返回error,跳转到登录页
  // (2)当前用户已登录,后台返回购物车信息进行渲染
  render();
  function render() {
    
      
  $.ajax({
    type: "get",
    url: "/cart/queryCart",
    dataType: "json",
    success: function (info) {
      // console.log(info);
      if (info.error) {
        location.href = "login.html?retUrl=" + location.href;
        return;
      }
      console.log({ list: info })
      var htmlStr = template("carTpl", { list: info });
      $(".lt_main .mui-scroll").html(htmlStr);
    }

  })
}

 //2.点击删除功能(使用时间委托)
  //(1).通过事件委托给删除按钮添加点击事件
  //(2)获取当前需要删除的id,发送请求
  //(3)删除成功,重新渲染页面
  $('.lt_main').on("click", ".btn_delete", function () {
    
    // alert(33)
    var id = $(this).data("id");
    $.ajax({
      type: "get",
      url: "/cart/deleteCart",
      data: {
        id: [id]
      },
      dataType: "json",
      success: function (info) {
        console.log(info);
        if (info.success) {
          //删除成功,重新渲染页面
          render();
        }
      }
    })

  })

})






  
  
  
  
  
  