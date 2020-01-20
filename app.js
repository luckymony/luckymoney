var util = require('/utils/util.js');

const testUrl = 'https://api-test.luckymony.com';
const localUrl = 'http://tn7vbh.natappfree.cc';
const formalUrl = '';
const isDebug = 1;

//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    var that = this;
    if (isDebug == 1) {
      that.globalData.baseUrl = testUrl;
    }else if (isDebug == 2) {
      that.globalData.baseUrl = localUrl;
    }else if (isDebug == 3) {
      that.globalData.baseUrl = formalUrl;
    }
    console.log(that.globalData.baseUrl)
    that.globalData.userInfo = that.getStorage('userInfo');
    that.globalData.token = that.getStorage('token');
    that.globalData.code = that.getStorage('code');
    that.globalData.encryptedData = that.getStorage('encryptedData');
    that.globalData.iv = that.getStorage('iv');
    console.log(that.globalData.token)
     if (that.globalData.token) {
       wx.switchTab({
         url: '/pages/home/main/home',
      });
       that.checksession();
     }
  },

  checksession:function(){
    var that = this;
    wx.checkSession({
     success:function(res){
       var loginTime = that.getStorage('loginTime');
       var currentTime = util.currentTimeStamp();
       if (currentTime - loginTime > 2*60*60) {
         that.getLogin(); //重新登陆
       }
     },fail:function(res){
       console.log(res);
       that.getLogin(); //重新登陆
       that.getLoginStateCallback = res => {
         if (!res){
           wx.navigateTo({
             url: '/pages/auth/auth',
           })
         }
       }
     }
    })
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
        that.setStorage('encryptedData',res.encryptedData); //encryptedData数据本地化
        that.setStorage('iv',res.iv); //iv数据本地化
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
          // console.log(res);
          that.globalData.code = res.code;
          that.setStorage('code',res.code); //code数据本地化
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
      url: that.globalData.baseUrl + '/api/user/getAccessToken',
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
        // console.log(res);
        if (that.getLoginStateCallback) {
            that.getLoginStateCallback(false)
        }
      },//请求失败
      complete: function (res) {//请求完成
        // console.log(res);
        if (res.statusCode == 200 && res.data.code == 0) {
          that.getUserInfo(res.data['data']);
          that.setStorage('token',res.data['data']); //token数据本地化
          that.setStorage('loginTime', util.currentTimeStamp());//登录时间戳
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
      url: that.globalData.baseUrl + '/api/user/getUserInfo',
      header: {//请求头
        "Content-Type": "application/json",
        "accessToken" : token
      },
      method: 'POST',
      dataType: 'json',
      success: function (res) {
        //  console.log(res);
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
          that.setStorage('userInfo',that.globalData.userInfo); //用户数据本地化
          // console.log(res);
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

  setStorage:function(currentKey,currentValue) {
    wx.setStorage({
      key:currentKey,
      data:currentValue
    })
  },

  getStorage:function(currentKey) {
    try {
      var value = wx.getStorageSync(currentKey)
      return value;
    } catch (e) {
      // Do something when catch error
    }
  },

  globalData: {
    userInfo: null,
    token: null,
    code: null,
    encryptedData: null,
    iv:null,
    baseUrl:null
  }
})