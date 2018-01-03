<template>
  <div class="FarmPage">
    <pageTitle :title="title"></pageTitle>
    <div class="apply">
      <div class="formGroup">

        <div class="farmNameInput">
          <label for="farmName">农场名称</label>
          <input id="farmName" class="farmName" type="text" placeholder="填写农场名称" v-model="applyFarmName"
                 disabled="disabled"></input>
        </div>
        <popup-picker class="busType" title="选择经营类型" :data="busType" v-model="applyBusType"
                      value-text-align="right"></popup-picker>
        <div class="proType">
          <div class="tit">选择产业类型（可多选）</div>
          <checker v-model="applyProType" type="checkbox" default-item-class="check-item"
                   selected-item-class="check-item-selected">
            <checker-item v-for="(item, index) in proType" :key="index" :value="item">{{item.value}}</checker-item>
          </checker>
        </div>
        <popup-picker class="proVariety" title="选择生产品种" :data="proVariety" v-model="applyProVariety" value-text-align="right"></popup-picker>
        <div class="muNumInput">
          <label for="muNum">产业规模</label>
          <div class="inline"></div>
          <input id="muNum" class="farmName" type="tel" placeholder="填写规模" v-model="applyMuNum"></input>
          <div class="muType">
            <popup-picker class="muType" :data="muType" v-model="applyMuType" value-text-align="right"></popup-picker>
          </div>
        </div>
        <areaCode ref="areaCode"></areaCode>
      </div>
    </div>
    <button class="goInfo highlight" @click="upInfo">提交</button>
    <p class="tips"><span><img src="../assets/safe.png" alt="safe"></span><span>信息安全&隐私保障</span></p>
  </div>
</template>

<script>
  import areaCode from './common/areaCode'
  import { PopupPicker, Checker, CheckerItem } from 'vux'

  export default {
    data () {
      return {
        title: '农场信息',
        applyFarmName: '',
        applyMuNum: '',
        busType: [['家庭农场', '种养大户', '合作社', '农业龙头企业', '其它']],
        applyBusType: ['家庭农场'],
        proType: [{
          key: '1',
          value: '种植业'
        }, {
          key: '2',
          value: '畜牧业'
        }, {
          key: '3',
          value: '渔业'
        }, {
          key: '4',
          value: '林业'
        }, {
          key: '5',
          value: '其它'
        }],
        applyProType: '',
        proVariety: [['粮食生产', '蔬菜园艺', '水产养殖', '畜禽养殖']],
        applyProVariety: ['粮食生产'],
        muType: [['亩', '头']],
        applyMuType: ['亩'],
        addressCode: []
      }
    },
    beforeCreate () {
      this.$nextTick(function () {
        this.$vux.loading.show({
          text: 'Loading'
        })
        let local = window.localStorage
        let userId = local.getItem('userId')
        this.$http({
          method: 'get',
          timeout: 10000,
          url: `${this.$root.baseUrl}/finance/app/certification/showProductionInfo.do`,
          params: {
            userId: userId
          }
        }).then((res) => {
          if (res.data.status === 'true') {
            let data = res.data.data
            this.applyFarmName = data.orgName
            this.applyMuNum = data.scale
            if (!data.scaleUnit) {
              this.applyMuType = ['亩']
            } else {
              this.applyMuType = [data.scaleUnit]
            }
            if (data.classify === 1) {
              this.applyBusType = ['家庭农场']
            } else if (data.classify === 2) {
              this.applyBusType = ['种养大户']
            } else if (data.classify === 3) {
              this.applyBusType = ['合作社']
            } else if (data.classify === 4) {
              this.applyBusType = ['农业龙头企业']
            } else {
              this.applyBusType = ['其它']
            }
            let kind = data.orgKinds.split(',')
            var showKind = []
            for (let r = 0; r < kind.length; r++) {
              if (kind[r] === '1') {
                showKind.push({key: '1', value: '种植业'})
              } else if (kind[r] === '2') {
                showKind.push({key: '2', value: '畜牧业'})
              } else if (kind[r] === '3') {
                showKind.push({key: '3', value: '渔业'})
              } else if (kind[r] === '4') {
                showKind.push({key: '4', value: '林业'})
              } else {
                showKind.push({key: '5', value: '其它'})
              }
            }
            this.applyProType = showKind
            if (data.creditType === '1') {
              this.applyProVariety = ['粮食生产']
            } else if (data.creditType === '2') {
              this.applyProVariety = ['蔬菜园艺']
            } else if (data.creditType === '3') {
              this.applyProVariety = ['水产养殖']
            } else {
              this.applyProVariety = ['畜禽养殖']
            }
            if (data.districtAreaName && data.townAreaName && data.villageName) {
              let addressText = data.districtAreaName + data.townAreaName + data.villageName
              this.$refs.areaCode.addressText = addressText
              let firstCode = data.areaCode.substring(0, 6)
              this.addressCode = [firstCode, data.areaCode, data.villageCode]
            }
            if (data.houseNo) {
              this.$refs.areaCode.addressDetail = data.houseNo
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
    },
    methods: {
      upInfo () {
        let local = window.localStorage
        let userId = local.getItem('userId')
        let orgId = local.getItem('orgId')
        let applyFarmName = this.applyFarmName
        if (!applyFarmName) {
          this.$nextTick(function () {
            this.$vux.toast.show({
              text: '请填写农场名称！',
              type: 'text',
              width: '12em',
              position: 'middle'
            })
          })
          return false
        }
        let applyProType = this.applyProType
        if (!applyProType) {
          this.$nextTick(function () {
            this.$vux.toast.show({
              text: '请选择产业类型！',
              type: 'text',
              width: '12em',
              position: 'middle'
            })
          })
          return false
        }
        let applyMuNum = this.applyMuNum
        if (!applyMuNum) {
          this.$nextTick(function () {
            this.$vux.toast.show({
              text: '请填写产业规模！',
              type: 'text',
              width: '12em',
              position: 'middle'
            })
          })
          return false
        }
        let arr = []
        for (let r = 0, len = applyProType.length; r < len; r++) {
          arr.push(applyProType[r].key)
        }
        applyProType = arr.join(',')
        let applyBusType = this.applyBusType[0]
        if (applyBusType === '家庭农场') {
          applyBusType = 1
        } else if (applyBusType === '种养大户') {
          applyBusType = 2
        } else if (applyBusType === '合作社') {
          applyBusType = 3
        } else if (applyBusType === '企业') {
          applyBusType = 4
        } else {
          applyBusType = 5
        }
        let applyProVariety = this.applyProVariety[0]
        if (applyProVariety === '粮食生产') {
          applyProVariety = 1
        } else if (applyProVariety === '蔬菜园艺') {
          applyProVariety = 2
        } else if (applyProVariety === '水产养殖') {
          applyProVariety = 3
        } else {
          applyProVariety = 4
        }
        let applyMuType = this.applyMuType[0]
        let upCodeStr = this.addressCode.length === 0 ? this.$refs.areaCode.upCode : this.addressCode
        if (upCodeStr.length === 0) {
          this.$nextTick(function () {
            this.$vux.toast.show({
              text: '请选择地址！',
              type: 'text',
              width: '12em',
              position: 'middle'
            })
          })
          return false
        }
        let addressDetail = this.$refs.areaCode.addressDetail
        if (!addressDetail) {
          this.$nextTick(function () {
            this.$vux.toast.show({
              text: '请输入详细地址！',
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
              url: `${that.$root.baseUrl}/finance/app/certification/saveProductionInfo.do`,
              params: {
                userId: userId,
                orgName: applyFarmName,
                classify: applyBusType,
                orgKinds: applyProType,
                creditType: applyProVariety,
                scale: applyMuNum,
                scaleUnit: applyMuType,
                areaCode: upCodeStr[1],
                villageCode: upCodeStr[2],
                houseNo: addressDetail
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
      Checker,
      CheckerItem,
      areaCode
    }
  }
</script>

<style type="text/less" lang="less" scoped>

  .apply {
    width: 100%;
    overflow-x: hidden;
    background-color: #fff;
    .formGroup {
      .farmNameInput, .muNumInput {
        padding: 10px 5px 10px 15px;
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
          height: 25.6px;
          width: 210px;
          font-size: 16px;
          border: none;
          text-align: right;
          background-color: transparent;
        }
      }
      .muNumInput {
        input {
          padding-right: 22px;
          width: 100px;
        }
      }
      .addressDetail {
        .weui-textarea {
          text-align: right;
          padding-right: 10px;
        }
      }
    }
  }

  .proType {
    padding: 10px 5px 10px 15px;
    box-sizing: border-box;
    position: relative;
    width: 100%;
    .tit {
      padding: 0 0 10px 0;
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
    .vux-checker-box {
      width: 100%;
    }
    .check-item {
      display: inline-flex;
      margin: 5px 4px;
      height: 26px;
      line-height: 26px;
      text-align: center;
      border-radius: 13px;
      border: 1px solid #ccc;
      background-color: #fff;
      padding: 0 5px;
    }
    .check-item-selected {
      border-color: #04be02;
      background-color: #04be02;
      color: #fff;
    }
  }
  .inline {
    height: 20px;
    width: 1px;
    float: right;
    margin-top: 5px;
    margin-right: 40px;
    background: #ddd;
  }
  .muType {
    width: 50px;
    height: 46px;
    line-height: 26px;
    position: absolute;
    right: 0;
    top: 0;
    .vux-cell-box:before {
      display: none;
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
