let app = getApp();
import { configs } from '../../utils/configs.js'
Page({
  data: {
    isactive: 'server',
    curIdx: -1,
    questions: [
      {
        title: 'aaaaa',
        solve: 'aaaaa'
      },
      {
        title: 'aaaaa',
        solve: 'aaaaa'
      },
      {
        title: 'aaaaa',
        solve: 'aaaaa'
      },
      {
        title: 'aaaaa',
        solve: 'aaaaa'
      },
      {
        title: 'aaaaa',
        solve: 'aaaaa'
      },
      {
        title: 'aaaaa',
        solve: 'aaaaa'
      },
      {
        title: 'aaaaa',
        solve: 'aaaaa'
      },
      {
        title: 'aaaaa',
        solve: 'aaaaa'
      },
      {
        title: 'aaaaa',
        solve: 'aaaaa'
      },
      {
        title: 'aaaaa',
        solve: 'aaaaa'
      },
      {
        title: 'aaaaa',
        solve: 'aaaaa'
      }, {
        title: 'aaaaa',
        solve: 'aaaaa'
      }, {
        title: 'bbbb',
        solve: 'bbbaa'
      }
    ]
  },
  onLoad: function () {
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
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})