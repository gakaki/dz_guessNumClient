let app = getApp();
import { configs } from '../../utils/configs.js'
let that;

Page({
  data: {
    isactive: 'server',
    curIdx: -1,
    packageTip: '',
    hasPackageTip: false,
    questions: []

  },
  onLoad: function () {
    that = this;
    wx.setNavigationBarTitle({
      title: '旺猜—常见问题'
    })
    let tempArr = []
    configs.questions.map(o => {
      let temp = new configs.Question(o)
        tempArr.push(temp)
    })
     this.setData({
       questions: tempArr
     })
  },
  lianxi: function(e) {
    if (app.preventMoreTap(e)) { return; }
  },
  clickStart: function() {
    this.setData({
      isactive: 'server-click'
    })
  },
  clickEnd: function () {
    this.setData({
      isactive: 'server'
    })
  },
  showSolve: function (e) {
    if (this.data.curIdx == e.currentTarget.dataset.index) {
      this.setData({
        curIdx: -1
      })
      return
    }
    this.setData({
      curIdx: e.currentTarget.dataset.index
    })
  },
  onShareAppMessage: function (res) {
    return {
      title: '大家一起来拼智力领福利',
      path: '/pages/index/index',
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
  }
})