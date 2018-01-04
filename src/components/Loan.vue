<template>
  <div class="loanPage">
    <pageTitle :title="title"></pageTitle>
    <LoanStep v-if="allcomplete" :loanStep="loanStep"></LoanStep>
    <div class="canvas" :class="{'distance': !allcomplete}">
      <drawArc :quota="quota" :canLoan="canLoan" ref="drawArc"></drawArc>
    </div>
    <div class="canLoan" v-if="allcomplete">
      <div class="mu">
        <p>核定亩数：<span>{{mu}}</span> 亩</p>
        <p>{{quotaText}}</p>
      </div>
      <div class="apply">
        <div class="formGroup">
          <div class="moneyInput">
            <label for="money">申请金额</label>
            <input id="money" class="money" type="tel" ref="money" @focus="focus($event)" placeholder="请填写贷款金额"
                   v-model="applyMoney"></input>
          </div>
          <popup-picker class="month" title="借款期限" :data="month" v-model="applyMonth"
                        value-text-align="right" :placeholder="('请选择')"></popup-picker>
          <popup-picker class="reason" title="借款用途" :data="reason" v-model="applyReason" value-text-align="right"
                        value-font-size="12px" :placeholder="('请选择')"></popup-picker>
          <div class="placeInput">
            <label for="place">所在位置</label>
            <input id="place" class="place" type="text" v-model="place" placeholder="请填写地址" ref="place"
                   @focus="focus($event)"></input>
          </div>
        </div>
      </div>
      <div class="btn_wrap">
        <x-button type="primary" @click.native="nextStep">提交贷款申请</x-button>
      </div>
    </div>
    <div class="noLoan drawBox" v-else>
      <div class="infoList">
        <div class="gridItem" @click="nextRouter('PerAuth')">
          <img :src="!userCheck ? userUrl1 : userUrl2" alt="">
          <p>个人信息</p>
        </div>
        <div class="gridItem" @click="nextRouter('Production')">
          <img :src="!productionCheck ? productionUrl1 : productionUrl2" alt="">
          <p>生产信息</p>
        </div>
        <div class="gridItem" @click="nextRouter('IdCard')">
          <img :src="!idCardCheck ? idCardUrl1 : idCardUrl2" alt="">
          <p>身份证</p>
        </div>
        <div class="gridItem" @click="nextRouter('OneCardList')">
          <img :src="!bankCardCheck ? bankCardUrl1 : bankCardUrl2" alt="">
          <p>一卡通</p>
        </div>
      </div>
      <button class="goInfo" @click="reloadBtn">验证资料</button>
      <!--<p class="tips"><span><img src="../assets/safe.png" alt="safe"></span><span>信息安全&隐私保障</span></p>-->
      <p class="tipsLeft"><span>注：请按照步骤填写贷款所需资料。</span></p>
    </div>
  </div>
</template>

<script>
  import LoanStep from './common/LoanStep'
  import userUrl1 from '../assets/file.png'
  import userUrl2 from '../assets/fileGo.png'
  import productionUrl1 from '../assets/user.png'
  import productionUrl2 from '../assets/userGo.png'
  import idCardUrl1 from '../assets/id-card.png'
  import idCardUrl2 from '../assets/id-cardGo.png'
  import bankCardUrl1 from '../assets/bank_card.png'
  import bankCardUrl2 from '../assets/bank_cardGo.png'
  import drawArc from './common/drawArc'
  import { XButton, PopupPicker } from 'vux'

  export default {
    data () {
      return {
        title: '我要贷款',
        loanStep: 1,
        applyMoney: '',
        month: [['3 个月', '6 个月', '9 个月', '12 个月', '18 个月', '24 个月']],
        applyMonth: [],
        reason: [['生产资料购买', '农资购买贷款', '生产服务需求贷款', '扩大种养规模贷款', '购买农机具贷款', '农田水利建设贷款']],
        applyReason: [],
        place: '',
        quota: 0,
        canLoan: 0,
        mu: 0,
        quotaText: '',
        allcomplete: false,
        userCheck: false,
        productionCheck: false,
        idCardCheck: false,
        bankCardCheck: false,
        userUrl1: userUrl1,
        userUrl2: userUrl2,
        productionUrl1: productionUrl1,
        productionUrl2: productionUrl2,
        idCardUrl1: idCardUrl1,
        idCardUrl2: idCardUrl2,
        bankCardUrl1: bankCardUrl1,
        bankCardUrl2: bankCardUrl2
      }
    },
    beforeCreate () {
      this.$nextTick(function () {
        this.$vux.loading.show({
          text: 'Loading'
        })
        let local = window.localStorage
        let userId = local.getItem('userId')
        this.$http({
          method: 'get',
          timeout: 10000,
          url: `${this.$root.baseUrl}/finance/app/certification/verifyCreditInfoAndMoney.do`,
          params: {
            userId: userId
          }
        }).then((res) => {
          if (res.data.status === 'true') {
            let data = res.data.data
            this.quota = data.creditMoney
            this.mu = data.scale
            this.quotaText = data.creditFormulaDesc
            this.canLoan = data.availableMoney
            if (data.isAuthForPersonalInfo) {
              this.userCheck = true
            }
            if (data.isAuthForProductionInfo) {
              this.productionCheck = true
            }
            if (data.isAuthForSfzCard) {
              this.idCardCheck = true
            }
            if (data.isAuthForBankCard) {
              this.bankCardCheck = true
            }
            if (data.isAuthForBankCard && data.isAuthForPersonalInfo && data.isAuthForProductionInfo && data.isAuthForSfzCard) {
              this.allcomplete = true
            }
            local.setItem('creditFormulaId', data.creditFormulaId)
            local.setItem('creditMoney', data.creditMoney)
            local.setItem('availableMoney', data.availableMoney)
            this.$vux.loading.hide()
          } else {
            this.$vux.loading.hide()
            this.$nextTick(function () {
              this.$vux.toast.show({
                text: '请完善资料信息！',
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
    deactivated () {
      this.$destroy()
    },
    mounted () {
      var _this = this
      // ios
      window.getAddress = function (place) {
        _this.place = place
      }
    },
    created () {
      this.address()
    },
    methods: {
      reloadBtn () {
        this.$nextTick(function () {
          this.$vux.loading.show({
            text: 'Loading'
          })
          let local = window.localStorage
          let userId = local.getItem('userId')
          this.$http({
            method: 'get',
            timeout: 10000,
            url: `${this.$root.baseUrl}/finance/app/certification/verifyCreditInfoAndMoney.do`,
            params: {
              userId: userId
            }
          }).then((res) => {
            if (res.data.status === 'true') {
              let data = res.data.data
              if (data.isAuthForBankCard && data.isAuthForPersonalInfo && data.isAuthForProductionInfo && data.isAuthForSfzCard) {
                this.allcomplete = true
              }
              if (this.allcomplete) {
                this.$vux.loading.hide()
                this.$router.go(0)
              } else {
                this.$nextTick(function () {
                  this.$vux.loading.hide()
                  this.$vux.toast.show({
                    text: '请完善资料信息！',
                    type: 'text',
                    width: '12em',
                    position: 'middle'
                  })
                })
                return false
              }
              this.$vux.loading.hide()
            } else {
              this.$vux.loading.hide()
              this.$nextTick(function () {
                this.$vux.toast.show({
                  text: '请完善资料信息！',
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
      nextRouter (path) {
        this.$router.push(path)
      },
      address () {
        let u = navigator.userAgent
        if (u.indexOf('iPhone') > -1) {
          window.webkit.messageHandlers.toAddress.postMessage(null)
        } else {
          /* eslint-disable no-undef */
          this.place = toback.getAddress()
        }
      },
      focus (e) {
        let _this = e.target
        let timeOut = setTimeout(() => {
          _this.scrollIntoView(true)
          clearTimeout(timeOut)
          timeOut = null
        }, 200)
      },
      nextStep () {
        let num = Number(this.applyMoney)
        if (isNaN(num)) {
          this.showToast = true
          this.$vux.toast.show({
            text: '请填写数字',
            type: 'text',
            width: '12em'
          })
          return false
        }
        if (num < 500) {
          this.showToast = true
          this.$vux.toast.show({
            text: '贷款金额需大于500',
            type: 'text',
            width: '14em'
          })
          return false
        }
        if (num > this.quota) {
          this.showToast = true
          this.$vux.toast.show({
            text: '金额不得大于可用额度',
            type: 'text',
            width: '14em'
          })
          return false
        }
        let lastTime = this.applyMonth
        if (lastTime.length === 0) {
          this.showToast = true
          this.$vux.toast.show({
            text: '请选择贷款期限',
            type: 'text',
            width: '12em'
          })
          return false
        }
        let loanUse = this.applyReason
        if (loanUse.length === 0) {
          this.showToast = true
          this.$vux.toast.show({
            text: '请选择贷款用途',
            type: 'text',
            width: '12em'
          })
          return false
        }
        if (!this.place) {
          this.showToast = true
          this.$vux.toast.show({
            text: '请填写地址',
            type: 'text',
            width: '12em'
          })
          return false
        }
        let local = window.localStorage
        let reasonArr = this.reason[0]
        let applyReasonText = this.applyReason[0]
        let applyReason
        local.setItem('applyMonth', this.applyMonth[0].substring(0, 1))
        local.setItem('applyMoney', this.applyMoney)
        for (let i = 0, lens = reasonArr.length; i < lens; i++) {
          if (applyReasonText === reasonArr[i]) {
            applyReason = i + 1
          }
        }
        local.setItem('applyReason', applyReason)
        this.$router.push('Loan2')
      }
    },
    components: {
      LoanStep,
      drawArc,
      PopupPicker,
      XButton
    }
  }
</script>

<style type="text/less" lang="less" scoped>
  .loanPage {
    padding-bottom: 75px;
    background: #fff;
  }
  .drawBox {
    background-color: #fff;
    height: 100%;
    margin-top: 70px;
  }

  .apply {
    width: 100%;
    overflow-x: hidden;
    background-color: #fff;
    .formGroup {
      .moneyInput, .wayInput, .rateInput, .placeInput {
        padding: 10px 20px 10px 15px;
        box-sizing: border-box;
        position: relative;
        height: 46px;
        width: 100%;
        &:before {
          content: " ";
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 1px;
          border-bottom: 1px solid #d9d9d9;
          color: #d9d9d9;
          -webkit-transform-origin: 0 0;
          transform-origin: 0 0;
          -webkit-transform: scaleY(0.5);
          transform: scaleY(0.5);
          left: 15px;
        }
        label {
          min-width: 80px;
          float: left;
        }
        input {
          float: right;
          padding-right: 18px;
          outline: none;
          width: 195px;
          height: 25.6px;
          font-size: 16px;
          border: none;
          text-align: right;
          background-color: transparent;
        }
      }
      .moneyInput:after {
        content: "元";
        position: absolute;
        right: 18px;
        top: 8px;
      }
      .placeInput:after {
        content: url(../assets/address.png);
        position: absolute;
        right: 18px;
        top: 12px;
      }
      .moneyInput:before {
        display: none;
      }
      .placeInput {
        label {
          width: 80px;
        }
        input {
          width: 185px;
        }
      }
      .reason {
        .vux-popup-picker-value {
          font-size: 10px !important;
        }
      }
    }
  }

  .mu {
    background-color: #fff;
    text-align: center;
    padding: 10px 0 20px 0;
    h4 {
      font-size: 16px;
      font-weight: 500;
    }
    p {
      font-size: 12px;
      color: #999;
      span {
        font-size: 16px;
        color: #e51c23;
        margin: 0 5px;
      }
    }
    h3 {
      margin-top: 10px;
      font-size: 12px;
      text-align: center;
      color: #e51c23;
      overflow-x: auto;
      text-overflow: clip;
    }
  }

  .creditInfo {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
    overflow: hidden;
    background-color: #fff;
    & > div {
      flex: auto;
      height: 80px;
      width: 100px;
      text-align: center;
      padding-top: 10px;
      p {
        font-size: 12px;
      }
      img {
        width: 45px;
      }
    }
  }

  .btn_wrap {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 45px;
    overflow: hidden;
    z-index: 9;
    button.weui-btn {
      background-color: #1ecc6e;
      border-radius: 0;
      height: 100%;
    }
  }

  .canvas {
    background-color: #fff;
  }

  .distance {
    margin: 20px 0;
  }

  .drawBox {
    .canvas {
      margin: 50px 0 70px 0;
    }
  }

  .infoList {
    display: flex;
    margin: 40px 0 20px 0;
    .gridItem {
      flex: 1;
      text-align: center;
      position: relative;
      &:after {
        content: url(../assets/right.png);
        height: 20px;
        width: 20px;
        position: absolute;
        top: 3px;
        right: -10px;
      }
      &:last-child:after {
        display: none;
      }
      p {
        margin-top: 10px;
        font-size: 14px;
        color: #333;
      }
      img {
        height: 26px;
      }
    }
  }

  .goInfo {
    margin: 50px auto 0 auto;
    width: 80%;
    display: block;
    height: 40px;
    border-radius: 20px;
    line-height: 40px;
    color: #fff;
    font-size: 16px;
    outline: none;
    border: none;
    background-color: #07dd84;
  }

  .tips, .tipsLeft {
    text-align: center;
    line-height: 30px;
    span {
      display: inline-block;
      height: 30px;
      font-size: 14px;
      color: #dbdbdb;
      margin-right: 5px;
      img {
        vertical-align: middle;
        width: 14px;
        margin-top: -3px;
      }
    }
  }

  .tipsLeft {
    text-align: left;
    padding-left: 20px;
    margin-top: 30px;
  }
</style>
