<template>
  <div class="indexPage">
    <div class="topHeight">
      <header class="header">
        <div class="left" @click="goBack"></div>
        <h1>{{title}}</h1>
      </header>
    </div>
    <div class="titleImg">
      <div class="titleBanner">
        <img src="../assets/banner.png" alt="">
      </div>
    </div>
    <grid :cols="4" class="topItem">
      <grid-item class="gridItem" link="./LoanHelp">
        <img src="../assets/raw1.png" alt="">
        <p>贷款指南</p>
      </grid-item>
      <grid-item class="gridItem" link="./CheckList1">
        <img src="../assets/raw2.png" alt="">
        <p>贷款评估</p>
      </grid-item>
      <grid-item class="gridItem" link="./InfoList">
        <img src="../assets/raw3.png" alt="">
        <p>资料认证</p>
      </grid-item>
      <grid-item class="gridItem" link="./CreditSearch">
        <img src="../assets/raw4.png" alt="">
        <p>征信查询</p>
      </grid-item>
    </grid>
    <div class="middleGrid">
      <a href="javascript:;" @click="routerGo('Loan')">
        <div class="middeTxt">
          <h3>我要贷款</h3>
          <p>解决资金困难</p>
        </div>
        <button>我要贷款</button>
      </a>
      <a href="javascript:;" @click="routerGo('Get')">
        <div class="middeTxt">
          <h3>贷款审批</h3>
          <p>实时监管，控制风险</p>
        </div>
        <button>审批流程</button>
      </a>
    </div>
    <divider class="botLine">到达底部</divider>
  </div>
</template>

<script>
  import { Grid, GridItem, Group, Divider } from 'vux'

  export default {
    data () {
      return {
        title: '惠农金融'
      }
    },
    beforeCreate () {
      this.$nextTick(function () {
        this.$vux.loading.show({
          text: 'Loading'
        })
        let url = window.location.href
        let paraString = url.substring(url.indexOf('?') + 1, url.length).split('&')
        var paraObj = {}
        for (let i = 0; i < 2; i++) {
          paraObj[paraString[i].substring(0, paraString[i].indexOf('=')).toLowerCase()] = paraString[i].substring(paraString[i].indexOf('=') + 1, paraString[i].length)
        }
        let nmwUserId = paraObj.userid
        let orgId = paraObj.orgid
        let local = window.localStorage
        local.clear()
        local.setItem('orgId', orgId)
        local.setItem('nmwUserId', nmwUserId)
        if (!nmwUserId || !orgId) {
          this.$nextTick(function () {
            this.$vux.toast.show({
              text: '请注册农牧旺！',
              type: 'text',
              width: '12em',
              position: 'middle'
            })
          })
          return false
        }
        this.$http({
          method: 'post',
          timeout: 15000,
          url: `${this.$root.baseUrl}/finance/app/home/dataInit.do`,
          params: {
            nmwUserId: nmwUserId,
            orgId: orgId
          }
        }).then((res) => {
          if (res.data.status === 'true') {
            let userId = res.data.data.userId
            let userType = res.data.data.userType
            let userName = res.data.data.userName
            let areaCode = res.data.data.areaCode
            local.setItem('userId', userId)
            local.setItem('userType', userType)
            local.setItem('userName', userName)
            local.setItem('areaCode', areaCode)
            this.$root.initWebSocket()
            this.$vux.loading.hide()
          } else {
            let msg = res.data.msg
            let that = this
            this.$vux.loading.hide()
            this.$nextTick(function () {
              this.$vux.toast.show({
                text: msg,
                type: 'text',
                width: '12em',
                position: 'middle',
                onHide () {
                  that.goBack()
                }
              })
            })
            return false
          }
        }).catch((e) => {
          this.$vux.loading.hide()
          let that = this
          this.$nextTick(function () {
            this.$vux.toast.show({
              text: '网络错误,退出重试！',
              type: 'text',
              width: '12em',
              position: 'middle',
              onHide () {
                that.goBack()
              }
            })
          })
          return false
        })
      })
    },
    created () {
    },
    mounted () {
      var _this = this
      let userId = window.localStorage.getItem('userId')
      window.routerBack = function () {
        // 内页返回
        _this.$router.back()
      }
      window.closeWebSocket = function () {
        _this.$root.websocketclose(userId)
      }
    },
    methods: {
      goBack () {
        var u = navigator.userAgent
        let userId = window.localStorage.getItem('userId')
        if (u.indexOf('iPhone') > -1) {
          this.$root.websocketclose(userId)
          window.webkit.messageHandlers.toback.postMessage(null)
        } else {
          this.$root.websocketclose(userId)
          /* eslint-disable no-undef */
          toback.back()
        }
      },
      routerGo (path) {
        this.$router.push(path)
      }
    },
    components: {
      Grid,
      GridItem,
      Group,
      Divider
    }
  }
</script>

<style type="text/less" lang="less" scoped>
  .indexPage {
    overflow: hidden;
    background: #fff;
  }

  h3, p {
    color: #303030;
  }

  /*header*/
  .topHeight {
    height: 40px;
    width: 100%;
    overflow: hidden;
    position: relative;
  }

  .header {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9;
    height: 40px;
    width: 100%;
    background: #fff;
    border-bottom: 1px solid #eee;
    display: flex;
    .left {
      flex: 0 0 40px;
      height: 40px;
      position: relative;
      &:after {
        content: " ";
        height: 8px;
        width: 8px;
        border-width: 2px 2px 0 0;
        border-color: #42b983;
        border-style: solid;
        -webkit-transform: matrix(-0.71, 0.71, 0.71, 0.71, 0, 0);
        transform: matrix(-0.71, 0.71, 0.71, 0.71, 0, 0);
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -6px;
        margin-left: -6px;
      }
    }
    h1 {
      color: #303030;
      font-size: 17px;
      font-weight: 500;
      line-height: 40px;
      text-align: center;
      box-sizing: border-box;
      flex: 1;
      text-indent: -40px;
    }
  }

  /*banner*/
  .titleImg {
    .titleTop {
      height: 45px;
      line-height: 45px;
      text-align: center;
      img {
        display: inline-block;
        vertical-align: middle;
      }
    }
    .titleBanner {
      overflow: hidden;
      img {
        width: 100%;
        vertical-align: middle;
      }
    }
  }

  /*四宫格*/
  .gridItem {
    text-align: center;
  }

  .weui-grids {
    a {
      height: 110px;
      overflow: hidden;
      img {
        height: 70%;
      }
      p {
        font-size: 13px;
      }
    }
    a:last-child {
      border: none
    }
  }

  .weui-grid:after, .weui-grid:before {
    display: none !important;
  }

  /*中部 4宫格*/
  .middleGrid {
    border-top: 10px solid #eaeeef;
    overflow: hidden;
    a {
      display: block;
      width: 100%;
      height: 120px;
      line-height: 120px;
      border-bottom: 10px solid #eaeeef;
      position: relative;
      .middeTxt {
        padding-left: 20px;
        line-height: 20px;
        h3 {
          padding-top: 30px;
          padding-bottom: 10px;
          font-size: 15px;
        }
        p {
          font-size: 13px;
          color: #808080;
        }
      }
      button {
        position: absolute;
        top: 45px;
        right: 20px;
        height: 30px;
        width: 80px;
        border-radius: 15px;
        border: none;
        outline: none;
        background: #0dcf6e;
        color: #fff;
      }
    }
    a:last-child {
      border: none
    }
  }

  .botLine {
    color: #999;
    padding: 20px 10px;
    background-color: #eaeeef;
  }

</style>
