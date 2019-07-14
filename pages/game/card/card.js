// pages/game/card/card.js

var windowWidth  = wx.getSystemInfoSync().windowWidth;
var windowHeight = wx.getSystemInfoSync().windowHeight;
var fromItems = [4];
var toItems = [10];
var mobileDistanceX = 0;
var mobileDistanceY = 0;
var redPacket = {
  i:0,
  x:0,
  y:0,
  w:(windowWidth - 90)/5,
  h:(windowWidth - 90)/5,
  c:"#ff00ff"
};
var redPackets = [];
var movePackets = [];

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
  

  drawRedPacket:function() {
    //使用wx.createContext获取绘图上下文context
    // return;
    var x = 0;
    var y = 0;
    var start_y = (windowHeight - (redPacket.h * 5 + 60)) / 2;
    var start_x = (windowWidth - (redPacket.w * 5 + 32)) / 2;

    //console.log(windowHeight);
    var context = wx.createContext();

    function rand(min, max) {
      return parseInt(Math.random() * (max - min) + min);
    }
    var allCount = rand(1, 25);
    
    function drawPacket(packet) {
      context.beginPath();
      context.setFillStyle(packet.c);
      context.rect(packet.x, packet.y, packet.w, packet.h);
      context.closePath();
      context.fill();
    }

    function isFromDraw(index) {
      for (var i = 0; i < fromItems.length; i++) {
        var obj = fromItems[i];
        if (index == obj) {
          return true;
        }
      }
      return false;
    }

    function isToDraw(index) {
      for (var i = 0; i < toItems.length; i++) {
        var obj = toItems[i];
        if (index == obj) {
          return true;
        }
      }
      return false;
    }
    redPackets = [];
    for (var i = 0; i < 25; i++) {
      var packet = {};
      x = start_x + 8 * (i % 5) + redPacket.w * (i % 5);
      var index = parseInt(i / 5);
      y = start_y + index * 8 + redPacket.h * index;
      packet.x = x;
      packet.y = y;
      packet.w = redPacket.w;
      packet.h = redPacket.h;
      packet.c = redPacket.c;
      packet.i = i;
      redPackets.push(packet);
      if (!isFromDraw(i)) {
        drawPacket(packet);
      }
    }
    
    var fromPacket = redPackets[4];
    var toPacket   = redPackets[10];
    var total_x = (fromPacket.x - toPacket.x);
    var total_y = (toPacket.y - fromPacket.y);
    var avg_x = total_x/100;
    var avg_y = total_y/100;
    mobileDistanceX += avg_x;
    mobileDistanceY += avg_y;
    // console.log(mobileDistanceX);
    // console.log(mobileDistanceY);
    if(fromPacket.x > toPacket.x) {
      fromPacket.x -= mobileDistanceX;
    }else {
      fromPacket.x += mobileDistanceX;
    }
    if (fromPacket.y > toPacket.y) {
      fromPacket.y -= mobileDistanceY;
    } else {
      fromPacket.y += mobileDistanceY;
    }
    fromPacket.c = "#eee";
    // console.log(fromPacket);
    drawPacket(fromPacket);
    // // console.log(redPackets);
    // for (var i = 0; i < toItems.length; i++) {
    //   var index1 = toItems[i];
    //   var index2 = fromItems[i];
    //   var redPacket1 = redPackets[index1];
    //   var redPacket2 = redPackets[index2];
    //   var total_x = (redPacket1.x - redPacket2.x);
    //   var total_y = (redPacket1.y - redPacket2.y);
    //   var avg_x = total_x/10;
    //   var avg_y = total_y/10;
    //   //console.log(avg_x, avg_y);
    //   redPacket2.x += avg_x;
    //   redPacket2.y += avg_y;
    //   redPacket2.c = "#eee";
    //   drawPacket(redPacket2);
    // }

    // console.log(redPackets[4]);
    // redPackets[4].x = 200;
    // redPackets[4].y = 300;
    // redPackets[4].c = "#ccc";
    // DrawRedPacket(redPackets[4]);
    wx.drawCanvas({
      canvasId: "flipCardCanvas",
      actions: context.getActions()
    });
   
  },


  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: '开门大吉' }); 
    
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
    this.drawRedPacket();
    this.interval = setInterval(this.drawRedPacket,50)
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
    clearInterval(this.interval)
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