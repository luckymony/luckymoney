// pages/start/tip/tip.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items:[
      {
        "title":"开门大吉",
        "details": "请在【红包记录】中找到对应的红包记录，点击进入详情后点击【邀请好友来玩】可把红包转发给好友或群;",
        "selected":0
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