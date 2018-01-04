<template>
  <div class="loanPage">
    <pageTitle class="getHeader" :title="title"></pageTitle>
    <div class="flow">
      <h3>编号: 20125458557</h3>
      <div class="flowStep afterLine">
        <div class="top">
          <div class="img">
            <img src="../assets/ava.jpg">
          </div>
          <div class="arrows">
            <div class="arrowsLine"></div>
            <div class="arrowsTime">2017.07.08</div>
          </div>
          <div class="img">
            <img src="../assets/ava.jpg">
          </div>
          <div class="arrows">
            <div class="arrowsLine"></div>
            <div class="arrowsTime">2017.07.09</div>
          </div>
          <div class="img">
            <img src="../assets/ava.jpg">
          </div>
        </div>
        <div class="bot">
          <div class="botText1">
            <div class="name">王长宝</div>
            <div class="state">需求发布</div>
          </div>
          <div class="botText2">
            <div class="name">沈高镇农经站</div>
            <div class="state">初审完成</div>
          </div>
          <div class="botText3">
            <div class="name">姜堰区农办</div>
            <div class="state">等待审批</div>
          </div>
        </div>
      </div>
      <div class="flowText">
        <div class="flowitem afterLine">
          <span>审核部门</span>
          <span>沈高镇农经站</span>
        </div>
        <div class="flowitem afterLine">
          <span>审批时间</span>
          <span>2017-07-18 15:33:54</span>
        </div>
        <div class="flowitem afterLine">
          <span>审核意见</span>
          <span>该农户为我镇农户,基本信息属实,申请材料完整。</span>
        </div>
        <div class="flowitem afterLine">
          <span>审核签字</span>
          <span><img src="https://pro.modao.cc/uploads3/images/1113/11132034/raw_1500365587.png"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { XButton } from 'vux'

  export default {
    data () {
      return {
        title: '农业贷款审批'
      }
    },
    methods: {},
    components: {
      XButton
    }
  }
</script>

<style type="text/less" lang="less" scoped>
  .loanPage {
    padding-bottom: 45px;
  }

  .flow {
    padding: 20px 10px;
    background-color: #fff;
    h3 {
      font-size: 14px;
    }
    .flowStep {
      padding: 10px 0;
      .top {
        display: flex;
        padding: 10px 10px;
        & > div {
          flex: 1;
          text-align: center;
        }
        img {
          border-radius: 50%;
          overflow: hidden;
        }
        .arrows {
          .arrowsLine {
            display: inline-block;
            height: 1px;
            width: 55px;
            background-color: #ddd;
            position: relative;
            top: 5px;
            &:after {
              content: "";
              position: absolute;
              right: -1px;
              top: -3.5px;
              height: 1px;
              width: 15px;
              background-color: #ddd;
              transform: rotate(30deg);
            }
          }
          .arrowsTime {
            font-size: 12px;
          }
        }
      }
      .bot {
        display: flex;
        & > div {
          flex: 2;
          text-align: center;
          font-size: 12px;
        }
        .botText1 {
          flex: 1;
        }
        .botText3 {
          flex: 1;
        }
      }
    }
  }

  .flowText {
    width: 100%;
    .flowitem {
      text-align: center;
      font-size: 12px;
      width: 100%;
      line-height: 40px;
      overflow: hidden;
      display: flex;
      span:nth-child(1) {
        flex: 0 0 80px;
      }
      span:nth-child(2) {
        flex: 1;
        text-align: right;
        white-space: nowrap;
        overflow-x: auto;
        color: #999;
        img {
          height: 40px;
          vertical-align: middle;
        }
      }
    }
  }

  .btn_wrap {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 45px;
    overflow: hidden;
    z-index: 9;
    button.weui-btn {
      background-color: #1ecc6e;
      border-radius: 0;
      height: 100%;
    }
  }
</style>
