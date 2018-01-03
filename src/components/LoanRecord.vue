<template>
  <div class="Approval">
    <pageTitle class="getHeader" :title="title"></pageTitle>
    <div class="swiperBox">
      <div class="tabBox clearfix">
        <tab :line-width='2' active-color='#1ecc6d' v-model="index">
          <tab-item class="vux-center" :selected="selectTab === item" v-for="(item, index) in list" :key="index">
            <p @click="changeTab(index)">{{item}}</p>
          </tab-item>
        </tab>
      </div>
      <div class="swiperItemBox">
        <div class="swiperItem" style="height: 100%">
          <div class="firstItem" v-show="index === 0">
            <scroller lock-x scrollbar-y use-pullup @on-pullup-loading="loadMore1" v-model="status1" ref="scroller1" class="scrollWarp" style="height: 100%;">
              <div class="box">
                <div class="listItem" v-for="(item, index) in ApprovalList">
                  <div class="itemBox">
                    <div class="itemImg">
                      <img src="../assets/ava.jpg">
                    </div>
                    <div class="itemText">
                      <h4 class="itemTitle">
                        <span class="name">{{item.userName}}</span>
                        <span class="score">
                          <icon slot="icon" name="xin" scale="1.6"></icon>
                          <span>300分</span>
                        </span>
                        <span class="time">{{item.applyTime}}</span>
                      </h4>
                      <p class="itemDesc">{{item.thenOrgName}}</p>
                    </div>
                  </div>
                  <div class="itemMid">
                    <div class="info">
                      <p><span>编号:</span><span>{{item.financeNo}}</span></p>
                      <p><span>用途:</span><span>{{item.financeUsages==='1'?'购买农资':'扩大经营'}}</span></p>
                      <p><span>期限:</span><span>{{item.month}} 个月</span></p>
                      <p><span>金额:</span><span>{{item.applyMoney}} 元</span></p>
                    </div>
                    <div class="process">
                      <p>{{getState(item.schedule)}}</p>
                    </div>
                  </div>
                  <div class="itemBot">
                    <button @click="deleteRecord(item.financeId, 0, index)">删除</button>
                  </div>
                </div>
                <div class="noMoreData" v-if="noMoreData1">已无更多数据</div>
              </div>
              <!--pullup slot-->
              <div slot="pullup" class="xs-plugin-pullup-container xs-plugin-pullup-up">
                <span v-show="status1.pullupStatus === 'default'"></span>
                <span class="pullup-arrow" v-show="status1.pullupStatus === 'down'"
                      :class="{'rotate': status1.pullupStatus === 'up'}">↑</span>
                <span v-show="status1.pullupStatus === 'loading'">
                      <spinner type="lines"></spinner>
                  </span>
              </div>
            </scroller>
          </div>
          <div class="secondItem" v-show="index === 1">
            <scroller lock-x scrollbar-y use-pullup @on-pullup-loading="loadMore2" v-model="status2" ref="scroller2" class="scrollWarp" style="height: 100%;">
              <div class="box">
                <div class="listItem" v-for="(item, index) in ApprovedList">
                  <div class="itemBox">
                    <div class="itemImg">
                      <img src="../assets/ava.jpg">
                    </div>
                    <div class="itemText">
                      <h4 class="itemTitle">
                        <span class="name">{{item.userName}}</span>
                        <span class="score">
                          <icon slot="icon" name="xin" scale="1.6"></icon>
                          <span>300分</span>
                        </span>
                        <span class="time">{{item.applyTime}}</span>
                      </h4>
                      <p class="itemDesc">{{item.thenOrgName}}</p>
                    </div>
                  </div>
                  <div class="itemMid">
                    <div class="info">
                      <p><span>编号:</span><span>{{item.financeNo}}</span></p>
                      <p><span>用途:</span><span>{{item.financeUsages==='1'?'购买农资':'扩大经营'}}</span></p>
                      <p><span>期限:</span><span>{{item.month}} 个月</span></p>
                      <p><span>金额:</span><span>{{item.applyMoney}} 元</span></p>
                    </div>
                    <div class="process">
                      <p>{{getState(item.schedule)}}</p>
                    </div>
                  </div>
                </div>
                <div class="noMoreData" v-if="noMoreData2">已无更多数据</div>
              </div>
              <!--pullup slot-->
              <div slot="pullup" class="xs-plugin-pullup-container xs-plugin-pullup-up">
                <span v-show="status2.pullupStatus === 'default'"></span>
                <span class="pullup-arrow" v-show="status2.pullupStatus === 'down'"
                      :class="{'rotate': status2.pullupStatus === 'up'}">↑</span>
                <span v-show="status2.pullupStatus === 'loading'">
                  <spinner type="lines"></spinner>
              </span>
              </div>
            </scroller>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { Tab, TabItem, Scroller, Spinner } from 'vux'

  const list = () => ['进行中', '已结束']

  export default {
    data () {
      return {
        title: '贷款记录',
        list: list(),
        selectTab: '进行中',
        index: 0,
        ApprovalPageNum: 1,
        ApprovedPageNum: 1,
        ApprovalList: [],
        ApprovedList: [],
        noMoreData1: false,
        noMoreData2: false,
        status1: {
          pullupStatus: 'default'
        },
        status2: {
          pullupStatus: 'default'
        },
        transitionName: 'slide-left',
        show: false
      }
    },
    beforeCreate () {
      this.$nextTick(() => {
        this.loadMore1()
      })
    },
    created () {
      this.$nextTick(() => {
        let boxHeight = this.$el.clientHeight - 50
        this.$root.$el.children[0].style.height = boxHeight + 'px'
        this.$el.children[1].children[1].style.height = boxHeight - 84 + 'px'
      })
    },
    mounted () {
    },
    deactivated () {
//      console.log('deactivated')
    },
    methods: {
      changeTab (item) {
        if (item === 1 && this.ApprovedList.length === 0) {
          this.$nextTick(() => {
            this.loadMore2()
          })
        }
      },
      getState (state) {
        if (state === 1) {
          return '已申请'
        } else if (state === 2) {
          return '已初审'
        } else if (state === 3) {
          return '已复审'
        } else if (state === 4) {
          return '已担保'
        } else if (state === 5) {
          return '已放款'
        } else {
          return '状态未知'
        }
      },
      loadMore1 () {
        this.$vux.loading.show({
          text: 'Loading'
        })
        setTimeout(() => {
          this.$nextTick(() => {
            setTimeout(() => {
              let local = window.localStorage
              let userId = local.getItem('userId')
              let areaCode = local.getItem('areaCode')
              this.$http({
                method: 'get',
                timeout: 10000,
                url: `${this.$root.baseUrl}/finance/app/finance/pageFinanceForUser.do`,
                params: {
                  pageNo: this.ApprovalPageNum,
                  pageSize: '10',
                  userId: userId,
                  areaCode: areaCode,
                  villageCode: '',
                  isEnd: '0'
                }
              }).then((res) => {
                if (res.data.status === 'true') {
                  let data = res.data.data.rows
                  this.ApprovalList = this.ApprovalList.concat(data)
                  this.$vux.loading.hide()
                  if (data.length < 10) {
                    this.$refs.scroller1.disablePullup()
                    this.$nextTick(() => {
                      this.$refs.scroller1.reset()
                    })
                    this.noMoreData1 = true
                    this.ApprovalPageNum = 1
                    return false
                  } else {
                    this.ApprovalPageNum++
                    this.$refs.scroller1.donePullup()
                    this.$nextTick(() => {
                      this.$refs.scroller1.reset()
                    })
                  }
                } else {
                  this.$refs.scroller1.donePullup()
                  this.$nextTick(() => {
                    this.$refs.scroller1.reset()
                  })
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
                this.$refs.scroller1.donePullup()
                this.$nextTick(() => {
                  this.$refs.scroller1.reset()
                })
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
            }, 100)
          })
        }, 800)
      },
      loadMore2 () {
        this.$vux.loading.show({
          text: 'Loading'
        })
        setTimeout(() => {
          this.$nextTick(() => {
            setTimeout(() => {
              let local = window.localStorage
              let userId = local.getItem('userId')
              let areaCode = local.getItem('areaCode')
              this.$http({
                method: 'get',
                timeout: 10000,
                url: `${this.$root.baseUrl}/finance/app/finance/pageFinanceForUser.do`,
                params: {
                  pageNo: this.ApprovedPageNum,
                  pageSize: '10',
                  userId: userId,
                  areaCode: areaCode,
                  villageCode: '',
                  isEnd: '1'
                }
              }).then((res) => {
                if (res.data.status === 'true') {
                  let data = res.data.data.rows
                  this.ApprovedList = this.ApprovedList.concat(data)
                  this.$vux.loading.hide()
                  if (data.length < 10) {
                    this.$refs.scroller2.disablePullup()
                    this.$nextTick(() => {
                      this.$refs.scroller2.reset()
                    })
                    this.noMoreData2 = true
                    this.ApprovedPageNum = 1
                    return false
                  } else {
                    this.ApprovedPageNum++
                    this.$refs.scroller2.donePullup()
                    this.$nextTick(() => {
                      this.$refs.scroller2.reset()
                    })
                  }
                } else {
                  this.$refs.scroller2.donePullup()
                  this.$nextTick(() => {
                    this.$refs.scroller2.reset()
                  })
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
                this.$refs.scroller2.donePullup()
                this.$nextTick(() => {
                  this.$refs.scroller2.reset()
                })
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
            }, 100)
          })
        }, 800)
      },
      deleteRecord (id, type, index) {
        let userId = window.localStorage.getItem('userId')
        let that = this
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
              url: `${that.$root.baseUrl}/finance/app/finance/revokeFinanceInfo.do`,
              params: {
                userId: userId,
                financeId: id
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
                let msg = res.data.msg
                that.$vux.loading.hide()
                that.$nextTick(function () {
                  that.$vux.toast.show({
                    text: msg,
                    type: 'text',
                    width: '15em',
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
      nextRouter (path) {
        this.$router.push(path)
      }
    },
    components: {
      Tab,
      TabItem,
      Scroller,
      Spinner
    }
  }
</script>

<style type="text/less" lang="less" scoped>
  .Approval {
    height: 100%;
    width: 100%;
    overflow: hidden;
    flex-direction: column;
    display: flex;
  }

  .getHeader {
    flex: 0 0 40px;
  }

  .swiperBox {
    display: inline-flex;
    flex-direction: column;
    flex: 1;
    overflow: hidden;
    .tabBox {
      flex: 0 0 44px;
      height: 44px;
      .vux-tab {
        position: fixed;
        top: 40px;
        left: 0;
        width: 100%;
        z-index: 9;
      }
    }
    .swiperItemBox {
      flex: 1;
      overflow: hidden;
      background-color: #fff;
      .swiperItem {
        height: 100%;
        & > div {
          height: 100%;
        }
      }
    }
  }

  .rotate {
    transform: rotate(-180deg);
  }

  .pulldown-arrow {
    display: inline-block;
    transition: all linear 0.2s;
    color: #666;
    font-size: 25px;
  }

  .scrollWarp {
    padding: 10px;
  }

  .xs-plugin-pulldown-container {
    position: absolute;
    width: 100%;
    height: 40px;
    top: 0px;
    text-align: center;
  }

  .xs-plugin-pullup-container {
    position: absolute;
    width: 100%;
    height: 40px;
    bottom: -40px;
    text-align: center;
  }

  .box {
    .listItem {
      position: relative;
      display: block;
      padding: 10px 15px 0;
      border: 1px solid #8d8d8d;
      border-radius: 5px;
      margin-bottom: 10px;
      .itemBox {
        width: 100%;
        height: 50px;
        display: flex;
        .itemImg {
          height: 40px;
          flex: 0 0 40px;
          img {
            width: 100%;
          }
        }
        .itemText {
          font-size: 13px;
          margin-left: 10px;
          flex: 1;
          .itemTitle {
            font-weight: normal;
            line-height: 20px;
            .name {
              font-size: 14px;
            }
            .score {
              color: #666;
              margin-left: 5%;
              svg {
                position: relative;
                top: 2px;
              }
            }
            .time {
              float: right;
              color: #666;
              font-size: 10px;
            }
          }
          .itemDesc {
            width: 100%;
            color: #666;
            font-size: 14px;
          }
        }
      }
      .itemMid {
        border-top: 1px solid #ddd;
        border-bottom: 1px solid #ddd;
        margin: 0 -15px;
        padding: 0 15px;
        .msg {
          font-size: 12px;
          line-height: 22px;
          margin: 5px 0;
          svg {
            position: relative;
            top: 2px;
          }
        }
        .info {
          width: 80%;
          margin: 15px 0;
          p {
            span {
              font-size: 14px;
              color: #333;
            }
            span:first-child {
              margin-right: 10px;
              color: #666;
            }
          }
        }
        .process {
          position: absolute;
          right: 10px;
          top: 100px;
          width: 55px;
          height: 55px;
          line-height: 55px;
          border-radius: 50%;
          border: 1px solid #f2e1d7;
          text-align: center;
          background-color: #fff7f4;
          overflow: hidden;
          p {
            color: #f56767;
            font-size: 12px;
          }
          &.going, &.complete {
            line-height: 55px;
            p {
              height: 55px;
              margin: 0;
              span {
                color: #04be02;
              }
            }
          }
          &.complete {
            p {
              span {
                color: #c2aeae;
              }
            }
          }
        }
      }
      .itemBot {
        height: 30px;
        line-height: 30px;
        button {
          width: 100%;
          display: block;
          height: 30px;
          border: none;
          background: #fff;
          outline: none;
        }
      }
    }
    .noMoreData {
      height: 50px;
      line-height: 30px;
      text-align: center;
      font-size: 12px;
      color: #999;
    }
  }
  .secondItem {
    .box {
      .listItem {
        .itemMid {
          border-bottom: none;
        }
      }
    }
  }

</style>
