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

 
 




})