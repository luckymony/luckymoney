Page({
  data: {
    // text:"这是一个页面"
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: '抢红包' }); 
    wx.showToast({
      title:"加载中...",
      icon: "loading",
      duration:3000
    })
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
  }
})
