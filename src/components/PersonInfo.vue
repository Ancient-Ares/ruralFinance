<template>
  <div>
    <pageTitle class="getHeader" :title="title"></pageTitle>
    <div class="psersonInfo">
      <div class="headerInfo afterLine">
        <div class="itemBox">
          <div class="itemImg">
            <img src="../assets/ava.jpg">
          </div>
          <div class="itemText">
            <h4 class="itemTitle">
              <span class="name">{{userName}}</span>
              <span class="score">
                <icon slot="icon" name="xin" scale="1.6"></icon>
                <span>300分</span>
              </span>
              <!--<span class="time">2017-03-20 16:20</span>-->
            </h4>
            <p class="itemDesc">{{orgName}}</p>
          </div>
        </div>
      </div>
      <div class="personFile afterLine">
        <h3>
          <icon slot="icon" name="info2" scale="1.7"></icon>
          <span>个人信息</span>
        </h3>
        <div class="fileBox">
          <div class="item">
            <span>姓名：</span>
            <span>{{userName}}</span>
          </div>
          <div class="item">
            <span>性别：</span>
            <span>{{gender === '0' ? ('男性') : ('女性')}}</span>
          </div>
          <div class="item">
            <span>籍贯：</span>
            <span>{{userCityAreaName}}{{userDistrictAreaName}}</span>
          </div>
          <div class="item">
            <span>手机：</span>
            <span>{{mobile}}</span>
          </div>
          <div class="item">
            <span>婚姻状况：</span>
            <span>{{marriageStatus === 1 ? '已婚' : (marriageStatus === 2 ? '未婚' : (marriageStatus === 3 ? '离异' : '其他'))}}</span>
          </div>
          <div class="item">
            <span>联系人：</span>
            <span>{{contactName}}</span>
          </div>
          <div class="item">
            <span>联系人电话：</span>
            <span>{{contactMobile}}</span>
          </div>
          <div class="item">
            <span>联系人关系：</span>
            <span>{{contactRelation === 1 ? '配偶' : (contactRelation === 2 ? '子女' : (contactRelation === 3 ? '父母' : (contactRelation === 4 ? '朋友' : '其他')))}}</span>
          </div>
          <div class="item">
            <span>家庭地址：</span>
            <span>{{userAddress}}</span>
          </div>
        </div>
      </div>
      <!--<div class="creditFile afterLine">-->
      <!--<h3>-->
      <!--<icon slot="icon" name="info1" scale="2"></icon>-->
      <!--<span>借款人信用档案</span>-->
      <!--</h3>-->
      <!--<div class="fileBox">-->
      <!--<div class="item">-->
      <!--<span>农户信用积分：</span>-->
      <!--<span>460分</span>-->
      <!--</div>-->
      <!--<div class="item">-->
      <!--<span>信用等级：</span>-->
      <!--<span>极好</span>-->
      <!--</div>-->
      <!--<div class="item">-->
      <!--<span>累计借款金额：</span>-->
      <!--<span>150,000元</span>-->
      <!--</div>-->
      <!--<div class="item">-->
      <!--<span>成功借款：</span>-->
      <!--<span>5笔</span>-->
      <!--</div>-->
      <!--<div class="item">-->
      <!--<span>累计结清借款：</span>-->
      <!--<span>100,000元</span>-->
      <!--</div>-->
      <!--<div class="item">-->
      <!--<span>发生逾期：</span>-->
      <!--<span>0期</span>-->
      <!--</div>-->
      <!--<div class="item">-->
      <!--<span>集中授信额度：</span>-->
      <!--<span>300,000元</span>-->
      <!--</div>-->
      <!--</div>-->
      <!--</div>-->
      <div class="productFile afterLine">
        <h3>
          <icon slot="icon" name="info3" scale="2"></icon>
          <span>生产信息</span>
        </h3>
        <div class="fileBox">
          <div class="item">
            <span>经营类型：</span>
            <span>{{classify === 1 ? '家庭农场' : (classify === 2 ? '种养大户' : (classify === 3 ? '合作社' : (classify === 4 ? '企业' : '其他')))}}</span>
          </div>
          <div class="item">
            <span>产业类型：</span>
            <span>{{orgKinds}}</span>
          </div>
          <div class="item">
            <span>生产品种：</span>
            <span>{{creditType === 1 ? '粮食生产' : (creditType === 2 ? '蔬菜园艺' : (creditType === 3 ? '水产养殖' : '畜禽养殖'))}}</span>
          </div>
          <div class="item">
            <span>亩数：</span>
            <span>{{scale}}{{scaleUnit}}</span>
          </div>
        </div>
      </div>
      <div class="moneyFile afterLine">
        <h3>
          <icon slot="icon" name="info4" scale="2"></icon>
          <span>财产信息</span>
        </h3>
        <div class="fileBox">
          <div class="item">
            <span>水田：</span>
            <span>{{scale}} {{scaleUnit}}</span>
          </div>
          <div class="item">
            <span>旱田：</span>
            <span>{{scale}} {{scaleUnit}}</span>
          </div>
          <div class="item">
            <span>农机：</span>
            <span>拖拉机 1 台</span>
          </div>
          <div class="item">
            <span>农具：</span>
            <span>烘干机 1 台</span>
          </div>
        </div>
      </div>
      <div class="contractFile" @click="nextDetail('IdCard')">
        <h3>
          <icon slot="icon" name="info5" scale="2"></icon>
          <span>身份信息</span>
        </h3>
      </div>
      <div class="LicenseFile beforeLine" @click="nextDetail('Contract')">
        <h3>
          <icon slot="icon" name="info5" scale="2"></icon>
          <span>合同信息</span>
        </h3>
      </div>
      <div class="LicenseFile beforeLine" @click="nextDetail('BusLicense')">
        <h3>
          <icon slot="icon" name="info5" scale="2"></icon>
          <span>执照信息</span>
        </h3>
      </div>
      <div class="LicenseFile beforeLine" @click="nextDetail('OneCardList')">
        <h3>
          <icon slot="icon" name="info5" scale="2"></icon>
          <span>一卡通信息</span>
        </h3>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

  export default {
    data () {
      return {
        title: '农户信息',
        userName: '',
        orgName: '',
        financeUserName: '',
        gender: '',
        marriageStatus: 0,
        userAddress: '',
        userCityAreaName: '',
        userDistrictAreaName: '',
        scale: '',
        scaleUnit: '',
        mobile: '',
        contactName: '',
        contactRelation: '',
        contactMobile: '',
        orgKinds: '',
        creditType: '',
        classify: '',
        farmUserId: '',
        farmOrgId: ''
      }
    },
    beforeCreate () {
      this.$nextTick(function () {
        this.$vux.loading.show({
          text: 'Loading'
        })
        let local = window.localStorage
        let financeId = local.getItem('financeId')
        this.$http({
          method: 'get',
          timeout: 10000,
          url: `${this.$root.baseUrl}/finance/app/finance/showFinanceUserInfo.do`,
          params: {
            financeId: financeId
          }
        }).then((res) => {
          if (res.data.status === 'true') {
            let data = res.data.data
            this.userName = data.userName
            this.orgName = data.orgName
            this.financeUserName = data.financeUserName
            this.gender = data.gender
            this.marriageStatus = data.marriageStatus
            this.userAddress = data.userAddress
            this.userCityAreaName = data.userCityAreaName
            this.userDistrictAreaName = data.userDistrictAreaName
            this.scale = data.scale
            this.scaleUnit = data.scaleUnit
            this.mobile = data.mobile
            this.contactName = data.contactName
            this.contactRelation = data.contactRelation
            this.contactMobile = data.contactMobile
            this.creditType = data.creditType
            this.classify = data.classify
            this.farmUserId = data.userId
            this.farmOrgId = data.orgId
            this.checkKind(data.orgKinds)
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
      console.log('created')
    },
    deactivated () {
      console.log('deactivated')
    },
    mounted () {
      console.log('mounted')
    },
    methods: {
      checkKind (kind) {
        let orgKind = ''
        let kindList = kind.split(',')
        for (let i = 0, len = kindList.length; i < len; i++) {
          if (kindList[i] === '1') {
            orgKind += '种植业,'
          } else if (kindList[i] === '2') {
            orgKind += '畜牧业,'
          } else if (kindList[i] === '3') {
            orgKind += '渔业,'
          } else if (kindList[i] === '4') {
            orgKind += '林业,'
          } else {
            orgKind += '其他,'
          }
        }
        this.orgKinds = orgKind.substring(0, orgKind.length - 1)
      },
      nextDetail (path) {
        window.localStorage.setItem('farmUserId', this.farmUserId)
        window.localStorage.setItem('farmOrgId', this.farmOrgId)
        this.$router.push(path)
      }
    },
    components: {}
  }
</script>

<style type="text/less" lang="less" scoped>
  .psersonInfo {
    background-color: #fff;
    padding: 10px;
    padding-bottom: 80px;
  }

  .getHeader {
    height: 40px;
  }

  .headerInfo {
    position: relative;
    display: block;
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
            font-size: 12px;
          }
        }
        .itemDesc {
          width: 100%;
          color: #666;
        }
      }
    }
  }

  .personFile, .creditFile, .productFile, .moneyFile, .contractFile, .LicenseFile {
    padding: 10px 0;
    h3 {
      font-size: 14px;
      position: relative;
      padding-left: 28px;
      height: 24px;
      line-height: 24px;
      svg {
        position: absolute;
        left: 2px;
        top: 4px;
      }
    }
    .fileBox {
      overflow: hidden;
      zoom: 1;
      padding: 5px 10px;
      & > div:nth-child(odd) {
        min-width: 60%;
      }
      & > div:nth-child(even) {
        width: 40%;
      }
      & > div {
        float: left;
        span {
          font-size: 12px;
        }
        span:nth-child(2) {
          color: #666;
        }
      }
    }
  }
  .contractFile, .LicenseFile {
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
      margin-top: -5px;
      right: 20px;
    }
  }
</style>
