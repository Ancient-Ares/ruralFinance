<template>
  <div class="ContractPage">
    <div class="topEdit">
      <pageTitle :title="title"></pageTitle>
      <button class="edit" v-if="cardList.length > 0 && !noShow" @click="toggleChange">{{toggleDel ? ('还原') : ('编辑')}}</button>
    </div>
    <div class="ContractList" :class="{'delShow':toggleDel}">
      <div class="conItem clearfix" v-for="(item, index) in cardList">
        <check-icon :value.sync="delList[index].confirm" class="checkIcon" type="plain"></check-icon>
        <div class="content" @click="nextRouter('OneCard', item.bankCardId)">
          <p><span>提交状态：</span><span style="color:#42b983">已提交</span></p>
          <p><span>一卡通号：</span><span>{{item.cardCode}}</span></p>
          <p><span>提交时间：</span><span>{{item.createTime}}</span></p>
        </div>
      </div>
    </div>
    <div v-if="!noShow">
      <button v-if="!toggleDel" class="goInfo" @click="newRouter('oneCard')">添加一卡通</button>
      <button v-if="toggleDel" class="goDel" @click="Deleted">删除</button>
      <p class="tips" v-if="!toggleDel"><span><img src="../assets/safe.png" alt="safe"></span><span>信息安全&隐私保障</span></p>
    </div>
  </div>
</template>

<script>
  import { CheckIcon } from 'vux'

  export default {
    data () {
      return {
        title: '一卡通列表',
        cardList: [],
        delList: [],
        toggleDel: false,
        noShow: false
      }
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
          url: `${this.$root.baseUrl}/finance/app/certification/listBankCard.do`,
          params: {
            userId: userId
          }
        }).then((res) => {
          if (res.data.status === 'true') {
            var data = res.data.data
            this.cardList = data
            for (let n = 0, lens = data.length; n < lens; n++) {
              this.delList.push({id: data[n].bankCardId, confirm: false})
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
      toggleChange () {
        if (this.cardList.length === 0) {
          return false
        } else {
          this.toggleDel = !this.toggleDel
        }
      },
      Deleted () {
        let that = this
        let bankCardId = ''
        let delList = this.delList
        for (let i = 0, lens = delList.length; i < lens; i++) {
          if (delList[i].confirm) {
            bankCardId += delList[i].id + ','
          }
        }
        bankCardId = bankCardId.substring(0, bankCardId.length - 1)
        if (!bankCardId) {
          return false
        }
        this.$vux.confirm.show({
          title: '提示',
          content: '是否确认删除？',
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
              url: `${that.$root.baseUrl}/finance/app/certification/removeBankCards.do`,
              params: {
                bankCardIds: bankCardId
              }
            }).then((res) => {
              if (res.data.status === 'true') {
                that.$vux.loading.hide()
                that.$vux.toast.show({
                  text: '删除成功！',
                  type: 'success',
                  onHide () {
                    that.$router.go(0)
                  }
                })
              } else {
                that.$vux.loading.hide()
                that.$nextTick(function () {
                  that.$vux.toast.show({
                    text: '删除失败，稍后再试！',
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
      nextRouter (path, id) {
        if (this.toggleDel) {
          return false
        } else {
          let local = window.localStorage
          local.setItem('bankCardId', id)
          this.$router.push(path)
        }
      },
      newRouter (path) {
        let local = window.localStorage
        local.removeItem('bankCardId')
        this.$router.push(path)
      }
    },
    components: {
      CheckIcon
    }
  }
</script>

<style type="text/less" lang="less" scoped>
  .ContractPage {
    padding: 40px 0;
    background: #fff;
  }

  .topEdit {
    height: 20px;
    .edit {
      position: fixed;
      top: 0px;
      right: 0px;
      z-index: 99;
      height: 40px;
      width: 60px;
      border: none;
      outline: none;
      background: #fbf9fe;
      color: #42b983
    }
  }

  .ContractList {
    .checkIcon {
      display: none;
    }
    .content {
      text-align: left;
      width: 75%;
      display: block;
      margin: 0 auto;
      padding: 20px;
      margin-bottom: 20px;
      border: 1px solid #bebbb5;
      border-radius: 15px;
      p {
        font-size: 14px;
        span {
          &:first-child {
            color: #666;
            margin-right: 10px;
          }
        }
      }
    }
  }

  .delShow {
    .conItem {
      display: block;
      width: 100%;
    }
    .checkIcon {
      float: left;
      display: inline-flex;
      margin-top: 33px;
      margin-left: 15px;
    }
    .content {
      float: left;
      width: 70%;
      padding: 20px 10px;
      margin-left: 10px;
    }
  }

  .goInfo, .goDel {
    margin: 40px auto 0 auto;
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

  .goDel {
    margin: 40px auto 50px auto;
    background-color: #ff6750;
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
