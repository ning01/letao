$(function () {
  //根据封装的方法获取地址栏关键字
  var key = getSearch("key");
  // console.log(key)
  //1.搜索关键字赋值给input
  $('.input_search').val(key);
   console.log($('.input_search').val())
  
  //2.一进入页面,需要根据搜索关键字,请求关键的搜索数据,进行页面渲染
   render();
  
  //3.点击搜索按钮,根据搜索关键字进行页面渲染
  $(".btn_search").click (function () {
    
    render();
    
  })
  

  //4.给排序按钮添加点击效果
  //(1)如果自己没有current类,加上current,
  //(2)如果有current类,改变箭头的方向
  //应该排序完成重新渲染页面b
  $(".lt_sort a[data-type]").click(function () {
    // alert(222)
    if ($(this).hasClass("current")) {
    //有current类,切换箭头方向 fa-angle-up 上, fa-angle-down下
      $(this).find('i').toggleClass("fa-angle-up").toggleClass("fa-angle-down");
      
      
    } else {

    //没有current类,给自己加上current类,还要排他
      $(this).addClass("current").siblings().removeClass("current");
    }
    
    render();
  })

    function render() {
        //每次请求渲染前先显示loading 中的效果
      $(".lt_product").html(' <div class="loading">loading...</div>');
     
      //所有用于请求的参数
      var params = {};
      //下面三个是必选参数
      params.proName = $('.input_search').val();
      params.page = 1;
      params.pageSize = 100;
      //还有2个额外的可选参数
      //(1)通过判断有没有current 的a,来决定要不要传参
      //(2)通过判断箭头方向,决定升序还是降序排列, 1 升序,2降序
      var $current = $(".lt_sort a.current");
      if ($current.length === 1) {
        //需要排序
        var sortName = $current.data("type");
        var sortValue = $current.find("i").hasClass("fa-angle-down") ? 2 : 1;
          // console.log(sortName +":"+ sortValue)
          params[sortName] = sortValue;
        }
      //模拟网络延迟  
      setTimeout(function () {
              
          $.ajax({
            type: "get",
            url: "/product/queryProduct",
            data: params,  //动态获取搜索框的value的值
            datatype:"json",
            success: function (info) {
              console.log(info);
              var htmlStr = template("product_tmp", info);
            
              $(".lt_product").html(htmlStr);
            }

        })

      },1000)
          
  }
})

      
          




        
             
           
              
        