// pages/record/record.js

let app = getApp();
import { doFetch, fixedNum } from '../../utils/rest.js';
const GUESSING = 168;
let index = {s:1,r:1}; //发送和接收起始index值
let sendPage = 1;
let receivePage = 1;
let dataLength = 20;
let sendEnd,receiveEnd;

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
    receiveRecord:[]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
      let sendPackages = res.data.data.sendPackages;
      let receivePackages = res.data.data.receivePackages;
      console.log(sendPackages, receivePackages)
      this.setData({
        receivePackages: receivePackages,
        sendPackages: sendPackages,
        sendRecord: sendPackages.record,
        receiveRecord: receivePackages.record,
      })
      if (sendPackages.record.length >= dataLength) {
        sendPage++;
      } else if (receivePackages.record.length >= dataLength) {
        receivePage++;
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
        let record = res.data.data.sendPackages.record;
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
        let record = res.data.data.receivePackages.record;
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
    doFetch('guessnum.getpackrecords',{
      pid: p.pid
    },(res)=>{
      if (p.status == GUESSING) {
        wx.navigateTo({
          url: '../../pages/guess/guess?pid=' + p.pid,
        })
      } else {
        wx.navigateTo({
          url: '../../pages/rank/rank?pid=' + p.pid,
        })
      }
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
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
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