$(function () {
  var currentPage = 1;
  var pageSize = 5;
  render();

  function render() {
      
    $.ajax({
      type: "get",
      url: "/user/queryUser",
      data: {
        page: currentPage,
        pageSize:pageSize
      },
      dataType: "json",
      success: function (info) {
        console.log(info);
        //生成htmlstr,将来进行渲染
        //参数1:模板id,参数2:数据对象
        //在模板中,可以直接访问传进去对象中的所有属性
        var htmlStr = template("tmp", info);
        $("tbody").html(htmlStr);




        
        
        //进行分页初始化
        $("#paginator").bootstrapPaginator({
          //版本号
          bootstrapMajorVersion: 3,
          //总页数
          totalPages: Math.ceil( info.total / info.size),
          //当前页
          currentPage: info.page,
          
          //点击事件
          onPageClicked: function (a, b, c, page) {
            
            
            // console.log(page);
            //根据page ,请求对应页的数据,进行渲染
            currentPage = page;
    
            //调用render()重新渲染
            render();
        
                
            }
          })

        }
      })  
    }
  })

        
        
    


