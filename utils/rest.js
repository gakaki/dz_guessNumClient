const srv = "https://h5.ddz2018.com/";
// const wss = "wss://hws.ddz2018.com/json";
const CODE_SUC = 0;
let sid, uid, app;

function doFetch(action, data, suc, err) {
  data = data || {};
  if (!sid) {
    sid = wx.getStorageSync('_sid');
  }
  if (sid) {
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
    payload: { code }
  }, res => {
    res = res.data;
    uid = res.data.uid;
    userLogin(suc, showErr);
  })
}

function userLogin(suc, err) {
  wx.getUserInfo({
    success: info => {
      app = getApp();
      app.globalData.userInfo = info.userInfo;
      app.globalData.hasUserInfo = true;
      if (app.userInfoReadyCallback) {
        app.userInfoReadyCallback(info)
      }

      doFetch('user.login', { info: info.userInfo }, res => {
        if (res.data.code != CODE_SUC) {
          err(res.code);
        }
        else {
          res = res.data.data;
          wx.setStorageSync('_sid', res.sid);
          sid = res.sid;
          suc(res)

        }
      }, err);
    },
    fail() {
      app = getApp();
      app.globalData.hasUserInfo = false;
    }
  })
}

function getUid() {
  return uid
}

//向下取整并保留两位小数；
function fixedNum(num) {
  return Math.floor(num * 100) / 100
}

const showErr = msg => {
  wx.showToast({
    title: '哎呀,' + msg,
  })
}


class LsnNode {
  constructor(action, cb, ctx) {
    this.action = action;
    this.cb = cb;
    this.ctx = ctx;
    this.id = cb.name + "_" + (ctx.name || ctx.route);
  }
}


const _listeners = new Map();
let _listenHdl;
/**
 * 使用定时请求的方式拉取数据
 * @param action string类型，路由动作，如guessnum.getlist
 * @param model 请求的数据模型实例，listen期间会一直使用此model实例作为发起请求的数据，所以如果需要中途修改，就将此model变量保存下来，在适当的时候修改它里面的值
 * @param cb 回调函数，不能是箭头函数 ，参数为action请求返回的数据，可以在cb里面对model实例里的数值进行修改，以便下次请求时使用model里的新数据
 * @param ctx 回调函数上下文
*/
const listen = (action, model, cb, ctx) => {
  let actionMp;
  if (_listeners.has(action)) {
    actionMp = _listeners.get(action);
  }
  else {
    actionMp = new Map();
    actionMp.model = model;
    actionMp.status = 'IDLE'
    _listeners.set(action, actionMp);
  }

  //add to sub map
  let node = new LsnNode(action, cb, ctx);
  actionMp.set(node.id, node);
  console.log('listen',action)
  //start loop
  loopListen();
}

/**
 * 移除监听
 * action为必传
 * cb和ctx可以同时传 或者 同时不传， 如果同时不传，则移除action对应的所有监听（慎用）
*/
const unlisten = (action, cb, ctx) => {
  if (!action) {
    console.error('unlisten 时 action参数必须要传')
    return;
  }
  console.log('call unlisten>>',action);
  if (!cb && !ctx) {
    //如果不传cb和ctx，则删除所有对该action的监听
    _listeners.delete(action);
  }
  if (_listeners.has(action)) {
    let lsnrs = _listeners.get(action);
    lsnrs.forEach(node => {
      if (node.cb == cb && node.ctx == ctx) {
        lsnrs.delete(node.id);
      }
    });

    if (!lsnrs.size) {
      _listeners.delete(action);
    }
  }

  //如果没了，就移除定时器
  if (!_listeners.size && _listenHdl) {
    clearInterval(_listenHdl);
    _listenHdl = undefined;
  }
}

const LS_IDLE = 'IDLE';
const LS_BUSY = 'BUSY';
const LS_SUC = 'SUC';

function loopListen() {
  if (_listenHdl) {
    return;
  }
  _listenHdl = setInterval(() => {
    _listeners.forEach((lsnr, action) => {

      switch(lsnr.status) {
        case LS_IDLE:
          lsnr.status = LS_BUSY
          doFetch(action, lsnr.model, (res) => {
            lsnr.status = LS_SUC;
            lsnr.backRes = res;
          })
        break;
        case LS_SUC:
          lsnr.status = LS_BUSY;
          lsnr.forEach(node => {
            node.cb.call(node.ctx,lsnr.backRes);
          });
          lsnr.backRes = null;
          lsnr.status = LS_IDLE;
          break;
        case LS_BUSY:
          //wait to be suc
          break;
      }

    })
  }, 300);
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
        success: res => {
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
  doFetch,
  getUid,
  fixedNum,
  listen,
  unlisten
}