<template>
  <div>
    <div class="top">
      <div class="title">
        <div @click="toBack">
          <icon slot="icon" name="left" scale="2.4" class="titleIcon"></icon>
        </div>
        <p>详情页面</p>
      </div>
      <div class="bgImg">
        <img src="https://static.vux.li/demo/3.jpg" alt="bgImg">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {}
    },
    methods: {
      toBack () {
        this.$parent.show = false
      }
    },
    components: {}
  }
</script>
<style lang="less" type="text/less" scoped>
  .top {
    position: relative;
    padding-top: 100%;
    width: 100%;
    .title {
      position: absolute;
      top: 0;
      left: 0;
      height: 40px;
      width: 100%;
      z-index: 50;
      color: #fff;
      border-bottom: 1px solid #ddd;
      overflow: hidden;
      div, p {
        float: left;
        line-height: 40px;
      }
      div {
        width: 40px;
        height: 40px;
        position: relative;
        text-align: center;
        svg{
          display: inline-block;
          vertical-align: middle;
        }
      }
      p {
        font-size: 14px;
        margin-left: 20px;
        &:before {
          content: "";
          width: 1px;
          height: 30px;
          display: inline-block;
          background: #fff;
          position: absolute;
          left: 45px;
          top: 5px;
        }
      }
    }
    .bgImg {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      img {
        height: 100%;
        width: 100%;
      }
    }
  }
</style>
