// pages/auth/auth.js
//获取应用实例
const app = getApp()

Page({
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isHide: true
  },

  onLoad: function () {
    
  },

  bindGetUserInfo: function (e) {
    if (e.detail.userInfo) {
      console.log(e.detail.userInfo)
      wx.showLoading({
        title: '授权登陆...',
      })
      app.getLoginStateCallback = res => {
        wx.hideLoading();
        if(!res) {
          wx.showToast({
            title: '授权失败',
            icon: 'none',
            duration: 2000
          })
        }else {
          wx.switchTab({
            url: '../home/main/home',
          })
        }
      }
      app.detectionAuth();
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权,将无法进入小程序,请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击了“返回授权”');
          }
        }
      });
    }
  },

  // bindGetUserPhone:function(e) { //需要微信认证
  //   var that = this;
  //   console.log(e.detail.errMsg == "getPhoneNumber:ok");
  //   if (e.detail.errMsg == "getPhoneNumber:ok") {
  //     wx.request({
  //       url: 'http://localhost/index/users/decodePhone',
  //       data: {
  //         encryptedData: e.detail.encryptedData,
  //         iv: e.detail.iv,
  //         sessionKey: that.data.session_key,
  //         uid: "",
  //       },
  //       method: "post",
  //       success: function (res) {
  //         console.log(res);
  //       }
  //     })
  //   }else {
  //     wx.showModal({
  //       title: '警告',
  //       content: '您点击了拒绝授权,如使用过程遇到问题将无法第一时间通知您!',
  //       showCancel: false,
  //       confirmText: '返回授权',
  //       success: function (res) {
  //         // 用户没有授权成功，不需要改变 isHide 的值
  //         if (res.confirm) {
  //           console.log('用户点击了“返回授权”');
  //         }
  //       }
  //     });
  //   }
  // }
})
