
var windowWidth  = wx.getSystemInfoSync().windowWidth;
var windowHeight = wx.getSystemInfoSync().windowHeight;
const { $Message } = require('../../../dist/base/index');
Page({
  data: {
    readyVisible : true,
    isShowBig: false,
    isHit:false,
    readyRainTimer: null, // 准备时间Timer
    readyTime : 5,
    time:10,
    addRedpackTime:null,
    dreawTime:null,
    animationData:null,
    score:0,
    changeScore:0,
    redpackets:[],
    opportunity:2,
    showTipStr:'一大波红包即将来袭'
  },

  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: '八方来财' });
    var that = this;
    that.start();
  },

  start() {
    var that = this;
    that.data.readyRainTimer = setInterval(function () {
      if (that.data.readyTime == 0) {
        // 清除准备倒计时
        clearInterval(that.data.readyRainTimer)
        that.setData({
          readyVisible: false,
        })
        if (!that.data.isHit) {
          // 开始红包雨
          that.play();
        }else {
          that.setData({
            // isHit:false,
            isShowBig: true
          })
        }
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
      var nowTime = that.data.time - 1;
      if(nowTime <=0)nowTime = 0;
      // 时间为0的时候游戏结束
      if (nowTime <= 0) {
        clearInterval(that.data.gameTimer);
      }
      that.setData({
        time: nowTime
      })
    }, 1000)

    that.data.addRedpackTime = setInterval(function () {
        if (that.data.isHit) {
            clearInterval(that.data.addRedpackTime);
        }
        var lastRedpacket = null;
        if (that.data.redpackets.length > 0){
          lastRedpacket = that.data.redpackets[that.data.redpackets.length - 1];
        }
        var proportion = that.rand(0.8, 1.0);
        var type = that.data.isHit ? 2 : that.randInt(0,2);
        //console.log(type);
        var score = 0;
        if(proportion >= 0.8 && proportion < 0.9) {
          var score1 = that.randInt(1,5);
          var score2 = that.randInt(-10,-5);
          score = type === 0 ? score1 : score2;
        } else if (proportion >= 0.9 && proportion <= 1.0) {
          var score1 = that.randInt(5, 10);
          var score2 = that.randInt(-5, -1);
          score = type === 0 ? score1 : score2;
        }
        var src1 = '../../../images/rain/jiafen_' + that.randInt(1,5) + '.png';
        var src2 = '../../../images/rain/jianfen_' + that.randInt(1,5) + '.png';
        var src3 = '../../../images/rain/qiang.png';

        if (lastRedpacket === null) {
          var redpacket = {
            w: 64 * proportion,
            y: 0,
            x: that.rand(0, windowWidth - 64 * proportion),
            s: type === 2 ? 30 : 10,
            image: type === 0 ? src1 : type === 1 ? src2 : src3,
            type: type,
            score: score
          }
          that.data.redpackets.push(redpacket)
        }else {
          if (lastRedpacket.x > windowWidth/2) {
            var redpacket = {
              w: 64 * proportion,
              y: 0,
              x: that.rand(0, windowWidth/2),
              s: type === 2 ? 30 : 10,
              image: type === 0 ? src1 : type === 1 ? src2 : src3,
              type: type,
              score: score
            }
            that.data.redpackets.push(redpacket)
          }else {
            var redpacket = {
              w: 64 * proportion,
              y: 0,
              x: that.rand(windowWidth / 2, windowWidth - 64 * proportion),
              s: type === 2 ? 30 : 10,
              image: type === 0 ? src1 : type === 1 ? src2 : src3,
              type: type,
              score: score
            }
            that.data.redpackets.push(redpacket)
          }
        }
        // console.log(that.data.redpackets);
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
      var index = 0;
      var isDel = false;

      for (var i = 0; i < that.data.redpackets.length; i++) {
        var redpacket = that.data.redpackets[i];
        context.drawImage(redpacket.image,
          redpacket.x, redpacket.y, redpacket.w, redpacket.w)
        if (redpacket.y >= windowHeight + redpacket.w) { //删除当前红包
          index = i;
          isDel = true;
          if (redpacket.type === 2) { //没有点中大红包
            //console.log('没有点中大红包')
            if (that.data.opportunity > 0) { //拥有机会

            }else { //无机会

            }
          }
        } else {
          if (that.data.isHit) {
            if (redpacket.type === 2 && that.data.isShowBig) {
                redpacket.y += redpacket.s;
            }
          }else {
            redpacket.y += redpacket.s;
          }
        }
      }
      if (isDel) {
        that.data.redpackets.splice(index, 1)
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
    return Math.floor(Math.random() * (max - min) + min);
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
          if (that.data.isShowBig) {
            if (redpacket.type === 2) {
              // console.log('点中了' + i + '红包');
            }
          } else {
            that.animationOfScore();
            // console.log('点中了'+i+'红包');
            that.data.redpackets.splice(i, 1)
            var score = that.data.score + redpacket.score;
            if (score >= 10) {
              that.setData({ 
                isHit : true,
                isShowBig:false,
                readyVisible: true,
                readyTime:5,
                time:0,
                showTipStr:'有一大红包即将出现'
              });
              that.start();
              wx.vibrateLong({
                success: res => {
                  //console.log('颤抖')
                },
                fail: err => {
                  //console.log('我就问你为什么不抖动了')
                }
              });
            }
            that.setData({
              changeScore: redpacket.score,
              score: score
            })
          }
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