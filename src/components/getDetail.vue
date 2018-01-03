<template>
  <div class="getDetail">
    <pageTitle class="getHeader" :title="title"></pageTitle>
    <div class="detailbox">
      <div class="listItem">
        <div class="itemBox">
          <div class="itemImg">
            <img src="../assets/ava.jpg">
          </div>
          <div class="itemText">
            <h4 class="itemTitle">
              <span class="name">{{userName}}</span>
              <span class="score">
                <icon slot="icon" name="xin" scale="1.6"></icon>
                <span>300分</span>
            </span>
              <span class="time">{{applyTime}}</span>
            </h4>
            <p class="itemDesc">{{orgName}}</p>
          </div>
        </div>
        <div class="bills">
          <div class="billItem">
            <p><span>{{applyMoney}}</span>元</p>
            <h3>累计借款金额</h3>
          </div>
          <div class="billItem">
            <p><span>6</span>笔</p>
            <h3>成功借款</h3>
          </div>
          <div class="billItem">
            <p><span>0</span>笔</p>
            <h3>累计结清借款</h3>
          </div>
          <div class="billItem">
            <p><span>0</span>期</p>
            <h3>发生逾期</h3>
          </div>
        </div>
        <div class="itemMid">
          <div class="msg">
            <icon slot="icon" name="msg" scale="1.4"></icon>
            <span>有{{mu}}地，生产资金周转，收后还贷。</span>
          </div>
          <div class="info">
            <div class="interestRate">
              <p><span>5%</span></p>
              <h3>利率</h3>
            </div>
            <div class="month">
              <p><span>{{month}}</span> 月</p>
              <h3>期限</h3>
            </div>
            <div class="money">
              <p><span>{{applyMoney}}</span> 元</p>
              <h3>金额</h3>
            </div>
          </div>
          <div class="process">
            <p>{{state}}</p>
          </div>
          <div class="theWay">
            <p><span>还款方式：</span><span>{{repayMode === 1 ? '到期还本息' : '其它'}}</span></p>
          </div>
        </div>
        <div class="itemBot">
          <icon slot="icon" name="protect" scale="1.6"></icon>
          <span>泰州兴农担保公司担保</span>
        </div>
      </div>
    </div>
    <div class="botList">
      <a class="userInfo" href="javascript:;" @click="nextRouter('PersonInfo')">
        <div class="text"><span>借款人信息</span><span>查看</span></div>
      </a>
    </div>
    <div class="loanFlow">
      <h3>审核流程</h3>
      <div :class="checkColor(financeState)">
        <p><a>申 请</a></p>
        <span>{{financeState}}</span>
        <span>{{financeDate}}</span>
      </div>
      <a class="clickItem" :class="checkColor(firstApproveState)" href="javascript:;" @click="firstApprove">
        <p><a>初 审</a></p>
        <span>{{firstApproveState}}</span>
        <span>{{firstApproveDate}}</span>
      </a>
      <a class="clickItem" :class="checkColor(secondApproveState)" href="javascript:;" @click="secondApprove">
        <p><a>复 审</a></p>
        <span>{{secondApproveState}}</span>
        <span>{{secondApproveDate}}</span>
      </a>
      <a class="clickItem" :class="checkColor(guaranteeState)" href="javascript:;" @click="guarantee">
        <p><a>担 保</a></p>
        <span>{{guaranteeState}}</span>
        <span>{{guaranteeDate}}</span>
      </a>
      <a class="clickItem" :class="checkColor(bankLoanState)" href="javascript:;" @click="bankLoan">
        <p><a>放 贷</a></p>
        <span>{{bankLoanState}}</span>
        <span>{{bankLoanDate}}</span>
      </a>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        title: '贷款详情',
        applyMoney: 0,
        month: 0,
        applyTime: 0,
        mu: '0亩',
        repayMode: 1,
        userName: '',
        orgName: '',
        state: '',
        financeState: '',
        firstApproveState: '',
        secondApproveState: '',
        guaranteeState: '',
        bankLoanState: '',
        financeDate: '',
        firstApproveDate: '',
        secondApproveDate: '',
        guaranteeDate: '',
        bankLoanDate: '',
        firstApproveId: '',
        secondApproveId: '',
        guaranteeId: '',
        bankLoanId: ''
      }
    },
    beforeCreate () {
      this.$nextTick(function () {
        this.$vux.loading.show({
          text: 'Loading'
        })
        let local = window.localStorage
        let financeId = local.getItem('financeId')
        // 获取详情信息
        this.$http({
          method: 'get',
          timeout: 10000,
          url: `${this.$root.baseUrl}/finance/app/finance/showFinanceInfo.do`,
          params: {
            financeId: financeId
          }
        }).then((res) => {
          if (res.data.status === 'true') {
            let data = res.data.data
            this.applyMoney = data.applyMoney
            this.month = data.month
            this.applyTime = data.applyTime
            this.mu = data.scaleWithUnit
            this.repayMode = data.repayMode
            this.userName = data.userName
            this.orgName = data.orgName
            if (data.state === 1) {
              this.state = '申请发布'
            } else if (data.state === 2) {
              this.state = '已审核'
            } else if (data.state === 3) {
              this.state = '已复审'
            } else if (data.state === 4) {
              this.state = '已担保'
            } else if (data.state === 5) {
              this.state = '已放款'
            } else {
              this.state = '状态未知'
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
        // 查看审批进度
        this.$vux.loading.show({
          text: 'Loading'
        })
        this.$http({
          method: 'get',
          timeout: 10000,
          url: `${this.$root.baseUrl}/finance/app/finance/showFinanceSchedule.do`,
          params: {
            financeId: financeId
          }
        }).then((res) => {
          if (res.data.status === 'true') {
            let data = res.data.data
            this.checkState(data, 'financeState')
            this.checkState(data, 'firstApproveState')
            this.checkState(data, 'secondApproveState')
            this.checkState(data, 'guaranteeState')
            this.checkState(data, 'bankLoanState')
            this.financeDate = data.financeDate
            this.firstApproveDate = data.firstApproveDate
            this.secondApproveDate = data.secondApproveDate
            this.guaranteeDate = data.guaranteeDate
            this.bankLoanDate = data.bankLoanDate
            this.firstApproveId = data.firstApproveId
            this.secondApproveId = data.secondApproveId
            this.guaranteeId = data.guaranteeId
            this.bankLoanId = data.bankLoanId
            this.$vux.loading.hide()
          } else {
            this.$vux.loading.hide()
            this.$nextTick(function () {
              this.$vux.toast.show({
                text: '请求失败，返回重试！',
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
    created () {
      window.localStorage.removeItem('farmUserId')
      window.localStorage.removeItem('farmOrgId')
    },
    mounted () {
    },
    methods: {
      checkState (data, name) {
        if (data[name] === 0) {
          this[name] = '未完成'
        } else if (data[name] === 1) {
          this[name] = '已完成'
        } else if (data[name] === 2) {
          this[name] = '未通过'
        } else {
          this[name] = '结果未知'
        }
      },
      checkColor (state) {
        if (state === '已完成') {
          return 'successColor'
        } else if (state === '未通过') {
          return 'failColor'
        } else {
          return 'nomalColor'
        }
      },
      checkLocal () {
        let local = window.localStorage
        let userId = local.getItem('userId')
        let financeId = local.getItem('financeId')
        if (!userId || !financeId) {
          this.$nextTick(function () {
            this.$vux.toast.show({
              text: '未获取到信息,请退出重试！',
              type: 'text',
              width: '14em',
              position: 'middle'
            })
          })
          return false
        }
      },
      firstApprove () {
        this.checkLocal()
        let userType = window.localStorage.getItem('userType')
        if (userType === '1' && this.firstApproveState === '未完成') {
          this.$nextTick(function () {
            this.$vux.toast.show({
              text: '暂未初审无法查看',
              type: 'text',
              width: '14em',
              position: 'middle'
            })
          })
          return false
        }
        this.nextRouter('firstApprove', this.firstApproveId)
      },
      secondApprove () {
        this.checkLocal()
        let userType = window.localStorage.getItem('userType')
        if (userType === '1' && this.secondApproveState === '未完成') {
          this.$nextTick(function () {
            this.$vux.toast.show({
              text: '暂未复审无法查看',
              type: 'text',
              width: '14em',
              position: 'middle'
            })
          })
          return false
        }
        this.nextRouter('secondApprove', this.secondApproveId)
      },
      guarantee () {
        this.checkLocal()
        let userType = window.localStorage.getItem('userType')
        if (userType === '1' && this.guaranteeState === '未完成') {
          this.$nextTick(function () {
            this.$vux.toast.show({
              text: '暂未担保无法查看',
              type: 'text',
              width: '14em',
              position: 'middle'
            })
          })
          return false
        }
        this.nextRouter('guarantee', this.guaranteeId)
      },
      bankLoan () {
        this.checkLocal()
        let userType = window.localStorage.getItem('userType')
        if (userType === '1' && this.bankLoanState === '未完成') {
          this.$nextTick(function () {
            this.$vux.toast.show({
              text: '暂未放款无法查看',
              type: 'text',
              width: '14em',
              position: 'middle'
            })
          })
          return false
        }
        this.nextRouter('bankLoan', this.bankLoanId)
      },
      nextRouter (path, id) {
        let local = window.localStorage
        local.setItem(path + 'Id', id)
        this.$router.push(path)
      }
    },
    activated () {
    },
    deactivated () {
      this.$destroy()
    },
    components: {}
  }
</script>

<style type="text/less" lang="less" scoped>
  .getDetail {
    width: 100%;
    flex-direction: column;
    display: flex;
    background: #f1f5f9;
  }

  .getHeader {
    flex: 0 0 40px;
  }

  .bills {
    display: flex;
    margin: 5px -15px 10px -15px;
    & > div {
      color: #666;
      flex: 1;
      text-align: center;
      p {
        font-size: 12px;
        margin-bottom: 5px;
      }
      h3 {
        font-size: 14px;
      }
    }
  }

  .detailbox {
    padding: 10px 10px 0;
    border-bottom: 1px solid #ddd;
    background: #fff;
    margin-bottom: 10px;
    .listItem {
      position: relative;
      display: block;
      padding: 10px;
      .itemBox {
        width: 100%;
        height: 50px;
        display: flex;
        .itemImg {
          height: 40px;
          flex: 0 0 40px;
          img {
            width: 100%;
            border-radius: 50%;
          }
        }
        .itemText {
          font-size: 13px;
          margin-left: 10px;
          flex: 1;
          .itemTitle {
            font-weight: normal;
            line-height: 20px;
            .score {
              color: #666;
              margin-left: 5%;
              svg {
                position: relative;
                top: 2px;
              }
            }
            .time {
              float: right;
              color: #666;
              font-size: 10px;
            }
          }
          .itemDesc {
            width: 100%;
            color: #666;
          }
        }
      }
      .itemMid {
        border-top: 1px solid #ddd;
        border-bottom: 1px solid #ddd;
        margin: 0 -15px;
        padding: 0 15px;
        position: relative;
        min-height: 144px;
        .msg {
          font-size: 12px;
          line-height: 22px;
          margin: 5px 0;
          svg {
            position: relative;
            top: 2px;
          }
        }
        .info {
          width: 80%;
          margin: 15px 0;
          display: flex;
          & > div {
            text-align: center;
            & > h3 {
              font-size: 14px;
              margin-top: 5px;
            }
            & > p {
              span {
                font-size: 16px;
                color: #ff7300;
              }
            }
          }
          .interestRate {
            flex: 1;
          }
          .month {
            flex: 1;
          }
          .money {
            flex: 1;
          }
        }
        .process {
          position: absolute;
          right: 10px;
          top: 45px;
          width: 55px;
          height: 55px;
          line-height: 55px;
          border-radius: 50%;
          border: 1px solid #f2e1d7;
          text-align: center;
          background-color: #fff7f4;
          overflow: hidden;
          p {
            color: #f56767;
            font-size: 12px;
          }
          &.going, &.complete {
            line-height: 55px;
            p {
              height: 55px;
              margin: 0;
              span {
                color: #04be02;
              }
            }
          }
          &.complete {
            p {
              span {
                color: #c2aeae;
              }
            }
          }
        }
        .theWay {
          margin-bottom: 10px;
          font-size: 14px;
          span:last-child {
            color: #666;
          }
        }
      }
      .itemBot {
        height: 30px;
        line-height: 30px;
        font-size: 13px;
        color: #666;
        svg {
          position: relative;
          top: 2.5px;
        }
      }
    }
  }

  .botList {
    & > a {
      position: relative;
      display: block;
      height: 45px;
      line-height: 45px;
      border-top: 1px solid #ddd;
      border-bottom: 1px solid #ddd;
      background: #fff;
      margin-bottom: 10px;
      padding-left: 15px;
      color: #333;
      -webkit-tap-highlight-color: rgba(153, 153, 153, 0.1);
      .text {
        height: 100%;
        span:first-child {
          color: #333;
          float: left;
          font-size: 16px;
        }
        span:last-child {
          float: right;
          font-size: 14px;
          color: #666;
          margin-right: 30px;
        }
      }
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
        position: relative;
        top: -2px;
        position: absolute;
        top: 50%;
        margin-top: -4px;
        right: 15px;
      }
    }
  }

  .loanFlow {
    background-color: #fff;
    padding: 10px 15px;
    margin-bottom: 30px;
    padding-bottom: 30px;
    h3 {
      font-size: 16px;
      margin-bottom: 20px;
    }
    & > div, & > a {
      height: 40px;
      line-height: 40px;
      display: inline-block;
      padding: 5px 0;
      position: relative;
      display: flex;
      text-align: center;
      border-bottom: 1px solid #ddd;
      -webkit-tap-highlight-color: rgba(153, 153, 153, 0.1);
      p {
        flex: 0 0 100px;
        position: relative;
        overflow: visible;
        a {
          width: 80%;
          height: 30px;
          line-height: 28px;
          box-sizing: border-box;
          display: inline-block;
          font-size: 14px;
          border-radius: 6px;
          color: #fff;
          background-color: #18b5ff;
          border: 1px solid #18b5ff;
        }
      }
      &:last-child p:after {
        display: none;
      }
      span {
        flex: 1;
        font-size: 14px;
      }
      span:last-child {
        position: relative;
        color: #333;
        &:after {
          content: ' ';
          display: inline-block;
          height: 6px;
          width: 6px;
          border-width: 2px 2px 0 0;
          border-color: #c8c8cd;
          border-style: solid;
          -webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
          transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
          position: relative;
          top: -2px;
          position: absolute;
          top: 50%;
          margin-top: -4px;
          right: 0;
        }
      }
      &.successColor {
        p {
          a {
            background-color: #42b983;
            border: 1px solid #42b983;
          }
        }
        span {
          color: #42b983
        }
      }
      &.failColor {
        p {
          a {
            background-color: #ff6750;
            border: 1px solid #ff6750;
          }
        }
        span {
          color: #ff6750
        }
      }
    }
    & > div span:last-child:after {
      display: none;
    }
  }

</style>
