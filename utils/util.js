var app = getApp();

/* postData, doSuccess, doFail, doComplete，其中postData, 为必填
  data为对象，
  示例：
    u.request({
      action:"home.info",
      _sid:""
    },(res)=>{
      console.log(“成功”)
    })
*/
function request(postData, doSuccess, doFail, doComplete) {
  wx.request({
    url: "https://h5.douzi.com",
    data: postData,
    method: 'POST',
    success: function (res) {
      if (typeof doSuccess == "function") {
        doSuccess(res);
      }
    },
    fail: function () {
      if (typeof doFail == "function") {
        doFail();
      }
    },
    complete: function () {
      if (typeof doComplete == "function") {
        doComplete();
      }
    }
  });
}


module.exports = {
  request
};