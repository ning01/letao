$(function () {
  
  var currentPage = 1;
  var pageSize = 5;
  //1.一进入页面,发送ajax请求,获取数据,进行渲染
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
     
//2.点击添加按钮,显示添加模态框
      $("#addBtn").click(function () {
        //显示添加模态框
        $("#addModal").modal("show");
      })
    //3.表单校验功能
  $("#form").bootstrapValidator({
      
    //配置校验图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
      
    },
    //字段校验
    fields: {
      categoryName: {
        //校验规则{
        validators: {
          //非空
          notEmpty: {
            message: "请输入一级分类"
          }
        }
      }
    }
    
  });

  //4.注册表单校验成功事件,阻止默认的提交,通过ajax提交
  $('#form').on("success.form.bv", function (e) {
        e.preventDefault();
    //通过ajax提交
    $.ajax({
      type: "post",
      url: "/category/addTopCategory",
      data: $('#form').serialize(),
      dataType: "json",
      success: function (info) {
        console.log(info);
        if (info.success) {
          //添加成功
          //关闭模态框
          $('#addModal').modal("hide");
          //重新渲染第一页
          currentPage = 1;
          render();
          //重置表单的内容和状态
          $('#form').data('bootstrapValidator').resetForm(true);
        }

      }

    })
  })
  })
      
