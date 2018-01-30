// pages/test/test.js
let pages = getCurrentPages();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num:'',
    delnum:''
  },
  changeNum(e){
    if(this.data.num.length < 4) {
      let newNum = this.data.num + e.detail.num;
      this.setData({
        num: newNum
      })
    }
  },
  deleteNum(e){
    this.setData({
      num: this.data.num.slice(0,this.data.num.length-1),
      delnum: this.data.num.slice(this.data.num.length - 1, this.data.num.length)
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})