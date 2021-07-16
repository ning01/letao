

$(function () {
  
  var currentPage = 1;
  var pageSize = 3;
  var picArr = [];//用于存储所有上传的图片

  //一进入页面,发送请求,渲染页面
  render();
  function render() {
    
    $.ajax({
      type: "get",
      url: "/product/queryProductDetailList",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: "json",
      success: function (info) {
        console.log(info);

        //生成htmlstr,进行动态渲染
        var htmlStr = template("productTpl", info);
        //设置给tbody
        $("tbody").html(htmlStr);

        //1.进行页面初始化
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion: 3,
          totalPages: Math.ceil(info.total / info.size),  //总页数
          currentPage: info.page,

          //点击事件
          onPageClicked: function (a, b, c, page) {
            
            //更新当前页
            currentPage = page;
            //重新渲染
            render();
          }
          
        })

        //2.点击添加按钮,显示添加模态框

        $('#addBtn').click(function () {
          
          $('#addModal').modal('show');

          //发送ajax请求,请求所有的二级分类数据,进行渲染

          $.ajax({

            type: "get",
            url: "/category/querySecondCategoryPaging",
            data: {
              page: 1,
              pageSize: 100
            },
            dataType: "json",
            success: function (info) {
              console.log(info);

              //生成htmlstr,渲染到页面
              var htmlStr = template("dropdownTpl", info);
              $('.dropdown-menu').html(htmlStr);
            }
          })


        })


        //3.通过事件委托,给dropdown里面所有的a添加点击事件

        $('.dropdown-menu').on("click", "a", function () {
          // console.log(111)
          //获取文本,设置给按钮

          var txt = $(this).text();
          $('#dropdownText').text(txt);

          //获取id,设置给隐藏域
          var id = $(this).data("id");
          $('[name="brandId"]').val(id);

          $('[name="brandId"]').trigger("input");
        })

        //4.进行文件上传配置(多文件上传设置multiple)
        $('#fileupload').fileupload({
          dataType: "json",
          //文件上传完成的回调函数done
          done: function (e, data) {
            console.log(data);
            // console.log(e)

            //后台返回的结果 (图片名称/图片地址)

            var picObj = data.result
            //去除图片地址
            var picUrl = picObj.picAddr;

            //往数组的最前面追加
            picArr.unshift(picObj);

            //结构上往最前面追加
            $('#imgbox').prepend('<img width="100" id="" src="' + picUrl + '" alt="" />');
            if (picArr.length > 3) {
              
              //将最前的保留,将最后面移除
              //移除数组最后面一位
              picArr.pop();

              //移除结构中最后一位,找到图片类型中最后一个元素,进行删除,让他自杀
              $('#imgbox img:last-of-type').remove();
            }
            
            if (picArr.length === 3) {
              //说明图片上传满3张了,picStatus的状态更新成VALID
              $("#form").data("bootstrapValidator").updateStatus("picStatus", "VALID")
            }
              
            
          }

        });

        // 5.进行表单校验初始化

        $('#form').bootstrapValidator({
          //(1)配置排除项,默认会对隐藏域进行排除,我们要对隐藏域进行校验
    
          excluded: [],
          //(2)配置校验图标
          feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',  //校验成功
            invalid: 'glyphicon glyphicon-remove',//校验失败
            validating: 'glyphicon glyphicon-refresh' //校验中
          },
          //(3)字段校验
          fields: {
            //字段名称
            brandId: {
              //校验规则
              validators: {
                //非空校验
                notEmpty: {
                  message: "请选择二级分类"
                }
              }
            },
            

            //字段名称
            proName: {
              //校验规则
              validators: {
                //非空校验
                notEmpty: {
                  message: "请输入商品名称"
                }
              }
            },
            
            //字段名称
            proDesc: {
              //校验规则
              validators: {
                //非空校验
                notEmpty: {
                  message: "请输入商品描述"
                }

              }
            },
              
            //字段名称
            num: {
              //校验规则
              validators: {
                //非空校验
                notEmpty: {
                  message: "请输入商品库存"
                },
            
                regexp: {
                  //正则校验 非零开头的数字
                  regexp: /^[1-9]\d* $/,
                  message: "请输入非零开始的数字"
                }
              }
            },
                  
            size: {
              //校验规则
              validators: {
                //非空校验
                notEmpty: {
                  message: "请输入商品尺码"
                },
                regexp: {
                  //xx-xx的格式,xx两位数字
                  regexp: /^\d{2}-\d{2}$/,
                  message: "必须是xx-xx的格式,xx两位数字"
                }
              }
            },
                    
  
                
            oldPrice: {
              validators: {
                notEmpty: {
                  message: "请输入商品原价"
                }
                
              }
            },
              

            price: {
              validators: {
                notEmpty: {
                  message: "请输入商品价格"
                }
              }
            },
            picStatus: {
              validators: {
                notEmpty: {
                  message: "请上传3张图片"
                }
              }
            }
          },
  
        })


        //6.注册表单验证成功事件,阻止默认的提交,通过ajax提交

        $('#form').on("success.form.bv", function (e) {
          
          e.preventDefault();
          var params = $('#form').serialize();//获取input中的数据
          // console.log(picArr)
          //还要加上图片的数据
          //params += "&picName1=xx &picAddr1=xx"
          params += "&picName1='+ picArr[0].picName+' & picAddr1=" + picArr[0].picAddr;
          params += "&picName2='+ picArr[1].picName+' & picAddr2=" + picArr[1].picAddr;
          params += "&picName3='+ picArr[2].picName+' & picAddr3=" + picArr[2].picAddr;


          $.ajax({
            type:"post",
            url: "/product/addProduct",
            data: params,
            dataType: "json",
            success: function (info) {
              console.log(info);
              if (info.success) { }
            //关闭模态框
              $('#addModal').modal("hide");
              //重新渲染第一页
              currentPage = 1;
              render();
              //重置内容和状态
              $('#form').data("bootstrapValidator").resetForm(true);
              //重置下拉按钮和图片
              $('#dropdownText').text("请选择的二级分类");
              $('#imgbox img').remove();
              //清空数组
              picArr = [];
            }
          })
          
        })
      }
    
    })
  
  }
        
})



      




    
