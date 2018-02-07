// pages/record/record.js

let app = getApp();
import { doFetch, fixedNum } from '../../utils/rest.js';
const GUESSING = 168;
const OVEREXPIRE = -131;
const PKOver = -132;
const COUNTOVER = -129;
const UNEXIST = -130;
let sendPage = 1;
let receivePage = 1;
let dataLength = 20;
let sendEnd,receiveEnd;
let that;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    num: [1, 3, 4, 6], 
    send: "active",
    receive: "",
    withUrl:'https://gengxin.odao.com/update/h5/wangcai/common/withdraw.png',
    anotherUrl:'https://gengxin.odao.com/update/h5/wangcai/common/send-another.png',
    serverUrl:'https://gengxin.odao.com/update/h5/wangcai/common/service.png',
    receivePackages: { sum: '0.00', num: '0'},
    sendPackages: { sum: '0.00', num: '0'},
    sendRecord:[],
    receiveRecord:[],
    packageTip:'竞猜PK已过期',
    hasPackageTip:false,
    nowPid:''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
    wx.setNavigationBarTitle({
      title: '我的记录'
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

    doFetch('guessnum.getuserpackrecords', {}, res => {
      let sendPackages = res.data.sendPackages;
      let receivePackages = res.data.receivePackages;
      this.setData({
        receivePackages: receivePackages,
        sendPackages: sendPackages,
        sendRecord: sendPackages.record,
        receiveRecord: receivePackages.record,
      })
      if (sendPackages.record.length >= dataLength) {
        sendPage++;
      } else {
        sendEnd = true
      } 
      if (receivePackages.record.length >= dataLength) {
        receivePage++;
      } else {
        receiveEnd = true
      }
    });

  },
  srcollLower(){
    let isSend = this.data.send? true:false;
    if (isSend) {
      if (sendEnd) { return; }
      doFetch('guessnum.getuserpackrecords', {
        sendPage,
        sendLimit:dataLength,
        receivePage,
        receiveLimit: dataLength
      }, res => {
        let record = res.data.sendPackages.record;
        if (record.length >= dataLength) {
          sendPage++;
        } else {
          sendEnd = true
        }
        let totalRecord = this.data.sendRecord.concat(record)
        this.setData({
          sendRecord: totalRecord,
        })
      });
    } else {
      if(receiveEnd) {return ;}
      doFetch('guessnum.getuserpackrecords', {
        sendPage,
        sendLimit: dataLength,
        receivePage,
        receiveLimit: dataLength
      }, res => {
        let record = res.data.receivePackages.record;
        if (record.length >= dataLength) {
          receivePage++;
        } else {
          receiveEnd = true
        }
        let totalRecord = this.data.receiveRecord.concat(record)
        this.setData({
          receiveRecord: totalRecord,
        })
      });
    }
   
  },
  packageDetail(e){
    let p = e.currentTarget.dataset.item
    this.setData({
      nowPid:p.pid
    })
    doFetch('guessnum.getpackrecords',{
      pid: p.pid
    },(res)=>{
      switch(p.status){
        case GUESSING:
          wx.navigateTo({
            url: '../../pages/guess/guess?pid=' + p.pid,
          })
          break;
        case OVEREXPIRE:
        case PKOver:
        case  COUNTOVER:
          this.setData({
            packageTip: '竞猜PK已过期',
            hasPackageTip: true
          })
          break;
      }
    })
   
  },
  userSure(){
    wx.navigateTo({
      url: '../../pages/rank/rank?pid=' + this.data.nowPid,
    })
  },
  receivePacDetail(e){
    let p = e.currentTarget.dataset.item.guessInfo.packInfo;
    if (p.status == GUESSING) {
      wx.navigateTo({
        url: '../../pages/guess/guess?pid=' + p.pid,
      })
    } else {
      wx.navigateTo({
        url: '../../pages/rank/rank?pid=' + p.pid,
      })
    }
  },
  switchTab(e) {
    if (e.currentTarget.dataset.type == 's') {
      this.setData({
        send: "active",
        receive: "",
      })
    } else {
      this.setData({
        send: "",
        receive: "active",
      })
    }
  },
  toSendPackage() {
    wx.navigateTo({
      url: '../index/index',
    })
  },
  toWithDraw(){
    wx.navigateTo({
      url: '../tixian/tixian',
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