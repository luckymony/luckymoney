//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },

  detectionAuth:function(){
    var that = this;
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              var encryptedData = res.encryptedData;
              var iv = res.iv;
              wx.login({
                success: res => {
                  that.globalData.code = res.code;
                  that.globalData.encryptedData = encryptedData;
                  that.globalData.iv = iv;
                  that.getToken(res.code,encryptedData,iv);
                }, fail: res => {
                  if (that.getLoginStateCallback) {
                    that.getLoginStateCallback(false)
                  }
                }
              });
            }, fail: function (res) {
              if (that.getLoginStateCallback) {
                that.getLoginStateCallback(false)
              }
            }
          });
        } else {
          if (that.getLoginStateCallback) {
            that.getLoginStateCallback(false)
          }
        }
      },fail: function (res) {
        if (that.getLoginStateCallback) {
          that.getLoginStateCallback(false)
        }
      }
    });
  },
  
  getToken(code,encryptedData,iv) {
    var that = this;
    wx.request({
      //请求地址
      url: 'http://api-test.luckymony.com/api/user/getAccessToken',
      data: {
        "code": code,
        "encryptedData": encryptedData,
        "iv": iv
      },//发送给后台的数据
      header: {//请求头
        "Content-Type": "application/json"
        // "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'POST',
      dataType: 'json',
      success: function (res) {
        // console.log(res);
      },
      fail: function (res) {
        if (that.getLoginStateCallback) {
          that.getLoginStateCallback(false)
        }
      },//请求失败
      complete: function (res) {//请求完成
        console.log(res);
        if (res.statusCode == 200 && res.data.code == 0) {
          // console.log(res.data['data']);
          that.getUserInfo(res.data['data']);
        }else {
          if (that.getLoginStateCallback) {
              that.getLoginStateCallback(false)
          }
        }
      }//请求完成后执行的函数
    })
  },

  getUserInfo(token) {
    var that = this;
    that.globalData.token = token;
    wx.request({
      //请求地址
      url: 'http://api-test.luckymony.com/api/user/getUserInfo',
      header: {//请求头
        "Content-Type": "application/json",
        "accessToken" : token
      },
      method: 'POST',
      dataType: 'json',
      success: function (res) {
        // console.log(res);
      },
      fail: function (res) {
        if (that.getLoginStateCallback) {
          that.getLoginStateCallback(false)
        }
        console.log(res);
      },//请求失败
      complete: function (res) {//请求完成
        // console.log(res);
        if (res.statusCode == 200 && res.data.code == 0) {
          that.globalData.userInfo = res.data.data;
          console.log(res);
          if (that.getLoginStateCallback) {
            that.getLoginStateCallback(true)
          }
        }else {
          if (that.getLoginStateCallback) {
            that.getLoginStateCallback(false)
          }
        }
      }//请求完成后执行的函数
    })
  },

  globalData: {
    userInfo: null,
    token:null,
    code:null,
    encryptedData:null,
    iv:null
  }
})