// pages/tixian/tixian.js
let app = getApp();
import { doFetch,fixedNum } from '../../utils/rest.js';
import { configs } from '../../utils/configs.js';
let LimitPackageSum = 50000;
let that;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    remainder: '0.00',
    withdraw: '',
    withdrawSrc: 'https://gengxin.odao.com/update/h5/wangcai/withdraw/withdraw.png',
    showTip:false,
    showPop:false,
    simpleTip:'',
    packageTip: "",
    hasPackageTip: false,
  },

  /**
   * 获取input输入的信息
   */
  getMoney: function(e) {
    let value = e.detail.value;
    //保留两位小数
    let v = e.detail.value.split(".")
    if (v[1] != undefined) {
      v[1] = v[1].substring(0, 2)
      value = v[0] + '.' + v[1]
    } else {
      value = v[0]
    }
    //用户直接输入.时，前一位默认显示0
    if(value == '.'){
      value = '0.'
    }

    this.setData({
      withdraw: value
    })
    
    if (value > LimitPackageSum) {
      this.setData({
        simpleTip: '提现金额上限为50000'
      })
    } else if (value.length && value < 2) {
      this.setData({
        simpleTip: '提现金额最少2元'
      })
    } else {
      this.setData({
        simpleTip: ''
      })
    } 
  },

  allRemain: function() {
    if (this.data.remainder>0){
      if (this.data.remainder > LimitPackageSum) {
        this.setData({
          withdraw: LimitPackageSum
        })
      }
      else {
        this.setData({
          withdraw: this.data.remainder
        })
      }
    }
    else{
      this.setData({
        withdraw: '0.00'
      })
    }
    
  },

  /**
   * 确认提现
   */
  confirmWithdraw: function(e) {
    console.log(this.data)
    if (app.preventMoreTap(e)) { return; }
    if (this.data.withdraw > this.data.remainder) {
      this.setData({
        packageTip: "提现金额超出余额",
        hasPackageTip: true,
      })
      return
    } else if (this.data.withdraw < 2 ) {
      this.setData({
        packageTip: "提现金额至少为2元",
        hasPackageTip: true,
      })
      return
    } else if (this.data.withdraw > LimitPackageSum) {
      this.setData({
        packageTip: "提现金额上限为50000",
        hasPackageTip: true,
      })
      return
    }

    doFetch('user.minappwithdraw',{
      money: this.data.withdraw
    },(res)=>{
      this.setData({
        withdraw:'',
        showPop:true
      })
      doFetch('user.getiteminfo', {
        itemId: configs.Item.MONEY
      }, (res) => {
        if (res.data.data.stock) {
          let money = fixedNum(res.data.data.stock / 100)
          this.setData({
            remainder: money
          })
        }
      })
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
    that = this;
    doFetch('user.getiteminfo',{
      itemId: configs.Item.MONEY
    },(res)=>{
      if (res.data.data.stock){
        console.log(res.data.data.stock)
        let money = fixedNum(res.data.data.stock/100)
        this.setData({
          remainder: money
        })
      }
    })
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
        doFetch('guessnum.getacceleration', {}, (res) => {
          if (res.data.code == 0) {
            that.setData({
              packageTip: "恭喜获得加速卡",
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