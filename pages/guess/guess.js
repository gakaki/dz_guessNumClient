// pages/statistics/statistics.js

let app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    inputNum: '',
    warning:false,
    getInfo:[{
      avatar: 11,
      nickname: "昵称一共八个文字",
      num: 5793,
      content: "智商的文字",
      gold:13
    }, {
      avatar: 11,
      nickname: "昵称一共八个文字",
      num: 5793,
      content: "智商的文字",
      gold: 13
    },{
      avatar: 11,
      nickname: "昵称一共八个文字",
      num: 5793,
      content: "智商的文字",
      gold: 13
    },
    {
      avatar: 11,
      nickname: "昵称一共八个文字",
      num: 5793,
      content: "智商的文字",
      gold: 13
    }, {
      avatar: 11,
      nickname: "昵称一共八个文字",
      num: 5793,
      content: "智商的文字",
      gold: 13
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
      console.log(app.globalData.userInfo)
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
  recordtInput(e){
    this.setData({
      warning: false
    })
    this.setData({
      inputNum: e.detail.value
    })
  },
  verifyGuessNum(e) {
    let arr = this.data.inputNum.split('');
    if (this.data.inputNum.length < 4 || !this.arrUniq(arr)) {
      this.setData({
        warning: true
      })
    }
   },
   arrUniq(arr){
    let newArr = [];
    for(let i=0;i<arr.length;i++) {
      if(newArr.indexOf(arr[i]) == -1) {
        newArr.push(arr[i]);
      }
    }
    console.log(arr.length > newArr.length )
    return arr.length > newArr.length ? false: true
   },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})