<template>
  <div class="loanPage">
    <pageTitle :title="title"></pageTitle>
    <button @click="toggleShow">添加签名</button>
    <div v-transfer-dom>
      <popup v-if="show" v-model="show" position="right" width="100%" class="over">
        <sign></sign>
      </popup>
    </div>
  </div>
</template>

<script>
  import { TransferDom, Popup } from 'vux'
  import sign from './common/sign'

  export default {
    data () {
      return {
        title: '签名列表',
        show: false
      }
    },
    directives: {
      TransferDom
    },
    mounted () {
//      var _this = this
//      this.$router.beforeEach((to, from, next) => {
//        if (_this) {
//          _this.show = false
//          this.$vux.loading.hide()
//        } else {
//          next()
//        }
//      })
    },
    methods: {
      toggleShow () {
        this.show = !this.show
      }
    },
    components: {
      Popup,
      sign
    }
  }
</script>

<style type="text/less" lang="less" scoped>
  .over {
    overflow: hidden;
  }
</style>
