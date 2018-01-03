<template>
  <div class="get">
    <pageTitle class="getHeader" :title="title"></pageTitle>
    <div class="swiperBox">
      <div class="tabBox clearfix">
        <tab :line-width='2' active-color='#1ecc6d' v-model="index">
          <tab-item class="vux-center" :selected="first === item" v-for="(item, index) in list" @click="first = item"
                    :key="index">
            <p @click="changeTab(index)">{{item}}</p>
          </tab-item>
        </tab>
      </div>
      <div class="swiperItemBox">
        <div class="swiperItem" style="height: 100%">
          <div class="firstItem" v-show="index === 0">
            <scroller lock-x scrollbar-y use-pullup @on-pullup-loading="loadMore1" v-model="status1" ref="scroller1"
                      class="scrollWarp" style="height: 100%;">
              <div class="box">
                <div class="listItem" v-for="(item, index) in LoanList"
                     @click="checkFlow('getDetail', item.financeId)">
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
                    <div class="msg">
                      <icon slot="icon" name="msg" scale="1.4"></icon>
                      <span>有{{item.thenCreditScaleWithUnit}}地，用于{{item.financeUsages === '1' ? '扩大生产' : '资金周转'}}</span>
                    </div>
                    <div class="info">
                      <div class="interestRate">
                        <p><span>5%</span></p>
                        <h3>利率</h3>
                      </div>
                      <div class="month">
                        <p><span>{{item.month}}</span> 月</p>
                        <h3>期限</h3>
                      </div>
                      <div class="money">
                        <p><span>{{item.applyMoney}}</span> 元</p>
                        <h3>金额</h3>
                      </div>
                    </div>
                    <div class="process">
                      <p>{{getState(item.schedule)}}</p>
                    </div>
                  </div>
                  <div class="itemBot">
                    <icon slot="icon" name="protect" scale="1.6"></icon>
                    <span>安全保障体系</span>
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
            <scroller lock-x scrollbar-y use-pullup @on-pullup-loading="loadMore2" v-model="status2" ref="scroller2"
                      class="scrollWarp" style="height: 100%">
              <div class="box">
                <div class="listItem" v-for="(item, index) in LoanComList"
                     @click="checkFlow('getDetail', item.financeId)">
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
                    <div class="msg">
                      <icon slot="icon" name="msg" scale="1.4"></icon>
                      <span>有{{item.thenCreditScaleWithUnit}}地，用于{{item.financeUsages === '1' ? '扩大生产' : '资金周转'}}</span>
                    </div>
                    <div class="info">
                      <div class="interestRate">
                        <p><span>5%</span></p>
                        <h3>利率</h3>
                      </div>
                      <div class="month">
                        <p><span>{{item.month}}</span> 月</p>
                        <h3>期限</h3>
                      </div>
                      <div class="money">
                        <p><span>{{item.applyMoney}}</span> 元</p>
                        <h3>金额</h3>
                      </div>
                    </div>
                    <div class="process">
                      <p>{{getState(item.schedule)}}</p>
                    </div>
                  </div>
                  <div class="itemBot">
                    <icon slot="icon" name="protect" scale="1.6"></icon>
                    <span>安全保障体系</span>
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
        title: '贷款列表',
        list: list(),
        first: '贷款项目',
        index: 0,
        LoanPageNo: 1,
        LoanComPageNo: 1,
        LoanList: [],
        LoanComList: [],
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
        if (item === 1 && this.LoanComList.length === 0) {
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
                  pageNo: this.LoanPageNo,
                  pageSize: '10',
                  userId: userId,
                  areaCode: areaCode,
                  villageCode: '',
                  isEnd: '0'
                }
              }).then((res) => {
                if (res.data.status === 'true') {
                  let data = res.data.data.rows
                  this.LoanList = this.LoanList.concat(data)
                  this.$vux.loading.hide()
                  if (data.length === 0) {
                    this.$refs.scroller1.disablePullup()
                    this.$nextTick(() => {
                      this.$refs.scroller1.reset()
                    })
                    this.noMoreData1 = true
                    this.LoanPageNo = 0
                    return false
                  } else {
                    // this.LoanPageNo++
                    this.$nextTick(() => {
                      this.$refs.scroller1.donePullup()
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
                  pageNo: this.LoanComPageNo,
                  pageSize: '10',
                  userId: userId,
                  areaCode: areaCode,
                  villageCode: '',
                  isEnd: '1'
                }
              }).then((res) => {
                if (res.data.status === 'true') {
                  let data = res.data.data.rows
                  this.LoanComList = this.LoanComList.concat(data)
                  this.$vux.loading.hide()
                  if (data.length < 10) {
                    this.$refs.scroller2.disablePullup()
                    this.$nextTick(() => {
                      this.$refs.scroller2.reset()
                    })
                    this.noMoreData2 = true
                    this.LoanComPageNo = 0
                    return false
                  } else {
                    this.LoanComPageNo++
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
      nextRouter (path) {
        this.$router.push(path)
      },
      checkFlow (path, id) {
        let local = window.localStorage
        local.setItem('financeId', id)
        this.nextRouter(path)
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
  .main {
    overflow: hidden;
  }
  .get {
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
      padding: 10px 15px;
      border: 1px solid #8d8d8d;
      border-radius: 5px;
      margin-bottom: 10px;
      height: 184px;
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
          display: flex;
          & > div {
            text-align: center;
            & > h3 {
              font-size: 14px;
              margin-top: 5px;
            }
            & > p {
              span {
                font-size: 16px;
                color: #ff7300;
              }
            }
          }
          .interestRate {
            flex: 1;
          }
          .month {
            flex: 1;
          }
          .money {
            flex: 1;
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
        margin-bottom: -10px;
        font-size: 13px;
        color: #666;
        svg {
          position: relative;
          top: 2.5px;
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

</style>
