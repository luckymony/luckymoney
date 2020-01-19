const app = getApp();
var util = require('../utils/util.js');
/**
 *  开门大吉红包发起接口
 */
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
      if (parameter.orderSuccess) parameter.orderSuccess(res);
    },
    fail: function (res) {
      if (parameter.payFail) parameter.payFail(res);
    },//请求失败
    complete: function (res) {//请求完成
      if (res.statusCode == 200 && res.data.code == 0) {
        if (res.data.data == null) {
          if (parameter.payFail) parameter.payFail(null);
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
              if (parameter.payFail) parameter.payFail(res);
            }, complete: function (res) {
              if (parameter.paySuccess) parameter.paySuccess(res);
            }
          })
        }
      } else {
        if (parameter.payFail) parameter.payFail(res);
      }
    }
  })
}

/**
 *  八方来财红包发起接口
 */
function sendBflc(parameter) {
  wx.request({
    //请求地址
    url: app.globalData.baseUrl + '/api/redPackage/sendBflc',
    data: {
      "chanceNumber": parameter.parameter.chanceNumber,
      "difficultyLevel": parameter.parameter.difficultyLevel,
      "duration": parameter.parameter.duration,
      "fee": parameter.parameter.fee,
      "greetings": parameter.parameter.greetings,
      "needIntegral": parameter.parameter.needIntegral, 
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
      if (parameter.orderSuccess) parameter.orderSuccess(res);
    },
    fail: function (res) {
      if (parameter.payFail) parameter.payFail(res);
    },//请求失败
    complete: function (res) {//请求完成
      if (res.statusCode == 200 && res.data.code == 0) {
        if (res.data.data == null) {
          if (parameter.payFail) parameter.payFail(null);
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
              if (parameter.payFail) parameter.payFail(res);
            }, complete: function (res) {
              if (parameter.paySuccess) parameter.paySuccess(res);
            }
          })
        }
      } else {
        if (parameter.payFail) parameter.payFail(res);
      }
    }
  })
}

function defaultKmdjParameter() {
  return { title: "开门大吉", longTime: 120, moneyCount: 5, 
           chanceCount: 1, difficulty: 0 };
}

function defaultBflcParameter() {
  return { title: "八方来财", longTime: 120, integralCount: 200, 
           chanceCount: 1, difficulty: 0 };
}

function defaultHylmParameeter() {
  return {title:"好运连绵", longTime:120, 
          startTime:(util.currentTimeStamp() + 600*1000), minMoney:1}
}

module.exports = {
  sendKmdj: sendKmdj,
  sendBflc:sendBflc,
  defaultKmdjParameter: defaultKmdjParameter,
  defaultBflcParameter: defaultBflcParameter,
  defaultHylmParameeter: defaultHylmParameeter
}
