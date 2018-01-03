<template>
  <div class="area">
    <div class="addressInput" @click="popAddress">
      <label for="address">地址选择</label>
      <input id="address" class="address" type="text" placeholder="请选择地区"
             v-model="addressText" disabled="disabled"></input>
    </div>
    <div class="popDiv vux-popup-show" :class="{'showPop':addressPick}" v-transfer-dom>
      <div class="popMask" @click="addressPick=false"></div>
      <div class="popupArea">
        <p class="popAddressTitle">请选择地区</p>
        <div class="cellBox">
          <div class="item" v-for="(item, index) in address"
               @click="choose(item.areaName, item.areaCode)">
            <span>{{item.areaName}}</span>
          </div>
        </div>
      </div>
    </div>
    <x-textarea class="addressDetail" title="详细地址" v-model="addressDetail" placeholder="街道、楼牌号等" :show-counter="false" :rows="2"></x-textarea>
  </div>
</template>

<script>
  import { Popup, XTextarea, TransferDom } from 'vux'

  export default {
    directives: {
      TransferDom
    },
    data () {
      return {
        addressPick: false,
        addressText: '',
        address: [],
        codeList: [],
        upCode: [],
        addressDetail: ''
      }
    },
    beforeCreate () {
      this.$nextTick(function () {
        this.$vux.loading.show({
          text: 'Loading'
        })
        let areaCode = '3212'
        this.$http({
          method: 'post',
          timeout: 10000,
          url: `${this.$root.baseUrl}/finance/app/basis/loadAreaList.do`,
          params: {
            areaCode: areaCode
          }
        }).then((res) => {
          if (res.data.status === 'true') {
            let data = res.data.data
            this.address = data
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
    methods: {
      popAddress () {
        this.addressPick = !this.addressPick
      },
      initAddres () {
        this.codeList = []
        this.$nextTick(function () {
          this.$vux.loading.show({
            text: 'Loading'
          })
          let areaCode = '3212'
          this.$http({
            method: 'post',
            timeout: 10000,
            url: `${this.$root.baseUrl}/finance/app/basis/loadAreaList.do`,
            params: {
              areaCode: areaCode
            }
          }).then((res) => {
            if (res.data.status === 'true') {
              let data = res.data.data
              this.address = data
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
      showAddress () {
        this.addressPick = false
        let addText = this.codeList
        let arrText = []
        let upCodeArr = []
        for (let i = 0, len = addText.length; i < len; i++) {
          arrText.push(addText[i].name)
          upCodeArr.push(addText[i].code)
        }
        this.addressText = arrText.join('')
        this.upCode = upCodeArr
        this.initAddres()
        return false
      },
      choose (name, code) {
        this.codeList.push({name: name, code: code})
        this.$nextTick(function () {
          this.$vux.loading.show({
            text: 'Loading'
          })
          this.$http({
            method: 'post',
            timeout: 10000,
            url: `${this.$root.baseUrl}/finance/app/basis/loadAreaList.do`,
            params: {
              areaCode: code
            }
          }).then((res) => {
            if (res.data.status === 'true') {
              let data = res.data.data
              this.address = data
              if (data.length === 0) {
                this.showAddress()
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
      }
    },
    components: {
      Popup,
      XTextarea
    }
  }
</script>

<style type="text/less" lang="less" scoped>
  .addressInput {
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
    &:after {
      content: " ";
      display: inline-block;
      height: 6px;
      width: 6px;
      border-width: 2px 2px 0 0;
      border-color: #c8c8cd;
      border-style: solid;
      -webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
      transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
      position: relative;
      top: -2px;
      position: absolute;
      top: 50%;
      margin-top: -4px;
      right: 16px;
    }
    label {
      min-width: 80px;
      float: left;
    }
    input {
      float: right;
      outline: none;
      width: 180px;
      height: 25.6px;
      font-size: 16px;
      margin-right: 6px;
      border: none;
      text-align: right;
      background-color: transparent;
    }
  }

  .popDiv {
    display: none;
    height: 50%;
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 501;
    -webkit-transition-property: -webkit-transform;
    transition-property: -webkit-transform;
    transition-property: transform;
    transition-property: transform, -webkit-transform;
    -webkit-transition-duration: 300ms;
    transition-duration: 300ms;
    .popMask {
      position: fixed;
      height: 50%;
      width: 100%;
      top: 0;
      left: 0;
      background: rgba(0, 0, 0, 0.5);
      opacity: 1;
      tap-highlight-color: rgba(0, 0, 0, 0);
      z-index: -1;
      -webkit-transition: opacity 400ms;
      transition: opacity 400ms;
    }
    .popupArea {
      height: 100%;
      width: 100%;
      -webkit-overflow-scrolling: touch;
      overflow-scrolling: touch;
      overflow-y: auto;
      overflow-x: hidden;
    }
    & > div {
      background-color: #fff;
      box-sizing: border-box;
    }
    .popAddressTitle {
      font-weight: 500;
      font-size: 14px;
      height: 30px;
      line-height: 30px;
      padding-left: 5px;
      background-color: #fbfbfb;
      color: #999;
    }
    .cellBox {
      padding: 0 15px;
      .item {
        height: 40px;
        line-height: 40px;
        border-bottom: 1px solid #ddd;
      }
    }
  }
  .showPop {
    display: block;
  }

  .addressDetail {
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
  }

</style>

