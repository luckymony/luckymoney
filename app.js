//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },

//启动授权
  detectionAuth:function(){
    var that = this;
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
            that.getLogin();
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

//获取微信用户信息
  geWxtUserInfo:function() {
    var that = this;
    wx.getUserInfo({
      success: function (res) {
        that.globalData.encryptedData = res.encryptedData;
        that.globalData.iv = res.iv;
        that.getToken(that.globalData.code, that.globalData.encryptedData, that.globalData.iv);
      }, fail: function (res) {
        if (that.getLoginStateCallback) {
          that.getLoginStateCallback(false)
        }
      }
    });
  },

 //微信登陆
  getLogin:function() {
    var that = this;
    wx.login({
        success: res => {
          console.log(res);
          that.globalData.code = res.code;
          that.geWxtUserInfo();
        }, fail: res => {
          if (that.getLoginStateCallback) {
            that.getLoginStateCallback(false)
          }
        }
     });
  },
  
  //获取token
  getToken(code,encryptedData,iv) {
    var that = this;
    wx.request({
      //请求地址
      url: 'http://5c6qfk.natappfree.cc/api/user/getAccessToken',
      data: {
        "code": code,
        "encryptedData": encryptedData,
        "iv": iv
      },//发送给后台的数据
      header: {//请求头
        "Content-Type": "application/json"
      },
      method: 'POST',
      dataType: 'json',
      success: function (res) {
         console.log(res);
      },
      fail: function (res) {
        if (that.getLoginStateCallback) {
            that.getLoginStateCallback(false)
        }
      },//请求失败
      complete: function (res) {//请求完成
        console.log(res);
        if (res.statusCode == 200 && res.data.code == 0) {
          that.getUserInfo(res.data['data']);
        }else {
          if (that.getLoginStateCallback) {
              that.getLoginStateCallback(false)
          }
        }
      }
    })
  },
  
  //获取用户信息
  getUserInfo(token) {
    var that = this;
    that.globalData.token = token;
    wx.request({
      //请求地址
      url: 'http://5c6qfk.natappfree.cc/api/user/getUserInfo',
      header: {//请求头
        "Content-Type": "application/json",
        "accessToken" : token
      },
      method: 'POST',
      dataType: 'json',
      success: function (res) {
         console.log(res);
      },
      fail: function (res) {
        if (that.getLoginStateCallback) {
          that.getLoginStateCallback(false)
        }
        //console.log(res);
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
      }
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