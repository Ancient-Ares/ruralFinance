<template>
  <div id="app">
    <div class="main">
      <transition class="trasitionCss" :name="'vux-pop-' + ($router.direction === 'forward' ? 'in' : 'out')">
        <!--<keep-alive>-->
        <router-view></router-view>
        <!--</keep-alive>-->
      </transition>
    </div>
    <tabbar v-if="$route.name === 'Home'||$route.name==='Get'||$route.name==='Message'||$route.name==='Center'"
            class="botBar">
      <tabbar-item :link="linkPath()" :selected="routerPath()">
        <icon slot="icon" name="home" scale="2.5"></icon>
        <span slot="label">首页</span>
      </tabbar-item>
      <tabbar-item link="/Get" :selected="$route.path === '/Get'">
        <icon slot="icon" name="news" scale="2.5"></icon>
        <span slot="label">审批</span>
      </tabbar-item>
      <tabbar-item :class="{'supBox':checkBadge}" link="/Message" :selected="$route.path === '/Message'">
        <icon slot="icon" name="message" scale="2.5"></icon>
        <span slot="label">消息</span>
      </tabbar-item>
      <tabbar-item link="/Center" :selected="$route.path === '/Center'">
        <icon slot="icon" name="setting" scale="2.5"></icon>
        <span slot="label">我的</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
  import { Tabbar, TabbarItem } from 'vux'

  export default {
    name: 'app',
    data () {
      return {
        checkBadge: false
      }
    },
    created () {
    },
    mounted () {
    },
    methods: {
      changeBadge () {
        this.$nextTick(function () {
          this.checkBadge = false
        })
      },
      linkPath () {
        let local = window.localStorage
        let orgIdStr = local.getItem('orgId')
        let nmwUserId = local.getItem('nmwUserId')
        let fullPathStr = `/?userId=${nmwUserId}&orgId=${orgIdStr}`
        return fullPathStr
      },
      routerPath () {
        let local = window.localStorage
        let orgIdStr = local.getItem('orgId')
        let nmwUserId = local.getItem('nmwUserId')
        let fullPathStr = `/?userId=${nmwUserId}&orgId=${orgIdStr}`
        return this.$route.path === fullPathStr || this.$route.path === '/'
      }
    },
    components: {
      Tabbar,
      TabbarItem
    }
  }
</script>

<style lang="less" type="text/less">
  @import '~vux/src/styles/reset.less';

  html, body {
    background-color: #fbf9fe;
    height: 100%;
    width: 100%;
  }

  .getHeader {
    height: 40px;
  }

  .tip {
    color: #999;
    background: #fbf9fe;
    font-size: 12px;
    padding: 5px 0 5px 10px;
    position: relative;
    &:after, &:before {
      content: " ";
      position: absolute;
      left: 0;
      width: 100%;
      height: 1px;
      color: #d9d9d9;
      -webkit-transform-origin: 0 0;
      transform-origin: 0 0;
      -webkit-transform: scaleY(0.5);
      transform: scaleY(0.5);
    }
    &:after {
      bottom: 0;
      border-bottom: 1px solid #d9d9d9;
    }
    &:before {
      top: 0;
      border-top: 1px solid #d9d9d9;
    }
  }

  .afterLine {
    position: relative;
    &:after {
      content: " ";
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 1px;
      border-top: 1px solid #d9d9d9;
      color: #d9d9d9;
      -webkit-transform-origin: 0 0;
      transform-origin: 0 0;
      -webkit-transform: scaleY(0.5);
      transform: scaleY(0.5);
    }
  }

  .beforeLine {
    position: relative;
    &:before {
      content: " ";
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 1px;
      border-top: 1px solid #d9d9d9;
      color: #d9d9d9;
      -webkit-transform-origin: 0 0;
      transform-origin: 0 0;
      -webkit-transform: scaleY(0.5);
      transform: scaleY(0.5);
    }
  }

  .vux-check-icon > .weui-icon-success:before, .vux-check-icon > .weui-icon-success-circle:before {
    color: #1ecc6e !important;
  }

  p, h3 {
    font-weight: normal;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .bg_white {
    background-color: #fff;
  }

  .vux-toast {
    .weui-toast__content {
      color: #fff
    }
  }

  ul li { list-style: none }

  a {
    color: #999;
    -webkit-tap-highlight-color: rgba(153, 153, 153, 0.1);
    &.weui-bar__item_on div svg, &.weui-bar__item_on p span {
      color: #0dcf6e;
    }
  }

  .clearfix { overflow: hidden; _zoom: 1; }

  #app {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    .main {
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      overflow-scrolling: touch;
      flex: 1;
      transform-style: preserve-3d;
      background: #fff;
      & > div {
        width: 100%;
      }
    }
    .botBar {
      flex: 0 0 50px;
      position: static;
    }
  }

  .trasitionCss {
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }

  .vux-pop-out-enter-active,
  .vux-pop-out-leave-active,
  .vux-pop-in-enter-active,
  .vux-pop-in-leave-active {
    will-change: transform;
    transition: all 500ms;
    height: 100%;
    top: 0px;
    position: absolute;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    -webkit-perspective: 1000;
    perspective: 1000;
  }

  .vux-pop-out-enter {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }

  .vux-pop-out-leave-active {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }

  .vux-pop-in-enter {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }

  .vux-pop-in-leave-active {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }

  .line {
    padding: 2px 0 2px 10px;
    margin: 0;
    background-color: #f1f5f9;
    font-size: 14px;
    color: #999;
  }

  .supBox {
    position: relative;
    &:after {
      content: '';
      position: absolute;
      height: 8px;
      width: 8px;
      border-radius: 50%;
      background: #ff0000;
      top: 2px;
      left: 60%;
      z-index: 101;
    }
  }

  @media screen and (max-width: 330px) {
    .canLoan {
      .apply {
        width: 100%;
        overflow-x: hidden;
        background-color: #fff;
        .formGroup {
          .moneyInput {
            input {
              width: 150px !important;
            }
          }
        }
      }
    }
  }
</style>
