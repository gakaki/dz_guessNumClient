// pages/tixian/tixian.js
let app = getApp();
import { doFetch,fixedNum } from '../../utils/rest.js';
import { configs } from '../../utils/configs.js';
let LimitPackageSum = 50000;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    remainder: '0',
    withdraw: '',
    withdrawSrc: 'https://gengxin.odao.com/update/h5/wangcai/withdraw/withdraw.png',
    showTip:false,
    showPop:false,
    simpleTip:''
  },

  /**
   * 获取input输入的信息
   */
  getMoney: function(e) {

    let value = e.detail.value;
    this.setData({
      withdraw: v
    })
    if (value > LimitPackageSum) {
      this.setData({
        simpleTip: '提现金额上限为50000'
      })
    } else if (value.length && value < 1) {
      this.setData({
        simpleTip: '提现金额最少1元'
      })
    } else {
      this.setData({
        simpleTip: ''
      })
    } 
    
    let str;
    let v = e.detail.value.split(".")
    if (v[1] != undefined) {
      v[1] = v[1].substring(0, 2)
      str = v[0] + '.' + v[1]
    } else {
      str = v[0]
    }
    return str
  },

  allRemain: function() {
    if (this.data.remainder > LimitPackageSum){
      this.setData({
        withdraw: LimitPackageSum
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
  toQuestion: function(e) {
    if (app.preventMoreTap(e)) { return; }
    wx.navigateTo({
      url: '../../pages/help/help',
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
      imageUrl: 'https://gengxin.odao.com/update/h5/wangcai/common/share.png',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})