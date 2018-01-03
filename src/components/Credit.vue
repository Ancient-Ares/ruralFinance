<template>
  <div class="CreditPage">
    <pageTitle class="getHeader" :title="title"></pageTitle>
    <div class="CreditAll">
      <div class="creditBox">
        <canvasCredit class="creditCom" :number="number"></canvasCredit>
      </div>
    </div>
  </div>
</template>

<script>
  import canvasCredit from './common/CanvasCredit.vue'

  export default {
    data () {
      return {
        title: '信用分',
        number: 600
      }
    },
    computed: {},
    mounted () {
    },
    activated () {
      console.log('activated')
    },
    deactivated () {
      console.log('deactivated')
    },
    methods: {},
    components: {
      canvasCredit
    }
  }
</script>
<style scoped lang="less" type="text/less">
  .CreditPage {
    height: 100%;
    width: 100%;
    flex-direction: column;
    display: flex;
    overflow: hidden;
  }

  .getHeader {
    flex: 0 0 40px;
  }
  .CreditAll {
    flex: 1;
    background: -moz-linear-gradient(rgba(14, 135, 241, 0.8), rgba(32, 245, 188, 0.8));
    background: -o-linear-gradient(rgba(14, 135, 241, 0.8), rgba(32, 245, 188, 0.8));
    background: -webkit-gradient(rgba(14, 135, 241, 0.8), rgba(32, 245, 188, 0.8));

    background: linear-gradient(rgba(14, 135, 241, 0.8), rgba(32, 245, 188, 0.8));
    position: relative;
  }


  .creditBox {
    width: 357px;
    height: 250px;
    position: absolute;
    left: 50%;
    overflow: hidden;
    transform: translate(-50%, 0);
  }

</style>
