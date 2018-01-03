<template>
  <div class="msgDetail">
    <pageTitle class="getHeader" :title="title"></pageTitle>
    <div class="swiperItemBox">
      <div class="swiperItem" style="height: 100%">
        <div class="firstItem" v-if="index === 0">
          <scroller lock-x scrollbar-y use-pullup @on-pullup-loading="loadMore" v-model="status" ref="scroller"
                    class="scrollWarp" style="height: 100%">
            <div class="box">
              <div class="listItem" v-for="(item, index) in MsgList">
                <div class="itemBox">
                  <div class="itemText">
                    <h3><span class="time">{{item.createTime}}</span></h3>
                    <p class="itemDesc"><span>消息内容：</span>{{item.content}}</p>
                  </div>
                </div>
              </div>
              <div class="noMoreData" v-if="noMoreData">已无更多数据</div>
            </div>
            <!--pullup slot-->
            <div slot="pullup" class="xs-plugin-pullup-container xs-plugin-pullup-up">
              <span v-show="status.pullupStatus === 'default'"></span>
              <span class="pullup-arrow" v-show="status.pullupStatus === 'down'"
                    :class="{'rotate': status.pullupStatus === 'up'}">↑</span>
              <span v-show="status.pullupStatus === 'loading'">
                      <spinner type="lines"></spinner>
                  </span>
            </div>
          </scroller>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { Tab, TabItem, Scroller, Spinner } from 'vux'

  export default {
    data () {
      return {
        title: '系统消息',
        index: 0,
        pageNo: 0,
        MsgList: [],
        noMoreData: false,
        status: {
          pullupStatus: 'default'
        },
        transitionName: 'slide-left',
        show: false
      }
    },
    beforeCreate () {
      this.$nextTick(() => {
        this.loadMore()
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
    methods: {
      loadMore () {
        this.$vux.loading.show({
          text: 'Loading'
        })
        setTimeout(() => {
          this.$nextTick(() => {
            setTimeout(() => {
              this.pageNo++
              let local = window.localStorage
              let userId = local.getItem('userId')
              let areaCode = local.getItem('areaCode')
              this.$http({
                method: 'get',
                timeout: 10000,
                url: `${this.$root.baseUrl}/finance/app/message/pageMessage.do`,
                params: {
                  pageNo: this.pageNo,
                  pageSize: '10',
                  userId: userId,
                  type: '1'
                }
              }).then((res) => {
                if (res.data.status === 'true') {
                  let data = res.data.data.rows
                  this.MsgList = this.MsgList.concat(data)
                  this.$vux.loading.hide()
                  if (data.length < 10) {
                    this.$refs.scroller.disablePullup()
                    this.$nextTick(() => {
                      this.$refs.scroller.reset()
                    })
                    this.noMoreData = true
                    this.pageNo = 0
                    return false
                  } else {
                    this.$refs.scroller.donePullup()
                    this.$nextTick(() => {
                      this.$refs.scroller.reset()
                    })
                  }
                } else {
                  this.$refs.scroller.donePullup()
                  this.$nextTick(() => {
                    this.$refs.scroller.reset()
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
                this.$refs.scroller.donePullup()
                this.$nextTick(() => {
                  this.$refs.scroller.reset()
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
  .msgDetail {
    height: 100%;
    width: 100%;
    overflow: hidden;
    flex-direction: column;
    display: flex;
  }

  .getHeader {
    flex: 0 0 40px;
  }

  .swiperItemBox {
    display: inline-flex;
    flex-direction: column;
    flex: 1;
    overflow: hidden;
    overflow: hidden;
    background-color: #fff;
    .swiperItem {
      height: 100%;
      & > div {
        height: 100%;
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
      border: 1px solid #42b983;
      border-radius: 5px;
      margin: 0 auto;
      margin-bottom: 20px;
      width: 90%;
      box-sizing: border-box;
      .itemBox {
        overflow: hidden;
        width: 100%;
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
          margin: 0 10px;
          flex: 1;
          position: relative;
          &:after {
            content: '消息通知';
            position: absolute;
            top: 10px;
            font-size: 12px;
            left: -35px;
            width: 105px;
            height: 25px;
            line-height: 25px;
            color: #fff;
            background-color: #42b983;
            text-align: center;
            transform: rotate(-38deg);
          }
          h3 {
            font-size: 14px;
            border-bottom: 1px solid #42b983;
            padding: 5px 5px 5px 0;
            line-height: 30px;
            height: 30px;
            color: #333;
            .time {
              float: right;
              color: #666;
              font-size: 12px;
            }
          }
          .itemDesc {
            width: 100%;
            color: #333;
            padding: 20px 0;
            text-align: center;
            span {
              color: #666;
            }
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
