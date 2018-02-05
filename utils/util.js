var app = getApp();

function canvas(){
  let shareUrl = '';
  let src = 'https://gengxin.odao.com/update/h5/wangcai/common/share3.png';
  const ctx = wx.createCanvasContext('myCanvas')
  ctx.drawImage(src, 0, 0, 420, 336)
  ctx.draw(false, () => {
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: 420,
      height: 336,
      destWidth: 420,
      destHeight: 336,
      canvasId: 'myCanvas',
      success(res) {
        shareUrl = res.tempFilePath;
      },
      fail(res) {
      }
    })
  })  
}

module.exports = {
  canvas
};