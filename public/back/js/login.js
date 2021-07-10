//需求1:进行表单校验
//入口函数
$(function () {
  //1.进行表单校验配置
  //校验要求:
  //(1)用户名不能为空,长度为2-6位
  //(2)密码不能为空,密码长度为6-12位
  //获取表单  使用插件方法  js里面不能用-符号,用驼峰命名
  $('#form').bootstrapValidator({
      //2. 指定校验时的图标显示，默认是bootstrap风格
  feedbackIcons: {
    valid: 'glyphicon glyphicon-ok',
    invalid: 'glyphicon glyphicon-remove',
    validating: 'glyphicon glyphicon-refresh'
  },
    //配置字段    在input里面配置name
    //校验字段
    fields: {
      
      username: {
        //进行多个规则配置
        validators: {
          //费控校验
          notEmpty: {
            //校验提示
            message: "用户名不能为空"
            
          },
          //长度校验
          stringLength: {
            min: 2,
            max: 6,
            message: "用户名长度必须是2-6位"
            
          },
          //配置回调函数的提示信息
          callback: {
            message: "用户名不存在"
          },
          //正则校验
          regexp: {
            regexp: /^[a-zA-Z0-9_\.]+$/,
            message:"用户名由数字字母下划线和.组成"
            
          }
        }
      },
      password: {
        validators: {
          notEmpty: {
            message:"密码不能为空"
          },
          //长度校验
          stringLength: {
            min: 6,
            max: 12,
            message:"密码长度必须是6-12位"
          },
          //配置回调函数的提示信息
          callback: {
            message: "密码错误"
          },
        }
      }
    }

  })
  //2.表单校验需要在表单提交时,进行校验,需要submit按钮
  // 可以注册一个表单校验成功事件,表单校验陈功之后,默认会提交
  //可以在成功事件中,阻止默认的表单提交,通过ajax提交,就不会跳转了
  //思路:
  //1.注册表单校验事件,
  //2.在事件中,阻止默认的表单提交,通过ajax提交接口
  $("#form").on("success.form.bv", function (e) {
    e.preventDefault();
    // console.log("校验通过,通过ajax提交")
    //通过ajax提交
    $.ajax({
      type: "post",
      url: "/employee/employeeLogin",
      data: $("#form").serialize(),
      dataType: "json",
      success: function (info) {
        console.log(info);
        if (info.success) {
          location.href = "index.html";
        }
        if (info.error === 1000) {
          // alert("用户名不存在");

          //调用插件提供的方法,将用户名input状态更新成校验失败状态
          //插件 updatestatus
          $("#form").data("bootstrapValidator").updateStatus("username", "INVALID", "callback");
        }
        if (info.error === 1001) {
          // alert("密码错误");
          $("#form").data("bootstrapValidator").updateStatus("password", "INVALID", "callback");
        }
      }
   })
  })
  //重置按钮
  $('[type="reset"]').click(function () {
    //不传参只重置状态
    $("#form").data("bootstrapValidator").resetForm();
  })
})