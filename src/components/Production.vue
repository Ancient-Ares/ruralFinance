<template>
  <div class="ProductionPage">
    <pageTitle :title="title"></pageTitle>
    <div class="proList">
      <div class="pro1" @click="nextRouter('Farm')">
        <h2>农场信息</h2>
        <div class="vIf" v-if="Info1">
          <p>认证成功</p>
        </div>
        <div class="vElse" v-else>
          <p>请完善信息</p>
        </div>
      </div>
      <div class="pro2" @click="nextRouter('Contract')">
        <h2>承包合同</h2>
        <div class="vIf" v-if="Info2">
          <p>认证成功</p>
        </div>
        <div class="vElse" v-else>
          <p>请完善信息</p>
        </div>
      </div>
      <div class="pro3" @click="nextRouter('BusLicense')">
        <h2>营业执照</h2>
        <div class="vIf" v-if="Info3">
          <p>认证成功</p>
        </div>
        <div class="vElse" v-else>
          <p>请完善信息</p>
        </div>
      </div>
    </div>
    <!--<button class="goInfo highlight" :class="{'highlight':Info1 && Info2 && Info3}" @click.native="prevStep">返回</button>-->
    <!--<p class="tips"><span><img src="../assets/safe.png" alt="safe"></span><span>信息安全&隐私保障</span></p>-->
  </div>
</template>

<script>

  export default {
    data () {
      return {
        title: '生产信息',
        Info1: false,
        Info2: false,
        Info3: false
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
          url: `${this.$root.baseUrl}/finance/app/certification/verifyCreditInfo.do`,
          params: {
            userId: userId
          }
        }).then((res) => {
          if (res.data.status === 'true') {
            let data = res.data.data
            this.Info1 = data.isAuthForProductionInfoFarm
            this.Info2 = data.isAuthForProductionInfoLand
            this.Info3 = data.isAuthForProductionInfoBusiness
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
    },
    created () {
    },
    methods: {
      nextRouter (path) {
        this.$router.push(path)
      },
      prevStep () {
        this.$router.go(-1)
      }
    },
    components: {}
  }
</script>

<style type="text/less" lang="less" scoped>
  .ProductionPage {
    padding-top: 40px;
    background: #fff;
  }
  .proList {
    text-align: center;
    & > div {
      display: inline-block;
      width: 70%;
      height: 80px;
      padding: 5px 0;
      margin-bottom: 20px;
      border: 1px solid #ddd;
      border-radius: 15px;
      & > div {
        margin-top: 10px;
      }
      h2 {
        font-size: 16px;
        margin-top: 5px;
      }
      p{
        font-size: 14px;
      }
      .vIf {
        p:first-child {
          text-align: center;
          margin: 0 auto;
          color: #04BE02;
          position: relative;
          width: 90px;
          padding-left: 10px;
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

  .goInfo {
    margin: 50px auto 0 auto;
    width: 80%;
    display: block;
    height: 40px;
    border-radius: 20px;
    line-height: 40px;
    color: #fff;
    font-size: 16px;
    outline: none;
    border: none;
    background: #999;
  }
  .highlight {
    background-color: #07dd84;
  }

  .tips {
    text-align: center;
    line-height: 30px;
    span {
      display: inline-block;
      height: 30px;
      font-size: 14px;
      color: #dbdbdb;
      margin-right: 5px;
      img {
        vertical-align: middle;
        width: 14px;
        margin-top: -3px;
      }
    }
  }
</style>
