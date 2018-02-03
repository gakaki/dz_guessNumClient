// pages/tixian/tixian.js
let app = getApp();
import { doFetch,fixedNum } from '../../utils/rest.js';
import { configs } from '../../utils/configs.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    remainder: '',
    withdraw: '',
    withdrawSrc: 'https://gengxin.odao.com/update/h5/wangcai/withdraw/withdraw.png',
    showTip:false,
    showPop:false
  },

  /**
   * 获取input输入的信息
   */
  getMoney: function(e) {
    this.setData({
      withdraw: e.detail.value
    })
    if(e.detail.value>50000){
      this.setData({
        showTip:true,
      })
    }
    else{
      this.setData({
        showTip: false
      })
    }
  },

  allRemain: function() {
    if (this.data.remainder>50000){
      this.setData({
        withdraw: 50000
      })
    }
    else{
      this.setData({
        withdraw: this.data.remainder
      })
    }
  },

  /**
   * 确认提现
   */
  confirmWithdraw: function(e) {
    if (app.preventMoreTap(e)) { return; }
    doFetch('user.minappwithdraw',{
      money: this.data.withdraw
    },(res)=>{
      this.setData({
        withdraw:'',
        showPop:true
      })
      console.log(res)
    })
  },

  /**
   * 点击按钮动作效果
   */
  active: function() {
    this.setData({
      withdrawSrc: 'https://gengxin.odao.com/update/h5/wangcai/withdraw/withdraw-active.png'
    })
  },

  cancel: function() {
    this.setData({
      withdrawSrc: 'https://gengxin.odao.com/update/h5/wangcai/withdraw/withdraw.png'
    })
  },

  /**
   * 页面跳转
   */
  toQuestion: function() {
    if (app.preventMoreTap(e)) { return; }
    wx.navigateTo({
      url: '../help/help',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    doFetch('user.getiteminfo',{
      itemId: configs.Item.MONEY
    },(res)=>{
      let money = fixedNum(res.data.data.stock)
      
      this.setData({
        remainder: money
      })
    })
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
    return {
      title: '大家一起来拼智力领福利',
      path: '/pages/index/index',
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