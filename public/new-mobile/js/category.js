
//入口函数
$(function () {
  //1.一进入页面,请求左侧一级分类
  $.ajax({
    type: "get",
    url: "/category/queryTopCategory",
    dataType: "json",
    success: function (info) {
      console.log(info);
      var htmlStr = template("left_tmp", info);
      $(".category_left ul").html(htmlStr);
      //根据返回的第一个一级分类的id 进行渲染
        renderById(info.rows[0].id);
      
    }
      
  })
      
      //2.给左侧添加点击事件,通过事件委托
      $('.category_left').on("click", "a", function(){
        $(this).addClass("current").parent().siblings().find("a").removeClass("current");
        //获取一级分类的id
        var id = $(this).data("id");
        //根据Id渲染二级分类
        renderById(id);

      })
        //根据一级分类的id渲染二级分类
      function renderById( id) {
        $.ajax({

          type: "get",
          url: "/category/querySecondCategory",
          data: {
            id: id
          },
          dataType: "json",
          success: function (info) {
            console.log(info);

            var htmlStr = template("right_tmp", info);
            $(".category_right ul").html(htmlStr);
          }

        })

      }

  })
  




    


   





