// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// licensed by Ancient-Ares
// Github: https://github.com/Ancient-Ares
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import Icon from 'vue-svg-icon/Icon.vue'
import pageTitle from './components/common/Header'
import { AjaxPlugin, LoadingPlugin, ToastPlugin, ConfirmPlugin } from 'vux'
import { baseUrl, wsUrl } from './utils/global/baseUrl'

require('es6-promise').polyfill()
Vue.component('icon', Icon)
Vue.component('pageTitle', pageTitle)
Vue.use(VueRouter)
Vue.use(AjaxPlugin)
Vue.use(LoadingPlugin)
Vue.use(ToastPlugin)
Vue.use(ConfirmPlugin)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: resolve => require(['./components/Home.vue'], resolve)
  },
  // {
  //   path: '/News',
  //   name: 'News',
  //   component: resolve => require(['./components/News.vue'], resolve)
  // },
  {
    path: '/Service',
    name: 'Service',
    component: resolve => require(['./components/Service.vue'], resolve)
  },
  {
    path: '/Center',
    name: 'Center',
    component: resolve => require(['./components/Center.vue'], resolve)
  },
  // {
  //   path: '/Pull',
  //   name: 'Pull',
  //   component: resolve => require(['./components/Pull.vue'], resolve)
  // },
  {
    path: '/Get',
    name: 'Get',
    component: resolve => require(['./components/Get.vue'], resolve)
  },
  {
    path: '/getDetail',
    name: 'getDetail',
    component: resolve => require(['./components/getDetail.vue'], resolve)
  },
  {
    path: '/CreditSearch',
    name: 'CreditSearch',
    component: resolve => require(['./components/CreditSearch.vue'], resolve)
  },
  // {
  //   path: '/Revenue',
  //   name: 'Revenue',
  //   component: resolve => require(['./components/Revenue.vue'], resolve)
  // },
  // {
  //   path: '/Revenue2',
  //   name: 'Revenue2',
  //   component: resolve => require(['./components/Revenue2.vue'], resolve)
  // },
  // {
  //   path: '/Revenue2/checkDetail',
  //   name: 'checkDetail',
  //   component: resolve => require(['./components/common/checkDetail.vue'], resolve)
  // },
  // {
  //   path: '/Revenue3',
  //   name: 'Revenue3',
  //   component: resolve => require(['./components/Revenue3.vue'], resolve)
  // },
  // {
  //   path: '/RevenueDetail',
  //   name: 'RevenueDetail',
  //   component: resolve => require(['./components/RevenueDetail.vue'], resolve)
  // },
  {
    path: '/Loan',
    name: 'Loan',
    component: resolve => require(['./components/Loan.vue'], resolve)
  },
  {
    path: '/Loan2',
    name: 'Loan2',
    component: resolve => require(['./components/Loan2.vue'], resolve)
  },
  {
    path: '/Loan3',
    name: 'Loan3',
    component: resolve => require(['./components/Loan3.vue'], resolve)
  },
  {
    path: '/approve',
    name: 'approve',
    component: resolve => require(['./components/firstApprove.vue'], resolve)
  },
  {
    path: '/PersonInfo',
    name: 'PersonInfo',
    component: resolve => require(['./components/PersonInfo.vue'], resolve)
  },
  {
    path: '/Credit',
    name: 'Credit',
    component: resolve => require(['./components/Credit.vue'], resolve)
  },
  {
    path: '/Camera',
    name: 'Camera',
    component: resolve => require(['./components/Camera.vue'], resolve)
  },
  {
    path: '/SignList',
    name: 'SignList',
    component: resolve => require(['./components/SignList.vue'], resolve)
  },
  {
    path: '/InfoList',
    name: 'InfoList',
    component: resolve => require(['./components/InfoList.vue'], resolve)
  },
  {
    path: '/PerAuth',
    name: 'PerAuth',
    component: resolve => require(['./components/PerAuth.vue'], resolve)
  },
  {
    path: '/Production',
    name: 'Production',
    component: resolve => require(['./components/Production.vue'], resolve)
  },
  {
    path: '/Farm',
    name: 'Farm',
    component: resolve => require(['./components/Farm.vue'], resolve)
  },
  {
    path: '/Contract',
    name: 'Contract',
    component: resolve => require(['./components/Contract.vue'], resolve)
  },
  {
    path: '/ContractDetail',
    name: 'ContractDetail',
    component: resolve => require(['./components/ContractDetail.vue'], resolve)
  },
  {
    path: '/BusLicense',
    name: 'BusLicense',
    component: resolve => require(['./components/BusLicense.vue'], resolve)
  },
  {
    path: '/IdCard',
    name: 'IdCard',
    component: resolve => require(['./components/IdCard.vue'], resolve)
  },
  {
    path: '/OneCardList',
    name: 'OneCardList',
    component: resolve => require(['./components/OneCardList.vue'], resolve)
  },
  {
    path: '/OneCard',
    name: 'OneCard',
    component: resolve => require(['./components/OneCard.vue'], resolve)
  },
  {
    path: '/firstApprove',
    name: 'firstApprove',
    component: resolve => require(['./components/firstApprove.vue'], resolve)
  },
  {
    path: '/secondApprove',
    name: 'secondApprove',
    component: resolve => require(['./components/secondApprove.vue'], resolve)
  },
  {
    path: '/guarantee',
    name: 'guarantee',
    component: resolve => require(['./components/guarantee.vue'], resolve)
  },
  {
    path: '/bankLoan',
    name: 'bankLoan',
    component: resolve => require(['./components/bankLoan.vue'], resolve)
  },
  {
    path: '/Message',
    name: 'Message',
    component: resolve => require(['./components/Message.vue'], resolve)
  },
  {
    path: '/MsgDetail',
    name: 'MsgDetail',
    component: resolve => require(['./components/MsgDetail.vue'], resolve)
  },
  {
    path: '/LoanRecord',
    name: 'LoanRecord',
    component: resolve => require(['./components/LoanRecord.vue'], resolve)
  },
  {
    path: '/ApprovalRecord',
    name: 'ApprovalRecord',
    component: resolve => require(['./components/ApprovalRecord.vue'], resolve)
  },
  {
    path: '/GovRegulation',
    name: 'GovRegulation',
    component: resolve => require(['./components/GovRegulation.vue'], resolve)
  },
  {
    path: '/CreditRecord',
    name: 'CreditRecord',
    component: resolve => require(['./components/CreditRecord.vue'], resolve)
  },
  {
    path: '/BlackRecord',
    name: 'BlackRecord',
    component: resolve => require(['./components/BlackRecord.vue'], resolve)
  },
  {
    path: '/Statistics',
    name: 'Statistics',
    component: resolve => require(['./components/Statistics.vue'], resolve)
  },
  {
    path: '/LoanHelp',
    name: 'LoanHelp',
    component: resolve => require(['./components/LoanHelp.vue'], resolve)
  },
  {
    path: '/CheckList1',
    name: 'CheckList1',
    component: resolve => require(['./components/CheckList1.vue'], resolve)
  },
  {
    path: '/CheckList2',
    name: 'CheckList2',
    component: resolve => require(['./components/CheckList2.vue'], resolve)
  },
  {
    path: '/CheckList3',
    name: 'CheckList3',
    component: resolve => require(['./components/CheckList3.vue'], resolve)
  },
  {
    path: '/CheckList4',
    name: 'CheckList4',
    component: resolve => require(['./components/CheckList4.vue'], resolve)
  },
  {
    path: '/CheckList5',
    name: 'CheckList5',
    component: resolve => require(['./components/CheckList5.vue'], resolve)
  }
]

const router = new VueRouter({
  // mode: 'history',
  routes: routes,
  linkActiveClass: 'active'
})

FastClick.attach(document.body)

Vue.config.productionTip = true

/* eslint-disable no-new */
const newVue = new Vue({
  data: {
    baseUrl: baseUrl,
    websock: null,
    websockList: []
  },
  methods: {
    threadPoxi () {  // 实际调用的方法
      // 参数
      let userId = window.localStorage.getItem('userId')
      // 若是ws开启状态
      if (this.websock.readyState === 1) {
        this.websocketsend(userId)
      } else if (this.websock.readyState === 0) {
        let that = this
        setTimeout(function () {
          that.websocketsend(userId)
        }, 300)
      } else {
        this.initWebSocket()
        let that = this
        setTimeout(function () {
          that.websocketsend(userId)
        }, 500)
      }
    },
    initWebSocket () { // 初始化weosocket
      // ws地址
      let userId = window.localStorage.getItem('userId')
      const wsuri = wsUrl
      this.websock = new WebSocket(wsuri + userId)
      this.websock.onmessage = this.websocketonmessage
      this.websock.onclose = this.websocketclose
    },
    websocketonmessage (e) { // 数据接收
      this.websockList.push(e.data)
      if (e.data) {
        this.$children[0].checkBadge = true
      }
    },
    websocketsend (agentData) { // 数据发送
      this.websock.send(agentData)
    },
    websocketclose (e) {  // 关闭
      this.websock.close()
      console.log('WebSockt has been closed')
    }
  },
  created () {
  },
  router: router,
  render: h => h(App)
}).$mount('#app-box')

// page-in-out direction & global loadding
const history = window.sessionStorage
history.clear()
let historyCount = history.getItem('count') * 1 || 0
let local = window.localStorage
let orgIdStr = local.getItem('orgId')
let nmwUserId = local.getItem('nmwUserId')
let fullPathStr = `/?userId=${nmwUserId}&orgId=${orgIdStr}`
history.setItem(fullPathStr, 0)

router.beforeEach(function (to, from, next) {
  newVue.$vux.loading.show({
    text: 'Loading'
  })
  const toIndex = history.getItem(to.path)
  const fromIndex = history.getItem(from.path)
  if (toIndex) {
    if (!fromIndex || parseFloat(toIndex) > parseFloat(fromIndex) || (toIndex === '0' && fromIndex === '0')) {
      newVue.$router.direction = 'forward'
    } else {
      newVue.$router.direction = 'reserve'
    }
  } else {
    ++historyCount
    history.setItem('count', historyCount)
    to.path !== fullPathStr && history.setItem(to.path, historyCount)
    newVue.$router.direction = 'forward'
  }
  next()
})
router.afterEach(function (to) {
  newVue.$vux.loading.hide()
})
