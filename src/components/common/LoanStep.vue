<template>
  <div class="topStep">
    <div class="loanStep">
      <div class="point" :class="{'doing':loanStep>0}"></div>
      <div class="line" :class="{'doing':loanStep>1}"></div>
      <div class="point" :class="{'doing':loanStep>=2}"></div>
      <div class="line" :class="{'doing':loanStep>2}"></div>
      <div class="point" :class="{'doing':loanStep === 3}"></div>
    </div>
    <div class="stepTitle">
      <p :class="{'doing':loanStep>0}">借款申请</p>
      <p :class="{'doing':loanStep>1}">签署承诺书</p>
      <p :class="{'doing':loanStep>2}">提交审核</p>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      loanStep: {
        type: Number,
        default: 1
      }
    },
    data () {
      return {}
    },
    components: {}
  }
</script>

<style type="text/less" lang="less" scoped>
  .topStep {
    padding: 10px;
    background-color: #1ecc6e;
    .loanStep {
      display: flex;
      width: 90%;
      margin-left: 5%;
      .point {
        flex: 0 0 12px;
        height: 12px;
        border-radius: 50%;
        background-color: #8ee5b6;
      }
      .point.doing {
        background-color: #fff;
      }
      .line {
        flex: 1;
        height: 2px;
        margin-top: 4px;
        background-color: #67dc9d;
      }
      .line.doing {
        background-color: #fff;
      }
    }
    .stepTitle {
      display: flex;
      margin-top: 10px;
      p {
        text-align: center;
        flex: 1;
        color: #67dc9d;
        font-size: 14px;
      }
      p.doing {
        color: #fff;
      }
      p:nth-child(1) {
        text-align: left;
      }
      p:nth-child(3) {
        text-align: right;
      }
    }
  }

</style>

