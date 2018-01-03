<template>
  <div>
    <pageTitle :title="title"></pageTitle>
    <topStep :step="step"></topStep>
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
          <input id="place" class="place" type="text" v-model="place"></input>
        </div>
      </div>
    </div>
    <div class="check">
      <p>
        <check-icon :value.sync="check"></check-icon>
        本人自愿申请用款 {{applyMoney}} 元，期限为
        {{applyMonth[0]}}，担保方式为土地收益担保，用于从事农业生产活动，如不能按期偿还借款本息，物权公司有权处置变现本人土地收益和扣划本人享受的各项农业补贴用于偿还，我已阅读并同意签署。<span
        @click="pop">《农户借款须知》</span></p>
    </div>
    <div class="btn_wrap">
      <x-button class="btn1" type="primary" @click.native="PrevStep">上一步</x-button>
      <x-button class="btn2" :class="{'highlight':check && applyMoney>0}" type="primary" @click.native="nextStep">提交签约
      </x-button>
    </div>
    <div v-model="popShow" class="popShow">
      <div class="bgClose" @click="pop"></div>
      <div class="content">
        <div v-for="i in 20" :key="i" :title="i">
          <p>{{i}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import topStep from './common/Step'
  import { XButton, PopupPicker, CheckIcon, Popup } from 'vux'

  export default {
    data () {
      return {
        title: '收益保证贷款',
        step: 1,
        applyMoney: 50000,
        month: [['6 个月', '12 个月', '18 个月']],
        applyMonth: ['6 个月'],
        way: '到期还本息',
        rate: '5%',
        applyReason: ['有500亩地，生产资金周转，夏收后还贷'],
        reason: [['有500亩地，生产资金周转，夏收后还贷']],
        place: '... 定位中',
        check: false,
        popShow: false
      }
    },
    created () {
    },
    mounted () {
    },
    methods: {
      onBlur () {
        var num = Number(this.applyMoney)
        if (isNaN(num)) {
          alert('请填写数字！')
        }
        if (num === 0 || num < 0) {
          alert('金额须大于0')
        }
      },
      pop () {
        this.popShow = !this.popShow
        if (this.popShow) {
          document.body.className = 'addPop'
        } else {
          document.body.className = ''
        }
      },
      PrevStep () {
        this.$router.back()
      },
      nextStep () {
        if (this.check === true && this.applyMoney > 0) {
          this.$router.push('Revenue3')
        }
      }
    },
    components: {
      topStep,
      XButton,
      PopupPicker,
      CheckIcon,
      Popup
    }
  }
</script>

<style type="text/less" lang="less" scoped>

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
          width: 150px;
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
      .reason {
        .vux-popup-picker-value {
          font-size: 10px !important;
        }
      }
    }
  }

  .check {
    padding: 20px 10px;
    background-color: #fff;
    margin: 20px 0 40px;
    p {
      white-space: normal;
      span {
        color: #1ecc6e;
      }
    }
    .weui-icon-success {
      color: #1ecc6e;
    }
  }

  .popShow {
    opacity: 0;
    position: fixed;
    bottom: 45px;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: -1;
    background: rgba(0, 0, 0, 0.5);
    .bgClose {
      height: 60%;
      width: 100%;
      overflow: hidden;
    }
    .content {
      height: 40%;
      width: 100%;
      overflow-y: auto;
      box-sizing: border-box;
      padding: 20px;
      background-color: #fff;
      transition: all 0.3s ease-in;
      transform: translate3d(0, 100%, 0);
    }
  }

  body.addPop .popShow {
    display: block;
    z-index: 9;
    opacity: 1;
    .content {
      transform: translate3d(0, 0, 0);
    }
  }

  .btn_wrap {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 45px;
    overflow: hidden;
    display: flex;
    background-color: #fff;
    z-index: 9;
    button.weui-btn {
      background-color: #1ecc6e;
      width: 50%;
      border-radius: 0;
      float: left;
      padding: 0;
      margin: 0;
      &:after {
        display: none;
      }
    }
    button.weui-btn.btn2 {
      border-left: 1px solid #ddd;
      background-color: #999;
    }
    button.weui-btn.btn2.highlight {
      background-color: #1ecc6e;
    }
  }
</style>
