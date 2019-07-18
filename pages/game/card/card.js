// pages/game/card/card.js

var windowWidth  = wx.getSystemInfoSync().windowWidth;
var windowHeight = wx.getSystemInfoSync().windowHeight;
var fromItems = [4,6,7,8,9,10,15,21];
var toItems = [10,4,15,21,8,13,6,7];
var mobileDistanceX = 0;
var mobileDistanceY = 0;
var movePackets = [];

Page({

  /**
   * 页面的初始数据
   */
  data: {
    redPackets:[],
    fromePackets:[]
  },

  canvasEnd:function (e) {
    console.log(e);
  },

    isFromDraw:function (index) {
      for(var i = 0; i<fromItems.length; i++) {
        var obj = fromItems[i];
        if (index == obj) {
          return true;
        }
      }
      return false;
    },

  isToDraw:function (index) {
    for (var i = 0; i < toItems.length; i++) {
      var obj = toItems[i];
      if (index == obj) {
        return true;
      }
    }
    return false;
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

    var context = wx.createContext();

    function rand(min, max) {
      return parseInt(Math.random() * (max - min) + min);
    }

    function drawPacket(packet) {
      context.beginPath();
      context.setFillStyle(packet.c);
      context.rect(packet.x, packet.y, packet.w, packet.h);
      context.closePath();
      context.fill();
    }

    var that = this;
    for (var i = 0; i < that.data.redPackets.length; i++) {
      var redPacket = that.data.redPackets[i];
      if (!that.isFromDraw(i)) {
        drawPacket(redPacket);
      }else {
       
      }
    }

  //   redPackets = [];
  //   for (var i = 0; i < 25; i++) {
  //     var packet = {};
  //     x = start_x + 8 * (i % 5) + redPacket.w * (i % 5);
  //     var index = parseInt(i / 5);
  //     y = start_y + index * 8 + redPacket.h * index;
  //     packet.x = x;
  //     packet.y = y;
  //     packet.w = redPacket.w;
  //     packet.h = redPacket.h;
  //     packet.c = redPacket.c;
  //     packet.i = i;
  //     redPackets.push(packet);
  //     if (!isFromDraw(i)) {
  //       drawPacket(packet);
  //     }
  //   }
    
  //   var fromIndex = fromItems[0];
  //   var toIndex = toItems[0];
  //   var fromPacket = redPackets[fromIndex];
  //   var toPacket = redPackets[toIndex];
  //   var total_x = (fromPacket.x - toPacket.x);
  //   var total_y = (fromPacket.y - toPacket.y);
  //   var avg_x = total_x / 50;
  //   var avg_y = total_y / 50;
  //   mobileDistanceX += avg_x;
  //   mobileDistanceY += avg_y;

  //   if (fromPacket.x > toPacket.x) {
  //     fromPacket.x -= mobileDistanceX;
  //   } else {
  //     fromPacket.x += mobileDistanceX;
  //   }
  //   if (fromPacket.y > toPacket.y) {
  //     fromPacket.y += mobileDistanceY;
  //   } else {
  //     fromPacket.y -= mobileDistanceY;
  //   }
  //   fromPacket.c = "#eee";
  //   drawPacket(fromPacket);

    wx.drawCanvas({
      canvasId: "flipCardCanvas",
      actions: context.getActions()
    });
   
  },


  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: '开门大吉' }); 
    this.initRedPackets();
    this.drawRedPacket();
  },

  initRedPackets:function() {
    var width  = (windowWidth - 90) / 5;
    var height = (windowWidth - 90) / 5;
    var x = 0;
    var y = 0;
    var start_y = (windowHeight - (height * 5 + 60)) / 2;
    var start_x = (windowWidth - (width * 5 + 32)) / 2;
    for (var i = 0; i < 25; i++) {
      var packet = {};
      x = start_x + 8 * (i % 5) + width * (i % 5);
      var index = parseInt(i / 5);
      y = start_y + index * 8 + height * index;
      packet.x = x;
      packet.y = y;
      packet.w = width;
      packet.h = height;
      packet.c = "#ff00ff";
      packet.i = i;
      packet.avg_x=0;
      packet.avg_y=0;
      packet.n=0;
      var that = this;
      that.data.redPackets.push(packet);
      if (this.isFromDraw(i)){
        that.data.fromePackets.push(packet);
      }
    }

    for (var j = 0; j < fromItems.length; j++) {
      var fromIndex = fromItems[j];
      var toIndex = toItems[j];
      var fromPacket = this.data.redPackets[fromIndex];
      var toPacket = this.data.redPackets[toIndex];
      var total_x = (fromPacket.x - toPacket.x);
      var total_y = (fromPacket.y - toPacket.y);
      var avg_x = total_x / 50;
      var avg_y = total_y / 50;
      var avg_x_val = 'fromePackets[' + j + '].avg_x';
      var avg_y_val = 'fromePackets[' + j + '].avg_y';
      var num_val = 'fromePackets[' + j + '].n';
      this.setData({
        [avg_x_val]: avg_x,
        [avg_y_val]: avg_y,
        [num_val]:50
      });
    }
    console.log(this.data.redPackets);
    console.log(this.data.fromePackets);
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
    //this.drawRedPacket();
    //this.interval = setInterval(this.drawRedPacket,20)
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
    // clearInterval(this.interval)
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