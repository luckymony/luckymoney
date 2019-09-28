
var windowWidth  = wx.getSystemInfoSync().windowWidth;
var windowHeight = wx.getSystemInfoSync().windowHeight;

Page({

  data: {
    readyVisible : true,
    readyRainTimer: null, // 准备时间Timer
    readyTime : 5,
    time:10
  },

  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: '八方来财' });
    var that = this;
    that.start();
  },

  start() {
    var that = this;
    this.data.readyRainTimer = setInterval(function () {
      if (that.data.readyTime == 0) {
        // 清除准备倒计时
        clearInterval(that.data.readyRainTimer)
        that.setData({
          readyVisible: false
        })
        // 开始红包雨
        that.play();
      } else {
        that.data.readyTime -= 1
        that.setData({
          readyTime: that.data.readyTime
        })
      }
    }, 1000)
  },

  play() {
    var that = this
    // 不停地调用函数，直到 clearInterval()
    this.data.gameTimer = setInterval(function () {
      var nowTime = that.data.time - 1
      // 时间为0的时候游戏结束
      if (nowTime == 0) {
        clearInterval(that.data.gameTimer);
      }
      that.setData({
        time: nowTime
      })
    }, 1000)
  },

  /*
  var s = 20;
    var y = -25.6 * (7/9);
    var x = 50;
    var that = this;
    that.data.setInter = setInterval(
      function () {
        var context = wx.createContext()
        context.beginPath();
        context.translate(25.6,0);
        context.rotate(s * Math.PI / 180);
        context.drawImage("../../../images/rain/rdc.png",x,y, 51.2, 51.2)
        // console.log(x,y);
        if (y >= windowHeight) {
          y = -25.6 * (7 / 9);
          x = 50;
        }else {
          y += 30;
          x += 30 * (s * Math.PI / 180);
        }
        context.closePath();
        context.fill();
        wx.drawCanvas({
          canvasId: 'caxCanvas',
          actions: context.getActions()
        })
      }, 30);
  */

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    clearInterval(this.data.setInter)
  },

});