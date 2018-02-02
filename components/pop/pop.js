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
    appear:{
      type: Boolean,
      value:true
    }
  },
  data: {
    // 这里是一些组件内部数据
      contentName:'text',
      singleBtn:false
  },
  attached(){
    if (this.data.content.length < 10) {
      this.setData({
        singleBtn:true
      })
    } else {
      this.setData({
        singleBtn:false
      })
    }
  },
  methods: {
    // 这里是一个自定义方法    
    cancle(e) {
      this.setData({
        appear: false
      })
      app.globalData.hasUserInfo = false
    },
    sure() {
      this.setData({
        appear: false
      })
      if (this.properties.isAuth) {
        wx.openSetting({
          success: (res) => {
            console.log(res)
            
            app.globalData.hasUserInfo = true
          }
        })
      }
    }
  }
})