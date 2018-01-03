<template>
  <div class="CheckList">
    <pageTitle class="getHeader" :title="title"></pageTitle>
    <div class="listBox">
      <div class="listItem">
        <checklist class="item" :title="('2. 您满足以下哪些条件？')" :options="comList1" v-model="radioValue1" :max="4"></checklist>
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
        comList1: ['本地常住人口、有一定资产', '有信用、无不良信用', '在泰州有50亩以上承包或流转土地规模', '有真实的用于农业生产的用款需求'],
        radioValue1: [],
        show1: false
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
          window.localStorage.setItem('radioValue2', this.radioValue1)
          this.$router.push('CheckList3')
        }
      }
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
        padding-bottom: 100px;
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
