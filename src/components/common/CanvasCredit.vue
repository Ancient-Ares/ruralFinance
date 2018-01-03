<template>
  <div id="container">
    <div id="clockBox">
      <canvas id="clock" width="550px" height="568px"></canvas>
      <canvas id="pointer" width="550px" height="568px"></canvas>
      <canvas id="number" width="550px" height="568px"></canvas>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      number: Number
    },
    data () {
      return {}
    },
    mounted () {
      var _this = this
      var canvas = document.getElementById('clock')
      var ctx = canvas.getContext('2d')
      // 绘制外环
      ctx.beginPath()
      ctx.arc(275, 330, 184, 30 / 180 * Math.PI, 150 / 180 * Math.PI, true)
      ctx.strokeStyle = '#fff'
      ctx.lineWidth = '3'
      ctx.stroke()
      ctx.closePath()
      // 绘制内环
      ctx.beginPath()
      ctx.arc(275, 330, 150, 30 / 180 * Math.PI, 150 / 180 * Math.PI, true)
      ctx.strokeStyle = '#fff'
      ctx.lineWidth = '12'
      ctx.stroke()
      ctx.closePath()
      ctx.translate(275, 330)
      // 绘制刻度
      for (var i = 0; i < 16; i++) {
        if (i % 6 === 3) {
          ctx.beginPath()
          ctx.lineWidth = '2'
          ctx.strokeStyle = '#1ff8de'
          ctx.moveTo(144 * Math.sin(7.5 * i / 180 * Math.PI), -144 * Math.cos(7.5 * i / 180 * Math.PI))
          ctx.lineTo(156 * Math.sin(7.5 * i / 180 * Math.PI), -156 * Math.cos(7.5 * i / 180 * Math.PI))
          ctx.moveTo(-144 * Math.sin(7.5 * i / 180 * Math.PI), -144 * Math.cos(7.5 * i / 180 * Math.PI))
          ctx.lineTo(-156 * Math.sin(7.5 * i / 180 * Math.PI), -156 * Math.cos(7.5 * i / 180 * Math.PI))
          ctx.stroke()
          ctx.closePath()
        } else {
          ctx.beginPath()
          ctx.lineWidth = '1'
          ctx.strokeStyle = '#1ff8de'
          ctx.moveTo(150 * Math.sin(7.5 * i / 180 * Math.PI), -150 * Math.cos(7.5 * i / 180 * Math.PI))
          ctx.lineTo(156 * Math.sin(7.5 * i / 180 * Math.PI), -156 * Math.cos(7.5 * i / 180 * Math.PI))
          ctx.moveTo(-150 * Math.sin(7.5 * i / 180 * Math.PI), -150 * Math.cos(7.5 * i / 180 * Math.PI))
          ctx.lineTo(-156 * Math.sin(7.5 * i / 180 * Math.PI), -156 * Math.cos(7.5 * i / 180 * Math.PI))
          ctx.stroke()
          ctx.closePath()
        }
      }
      // 绘制文本
      var total = [350, '一般', 550, '中等', 600, '良好', 650, '优秀', 700, '极好', 950]
      ctx.font = ''
      ctx.fillStyle = '#fff'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'bottom'
      ctx.rotate((-7.5 * 15) / 180 * Math.PI)
      for (let i = 0; i < 11; i++) {
        ctx.fillStyle = i % 2 ? '#f4f4f4' : '#1ff8de'
        ctx.fillText(total[i], 0, -125)
        ctx.rotate((7.5 * 3) / 180 * Math.PI)
      }
      ctx.rotate(-7.5 * 18 / 180 * Math.PI)
      ctx.fillStyle = '#fff'
      ctx.font = '14px normal'
      //        ctx.fillText('BETA', 0, -60);
      //        ctx.font = '14px normal';
      // 获取当前日期
      var date = new Date()
      var ymd = date.getFullYear() + '.' + (date.getMonth() + 1) + '.' + date.getDate()
      ctx.fillText('评估时间 : ' + ymd, 0, 45)
      ctx.font = '45px bold'

      // 绘制球和文字
      var pointer = document.getElementById('pointer')
      var ctxPoint = pointer.getContext('2d')
      // 绘制数字
      var number = document.getElementById('number')
      var ctxNum = number.getContext('2d')

      function run (inputValue) {
        var timer
        var i = 0
        ctxPoint.translate(275, 330)
        ctxPoint.font = '20px bold'
        ctxPoint.textAlign = 'center'
        // 设置最终的值
        var finalValue = inputValue
        var value = 0
        // 根据值的大小确定应该到达的位置
        if (finalValue < 550) {
          value = (finalValue - 316.7) * 0.225
        } else if (finalValue < 700) {
          value = (finalValue - 550) * 0.9 + 52.5
        } else {
          value = finalValue > 1000 ? 1000 : finalValue
          value = (value - 700) * 0.18 + 187.5
        }
        var evluate = ''
        if (inputValue < 550) {
          evluate = '一般'
        } else if (inputValue < 600) {
          evluate = '中等'
        } else if (inputValue < 650) {
          evluate = '良好'
        } else if (inputValue < 700) {
          evluate = '优秀'
        } else {
          evluate = '极好'
        }

        // 所有的动画事件
        function slideValue () {
//                ctxPoint.translate(-275, -330);
//                ctxPoint.clearRect(0, 0, pointer.width, pointer.height);
//                ctxPoint.translate(275, 330);
          ctxPoint.translate(0, 0)
          ctxNum.clearRect(0, 0, number.width, number.height)
          i++
          ctxPoint.beginPath()

          var ga = Math.PI / 4.8
          var gd = [
            550 / 2 * (1 - Math.cos(ga)), // x0
            600 / 2 * (1 + Math.sin(ga)), // y0
            550 / 2 * (1 + Math.cos(ga)), // x1
            600 / 2 * (1 - Math.sin(ga))  // y1
          ]
          var linearGradient = ctxPoint.createLinearGradient.apply(ctxPoint, gd)
          linearGradient.addColorStop(0, '#e0090c')
          linearGradient.addColorStop(0.25, '#ec7553')
          linearGradient.addColorStop(0.5, '#e7db69')
          linearGradient.addColorStop(0.75, '#7de254')
          linearGradient.addColorStop(1, '#02ed0f')
          ctxPoint.arc(-169 * Math.sin((i + 60) / 180 * Math.PI), 169 * Math.cos((i + 60) / 180 * Math.PI), 10, 0, 2 * Math.PI, true)
          ctxPoint.fillStyle = linearGradient
          ctxPoint.fill()
          ctxPoint.restore()
          var text = 0
          if (i < 52.5) {
            text = i / 0.225 + 316.7
          } else if (i < 187.5) {
            text = (i - 52.5) / 0.9 + 550
          } else {
            text = (i - 187.5) / 0.18 + 700
            text = text > 1000 ? 1000 : text
          }
          text = text > inputValue ? inputValue : text

          ctxNum.fillStyle = '#fff'
          ctxNum.textAlign = 'center'
          ctxNum.font = '35px bold'
          ctxNum.fillText(parseInt(text, 10), 275, 290)

          if (i > value) {
            setTimeout(function () {
              ctxPoint.fillStyle = '#fff'
              ctxPoint.fillText('信用' + evluate, 0, 0)
            }, 200)
            clearTimeout(timer)
            i = null
          } else {
            timer = setTimeout(slideValue, text / finalValue * 15)
          }
        }

        slideValue()
      }

      // 打开页面时默认的跳动数字
      run(_this.number)
    },
    components: {}
  }
</script>

<style type="text/less" lang="less">
  #container { width: 550px; height: 568px; transform: scale(0.65, 0.65) translate(-27%, -40%); }

  #clockBox { position: relative; height: 100%; width: 100%; }

  #clock, #pointer, #number { position: absolute; top: 0; left: 0; z-index: 9; }
</style>

