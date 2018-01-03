<template>
  <div class="firstApprove">
    <pageTitle class="getHeader" :title="title"></pageTitle>
    <div class="firstApproveBox">
      <div class="approveInfo" v-if="!showBtn">
        <p class="line">审批信息</p>
        <div class="approveMan">
          <p><span>审批人:</span><span>{{approveMan}}</span></p>
        </div>
        <div class="approveOrg">
          <p><span>审批组织:</span><span>{{approveOrg}}</span></p>
        </div>
        <div class="approveTime">
          <p><span>审批时间:</span><span>{{approveTime}}</span></p>
        </div>
      </div>
      <p class="line">审批人意见</p>
      <div class="approveAdvance" :class="{'noClick':!showBtn}">
        <x-textarea class="advanceText" v-model="advanceText" placeholder="必填" :show-counter="false" :rows="3"></x-textarea>
      </div>
      <p class="line">审批人签名</p>
      <div class="sign" :class="{'noClick':!showBtn}">
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
    </div>
    <div class="upBtn" v-if="showBtn && userType!=='1'">
      <button class="noApprove" @click="upApprove(false)">不通过</button>
      <button class="goApprove" @click="upApprove(true)">通过</button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { XTextarea } from 'vux'
  export default {
    data () {
      return {
        title: '贷款复审',
        sign: '',
        advanceText: '',
        showBtn: true,
        approveMan: '',
        approveOrg: '',
        approveTime: '',
        userType: '2'
      }
    },
    beforeCreate () {
      this.$nextTick(function () {
        this.$vux.loading.show({
          text: 'Loading'
        })
        let local = window.localStorage
        let secondApproveId = local.getItem('secondApproveId')
        this.userType = local.getItem('userType')
        if (!secondApproveId) {
          this.$vux.loading.hide()
          return false
        }
        // 获取详情信息
        this.$http({
          method: 'get',
          timeout: 10000,
          url: `${this.$root.baseUrl}/finance/app/approve/showSecondApprove.do`,
          params: {
            secondApproveId: secondApproveId
          }
        }).then((res) => {
          if (res.data.status === 'true') {
            this.showBtn = false
            let data = res.data.data
            this.sign = data.sign
            this.advanceText = data.describes
            this.approveMan = data.userName
            this.approveOrg = data.orgName
            this.approveTime = data.approveTime
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
    created () {
    },
    mounted () {
      var _this = this
      window.getImgUrl = function (dataUrl) {
        _this.sign = dataUrl
      }
    },
    methods: {
      getUrl () {
        let u = navigator.userAgent
        if (u.indexOf('iPhone') > -1) {
          window.webkit.messageHandlers.toAddsign.postMessage('')
        } else {
          /* eslint-disable no-undef */
          toback.noUserSign()
        }
      },
      upApprove (checkApprove) {
        let state = 1
        if (!checkApprove) {
          state = 2
        }
        let local = window.localStorage
        let userId = local.getItem('userId')
        let financeId = local.getItem('financeId')
        let userType = local.getItem('userType')
        if (parseFloat(userType) !== 3) {
          this.$nextTick(function () {
            this.$vux.toast.show({
              text: '当前登录人员无复审权限！',
              type: 'text',
              width: '14em',
              position: 'middle'
            })
          })
          return false
        }
        let sign = this.sign
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
        let advanceText = this.advanceText
        if (!advanceText) {
          this.$nextTick(function () {
            this.$vux.toast.show({
              text: '请填写审批意见！',
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
              url: `${that.$root.baseUrl}/finance/app/approve/submitSecondApprove.do`,
              params: {
                userId: userId,
                financeId: financeId,
                sign: sign,
                describes: advanceText,
                state: state
              }
            }).then((res) => {
              if (res.data.status === 'true') {
                that.$vux.loading.hide()
                that.$vux.toast.show({
                  text: '提交成功！',
                  type: 'success',
                  onHide () {
                    that.$router.go(-1)
                  }
                })
              } else {
                that.$vux.loading.hide()
                let msg = res.data.msg
                that.$nextTick(function () {
                  that.$vux.toast.show({
                    text: msg,
                    type: 'text',
                    width: '14em',
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
      },
      nextRouter (path) {
        this.$router.push(path)
      }
    },
    activated () {
    },
    deactivated () {
      this.$destroy()
    },
    components: {
      XTextarea
    }
  }
</script>

<style type="text/less" lang="less" scoped>
  .firstApprove {
    height: 100%;
    width: 100%;
    flex-direction: column;
    display: flex;
    background: #f1f5f9;
    .firstApproveBox {
      background-color: #fff;
    }
    .approveAdvance {
      padding: 10px;
      & > div {
        border: 1px solid #ddd;
        border-radius: 5px;
        .advanceText {
          textarea {
            font-size: 12px;
          }
        }
      }
    }
  }

  .getHeader {
    flex: 0 0 40px;
  }
  .approveInfo {
    & > p {
    }
    & > div {
      padding: 5px 0 5px 15px;
      border-bottom: 1px solid #ddd;
      span {
        display: inline-block;
        font-size: 14px;
      }
      span:first-child {
        color: #333;
        width: 90px;
      }
      span:last-child {
        color: #666;
      }
    }
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

  .upBtn {
    display: flex;
    margin: 50px auto 0 auto;
    width: 100%;
    button {
      flex: 1;
      margin: 0 10px;
      height: 40px;
      border-radius: 20px;
      line-height: 40px;
      color: #fff;
      font-size: 16px;
      outline: none;
      border: none;
      background-color: #07dd84;
    }
    .noApprove {
      background-color: #ff6750;
    }
  }

  .noClick {
    pointer-events: none;
    cursor: default;
  }
</style>
