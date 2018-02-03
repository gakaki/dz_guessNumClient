const srv = "https://h5.ddz2018.com/";
const wss = "wss://h5.ddz2018.com/json";
const CODE_SUC = 0;
let sid,uid,app,ws;

function doFetch(action, data, suc, err) {
  data = data || {};
  if (!sid) {
    sid = wx.getStorageSync('_sid');
    console.log(sid, '111111111111111')
  }
  if (sid) {

    console.log(sid,'2')
    data._sid = sid;
  }
  if (uid) {
    data.uid = uid;
  }

  data.action = action;

  wx.request({
    url: srv,
    data: data,
    success: suc,
    fail: err
  })
}

function sdkAuth(code, suc) {
  doFetch("user.auth", {
    payload: {code}
  }, res => {
    res = res.data;
    uid = res.data.uid;    
    userLogin(suc, showErr);
  })
}

function userLogin (suc, err) {
  wx.getUserInfo({
    success: info => {
      app = getApp();
      app.globalData.userInfo = info;
      app.globalData.hasUserInfo = true;
      if (app.userInfoReadyCallback) {
        app.userInfoReadyCallback(info)
      }
      doFetch('user.login',  {info:info.userInfo} , res => {
        if (res.data.code != CODE_SUC) {
          err(res.code);
        }
        else {
          res = res.data;
          wx.setStorageSync('_sid', res.data.sid);
          sid = res.data.sid;
          suc(res)

          if (ws) {
            ws.close();
          }
          ws = wx.connectSocket({
            url: wss,
            fail: () => {
              console.log('err')
            }
          });
          wx.onSocketOpen(r => {
            console.log('websocket 已连接')
          });
          wx.onSocketError(r => {
            console.log('websocket出错>>', r)
            try {
              ws.close();
            }
            catch (e) { }
          });
          wx.onSocketClose(r => {
            console.log('websocket已关闭')
            ws = null;
          })
        }
      }, err);
    },
    fail(){
      app = getApp();
      app.globalData.hasUserInfo = false;
    } 
  })
  
}

const showErr = msg => {
  wx.showToast({
    title: '哎呀,' + msg,
  })
}

const wsSend = (msg, suc, err) => {
  ws && ws.send({
    data: msg,
    success:suc,
    fail: err ? err : showErr
  })
}

const listenWsMsg = cb => {
  ws && ws.onMessage(cb);//cb:(data:string/ArrayBuffer)
}

//启动（会默认走一遍登录流程）
const start = suc => {
  wx.checkSession({
    
    
    // success: () => {
    //   console.log('sessionOk')
    //   userLogin(suc, showErr);
    // },
    success: () => {
      wx.login({
        success: res=> {
          console.log('call auth')
          sdkAuth(res.code, suc)
        },
        fail: showErr
      })
    }
  })
}

//业务类请求
// const guessnum = (data, suc, err) => {
//   doFetch('guessnum.guess', data, suc, err);
// }



module.exports = {
  start,
  showErr,
  doFetch
}