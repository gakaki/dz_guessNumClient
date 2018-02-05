
// pages/statistics/statistics.js

let app = getApp();
import { doFetch, getUid, listen, unlisten } from '../../utils/rest.js';
import { configs } from '../../utils/configs.js'
let that;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isOver: false,
    timer: null,
    singleBtn: false,
    cancleStr: '确定',
    tipCon: '',
    showTip: false,
    popInfo: { result: '', money: '', comment: '' },           //弹窗信息    
    timeCd: 0,   //答题cd
    isOwner: false,
    pid: 0,     //红包pid
    recordMod: null,//请求红包记录的model
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
    packageTip: '',
    hasPackageTip: false,

  },
  onReady: function (options) {
    this.guess = this.selectComponent('#guess');
    // this.pop = this.selectComponent('#pop');
    // this.pop1 = this.selectComponent('#pop1');
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
    this.setData({
      //pid: options.pid,
      pid: options.pid,
      recordMod: {
        pid: options.pid
      }
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
  },
  onShow() {
    listen('guessnum.getpackrecords', this.data.recordMod, this.updateRecords, this);
  },
  onHide() {
    clearInterval(this.data.timer)
    this.setData({
      timeCd: 0
    })
    unlisten('guessnum.getpackrecords', this.updateRecords, this);
  },
  onUnload() {
    clearInterval(this.data.timer)
    this.setData({
      timeCd: 0
    })
    unlisten('guessnum.getpackrecords', this.updateRecords, this);
  },
  updateRecords(res) {
    //let sts = res.data.data.packInfo.status
    let status = res.data.data.packInfo.status;
    console.log(res, 'listencode')
    if (status == -131) {
      let str = configs.Message.Get(1).words
      this.setData({
        showTip: true,
        tipCon: str,
        singleBtn: true
      })
    }
    if (status == -132) {
      unlisten('guessnum.getpackrecords', this.updateRecords, this);
      let str = configs.Message.Get(4).words
      this.setData({
        showTip: true,
        tipCon: str,
        singleBtn: true,
        isOver: true
      })
    }
    if (status == -129) {
      unlisten('guessnum.getpackrecords', this.updateRecords, this);
      let str = configs.Message.Get(5).words
      this.setData({
        showTip: true,
        tipCon: str,
        singleBtn: true,
        isOver: true
      })
    }
    if (res.data.data.originator.uid == getUid()) {
      this.setData({
        baoInfo: res.data.data,
        isOwner: true
      })
    } else {
      this.setData({
        baoInfo: res.data.data
      })
    }
  },
  showPop: function () {
    this.setData({
      tipCon: '您目前没有加速卡，每日首次分享可获得加速卡',
      showTip: true
    })
    if (this.data.baoInfo.originator.items[3] > 0) {
      this.setData({
        tipCon: '是否花费一张加速卡清除等待\n每日首次分享小程序可获得一张加速卡',
        cancleStr: '取消',
        singleBtn: false
      })
    }

  },
  doClear: function () {
    doFetch('guessnum.clearcd', {
      pid: this.data.pid
    }, () => {
      this.setData({
        timeCd: 0
      })
      this.send()
    })
  },
  toRank() {
    if (this.data.isOver) {
      clearInterval(this.data.timer)
      this.setData({
        timeCd: 0
      })
      wx.redirectTo({
        url: '../rank/rank?pid=' + this.data.pid,
      })
    }
    
  },
  send: function (e) {
    if (this.data.num.length < 4) {
     // let str = configs.Message.Get()
      this.setData({
        showTip: true,
        singleBtn: true,
        tipCon: '请输入0-9不重复的4位数'
      })
    }
    if (this.data.num.length >= 4) {
      doFetch('guessnum.guesspack', {
        guessNum: this.data.num,
        pid: this.data.pid
      }, (res) => {
        console.log(res.data.code,'code')
        if (res.data.code == 0) {
          this.setData({
            num: '',
            actItem: [false, false, false, false, false, false, false, false, false, false],
            popInfo: { result: res.data.data.mark, money: res.data.data.moneyGeted, comment: res.data.data.commit }
          })
          clearInterval(this.data.timer)
          this.setData({
            timeCd: 180
          })
          setTimeout(() => {
            this.setData({
              timer: setInterval(() => {
                let time = this.data.timeCd
                this.setData({
                  timeCd: time - 1
                })
              }, 1000)
            })
          }, 500)

          this.guess.setData({
            isShow: true,
          })
        }
        if (res.data.code == -133) {
          this.showPop()
          if (this.data.timeCd == 0) {
            clearInterval(this.data.timer)
            let timeNum = parseInt(res.data.data.restTime.split(' ')[0].split(':')[1]) * 60 + parseInt(res.data.data.restTime.split(' ')[0].split(':')[2])

            this.setData({
              timeCd: timeNum  //格式未知
            })
            clearInterval(this.data.timer)
            setTimeout(() => {
              this.setData({
                timer: setInterval(() => {
                  let time = this.data.timeCd
                  this.setData({
                    timeCd: time - 1
                  })
                }, 1000)
              })
            }, 500)
          }
        }
        if (res.data.code == -131) {
          let str = configs.Message.Get(1).words
          this.setData({
            showTip: true,
            tipCon: str,
            singleBtn: true
          })
        }
        if (res.data.code == -132) {
          unlisten('guessnum.getpackrecords', this.updateRecords, this);
          let str = configs.Message.Get(4).words
          this.setData({
            showTip: true,
            tipCon: str,
            singleBtn: true,
            isOver: true
          })
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
    if (!this.data.isHide) {
      this.setData({
        isHide: true,
        kbHeight: 'kb-hide'
      })
    }
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
    }


  },
  deleteNum(e) {
    if (!this.data.num) return
    let idx = this.data.num.split('')
    idx = parseInt(idx[idx.length - 1])
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
    return arr.length > newArr.length ? false : true
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    return {
      title: '大家一起来拼智力领福利',
      path: '/pages/guess/guess?pid=' + this.data.pid,
      imageUrl: '../../assets/common/share.png',
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

