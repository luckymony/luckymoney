
var windowWidth  = wx.getSystemInfoSync().windowWidth;
var windowHeight = wx.getSystemInfoSync().windowHeight;

Page({

  data: {
    readyVisible : true,
    readyRainTimer: null, // 准备时间Timer
    readyTime : 5,
    time:10,
    addRedpackTime:null,
    dreawTime:null,
    animationData:null,
    score:0,
    changeScore:0,
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

    that.data.addRedpackTime = setInterval(function () {
        var lastRedpacket = null;
        if (that.data.redpackets.length > 0){
          lastRedpacket = that.data.redpackets[that.data.redpackets.length - 1];
        }
        var type = that.randInt(1,4);
        var score = type <= 2 ? that.randInt(0, 10) : that.randInt(-10,-1);
        var src1 = '../../../images/rain/rdc.png';
        var src2 = '../../../images/rain/zhadan.png';
        if (lastRedpacket === null) {
          var redpacket = {
            w: 64 * that.rand(0.8, 1.0),
            y: 0,
            x: that.rand(0, windowWidth- 64 * that.rand(0.8, 1.0)),
            image: type <= 2 ? src1 : src2,
            type: type,
            score: score
          }
          that.data.redpackets.push(redpacket)
        }else {
          if (lastRedpacket.x > windowWidth/2) {
            var redpacket = {
              w: 64 * that.rand(0.8, 1.0),
              y: 0,
              x: that.rand(0, windowWidth/2),
              image: type <= 2 ? src1 : src2,
              type: type,
              score: score
            }
            that.data.redpackets.push(redpacket)
          }else {
            var redpacket = {
              w: 64 * that.rand(0.8, 1.0),
              y: 0,
              x: that.rand(windowWidth / 2, windowWidth - 64 * that.rand(0.8, 1.0)),
              image: type <= 2 ? src1 : src2,
              type: type,
              score: score
            }
            that.data.redpackets.push(redpacket)
          }
        }
        //  console.log(that.data.redpackets);
    },350)
    that.redpacketRolling();
  },

  redpacketRolling() {
    var that = this
    var isNext = true;
    that.data.dreawTime  = setInterval(function () {
      if(!isNext)return
      isNext = false;
      var context = wx.createContext()
      context.beginPath();
      for (var i = 0; i < that.data.redpackets.length; i++) {
        var redpacket = that.data.redpackets[i];
        context.drawImage(redpacket.image,
          redpacket.x, redpacket.y, redpacket.w, redpacket.w)
        if (redpacket.y >= windowHeight + redpacket.w) { //删除当前红包
           var removeTimeout = setTimeout(function() {
              that.data.redpackets.splice(0, 1)
              clearTimeout(removeTimeout);
           },30);
        } else {
          redpacket.y += 10;
        }
      }
      context.closePath();
      context.fill();
      wx.drawCanvas({
        canvasId: 'caxCanvas',
        actions: context.getActions()
      })
      isNext = true;
    },50)
  },

  rand(min, max) {
    return parseFloat(Math.random() * (max - min) + min);
  },

  randInt(min,max) {
    return parseInt(Math.random() * (max - min) + min);
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    clearInterval(this.data.dreawTime);
    clearInterval(this.data.gameTimer);
    clearInterval(this.data.addRedpackTime);
  },

  touchStart: function (evt) {
    var that = this;
    //console.log(evt.touches[0].x, evt.touches[0].y);
    for (var i = 0; i < that.data.redpackets.length; i++) {
      var redpacket = that.data.redpackets[i];
      if (redpacket.x + redpacket.w >= evt.touches[0].x
        && redpacket.x <= evt.touches[0].x
        && redpacket.y + redpacket.w >= evt.touches[0].y
        && redpacket.y <= evt.touches[0].y
        ){
            that.animationOfScore();
            // console.log('点中了'+i+'红包');
            that.data.redpackets.splice(i, 1)
            var score = that.data.score + redpacket.score;
            that.setData ({
              changeScore:redpacket.score,
              score: score
            })
        }
    }
  },

  touchMove: function (evt) {
    
  },

  touchEnd: function (evt) {
   
  },

  //分数动画
  animationOfScore() {
    const animation = wx.createAnimation({
      duration: 300,
      timingFunction: 'ease'
    })
    this.animation = animation
    animation.opacity(1).step()
    setTimeout(
      function () {
        animation.opacity(0).step()
        this.setData({
          animationData: animation.export()
        })
      }.bind(this),
      10
    )
  },

});