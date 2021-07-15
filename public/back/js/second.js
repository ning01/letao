$(function () {
  //一进入页面,发送请求,获取数据进行渲染
  var currentPage = 1;
  var pageSize = 5;
  render();
  //根据current和pageSize请求对应的数据,进行渲染
  function render() {
    
    $.ajax({
      type: "get",
      url: "/category/querySecondCategoryPaging",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: "json",
      success: function (info) {
        console.log(info);

        //根据模板引擎进行渲染
        var htmlStr = template('secondTpl', info);
        $('tbody').html(htmlStr);


        //1进行分页初始化
        $('#paginator').bootstrapPaginator({
          //版本号
          bootstrapMajorVersion: 3,
          //总页数
          totalPages: Math.ceil(info.total / info.size),

          //当前页
          currentPage: info.page,
          //点击事件
          onPageClicked: function (a, b, c, page) {
            // console.log(page);
            //更新当前页
            currentPage = page;
            //重新渲染
            render();
          }
        })
      }
    });
  }
            
          
          
      


  //2.点击添加按钮,显示添加模态框
$('#addBtn').click(function () {
  //显示添加模态框
  $('#addModal').modal("show");


      //发送ajax请求,获取下拉菜单的列表数据(全部的一级分类)
      //通过分页获取一级分类的接口,模拟获取全部数据的接口
      // page=1, pageSize= 100

      $.ajax({
        type: "get",
        url: "/category/queryTopCategoryPaging",
        data: {
          page: 1,
          pageSize:100
        },
        dataType: "json",
        success: function (info) {
          console.log(info);
          //根据模板引擎进行渲染
          var htmlStr1 = template("dropdownTpl", info);
          
          $('.dropdown-menu').html(htmlStr1);
            // console.log(htmlStr1)
        }

      })
    })
            
  //3.给下拉菜单的所有a添加点击事件,通过事件委托注册
  $('.dropdown-menu').on('click', 'a', function () {
                
    //  console.log(111)     
    //获取a的文本
    var txt = $(this).text();
    //将文本设置给按钮
    $('#dropdownText').text(txt);

    //获取id ,设置给准备好的input
    var id = $(this).data("id");
    $('[name="categoryId"]').val(id);
    $('[name="categoryId"]').trigger("input");
  });
  
  //4.进行文件上传初始化
  $('#fileupload').fileupload({
    dataType: "json",
    //表示上传完成的回调函数
    done: function (e, data) {
        console.log(data);
        //后台返回的结果
        var result = data.result;
        //获取文件上传的地址
        var picUrl = result.picAddr;
        //设置给img的src
      $('#imgbox img').attr("src", picUrl);
      //将src路径,实时设置给input
      $('[name="brandLogo"]').val(picUrl);
      // $('[name="brandLogo"]').trigger("input");
      $('#form').data('bootstrapValidator').updateStatus("brandLogo", "VALID");
      
    }
  })

  //5.配置表单校验功能

  $('#form').bootstrapValidator({

    //配置排除项,默认会对隐藏域进行排除,我们需要对隐藏域进行校验

    excluded:[],

    //配置校验图标
    feedbackIcons: {
            valid:'glyphicon glyphicon-ok',
          invalid:'glyphicon glyphicon-remove',
        validating:'glyphicon glyphicon-refresh'
    },
    //校验字段
    fields: {
      
      categoryId: {
        validators: {
          //非空校验
          notEmpty: {
            message:"请选择一级分类"
          }
        }
      },
      brandName: {
        validators: {
        //非空校验
          notEmpty: {
            message:"请输入二级分类名称"
          }
         }
      },
      brandLogo: {
        validators: {
          //非空校验
          notEmpty: {
            message:"请选择图片"
          }
        }
      }
    }
  })

  //注册表单校验成功事件,阻止默认的表单提交,通过ajax提交
  $("#form").on("success.form.bv", function (e) {
    e.preventDefault();//阻止默认的提交
    $.ajax({
      type: "post",
      url: "/category/addSecondCategory",
      data: $("#form").serialize(),
      success: function (info) {
        console.log(info);
        if (info.success) {
          //添加成功,需要关闭模态框
          $("#addModal").modal('hide');
          //重新渲染页面,渲染第一页
          currentPage = 1;
          render();
          
          //完成添加,需要重置内容和状态

          $('#form').data("bootstrapValidator").resetForm(true);

          //由于按钮和图片不是表单内容,需要手动重置
          $('#dropdownText').text("请选择一级分类");
          //图片框重置
          $('#imgbox img').attr("src", "./images/none.png");

        }

      }
    
    })

  })

 })