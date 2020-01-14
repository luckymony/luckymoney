
const app = getApp()
Page({
  data: {
    nickName: '斗利是',
    iconUrl: '../../../images/home/login.png'
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: '我的' }); 
  },
  onReady: function () {
    // 页面渲染完成
    this.setData({
      nickName: app.globalData.userInfo.nickname,
      iconUrl: app.globalData.userInfo.avatarUrl
    });
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },

  goto_money_detail_page:function(){
    wx.navigateTo({
      url: '../money/moneyDetail',
    })
  },
  goto_withdraw_page:function(){
    wx.navigateTo({
      url: '../withdraw/withdraw',
    })
  }
})