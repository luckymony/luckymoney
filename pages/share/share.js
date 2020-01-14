// pages/share/share.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    luckyStr:'恭喜发财,大吉大利',
     playId:'',
     playName:'开门大吉'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: '斗利是' }); 
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
  onShareAppMessage: function (res) {
    var that = this;
    　　var shareObj = {
  　　　　title: "xxx"+"红包",
         desc: "恭喜发财 大吉大利",
         path: 'pages/start/main/start',
  　　　　imageUrl: 'images/me/share.jpg',
  　　　　success: function (res) {
　　　　　　// 转发成功之后的回调
　　　　　　if (res.errMsg == 'shareAppMessage:ok') {
              wx.showToast({
                title: '分享成功',
                icon: 'none',
                duration: 2000
              })
　　　　　　}
  　　　　},
  　　　　fail: function () {
  　　　　　　// 转发失败之后的回调
  　　　　　　if (res.errMsg == 'shareAppMessage:fail cancel') {
                  wx.showToast({
                    title: '用户取消转发',
                    icon: 'none',
                    duration: 2000
                  })
  　　　　　　} else if (res.errMsg == 'shareAppMessage:fail') {
                  wx.showToast({
                    title: '分享失败',
                    icon: 'none',
                    duration: 2000
                  })
  　　　　　　}
  　　　　}      　　　　
      }
    　　if (options.from == 'button') {
    　　　　shareObj.path = ''
    　　}
    　　return shareObj;
  }
})