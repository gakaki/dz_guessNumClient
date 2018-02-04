// components/canvas/canvas.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    _toPic(){
      let src = 'https://gengxin.odao.com/update/h5/wangcai/common/share3.png';
      const ctx = wx.createCanvasContext('myCanvas')
      ctx.drawImage(src, 0, 0, 420, 336)
      // ctx.drawImage(this.data.userInfo.avatarUrl, 297, 0, 154, 154)
      ctx.draw(false, () => {
        wx.canvasToTempFilePath({
          x: 0,
          y: 0,
          width: 420,
          height: 336,
          destWidth: 420,
          destHeight: 336,
          canvasId: 'myCanvas',
    }  
  }
})
