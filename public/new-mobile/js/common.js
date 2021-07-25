
mui('.mui-scroll-wrapper').scroll({
  deceleration: 0.0005 ,//flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
  indicators: false, //是否显示滚动条
});

//此方法专用于解析获取地址栏参数

function getSearch(k) {
  
  //获取地址栏参数信息
  var str = location.search; //获取的编码字符串
  //对中文解码
  str = decodeURI(str);
  //去掉?号
  str = str.slice(1);
  //str.split(符号),将字符通过"符号"切割成数组
  var arr = str.split("&");
  var obj = {};
  //遍历数组,取得键值对
  arr.forEach(function (v, i) {
    var key = v.split("=")[0];
    var value = v.split("=")[1];
     obj[key] = value;
  })

    return obj[k];
}