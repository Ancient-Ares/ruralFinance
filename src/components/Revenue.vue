<template>
  <div>
    <pageTitle :title="title"></pageTitle>
    <topStep :step="step"></topStep>
    <h3 class="tip">成功借款金额以涉农部门审核结果为准！</h3>
    <div class="mu">
      <h4>收益保证贷款</h4>
      <p>
        核定亩数：<span>400</span> 亩
      </p>
      <p>
        授信额度：<span>200,000</span> 元
      </p>
      <h3>额定亩数以各乡镇农经站审核为准,授信额度 = 亩数 * 亩产粮格 * 70%</h3>
    </div>
    <h2>借款授信资料项</h2>
    <div class="cell">
      <a class="cellItem" href="">
        <div class="imgBox">
          <img src="../assets/step1.png">
        </div>
        <span>实名认证</span>
        <icon slot="icon" name="right" scale="2"></icon>
      </a>
      <a class="cellItem" href="">
        <div class="imgBox">
          <img src="../assets/step2.png">
        </div>
        <span>土地承包合同</span>
        <icon slot="icon" name="right" scale="2"></icon>
      </a>
      <a class="cellItem" href="">
        <div class="imgBox">
          <img src="../assets/step3.png">
        </div>
        <span>贷款人申请承诺书</span>
        <icon slot="icon" name="right" scale="2"></icon>
      </a>
      <a class="cellItem" href="">
        <div class="imgBox">
          <img src="../assets/step4.png">
        </div>
        <span>个人征信查询授权书</span>
        <icon slot="icon" name="right" scale="2"></icon>
      </a>
      <a class="cellItem" href="">
        <div class="imgBox">
          <img src="../assets/step5.png">
        </div>
        <span>手机运营商</span>
        <icon slot="icon" name="right" scale="2"></icon>
      </a>
      <a class="cellItem" href="">
        <div class="imgBox">
          <img src="../assets/step6.png">
        </div>
        <span>基本信息</span>
        <icon slot="icon" name="right" scale="2"></icon>
      </a>
      <a class="cellItem" href="">
        <div class="imgBox">
          <img src="../assets/step7.png">
        </div>
        <span>生产信息</span>
        <icon slot="icon" name="right" scale="2"></icon>
      </a>
      <h3>"<span>*</span>" 为必填项，资料填写越完善审核通过的借款金额越高！</h3>
    </div>
    <div class="btn_wrap">
      <x-button type="primary" @click.native="nextStep">提交借贷信息</x-button>
    </div>
  </div>
</template>

<script>
  import topStep from './common/Step'
  import { XButton } from 'vux'

  export default {
    data () {
      return {
        title: '收益保证贷款',
        step: 0
      }
    },
    methods: {
      nextStep () {
        this.$router.push('Revenue2')
      }
    },
    components: {
      topStep,
      XButton
    }
  }
</script>

<style type="text/less" lang="less" scoped>

  .mu, .cell { background-color: #fff }
  .mu {
    padding: 10px;
    h4 {
      font-size: 16px;
      font-weight: 500;
    }
    p{
      font-size: 12px;
      padding: 5px 0;
      color: #999;
      span {
        font-size: 16px;
        color: #ff7300;
        margin: 0 5px;
      }
    }
    h3 {
      margin-top: 10px;
      font-size: 12px;
      text-align: center;
      color: #999;
      overflow-x: auto;
      text-overflow: clip;
    }
  }
  h2 {
    font-size: 14px;
    font-weight: normal;
    padding: 5px 0 5px 10px;
    background: #FBF9FE;
  }

  .cell {
    padding-bottom: 40px;
    .cellItem {
      height: 50px;
      line-height: 50px;
      display: block;
      border-bottom: 1px solid #f1f5f8;
      .imgBox {
        height: 50px;
        width: 50px;
        text-align: center;
        display: inline-block;
        img {
          width: 30px;
          vertical-align: middle;
          padding: 0 10px;
        }
      }
      span {
        font-size: 16px;
        &:before {
          content: "*";
          color: #ff0000;
          vertical-align: middle;
          margin-right: 5px;
        }
      }
      b {
        font-size: 14px;
        font-weight: normal;
        float: right;
        color: #fb3b3e;
        &.green {
          color: #32d377;
        }
      }
      svg {
        float: right;
        margin: 16px 10px 0 10px;
      }
    }
    h3 {
      font-size: 12px;
      padding: 10px 0;
      background-color: #FBF9FE;
      text-align: center;
      overflow: hidden;
      span {
        color: #ff0000;
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
    background-color: #fff;
    button.weui-btn {
      background-color: #1ECC6E;
      border-radius: 0;
      height: 100%;
    }
  }
</style>
