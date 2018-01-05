<template>
  <div class="Repayment">
    <pageTitle class="getHeader" :title="title"></pageTitle>
    <div class="Repay">
      <div class="topBox">
        <div class="info">
          <div class="avatar">{{info.name.length > 2 ? info.name.substring(1, 3) : info.name}}</div>
          <div class="text">
            <p class="name">{{info.name}}</p>
            <p class="address">{{info.address}}</p>
          </div>
        </div>
      </div>
      <div class="loanList">
        <p class="loanLine"><span>还款列表</span><span>共 {{LoanComList.length}} 笔</span></p>
        <div class="item" v-for="(item, index) in LoanComList">
          <div class="checkText">
            <p><span>欠款金额：</span><span>{{formatNumber(item.applyMoney)}}</span> 元</p>
            <p><span>贷款时间：</span><span>{{item.applyTime}}</span></p>
          </div>
          <div class="checkIcon" @click="changeMoney()">
            <check-icon :value.sync="delList[index].confirm" type="plain"></check-icon>
          </div>
        </div>
      </div>
      <div class="repayBtn">
        <div class="repayText">
          <p>共 <span style="color: #e4393c">{{formatNumber(repayMoney)}}</span> 元</p>
          <button :class="{'light': showBtn}" @click="doRepay">还 款</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { CheckIcon } from 'vux'

  export default {
    data () {
      return {
        title: '还款列表',
        info: {
          name: '未知',
          avatar: '',
          address: ''
        },
        repayMoney: 0,
        LoanComList: [],
        delList: [],
        showBtn: false
      }
    },
    watch: {
      repayMoney(val, oldVal) {
        if (val > 0) {
          this.showBtn = true
        } else {
          this.showBtn = false
        }
      }
    },
    beforeCreate () {
      this.$nextTick(function () {
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
        this.loadMore()
      })
    },
    methods: {
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
      changeMoney () {
        let delList = this.delList
        let LoanComList = this.LoanComList
        let moneyTotal = 0
        for (let i = 0, lens = delList.length; i < lens; i++) {
          if (delList[i].confirm) {
            moneyTotal += LoanComList[i].applyMoney
          }
        }
        this.repayMoney = moneyTotal
      },
      doRepay () {
        if (this.showBtn) {
          let that = this
          this.$nextTick(function () {
            this.$vux.confirm.show({
              title: '提示',
              content: '是否确认还款？',
              onShow () {
                console.log('plugin show')
              },
              onHide () {
                console.log('plugin hide')
              },
              onCancel () {
                console.log('plugin cancel')
              },
              onConfirm () {
                that.$vux.loading.show({
                  text: '还款中...'
                })
                // TODO: waitting for revising
                setTimeout(() => {
                  that.$vux.loading.hide()
                  that.$vux.toast.show({
                    text: '还款成功！',
                    type: 'success',
                    onHide () {
                      that.repayMoney = 0
                      that.LoanComList = []
                    }
                  })
                }, 3000)
              }
            })
          })
        }
      },
      loadMore () {
        this.$vux.loading.show({
          text: 'Loading'
        })
        setTimeout(() => {
          this.$nextTick(() => {
            setTimeout(() => {
              let local = window.localStorage
              let userId = local.getItem('userId')
              let areaCode = local.getItem('areaCode')
              this.$http({
                method: 'get',
                timeout: 10000,
                url: `${this.$root.baseUrl}/finance/app/finance/pageFinanceForUser.do`,
                params: {
                  pageNo: '1',
                  pageSize: '20',
                  userId: userId,
                  areaCode: areaCode,
                  villageCode: '',
                  isEnd: '1'
                }
              }).then((res) => {
                if (res.data.status === 'true') {
                  let data = res.data.data.rows
                  this.LoanComList = data
                  for (let n = 0, lens = data.length; n < lens; n++) {
                    this.delList.push({id: data[n].financeId, confirm: false})
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
            }, 100)
          })
        }, 800)
      }
    },
    components: {
      CheckIcon
    }
  }
</script>

<style type="text/less" lang="less" scoped>
  .Repayment {
    padding-bottom: 50px;
    box-sizing: border-box;
    background: #fff;
  }

  .Repay {
  }

  .topBox {
    padding: 20px 10px;
    background: transparent linear-gradient(to right, #33d474 0px, #1ac0a8 100%) repeat scroll 0% 0%;
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
        color: #13d679;
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

  .loanList {
    .loanLine {
      height: 30px;
      line-height: 30px;
      background: #f1f1f1;
      padding: 0 10px;
      span:last-child {
        float: right;
        margin-right: 5px;
        font-size: 14px;
        color: #999;
      }
    }
    .item {
      padding: 20px 10px;
      display: flex;
      height: 60px;
      line-height: 60px;
      border-bottom: 1px solid #ddd;
      .checkText {
        flex: 1;
        p {
          line-height: 30px;
          span:first-child {
            font-size: 14px;
          }
          span:last-child {
            color: #13d679;
            font-size: 18px;
            font-weight: 700;
          }
        }
        p:last-child {
          span {
            font-size: 14px;
            font-weight: 500;
            color: #333;
          }
        }
      }
      .checkIcon {
        flex: 0 0 70px;
        text-align: center;
        .vux-check-icon {
          height: 100%;
          width: 100%;
        }
      }
    }
  }
  .repayBtn {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px;
    line-height: 50px;
    border-top: 1px solid #ddd;
    .repayText {
      display: flex;
      & > p {
        flex: 1;
        padding-left: 10px;
      }
      button {
        flex: 0 0 120px;
        outline: none;
        border: none;
        background: #eee;
        color: #666;
        font-size: 16px;
      }
      button.light {
        background: #14D678;
        color: #fff;
      }
    }
  }

</style>
