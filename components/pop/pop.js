Component({
  properties: {
    // 这里定义了content属性，属性值可以在组件使用时指定
    content: {
      type: String,
      value: '红包已领取完毕',
    },
    isShow: {
      type: Boolean,
      value: false
    }
  },
  data: {
    // 这里是一些组件内部数据
      firstBtn:"查看记录",
      secondBtn:"发起红包",
      apper:true
  },
  methods: {
    // 这里是一个自定义方法
    seeRecord(e) {
      wx.navigateTo({
        url: '/pages/record/record',
      })
    },
    sendRedPacket(e) {
      wx.navigateTo({
        url: '/pages/game/game',
      })
    },
    toHidden() {
      this.setData({
        apper:false
      })
    }
  }
})