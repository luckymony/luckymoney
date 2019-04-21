Page({
  data: {
    items: [
      {sentiment : "恭喜发财,大吉大利"},
      {amount : "50"},
      {count: 4 },
      {mode: "开门大吉" }
    ]
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: '发红包' }); 
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

})
