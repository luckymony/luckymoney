
var windowWidth  = wx.getSystemInfoSync().windowWidth;
var windowHeight = wx.getSystemInfoSync().windowHeight;

Page({

  data: {
    
  },

  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: '八方来财' });
    var y = 0;
    var x = 0;
    var s = 20;
    setInterval(
      function () {
        var context = wx.createContext()
        context.beginPath();
        context.translate(25.6,0);
        context.rotate(s * Math.PI / 180);
        context.drawImage("../../../images/rain/rdc.png",x,y, 51.2, 51.2)
        console.log(x,y);
        if (y >= windowHeight) {
          y = 0;
          x = 0;
        }
        y += 20;
        x += y * (s * Math.PI / 180);
        context.closePath();
        context.fill();
        wx.drawCanvas({
          canvasId: 'caxCanvas',
          actions: context.getActions()
        })
      }, 30); 

  }

});