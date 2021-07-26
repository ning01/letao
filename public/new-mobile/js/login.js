$(function () {
  
    //点击按钮,获取登录功能
  $("#loginBtn").click(function () {
    // alert(22)
    //获取用户名和密码
    var username = $('#username').val().trim();
    var password = $('#password').val().trim();
    if (username === '') {
      mui.toast("请输入用户名");
      return;
    }
    if (password === '') {
      mui.toast("请输入密码");
      return;
    }

    $.ajax({
      type: "post",
      url: "/user/login",
      data: {
        username: username,
        password:password
      },
      dataType: "json",
      success: function (info) {
        console.log(info);

        if (info.success) {

          //登录成功了,跳转到用户中心
          //(1)地址栏传递了Url.获取,并跳回去
          //(2)地址栏没有Url.正常跳转到user.html
          if (location.search.indexOf("retUrl") != -1) {
          //有传参,获取地址栏参数
            var retUrl = location.search.replace("?retUrl=","");
            // console.log(retUrl);
            location.href = retUrl;


          }
          else {
            
            location.href = "user.html";
        }

        }

        if (info.error) {
          mui.toast("用户名或密码错误");

        }
      }
      
    })
  })






})