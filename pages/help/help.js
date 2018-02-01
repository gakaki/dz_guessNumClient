let app = getApp();
Page({
  data: {
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
      }, {
        title: 'aaaaa',
        solve: 'aaaaa'
      }, {
        title: 'aaaaa',
        solve: 'aaaaa'
      }
    ]
  },
  onLoad: function () {
    wx.setNavigationBarTitle({
      title: '旺猜—常见问题'
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
  }
})