// component/redpacket/redpacket.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    //活动限时
     iconUrl: {
      type: String,
      value: "../../images/me/user_icon_default.png"
    },
     userName:{
       type: String,
       value: "张三丰"
     },
     message:{
       type: String,
       value: "恭喜发财,大吉大利"
     },
     money:{
       type: Number,
       value: 0.5
     },

  },
  /**
   * 组件的初始数据
   */
  data: {
    moneyImages: [
      {
        url: '../../images/packet/icon_open_red_packet1.png',
        width: 294,
        height:294,
        index:0
      },
      {
        url: '../../images/packet/icon_open_red_packet2.png',
        width: 207,
        height: 294,
        index: 1
      },
      {
        url: '../../images/packet/icon_open_red_packet3.png',
        width: 135,
        height: 294,
        index: 2
      },
      {
        url: '../../images/packet/icon_open_red_packet4.png',
        width: 21,
        height: 299,
        index: 3
      },
      {
        url: '../../images/packet/icon_open_red_packet5.png',
        width: 135,
        height: 294,
        index: 4
      },
      {
        url: '../../images/packet/icon_open_red_packet6.png',
        width: 207,
        height: 294,
        index: 5
      },
      {
        url: '../../images/packet/icon_open_red_packet7.png',
        width: 294,
        height: 294,
        index: 6
      },
      {
        url: '../../images/packet/icon_open_red_packet8.png',
        width: 207,
        height: 294,
        index: 7
      },
      {
        url: '../../images/packet/icon_open_red_packet9.png',
        width: 135,
        height: 294,
        index: 8
      },
      {
        url: '../../images/packet/icon_open_red_packet10.png',
        width: 135,
        height: 294,
        index: 9
      },
      {
        url: '../../images/packet/icon_open_red_packet11.png',
        width: 207,
        height: 294,
        index: 10
      }
    ],
    closeImageSrc: "../../images/packet/icon_red_packet_close.png",
    coinHidden:false,
    index : 0,
    startY : 100,
    transparency : 0,
    drawType:0,
    setInter:'',
    currentTimeout: '',
    windowWidth : wx.getSystemInfoSync().windowWidth,
    windowHeight : wx.getSystemInfoSync().windowHeight,
    moveY1: wx.getSystemInfoSync().windowHeight * 0.08,
    moveY2: wx.getSystemInfoSync().windowHeight * 0.4 + wx.getSystemInfoSync().windowHeight * 0.08,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    
    startOpenReadPacket:function() {
      console.log('开始动画')
      var that = this;
      that._animation1();
    },

    openReadPacketSuccess:function() {
      console.log('成功获得红包')
      var that = this;
      that.currentTimeout = setTimeout(function () {
        that.setData({
          coinHidden: true
        });
        that._animation3();
      }, 5000);
    },

    openRedPakcetFailed:function() {
      console.log('失败获得红包')
    },

    _animation1:function() {
      var that = this;
      var scale = 0.1;
      that.data.setInter = setInterval(
        function () {
          if (scale > 1) {
            clearInterval(that.data.setInter);
            that._animation2();
          } else {
            if (scale >= 1.0) scale = 1.0;
            that._drawRedPacketStart(scale);
            if (scale < 1) scale = scale + 0.1;
          }
        }, 30); 
    },

    _animation2:function() {
      var that = this;
      that.data.setInter = setInterval(
        function () {
          that.setData({
            index: that.data.index >= 10 ? 0 : (that.data.index + 1),
          });
          that._drawRedPacketOpen();
        }, 100); 
    },

    _animation3:function() {
      var that = this;
      that.data.setInter = setInterval(
        function () {
          that.setData({
            moveY1: that.data.moveY1 - 60,
            moveY2: that.data.moveY2 + 60,
            transparency: that.data.transparency + 0.1
          });
          if (that.data.moveY1 < - (that.data.windowHeight * 0.4 + 60)
            && that.data.moveY2 > that.data.windowHeight + 60) {
            clearInterval(that.data.setInter);
            that.setData({
              transparency: 1
            });
          }
          that._drawRedPacketEnd(that.data.startY);
        }, 100); 
    },
    
    _drawRedPacketEnd:function (y) {

      function circleImg(ctx,w,img) {
        var that = this;
        var x = w / 2 - 15;
        var y = 20;
        var r = 15;
        ctx.save();
        var d = 2 * r;
        var cx = x + r;
        var cy = y + r;
        ctx.arc(cx, cy, r, 0, 2 * Math.PI);
        ctx.clip();
        ctx.drawImage(img, x, y, d, d);
        ctx.restore();
      }

      function drawRedPacketBg(ctx,w,y) {
        ctx.beginPath();
        ctx.setFillStyle("#EB5646");
        ctx.lineTo(w, 0);
        ctx.lineTo(w, y);
        ctx.arc(w / 2, y, w / 2, 0, Math.PI, false);
        ctx.lineTo(0, y);
        ctx.lineTo(0, 0);
        ctx.closePath();
        ctx.fill();
      }

      function drawRedPacketText(ctx, text, font,w,y, isMoney) {
        ctx.font = 'normal bold ' + font + 'px sans-serif'
        ctx.setFillStyle('#FDE1B1') //字体颜色
        ctx.textAlign = "center"; //文字居中
        ctx.fillText(text,w/2, y);
        if (isMoney) {
          ctx.setFontSize(13) //字体大小
          ctx.setFillStyle('#FDE1B1') //字体颜色
          ctx.textAlign = "center"; //文字居中
          ctx.fillText('元', w / 2 + (text.length / 2) * 30, y);
        }
      }

      var that = this;
      var context2 = wx.createCanvasContext('redPacketCanvas2', that);
      context2.setGlobalAlpha(that.data.transparency);
      var w = that.data.windowWidth;
      drawRedPacketBg(context2,w,y);
      circleImg(context2,w,that.data.iconUrl);
      drawRedPacketText(context2, that.data.userName + '的红包', 18, w,70,false);
      drawRedPacketText(context2, that.data.message, 13, w,95,false);
      drawRedPacketText(context2, that.data.money.toFixed(2), 50, w,160,true);
      drawRedPacketText(context2,'已存入钱包',18,w,200,false);
      context2.draw();

    },

      _roundRect: function(ctx, x, y, w, h, r) {
          ctx.beginPath()
          ctx.setFillStyle('#F24E4D')
          ctx.arc(x + r, y + r, r, Math.PI, Math.PI * 1.5)
          ctx.moveTo(x + r, y)
          ctx.lineTo(x + w - r, y)
          ctx.lineTo(x + w, y + r)
          ctx.arc(x + w - r, y + r, r, Math.PI * 1.5, Math.PI * 2)
          ctx.lineTo(x + w, y + h - r)
          ctx.lineTo(x + w - r, y + h)
          ctx.arc(x + w - r, y + h - r, r, 0, Math.PI * 0.5)
          ctx.lineTo(x + r, y + h)
          ctx.lineTo(x, y + h - r)
          ctx.arc(x + r, y + h - r, r, Math.PI * 0.5, Math.PI)
          ctx.lineTo(x, y + r)
          ctx.lineTo(x + r, y)
          ctx.fill()
          ctx.closePath()
    },

    _drawRedPacketOpen:function () {
      var that = this;
      var context1 = wx.createCanvasContext('redPacketCanvas1', that);
      var w = that.data.windowWidth;
      var h = that.data.windowHeight;

      if (that.data.coinHidden) {
        var height = h * 0.8;
        var width  = w * 0.8;
        context1.save();
        that._roundRect(context1, 0, that.data.moveY1, width, Math.ceil(height/2)+1,0);
        context1.restore();

        context1.save();
        that._roundRect(context1, 0, that.data.moveY2, width, Math.ceil(height/2)+1, 0);
        context1.restore();
      }else {
        context1.save();
        var y = h * 0.1;
        var height = h * 0.8;
        var width  = w * 0.8;
        that._roundRect(context1, 0, y, width, height,10);
        context1.restore();

        context1.save();
        context1.beginPath()
        context1.setFillStyle("#F24E4D");
        context1.setShadow(2,2,2,"#D23D3C");
        var x = w * 0.8 / 2;
        var r = w * 0.8 / 2;
        context1.arc(x,y+2,r-4,0, Math.PI, false)
        context1.fill();
        context1.closePath()
        context1.restore();

        context1.save();
        var moneyImage = that.data.moneyImages[that.data.index];
        var imageWidth = moneyImage.width * (100 / moneyImage.height);
        var imageHeight = 100;
        var money_x = (w * 0.8 - imageWidth) / 2;
        var money_y = (h - imageHeight)/ 2 + 30;
        context1.drawImage(moneyImage.url, money_x, money_y, imageWidth, imageHeight);
        context1.restore();

      }
      context1.draw();
    },

    _drawRedPacketStart:function (scale) {
      var that = this;
      var context1 = wx.createCanvasContext('redPacketCanvas1', that);
      var w = that.data.windowWidth;
      var h = that.data.windowHeight;
      context1.save();
      var w1 = w * 0.8 * scale;
      var h1 = h * 0.8 * scale;
      var x = (w * 0.8 - w1)/2;
      var y = (h - h1)/2;
      that._roundRect(context1,x,y,w1,h1, 10);
      context1.restore();

      context1.save();
      context1.beginPath()
      context1.setFillStyle("#F24E4D");
      context1.setShadow(2, 2, 2, "#D23D3C");
      var x = w * 0.8 / 2;
      var r = (w * 0.8 / 2) * scale;
      context1.arc(x, y + 2, r - 4, 0, Math.PI, false)
      context1.fill();
      context1.closePath()
      context1.restore();

      context1.draw();
    },

    _canvasStart: function (e) {
      var that = this;
      console.log(e);
    },

    _canvasMove: function (e) {
      var that = this;
      that.setData({
        startY: that.data.startY + 2
      });
      this._drawRedPacketEnd(that.data.startY)
    },
    
    _canvasEnd: function (e) {
      var that = this;
      if (e.changedTouches[0].y >= 170 
      && e.changedTouches[0].y <= 210
      && that.data.transparency == 1) {
        this.triggerEvent("toRedPacketRecord");
      }
      that.setData({
        startY: 100
      });
      this._drawRedPacketEnd(that.data.startY)
    }
  },

  attached: function (e) {
    
  },
   
  ready: function () { 

  },


  moved: function () { 
    
  },
  
  detached: function () { 
    clearTimeout(this.data.currentTimeout);
    clearInterval(this.data.setInter);
  },


})
