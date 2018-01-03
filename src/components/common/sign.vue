<template>
  <div id="canvasBox" :style='getHorizontalStyle'>
    <div class="top">
      <div class="header">
        <div class="left" @click="goBack"></div>
        <h1>绘制签名</h1>
      </div>
    </div>
    <div class="drowBox">
      <div class="doAction">
        <p>在方框中签名：</p>
        <a class="clear" @click="clear">重绘</a>
        <a class="upload" @click="upload">完成</a>
      </div>
      <canvas id="canvas"></canvas>
    </div>
  </div>
</template>

<script>
  import Draw from '../../utils/global/draw'

  export default {
    data () {
      return {
        degree: 90,
        token: ''
      }
    },
    created () {
      this.$http.get('http://192.168.1.107:8090/qiniuToken').then((res) => {
        this.token = res.data.token
      }).catch(err => {
        console.log(err)
      })
    },
    mounted () {
      this.canvasBox = document.getElementById('canvasBox')
      this.initCanvas()
    },
    computed: {
      getHorizontalStyle () {
        const d = document
        const w = window.innerWidth || d.documentElement.clientWidth || d.body.clientWidth
        const h = window.innerHeight || d.documentElement.clientHeight || d.body.clientHeight
        let length = (h - w) / 2
        let width = w
        let height = h
        switch (this.degree) {
          case 90:
            width = h
            height = w
            break
          case -90:
            length = -length
            break
          default:
            length = 0
            break
        }
        if (this.canvasBox) {
          this.canvasBox.removeChild(document.querySelector('canvas'))
          this.canvasBox.appendChild(document.createElement('canvas'))
          setTimeout(() => {
            this.initCanvas()
          }, 200)
        }
        return {
          transform: `rotate(${this.degree}deg) translate(${length}px,${length}px)`,
          width: `${width}px`,
          height: `${height}px`,
          transformOrigin: 'center center'
        }
      }
    },
    methods: {
      goBack () {
        this.clear()
        this.$parent.show = false
      },
      initCanvas () {
        const canvas = document.querySelector('canvas')
        this.draw = new Draw(canvas, -this.degree)
      },
      clear () {
        this.draw.clear()
      },
      upload () {
        const image = this.draw.getPNGImage()
        const blob = this.draw.dataURLtoBlob(image)
        const token = this.token
        const formData = new FormData()
        const xhr = new XMLHttpRequest()
        var key = new Date().getTime()
        var formdata = new FormData()
        var formdataConfig = {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
        formdata.append('file', blob)
        formdata.append('key', key + '.jpg')
        formdata.append('token', token)
        this.$http.post('http://upload.qiniu.com/', formdata, formdataConfig).then((res) => {
          console.log(res.data.key)
        }).catch(err => {
          console.log(err)
        })
      }
    },
    components: {
      Draw
    }
  }

</script>

<style lang="less" type="text/less">

  #canvasBox {
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .top {
    position: relative;
    width: 100%;
    height: 40px;
    border-bottom: 10px solid #eee;
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
          margin-top: -6px;
          margin-left: -6px;
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
  }

  .drowBox {
    height: 100%;
    display: flex;
    background-color: #fff;
    flex-direction: column;
    padding: 0 10px 10px;
    .doAction {
      line-height: 40px;
      flex: 0 0 40px;
      background-color: #fff;
      text-align: right;
      padding: 5px 0;
      p {
        float: left;
      }
      a {
        padding: 10px;
        background: #ff0000;
        color: #fff;
        border-radius: 5px;
      }
      a.upload {
        background-color: #2fbbdd;
        margin-left: 20px;
      }
    }
    canvas {
      flex: 1;
      border: 1px solid #999;
      border-radius: 10px;
      cursor: crosshair;
      box-sizing: content-box;
    }
  }
</style>
