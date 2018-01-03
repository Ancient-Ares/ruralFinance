<template>
  <div class="BlackRecord">
    <pageTitle class="getHeader" :title="title"></pageTitle>
    <div class="topSelect">
      <div class="selectArea">
        <select v-model="selectArea">
          <option v-for="option in areaOptions" :value="option.value">
            {{ option.text }}
          </option>
        </select>
      </div>
      <div class="selectType">
        <select v-model="selectType">
          <option v-for="option in typeOptions" :value="option.value">
            {{ option.text }}
          </option>
        </select>
      </div>
    </div>
    <div class="swiperBox">
      <div class="swiperItemBox">
        <div class="swiperItem" style="height: 100%">
          <div class="firstItem">
            <scroller lock-x scrollbar-y use-pullup @on-pullup-loading="loadMore" v-model="status" ref="scroller"
                      class="scrollWarp" style="height: 100%;">
              <div class="box">
                <div class="listItem" v-for="(item, index) in BlackRecordList">
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
                        <span class="tips">已失信</span>
                      </h4>
                      <p class="itemDesc">{{item.thenOrgName}}</p>
                    </div>
                  </div>
                  <div class="itemMid">
                    <div class="info">
                      <p><span>类型:</span><span>{{item.creditType==='1'?'粮食生产':(item.creditType==='2'?'蔬菜园艺':(item.creditType==='3'?'水产养殖':'畜禽养殖'))}}</span></p>
                      <p><span>授信额度:</span><span>{{item.creditMoney}} 元</span></p>
                    </div>
                    <div class="info">
                      <p><span>规模:</span><span>{{item.scale}} {{item.scaleUnit}}</span></p>
                      <p><span>可用额度:</span><span>{{item.availableMoney}} 元</span></p>
                    </div>
                    <div class="info">
                      <p><span>地址:</span><span>{{item.address}}</span></p>
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
  </div>
</template>

<script type="text/ecmascript-6">
  import { Tab, TabItem, Scroller, Spinner } from 'vux'

  export default {
    data () {
      return {
        title: '失信黑名单',
        pageNo: 1,
        BlackRecordList: [],
        noMoreData: false,
        selectArea: 0,
        selectType: 4,
        areaOptions: [{'text': '泰州市', 'value': 0}],
        typeOptions: [
          {'text': '粮食生产', 'value': 1},
          {'text': '蔬菜园艺', 'value': 2},
          {'text': '水产养殖', 'value': 3},
          {'text': '畜禽养殖', 'value': 4}
        ],
        status: {
          pullupStatus: 'default'
        },
        transitionName: 'slide-left',
        show: false
      }
    },
    watch: {
      selectArea (val, oldVal) {
        console.log(val)
      },
      selectType (val, oldVal) {
        if (val !== oldVal) {
          this.BlackRecordList = []
          this.noMoreData = false
          this.pageNo = 1
          this.loadMore()
        }
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
    deactivated () {
//      console.log('deactivated')
    },
    methods: {
      loadMore () {
        this.$vux.loading.show({
          text: 'Loading'
        })
        setTimeout(() => {
          this.$nextTick(() => {
            setTimeout(() => {
              let local = window.localStorage
              let areaCode = local.getItem('areaCode')
              let userId = local.getItem('userId')
              let creditType = this.selectType
              this.$http({
                method: 'get',
                timeout: 10000,
                url: `${this.$root.baseUrl}/finance/app/regulation/pageVoCreditInfo.do`,
                params: {
                  pageNo: this.pageNo,
                  pageSize: '10',
                  state: '2',
                  areaCode: '3212',
                  villageCode: '',
                  creditType: creditType,
                  userId: userId
                }
              }).then((res) => {
                if (res.data.status === 'true') {
                  let data = res.data.data.rows
                  this.BlackRecordList = this.BlackRecordList.concat(data)
                  this.$vux.loading.hide()
                  if (data.length < 10) {
                    this.$refs.scroller.disablePullup()
                    this.$nextTick(() => {
                      this.$refs.scroller.reset()
                    })
                    this.noMoreData = true
                    this.pageNo = 1
                    return false
                  } else {
                    this.pageNo++
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
  .BlackRecord {
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
    .swiperItemBox {
      flex: 1;
      overflow: hidden;
      background-color: #f1f1f1;
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
      border: 1px solid #ddd;
      border-radius: 5px;
      margin-bottom: 10px;
      background: #fff;
      .itemBox {
        width: 100%;
        height: 50px;
        display: flex;
        border-bottom: 1px solid #ddd;
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
            .tips {
              float: right;
              color: #42b983;
              font-size: 14px;
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
        margin: 0 -15px;
        padding: 5px 15px;
        .info {
          margin: 5px 0;
          display: flex;
          & > p {
            flex: 1;
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

  :focus {
    outline: none;
  }

  .topSelect {
    display: flex;
    position: relative;
    padding: 5px 0;
    &:after {
      content: '';
      height: 1px;
      width: 100%;
      position: absolute;
      bottom: 0;
      left: 0;
      background: #ddd;
    }
    div {
      flex: 1;
      overflow: hidden;
      border-right: 1px solid #c8c8cd;
      position: relative;
      &:after {
        content: " ";
        display: inline-block;
        height: 6px;
        width: 6px;
        border-width: 2px 2px 0 0;
        border-color: #c8c8cd;
        border-style: solid;
        -webkit-transform: matrix(0.71, 0.71, 0.71, -0.71, 0, 0);
        transform: matrix(0.71, 0.71, 0.71, -0.71, 0, 0);
        position: absolute;
        top: 50%;
        margin-top: -5px;
        right: 20px;
      }
      select {
        appearance: none;
        -moz-appearance: none;
        -webkit-appearance: none;
        color: #666;
        box-sizing: border-box;
        border: none;
        width: auto;
        padding: 8px 35%;
        margin: 0;
        font-size: 14px;
        background: #fff;
        option {
          text-align: center;
        }
      }
    }
    div:last-child {
      border: none
    }
  }

</style>
