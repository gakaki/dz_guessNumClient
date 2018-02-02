//app.js
import {start} from 'utils/rest.js';
import {configs} from 'utils/configs.js'//test

App({
  onLaunch: function (ops) {
    console.log(configs.Item.Get(configs.Item.MONEY))
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        
      }
    })
  //  this.getUserInfo();
   start((res)=>{
      console.log(res)
      console.log(configs.Item.Get(configs.Item.MONEY))
   })
  },
  getUserInfo(){
    // 获取用户信息
    wx.getSetting({
      fail: res => {
        console.log(res)
      },
      success: res => {
        // if (res.authSetting['scope.userInfo']) {
        // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
        wx.getUserInfo({
          success: res => {
            // 可以将 res 发送给后台解码出 unionId
            this.globalData.userInfo = res.userInfo
            this.globalData.hasUserInfo = true
            wx.setStorage({
              key: 'userInfo',
              data: 'res.userInfo',
            })

            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            if (this.userInfoReadyCallback) {
              this.userInfoReadyCallback(res)
            }
          },
          fail: res => {
              wx.openSetting({
                success: (res) => {
                  /*
                   * res.authSetting = {
                   *   "scope.userInfo": true,
                   *   "scope.userLocation": true
                   * }
                   */
                }
              })
          }
        })
        // }
      }
    })
  },
  globalData: {
    userInfo: null,
    hasUserInfo:true
  },

  globalLastTapTime: 0,
  preventMoreTap: function (e) {
    var globaTime = this.globalLastTapTime;
    var time = e.timeStamp;
    if (Math.abs(time - globaTime) < 500 && globaTime != 0) {
      this.globalLastTapTime = time;
      return true;
    } else {
      this.globalLastTapTime = time;
      return false;
    }
  }
})