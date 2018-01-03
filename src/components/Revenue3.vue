<template>
  <div class="bg_white">
    <div class="getHeader">
      <header class="header">
        <div class="left" @click="goBack()"></div>
        <h1>{{title}}</h1>
      </header>
    </div>
    <topStep :step="step"></topStep>
    <div class="blackboard">
      <div class="img">
        <img src="../assets/blackboard.png">
      </div>
      <p>借款审核中</p>
    </div>
    <div class="textTip">
      <p>您的借款请求已提交，等待相关部门进行贷款审核！</p>
      <p>如有疑问请联系我们。</p>
    </div>
    <div class="btn_wrap">
      <x-button class="btn1" type="primary" @click.native="nextStep">管理我的借款</x-button>
      <x-button  class="btn2" type="primary" @click.native="callUs">联系我们</x-button>
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
        step: 3
      }
    },
    methods: {
      callUs () {
        window.location.href = 'tel:15950458586'
      },
      nextStep () {
        this.$router.push('RevenueDetail')
      },
      goBack () {
        this.$router.go(-3)
      }
    },
    components: {
      topStep,
      XButton
    }
  }
</script>

<style type="text/less" lang="less" scoped>
  .getHeader {
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
        margin-top: -4px;
        margin-left: -4px;
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

  .blackboard {
    padding: 20px;
    position: relative;
    img {
      width: 100%;
    }
    p {
      color: #fff;
      font-size: 20px;
      height: 40px;
      width: 100%;
      line-height: 40px;
      text-align: center;
      position: absolute;
      top: 45%;
      left: 0;
    }
  }

  .textTip {
    padding: 40px 0;
    p {
      font-size: 14px;
      color: #999;
      text-align: center;
      margin-bottom: 20px;
    }
  }

  .btn_wrap {
    height: 150px;
    overflow: hidden;
    background-color: #fff;
    button.weui-btn {
      padding: 0;
      height: 45px;
      width: 100%;
      background-color: #1ECC6E;
    }
  }
</style>
