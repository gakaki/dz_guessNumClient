// pages/tixian/tixian.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    remainder: 520,
    withdraw: '',
    withdrawSrc: 'https://gengxin.odao.com/update/h5/wangcai/withdraw/withdraw.png'
  },

  /**
   * 获取input输入的信息
   */
  getMoney: function(e) {
    console.log(e.detail.value)
    this.setData({
      withdraw: e.detail.value
    })
  },

  allRemain: function() {
    this.setData({
      withdraw: this.data.remainder
    })
  },

  /**
   * 确认提现
   */
  confirmWithdraw: function() {
    
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
    wx.navigateTo({
      url: '../help/help',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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