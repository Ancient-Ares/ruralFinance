export default {
  title: {
    text: '产业类型统计',
    x: 'center'
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)'
  },
  legend: {
    orient: 'vertical',
    left: 'left',
    data: ['畜牧养殖', '粮食生产', '蔬菜园艺', '水产养殖']
  },
  series: [
    {
      name: '数据占比',
      type: 'pie',
      radius: '55%',
      center: ['50%', '60%'],
      data: [
        {value: 565, name: '畜牧养殖'},
        {value: 1310, name: '粮食生产'},
        {value: 800, name: '蔬菜园艺'},
        {value: 205, name: '水产养殖'}
      ],
      itemStyle: {
        emphasis: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
}
