<template>
  <div class="Message">
    <pageTitle class="getHeader" :title="title"></pageTitle>
    <div class="messageBox">
      <div class="line">消息列表</div>
      <a class="myMessage" href="javascript:;" @click="nextRouter('MsgDetail')">
        <div class="img"><img src="../assets/my_message.png" alt=""><p class="badge" v-if="systemCount>0">{{systemCount}}</p></div>
        <div class="text"><div><span>系统消息</span></div><p>{{systemDescribes}}</p></div>
      </a>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        title: '消息',
        systemCount: 0,
        systemDescribes: ''
      }
    },
    methods: {
      nextRouter (path) {
        this.$router.push(path)
      }
    },
    beforeCreate () {
      this.$parent.checkBadge = false
      this.$nextTick(function () {
        this.$vux.loading.show({
          text: 'Loading'
        })
        let local = window.localStorage
        let userId = local.getItem('userId')
        this.$http({
          method: 'get',
          timeout: 10000,
          url: `${this.$root.baseUrl}/finance/app/message/listMessageType.do`,
          params: {
            userId: userId
          }
        }).then((res) => {
          if (res.data.status === 'true') {
            let data = res.data.data
            this.systemCount = data[0].noReadCount
            this.systemDescribes = data[0].describes
            this.$vux.loading.hide()
          } else {
            this.$vux.loading.hide()
            this.$nextTick(function () {
              this.$vux.toast.show({
                text: '请求失败,稍后重试！',
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
    created () {
    }
  }
</script>

<style type="text/less" lang="less" scoped>
  .Message {
    height: 100%;
    width: 100%;
    overflow: hidden;
    flex-direction: column;
    display: flex;
  }

  .getHeader {
    flex: 0 0 40px;
  }

  .messageBox {
    .myMessage {
      display: flex;
      height: 60px;
      line-height: 60px;
      border-bottom: 1px solid #ddd;
      position: relative;
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
        position: absolute;
        top: 50%;
        margin-top: -4px;
        right: 16px;
      }
      .img {
        flex: 0 0 70px;
        height: 50px;
        text-align: center;
        position: relative;
        img {
          width: 30px;
          vertical-align: middle;
          border: 1px solid #42b983;
          border-radius: 5px;
          padding: 3px;
        }
        .badge {
          position: absolute;
          top: 7px;
          right: 9px;
          height: 18px;
          width: 18px;
          line-height: 18px;
          border-radius: 50%;
          background: #e4393c;
          color: #fff;
          font-size: 12px;
        }
      }
      .text {
        flex: 1;
        text-align: left;
        font-size: 16px;
        margin-left: 10px;
        color: #333;
        div {
          height: 35px;
          line-height: 45px;
          vertical-align: bottom;
        }
        p {
          height: 25px;
          line-height: 20px;
          font-size: 12px;
          color: #999;
        }
      }
    }
  }

</style>
