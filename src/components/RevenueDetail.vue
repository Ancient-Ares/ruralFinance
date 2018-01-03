<template>
  <div class="revenueDetail">
    <pageTitle :title="title"></pageTitle>
    <div class="detail">
      <div class="top afterLine">
        <div v-if="!state" class="state">
          <icon slot="icon" name="state" scale="1.8"></icon>
          <span>审核中</span>
        </div>
        <div v-if="state" class="state huan">
          <icon slot="icon" name="state" scale="1.8"></icon>
          <span>还款中</span>
        </div>
        <h4>生产资料购买，诚信借贷</h4>
        <p>2017-03-22 13:18</p>
      </div>
      <div class="cancel">
        <h4>
          <icon slot="icon" name="waitting" scale="1.8"></icon>
          <span>您的借款已在审核中，请耐心等待。</span>
        </h4>
        <button @click="showConfirm()">取消借款</button>
      </div>
    </div>
    <confirm v-model="show" @on-cancel="onCancel" @on-confirm="onConfirm">
      <p style="text-align:center;font-size: 18px">{{ ('确认取消贷款吗?') }}</p>
    </confirm>
  </div>
</template>


<script>
  import { Confirm } from 'vux'

  export default {
    data () {
      return {
        title: '借款详情',
        show: false,
        state: false
      }
    },
    methods: {
      showConfirm () {
        this.show = true
      },
      onCancel () {
        this.state = !this.state
      },
      onConfirm (msg) {
        console.log('on confirm')
        if (msg) {
          alert(msg)
        }
      }
    },
    components: {
      Confirm
    }
  }
</script>

<style type="text/less" lang="less" scoped>
  .revenueDetail {
    width: 100%;
  }
  .detail {
    background-color: #fff;
    .top {
      padding: 10px;
      h4 {
        font-weight: normal;
        font-size: 14px;
      }
      p {
        padding: 10px 0;
        font-size: 12px;
        color: #999
      }
      .state {
        position: relative;
        float: right;
        background-color: #08cdd3;
        height: 24px;
        line-height: 24px;
        width: 70px;
        svg {
          position: absolute;
          top: 3.5px;
          left: 4px;
        }
        span {
          background-color: #fff;
          height: 16px;
          line-height: 16px;
          text-align: center;
          width: 40px;
          position: absolute;
          top: 4px;
          left: 25px;
          font-size: 12px;
          color: #08cdd3;
        }
      }
      .state.huan {
        background-color: #1ECC6E;
        span {
          color: #1ECC6E;
        }
      }
    }
    .cancel {
      padding: 10px;
      text-align: center;
      h4 {
        text-align: center;
        line-height: 30px;
        height: 30px;
        position: relative;
        svg {
          animation: translate360 1s linear 0s infinite alternate;
          -webkit-animation: translate360 1s linear 0s infinite alternate;
          position: absolute;
          top: 7.5px;
        }
        span {
          padding-left: 24px;
          font-size: 14px;
          font-weight: normal;
        }
      }
      button {
        display: inline-block;
        margin: 20px auto;
        width: 85%;
        outline: none;
        border: 1px solid #1ECC6E;
        height: 45px;
        border-radius: 5px;
        background-color: #fff;
        color: #1ECC6E;
        font-size: 16px;
      }
    }
  }

  @keyframes translate360{
    form{transform: rotate(0deg)}
    to{transform:rotate(360deg)}
  }
</style>
