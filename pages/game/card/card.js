// pages/game/card/card.js

var windowWidth  = wx.getSystemInfoSync().windowWidth;
var windowHeight = wx.getSystemInfoSync().windowHeight;
var fromItems = [4,6,7,8,9,10,15,21];
var toItems = [10,4,15,21,8,9,6,7];
var mobileDistanceX = 0;
var mobileDistanceY = 0;
var movePackets = [];

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bigRedPackets:[],
    redPackets:[],
    fromPackets:[]
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

  isMoveAnimationEnd:function(packets) {
    for(var j = 0; j<packets.length; j++) {
      var packet = packets[j];
      if (packet.n >= 0) {
          return false;
      }
    }
    return true;
  },

  /**
   * 生命周期函数--监听页面加载
   */

  drawRedPacket:function() {
    var that = this;
    var context = wx.createContext();
    context.clearRect(0, 0, windowWidth, windowHeight);

    function drawPacket(packet) {
      context.beginPath();
      context.setFillStyle(packet.c);
      context.rect(packet.x, packet.y, packet.w, packet.h);  
      context.closePath();
      context.fill();
      context.setFontSize(16) //字体大小
      context.setFillStyle('#ccc') //字体颜色
      context.textAlign = "center"; //文字居中
      context.fillText(packet.i, (packet.x + packet.w / 2), (packet.y + packet.h / 2) + 8 );
    }

    function swingAnimation (i,redPacket){
      var n = 'redPackets[' + i + '].n';
      var x = 'redPackets[' + i + '].x';
      that.setData({
        [x]: (redPacket.n == 1) ? (redPacket.x + 4) : (redPacket.x - 4),
        [n]: (redPacket.n == 1) ? 0 : 1,
      });
    }

    function moveAnimation (otherPacket,j) {
      if (otherPacket.n >= 0) {
        var x = 'fromPackets[' + j + '].x';
        var y = 'fromPackets[' + j + '].y';
        var n = 'fromPackets[' + j + '].n';
        that.setData({
          [x]: (otherPacket.n == 0) ? otherPacket.t_x : (otherPacket.avg_x + redPacket.x),
          [y]: (otherPacket.n == 0) ? otherPacket.t_y : (otherPacket.avg_y + redPacket.y),
          [n]: otherPacket.n - 1,
        });
      }else {
        if (that.isMoveAnimationEnd(that.data.fromPackets)) {
           //console.log('结束====');
        }
      }
    }

    for (var i = 0; i < that.data.redPackets.length; i++) {
      var redPacket = that.data.redPackets[i];
      drawPacket(redPacket);
      // if (that.isFromDraw(i)) {
      //   for (var j = 0; j < that.data.fromPackets.length; j++) {
      //     var otherPacket = that.data.fromPackets[j];
      //     if(otherPacket.i == i) {
      //       moveAnimation(otherPacket,j);
      //     }
      //       drawPacket(otherPacket); 
      //   }
      // }else {
      //   drawPacket(redPacket);
      // }
    }

    wx.drawCanvas({
      canvasId: "flipCardCanvas",
      actions: context.getActions()
    });
  },


  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: '开门大吉' }); 
    this.initRedPackets();
    this.initMovePackets();
  },

  initPacket:function(i) {
    var width = (windowWidth - 90) / 5;
    var height = (windowWidth - 90) / 5;
    var x = 0;
    var y = 0;
    var start_y = (windowHeight - (height * 5 + 60)) / 2;
    var start_x = (windowWidth - (width * 5 + 32)) / 2;
    var packet = {};
    x = start_x + 8 * (i % 5) + width * (i % 5);
    var index = parseInt(i / 5);
    y = start_y + index * 8 + height * index;
    packet.x = x;
    packet.y = y;
    packet.t_x = 0;
    packet.t_y = 0;
    packet.t_i = 0;
    packet.w = width;
    packet.h = height;
    packet.c = "#ff00ff";
    packet.i = i;
    packet.avg_x = 0;
    packet.avg_y = 0;
    packet.n = 0;
    return packet;
  },

  initMovePackets:function() {
    function rand(min, max) {
      return parseInt(Math.random() * (max - min) + min);
    }
    for (var j = 0; j < fromItems.length; j++) {
      var fromIndex = fromItems[j];
      var toIndex = toItems[j];
      var fromPacket = this.data.redPackets[fromIndex];
      var toPacket = this.data.redPackets[toIndex];
      var total_x = (toPacket.x - fromPacket.x);
      var total_y = (toPacket.y - fromPacket.y);
      var num_val = rand(10, 30);
      var avg_x = total_x / num_val;
      var avg_y = total_y / num_val;
      var avg_x_val = 'fromPackets[' + j + '].avg_x';
      var avg_y_val = 'fromPackets[' + j + '].avg_y';
      var t_y_val = 'fromPackets[' + j + '].t_y';
      var t_x_val = 'fromPackets[' + j + '].t_x';
      var t_i_val = 'fromPackets[' + j + '].t_i';
      var n_val = 'fromPackets[' + j + '].n';
      var c_val = 'fromPackets[' + j + '].c';
      this.setData({
        [avg_x_val]: avg_x,
        [avg_y_val]: avg_y,
        [t_x_val]: toPacket.x,
        [t_y_val]: toPacket.y,
        [t_i_val]: toPacket.i,
        [n_val]: num_val,
        [c_val]: "#fff",
      });
    }
  },

  initRedPackets:function() {
    for (var i = 0; i < 25; i++) {
      var that = this;
      var packet = that.initPacket(i);
      that.data.redPackets.push(packet);
    }
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