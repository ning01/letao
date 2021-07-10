//需求:进行表单校验
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
          }
        }
      }
    }

  })
})