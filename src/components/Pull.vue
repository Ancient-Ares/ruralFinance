<template>
  <div class="pullPage padT">
    <pageTitle :title="title"></pageTitle>
    <div class="pullBox">
      <div class="pullList">
        <div class="pullItem">
          <div class="pull">
            <div class="left">
              <div class="img">
                <img src="../assets/pull1.png">
              </div>
              <p>收益保证贷款</p>
            </div>
            <div class="right">
              <h3>借款金额：2000 ~ 30,000元</h3>
              <p> “政银保”新型农村金融合作模式，根据亩产估算法集中授信，审批迅速快捷。推动土地收益权益资产变资本，资本变资金。有效发挥农民致富增收的潜能，无需抵押。</p>
            </div>
          </div>
          <div class="rightBot">
            <a href="">
              <b>?</b>
              <span>了解收益保证贷款</span>
            </a>
          </div>
        </div>
        <div class="pullItem">
          <div class="get">
            <div class="left">
              <div class="img">
                <img src="../assets/pull2.png">
              </div>
              <p>两权抵押贷款</p>
            </div>
            <div class="right">
              <h3>借款金额：2000 ~ 30,000元</h3>
              <p> 赋予“两权”抵押融资功能，维护农民土地权益，推进农村金融产品和服务方式创新。凭有效的土地经营权抵押登记证办理贷款，无需担保即可办理。</p>
            </div>
          </div>
          <div class="rightBot">
            <a href="">
              <b>?</b>
              <span>了解两权抵押贷款</span>
            </a>
          </div>
        </div>
        <div class="pullItem">
          <div class="credit">
            <div class="left">
              <div class="img">
                <img src="../assets/pull3.png">
              </div>
              <p>信用担保贷款</p>
            </div>
            <div class="right">
              <h3>借款金额：2000 ~ 30,000元</h3>
              <p> 规模化种植养殖农场，农业产业化企业，提供增信资质，即可办理贷款，多家担保公司抢单机制，降低贷款成本。</p>
            </div>
          </div>
          <div class="rightBot">
            <a href="">
              <b>?</b>
              <span>了解信用担保贷款</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        title: '贷款类型'
      }
    },
    methods: {},
    components: {}
  }
</script>

<style lang="less" type="text/less" scoped>
  .pullBox {
    padding: 10px;
  }
  .pullItem {
    overflow: hidden;
    _zoom: 1;
    margin-bottom: 10px;
    & > div:not(.rightBot) {
      border: 1px solid #ddd;
      border-radius: 6px;
      display: flex;
      padding: 10px 10px;
      background-color:#fff;
      .left {
        flex: 0 0 70px;
        margin: 5% 10px 0 5px;
        text-align: center;
        p {
          font-size: 10px;
        }
        img {
          width: 50px;
        }
      }
      .right {
        flex: 1;
        overflow: hidden;
        h3 {
          font-size: 13px;
          margin: 10px 0;
        }
        p {
          font-size: 11px;
          height: 70px;
          width: 100%;
          white-space: normal;
          color: #8d8d8d;
        }
      }
    }
    .rightBot {
      float: right;
      margin-right: 10px;
      b {
        height: 14px;
        width: 14px;
        text-align: center;
        line-height: 14px;
        display: inline-block;
        font-weight: normal;
        border-radius: 50%;
        color: #fff;
        font-size: 12px;
        background-color: #03A9F4;
      }
      span {
        color: #03A9F4;
        font-size: 10px;
      }
    }
  }
</style>
