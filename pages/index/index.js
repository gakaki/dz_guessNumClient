//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    showAuthTip:false,
    title:'一起来拼智力领红包',
    moneySelect:['1.68','6.6','8.8'],
    hasTicket: true,
    activeIndex:0,
    defineNum:false,
    restMoney:1.38,
    toIntro:false,
    pkBtnActive:false,
    recordUrl:'https://gengxin.odao.com/update/h5/wangcai/index/record.png',
    withUrl:'https://gengxin.odao.com/update/h5/wangcai/index/rest-money.png',
    helpUrl:'https://gengxin.odao.com/update/h5/wangcai/index/question.png'
  },
  getActive(src,dest){
    return src == dest ? 'active' : '';
  },
  introPlay() {
    this.setData({
      toIntro: true
    })
  },
  hideIntro(){
    this.setData({
      toIntro: false
    })
  },
  myRecord(e) {
    if (app.globalData.hasUserInfo) {
      wx.navigateTo({
        url: "../../pages/record/record"
      })
    } else {
      this.setData({
        showAuthTip: true
      })
      // wx.openSetting({
      //   success: (res) => {
      //     app.globalData.hasUserInfo = true
      //     /*
      //      * res.authSetting = {
      //      *   "scope.userInfo": true,
      //      *   "scope.userLocation": true
      //      * }
      //      */
      //   }
      // })
    }
  },
  question(e) {
    if (app.globalData.hasUserInfo) {
      wx.navigateTo({
        url: "../../pages/help/help"
      })
    } else {
      wx.openSetting({
        success: (res) => {
          app.globalData.hasUserInfo = true
          /*
           * res.authSetting = {
           *   "scope.userInfo": true,
           *   "scope.userLocation": true
           * }
           */
        }
      })
    }
  },
  withDraw(e) {
    if (app.globalData.hasUserInfo) {
      wx.navigateTo({
        url: "../../pages/tixian/tixian"
      })
    } else {
      wx.openSetting({
        success: (res) => {
          app.globalData.hasUserInfo = true
          /*
           * res.authSetting = {
           *   "scope.userInfo": true,
           *   "scope.userLocation": true
           * }
           */

        }
      })
    }
  },
  selectMoney(e){
    switch (e.currentTarget.dataset.index) {
      case 0:
        this.setData({
          activeIndex: 0,
          defineNum: false
        })
        break;
      case 1:
        this.setData({
          activeIndex: 1,
          defineNum: false
        })
        break;
      case 2:
        this.setData({
          activeIndex: 2,
          defineNum: false
        })
        break;
    }
  },
  inputNum(){
    this.setData({
      defineNum:true,
      activeIndex: -1,
    })
  },
  showGuessActive(){
    this.setData({
      pkBtnActive:true
    })
  },
  hideGuessActive() {
    this.setData({
      pkBtnActive: false
    })
  },
  showRecordActive(){
    this.setData({
      recordUrl: 'https://gengxin.odao.com/update/h5/wangcai/index/record-active.png'
    })
  },
  hideRecordActive() {
    this.setData({
      recordUrl: 'https://gengxin.odao.com/update/h5/wangcai/index/record.png'
    })
  },
  showWithActive() {
    this.setData({
      withUrl: 'https://gengxin.odao.com/update/h5/wangcai/index/rest-money-active.png'
    })
  },
  hideWithActive() {
    this.setData({
      withUrl: 'https://gengxin.odao.com/update/h5/wangcai/index/rest-money.png'
    })
  },
  showHelpActive() {
    this.setData({
      helpUrl: 'https://gengxin.odao.com/update/h5/wangcai/index/question-active.png'
    })
  },
  hideHelpActive() {
    this.setData({
      helpUrl: 'https://gengxin.odao.com/update/h5/wangcai/index/question.png'
    })
  },
  toGuess(){
    console.log(1)
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '大家一起来拼智力领福利',
      path: '/pages/index/index',
      imageUrl:'../../assets/common/share.png',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})
