//index.js
//获取应用实例
const app = getApp()

let u = require('../../utils/util.js')

Page({
  data: {
      title:'一起来拼智力领红包',
      moneySelect:['1.68','6.6','8.8'],
      hasTicket: true,
      activeIndex:0,
      defineNum:false,
      restMoney:1.38,
      toIntro:false
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
  question(e) {
    if (app.globalData.hasUserInfo) {
      wx.navigateTo({
        url: "../../pages/questions/question"
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
        url: "../../pages/questions/question"
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
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: this.data.title,
      path: '/page/user?id=123',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})
