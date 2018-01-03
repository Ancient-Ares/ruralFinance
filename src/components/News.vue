<template>
  <div class="scroller padT">
    <pageTitle :title="title"></pageTitle>
    <scroller lock-x scrollbar-y use-pullup @on-pullup-loading="loadMore" v-model="status" ref="scroller" class="scrollWarp" style="height: 100%;overflow: visible;">
      <div class="box">
        <div class="listItem" @click="toggleShow">
          <div class="itemBox">
            <div class="itemImg">
              <img src="http://placeholder.qiniudn.com/60x60/3cc51f/ffffff" alt="">
            </div>
            <div class="itemText">
              <h4 class="itemTitle">标题一</h4>
              <p class="itemDesc">由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。</p>
            </div>
          </div>
          <ul class="itemInfo">
            <li class="itemText">来源信息：大苏网</li>
            <li class="itemText">时间：2017-08-20</li>
          </ul>
        </div>
      </div>
      <!--pullup slot-->
      <div slot="pullup" class="xs-plugin-pullup-container xs-plugin-pullup-up">
        <span v-show="status.pullupStatus === 'default'"></span>
        <span class="pullup-arrow" v-show="status.pullupStatus === 'down'" :class="{'rotate': status.pullupStatus === 'up'}">↑</span>
        <span v-show="status.pullupStatus === 'loading'">
          <spinner type="ios-small"></spinner>
        </span>
      </div>
    </scroller>
    <div v-transfer-dom>
      <popup v-model="show" position="right" width="100%">
        <serDetail></serDetail>
      </popup>
    </div>
  </div>
</template>
<script>
  import { Scroller, Spinner, Panel, TransferDom, Popup } from 'vux'
  import serDetail from './CheckList2'

  export default {
    data () {
      return {
        title: '服务',
        status: {
          pullupStatus: 'default'
        },
        show: false
      }
    },
    directives: {
      TransferDom
    },
    activated () {
      console.log('activated')
    },
    deactivated () {
      console.log('deactivated')
    },
    methods: {
      loadMore () {
        setTimeout(() => {
          this.$nextTick(() => {
            setTimeout(() => {
              console.log(this.$refs.scroller)
              this.$refs.scroller.donePullup()
            }, 10)
          })
        }, 800)
      },
      toggleShow () {
        this.show = !this.show
      }
    },
    components: {
      Scroller,
      Spinner,
      Panel,
      Popup,
      serDetail
    }
  }
</script>
<style lang="less" type="text/less" scoped>
  .rotate {
    transform: rotate(-180deg);
  }

  .popup {
    width: 100%;
    height: 100%;
  }

  .pulldown-arrow {
    display: inline-block;
    transition: all linear 0.2s;
    color: #666;
    font-size: 25px;
  }

  .scroller {
    width: 100%;
    height: 100%;
    overflow: hidden;
    .box {
      padding-top: 10px
    }
    .scrollWarp {
      position: fixed;
      top: 40px;
      left: 0;
      width: 100%;
    }
    .xs-plugin-pulldown-container {
      position: absolute;
      width: 100%;
      height: 40px;
      top: -40px;
      text-align: center;
    }
    .xs-plugin-pullup-container {
      position: absolute;
      width: 100%;
      height: 40px;
      bottom: -40px;
      text-align: center;
    }
  }

  .listItem {
    display: block;
    padding: 10px 15px;
    border-bottom: 1px solid #ddd;
    position: relative;
    .itemBox {
      display: -webkit-box;
      display: -webkit-flex;
      display: flex;
      -webkit-box-align: center;
      -webkit-align-items: center;
      align-items: center;
      .itemImg {
        margin-right: 10px;
        width: 60px;
        height: 60px;
        line-height: 60px;
        text-align: center;
      }
      .itemText {
        .itemTitle {
          color: #000;
          font-weight: 400;
          font-size: 17px;
          width: auto;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          word-wrap: normal;
          word-wrap: break-word;
          word-break: break-all;
        }
        .itemDesc {
          color: #999999;
          font-size: 13px;
          line-height: 1.2;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
      }
    }
    .itemInfo {
      margin-top: 10px;
      font-size: 13px;
      color: #cecece;
      line-height: 1rem;
      list-style: none;
      overflow: hidden;
      display: flex;
      li {
        -webkit-flex: 1;
        flex: 1;
        text-align: left;
      }
    }
  }
</style>
