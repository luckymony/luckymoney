// pages/game/card/card.js

var windowWidth  = wx.getSystemInfoSync().windowWidth;
var windowHeight = wx.getSystemInfoSync().windowHeight;

var redPacket = {
  w:(windowWidth - 90)/5,
  h:(windowHeight - 260)/5,
  c:"#ff00ff"
};
var redPackets = [];

Page({

  /**
   * 页面的初始数据
   */
  data: {
     
  },

  canvasEnd:function (e) {
    console.log(e);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: '开门大吉' }); 
    //使用wx.createContext获取绘图上下文context
    var x = 0;
    var y = 0;
    var context = wx.createContext();
    for(var i=0;i<25;i++) {
      x = 15 * ((i % 5) + 1) + redPacket.w * (i % 5);
      y = 100 + (i / 5) * 15 + redPacket.h * (i / 5);
      context.setFillStyle(redPacket.c);
      context.beginPath();
      context.rect(x, y, redPacket.w, redPacket.h);
      context.closePath();
      context.fill();
    }
    wx.drawCanvas({
      canvasId: "flipCardCanvas",
      actions: context.getActions()
    });
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