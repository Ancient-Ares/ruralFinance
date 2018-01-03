<template>
  <div v-if="canLoan" class="loanPage">
    <pageTitle :title="title"></pageTitle>
    <LoanStep :loanStep="loanStep"></LoanStep>
    <div class="mu">
      <h4>收益保证贷款</h4>
      <p>
        核定亩数：<span>400</span> 亩
      </p>
      <p>
        授信额度：<span>200,000</span> 元
      </p>
      <h3>已通过乡镇农经站审核,授信额度 = 亩数 * 亩产粮格 * 70%</h3>
    </div>
    <div class="apply">
      <div class="formGroup">
        <div class="moneyInput">
          <label for="money">申请金额</label>
          <input id="money" class="money" type="tel" @blur="onBlur" v-model="applyMoney"></input>
        </div>
        <popup-picker class="month" title="借款期限" :data="month" v-model="applyMonth"
                      value-text-align="right"></popup-picker>
        <div class="wayInput">
          <label for="way">还款方式</label>
          <input id="way" class="rate" type="text" v-model="way" disabled="disabled"></input>
        </div>
        <div class="rateInput">
          <label for="rate">借款利率(年化)</label>
          <input id="rate" class="rate" type="text" v-model="rate" disabled="disabled"></input>
        </div>
        <popup-picker class="reason" title="借款用途" :data="reason" v-model="applyReason" value-text-align="right"
                      value-font-size="12px"></popup-picker>
        <div class="placeInput">
          <label for="place">所在位置</label>
          <input id="place" class="place" type="text" v-model="place" ref="place" @focus="focus"
                 @blur="blur"></input>
        </div>
      </div>
    </div>
    <h3 class="tip">授信认证资料</h3>
    <div class="creditInfo">
      <div class="creditInfoItem">
        <div class="img">
          <img src="../assets/loan1.png">
        </div>
        <p>基本信息</p>
      </div>
      <div class="creditInfoItem">
        <div class="img">
          <img src="../assets/loan2.png">
        </div>
        <p>生产信息</p>
      </div>
      <div class="creditInfoItem">
        <div class="img">
          <img src="../assets/loan3.png">
        </div>
        <p>实名认证</p>
      </div>
      <div class="creditInfoItem">
        <div class="img">
          <img src="../assets/loan4.png">
        </div>
        <p>农村认证</p>
      </div>
      <div class="creditInfoItem">
        <div class="img">
          <img src="../assets/loan5.png">
        </div>
        <p>工商注册</p>
      </div>
      <div class="creditInfoItem">
        <div class="img">
          <img src="../assets/loan6.png">
        </div>
        <p>承包合同</p>
      </div>
    </div>
    <div class="btn_wrap">
      <x-button type="primary" @click.native="nextStep">提交借款申请</x-button>
    </div>
  </div>
  <div v-else class="drawBox">
    <pageTitle :title="title"></pageTitle>
    <div class="canvas">
      <drawArc :quota="quota"></drawArc>
    </div>
    <div class="infoList">
      <div class="gridItem">
        <img src="../assets/file.png" alt="">
        <p>个人信息</p>
      </div>
      <div class="gridItem">
        <img src="../assets/user.png" alt="">
        <p>生产信息</p>
      </div>
      <div class="gridItem" link="./Revenue">
        <img src="../assets/id-card.png" alt="">
        <p>身份证</p>
      </div>
      <div class="gridItem" link="./Get">
        <img src="../assets/bank_card.png" alt="">
        <p>一卡通</p>
      </div>
    </div>
    <button class="goInfo" @click.native="nextStep">填写授信资料</button>
    <p class="tips"><span><img src="../assets/safe.png" alt="safe"></span><span>信息安全&隐私保障</span></p>
  </div>
</template>

<script>
  import LoanStep from './common/LoanStep'
  import drawArc from './common/drawArc'
  import { XButton, PopupPicker } from 'vux'

  export default {
    data () {
      return {
        canLoan: false,
        quota: 5000,
        title: '我要贷款',
        loanStep: 1,
        applyMoney: 50000,
        month: [['6 个月', '12 个月', '18 个月']],
        applyMonth: ['6 个月'],
        way: '到期还本息',
        rate: '5%',
        reason: [['生产资金周转']],
        applyReason: ['生产资金周转'],
        place: '正在定位'
      }
    },
    beforeCreate () {
      this.$http.get('',
        {
          params: {
            ID: 12345
          }
        }
      ).then((res) => {
        if (res.data.code === 0) {
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    mounted () {
      var _this = this
      // ios
      window.getAddress = function (place) {
        _this.place = place
      }
    },
    async created () {
      let u = navigator.userAgent
      if (u.indexOf('iPhone') > -1) {
        window.webkit.messageHandlers.toAddress.postMessage(null)
      } else {
        /* eslint-disable no-undef */
        this.place = toback.getAddress()
      }
    },
    methods: {
      onBlur () {
        let num = Number(this.applyMoney)
        if (isNaN(num)) {
          alert('请填写数字！')
        }
        if (num === 0 || num < 0) {
          this.showToast = true
          this.$vux.toast.show({
            text: '金额须大于0',
            type: 'cancel'
          })
        }
      },
      focus (dom) {
        let _this = this
        let timeOut = setTimeout(() => {
          let pannel = _this.$refs.place
          pannel.scrollIntoViewIfNeeded(true)
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
            type: 'cancel'
          })
          return false
        }
        if (num === 0 || num < 0) {
          this.showToast = true
          this.$vux.toast.show({
            text: '金额须大于0',
            type: 'cancel'
          })
          return false
        }
        if (this.place === '正在定位') {
          this.showToast = true
          this.$vux.toast.show({
            text: '请打开GPS定位',
            type: 'cancel'
          })
          return false
        }
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
  }

  .drawBox {
    background-color: #fff;
    height: 100%;
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
          border-top: 1px solid #d9d9d9;
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
          padding-right: 4px;
          outline: none;
          width: 120px;
          height: 25.6px;
          font-size: 16px;
          border: none;
          text-align: right;
          background-color: transparent;
        }
      }
      .placeInput {
        label {
          width: 80px;
        }
        input {
          width: 190px;
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
    padding: 10px;
    h4 {
      font-size: 16px;
      font-weight: 500;
    }
    p {
      font-size: 12px;
      padding: 5px 0;
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
    margin: 20px auto 0 auto;
    width: 80%;
    display: block;
    height: 40px;
    border-radius: 20px;
    line-height: 40px;
    color: #fff;
    font-size: 16px;
    outline: none;
    border: none;
    background-color: #07DD84;
  }
  .tips {
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
</style>
