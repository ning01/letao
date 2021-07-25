//分析功能需求:
// 1.根据搜索历史,进行渲染展示
// 2.清空所有历史
// 3.删除单个历史记录
// 4.添加历史记录

$(function () {
  
  
  // 功能1:根据搜索历史,进行渲染展示
  //(1) 从本地存储中读取历史记录
  //(2)读取出来是JSON字符床,转换成数组
  //(3)通过模板引擎进行渲染


  render();
  //读取本地存储   返回数组
  function getHistory() {

    //读取不存在的item时,返回null,应该进行处理
    var jsonStr = localStorage.getItem("search_list") || '[]';
    //将json字符串转成 数组
    var arr = JSON.parse(jsonStr);
    return arr;
 }

  function render() {
    var arr = getHistory();
    var htmlStr = template("history_tmp", {list:arr});
    $(".lt_history").html(htmlStr);

  }


/*
功能2:清空所有历史
(1)给清空记录添加点击事件(事件委托)
(2)清空所有历史记录
(3)页面重新渲染
*/

  $(".lt_history").on("click", ".btn_empty", function () {

   //mui 确认框
    //参数1:对话框内容
    //参数2:对话框标题
    //参数3:按钮文本(arr)
    //参数4:点击按钮后的回调函数
    mui.confirm("你确定要清空历史记录吗?", "温馨提示", ["取消", "确定"], function ( e) {
      
      // console.log(e.index)
      if (e.index === 1) {
        
        localStorage.removeItem("search_list");
        render();
      }

    })
  })





/*
功能3:删除单个历史记录
(1)通过事件委托给所有删除按钮,添加点击事件
(2)获取需要删除项的下标
(3)根据下标从数组删除该项
(4)将修改后的数组,转成jsonstr,存储到本地
(5)重新渲染

*/
  $(".lt_history").on("click", ".btn_delete", function () {


     //获取下标
    var index = $(this).data("index");
    //获取本地存储的数组
    var arr = getHistory();

    arr.splice(index, 1);
    localStorage.setItem("search_list", JSON.stringify(arr));
    //页面重新渲染
    render();

  })


  // 功能4:添加单个历史记录功能
  // (1)给搜索按钮添加点击事件
  // (2)获取搜索框的内容
  //(3)添加到数组的最前面
  //(4)转成jsonStr,存储到本地存储中
  //(5)更新渲染

  $(".btn_search").on("click", function () {
    //获取搜索框内容
    var key = $(".input_search").val().trim();

    //添加一个消息提示框
    if (key ==="") {
      mui.toast("请输入搜索关键字");
      return;
    }
    
    //获取数组,添加到数组前面
    var arr = getHistory();

    // 排重
    //如果有重复的,需要先删掉重复的,后面的添加到最前面
    //indexOf(k )返回元素k在数组中第一次出现的索引值,如果不存在此元素则返回固定索引值-1;
    var index = arr.indexOf(key);
    if (index != -1) {
      //说明有重复,要删除
      arr.splice(index, 1);
    }
    if (arr.length >= 10) {
      arr.pop();
    }
    // console.log(arr);
    //添加到数组的最前面
    arr.unshift(key);

    //转成jsonstr字符串,存储到本地存储中
    localStorage.setItem("search_list", JSON.stringify(arr));
    //重新渲染页面
    render();
   //清空搜索框的内容
    $('.input_search').val("");
    //跳转到搜索列表
    location.href = "searchList.html?key="+key;

  })

      

})










