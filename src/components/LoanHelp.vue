<template>
  <div class="LoanHelp">
    <pageTitle :title="title"></pageTitle>
    <div class="img">
      <img src="../assets/loanHelp.jpg" alt="贷款指南">
    </div>
  </div>
</template>
<script>

  export default {
    data () {
      return {
        title: '贷款指南'
      }
    },
    mounted () {
    },
    methods: {
    },
    activated () {
    }
  }
</script>
<style type="text/less" lang="less" scoped>
  .img {
    padding: 0 0 50px 0;
    img {
      width: 100%;
      display: block;
      margin: 0 auto;
    }
  }
</style>
