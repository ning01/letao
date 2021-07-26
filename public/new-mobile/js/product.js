$(function () {
  //1.一进入页面获取地址栏商品id
  var productId = getSearch("productId");

  //2请求对应商品的详情,进行页面渲染
  $.ajax({
    type: "get",
    url: "/product/queryProductDetail",
    data: {
      id: productId
    },

    dataType: "json",
    success: function (info) {
      console.log(info);
      var htmlStr = template("productTpl", info);
      $(".mui-scroll").html(htmlStr);

     //需要在轮播图渲染完成后手动初始化轮播图 
    //获得slider插件对象
    var gallery = mui('.mui-slider');
    gallery.slider({
      interval: 3000//自动轮播周期，若为0则不自动播放，默认为0；
      
    });
      
         //手动初始化数字框
    mui('.mui-numbox').numbox()
    }
    
  })
  
    //3.给尺码添加可选功能,添加点击事件(通过事件委托完成)
  
  $('.lt_main').on("click", ".lt_size span", function () {
     
  //  console.log(2222)
    $(this).addClass("current").siblings().removeClass("current");
   })
   
   
   //4.添加购物车功能
  
  $("#addCart").click(function () {
    //获取用户选中的尺码和数量
    var size = $('.lt_size span.current').text();
    // alert(size)
    var num = $('.mui-numbox-input').val();
    if (size === null) {
      mui.toast("请选择尺码");
      return;
    }
     
    $.ajax({
      type: "post",
      url: "/cart/addCart",
      data: {
        productId: productId,
        size: size,
        num:num

      },
      dataType: "json",
      success: function (info) {
        console.log(info);

        if (info.error === 400) {
          //当前用户未登录,需要拦截到登录页,登录成功需要返回来
          //登录成功返回来,将当前页面的地址,作为参数,拼接到地址栏
          location.href = "login.html?retUrl=" + location.href;
          return;
        };

        if (info.success) {
          
          //当前用户已登录,正常加入成功
          mui.confirm("添加成功", "温馨提示", ["去购物车","继续浏览"], function (e) {
            if (e.index === 0) {
              location.href = "cart.html";
            } else {
              
              console.log("继续浏览");

            }
          })
        }
      }
      
      })
    })

  })
 



