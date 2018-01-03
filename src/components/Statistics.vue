<template>
  <div>
    <pageTitle class="getHeader" :title="title"></pageTitle>
    <figure class="statistics1">
      <chart :options="bar" ref="bar" theme="ovilia-green" auto-resize/>
    </figure>
    <template v-if="seconds < 0">
      <!--<p class="btnLoad">-->
        <!--<button @click="load">获取数据</button>-->
      <!--</p>-->
    </template>

    <figure class="statistics2">
      <chart :options="pie" ref="pie" auto-resize/>
    </figure>
  </div>
</template>

<script>
  import ECharts from './common/ECharts.vue'
  import 'echarts/lib/chart/bar'
  import 'echarts/lib/chart/pie'
  import { initial as barInit, async as barAsync } from './data/bar'
  import pie from './data/pie'
  import { c1, c2 } from './data/connect'
  // built-in theme
  import 'echarts/theme/dark'
  // custom theme
  import theme from './data/theme.json'
  ECharts.registerTheme('ovilia-green', theme)

  export default {
    components: {
      chart: ECharts
    },
    data () {
      return {
        title: '贷款统计',
        bar: barInit,
        pie,
        polarTheme: 'dark',
        seconds: -1,
        c1,
        c2,
        connected: false,
        areaDataList: []
      }
    },
    beforeCreate () {
      this.$nextTick(function () {
        this.$vux.loading.show({
          text: 'Loading'
        })
        let userId = window.localStorage.getItem('userId')
        this.$http({
          method: 'get',
          timeout: 10000,
          url: `${this.$root.baseUrl}/finance/app/regulation/getRegulationChartInfo.do`,
          params: {
            userId: userId,
            areaCode: '3212'
          }
        }).then((res) => {
          if (res.data.status === 'true') {
            let data = res.data.data
            this.areaDataList = data
            console.log(this)
            this.$vux.loading.hide()
          } else {
            this.$vux.loading.hide()
            this.$nextTick(function () {
              this.$vux.toast.show({
                text: '请求失败，稍后再试！',
                type: 'text',
                width: '12em',
                position: 'middle'
              })
            })
            return false
          }
        }).catch((e) => {
          this.$vux.loading.hide()
          this.$nextTick(function () {
            this.$vux.toast.show({
              text: '网络错误！',
              type: 'text',
              width: '12em',
              position: 'middle'
            })
          })
          return false
        })
      })
    },
    created () {
      this.$nextTick(function() {
        this.load()
      })
    },
    methods: {
      load () {
        // simulating async data from server
        this.seconds = 1
        let bar = this.$refs.bar
        bar.showLoading({
          text: '正在加载',
          color: '#4ea397',
          maskColor: 'rgba(255, 255, 255, 0.4)'
        })
        let timer = setInterval(() => {
          this.seconds--
          if (this.seconds === 0) {
            clearTimeout(timer)
            bar.hideLoading()
            bar.mergeOptions(barAsync)
          }
        }, 600)
      }
    },
    watch: {},
    mounted () {
      let dataIndex = -1
      let pie = this.$refs.pie
      let dataLen = pie.options.series[0].data.length
      this.connected = true
    }
  }
</script>

<style type="text/less" lang="less" scoped>
  .statistics1, .statistics2 {
    width: 100%;
    padding: 20px 0;
    overflow: hidden;
    & > div {
      width: 100%;
    }
  }

  .btnLoad {
    margin-bottom: 20px;
    button {
      width: 80px;
      height: 30px;
      background: #05a492;
      color: #fff;
      border: none;
      margin: 0 auto;
      display: block;
      border-radius: 6px;
    }

  }
</style>
