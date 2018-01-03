<template>
  <div class="draw">
    <canvas id="canvas" width="220" height="220">额度:{{quota}}</canvas>
    <canvas id="canvasText" width="150" height="150"></canvas>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: ['quota', 'canLoan'],
    data () {
      return {}
    },
    mounted () {
      this.run()
    },
    watch: {
      quota (val, oldVal) {
        this.run()
      }
    },
    methods: {
      run () {
        if (this.quota < 500) {
          this.$nextTick(function () {
            let canvas = document.getElementById('canvas')
            let ctx = canvas.getContext('2d')
            // 绘制外环
            ctx.beginPath()
            ctx.arc(110, 110, 100, 0, Math.PI * 2, true)
            ctx.strokeStyle = '#F8FAFB'
            ctx.lineWidth = '3'
            ctx.stroke()
            ctx.closePath()
            // 绘制内环
            ctx.beginPath()
            ctx.arc(110, 110, 85, 0, Math.PI * 2, true)
            ctx.strokeStyle = '#F8FAFB'
            ctx.lineWidth = '12'
            ctx.stroke()
            ctx.closePath()
            // 文字
            ctx.beginPath()
            ctx.fillStyle = '#ddd'
            ctx.font = '18px bold'
            ctx.textAlign = 'center'
            ctx.fillText('暂无可用额度', 110, 115)
            ctx.closePath()
          })
        } else {
          this.$nextTick(function () {
            let canvas = document.getElementById('canvas')
            let canvasText = document.getElementById('canvasText')
            let ctx = canvas.getContext('2d')
            let ctxText = canvasText.getContext('2d')
            // 绘制外环
            ctx.beginPath()
            var gradient = ctx.createLinearGradient(0, 110, 220, 110)
            gradient.addColorStop(0, 'rgba(1,255,183,0.9)')
            gradient.addColorStop(0.4, 'rgba(30,224,203,0.9)')
            gradient.addColorStop(1, 'rgba(21,195,224,0.9)')
            ctx.arc(110, 110, 90, 0, 2 * Math.PI, true)
            ctx.fillStyle = gradient
            ctx.fill()
            ctx.restore()
            ctx.closePath()
            // 绘制内环
            ctxText.beginPath()
            ctxText.arc(75, 75, 75, 0, Math.PI * 2, true)
            ctxText.fillStyle = '#fff'
            ctxText.fill()
            ctxText.restore()
            ctxText.closePath()
            // 文字1
            ctxText.beginPath()
            ctxText.fillStyle = '#000'
            ctxText.font = '28px bold'
            ctxText.textAlign = 'center'
            ctxText.fillText(`¥${this.quota}`, 75, 60)
            ctxText.closePath()
            // 文字2
            ctxText.beginPath()
            ctxText.fillStyle = '#000'
            ctxText.font = '14px bold'
            ctxText.textAlign = 'center'
            ctxText.fillText('可用额度', 75, 85)
            ctxText.closePath()
//             文字3
            ctxText.beginPath()
            ctxText.fillStyle = '#999'
            ctxText.font = '12px bold'
            ctxText.textAlign = 'center'
            ctxText.fillText(`授信总额: ¥${this.canLoan}`, 75, 110)
            ctxText.closePath()
          })
        }
      }
    },
    components: {}
  }
</script>

<style type="text/less" lang="less" scoped>
  .draw {
    width: 100%;
    text-align: center;
    position: relative;
    height: 210px;
    #canvas {
      position: absolute;
      top: 0;
      left: 50%;
      margin-left: -110px;
    }
    #canvasText {
      position: absolute;
      top: 35px;
      left: 50%;
      margin-left: -75px;
    }
  }

</style>

