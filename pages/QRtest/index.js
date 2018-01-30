// pages/QRtest/index.js
Page({

  onLoad: function (options) {
    let src = '../../images/index/pice.png'
    const ctx = wx.createCanvasContext('myCanvas')
    ctx.drawImage(src, 0, 0, 100, 100)
    // ctx.drawImage
    ctx.draw(false, function () {
      wx.canvasToTempFilePath({
        x: 0,
        y: 0,
        width: 100,
        height: 100,
        destWidth: 100,
        destHeight: 100,
        canvasId: 'myCanvas',
        success: function (res) {
          wx.saveImageToPhotosAlbum({
            filePath:res.tempFilePath,
            success(res) {
              console.log(res)
            },
            fail(res) {
              console.log(res)
            }
          })

        }
      })
    })
    
  }


})