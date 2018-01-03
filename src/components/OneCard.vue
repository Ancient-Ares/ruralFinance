<template>
  <div class="BusLicensePage">
    <pageTitle :title="title"></pageTitle>
    <div class="apply">
      <div class="formGroup">
        <div class="oneCardNameInput noClick">
          <label for="oneCardName">持卡人姓名</label>
          <input id="oneCardName" class="oneCardName" type="text" placeholder="填写持卡人姓名"
                 v-model="applyOneCardName"></input>
        </div>
        <div class="oneCardNumInput" :class="{'noClick':!newAdd}">
          <label for="oneCardNum">一卡通号码</label>
          <input id="oneCardNum" class="oneCardNum" type="text" placeholder="填写一卡通号码"
                 v-model="applyOneCardNum"></input>
        </div>
        <div class="upLoad">
          <p class="upTitle">上传一卡通照片</p>
          <div id="camera">
            <div id="cameraBox">
              <div class="photoList" v-for="(item,index) in urlList">
                <div class="img">
                  <p v-if="newAdd" @click="removePhoto(index)">X</p>
                  <img class="previewerImg" :src="item.src" @click="show(index)">
                  <div v-transfer-dom>
                    <previewer :list="urlList" ref="previewer" :options="options"></previewer>
                  </div>
                </div>
              </div>
              <div v-if="newAdd" class="takePhotos" @click="takePhotos">+</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <button v-if="newAdd" class="goInfo" @click="upInfo">上传</button>
    <p v-if="newAdd" class="tips"><span><img src="../assets/safe.png" alt="safe"></span><span>信息安全&隐私保障</span></p>
  </div>
</template>

<script>
  import { PopupPicker, Datetime, Previewer, TransferDom } from 'vux'

  export default {
    data () {
      return {
        title: '一卡通',
        applyOneCardName: '',
        applyOneCardNum: '',
        urlList: [],
        newAdd: false,
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
        let bankCardId = local.getItem('bankCardId')
        let userName = local.getItem('userName')
        if (!bankCardId) {
          this.newAdd = true
          this.applyOneCardName = userName
          this.$vux.loading.hide()
          return false
        }
        this.$http({
          method: 'get',
          timeout: 10000,
          url: `${this.$root.baseUrl}/finance/app/certification/viewBankCard.do`,
          params: {
            bankCardId: bankCardId
          }
        }).then((res) => {
          if (res.data.status === 'true') {
            let data = res.data.data
            this.applyOneCardNum = data.cardCode
            this.applyOneCardName = data.userName
            if (!data.cardImage) {
              this.urlList = []
            } else {
              this.urlList = [{src: data.cardImage, w: 400, h: 600}]
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
      nextRouter (path) {
        this.$router.push(path)
      },
      upInfo () {
        let local = window.localStorage
        let userId = local.getItem('userId')
        let applyOneCardName = this.applyOneCardName
        let applyOneCardNum = this.applyOneCardNum
        let urlList = this.urlList[0].src
        if (!applyOneCardName) {
          this.$nextTick(function () {
            this.$vux.toast.show({
              text: '请填写持卡人姓名！',
              type: 'text',
              width: '12em',
              position: 'middle'
            })
          })
          return false
        }
        if (!applyOneCardNum) {
          this.$nextTick(function () {
            this.$vux.toast.show({
              text: '请填写一卡通卡号！',
              type: 'text',
              width: '12em',
              position: 'middle'
            })
          })
          return false
        }
        if (!urlList) {
          this.$nextTick(function () {
            this.$vux.toast.show({
              text: '请上传一卡通照片！',
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
              url: `${that.$root.baseUrl}/finance/app/certification/saveBankCard.do`,
              params: {
                userId: userId,
                userName: applyOneCardName,
                cardCode: applyOneCardNum,
                cardImage: urlList
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
                let msg = res.data.msg
                that.$vux.loading.hide()
                that.$nextTick(function () {
                  that.$vux.toast.show({
                    text: msg,
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
      .oneCardNameInput, .oneCardNumInput {
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
          width: 200px;
          height: 25.6px;
          font-size: 16px;
          border: none;
          text-align: right;
          background-color: transparent;
        }
      }
    }
  }
  @media screen and (max-width: 330px) {
    .apply {
      .formGroup {
        .oneCardNameInput, .oneCardNumInput {
          input {
            width: 180px;
          }
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
