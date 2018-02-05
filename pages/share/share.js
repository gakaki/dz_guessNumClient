// pages/share/share.js

let app = getApp();

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
    shareImg:"",
    title:"",
    pid:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (res) {
    this.setData({
      title:res.title,
      pid:res.pid
    })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
      console.log(this.data.userInfo)
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
      title: '红包',
      path: '/page/guess/guess?pid=' + this.data.pid,
      success: function (res) {
        // 转发成功
        wx.showShareMenu({
          // 要求小程序返回分享目标信息
          withShareTicket: true
        });
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  totry(){
    let url = '../guess/guess?pid=' + this.data.pid; 
    // let url = '../guess/guess?pid=1517638759'
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
  },
  shareFriendC() {
    let page = getCurrentPages();
    let src = '../../assets/share/share-img.png'
    this.setData({
      canvasIndex:true
    })
    wx.downloadFile({
      url: page[0].data.userInfo.avatarUrl, //仅为示例，并非真实的资源
      success: function (res) {
        // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
        console.log(res)
      }
    })
    const ctx = wx.createCanvasContext('myCanvas')
    ctx.drawImage(src, 0, 0, 375, 603)
    ctx.drawImage(this.data.userInfo.avatarUrl, 297, 0,154,154)
    ctx.draw(false, ()=> {
      wx.canvasToTempFilePath({
        x: 0,
        y: 0,
        width: 750,
        height: 1206,
        destWidth: 750,
        destHeight: 1206,
        canvasId: 'myCanvas',
        success(res) {
          wx.previewImage({
            current: '', // 当前显示图片的http链接
            urls: [res.tempFilePath] // 需要预览的图片http链接列表
          })
          // wx.saveImageToPhotosAlbum({
          //   filePath: res.tempFilePath,
          //   success(res) {
          //     console.log(res)
          //   },
          //   fail(res) {
          //     console.log(res)
          //   }
          // })
        }
      })
    })
  }
})