<template>
  <div class="BusLicensePage">
    <pageTitle :title="title"></pageTitle>
    <div class="apply">
      <div class="formGroup">
        <div class="licenseInput">
          <label for="license">执照编号</label>
          <input id="license" class="license" type="text" placeholder="填写执照编号"
                 v-model="applyLicense"></input>
        </div>
        <div class="upLoad">
          <p class="upTitle">上传执照照片</p>
          <div id="camera">
            <div id="cameraBox">
              <div class="photoList" v-for="(item,index) in urlList">
                <div class="img">
                  <p v-if="!noShow" @click="removePhoto(index)">X</p>
                  <img class="previewerImg" :src="item.src" @click="show(index)">
                  <div v-transfer-dom>
                    <previewer :list="urlList" ref="previewer" :options="options"></previewer>
                  </div>
                </div>
              </div>
              <div v-if="!noShow" class="takePhotos" @click="takePhotos">+</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="!noShow">
      <button class="goInfo" @click="upInfo">上传</button>
      <p class="tips"><span><img src="../assets/safe.png" alt="safe"></span><span>信息安全&隐私保障</span></p>
    </div>
  </div>
</template>

<script>
  import { PopupPicker, Datetime, Previewer, TransferDom } from 'vux'

  export default {
    data () {
      return {
        title: '营业执照',
        applyLicense: '',
        urlList: [],
        noShow: false,
        options: {
          getThumbBoundsFn (index) {
            // find thumbnail element
            let thumbnail = document.querySelectorAll('.previewerImg')[index]
            // get window scroll Y
            let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
            // optionally get horizontal scroll
            // get position of element relative to viewport
            let rect = thumbnail.getBoundingClientRect()
            // w = width
            return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
            // Good guide on how to get element coordinates:
            // http://javascript.info/tutorial/coordinates
          }
        }
      }
    },
    directives: {
      TransferDom
    },
    beforeCreate () {
      this.$nextTick(function () {
        this.$vux.loading.show({
          text: 'Loading'
        })
        let local = window.localStorage
        let orgId = local.getItem('orgId')
        let farmOrgId = local.getItem('farmOrgId')
        if (farmOrgId) {
          this.noShow = true
          orgId = farmOrgId
        }
        this.$http({
          method: 'get',
          timeout: 10000,
          url: `${this.$root.baseUrl}/finance/app/certification/viewBusinessLicense.do`,
          params: {
            orgId: orgId
          }
        }).then((res) => {
          if (res.data.status === 'true') {
            let data = res.data.data
            this.applyLicense = data.recordCode
            if (!data.imgPath) {
              this.urlList = []
            } else {
              this.urlList = [{src: data.imgPath, w: 400, h: 600}]
            }
            this.$vux.loading.hide()
          } else {
            this.$vux.loading.hide()
            this.$nextTick(function () {
              this.$vux.toast.show({
                text: '请求失败，稍后再试！',
                type: 'text',
                width: '12em',
                position: 'middle'
              })
            })
            return false
          }
        }).catch((e) => {
          this.$vux.loading.hide()
          this.$nextTick(function () {
            this.$vux.toast.show({
              text: '网络错误！',
              type: 'text',
              width: '12em',
              position: 'middle'
            })
          })
          return false
        })
      })
    },
    mounted () {
    },
    created () {
      var _this = this
      window.takePhotos = function (urlList) {
        let list = urlList.split(';')
        _this.urlList = [{src: list[0], w: 400, h: 600}]
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
      },
      show (index) {
        this.$refs.previewer[index].show(index)
      },
      upInfo () {
        let local = window.localStorage
        let orgId = local.getItem('orgId')
        let applyLicense = this.applyLicense
        let imgUrl = this.urlList[0].src
        if (!applyLicense) {
          this.$nextTick(function () {
            this.$vux.toast.show({
              text: '请填写执照编号！',
              type: 'text',
              width: '12em',
              position: 'middle'
            })
          })
          return false
        }
        if (!imgUrl) {
          this.$nextTick(function () {
            this.$vux.toast.show({
              text: '请上传照片且为1张！',
              type: 'text',
              width: '12em',
              position: 'middle'
            })
          })
          return false
        }
        let that = this
        this.$vux.confirm.show({
          title: '提示',
          content: '是否提交？',
          onShow () {
            console.log('plugin show')
          },
          onHide () {
            console.log('plugin hide')
          },
          onCancel () {
            console.log('plugin cancel')
          },
          onConfirm () {
            that.$vux.loading.show({
              text: 'Loading'
            })
            that.$http({
              method: 'post',
              timeout: 10000,
              url: `${that.$root.baseUrl}/finance/app/certification/updateBusinessLicense.do`,
              params: {
                orgId: orgId,
                recordCode: applyLicense,
                imgPath: imgUrl
              }
            }).then((res) => {
              if (res.data.status === 'true') {
                that.$vux.loading.hide()
                that.$vux.toast.show({
                  text: '提交成功！',
                  type: 'success',
                  onHide () {
                    that.$router.go(-1)
                  }
                })
              } else {
                that.$vux.loading.hide()
                that.$nextTick(function () {
                  that.$vux.toast.show({
                    text: '请求失败，稍后再试！',
                    type: 'text',
                    width: '12em',
                    position: 'middle'
                  })
                })
                return false
              }
            }).catch((e) => {
              that.$vux.loading.hide()
              that.$nextTick(function () {
                that.$vux.toast.show({
                  text: '网络错误！',
                  type: 'text',
                  width: '12em',
                  position: 'middle'
                })
              })
              return false
            })
          }
        })
      }
    },
    components: {
      PopupPicker,
      Datetime,
      Previewer
    }
  }
</script>

<style type="text/less" lang="less" scoped>

  .apply {
    width: 100%;
    overflow-x: hidden;
    background-color: #fff;
    padding-bottom: 50px;
    .formGroup {
      .licenseInput {
        padding: 10px 20px 10px 15px;
        box-sizing: border-box;
        position: relative;
        height: 46px;
        width: 100%;
        &:before {
          content: " ";
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 1px;
          border-bottom: 1px solid #d9d9d9;
          color: #d9d9d9;
          -webkit-transform-origin: 0 0;
          transform-origin: 0 0;
          -webkit-transform: scaleY(0.5);
          transform: scaleY(0.5);
          left: 15px;
        }
        label {
          min-width: 80px;
          float: left;
        }
        input {
          float: right;
          outline: none;
          padding-right: 10px;
          width: 190px;
          height: 25.6px;
          font-size: 16px;
          border: none;
          text-align: right;
          background-color: transparent;
        }
      }
    }
  }

  .upLoad {
    padding: 10px 15px;
    position: relative;
    .upTitle {
      margin-bottom: 20px;
    }
    &:before {
      content: " ";
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 1px;
      border-bottom: 1px solid #d9d9d9;
      color: #d9d9d9;
      -webkit-transform-origin: 0 0;
      transform-origin: 0 0;
      -webkit-transform: scaleY(0.5);
      transform: scaleY(0.5);
      left: 15px;
    }
    .photoList {
      height: 100px;
      width: 30%;
      float: left;
      .img {
        position: relative;
        width: 80px;
        height: 80px;
        float: left;
        margin-right: 20px;
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
          font-size: 12px;
        }
        img { width: 100%; height: 100%; vertical-align: middle }
      }
    }

    .takePhotos {
      height: 80px;
      width: 80px;
      border: 1px solid #ddd;
      line-height: 80px;
      text-align: center;
      font-size: 30px;
      color: #ddd;
      float: left;
    }
  }

  .goInfo {
    margin: 50px auto 0 auto;
    width: 80%;
    display: block;
    height: 40px;
    border-radius: 20px;
    line-height: 40px;
    color: #fff;
    font-size: 16px;
    outline: none;
    border: none;
    background-color: #07dd84;
  }

  .tips {
    text-align: center;
    line-height: 30px;
    span {
      display: inline-block;
      height: 30px;
      font-size: 14px;
      color: #dbdbdb;
      margin-right: 5px;
      img {
        vertical-align: middle;
        width: 14px;
        margin-top: -3px;
      }
    }
  }
</style>
