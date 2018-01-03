<template>
  <div class="topStep">
    <step v-model="step" gutter="10px">
      <step-item :title="('资料认证')"></step-item>
      <step-item :title="('借贷设置')"></step-item>
      <step-item :title="('提交审核')"></step-item>
    </step>
  </div>
</template>

<script>
  import { Step, StepItem } from 'vux'

  export default {
    props: {
      step: Number
    },
    data () {
      return {
      }
    },
    components: {
      Step,
      StepItem
    }
  }
</script>

<style type="text/less" lang="less">
  .topStep {
    padding: 10px;
    background-color: #e5fdff;
    .vux-step-item-main {
      padding-left: 10px;
    }
    .vux-step-item-main, .vux-step-item-main-process {
      background-color: #e5fdff!important;
    }
    .vux-step-item-main-process {
      color: #1ECC6E;
    }
  }
</style>

