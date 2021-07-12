$(function () {
    // 基于准备好的dom，初始化echarts实例
  var echarts_left = echarts.init(document.querySelector(".echarts_left"));

  // 指定图表的配置项和数据
  var option1 = {
      title: {
          text: '2021年注册人数'
        },
      tooltip: {
        trigger:"item"  //item默认值
        },
        legend: {
            data:['人数','销量'],
            left: 'center'
      },
      xAxis: {
          data: ["1月","2月","3月","4月","5月","6月"]
      },
      yAxis: {},
      series: [{
          name: '人数',
          type: 'bar',
          data: [225, 1230, 336, 510, 710, 520]
      },{
        name: '销量',
        type: 'bar',
        data: [335, 1620, 736, 910, 810, 620]
    }]
  };

  // 使用刚指定的配置项和数据显示图表。
    echarts_left.setOption(option1);

     // 基于准备好的dom，初始化echarts实例
    var echarts_right = echarts.init(document.querySelector(".echarts_right"));

    // 指定图表的配置项和数据
    var option2 = {
        title: {
            text: '移动手机销售数据',
            subtext: '2021年7月12日',
            left: 'center'
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data:["iphone",'华为','vivo','opo','三星']
        },
        series: [
            {
                name: '访问来源',
                type: 'pie',
                radius: '50%',
                data: [
                    {value: 1048, name: 'iphone'},
                    {value: 1735, name: '华为'},
                    {value: 980, name: 'vivo'},
                    {value: 884, name: 'opo'},
                    {value: 500, name: '三星'}
                ],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    // 使用刚指定的配置项和数据显示图表。
      echarts_right.setOption(option2);
  

 })