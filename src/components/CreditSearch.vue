<template>
  <div class="CreditSearch">
    <pageTitle :title="title"></pageTitle>
    <div class="searchBox">
      <div class="searchText">
        <p>报告编号： 2017031100003723504439</p>
        <p>查询时间： {{nowTime}}</p>
        <p>报告时间： 2017-11-12 09:18:53</p>
        <p>真实姓名： {{userName}}</p>
        <p>证件类型： 身份证</p>
        <p>证件编号： 321025196705061613</p>
      </div>
      <div class="img">
        <img src="../assets/creditSearch.png">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        title: '征信查询',
        nowTime: '',
        userName: ''
      }
    },
    beforeCreate () {
      this.$nextTick(function () {
        let time = new Date()
        this.nowTime = `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()} ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`
        this.userName = window.localStorage.getItem('userName')
      })
    },
    methods: {},
    components: {}
  }
</script>

<style lang="less" type="text/less" scoped>
  .searchBox {
    padding: 20px 15px;
  }
  .searchText {
    padding: 0 5px;
    p {
      margin: 5px 0;
    }
  }
  .img {
    margin-top: 20px;
    img {
      width: 100%;
    }
  }
</style>
