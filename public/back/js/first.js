$(function () {
  
  var currentPage = 1;
  var pageSize = 3;
  //一进入页面,发送ajax请求,获取数据,进行渲染
  render();

  function render() {
    
    $.ajax({
  
      type: "get",
      url: "/category/queryTopCategoryPaging",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: "json",
      success: function (info) {
        console.log(info);
        //结合模板引擎渲染
        var htmlStr = template("firstTpl", info);
        $("tbody").html(htmlStr);
        
        //进行分页初始化
        $("#paginator").bootstrapPaginator({
          //版本号
          bootstrapMajorVersion: 3,
          //总页数
          totalPages: Math.ceil(info.total / info.size),
          //当前页
          currentPage: info.page,
          //点击事件
          onPageClicked: function (a, b, c, page) {

            console.log(page);
            //根据page ,请求对应页的数据,进行渲染
             currentPage = page;
             //调用render重新渲染
             render();
             
          }
          })
        }
      })
    }
  })
     
