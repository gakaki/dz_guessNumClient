// pages/rank/rank.js
import {configs} from '../../utils/configs.js';
import { doFetch, getUid } from '../../utils/rest.js';
let app = getApp();
let that;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    withdrawSrc: 'https://gengxin.odao.com/update/h5/wangcai/common/withdraw.png',
    sendSrc: 'https://gengxin.odao.com/update/h5/wangcai/common/me-send.png',
    showSrc: 'https://gengxin.odao.com/update/h5/wangcai/common/show-rank.png',
    password:[],
    pidMoney:0,
    comment:[],
    getInfo: [],
    shareTitle:"我领取到了s%元福利，快来看看我的战绩",
    pid:'',
    isOwner: false,
    packageTip: '',
    hasPackageTip: false,
    isSending: false
  },

  /**
   * 页面跳转
   */
  toTixian: function (e) {
    if (app.preventMoreTap(e)) { return; }
    wx.navigateTo({
      url: '../tixian/tixian',
    })
  },
  toSend: function(e) {
    if (app.preventMoreTap(e)) { return; }
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
    if(this.data.isOwner){
      this.setData({
        sendSrc: 'https://gengxin.odao.com/update/h5/wangcai/common/send-another-active.png'
      })
    }
    else{
      this.setData({
        sendSrc: 'https://gengxin.odao.com/update/h5/wangcai/common/me-send-active.png'
      })
    }
  },

  sendCel: function () {
    if (this.data.isOwner) {
      this.setData({
        sendSrc: 'https://gengxin.odao.com/update/h5/wangcai/common/send-another.png'
      })
    }
    else {
      this.setData({
        sendSrc: 'https://gengxin.odao.com/update/h5/wangcai/common/me-send.png'
      })
    }
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
    that = this;
    if(options.pid){
      this.data.pid = options.pid;
    }
    
    //获取红包信息
    doFetch('guessnum.getpackrankinglist',{
      pid: this.data.pid
    },(res)=>{
      let data = res.data;
      //判断红包是不是自己的
      if (data.packInfo.userInfo.uid == getUid()){
        this.setData({
          sendSrc: 'https://gengxin.odao.com/update/h5/wangcai/common/send-another.png',
          isOwner: true
        })
      }
      //返回的数据中得到的money为分，需转换为元
      for(let i=0;i<data.rank.length;i++){
        data.rank[i].moneyGot = data.rank[i].moneyGot/100;
      }

      this.setData({
        userInfo: data.packInfo.userInfo,
        password: data.answer,
        pidMoney: data.packInfo.money/100,
        getInfo: data.rank,
      })
      //获取分享人的数据更新到分享的title中
      let info = this.data.getInfo.filter(v => {
        return v.userInfo.uid == getUid()
      })
      //根据自己抢没抢到钱来决定分享的内容
      if(info.length){
        this.data.shareTitle = "我领取到了" + info[0].moneyGot + "元福利，快来看看我的战绩";
      }
      else{
        this.data.shareTitle = "有人在这里领到" + this.data.getInfo[0].moneyGot + "元福利，快来围观啊";
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    return {
      title: this.data.shareTitle,
      path: '/pages/rank/rank?pid='+this.data.pid,
      imageUrl: 'https://gengxin.odao.com/update/h5/wangcai/common/rank-share.png',
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
  }
  
})