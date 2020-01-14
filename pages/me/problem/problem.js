// pages/me/problem/problem.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [
      {
        "title": "我支付后但没有转发出去?",
        "details": "请在【红包记录】中找到对应的红包记录，点击进入详情后点击【邀请好友来玩】可把红包转发给好友或群;",
        "selected": 0
      },
      {
        "title": "好友可以转发我的红包吗?",
        "details": "可以的，您分享给好友或者转发到微信群的红包，其他好友都可以再次转发;",
        "selected": 0
      },
      {
        "title": "发红包游戏会收取服务费吗?",
        "details": "发红包游戏需要收取2%的服务费;",
        "selected": 0
      },
      {
        "title": "未领取的红包金额会怎么处理?",
        "details": "未领取的红包金额将于24小时后退至本小程序余额中;",
        "selected": 0
      },
      {
        "title": "如何提现到微信钱包?",
        "details": "在【我的-钱包余额】跳转至余额提现页面进行提现，每天只能提现1次;",
        "selected": 0
      },
      {
        "title": "提现会收取服务费吗？多久到账?",
        "details": "提现不收取服务费；申请提现后会在1-5个工作日内转账到您的微信钱包；【温馨提示】微信号非实名认证需完成实名认证后才可提现;",
        "selected": 0
      },
      {
        "title": "如何联系客服?",
        "details": "目前可通过微信联系在线客服，客服在线时间：9:00-21:30;",
        "selected": 0
      },
    ]
  },

  touchOneItem: function (e) {
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
    wx.setNavigationBarTitle({ title: '常见问题' }); 
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

  }
})