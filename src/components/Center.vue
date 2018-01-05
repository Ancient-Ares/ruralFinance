<template>
  <div>
    <div class="container padT">
      <pageTitle :title="title"></pageTitle>
      <div class="centerBar clearfix">
        <div class="topBox">
          <div class="info">
            <div class="avatar">{{info.name.length > 2 ? info.name.substring(1, 3) : info.name}}</div>
            <div class="text">
              <p class="name">{{info.name}}</p>
              <p class="address">{{info.address}}</p>
            </div>
          </div>
        </div>
        <div v-if="checkType" class="botBox clearfix">
          <div class="left">
            <div class="loan">
              <p>贷款金额（元）</p>
              <div class="toggleBox" v-show="show" @click="toggleShow">
                <icon slot="icon" name="show" scale="2"></icon>
              </div>
              <div class="toggleBox" v-show="!show" @click="toggleShow">
                <icon slot="icon" name="hidden" scale="2"></icon>
              </div>
            </div>
            <div class="money">
              <p v-show="show">{{info.money}}</p>
              <p v-show="!show">****</p>
            </div>
          </div>
          <div class="right">
            <a @click="nextRouter('Loan')" href="javascript:;">
              <icon slot="icon" name="bill" scale="2"></icon>
              <span>贷款</span>
            </a>
            <a @click="nextRouter('Repayment')" href="javascript:;">
              <icon slot="icon" name="repay" scale="2"></icon>
              <span>还款</span>
            </a>
          </div>
        </div>
      </div>
      <div class="cell">
        <div class="firstCell">
          <a v-if="checkType" class="cellItem" @click="nextRouter('LoanRecord')" href="javascript:;">
            <img src="../assets/centerTop1.png">
            <span>贷款记录</span>
            <icon slot="icon" name="right" scale="2"></icon>
          </a>
          <a v-if="!checkType" class="cellItem" @click="nextRouter('ApprovalRecord')" href="javascript:;">
            <img src="../assets/centerTop1.png">
            <span>审批记录</span>
            <icon slot="icon" name="right" scale="2"></icon>
          </a>
          <a v-if="!checkType" class="cellItem" @click="nextRouter('GovRegulation')" href="javascript:;">
            <img src="../assets/centerTop2.png">
            <span>政府监管</span>
            <icon slot="icon" name="right" scale="2"></icon>
          </a>
        </div>
        <div class="secondCell">
          <a class="cellItem" @click="nextRouter('Credit')" href="javascript:;">
            <img src="../assets/center1.png">
            <span>我的信用分</span>
            <icon slot="icon" name="right" scale="2"></icon>
            <b :class="{'green':creditScore>500}">{{creditScore}}</b>
          </a>
          <a class="cellItem" @click="nextRouter('PerAuth')" href="javascript:;">
            <img src="../assets/center2.png">
            <span>个人信息</span>
            <icon slot="icon" name="right" scale="2"></icon>
            <b class="green" v-if="allCredit.isAuthForPersonalInfo">已认证</b>
            <b class="gray" v-else>未认证</b>
          </a>
          <a class="cellItem" @click="nextRouter('Production')" href="javascript:;">
            <img src="../assets/center3.png">
            <span>生产信息</span>
            <icon slot="icon" name="right" scale="2"></icon>
            <b class="green" v-if="allCredit.isAuthForProductionInfo">已认证</b>
            <b class="gray" v-else>未认证</b>
          </a>
          <a class="cellItem" @click="nextRouter('IdCard')" href="javascript:;">
            <img src="../assets/center4.png">
            <span>身份证</span>
            <icon slot="icon" name="right" scale="2"></icon>
            <b class="green" v-if="allCredit.isAuthForSfzCard">已认证</b>
            <b class="gray" v-else>未认证</b>
          </a>
          <a class="cellItem" @click="nextRouter('OneCardList')" href="javascript:;">
            <img src="../assets/center5.png">
            <span>一卡通</span>
            <icon slot="icon" name="right" scale="2"></icon>
            <b class="green" v-if="allCredit.isAuthForBankCard">已认证</b>
            <b class="gray" v-else>未认证</b>
          </a>
          <a class="cellItem" @click="doAuth" href="javascript:;">
            <img src="../assets/center5.png">
            <span>实人认证</span>
            <icon slot="icon" name="right" scale="2"></icon>
            <b class="green" v-if="allCredit.isAuthForBankCard">已认证</b>
            <b class="gray" v-else>未认证</b>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { Grid, GridItem } from 'vux'

  export default {
    data () {
      return {
        title: '个人中心',
        info: {
          name: '未知',
          avatar: '',
          address: '',
          money: 0.00
        },
        creditScore: 0,
        show: true,
        checkType: false,
        allCredit: []
      }
    },
    computed: {},
    beforeCreate () {
      // 个人中心
      this.$nextTick(function () {
        this.creditScore = 600
        this.$vux.loading.show({
          text: 'Loading'
        })
        let local = window.localStorage
        let userId = local.getItem('userId')
        let userType = parseFloat(local.getItem('userType'))
        if (userType === 1) {
          this.checkType = true
        } else {
          this.checkType = false
        }
        this.$http({
          method: 'get',
          timeout: 10000,
          url: `${this.$root.baseUrl}/finance/app/personal/getPersonalCenterInfo.do`,
          params: {
            userId: userId
          }
        })
          .then((res) => {
            if (res.data.status === 'true') {
              let data = res.data.data
              this.info.name = data.userName
              this.info.address = data.orgName
              this.info.money = this.formatNumber(data.userTotalFinanceMoney)
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
          })
          .catch((e) => {
            this.$vux.loading.hide()
            this.$vux.toast.show({
              text: '请求失败,请稍后再试！',
              type: 'text',
              width: '12em',
              position: 'middle'
            })
          })
      })
      // 验证授信资料
      this.$nextTick(function () {
        this.creditScore = 600
        this.$vux.loading.show({
          text: 'Loading'
        })
        let local = window.localStorage
        let userId = local.getItem('userId')
        this.$http({
          method: 'get',
          timeout: 10000,
          url: `${this.$root.baseUrl}/finance/app/certification/verifyCreditInfo.do`,
          params: {
            userId: userId
          }
        })
          .then((res) => {
            if (res.data.status === 'true') {
              let data = res.data.data
              this.allCredit = data
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
          })
          .catch((e) => {
            this.$vux.loading.hide()
            this.$vux.toast.show({
              text: '请求失败,请稍后再试！',
              type: 'text',
              width: '12em',
              position: 'middle'
            })
          })
      })
    },
    methods: {
      toggleShow () {
        this.show = !this.show
      },
      formatNumber (num) {
        num = num.toFixed(2)
        num += ''
        var x = num.split('.')
        var x1 = x[0]
        var x2 = x.length > 1 ? ('.' + x[1]) : ''
        var x3
        if (num) {
          x3 = ''
          for (var i = 0, l = x1.length; i < l; ++i) {
            if (i !== 0 && ((i % 3) === 0)) {
              x3 = ',' + x3
            }
            x3 = x1[l - i - 1] + x3
          }
          x1 = x3
        }
        return x1 + x2
      },
      doAuth () {
        this.$nextTick(function () {
          this.creditScore = 600
          this.$vux.loading.show({
            text: 'Loading'
          })
          let local = window.localStorage
          let userId = local.getItem('userId')
          this.$http({
            method: 'get',
            timeout: 10000,
            url: `${this.$root.baseUrl}/finance/app/aliyun/getCloudAuthVerifyToken.do`,
            params: {
              userId: userId
            }
          })
            .then((res) => {
              if (res.data.status === 'true') {
                let data = res.data.data
                let token = data.token
                let u = navigator.userAgent
                if (u.indexOf('iPhone') > -1) {
                  window.webkit.messageHandlers.toAuthCenter.postMessage(null)
                } else {
                  /* eslint-disable no-undef */
                  toback.toAuth(token)
                }
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
            })
            .catch((e) => {
              this.$vux.loading.hide()
              this.$vux.toast.show({
                text: '请求失败,请稍后再试！',
                type: 'text',
                width: '12em',
                position: 'middle'
              })
            })
        })
      },
      nextRouter (path) {
        this.$router.push(path)
      }
    },
    components: {
      Grid,
      GridItem
    }
  }
</script>
<style scoped lang="less" type="text/less">
  .container {
    overflow: hidden;
    .centerBar {
      background: transparent linear-gradient(to right, rgb(51, 212, 116) 0px, rgb(26, 192, 168) 100%) repeat scroll 0% 0%;
    }
  }

  .topBox {
    padding: 20px 20px;
    .info {
      height: 60px;
      width: 100%;
      display: flex;
      .avatar {
        border-radius: 50%;
        height: 45px;
        width: 45px;
        line-height: 45px;
        text-align: center;
        overflow: hidden;
        color: #32d377;
        background-color: #fff;
        overflow: hidden;
      }
      .text {
        flex: 1;
        margin-left: 10px;
        overflow: hidden;
        .name {
          color: #fff;
          font-size: 15px
        }
        .address {
          color: #fff;
          font-size: 14px
        }
      }
    }
  }

  .botBox {
    padding: 0 10px 20px;
    .left {
      float: left;
      padding-left: 10px;
      .loan {
        width: 100%;
        height: 35px;
        p {
          color: #fff;
          font-size: 16px;
          float: left;
        }
        .toggleBox {
          float: left;
          margin-left: 10px;
          svg {
            margin-top: 5px;
          }
        }
      }
      .money {
        margin-top: 5px;
        height: 40px;
        line-height: 40px;
        width: 100%;
        p {
          color: #fff;
          font-size: 26px;
        }
      }
    }
    .right {
      float: right;
      margin-right: 10%;
      margin-top: 20px;
      a {
        display: block;
        color: #fff;
        height: 30px;
        line-height: 30px;
        svg {
          vertical-align: middle;
          margin-right: 10px
        }
      }
    }
  }

  .grid {
    a {
      text-align: center;
      &:after, &:before {
        display: none;
      }
      p {
        margin-top: 3px;
      }
      img {
        width: 50%;
        vertical-align: middle;
      }
    }
  }

  .cell {
    & > div {
      a {
        height: 50px;
        line-height: 50px;
        display: block;
        border-bottom: 1px solid #eaeeef;
        img {
          height: 60%;
          vertical-align: middle;
          padding: 0 10px;
        }
        span {
          font-size: 16px
        }
        b {
          font-size: 14px;
          font-weight: normal;
          float: right;
          color: #999;
          &.green {
            color: #32d377;
          }
          &.gray {
            color: #999;
          }
        }
        svg {
          float: right;
          margin: 16px 10px 0 10px;
        }
      }
    }
    .firstCell {
      border-top: 10px solid #eaeeef;
      border-bottom: 10px solid #eaeeef;
    }
    .secondCell {
      border-bottom: 10px solid #eaeeef;
    }
  }
</style>
