Page({
  data: {
    // text:"这是一个页面"
    items:[
       "开门大吉",
       "八方来财",
       "敬请期待"
    ]
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: '红包玩法' });
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