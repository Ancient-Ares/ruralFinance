<template>
  <div class="CheckList">
    <pageTitle class="getHeader" :title="title"></pageTitle>
    <div class="listBox">
      <div class="listItem">
        <checklist class="item" :title="('1. 您的主体类型是？')" :options="comList1" v-model="radioValue1" :max="1"></checklist>
        <div class="choose">
          <button @click="nextDetail">下一题</button>
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
        comList1: ['家庭农场', '种养大户', '合作社', '农业龙头企业', '其他'],
        radioValue1: [],
        show1: false,
        show2: false
      }
    },
    beforeCreate () {
    },
    created () {
    },
    mounted () {
    },
    methods: {
      nextDetail () {
        if (this.radioValue1.length > 0) {
          this.$router.push('CheckList2')
        }
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

<style type="text/less" lang="less">
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
        padding-bottom: 100px;
        .weui-cells {
          padding: 10px 0;
          .weui-cell {
            padding: 5px;
          }
        }
      }
      .choose {
        position: relative;
        height: 40px;
        line-height: 40px;
        button {
          width: 100%;
          height: 100%;
          display: block;
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
