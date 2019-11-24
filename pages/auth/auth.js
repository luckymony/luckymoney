// pages/auth/auth.js
//获取应用实例
const app = getApp()

Page({
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isHide: false
  },

  onLoad: function () {
    var that = this;
    // 查看是否授权
    that.detectionAuth();
  },

  detectionAuth:function() {
    var that = this;
    wx.getSetting({
      success: function (res) {
        console.log(res);
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              console.log(res)
              // 用户已经授权过,不需要显示授权页面,所以不需要改变 isHide 的值
              // 根据自己的需求有其他操作再补充
              // 我这里实现的是在用户授权成功后，调用微信的 wx.login 接口，从而获取code
              var encryptedData = res.encryptedData;
              var iv = res.iv;
              wx.login({
                success: res => {
                  // 获取到用户的 code 之后：res.code
                  // console.log("用户的code:" + res.code);
                  // 可以传给后台，再经过解析获取用户的 openid
                  // 或者可以直接使用微信的提供的接口直接获取 openid ，方法如下：
                  that.getToken(res.code,encryptedData,iv);
                }
              });
            }
          });
        } else {
          // 用户没有授权
          // 改变 isHide 的值，显示授权页面
          that.setData({
            isHide: true
          });
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
        console.log(res);
      },//请求失败
      complete: function (res) {//请求完成
        console.log(res);
        if(res.statusCode == 200 && res.data.code == 0) {
          console.log (res.data['data']);
          that.getUserInfo(res.data['data']);
        }
      }//请求完成后执行的函数
    })
  },

  getUserInfo(token) {
    wx.request({
      //请求地址
      url: 'http://api-test.luckymony.com/api/user/getUserInfo',
      header: {//请求头
        "Content-Type": "application/json",
        "accessToken": token
      },
      method: 'POST',
      dataType: 'json',
      success: function (res) {
        // console.log(res);
      },
      fail: function (res) {
        console.log(res);
      },//请求失败
      complete: function (res) {//请求完成
        console.log(res);
      }//请求完成后执行的函数
    })
  },

  bindGetUserInfo: function (e) {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      //授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来
      that.setData({
        isHide: false
      });
      that.detectionAuth();
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权,将无法进入小程序,请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          // 用户没有授权成功，不需要改变 isHide 的值
          if (res.confirm) {
            console.log('用户点击了“返回授权”');
          }
        }
      });
    }
  },

  bindGetUserPhone:function(e) { //需要微信认证
    var that = this;
    console.log(e.detail.errMsg == "getPhoneNumber:ok");
    if (e.detail.errMsg == "getPhoneNumber:ok") {
      wx.request({
        url: 'http://localhost/index/users/decodePhone',
        data: {
          encryptedData: e.detail.encryptedData,
          iv: e.detail.iv,
          sessionKey: that.data.session_key,
          uid: "",
        },
        method: "post",
        success: function (res) {
          console.log(res);
        }
      })
    }else {
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权,如使用过程遇到问题将无法第一时间通知您!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          // 用户没有授权成功，不需要改变 isHide 的值
          if (res.confirm) {
            console.log('用户点击了“返回授权”');
          }
        }
      });
    }
  }
})
