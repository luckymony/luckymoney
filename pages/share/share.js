// pages/share/share.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
     luckyStr: '恭喜发财,大吉大利',
     playId: '',
     playType: null,
     playName: '斗利是',
     userName: '',
     iconUrl: '../../images/home/login.png'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: '分享给好友' }); 
    var that = this;
    if (options) {
      that.setData({
        playId: parseInt(options["palyId"]),
        playType: parseInt(options["playType"]),
        playName: options["playName"],
        userName: options["userName"],
        iconUrl: options["iconUrl"],
        luckyStr: options["luckyStr"],
      });
    }
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
    var title = that.data.userName.length > 0 ? (that.data.userName + '的红包') : '进来抢红包';
    var path1 = '/pages/home/rob/rob';
    var path2 = '/pages/home/relay/relay';
    var path = '/pages/start/main/start';
    if (that.data.playType == 2) {
        path = path2;
    }else if (that.data.playType == 1 
      || that.data.playType == 0){
        path = path1;
    }
    var newPath = that.data.playId.length > 0 ? (path + '?' + 'playId=' + that.data.playId) : path;
    var shareObj = {
  　　　　title: title,
         desc: that.data.luckyStr,
         path: newPath,
  　　　　imageUrl: '../../images/me/share.jpg',
  　　　　success: function (res) {
　　　　　　// 转发成功之后的回调
　　　　　　if (res.errMsg == 'shareAppMessage:ok') {
              wx.showToast({
                title: '分享成功',
                icon: 'none',
                duration: 2000
              })
　　　　　　}
  　　　　},fail: function () {
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
    　　return shareObj;
  }
})