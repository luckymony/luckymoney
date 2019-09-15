
var windowWidth  = wx.getSystemInfoSync().windowWidth;
var windowHeight = wx.getSystemInfoSync().windowHeight;

Page({

  data: {
    width: 100,
    height: 100,
  },

  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: '八方来财' });
    var context = wx.createContext()
    context.beginPath();
    context.setFillStyle('#1aad19');
    context.rect(100,100,100,100);
    context.closePath();
    context.fill();
    wx.drawCanvas({
      canvasId: 'caxCanvas',
      actions: context.getActions()
    })
  }

});