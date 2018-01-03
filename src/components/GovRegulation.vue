<template>
  <div class="GovRegulation">
    <pageTitle class="getHeader" :title="title"></pageTitle>
    <div class="GovBox">
      <div class="GovTop">
        <p>累计贷款：{{totalMoney}} 元</p>
      </div>
    </div>
    <div class="areaChoose">
      <div class="addressInput" @click="popAddress">
        <label for="address">地区</label>
        <input id="address" class="address" type="text" placeholder="请选择地区"
               v-model="addressText" disabled="disabled"></input>
      </div>
      <div class="popDiv" v-transfer-dom>
        <popup v-model="addressPick" position="bottom" max-height="50%">
          <p class="popAddressTitle">请选择地区</p>
          <div class="cellBox">
            <div class="item" @click="choose('泰州市')">
              <span>泰州市</span>
            </div>
          </div>
        </popup>
      </div>
    </div>
    <div class="project">
      <div class="proTop">
        <div class="left">
          <p>全部贷款</p>
          <h4>{{loan1}}</h4>
        </div>
        <div class="right">
          <p>贷款审核中</p>
          <h4>{{loan2}}</h4>
        </div>
      </div>
      <div class="proBot">
        <div class="left">
          <p>贷款放贷</p>
          <h4>{{loan3}}</h4>
        </div>
        <div class="right">
          <p>贷款结束</p>
          <h4>{{loan4}}</h4>
        </div>
      </div>
    </div>
    <div class="GovList">
      <a class="item" href="javascript:;" @click="nextRouter('CreditRecord')">
        <img src="../assets/gov1.png" alt="">
        <span>授信档案监管</span>
      </a>
      <a class="item" href="javascript:;" @click="nextRouter('BlackRecord')">
        <img src="../assets/gov2.png" alt="">
        <span>失信黑名单档案</span>
      </a>
      <a class="item" href="javascript:;" @click="nextRouter('Statistics')">
        <img src="../assets/gov3.png" alt="">
        <span>贷款统计</span>
      </a>
    </div>
  </div>
</template>

<script>
  import { Popup, TransferDom } from 'vux'

  export default {
    data () {
      return {
        title: '政府监管',
        totalMoney: '5,894,110.00',
        addressPick: false,
        addressText: '泰州市',
        areaCode: '3212',
        loan1: 0,
        loan2: 0,
        loan3: 0,
        loan4: 0
      }
    },
    directives: {
      TransferDom
    },
    mounted () {
    },
    beforeCreate () {
      this.$nextTick(function () {
        this.$vux.loading.show({
          text: 'Loading'
        })
        let local = window.localStorage
        let userId = local.getItem('userId')
        let areaCode = this.areaCode
        this.$http({
          method: 'get',
          timeout: 10000,
          url: `${this.$root.baseUrl}/finance/app/regulation/getRegulationStatisticsInfo.do`,
          params: {
            userId: userId,
            areaCode: areaCode
          }
        }).then((res) => {
          if (res.data.status === 'true') {
            let data = res.data.data
            this.totalMoney = this.formatNumber(data.areaTotalFinanceMoney)
            this.loan1 = data.areaTotalFinanceCount
            this.loan2 = data.areaApproveingFinanceCount
            this.loan3 = data.areaBankLoanedFinanceCount
            this.loan4 = data.areaCompletedFinanceCount
            this.$vux.loading.hide()
          } else {
            this.$vux.loading.hide()
            this.$nextTick(function () {
              this.$vux.toast.show({
                text: '请求失败,稍后重试！',
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
    methods: {
      popAddress () {
        this.addressPick = !this.addressPick
      },
      choose (areaName) {
        this.addressText = areaName
        this.addressPick = false
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
      nextRouter (path) {
        this.$router.push(path)
      }
    },
    components: {
      Popup
    }
  }
</script>
<style scoped lang="less" type="text/less">
  .GovRegulation {
    overflow: hidden;
  }

  .GovBox {
    color: #fff;
    height: 100px;
    line-height: 100px;
    text-align: center;
    font-size: 18px;
    background: transparent linear-gradient(to right, rgb(17, 205, 223) 0px, rgb(13, 227, 170) 100%) repeat scroll 0% 0%;
  }

  .addressInput {
    padding: 10px 20px 10px 15px;
    box-sizing: border-box;
    position: relative;
    height: 46px;
    width: 100%;
    &:after {
      content: " ";
      display: inline-block;
      height: 6px;
      width: 6px;
      border-width: 2px 2px 0 0;
      border-color: #c8c8cd;
      border-style: solid;
      -webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
      transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
      position: absolute;
      top: 50%;
      margin-top: -4px;
      right: 16px;
    }
    label {
      min-width: 80px;
      float: left;
    }
    input {
      float: right;
      outline: none;
      width: 180px;
      height: 25.6px;
      font-size: 16px;
      margin-right: 6px;
      border: none;
      text-align: right;
      background-color: transparent;
    }
  }

  .popDiv {
    & > div {
      background-color: #fff;
      box-sizing: border-box;
    }
    .popAddressTitle {
      font-weight: 500;
      font-size: 14px;
      height: 30px;
      line-height: 30px;
      padding-left: 5px;
      background-color: #fbfbfb;
      color: #999;
    }
    .cellBox {
      padding: 0 15px;
      .item {
        height: 40px;
        line-height: 40px;
        border-bottom: 1px solid #ddd;
      }
    }
  }

  .project {
    padding: 10px 15px;
    width: 92%;
    margin: 0 auto 10px;
    height: 180px;
    border-radius: 15px;
    box-sizing: border-box;
    background: transparent linear-gradient(to right, rgb(17, 205, 223) 0px, rgb(13, 227, 170) 100%) repeat scroll 0% 0%;
    & > div {
      height: 80px;
      display: flex;
      & > div {
        flex: 1;
        text-align: center;
        box-sizing: border-box;
        p {
          font-size: 14px;
          margin-top: 15px;
          color: #fff;
          &:before {
            content: '';
            height: 10px;
            width: 10px;
            display: inline-block;
            border-radius: 50%;
            background: #FFBF31;
            margin-right: 10px;
            margin-left: -10px;
            box-shadow: 0 0 1px #fff;
          }
        }
        h4 {
          color: #fff;
        }
      }
    }
    .proTop > div:first-child {
      border-right: 1px solid #fff;
      border-bottom: 1px solid #fff;
    }
    .proTop > div:last-child {
      border-bottom: 1px solid #fff;
      p {
        &:before {
          background: #F5A70A;
        }
      }
    }
    .proBot > div:first-child {
      border-right: 1px solid #fff;
      p {
        &:before {
          background: #5AA7C9;
        }
      }
    }
    .proBot > div:last-child {
      p {
        &:before {
          background: #0390CB;
        }
      }
    }
  }
  .GovList {
    border-top: 10px solid #ddd;
    padding: 10px 15px;
    & > a {
      display: block;
      height: 50px;
      line-height: 50px;
      border-bottom: 1px solid #ddd;
      position: relative;
      &:after {
        content: " ";
        display: inline-block;
        height: 6px;
        width: 6px;
        border-width: 2px 2px 0 0;
        border-color: #c8c8cd;
        border-style: solid;
        -webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
        transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
        position: absolute;
        top: 50%;
        margin-top: -4px;
        right: 16px;
      }
      img {
        width: 20px;
        vertical-align: middle;
      }
      span {
        margin-left: 10px;
        font-size: 14px;
      }
    }
  }
</style>
