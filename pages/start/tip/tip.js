// pages/start/tip/tip.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items:[
      { "title":"基本玩法介绍",
        "details": "红包活动最多能发起1000个红包;单个红包金额不能超过200元;限时设置默认是24小时,最小限时15分钟;每人拥有机会默认1次;最多不超过红包个数;难易程度分为:简单、正常、困难;红包提现正常需1-5个工作日。",
        "selected":0
      },
      {
        "title": "开门大吉玩法",
        "details": "当红包总数小于25个,其余空红包补齐,开始之前会展示当前最大红包的位置,当多人点中最大红包,响应最快的玩家抢得,其他玩家抢夺失败,只能抢其他红包。",
        "selected": 0
      },
      {
        "title": "八方来财玩法",
        "details": "可以选择空红包个数,最多不能超过当前红包的个数。",
        "selected": 0
      },
    ]
  },

  touchOneItem:function(e) {
    let number = e.currentTarget.id;
    var itemSelected = 'items[' + number + '].selected';
    this.setData({
      [itemSelected]: !this.data.items[number].selected,
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: '玩法介绍' });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})