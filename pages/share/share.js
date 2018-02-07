// pages/share/share.js

let app = getApp();
import { canvas } from '../../utils/util.js';
let that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canvasIndex:false,
    friendUrl:'https://gengxin.odao.com/update/h5/wangcai/share/transmit.png',
    friendCUrl:'https://gengxin.odao.com/update/h5/wangcai/share/friendC-share.png',
    title:"",
    pid:"",
    packageTip: "",
    hasPackageTip: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (res) {
    console.log(res,'shareeeeeeLoad')
    that = this;
    this.setData({
      title:res.title,
      pid:res.pid
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

    wx.showShareMenu({
      withShareTicket: true
    })
  },
  onShow(e) {
    wx.showShareMenu({
      withShareTicket: true
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage(res) {
    return {
      title: '大家一起来拼智力领福利',
      path: '/pages/guess/guess?pid=' + this.data.pid,
      success: function (res) {
        doFetch('guessnum.getacceleration', {}, (res) => {
          if (res.code == 0) {
            that.setData({
              packageTip: "恭喜获得1张加速卡",
              hasPackageTip: true,
            })
          }
        })
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  totry(){
    console.log(this.data.pid,'piddddddddddddddddd')
    let url = '../guess/guess?pid=' + this.data.pid; 
    wx.navigateTo({url})
  },
  showFriendActive() {
    this.setData({
      friendUrl: 'https://gengxin.odao.com/update/h5/wangcai/share/transmit-active.png'
    })
  },
  hideFriendActive(){
    this.setData({
      friendUrl: 'https://gengxin.odao.com/update/h5/wangcai/share/transmit.png'
    })
  },
  shareFriendCActive(){
    this.setData({
      friendUrl: 'https://gengxin.odao.com/update/h5/wangcai/share/transmit-active.png'
    })
  },
  hideFriendCActive() {
    this.setData({
      friendUrl: 'https://gengxin.odao.com/update/h5/wangcai/share/transmit.png'
    })
  }
})