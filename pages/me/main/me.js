Page({
  data: {
    // text:"这是一个页面"
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: '我的' }); 
  },
  onReady: function () {
    // 页面渲染完成
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
      url: '../money/money-detail',
    })
  },
  goto_withdraw_page:function(){
    wx.navigateTo({
      url: '../withdraw/withdraw',
    })
  }
})