<template>
  <div class="topHeight">
    <header class="header">
      <div class="left" @click="goBack"></div>
      <h1>{{title}}</h1>
    </header>
  </div>
</template>

<script>
  export default {
    props: ['title'],
    data () {
      return {}
    },
    created () {
      var _this = this
      window.routerBack = function () {
        _this.$router.back()
      }
    },
    methods: {
      goBack () {
        window.history.go(-1)
//        var u = navigator.userAgent
//        if (u.indexOf('iPhone') > -1) {
//          window.webkit.messageHandlers.toback.postMessage(null)
//        } else {
//          /* eslint-disable no-undef */
//          toback.back()
//        }
      }
    }
  }
</script>

<style type="text/less" lang="less" scoped>
  .topHeight {
    height: 40px;
    width: 100%;
    overflow: hidden;
    position: relative;
  }

  .header {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9;
    height: 40px;
    width: 100%;
    background: #fff;
    border-bottom: 1px solid #eee;
    display: flex;
    .left {
      flex: 0 0 40px;
      height: 40px;
      position: relative;
      &:after {
        content: " ";
        height: 8px;
        width: 8px;
        border-width: 2px 2px 0 0;
        border-color: #42b983;
        border-style: solid;
        -webkit-transform: matrix(-0.71, 0.71, 0.71, 0.71, 0, 0);
        transform: matrix(-0.71, 0.71, 0.71, 0.71, 0, 0);
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -4px;
        margin-left: -4px;
      }
    }
    h1 {
      color: #303030;
      font-size: 17px;
      font-weight: 500;
      line-height: 40px;
      text-align: center;
      box-sizing: border-box;
      flex: 1;
      text-indent: -40px;
    }
  }
</style>
