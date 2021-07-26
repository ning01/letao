$(function () {
  
  //1.用户信息渲染需要用户是登录状态
  //(1)如果用户是未登录,后台返回error,拦截到登录页
  //(2)如果用户是登录,后台返回当前用户信息,进行渲染
  $.ajax({

    type: "get",
    url: "/user/queryUserMessage",
    dataType: "json",
    success: function (info) {
      console.log(info);
      if (info.error === 400) {
        //用户未登录,拦截到登录页
        
        location.href = "login.html";
        return;
      }
      //用户登录,进行信息渲染 info是当前用户信息
      var htmlStr = template("infoTpl", info);
      $('#userInfo').html(htmlStr);
      
    }

  })

  //2.退出功能,点击按钮发送退出请求即可

  $('#logout').click(function () {
    
    $.ajax({
     type: "get",
     url: '/user/logout',
     dataType: "json",
     success: function (info) {
       console.log(info);
       //已登录,退出
       if (info.success) {
         location.href = "login.html";
       }
      
      
     }
   })
  })
})