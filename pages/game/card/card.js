// pages/game/card/card.js

var windowWidth  = wx.getSystemInfoSync().windowWidth;
var windowHeight = wx.getSystemInfoSync().windowHeight;

var redPacket = {
  x:0,
  y:0,
  w:(windowWidth - 90)/5,
  h:(windowWidth - 90)/5,
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
  /*
      context.setFontSize(16) //字体大小
      context.setFillStyle('#fff') //字体颜色
      context.textAlign = "center"; //文字居中
      context.fillText(i,x+redPacket.w/2,y+redPacket.h/2);
  */

  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: '开门大吉' }); 
    //使用wx.createContext获取绘图上下文context
    var x = 0;
    var y = 0;
    var start_y = (windowHeight - (redPacket.h*5 + 60))/2;
    var start_x = (windowWidth - (redPacket.w*5 + 32))/2;
    //console.log(windowHeight);
    var context = wx.createContext();

    function DrawRedPacket(redPacket) {
      context.beginPath();
      context.setFillStyle(redPacket.c);
      context.rect(redPacket.x, redPacket.y, redPacket.w, redPacket.h);
      context.closePath();
      context.fill();
    }

    for(var i=0;i<25;i++) {
      x = start_x + 8 * (i % 5) + redPacket.w * (i % 5);
      var index = parseInt(i / 5);
      y = start_y + index * 8 + redPacket.h * index;
      redPacket.x = x;
      redPacket.y = y;
      redPackets.push(redPacket);
      DrawRedPacket(redPacket);
    }
    console.log(redPackets[4]);
    redPackets[4].x = 200;
    redPackets[4].y = 300;
    redPackets[4].c = "#ccc";
    DrawRedPacket(redPackets[4]);
    wx.drawCanvas({
      canvasId: "flipCardCanvas",
      actions: context.getActions()
    });

    
  },

  /** 移动方案1
   * 4->10
   * 6->4
   * 7->15
   * 8->21
   * 9->8
   * 10->13
   * 15->6
   * 21->7
   */

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