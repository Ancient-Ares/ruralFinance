export let initial = {
  title: {
    text: '地区贷款统计'
  },
  tooltip: {},
  legend: {
    data: ['贷款数']
  },
  xAxis: {
    data: []
  },
  yAxis: {
    axisLabel: {show: false}
  },
  series: [{
    name: '贷款数',
    type: 'bar',
    data: []
  }]
}

let asyncData = {
  categories: ['姜堰区', '高港区', '泰兴市', '靖江市', '兴化市', '海陵区'],
  data: [5, 20, 36, 10, 10, 20]
}

export let async = {
  xAxis: {
    data: asyncData.categories
  },
  yAxis: {
    axisLabel: {show: true}
  },
  series: [{
    name: '贷款数',
    data: asyncData.data
  }]
}
