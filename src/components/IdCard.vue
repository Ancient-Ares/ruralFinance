<template>
  <div class="IdCardPage">
    <pageTitle :title="title"></pageTitle>
    <div class="apply">
      <div class="formGroup">
        <div class="userNameInput">
          <label for="userName">姓名</label>
          <input id="userName" class="userName" type="text" placeholder="填写姓名"
                 v-model="applyUserName"></input>
        </div>
        <div class="userCardInput">
          <label for="userCard">身份证</label>
          <input id="userCard" class="userCard" type="tel" placeholder="填写身份证号码"
                 v-model="applyUserCard"></input>
        </div>
        <div class="upLoad">
          <p>上传身份证正面</p>
          <div id="camera">
            <div id="cameraBox1">
              <div class="takePhotos" v-if="urlList1[0]===''" @click="takePhotos1">
                <img src="../assets/upCard1.png" alt="">
              </div>
              <div class="photoList" v-if="urlList1[0]!==''">
                <div class="img">
                  <p @click="removePhoto1($event)" v-if="!noShow">X</p>
                  <img class="previewerImg" v-if="urlList1[0].src" :src="urlList1[0].src" @click="showPhoto(0)">
                </div>
              </div>
            </div>
            <p>上传身份证反面</p>
            <div id="cameraBox2">
              <div class="takePhotos" v-if="urlList2[0]===''" @click="takePhotos2">
                <img src="../assets/upCard2.png" alt="">
              </div>
              <div class="photoList" v-if="urlList2[0]!==''">
                <div class="img">
                  <p @click="removePhoto2($event)" v-if="!noShow">X</p>
                  <img class="previewerImg" v-if="urlList2[0].src" :src="urlList2[0].src" @click="showPhoto(1)">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button v-if="!noShow" class="goInfo"
              :class="{'highlight':applyUserName && applyUserCard && urlList1.length > 0 && urlList2.length > 0}"
              @click="upInfo">上传
      </button>
      <p v-if="!noShow" class="tips"><span><img src="../assets/safe.png" alt="safe"></span><span>信息安全&隐私保障</span></p>
    </div>
    <div v-transfer-dom v-if="allList.length > 0">
      <previewer :list="allList" ref="previewer" :options="options"></previewer>
    </div>
  </div>
</template>

<script>
  import { PopupPicker, Datetime, Previewer, TransferDom } from 'vux'

  export default {
    data () {
      return {
        title: '身份证信息',
        applyUserName: '',
        applyUserCard: '',
        choose: 0,
        urlList1: [''],
        urlList2: [''],
        allList: [],
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
        let userId = local.getItem('userId')
        let farmUserId = local.getItem('farmUserId')
        if (farmUserId) {
          this.noShow = true
          userId = farmUserId
        }
        this.$http({
          method: 'get',
          timeout: 10000,
          url: `${this.$root.baseUrl}/finance/app/certification/viewSfzInfo.do`,
          params: {
            userId: userId
          }
        }).then((res) => {
          if (res.data.status === 'true') {
            let data = res.data.data
            this.applyUserName = data.userName
            this.applyUserCard = data.userSfz
            if (!data.sfzFront) {
              this.urlList1 = []
            } else {
              this.urlList1 = [{src: data.sfzFront, w: 600, h: 400}]
            }
            if (!data.sfzBack) {
              this.urlList2 = []
            } else {
              this.urlList2 = [{src: data.sfzBack, w: 600, h: 400}]
            }
            if (data.sfzFront && data.sfzBack) {
              this.allList = [
                {src: data.sfzFront, w: 600, h: 400},
                {src: data.sfzBack, w: 600, h: 400}
              ]
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
        if (_this.choose === 1) {
          let list1 = urlList.split(';')
          _this.urlList1 = [{src: list1[0], w: 600, h: 400}]
        } else if (_this.choose === 2) {
          let list2 = urlList.split(';')
          _this.urlList2 = [{src: list2[0], w: 600, h: 400}]
        }
        // 拍照后改变总数组
        if (_this.urlList1[0] === '') {
          if (_this.urlList2[0] === '') {
            _this.allList = []
          } else {
            _this.allList = _this.urlList2
          }
        } else {
          if (_this.urlList2[0] === '') {
            _this.allList = _this.urlList1
          } else {
            _this.allList = _this.urlList1.concat(_this.urlList2)
          }
        }
      }
    },
    methods: {
      takePhotos1 () {
        this.choose = 1
        var u = navigator.userAgent
        if (u.indexOf('iPhone') > -1) {
          window.webkit.messageHandlers.toTakePhoto.postMessage(null)
        } else {
          /* eslint-disable no-undef */
          toback.toTakePhoto()
        }
      },
      takePhotos2 () {
        this.choose = 2
        var u = navigator.userAgent
        if (u.indexOf('iPhone') > -1) {
          window.webkit.messageHandlers.toTakePhoto.postMessage(null)
        } else {
          /* eslint-disable no-undef */
          toback.toTakePhoto()
        }
      },
      removePhoto1 (e) {
        e.preventDefault()
        this.urlList1 = ['']
        if (this.urlList2[0] === '') {
          this.allList = []
        } else {
          this.allList = this.urlList2
        }
      },
      removePhoto2 (e) {
        e.preventDefault()
        this.urlList2 = ['']
        if (this.urlList1[0] === '') {
          this.allList = []
        } else {
          this.allList = this.urlList1
        }
      },
      nextRouter (path) {
        this.$router.push(path)
      },
      upInfo () {
        let local = window.localStorage
        let userId = local.getItem('userId')
        let userName = this.applyUserName
        let userSfz = this.applyUserCard
        let sfzFront = this.urlList1[0].src || ''
        let sfzBack = this.urlList2[0].src || ''
        if (!userName) {
          this.$nextTick(function () {
            this.$vux.toast.show({
              text: '请填写姓名！',
              type: 'text',
              width: '12em',
              position: 'middle'
            })
          })
          return false
        }
        if (!userSfz || !/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(userSfz)) {
          this.$nextTick(function () {
            this.$vux.toast.show({
              text: '请填写正确身份证号码！',
              type: 'text',
              width: '12em',
              position: 'middle'
            })
          })
          return false
        }
        if (!sfzFront || !sfzBack) {
          this.$nextTick(function () {
            this.$vux.toast.show({
              text: '请上传身份证正反面！',
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
              url: `${that.$root.baseUrl}/finance/app/certification/updateSfzInfo.do`,
              params: {
                userId: userId,
                userName: userName,
                userSfz: userSfz,
                sfzFront: sfzFront,
                sfzBack: sfzBack
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
      },
      showPhoto (index) {
        this.$refs.previewer.show(index)
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
    .formGroup {
      .userNameInput, .userCardInput {
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
          width: 180px;
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
    #cameraBox1, #cameraBox2 {
      height: 180px;
    }
    .photoList {
      height: 180px;
      width: 100%;
      .img {
        width: 260px;
        height: 165px;
        margin: 0 auto;
        position: relative;
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
        img {
          display: block;
          width: 260px;
          height: 165px;
          margin: 10px auto 0 auto;
        }
      }
    }

    .takePhotos {
      text-align: center;
      font-size: 0px;
      color: #ddd;
      img {
        display: block;
        width: 260px;
        height: 165px;
        margin: 10px auto 0 auto;
      }
    }
  }

  .goInfo {
    margin: 20px auto 0 auto;
    width: 80%;
    display: block;
    height: 40px;
    border-radius: 20px;
    line-height: 40px;
    color: #fff;
    font-size: 16px;
    outline: none;
    border: none;
    background-color: #999;
  }

  .highlight {
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
