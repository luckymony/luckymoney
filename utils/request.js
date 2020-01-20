const app = getApp();
/**
 * 首页列表请求接口
 */
function getSendList(parameter) {
  wx.request({
    url: app.globalData.baseUrl + '/api/redPackage/getSendList',
    data: {},//发送给后台的数据
    header: {//请求头
      "Content-Type": "application/json",
      "accessToken": app.globalData.token
    },
    method: 'POST',
    dataType: 'json',
    success: function (res) {
      if (res.statusCode == 200
        && res.data.code == 0) {
        if (res.data.data == null) {
          if (parameter.fail) parameter.fail(null);
        } else {
          if (parameter.success) parameter.success(res.data.data);
        }
      } else {
        if (res.data.code == 100004) { //token 失效
          app.checksession(); //重新登陆
        }
        if (parameter.fail) parameter.fail(res);
      }
    },fail: function (res) {
      if (parameter.fail) parameter.fail(res);
    },complete: function (res) {
    }
  })  
}

/**
 * 八方来财的请求接口
 */
function bflcStart(parameter) {
  wx.request({
    url: app.globalData.baseUrl + '/api/redPackage/bflcStart',
    data: {
      "redPackageId" : parameter.playId
    },//发送给后台的数据
    header: {//请求头
      "Content-Type": "application/json",
      "accessToken": app.globalData.token
    },
    method: 'POST',
    dataType: 'json',
    success: function (res) {
      if (res.statusCode == 200
        && res.data.code == 0) {
        if (res.data.data == null) {
          if (parameter.fail) parameter.fail(null);
        } else {
          if (parameter.success) parameter.success(res.data.data);
        }
      }else {
        if (res.data.code == 100004) { //token 失效
          app.checksession(); //重新登陆
        }
        if(parameter.fail) parameter.fail(res);
      }
    },fail: function (res) {
      if (parameter.fail) parameter.fail(res);
    },complete: function (res) {
    }
  })  
}

function bflcDetail(parameter) {
  wx.request({
    url: app.globalData.baseUrl + '/api/redPackage/bflcDetail/' + parameter.playId,
    data: {},
    header: {//请求头
      "Content-Type": "application/json",
      "accessToken": app.globalData.token
    },
    method: 'POST',
    dataType: 'json',
    success: function (res) {
      if (res.statusCode == 200
        && res.data.code == 0) {
        if (res.data.data == null) {
          if (parameter.fail) parameter.fail(null);
        } else {
          if (parameter.success) parameter.success(res.data.data);
        }
      } else {
        if (res.data.code == 100004) { //token 失效
          app.checksession(); //重新登陆
        }
        if (parameter.fail) parameter.fail(res);
      }
    },fail: function (res) {
      if (parameter.fail) parameter.fail(res);
    },complete: function (res) {
    }
  })  
}

function bflcWin(parameter) {
  wx.request({
    url: app.globalData.baseUrl + '/api/redPackage/bflcWin',
    data: {
      "redPackageId" : parameter.playId
    },//发送给后台的数据
    header: {//请求头
      "Content-Type": "application/json",
      "accessToken": app.globalData.token
    },
    method: 'POST',
    dataType: 'json',
    success: function (res) {
      if (res.statusCode == 200
        && res.data.code == 0) {
        if (res.data.data == null) {
          if (parameter.fail) parameter.fail(null);
        } else {
          if (parameter.success) parameter.success(res.data.data);
        }
      } else {
        if (res.data.code == 100004) { //token 失效
          app.checksession(); //重新登陆
        }
        if (parameter.fail) parameter.fail(res);
      }
    },fail: function (res) {
      if (parameter.fail) parameter.fail(res);
    },complete: function (res) {
    }
  })  
}

/**
 * 开门大吉的请求接口
 */
function kmdjStart(parameter) {
  wx.request({
    url: app.globalData.baseUrl + '/api/redPackage/kmdjStart',
    data: {
      "redPackageId" : parameter.playId
    },//发送给后台的数据
    header: {//请求头
      "Content-Type": "application/json",
      "accessToken": app.globalData.token
    },
    method: 'POST',
    dataType: 'json',
    success: function (res) {
      if (res.statusCode == 200
        && res.data.code == 0) {
        if (res.data.data == null) {
          if (parameter.fail) parameter.fail(null);
        } else {
          if (parameter.success) parameter.success(res.data.data);
        }
      } else {
        if (res.data.code == 100004) { //token 失效
          app.checksession(); //重新登陆
        }
        if (parameter.fail) parameter.fail(res);
      }
    },fail: function (res) {
      if (parameter.fail) parameter.fail(res);
    },complete: function (res) {
    }
  })  
}

function kmdjDetail(parameter) {
  wx.request({
    url: app.globalData.baseUrl + '/api/redPackage/kmdjDetail/' + parameter.playId,
    data: {},//发送给后台的数据
    header: {//请求头
      "Content-Type": "application/json",
      "accessToken": app.globalData.token
    },
    method: 'POST',
    dataType: 'json',
    success: function (res) {
      if (res.statusCode == 200
        && res.data.code == 0) {
        if (res.data.data == null) {
          if (parameter.fail) parameter.fail(null);
        } else {
          if (parameter.success) parameter.success(res.data.data);
        }
      } else {
        if (res.data.code == 100004) { //token 失效
          app.checksession(); //重新登陆
        }
        if (parameter.fail) parameter.fail(res);
      }
    },fail: function (res) {
      if (parameter.fail) parameter.fail(res);
    },complete: function (res) {
    }
  })  
}


function kmdjWin(parameter) {
  wx.request({
    url: app.globalData.baseUrl + '/api/redPackage/kmdjWin',
    data: {
      "redPackageId" : parameter.playId
    },//发送给后台的数据
    header: {//请求头
      "Content-Type": "application/json",
      "accessToken": app.globalData.token
    },
    method: 'POST',
    dataType: 'json',
    success: function (res) {
      if (res.statusCode == 200
        && res.data.code == 0) {
        if (res.data.data == null) {
          if (parameter.fail) parameter.fail(null);
        } else {
          if (parameter.success) parameter.success(res.data.data);
        }
      } else {
        if (res.data.code == 100004) { //token 失效
          app.checksession(); //重新登陆
        }
        if (parameter.fail) parameter.fail(res);
      }
    },fail: function (res) {
      if(parameter.fail)parameter.fail(res);
    },complete: function (res) {
    }
  })  
}

/**
 * 我发出的红包
 */
 function getMySendHistory(parameter) {
  wx.request({
    url: app.globalData.baseUrl + '/api/redPackage/getSendHistory',
    data: {},//发送给后台的数据
    header: {//请求头
      "Content-Type": "application/json",
      "accessToken": app.globalData.token
    },
    method: 'POST',
    dataType: 'json',
    success: function (res) {
      if (res.statusCode == 200
        && res.data.code == 0) {
        if (res.data.data == null) {
          if (parameter.fail) parameter.fail(null);
        } else {
          if (parameter.success) parameter.success(res.data.data);
        }
      } else {
        if (parameter.fail) parameter.fail(res);
      }
    },fail: function (res) {
      if (res.data.code == 100004) { //token 失效
        app.checksession(); //重新登陆
      }
      if(parameter.fail)parameter.fail(res);
    },complete: function (res) {
    }
  })
 }

 /**
  * 我抢到的红包
  */
function getMyWinHistroy(parameter) {
  wx.request({
    url: app.globalData.baseUrl + '/api/redPackage/getWinHistory',
    data: {},//发送给后台的数据
    header: {//请求头
      "Content-Type": "application/json",
      "accessToken": app.globalData.token
    },
    method: 'POST',
    dataType: 'json',
    success: function (res) {
      if (res.statusCode == 200
        && res.data.code == 0) {
        if (res.data.data == null) {
          if (parameter.fail) parameter.fail(null);
        } else {
          if (parameter.success) parameter.success(res.data.data);
        }
      } else {
        if (parameter.fail) parameter.fail(res);
      }
    },fail: function (res) {
      if (res.data.code == 100004) { //token 失效
        app.checksession(); //重新登陆
      }
      if(parameter.fail)parameter.fail(res);
    },complete: function (res) {
    }
  })
}

module.exports = {
  getSendList: getSendList,
  kmdjStart:kmdjStart,
  kmdjDetail:kmdjDetail,
  kmdjWin:kmdjWin,
  bflcStart:bflcStart,
  bflcDetail:bflcDetail,
  bflcWin:bflcWin,
  getMySendHistory:getMySendHistory,
  getMyWinHistroy:getMyWinHistroy
}