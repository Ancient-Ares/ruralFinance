<template>
  <div id="camera">
    <pageTitle class="getHeader" :title="title"></pageTitle>
    <div id="cameraBox">
      <div class="takePhotos" @click="takePhotos">点击拍照</div>
      <div class="photoList" v-for="item in urlList" :key="item">
        <div class="img">
          <p @click="removePhoto(item)">X</p>
          <img :src="item">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {},
    data () {
      return {
        title: '拍照',
        urlList: []
      }
    },
    created () {
      var _this = this
      window.takePhotos = function (urlList) {
        _this.urlList = urlList.split(';')
      }
    },
    methods: {
      takePhotos () {
        var u = navigator.userAgent
        if (u.indexOf('iPhone') > -1) {
          window.webkit.messageHandlers.toTakePhoto.postMessage(null)
        } else {
          /* eslint-disable no-undef */
          toback.toTakePhoto()
        }
      },
      removePhoto (item) {
        this.urlList.splice(item, 1)
      }
    },
    components: {}
  }
</script>

<style type="text/less" lang="less">
  #camera {
    padding: 20px;
  }

  .photoList {
    height: 100px;
    width: 100%;
    .img {
      position: relative;
      width: 80px;
      height: 80px;
      overflow: hidden;
      float:left;
      margin-right:20px;
      p {
        position: absolute;
        top: -10px;
        right: -10px;
        height: 20px;
        width: 20px;
        line-height: 20px;
        text-align: center;
        background-color: #ff0000;
        color: #fff;
        border-radius: 50%;
      }
      img { width: 100%; vertical-align: middle }
    }
  }

  .takePhotos {
    height: 80px;
    width: 80px;
    border: 1px solid #ddd;
    line-height: 80px;
    text-align: center;
    font-size: 18px;
    color: #ddd;
  }
</style>

