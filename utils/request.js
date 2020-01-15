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
    },fail: function (res) {
      console.log(res);
      if (parameter.fail) parameter.fail(res);
    },complete: function (res) {
      console.log(res);
      if (res.statusCode == 200 
          && res.data.code == 0) {
        if (res.data.data == null) {
          if (parameter.fail) parameter.fail(null);
        } else {
          if (parameter.success) parameter.success(res.data.data);
        }
      }
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
    },fail: function (res) {
      if (parameter.fail) parameter.fail(res);
    },complete: function (res) {
      if (res.statusCode == 200 
          && res.data.code == 0) {
        if (res.data.data == null) {
          if (parameter.fail) parameter.fail(null);
        } else {
          if (parameter.success) parameter.success(res.data.data);
        }
      }
    }
  })  
}

function bflcDetail(parameter) {
  wx.request({
    url: app.globalData.baseUrl + '/api/redPackage/bflcDetail',
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
    },fail: function (res) {
      if (parameter.fail) parameter.fail(res);
    },complete: function (res) {
      if (res.statusCode == 200 
          && res.data.code == 0) {
        if (res.data.data == null) {
          if (parameter.fail) parameter.fail(null);
        } else {
          if (parameter.success) parameter.success(res.data.data);
        }
      }
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
    },fail: function (res) {
      if (parameter.fail) parameter.fail(res);
    },complete: function (res) {
      if (res.statusCode == 200 
          && res.data.code == 0) {
        if (res.data.data == null) {
          if (parameter.fail) parameter.fail(null);
        } else {
          if (parameter.success) parameter.success(res.data.data);
        }
      }
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
    },fail: function (res) {
      if (parameter.fail) parameter.fail(res);
    },complete: function (res) {
      if (res.statusCode == 200 
          && res.data.code == 0) {
        if (res.data.data == null) {
          if (parameter.fail) parameter.fail(null);
        } else {
          if (parameter.success) parameter.success(res.data.data);
        }
      }
    }
  })  
}

function kmdjDetail(parameter) {
  wx.request({
    url: app.globalData.baseUrl + '/api/redPackage/kmdjDetail',
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
    },fail: function (res) {
      if (parameter.fail) parameter.fail(res);
    },complete: function (res) {
      if (res.statusCode == 200 
          && res.data.code == 0) {
        if (res.data.data == null) {
          if (parameter.fail) parameter.fail(null);
        } else {
          if (parameter.success) parameter.success(res.data.data);
        }
      }
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
    },fail: function (res) {
      if (parameter.fail) parameter.fail(res);
    },complete: function (res) {
      if (res.statusCode == 200 
          && res.data.code == 0) {
        if (res.data.data == null) {
          if (parameter.fail) parameter.fail(null);
        } else {
          if (parameter.success) parameter.success(res.data.data);
        }
      }
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
  bflcWin:bflcWin
}