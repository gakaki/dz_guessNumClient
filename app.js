//app.js
import {start} from 'utils/rest.js';
import {configs} from 'utils/configs.js'//test


App({
  onLaunch: function (ops) {
    wx.onNetworkStatusChange(function (res) {
      if(res.networkType == 'none') {
        wx.showLoading({
          title: '当前网络不可用'
        })
      } else {
        wx.hideLoading()
      }
    })
   start((res)=>{
     let v = res.info.items[configs.Item.CASHCOUPON];
     if (v) {
       let page = getCurrentPages()[0];
       if(page) {
         page.setData({
           hasTicket: true
         })
       }
     }
   })
  },
  globalData: {
    userInfo: null,
    hasUserInfo:true,
    guessMoney:0
  },

  globalLastTapTime: 0,
  preventMoreTap: function (e) {
    var globaTime = this.globalLastTapTime;
    var time = e.timeStamp;
    if (Math.abs(time - globaTime) < 1000 && globaTime != 0) {
      this.globalLastTapTime = time;
      return true;
    } else {
      this.globalLastTapTime = time;
      return false;
    }
  }
})