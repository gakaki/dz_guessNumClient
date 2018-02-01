// pages/record/record.js

let app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    num: [1, 3, 4, 6], 
    send: "active",
    receive: "",
    list:[{
      title:'一起来拼智力领红包',
      sum:13
    },{
      title: '一起来拼智力领红包',
      sum: 13
    },{
      title:'一起来拼智力领红包',
      sum:13
    }]
  },
  switchTab(e) {
    if (e.currentTarget.dataset.type == 's') {
      this.setData({
        send: "active",
        receive: "",
      })
    } else {
      this.setData({
        send: "",
        receive: "active",
      })
    }
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '我的记录'
    })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  toSendPackage() {
    wx.navigateTo({
      url: '../index/index',
    })
  },
  toWithDraw(){
    wx.navigateTo({
      url: '../index/index',
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})