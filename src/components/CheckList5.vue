<template>
  <div class="CheckList">
    <pageTitle class="getHeader" :title="title"></pageTitle>
    <div class="listBox">
      <div class="listItem">
        <div class="item">
          <h3>预计您可贷款金额</h3>
          <p class="noP" v-if="!loanShow">对不起，条件不满足!</p>
          <p v-else>350000 元</p>
        </div>
        <button class="goLoan" v-if="loanShow" @click="GoLoan">我要贷款</button>
        <div class="choose">
          <button @click="reRouter">重测</button>
          <button @click="nextDetail">完成</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { Checklist } from 'vux'

  export default {
    data () {
      return {
        title: '贷款评估',
        comList1: ['100亩以下', '200亩以下', '300亩以下', '300亩以上'],
        radioValue1: [],
        loanShow: false
      }
    },
    beforeCreate () {
      this.$nextTick(function() {
        let radioValue2 = window.localStorage.getItem('radioValue2').split(',')
        if (radioValue2.length === 4) {
          this.loanShow = true
        }
      })
    },
    created () {
    },
    mounted () {
    },
    methods: {
      reRouter () {
        this.$router.go(-4)
        window.localStorage.removeItem('radioValue2')
      },
      nextDetail () {
        this.$router.go(-5)
      },
      GoLoan () {
        this.$router.push('Loan')
      }
    },
    activated () {
    },
    deactivated () {
    },
    components: {
      Checklist
    }
  }
</script>

<style type="text/less" lang="less" scoped>
  .CheckList {
    width: 100%;
    background: #fff;
  }

  .listBox {
    padding: 20px 15px;
    .listItem {
      width: 100%;
      padding: 10px 10px 0;
      box-sizing: border-box;
      border: 1px solid #8aecdc;
      box-shadow: 0 0 2px #8aecdc;
      border-radius: 10px;
      .item {
        padding-bottom: 30px;
        text-align: center;
        h3 {
          color: #00bf30;
        }
        & > p {
          margin: 25px auto;
          height: 150px;
          width: 150px;
          line-height: 150px;
          border: 1px solid #00bf30;
          border-radius: 50%;
          color: #00bf30;
          font-size: 20px;
        }
        & > p.noP {
          font-size: 14px;
        }
      }
      .goLoan {
        width: 80%;
        height: 40px;
        line-height: 40px;
        margin: 0 auto;
        display: block;
        border: none;
        border-radius: 10px;
        outline: none;
        color: #fff;
        background: #00bf30;
        font-size: 18px;
      }
      .choose {
        padding-top: 40px;
        position: relative;
        height: 40px;
        line-height: 40px;
        button {
          width: 50%;
          height: 100%;
          float: left;
          line-height: 40px;
          border: none;
          outline: none;
          color: #00bf30;
          background: #fff;
          font-size: 18px;
        }
      }
    }
  }

  .showPage {
    & > div {
      box-sizing: border-box;
      background: #fff;
      padding: 20px 15px;
    }
  }

</style>
