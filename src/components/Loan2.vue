<template>
  <div class="loanPage">
    <pageTitle :title="title"></pageTitle>
    <LoanStep :loanStep="loanStep"></LoanStep>
    <div class="commitment">
      <h3>《无抵押贷款承诺函》</h3>
      <p>甲方: {{name}}</p>
      <p>甲方身份证: {{idCard}}</p>
      <p>乙方: 政策性农业贷款担保公司</p>
      <div class="content" :class="{'change':getMoreContent}">
        <p>{{content}}</p>
      </div>
      <div class="more" @click="getMore">
        <icon slot="icon" name="more" scale="2.5"></icon>
      </div>
    </div>
    <div class="tip">授权书手写签署</div>
    <div class="sign">
      <div v-if="!sign" class="signBox" @click="getUrl">
        <p>
          <icon solt="icon" name="pen" scale="2"></icon>
          <span>点击签名</span>
        </p>
      </div>
      <div v-else class="signImg" @click="getUrl">
        <img :src="sign">
      </div>
    </div>
    <div class="btn_wrap">
      <x-button type="primary" @click.native="upInfo">提交承诺书</x-button>
    </div>
  </div>
</template>

<script>
  import LoanStep from './common/LoanStep'
  import { XButton } from 'vux'

  export default {
    data () {
      return {
        title: '签署承诺书',
        loanStep: 2,
        name: '王长宝',
        idCard: '321283198707180230',
        bankCard: '5218990212361777',
        getMoreContent: true,
        commitmentId: '',
        sign: '',
        content: ''
      }
    },
    beforeCreate () {
      this.$nextTick(function () {
        this.$vux.loading.show({
          text: 'Loading'
        })
        let local = window.localStorage
        let userId = local.getItem('userId')
        let userName = local.getItem('userName')
        this.name = userName
        this.$http({
          method: 'get',
          timeout: 10000,
          url: `${this.$root.baseUrl}/finance/app/finance/loadFinanceCommitment.do`,
          params: {
            userId: userId
          }
        }).then((res) => {
          if (res.data.status === 'true') {
            let data = res.data.data
            this.content = data.content
            this.commitmentId = data.commitmentId
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
      })
    },
    mounted () {
      var _this = this
      window.getImgUrl = function (dataUrl) {
        _this.sign = dataUrl
      }
    },
    methods: {
      getMore () {
        this.getMoreContent = !this.getMoreContent
      },
      getUrl () {
        let local = window.localStorage
        let userId = local.getItem('userId')
        let u = navigator.userAgent
        if (u.indexOf('iPhone') > -1) {
          window.webkit.messageHandlers.toAddsign.postMessage(userId)
        } else {
          /* eslint-disable no-undef */
          toback.sign(userId)
        }
      },
      upInfo () {
        let local = window.localStorage
        let userId = local.getItem('userId')
        let applyMoney = local.getItem('applyMoney')
        let applyMonth = local.getItem('applyMonth')
        let applyReason = local.getItem('applyReason')
        let creditFormulaId = local.getItem('creditFormulaId')
        let creditMoney = local.getItem('creditMoney')
        let availableMoney = local.getItem('availableMoney')
        let sign = this.sign
        let commitmentId = this.commitmentId
        if (!sign) {
          this.$nextTick(function () {
            this.$vux.toast.show({
              text: '请签名！',
              type: 'text',
              width: '12em',
              position: 'middle'
            })
          })
          return false
        }
        let that = this
        this.$vux.confirm.show({
          title: '提示',
          content: '是否提交？',
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
              text: 'Loading'
            })
            that.$http({
              method: 'post',
              timeout: 10000,
              url: `${that.$root.baseUrl}/finance/app/finance/saveFinance.do`,
              params: {
                userId: userId,
                applyMoney: applyMoney,
                repayMode: '1', // 还款方式 1-到期还本息 0-其他
                month: applyMonth,
                financeUsages: applyReason,
                describes: '',
                sign: sign,
                commitmentId: commitmentId,
                creditFormulaId: creditFormulaId,
                creditMoney: creditMoney,
                availableMoney: availableMoney
              }
            }).then((res) => {
              if (res.data.status === 'true') {
                that.$vux.loading.hide()
                that.$vux.toast.show({
                  text: '提交成功！',
                  type: 'success',
                  onHide () {
                    that.$router.push('Loan3')
                  }
                })
              } else {
                let msg = res.data.msg
                that.$vux.loading.hide()
                that.$nextTick(function () {
                  that.$vux.toast.show({
                    text: msg,
                    type: 'text',
                    width: '12em',
                    position: 'middle'
                  })
                })
                return false
              }
            }).catch((e) => {
              that.$vux.loading.hide()
              that.$nextTick(function () {
                that.$vux.toast.show({
                  text: '网络错误！',
                  type: 'text',
                  width: '12em',
                  position: 'middle'
                })
              })
              return false
            })
          }
        })
      }
    },
    components: {
      LoanStep,
      XButton
    }
  }
</script>

<style type="text/less" lang="less" scoped>
  .loanPage {
    padding-bottom: 45px;
  }

  .commitment {
    background-color: #fff;
    padding: 20px 10px 30px;
    position: relative;
    h3 {
      text-align: center;
      font-size: 17px;
      margin-bottom: 5px;
    }
    & > p {
      font-size: 14px;
      margin-bottom: 5px;
    }
    .content {
      padding: 5px;
      height: 100px;
      overflow: hidden;
      transition: all ease-out 500ms;
      p {
        text-indent: 35px;
        white-space: normal;
      }
    }
    .content.change {
      height: auto;
      transition: all ease-out 500ms;
    }
    .more {
      position: absolute;
      bottom: 5px;
      left: 0;
      width: 100%;
      height: 24px;
      text-align: center;
      svg {
        display: inline-block;
        animation: upDown .8s linear 0s infinite alternate;
      }
    }
  }

  .tip {
    text-align: center;
  }

  .sign {
    background-color: #fff;
    padding: 10px;
    .signBox {
      border: 1px dashed #999;
      border-radius: 5px;
      height: 80px;
      text-align: center;
      p {
        color: #999;
        position: relative;
        height: 30px;
        margin-top: 25px;
        svg {
          position: absolute;
          left: 50%;
          top: 50%;
          height: 20px;
          width: 20px;
          margin-left: -45px;
          margin-top: -12px;
        }
        span {
          padding-left: 24px;
        }
      }
    }
    .signImg {
      text-align: center;
      border: 1px dashed #999;
      border-radius: 5px;
      height: 80px;
      line-height: 80px;
      img {
        height: 95%;
        vertical-align: middle;
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

  @keyframes upDown {
    form { transform: translate(0px, -15px) }
    to { transform: translate(0px, 5px) }
  }
</style>
