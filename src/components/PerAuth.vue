<template>
  <div class="PerAuthPage">
    <pageTitle :title="title"></pageTitle>
    <div class="apply">
      <div class="formGroup">
        <popup-picker class="gender" title="性别" :data="gender" v-model="applyGender"
                      value-text-align="right"></popup-picker>
        <popup-picker class="marriage" title="婚姻状况" :data="marriage" v-model="applyMarriage"
                      value-text-align="right"></popup-picker>
        <div class="phoneInput">
          <label for="phone">本人电话</label>
          <input id="phone" class="phone" type="tel" placeholder="填写本人电话"
                 v-model="selfPhone"></input>
        </div>
        <popup-picker class="other" title="联系人关系" :data="other" v-model="applyOther"
                      value-text-align="right"></popup-picker>
        <div class="otherNameInput">
          <label for="otherName">联系人姓名</label>
          <input id="otherName" class="otherName" type="text" placeholder="填写联系人姓名"
                 v-model="otherName"></input>
        </div>
        <div class="otherPhoneInput">
          <label for="otherPhone">联系人电话</label>
          <input id="otherPhone" class="otherPhone" type="tel" placeholder="填写联系人电话"
                 v-model="otherPhone"></input>
        </div>
        <areaCode ref="areaCode"></areaCode>
      </div>
    </div>
    <button class="goNext highlight" @click="upUserInfo">提交</button>
    <p class="tips"><span><img src="../assets/safe.png" alt="safe"></span><span>信息安全&隐私保障</span></p>
  </div>
</template>

<script>
  import { PopupPicker, Confirm } from 'vux'
  import areaCode from './common/areaCode'

  export default {
    data () {
      return {
        title: '个人信息',
        selfPhone: '',
        otherName: '',
        otherPhone: '',
        gender: [['男性', '女性']],
        applyGender: ['男性'],
        marriage: [['未婚', '已婚', '离异', '其他']],
        applyMarriage: ['已婚'],
        other: [['配偶', '子女', '父母', '朋友', '其他']],
        applyOther: ['配偶'],
        addressCode: []
      }
    },
    beforeCreate () {
      let local = window.localStorage
      let userId = local.getItem('userId')
      this.$http({
        method: 'get',
        timeout: 10000,
        url: `${this.$root.baseUrl}/finance/app/certification/showPersonalInfo.do`,
        params: {
          userId: userId
        }
      }).then((res) => {
        if (res.data.status === 'true') {
          let data = res.data.data
          this.applyGender = [data.gender === '0' ? '男性' : '女性']
          let marriageStatus
          if (data.marriageStatus === 1) {
            marriageStatus = '未婚'
          } else if (data.marriageStatus === 2) {
            marriageStatus = '已婚'
          } else if (data.marriageStatus === 3) {
            marriageStatus = '离异'
          } else {
            marriageStatus = '其他'
          }
          this.applyMarriage = [marriageStatus]
          this.selfPhone = data.mobile
          this.otherPhone = data.contactMobile
          this.otherName = data.contactName
          let contactRelation
          if (data.contactRelation === 1) {
            contactRelation = '配偶'
          } else if (data.contactRelation === 2) {
            contactRelation = '子女'
          } else if (data.contactRelation === 3) {
            contactRelation = '父母'
          } else if (data.contactRelation === 4) {
            contactRelation = '朋友'
          } else {
            contactRelation = '其他'
          }
          this.applyOther = [contactRelation]
          if (data.districtAreaName && data.townAreaName && data.villageName) {
            let addressText = data.districtAreaName + data.townAreaName + data.villageName
            this.$refs.areaCode.addressText = addressText
          }
          if (data.areaCode && data.villageCode) {
            this.addressCode = [data.areaCode.substring(0, 6), data.areaCode, data.villageCode]
          }
          if (data.houseNo) {
            this.$refs.areaCode.addressDetail = data.houseNo
          }
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    mounted () {
    },
    created () {
    },
    methods: {
      upUserInfo () {
        let local = window.localStorage
        let userId = local.getItem('userId')
        let selfPhone = this.selfPhone
        if (!/^1[34578]\d{9}$/.test(selfPhone)) {
          this.$nextTick(function () {
            this.$vux.toast.show({
              text: '请输入正确本人电话！',
              type: 'text',
              width: '12em',
              position: 'middle'
            })
          })
          return false
        }
        let otherName = this.otherName
        if (!otherName) {
          this.$nextTick(function () {
            this.$vux.toast.show({
              text: '请输入联系人姓名！',
              type: 'text',
              width: '12em',
              position: 'middle'
            })
          })
          return false
        }
        let otherPhone = this.otherPhone
        if (!/^1[34578]\d{9}$/.test(otherPhone)) {
          this.$nextTick(function () {
            this.$vux.toast.show({
              text: '请输入正确联系人电话！',
              type: 'text',
              width: '12em',
              position: 'middle'
            })
          })
          return false
        }
        if (otherPhone === selfPhone) {
          this.$nextTick(function () {
            this.$vux.toast.show({
              text: '本人与联系人电话不可一样！',
              type: 'text',
              width: '15em',
              position: 'middle'
            })
          })
          return false
        }
        let applyGender = this.applyGender[0] === '男性' ? 0 : 1
        let applyMarriage = this.applyMarriage[0]
        if (applyMarriage === '未婚') {
          applyMarriage = 1
        } else if (applyMarriage === '已婚') {
          applyMarriage = 2
        } else if (applyMarriage === '离异') {
          applyMarriage = 3
        } else {
          applyMarriage = 4
        }
        let applyOther = this.applyOther[0]
        if (applyOther === '配偶') {
          applyOther = 1
        } else if (applyOther === '子女') {
          applyOther = 2
        } else if (applyOther === '父母') {
          applyOther = 3
        } else if (applyOther === '朋友') {
          applyOther = 4
        } else {
          applyOther = 5
        }
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
              url: `${that.$root.baseUrl}/finance/app/certification/savePersonalInfo.do`,
              params: {
                userId: userId,
                mobile: selfPhone,
                gender: applyGender,
                marriageStatus: applyMarriage,
                contactRelation: applyOther,
                contactName: otherName,
                contactMobile: otherPhone,
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
      Confirm,
      areaCode
    }
  }
</script>

<style type="text/less" lang="less" scoped>
  .PerAuthPage {
    padding-bottom: 75px;
  }

  .apply {
    width: 100%;
    overflow-x: hidden;
    background-color: #fff;
    .formGroup {
      .phoneInput, .otherPhoneInput, .otherNameInput, .addressInput {
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

  .goNext {
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
    background: #999;
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
