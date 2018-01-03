<template>
  <div class="InfoPage">
    <pageTitle :title="title"></pageTitle>
    <div class="infoList">
      <div class="gridItem" @click="nextRouter('PerAuth')">
        <p>个人信息</p>
        <div class="vIf" v-if="userCheck">
          <p>认证成功</p>
        </div>
        <div class="vElse" v-else>
          <p>请完善信息</p>
        </div>
      </div>
      <div class="gridItem" @click="nextRouter('Production')">
        <p>生产信息</p>
        <div class="vIf" v-if="productionCheck">
          <p>认证成功</p>
        </div>
        <div class="vElse" v-else>
          <p>请完善信息</p>
        </div>
      </div>
      <div class="gridItem" @click="nextRouter('IdCard')">
        <p>身份证</p>
        <div class="vIf" v-if="idCardCheck">
          <p>认证成功</p>
        </div>
        <div class="vElse" v-else>
          <p>请完善信息</p>
        </div>
      </div>
      <div class="gridItem" @click="nextRouter('OneCardList')">
        <p>一卡通</p>
        <div class="vIf" v-if="bankCardCheck">
          <p>认证成功</p>
        </div>
        <div class="vElse" v-else>
          <p>请完善信息</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    data () {
      return {
        title: '资料认证',
        userCheck: false,
        productionCheck: false,
        idCardCheck: false,
        bankCardCheck: false
      }
    },
    beforeCreate () {
      this.$nextTick(function () {
        this.$vux.loading.show({
          text: 'Loading'
        })
        let local = window.localStorage
        let userId = local.getItem('userId')
        this.$http({
          method: 'get',
          timeout: 10000,
          url: `${this.$root.baseUrl}/finance/app/certification/verifyCreditInfoAndMoney.do`,
          params: {
            userId: userId
          }
        }).then((res) => {
          if (res.data.status === 'true') {
            let data = res.data.data
            if (data.isAuthForPersonalInfo) {
              this.userCheck = true
            }
            if (data.isAuthForProductionInfo) {
              this.productionCheck = true
            }
            if (data.isAuthForSfzCard) {
              this.idCardCheck = true
            }
            if (data.isAuthForBankCard) {
              this.bankCardCheck = true
            }
            this.$vux.loading.hide()
          } else {
            this.$vux.loading.hide()
            let msg = res.data.msg
            this.$nextTick(function () {
              this.$vux.toast.show({
                text: msg,
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
    },
    created () {
    },
    methods: {
      nextRouter (path) {
        this.$router.push(path)
      }
    },
    components: {}
  }
</script>

<style type="text/less" lang="less" scoped>
  .infoList {
    padding: 30px 0;
    .gridItem {
      height: 80px;
      width: 70%;
      margin: 0 auto;
      padding: 5px 0;
      text-align: center;
      border: 1px solid #ddd;
      border-radius: 15px;
      margin-bottom: 20px;
      & > p {
        margin-top: 15px;
        font-size: 16px;
        font-weight: 600;
      }
      .vIf {
        p:first-child {
          text-align: center;
          margin: 0 auto;
          color: #04BE02;
          position: relative;
          width: 90px;
          padding-left: 10px;
          font-size: 14px;
          &:before {
            content: url(../assets/correct.png);
            position: absolute;
            top: 3px;
            left: 6px;
          }
        }
        p:last-child {
          color: #000;
        }
      }
      .vElse {
        p{
          text-align: center;
          margin: 0 auto;
          color: #666;
          position: relative;
          width: 100px;
          padding-left: 10px;
          font-size: 14px;
          &:before {
            content: url(../assets/wen.png);
            position: absolute;
            top: 3px;
            left: 6px;
          }
        }
      }
    }
  }

</style>
