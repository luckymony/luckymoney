// component/redpacket/redpacket.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
  
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
    current_i : 0,
    current_y : 100,
    transparency : 0,
    setInter:'',
    currentTimeout1: '',
    windowWidth : wx.getSystemInfoSync().windowWidth,
    windowHeight : wx.getSystemInfoSync().windowHeight,
    move_y1: wx.getSystemInfoSync().windowHeight * 0.08,
    move_y2: wx.getSystemInfoSync().windowHeight * 0.4 + wx.getSystemInfoSync().windowHeight * 0.08,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _circleImg:function(ctx,img) {
      var that = this;
      var x = that.data.windowWidth / 2 - 15;
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
    },

    _drawRedPacketBg:function(ctx,y) {
      var that = this;      
      ctx.beginPath();
      ctx.setFillStyle("#EB5646");
      ctx.lineTo(that.data.windowWidth, 0);
      ctx.lineTo(that.data.windowWidth, y);
      ctx.arc(that.data.windowWidth / 2, y, that.data.windowWidth / 2, 0, Math.PI, false);
      ctx.lineTo(0, y);
      ctx.lineTo(0, 0);
      ctx.closePath();
      ctx.fill();
    },

    _drawRedPacketText:function(ctx,text,font,y,isMoney) {
      var that = this;
      ctx.font = 'normal bold ' + font +'px sans-serif'
      ctx.setFillStyle('#FDE1B1') //字体颜色
      ctx.textAlign = "center"; //文字居中
      var x = that.data.windowWidth / 2;
      ctx.fillText(text,x,y);
      if(isMoney) {
        ctx.setFontSize(13) //字体大小
        ctx.setFillStyle('#FDE1B1') //字体颜色
        ctx.textAlign = "center"; //文字居中
        ctx.fillText('元',x + (text.length/2)*30,y);
      }
    },

    _drawRedPacketMove: function (y) {
      var that = this;
      var context2 = wx.createCanvasContext('redPacketCanvas2', that);
      context2.setGlobalAlpha(that.data.transparency);
      that._drawRedPacketBg(context2,y);
      that._circleImg(context2,'../../images/me/user_icon_default.png');
      that._drawRedPacketText(context2,'张三丰的红包',18,70,false);
      that._drawRedPacketText(context2,'恭喜发财,大吉大利',13,95,false);
      that._drawRedPacketText(context2,'0.50',50,160,true);
      that._drawRedPacketText(context2,'已存入钱包',18,200,false);
      context2.draw();
    },

    _drawRedPacketOpen:function () {
      function roundRect(ctx, x, y, w, h, r) {
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
      }

      var that = this;
      var context1 = wx.createCanvasContext('redPacketCanvas1', that);
      if (that.data.coinHidden) {
        var height = that.data.windowHeight * 0.8;
        var width  = that.data.windowWidth * 0.8;
        context1.save();
        roundRect(context1,0,that.data.move_y1, width, height/2,0);
        context1.restore();

        context1.save();
        roundRect(context1,0,that.data.move_y2, width, height/2, 0);
        context1.restore();
      }else {
        context1.save();
        var y = that.data.windowHeight * 0.8 * 0.1;
        var height = that.data.windowHeight * 0.8;
        var width = that.data.windowWidth * 0.8;
        roundRect(context1, 0, y, width, height,10);
        context1.restore();

        context1.save();
        context1.beginPath()
        context1.setFillStyle("#F24E4D");
        context1.setShadow(2,2,2,"#D23D3C");
        var x = that.data.windowWidth * 0.8 / 2;
        var r = that.data.windowWidth * 0.8 / 2;
        context1.arc(x,y+2,r-4,0, Math.PI, false)
        context1.fill();
        context1.closePath()
        context1.restore();

        context1.save();
        var moneyImage = that.data.moneyImages[that.data.current_i];
        var imageWidth = moneyImage.width * (100 / moneyImage.height);
        var imageHeight = 100;
        var money_x = (that.data.windowWidth * 0.8 - imageWidth) / 2;
        var money_y = (that.data.windowHeight - imageHeight)/ 2;
        context1.drawImage(moneyImage.url, money_x, money_y, imageWidth, imageHeight);
        context1.restore();
      }
      context1.draw();
    },

    _canvasStart: function (e) {
    },
    _canvasMove: function (e) {
      var that = this;
      that.setData({
        current_y: that.data.current_y + 2
      });
      this._drawRedPacketMove(that.data.current_y)
    },
    _canvasEnd: function (e) {
      var that = this;
      that.setData({
        current_y: 100
      });
      this._drawRedPacketMove(that.data.current_y)
    }
  },

  attached: function (e) {
    // that._drawRedPacketMove(that.data.current_y);
  },
   
  ready: function () { 
    var that = this;
    that._drawRedPacketOpen();
    that.data.setInter = setInterval(
      function () {
        that.setData({
          current_i: that.data.current_i >= 10 ? 0 : (that.data.current_i + 1),
        });
        if(that.data.coinHidden) {
          that.setData({
            move_y1: that.data.move_y1 - 60,
            move_y2: that.data.move_y2 + 60,
            transparency: that.data.transparency + 0.1
          });
          that._drawRedPacketMove(that.data.current_y);
          if (that.data.move_y1 < - (that.data.windowHeight * 0.4 + 60)
            && that.data.move_y2 > that.data.windowHeight + 60) {
            clearInterval(that.data.setInter);
            that.setData({
              transparency: 1
            });
            that._drawRedPacketMove(that.data.current_y);
          }
        }
        that._drawRedPacketOpen();
      }, 100);  
     
    that.data.currentTimeout1 = setTimeout(function () {
      that.setData({
        coinHidden:true
      })  
    }, 5000);
  },


  moved: function () { 
    
  },
  
  detached: function () { 
    clearTimeout(this.data.currentTimeout1);
    clearInterval(this.data.setInter);
  },


})
