// pages/start/tip/tip.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items:[
      {
        "title":"开门大吉",
        "details": "开门大吉总共展示25张红包，游戏开始时先洗牌金色红包随机排放，然后有5～10张的红色红包显示给参与者需要记住红包位置，游戏难易程度决定显示的时间长短，参与者有限的时间里，找出之前显示的红包，若点错了红包则挑战失败，若超过有限时间也挑战失败，每次挑战失败都会损失一次机会，若当前机会次数等于0次，则此次抢红包游戏活动不能再参与。如果每个红色红包都被点中，则参与者可以得到一次获取真实红包的机会，从红包池中请求红包并转入个人微信账户。",
        "selected":0
      },
      {
        "title": "八方来财",
        "details": "八方来财红包随机从顶部不同位置下落，参与者在指定的时间内点取指定的分数，就可以得到一次快速下坠的红包，只要点中此红包，则参与者可以得到一次获取真实红包的机会，从红包池中请求红包并转入个人微信账户，若未点中则挑战失败，若超过有限时间也挑战失败，每次挑战失败都会损失一次机会，若当前机会次数等于0次，则此次抢红包游戏活动不能再参与。",
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