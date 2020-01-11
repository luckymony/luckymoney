const app = getApp();
function sendKmdj(parameter) {
  wx.request({
    //请求地址
    url: app.globalData.baseUrl + '/api/redPackage/sendKmdj',
    data: {
      "chanceNumber": parameter.parameter.chanceNumber,
      "difficultyLevel": parameter.parameter.difficultyLevel,
      "duration": parameter.parameter.duration,
      "fee": parameter.parameter.fee,
      "greetings": parameter.parameter.greetings,
      "needClickNumber": parameter.parameter.needClickNumber, 
      "number": parameter.parameter.number,
      "payType": parameter.parameter.payType
    },//发送给后台的数据
    header: {//请求头
      "Content-Type": "application/json",
      "accessToken": app.globalData.token
    },
    method: 'POST',
    dataType: 'json',
    success: function (res) {
    },
    fail: function (res) {
      if (parameter.fail) parameter.fail(res);
    },//请求失败
    complete: function (res) {//请求完成
      if (res.statusCode == 200 && res.data.code == 0) {
        if (res.data.data == null) {
          if (parameter.fail) parameter.fail(null);
        }else {
          var nonceStr = res.data.data.nonceStr;
          var packageParam = res.data.data.packageParam;
          var paySign = res.data.data.paySign;
          var timeStamp = res.data.data.timeStamp;
          wx.requestPayment({ //微信支付
            timeStamp: timeStamp,
            nonceStr: nonceStr,
            package: packageParam,
            signType: 'MD5',
            paySign: paySign,
            success: function (res) {
            }, fail: function (res) {
              if (parameter.fail) parameter.fail(res);
            }, complete: function (res) {
              if (parameter.success) parameter.success(res);
            }
          })
        }
      } else {
        if (parameter.fail) parameter.fail(res);
      }
    }
  })
}

function defaultKmdjParameter() {
  return { title: "开门大吉", longTime: 120, moneyCount: 5, 
           chanceCount: 1, difficulty: 0 };
}

module.exports = {
  sendKmdj: sendKmdj,
  defaultKmdjParameter:defaultKmdjParameter
}
