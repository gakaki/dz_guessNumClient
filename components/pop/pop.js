let app =getApp();
Component({
  properties: {
    // 这里定义了content属性，属性值可以在组件使用时指定
    content: {
      type: String,
      value: '红包已领取完毕',
    },
    cancleBtn: {
      type: String,
      value:"确 定"
    },
    sureBtn: {
      type: String,
      value:"加速等待"
    },
    isAuth: {
      type: Boolean,
      value: false
    },
    show:{
      type: Boolean,
      value:false
    },
    singleBtn: {
      type: Boolean,
      value:false
    },
    hasJiasuka: {
      type: Number,
      value: 0
    }
  },
  data: {
    // 这里是一些组件内部数据
      contentName:'text'
  },
  methods: {
    // 这里是一个自定义方法    
    cancle(e) {
      this.triggerEvent("cancel")
      this.setData({
        show: false
      })
    },
    cancle1(e) {  
      this.setData({
        show: false
      })
    },
    sure() {
      this.triggerEvent("doJiasu")
      this.setData({
        show: false
      })
      if (this.properties.isAuth) {
        wx.openSetting({
          success: (res) => {
            wx.getUserInfo({
              success: info => {
                app.globalData.userInfo = info.userInfo;
                app.globalData.hasUserInfo = true
              }
           })
          }
        })
      }
    }
  }
})