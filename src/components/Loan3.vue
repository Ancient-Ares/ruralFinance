<template>
  <div class="loanPage">
    <div class="topHeight">
      <header class="header">
        <div class="left" @click="goBack"></div>
        <h1>提交审核</h1>
      </header>
    </div>
    <LoanStep :loanStep="loanStep"></LoanStep>
    <div class="upLoan">
      <div class="loanMid">
        <div class="img">
          <img src="../assets/success.jpg">
        </div>
        <h3>提交成功</h3>
        <!--<p>您的借款申请已提交成功，请等待 沈高镇农经站 初审，初审通过后由 姜堰区农工办 复审，请及时关注进度！</p>-->
      </div>
    </div>
    <div class="btn_wrap">
      <x-button type="primary" @click.native="nextStep">查看审批流程</x-button>
    </div>
  </div>
</template>

<script>
  import LoanStep from './common/LoanStep'
  import { XButton } from 'vux'

  export default {
    data () {
      return {
        title: '提交审核',
        loanStep: 3
      }
    },
    created () {
      var _this = this
      window.routerBack = function () {
        _this.$router.go(-3)
      }
    },
    methods: {
      goBack () {
        this.$router.go(-3)
      },
      nextStep () {
        this.$router.push('Get')
      }
    },
    components: {
      LoanStep,
      XButton
    }
  }
</script>

<style type="text/less" lang="less" scoped>
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

  .loanPage {
    padding-bottom: 45px;
  }

  .upLoan {
    background-color: #fff;
    padding: 20px 10px 30px;
    position: relative;
    text-align: center;
    .img {
      img {
        width: 80%;
      }
    }
    h3 {
      margin: 10px 0;
    }
    p {
      white-space: normal;
      text-indent: 25px;
      font-size: 14px;
      text-align: left;
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

</style>
