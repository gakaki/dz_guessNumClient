//index.js
//获取应用实例
const app = getApp()

let u = require('../../utils/util.js')

Page({
  data: {
      moneySelect:['1.68','6.6','8.8']
  },
  onLoad(){
    wx.getFileInfo({
      filePath:'./guessnum.xlsx',
      success(res){
        console.log(res)
      },
      fail(res){
        console.log(res)
      }
    })
  },
  switchTab(e){
    if(e.currentTarget.dataset.type == 'g') {
      this.setData({
        goldClassName: "active",
        crystalClassName: "",
        content: ['×100', '×200', '×300'],
        show:true,
        goldNum:'gold-num',
        selectType:'金币',
        activeIndex: 0,
        defineNum: false
      })
    } else {
      this.setData({
        goldClassName: "",
        crystalClassName: "active",
        content: ['100元', '200元', '500元'],
        show:false,
        goldNum:'gold-num no-margin',
        selectType: '现金(元)',
        activeIndex: 0,
        defineNum: false
      }) 
    }
  },
  getActive(src,dest){
    return src == dest ? 'active' : '';
  },
  myRecord(e) {
    wx.navigateTo({
      url: "../../pages/record/record"
    })
  },
  question(e) {
    wx.navigateTo({
      url: '../../pages/questions/question',
    })
  },
  selectMoney(e){
    switch (e.currentTarget.dataset.index) {
      case 0:
        this.setData({
          activeIndex: 0,
          defineNum: false
        })
        break;
      case 1:
        this.setData({
          activeIndex: 1,
          defineNum: false
        })
        break;
      case 2:
        this.setData({
          activeIndex: 2,
          defineNum: false
        })
        break;
    }
  },
  inputNum(){
    this.setData({
      defineNum:true,
      activeIndex: -1,
    })
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: this.data.text,
      path: '/page/user?id=123',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})
