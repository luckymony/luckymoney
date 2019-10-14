
var windowWidth  = wx.getSystemInfoSync().windowWidth;
var windowHeight = wx.getSystemInfoSync().windowHeight;

Page({

  data: {
    readyVisible : true,
    readyRainTimer: null, // 准备时间Timer
    readyTime : 5,
    time:10,
    addRedpackTime:null,
    redpackets:[]
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
    that.data.gameTimer = setInterval(function () {
      var nowTime = that.data.time - 1
      // 时间为0的时候游戏结束
      if (nowTime == 0) {
        clearInterval(that.data.gameTimer);
      }
      that.setData({
        time: nowTime
      })
    }, 1000)

    var index = 0;
    that.data.addRedpackTime = setInterval(function () {
         var redpacket = {
         w:64 * that.rand(0.8,1.0),
         y:0,
         x:that.rand(10, windowWidth - 10 - 64 * that.rand(0.8, 1.0)),
         t:60,
         inter:'',
         index:index
         }
         that.data.redpackets.push(redpacket)
         index++;
         console.log(that.data.redpackets)
         that.redpacketRolling()
    }, 1000)

  },

  redpacketRolling() {
    var that = this
    for (var i = 0; i < that.data.redpackets.length; i++) {
      var redpacket = that.data.redpackets[i];
      var context = wx.createContext()
      context.beginPath();
      context.drawImage('../../../images/rain/rdc.png',
        redpacket.x, redpacket.y, redpacket.w, redpacket.w)
      //console.log(redpacket.x, redpacket.y);
      if (redpacket.y >= windowHeight) { //删除当前红包
        // clearInterval(redpacket.inter);
        // console.log(that.data.redpackets.length);
        // that.data.redpackets.splice(redpacket.index,1);
        // console.log(that.data.redpackets.length);
      } else {
        redpacket.y += 20;
      }
      context.closePath();
      context.fill();
      wx.drawCanvas({
        canvasId: 'caxCanvas',
        actions: context.getActions()
      })
    }
  },

  rand(min, max) {
    return parseFloat(Math.random() * (max - min) + min);
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    clearInterval(this.data.setInter)
    clearInterval(this.data.gameTimer);
    clearTimeout(this.data.addTimeout);
  },

});