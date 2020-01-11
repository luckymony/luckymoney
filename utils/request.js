const app = getApp();
function getSendList(value) {
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
      if (value.fail) value.fail(res);
    },complete: function (res) {
      if (res.statusCode == 200 
          && res.data.code == 0) {
        if (res.data.data == null) {
          if (value.fail) value.fail(null);
        } else {
          if (value.success) value.success(res);
        }
      }
    }
  })  
}

module.exports = {
  getSendList: getSendList
}