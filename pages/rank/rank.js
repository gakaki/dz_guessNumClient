// pages/rank/rank.js
import {configs} from '../../utils/configs.js';
import { doFetch } from '../../utils/rest.js';
let app = getApp();

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
    pid:''
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
    if(options.pid){
      console.log(options.pid)
      this.data.pid = options.pid;
    }
    
    //获取红包信息
    doFetch('guessnum.getpackrankinglist',{
      pid:this.data.pid
    },(res)=>{
      let data = res.data.data;
      let comments = [];
      for(let i=0;i<data.rank.length;i++){
        let commentNum = Math.floor(Math.random()*3)+1
        console.log(commentNum)
        switch(commentNum) {
          case 1:
            comments.push(configs.Evaluate.Get(data.rank[i].maxMarkId).iqwored1);
            break;
          case 2:
            comments.push(configs.Evaluate.Get(data.rank[i].maxMarkId).iqwored2);
            break;
          case 3:
            comments.push(configs.Evaluate.Get(data.rank[i].maxMarkId).iqwored3);
            break;
        }
      }
      this.setData({
        userInfo: data.packInfo.userInfo,
        password: data.packInfo.password,
        pidMoney: data.packInfo.money,
        getInfo: data.rank,
        comment: comments
      })
      console.log(res.data.data.rank);
    })
    this.data.pid = 1517627250;
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
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: this.data.shareTitle,
      path: '/pages/rank/rank?pid='+this.data.pid,
      imageUrl: '../../assets/common/share.png',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
  
})