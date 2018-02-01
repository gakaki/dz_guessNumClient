// pages/rank/rank.js

let app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    withdrawSrc: 'https://gengxin.odao.com/update/h5/wangcai/common/withdraw.png',
    sendSrc: 'https://gengxin.odao.com/update/h5/wangcai/common/me-send.png',
    showSrc: 'https://gengxin.odao.com/update/h5/wangcai/common/show-rank.png',
    num:[1,3,4,6],
    myMoney:9999,
    getInfo: [{
      avatar: 11,
      nickname: "昵称一共八个文字",
      guessNum: [1111,1524,3454],
      guessResult: ['1A1B','2A0B','3A0B'],
      gold: 9999
    }, {
      avatar: 11,
      nickname: "昵称一共八个文字",
      guessNum: [1210],
      guessResult: ['1A1B'],
      gold: 201
    }, {
      avatar: 11,
      nickname: "昵称一共八个文字",
      guessNum: [1359, 1324, 6451,2698],
      guessResult: ['1A1B', '2A0B', '3A0B','2A2B'],
      gold: 3265
    },
    {
      avatar: 11,
      nickname: "昵称一共八个文字",
      guessNum: [1111, 1524, 3454],
      guessResult: ['1A1B', '2A0B', '3A0B'],
      gold: 1514
    }, {
      avatar: 11,
      nickname: "昵称一共八个文字",
      guessNum: [1111, 1524, 3454],
      guessResult: ['1A1B', '2A0B', '3A0B'],
      gold: 11
    }]
  },

  /**
   * 页面跳转
   */
  toTixian: function () {
    wx.navigateTo({
      url: '../tixian/tixian',
    })
  },

  toSend: function() {
    wx.navigateTo({
      url: '../index/index',
    })
  },
  
  /**
   * 按钮动作效果
   */
  withDrawAct: function() {
    this.setData({
      withdrawSrc: 'https://gengxin.odao.com/update/h5/wangcai/common/withdraw-active.png'
    })
  },

  withDrawCel: function() {
    this.setData({
      withdrawSrc: 'https://gengxin.odao.com/update/h5/wangcai/common/withdraw.png'
    })
  },

  sendAct: function() {
    this.setData({
      sendSrc: 'https://gengxin.odao.com/update/h5/wangcai/common/me-send-active.png'
    })
  },

  sendCel: function () {
    this.setData({
      sendSrc: 'https://gengxin.odao.com/update/h5/wangcai/common/me-send.png'
    })
  },  

  showAct: function() {
    this.setData({
      showSrc: 'https://gengxin.odao.com/update/h5/wangcai/common/shou-rank-active.png'
    })
  },

  showCel: function () {
    this.setData({
      showSrc: 'https://gengxin.odao.com/update/h5/wangcai/common/show-rank.png'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
  
})