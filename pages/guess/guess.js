
// pages/statistics/statistics.js

let app = getApp();
import { doFetch, getUid } from '../../utils/rest.js';
import { configs } from '../../utils/configs.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cancleStr: '确定',
    hasJiasuka: true,
    tipCon: '',
    showTip: false,
    popInfo: { result: '', money: '', comment: '' },           //弹窗信息    
    timeCd: true,   //答题cd
    isOwner: false,
    pid: 0,     //红包pid
    baoInfo: {},  //红包信息
    // num: '输入0-9不重复4位数',
    actItem: [false, false, false, false, false, false, false, false, false, false],
    kbHeight: '',
    doTixian: 'tixian',
    doFa: 'fa',
    doZhuan: 'zhuan',
    isSend: 'send',
    isHide: true,
    num: '',
    delnum: '',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    inputNum: '',
    warning: false,
    getInfo: [{
      avatar: 11,
      nickname: "昵称一共八个文字",
      num: 5793,
      content: "你哥说七步成诗不然揍你，你赢了",
      gold: 13
    }, {
      avatar: 11,
      nickname: "昵称一共八个文字",
      num: 5793,
      content: "智商的文字",
      gold: 13
    }, {
      avatar: 11,
      nickname: "昵称一共八个文字",
      num: 5793,
      content: "智商的文字",
      gold: 13
    },
    {
      avatar: 11,
      nickname: "昵称一共八个文字",
      num: 5793,
      content: "智商的文字",
      gold: 13
    }, {
      avatar: 11,
      nickname: "昵称一共八个文字",
      num: 5793,
      content: "智商的文字",
      gold: 13
    }]
  },

  onReady: function () {
    this.guess = this.selectComponent('#guess');
    this.pop = this.selectComponent('#pop');
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      pid: options.pid
    })
    console.log(this.data.pid)
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
      console.log(app.globalData.userInfo)
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
    console.log(app.globalData.userInfo)
    doFetch('guessnum.getpackrecords', {
      pid: this.data.pid
    }, (res) => {
      if (res.data.dataoriginator == getUid()) {
        this.setData({
          baoInfo: res.data.data,
          isOwner: true
        })
      } else {
        this.setData({
          baoInfo: res.data.data
        })
        if (this.data.baoInfo.records.find(o => o.userInfo.uid == getUid())) {
          this.setData({
            timeCd: true
          })
        } else {

        }
      }


    });

  },
  showPop: function () {
    this.setData({
      tipCon: '您目前没有加速卡，每日首次分享可获得加速卡',
      showTip: true
    })
    if (this.data.hasJiasuka == true) {
      this.setData({
        tipCon: '距下轮竞猜还有180s，是否花费一张加速卡清除等待，每日首次分享小程序可获得一张加速卡',
        cancleStr: '取消'
      })
      this.pop.setData({  
      singleBtn: false,
      hasJiasuka: true
      })
    }
    
  },
  doClear: function () {
    doFetch('guessnum.clearcd', {
      pid: this.data.pid
    })
  },
  send: function (e) {
    console.log(typeof (this.data.num))
    if (this.data.num.length >= 4) {
      doFetch('guessnum.guesspack', {
        guessNum: this.data.num,
        pid: this.data.pid
      }, (res) => {

        this.setData({
          num: '',
          actItem: [false, false, false, false, false, false, false, false, false, false],
          popInfo: { result: res.data.data.mark, money: res.data.data.moneyGeted, comment: res.data.data.commit }
        })
        console.log(res.data.data)
        if (res.data.data.mark != null) {
          this.setData({
            timeCd: true
          })
          // this.guess.setData({
          //   isShow: true,
          // })
        }
      })
    }

  },
  sendStart: function () {
    this.setData({
      isSend: 'send-click'
    })
  },
  sendEnd: function () {
    this.setData({
      isSend: 'send'
    })
  },

  tixian: function (e) {
    if (app.preventMoreTap(e)) { return; }
    wx.navigateTo({
      url: '../tixian/tixian',
    })
  },
  tixianStart: function () {
    this.setData({
      doTixian: 'tixian-click'
    })
  },
  tixianEnd: function () {
    this.setData({
      doTixian: 'tixian'
    })
  },
  fa: function (e) {
    if (app.preventMoreTap(e)) { return; }
    wx.navigateTo({
      url: '../index/index',
    })
  },
  faStart: function () {
    this.setData({
      doFa: 'fa-click'
    })
  },
  faEnd: function () {
    this.setData({
      doFa: 'fa'
    })
  },
  zhuan: function (e) {

  },
  zhuanStart: function () {
    this.setData({
      doZhuan: 'zhuan-click'
    })
  },
  zhuanEnd: function () {
    this.setData({
      doZhuan: 'zhuan'
    })
  },
  showKb: function () {
    if (this.data.isHide) {
      this.setData({
        isHide: !this.data.isHide,
        kbHeight: 'kb-hgt'
      })
    } else {
      this.setData({
        isHide: !this.data.isHide,
        kbHeight: 'kb-hide'
      })
    }

  },
  hideKb: function () {
    this.setData({
      isHide: true,
      kbHeight: 'kb-hide'
    })
  },
  clickNum(e) {
    let idx = e.currentTarget.dataset.num
    if (this.data.num.indexOf(idx) != -1) return
    if (this.data.num.length < 4) {
      let newNum = this.data.num + idx
      this.setData({
        num: newNum
      })

      let arr = []
      if (idx == 0) idx = 10
      this.data.actItem[idx - 1] = true
      arr = this.data.actItem
      this.setData({
        actItem: arr
      })
      console.log(this.data.actItem)
    }


  },
  deleteNum(e) {
    if (!this.data.num) return
    let idx = this.data.num.split('')
    idx = parseInt(idx[idx.length - 1])
    console.log(idx)
    this.setData({
      num: this.data.num.slice(0, this.data.num.length - 1),
      // delnum: this.data.num.slice(this.data.num.length - 1, this.data.num.length)
    })

    let arr = []
    if (idx == 0) idx = 10
    this.data.actItem[idx - 1] = false
    arr = this.data.actItem
    this.setData({
      actItem: arr
    })
  },
  recordtInput(e) {
    this.setData({
      warning: false
    })
    this.setData({
      inputNum: e.detail.value
    })
  },
  verifyGuessNum(e) {
    let arr = this.data.inputNum.split('');
    if (this.data.inputNum.length < 4 || !this.arrUniq(arr)) {
      this.setData({
        warning: true
      })
    }
  },
  arrUniq(arr) {
    let newArr = [];
    for (let i = 0; i < arr.length; i++) {
      if (newArr.indexOf(arr[i]) == -1) {
        newArr.push(arr[i]);
      }
    }
    console.log(arr.length > newArr.length)
    return arr.length > newArr.length ? false : true
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    return {
      title: '大家一起来拼智力领福利',
      path: '/pages/guess/guess',
      imageUrl: '../../assets/common/share.png',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }

  },
  /**
   * 组件内触发的事件
   */
  _hide: function () {
    this.guess.setData({
      isShow: false,
      finish: false
    })
  },
  _active: function () {
    this.guess.setData({
      confirmSrc: 'https://gengxin.odao.com/update/h5/wangcai/guess/confirm-active.png'
    })
  },
  _cancel: function () {
    this.guess.setData({
      confirmSrc: 'https://gengxin.odao.com/update/h5/wangcai/guess/confirm.png'
    })
  }
})

